import graphene
from common.graphql import mutations
from graphene import relay
from graphene_django import DjangoObjectType

from .utils import AuthenticationRequired
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
from .serializers import (
    StateSerializer,
    CourtSerializer,
    CertificateSubCategorieSerializer,
    CertificateCategorieSerializer,
    DocumentSerializer,
    CertificateSerializer,
    RequestedCertificateSerializer,
    RequestSerializer,
)


class StateType(DjangoObjectType):
    class Meta:
        model = State
        interfaces = (relay.Node,)
        fields = "__all__"


class StateConnection(graphene.Connection):
    class Meta:
        node = StateType


class CreateState(mutations.CreateModelMutation):
    class Meta:
        serializer_class = StateSerializer
        edge_class = StateConnection.Edge


class UpdateState(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = StateSerializer
        edge_class = StateConnection.Edge


class DeleteState(mutations.DeleteModelMutation):
    class Meta:
        model = State


class CourtType(DjangoObjectType):
    class Meta:
        model = Court
        interfaces = (relay.Node,)
        fields = "__all__"


class CourtConnection(graphene.Connection):
    class Meta:
        node = CourtType


class CreateCourt(mutations.CreateModelMutation):
    class Meta:
        serializer_class = CourtSerializer
        edge_class = CourtConnection.Edge


class UpdateCourt(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = CourtSerializer
        edge_class = CourtConnection.Edge


class DeleteCourt(mutations.DeleteModelMutation):
    class Meta:
        model = Court


class CertificateSubCategorieType(DjangoObjectType):
    class Meta:
        model = CertificateSubCategorie
        interfaces = (relay.Node,)
        fields = "__all__"


class CertificateSubCategorieConnection(graphene.Connection):
    class Meta:
        node = CertificateSubCategorieType


class CreateCertificateSubCategorie(mutations.CreateModelMutation):
    class Meta:
        serializer_class = CertificateSubCategorieSerializer
        edge_class = CertificateSubCategorieConnection.Edge


class UpdateCertificateSubCategorie(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = CertificateSubCategorieSerializer
        edge_class = CertificateSubCategorieConnection.Edge


class DeleteCertificateSubCategorie(mutations.DeleteModelMutation):
    class Meta:
        model = CertificateSubCategorie


class CertificateCategorieType(DjangoObjectType):
    class Meta:
        model = CertificateCategorie
        interfaces = (relay.Node,)
        fields = "__all__"


class CertificateCategorieConnection(graphene.Connection):
    class Meta:
        node = CertificateCategorieType


class CreateCertificateCategorie(mutations.CreateModelMutation):
    class Meta:
        serializer_class = CertificateCategorieSerializer
        edge_class = CertificateCategorieConnection.Edge


class UpdateCertificateCategorie(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = CertificateCategorieSerializer
        edge_class = CertificateCategorieConnection.Edge


class DeleteCertificateCategorie(mutations.DeleteModelMutation):
    class Meta:
        model = CertificateCategorie


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


class CertificateType(DjangoObjectType):
    class Meta:
        model = Certificate
        interfaces = (relay.Node,)
        fields = "__all__"


class CertificateConnection(graphene.Connection):
    class Meta:
        node = CertificateType


class CreateCertificate(mutations.CreateModelMutation):
    class Meta:
        serializer_class = CertificateSerializer
        edge_class = CertificateConnection.Edge


class UpdateCertificate(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = CertificateSerializer
        edge_class = CertificateConnection.Edge


class DeleteCertificate(mutations.DeleteModelMutation):
    class Meta:
        model = Certificate


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


class RequestType(DjangoObjectType):
    class Meta:
        model = Request
        interfaces = (relay.Node,)
        fields = "__all__"


class RequestConnection(graphene.Connection):
    class Meta:
        node = RequestType


class CreateRequest(mutations.CreateModelMutation):
    class Meta:
        serializer_class = RequestSerializer
        edge_class = RequestConnection.Edge


class UpdateRequest(mutations.UpdateModelMutation):
    class Meta:
        serializer_class = RequestSerializer
        edge_class = RequestConnection.Edge


class DeleteRequest(mutations.DeleteModelMutation):
    class Meta:
        model = Request


class Mutation(graphene.ObjectType):
    create_state = CreateState.Field()
    update_state = UpdateState.Field()
    delete_state = DeleteState.Field()

    create_court = CreateCourt.Field()
    update_court = UpdateCourt.Field()
    delete_court = DeleteCourt.Field()

    create_certificate_subcategorie = CreateCertificateSubCategorie.Field()
    update_certificate_subcategorie = UpdateCertificateSubCategorie.Field()
    delete_certificate_subcategorie = DeleteCertificateSubCategorie.Field()

    create_certificate_categorie = CreateCertificateCategorie.Field()
    update_certificate_categorie = UpdateCertificateCategorie.Field()
    delete_certificate_categorie = DeleteCertificateCategorie.Field()

    create_document = CreateDocument.Field()
    update_document = UpdateDocument.Field()
    delete_document = DeleteDocument.Field()

    create_certificate = CreateCertificate.Field()
    update_certificate = UpdateCertificate.Field()
    delete_certificate = DeleteCertificate.Field()

    create_requested_certificate = CreateRequestedCertificate.Field()
    update_requested_certificate = UpdateRequestedCertificate.Field()
    delete_requested_certificate = DeleteRequestedCertificate.Field()

    create_request = CreateRequest.Field()
    update_request = UpdateRequest.Field()
    delete_request = DeleteRequest.Field()


class Query(graphene.ObjectType):
    states = graphene.List(StateType)
    courts = graphene.List(CourtType)
    certificate_sub_categories = graphene.List(CertificateSubCategorieType)
    certificate_categories = graphene.List(CertificateCategorieType)
    documents = graphene.List(DocumentType)
    certificates = graphene.List(CertificateType)
    requested_certificates = graphene.List(RequestedCertificateType)
    requests = graphene.List(RequestType)

    def resolve_states(self, info):
        return State.objects.all()

    def resolve_courts(self, info):
        return Court.objects.all()

    def resolve_certificate_sub_categories(self, info):
        return CertificateSubCategorie.objects.all()

    def resolve_certificate_categories(self, info):
        return CertificateCategorie.objects.all()

    def resolve_documents(self, info):
        return Document.objects.all()

    def resolve_certificates(self, info):
        return Certificate.objects.all()

    def resolve_requests(self, info):
        if not info.context.user.is_authenticated:
            raise AuthenticationRequired("Not logged in.")

        return Request.objects.filter(user=info.context.user)
