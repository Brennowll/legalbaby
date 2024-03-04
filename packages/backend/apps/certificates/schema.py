import graphene
from common.graphql import mutations
from graphene import relay
from graphene_django import DjangoObjectType

from .models import Document, IssuedCertificate, RequestedCertificate
from .serializers import (
    DocumentSerializer,
    IssuedCertificateSerializer,
    RequestedCertificateSerializer,
)
from .utils import AuthenticationRequired, NoCertificatesFound


class RequestedCertificateType(DjangoObjectType):
    class Meta:
        model = RequestedCertificate
        interfaces = (relay.Node,)
        fields = "__all__"


class RequestedCertificateConnection(graphene.Connection):
    class Meta:
        node = RequestedCertificateType


class CreateRequestedCertificate(mutations.CreateModelMutation):
    class Meta:
        serializer_class = RequestedCertificateSerializer
        edge_class = RequestedCertificateConnection.Edge


class UpdateRequestedCertificate(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = RequestedCertificateSerializer
        edge_class = RequestedCertificateConnection.Edge


class DeleteRequestedCertificate(mutations.DeleteModelMutation):
    class Meta:
        model = RequestedCertificate


class RequestedCertificateMutation(graphene.ObjectType):
    create_requested_certificate = CreateRequestedCertificate.Field()
    update_requested_certificate = UpdateRequestedCertificate.Field()
    delete_requested_certificate = DeleteRequestedCertificate.Field()


class DocumentType(DjangoObjectType):
    class Meta:
        model = Document
        interfaces = (relay.Node,)
        fields = "__all__"


class DocumentConnection(graphene.Connection):
    class Meta:
        node = DocumentType


class CreateDocument(mutations.CreateModelMutation):
    class Meta:
        serializer_class = DocumentSerializer
        edge_class = DocumentConnection.Edge


class UpdateDocument(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = DocumentSerializer
        edge_class = DocumentConnection.Edge


class DeleteDocument(mutations.DeleteModelMutation):
    class Meta:
        model = Document


class DocumentMutation(graphene.ObjectType):
    create_document = CreateDocument.Field()
    update_document = UpdateDocument.Field()
    delete_document = DeleteDocument.Field()


class IssuedCertificateType(DjangoObjectType):
    class Meta:
        model = IssuedCertificate
        interfaces = (relay.Node,)
        fields = "__all__"


class IssuedCertificateConnection(graphene.Connection):
    class Meta:
        node = IssuedCertificateType


class CreateIssuedCertificate(mutations.CreateModelMutation):
    class Meta:
        serializer_class = IssuedCertificateSerializer
        edge_class = IssuedCertificateConnection.Edge


class UpdateIssuedCertificate(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = IssuedCertificateSerializer
        edge_class = IssuedCertificateConnection.Edge


class DeleteIssuedCertificate(mutations.DeleteModelMutation):
    class Meta:
        model = IssuedCertificate


class IssuedCertificateMutation(graphene.ObjectType):
    create_issued_certificate = CreateIssuedCertificate.Field()
    update_issued_certificate = UpdateIssuedCertificate.Field()
    delete_issued_certificate = DeleteIssuedCertificate.Field()


class Query(graphene.ObjectType):
    requested_certificates = graphene.List(RequestedCertificateType)
    issued_certificates = graphene.List(IssuedCertificateType)

    def verify_auth(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise AuthenticationRequired("Not logged in.")
        return user

    def verify_objects_related_to_user(self, model, user):
        objects_related = model.objects.filter(user=user)
        if not objects_related.exists():
            raise NoCertificatesFound(f"No {model.__name__.lower()} found for this user.")
        return objects_related

    def resolve_requested_certificates(self, info):
        user = self.verify_auth(info)
        requested_certificates = self.verify_objects_related_to_user(RequestedCertificate, user)
        return requested_certificates

    def resolve_issued_certificates(self, info):
        user = self.verify_auth(info)
        issued_certificates = self.verify_objects_related_to_user(IssuedCertificate, user)
        return issued_certificates
