import re

from django.core.validators import RegexValidator
from hashid_field import rest
from rest_framework import serializers

from .models import Document, IssuedCertificate, RequestedCertificate


class RequestedCertificateSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.RequestedCertificate.id", read_only=True
    )

    class Meta:
        model = RequestedCertificate
        fields = "__all__"
        read_only_fields = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return RequestedCertificate.objects.create(user=user, **validated_data)

    def validate_full_name(self, value):
        full_name_validator = RegexValidator(
            regex=r"^[a-zA-Z\u00C0-\u017F\s]*$",
            message="O nome completo só pode conter letras (incluindo acentuadas) e espaços.",
            code="invalid_full_name",
        )

        full_name_validator(value)
        return value

    def validate_vat(self, value):
        is_legal_entity = self.initial_data.get("is_legal_entity", False)

        if is_legal_entity is None:
            user = self.context.get("request").user
            is_legal_entity = bool(user.is_legal_entity)

        cnpj_regex = re.compile(r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$")
        cpf_regex = re.compile(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")

        if is_legal_entity and not cnpj_regex.match(value):
            return serializers.ValidationError(
                "Invalid VAT for PJ (XX.XXX.XXX/XXXX-XX)."
            )

        if not is_legal_entity and not cpf_regex.match(value):
            return serializers.ValidationError(
                "Invalide VAT for PF (XXX.XXX.XXX-XX)."
            )

        return value


class DocumentSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.Document.id", read_only=True
    )

    class Meta:
        model = Document
        fields = "__all__"


class IssuedCertificateSerializer(serializers.ModelSerializer):
    id = rest.HashidSerializerCharField(
        source_field="certificates.IssuedCertificate.id", read_only=True
    )

    class Meta:
        model = IssuedCertificate
        fields = "__all__"
