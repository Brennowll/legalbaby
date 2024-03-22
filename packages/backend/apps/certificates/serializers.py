import re

from django.core.validators import RegexValidator
from hashid_field import rest
from rest_framework import serializers

from .models import (
    State,
    Court,
    CertificateSubCategorie,
    CertificateCategorie,
    Document,
    Certificate,
    RequestedCertificate,
    Request,
)


class StateSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.State.id", read_only=True
    )

    class Meta:
        model = State
        fields = "__all__"


class CourtSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.Court.id", read_only=True
    )

    class Meta:
        model = Court
        fields = "__all__"


class CertificateSubCategorieSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.CertificateSubCategorie.id", read_only=True
    )

    class Meta:
        model = CertificateSubCategorie
        fields = "__all__"


class CertificateCategorieSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.CertificateCategorie.id", read_only=True
    )

    class Meta:
        model = CertificateCategorie
        fields = "__all__"


class DocumentSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.Document.id", read_only=True
    )

    class Meta:
        model = Document
        fields = "__all__"

    def validate_doc_id(self, value):
        cnpj_regex = re.compile(r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$")
        cpf_regex = re.compile(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")

        if not cpf_regex.match(value) and not cnpj_regex.match(value):
            return serializers.ValidationError(
                "CPF ou CNPJ inválido (XXX.XXX.XXX-XX or XX.XXX.XXX/XXXX-XX)."
            )

        return value

    def validate_rg(self, value):
        rg_regex = re.compile(r"^\d{2}\.\d{3}\.\d{3}-\d{1}$")

        if not rg_regex.match(value):
            return serializers.ValidationError("RG inválido (XX.XXX.XXX-X).")

        return value

    def validate_name(self, value):
        name_validator = RegexValidator(
            regex=r"^[a-zA-Z\u00C0-\u017F\s]*$",
            message="O nome só pode conter letras (incluindo acentuadas) e espaços.",
            code="invalid_name",
        )

        name_validator(value)
        return value

    def validate_mother(self, value):
        name_validator = RegexValidator(
            regex=r"^[a-zA-Z\u00C0-\u017F\s]*$",
            message="O nome da mãe só pode conter letras (incluindo acentuadas) e espaços.",
            code="invalid_mother",
        )

        name_validator(value)
        return value

    def validate_father(self, value):
        name_validator = RegexValidator(
            regex=r"^[a-zA-Z\u00C0-\u017F\s]*$",
            message="O nome do pai só pode conter letras (incluindo acentuadas) e espaços.",
            code="invalid_father",
        )

        name_validator(value)
        return value


class CertificateSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Certificate
        fields = "__all__"


class RequestedCertificateSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.RequestedCertificate.id", read_only=True
    )

    class Meta:
        model = RequestedCertificate
        fields = "__all__"


class RequestSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.Request.id", read_only=True
    )
    vat = serializers.CharField(write_only=True)
    state = serializers.CharField(write_only=True)
    rg = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    ssp_rg = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    mother_name = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    father_name = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    marital_state = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    city = serializers.CharField(
        allow_blank=True, required=False, write_only=True
    )
    requested_certificates_slugs = serializers.ListField(
        child=serializers.CharField(), write_only=True
    )
    credits_to_decrease = serializers.IntegerField(write_only=True)

    class Meta:
        model = Request
        fields = "__all__"
        read_only_fields = [
            "user",
            "document",
            "requested_certificates",
            "status",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        status = "AN"

        doc_id = validated_data.get("vat")
        doc_id_state = validated_data.get("state")
        rg = validated_data.get("rg")
        ssp_rg = validated_data.get("ssp_rg")
        mother_name = validated_data.get("mother_name")
        father_name = validated_data.get("father_name")
        marital_state = validated_data.get("marital_state")
        city = validated_data.get("city")
        requested_certificates_slugs = validated_data.get(
            "requested_certificates_slugs"
        )
        credits_to_decrease = validated_data.get("credits_to_decrease")

        document = Document.objects.create(
            doc_id=doc_id,
            doc_id_state=doc_id_state,
            rg=rg,
            rg_ssp=ssp_rg,
            mother=mother_name,
            father=father_name,
            marital_status=marital_state,
            city_residence=city,
        )

        requested_certificates = [
            RequestedCertificate.objects.create(
                certificate=Certificate.objects.get(slug=certificate_slug)
            )
            for certificate_slug in requested_certificates_slugs
        ]

        request_object = Request.objects.create(
            user=user,
            document=document,
            status=status,
        )

        request_object.requested_certificates.set(requested_certificates)

        user.profile.certificate_credits -= credits_to_decrease
        user.profile.save()

        return request_object
