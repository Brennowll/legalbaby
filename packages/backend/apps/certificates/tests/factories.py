import factory
from apps.certificates.models import (
    Document,
    IssuedCertificate,
    RequestedCertificate,
)


class RequestedCertificateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RequestedCertificate


class DocumentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Document


class IssuedCertificateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = IssuedCertificate
