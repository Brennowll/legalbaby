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
    id = rest.HashidSerializerCharField(source_field="certificates.State.id", read_only=True)

    class Meta:
        model = State
        fields = "__all__"


class CourtSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.Court.id", read_only=True)

    class Meta:
        model = Court
        fields = "__all__"


class CertificateSubCategorieSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.CertificateSubCategorie.id", read_only=True)

    class Meta:
        model = CertificateSubCategorie
        fields = "__all__"


class CertificateCategorieSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.CertificateCategorie.id", read_only=True)

    class Meta:
        model = CertificateCategorie
        fields = "__all__"


class DocumentSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.Document.id", read_only=True)

    class Meta:
        model = Document
        fields = "__all__"

    def validate_doc_id(self, value):
        cnpj_regex = re.compile(r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$")
        cpf_regex = re.compile(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")

        if not cpf_regex.match(value) and not cnpj_regex.match(value):
            return serializers.ValidationError("CPF ou CNPJ inválido (XXX.XXX.XXX-XX or XX.XXX.XXX/XXXX-XX).")

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
    id = rest.HashidSerializerCharField(source_field="certificates.Certificate.id", read_only=True)

    class Meta:
        model = Certificate
        fields = "__all__"


class RequestedCertificateSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.RequestedCertificate.id", read_only=True)

    class Meta:
        model = RequestedCertificate
        fields = "__all__"


class RequestSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(source_field="certificates.Request.id", read_only=True)

    class Meta:
        model = Request
        fields = "__all__"
        read_only_fields = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return RequestedCertificate.objects.create(user=user, **validated_data)
