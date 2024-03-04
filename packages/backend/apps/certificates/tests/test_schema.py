import base64
import os

import pytest
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from graphql_relay import to_global_id

pytestmark = pytest.mark.django_db

User = get_user_model()


class TestRequestedCertificateQuery:
    REQUESTED_CERTIFICATE_QUERY = """
        query($id: ID!) {
          requestedCertificate(id: $id) {
            id
            fullName
            state
            certificateType
            isLegalEntity
            vat
          }
        }
    """

    def test_return_requested_certificate(self, graphene_client, requested_certificate):
        requested_certificate_global_id = to_global_id("RequestedCertificateType", requested_certificate.id)

        executed = graphene_client.query(
            self.REQUESTED_CERTIFICATE_QUERY,
            variable_values={"id": requested_certificate_global_id},
        )

        assert executed == {
            "data": {
                "requestedCertificate": {
                    "id": requested_certificate_global_id,
                    "fullName": requested_certificate.full_name,
                    "state": requested_certificate.state,
                    "certificateType": requested_certificate.certificate_type,
                    "isLegalEntity": requested_certificate.is_legal_entity,
                    "vat": requested_certificate.vat,
                }
            }
        }


class TestIssuedCertificateQuery:
    ISSUED_CERTIFICATE_QUERY = """
        query($id: ID!) {
          issuedCertificate(id: $id) {
            id
            request {
              fullName
              certificateType
            }
            document {
              file
              link
            }
          }
        }
    """

    def test_return_issued_certificate(self, graphene_client, issued_certificate):
        issued_certificate_global_id = to_global_id("IssuedCertificateType", issued_certificate.id)

        executed = graphene_client.query(
            self.ISSUED_CERTIFICATE_QUERY,
            variable_values={"id": issued_certificate_global_id},
        )

        assert executed == {
            "data": {
                "issuedCertificate": {
                    "id": issued_certificate_global_id,
                    "request": {
                        "fullName": issued_certificate.request.full_name,
                        "certificateType": issued_certificate.request.certificate_type,
                    },
                    "document": {
                        "file": issued_certificate.document.file.name,
                        "link": issued_certificate.document.link,
                    },
                }
            }
        }


class TestMutations:
    def test_create_requested_certificate_mutation(self, graphene_client, user_factory):
        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )

        mutation = """
            mutation($input: CreateRequestedCertificateInput!) {
              createRequestedCertificate(input: $input) {
                requestedCertificate {
                  id
                  user {
                      id
                  }
                  fullName
                  state
                  certificateType
                  isLegalEntity
                  vat
                  createdAt
                  serviceId
                }
              }
            }
        """

        graphene_client.force_authenticate(user)

        input_data = {
            "user": str(user.id),
            "fullName": "John Doe",
            "state": "DF",
            "certificateType": "Federal",
            "isLegalEntity": False,
            "vat": "123.456.789-00",
            "serviceId": "123.123.123",
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values={"input": input_data},
        )

        assert "errors" not in executed
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["user"]["id"] == user.id
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["fullName"] == "John Doe"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["state"] == "DF"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["certificateType"] == "FEDERAL"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["isLegalEntity"] is False
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["vat"] == "123.456.789-00"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["serviceId"] == "123.123.123"

    # def test_create_document_mutation(self, graphene_client):
    #     mutation = """
    #         mutation($input: CreateDocumentInput!) {
    #           createDocument(input: $input) {
    #             document {
    #               file
    #               link
    #             }
    #           }
    #         }
    #     """

    #     # Create a test file
    #     file_name = "test_file.pdf"
    #     file_content = b"Test file content"
    #     with open(file_name, "wb") as f:
    #         f.write(file_content)

    #     # Read the file and encode it in base64
    #     with open(file_name, "rb") as f:
    #         encoded_file = base64.b64encode(f.read()).decode()

    #     # Delete the test file
    #     os.remove(file_name)

    #     input_data = {
    #         "file": encoded_file,
    #         "link": "http://example.com/file.pdf",
    #     }

    #     executed = graphene_client.mutate(
    #         mutation,
    #         variable_values={"input": input_data},
    #     )

    #     assert "errors" not in executed
    #     assert executed["data"]["createDocument"]["document"]["link"] == "http://example.com/file.pdf"
    #     assert executed["data"]["createDocument"]["document"]["file"] == "testando caminho"

    def test_create_issued_certificate_mutation(self, graphene_client, requested_certificate, document):
        mutation = """
            mutation($input: CreateIssuedCertificateInput!) {
              createIssuedCertificate(input: $input) {
                issuedCertificate {
                  id
                  request {
                    fullName
                    certificateType
                  }
                  document {
                    file
                    link
                  }
                }
              }
            }
        """

        input_data = {
            "requestId": to_global_id("RequestedCertificateType", requested_certificate.id),
            "documentId": to_global_id("DocumentType", document.id),
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values=input_data,
        )

        assert "errors" not in executed
        assert executed["data"]["createIssuedCertificate"]["issuedCertificate"]["request"] == {
            "fullName": requested_certificate.full_name,
            "certificateType": requested_certificate.certificate_type,
        }
        assert executed["data"]["createIssuedCertificate"]["issuedCertificate"]["document"] == {
            "file": document.file.name,
            "link": document.link,
        }

    def test_full_name_serializer_validation(self, graphene_client, user_factory):
        mutation = """
            mutation($input: CreateRequestedCertificateInput!) {
              createRequestedCertificate(input: $input) {
                requestedCertificate {
                  id
                  user {
                      id
                  }
                  fullName
                  state
                  certificateType
                  isLegalEntity
                  vat
                  createdAt
                  serviceId
                }
              }
            }
        """

        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )

        input_data = {
            "user": str(user.id),
            "fullName": "John Doe123",
            "state": "DF",
            "certificateType": "Federal",
            "isLegalEntity": False,
            "vat": "123.456.789-00",
            "serviceId": "123.123.123",
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values={"input": input_data},
        )

        assert "errors" in executed

    def test_pj_vat_serializer_validation(self, graphene_client, user_factory):
        mutation = """
            mutation($input: CreateRequestedCertificateInput!) {
              createRequestedCertificate(input: $input) {
                requestedCertificate {
                  id
                  user {
                      id
                  }
                  fullName
                  state
                  certificateType
                  isLegalEntity
                  vat
                  createdAt
                  serviceId
                }
              }
            }
        """

        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )

        input_data = {
            "user": str(user.id),
            "fullName": "John Doe",
            "state": "DF",
            "certificateType": "Federal",
            "isLegalEntity": True,
            "vat": "123.123.123/1234-12",
            "serviceId": "123.123.123",
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values={"input": input_data},
        )

        assert "errors" in executed

    def test_pf_vat_serializer_validation(self, graphene_client, user_factory):
        mutation = """
            mutation($input: CreateRequestedCertificateInput!) {
              createRequestedCertificate(input: $input) {
                requestedCertificate {
                  id
                  user {
                      id
                  }
                  fullName
                  state
                  certificateType
                  isLegalEntity
                  vat
                  createdAt
                  serviceId
                }
              }
            }
        """

        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )

        input_data = {
            "user": str(user.id),
            "fullName": "John Doe",
            "state": "DF",
            "certificateType": "Federal",
            "isLegalEntity": False,
            "vat": "123.456.789",
            "serviceId": "123.123.123",
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values={"input": input_data},
        )

        assert "errors" in executed
