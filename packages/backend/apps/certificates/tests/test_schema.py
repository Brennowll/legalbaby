import base64
import json
import os

import pytest
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from graphene_file_upload.django.testing import file_graphql_query
from graphql_relay import to_global_id

pytestmark = pytest.mark.django_db

User = get_user_model()


class TestRequestedCertificateQuery:
    class TestRequestedCertificateQuery:
        def test_resolve_requested_certificates(self, graphene_client, user_factory, requested_certificate_factory):
            query = """
          query {
            requestedCertificates {
            id
            fullName
            isLegalEntity
            }
          }
        """

            user = user_factory(
                profile__first_name="FIRSTNAME",
                profile__last_name="LASTNAME",
            )
            another_user = user_factory(
                profile__first_name="FIRSTNAME",
                profile__last_name="LASTNAME",
            )

            graphene_client.force_authenticate(user)

            numbers_for_name = ["one", "two", "three"]

            another_user_requested_certificate = requested_certificate_factory(
                is_legal_entity=True,
                user=another_user,
                full_name="another name",
            )

            requested_certificates = [
                requested_certificate_factory(
                    is_legal_entity=True,
                    user=user,
                    full_name=f"name {numbers_for_name[i]}",
                )
                for i in range(3)
            ]

            executed = graphene_client.query(query)

            assert "errors" not in executed

            returned_certificates = executed["data"]["requestedCertificates"]
            assert len(returned_certificates) == len(requested_certificates)

            for returned_certificate, requested_certificate in zip(returned_certificates, requested_certificates):
                assert returned_certificate["fullName"] == requested_certificate.full_name
                assert returned_certificate["isLegalEntity"] == requested_certificate.is_legal_entity


class TestIssuedCertificateQuery:
    def test_return_issued_certificate(
        self,
        graphene_client,
        issued_certificate_factory,
        document_factory,
        user_factory,
        requested_certificate_factory,
        image_factory,
    ):
        query = """
            query {
              issuedCertificates {
                request {
                  fullName
                  isLegalEntity
                }
                document {
                  file {
                    name
                  }
                  link
                }
              }
            }
        """

        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )
        another_user = user_factory(
            profile__first_name="ANOTHERFIRSTNAME",
            profile__last_name="ANOTHERLASTNAME",
        )

        graphene_client.force_authenticate(user)

        file = image_factory(name="document.png", params={"width": 1})

        another_request = requested_certificate_factory(is_legal_entity=True, user=another_user, full_name="Mark Zuck")
        request = requested_certificate_factory(is_legal_entity=True, user=user, full_name="Mark Zuck")

        another_document = document_factory(file=file)
        document = document_factory(file=file)

        another_issued_certificate = issued_certificate_factory(
            request_id=another_request.id, document_id=another_document.id
        )
        issued_certificate = issued_certificate_factory(request_id=request.id, document_id=document.id)

        executed = graphene_client.query(query)

        assert "errors" not in executed
        assert executed == {
            "data": {
                "issuedCertificates": [
                    {
                        "request": {
                            "fullName": issued_certificate.request.full_name,
                            "isLegalEntity": issued_certificate.request.is_legal_entity,
                        },
                        "document": {
                            "file": {
                                "name": "document.png",
                            },
                            "link": issued_certificate.document.link,
                        },
                    }
                ]
            }
        }


class TestMutations:
    def test_create_requested_certificate_mutation(self, graphene_client, user_factory):
        user = user_factory(
            profile__first_name="FIRSTNAME",
            profile__last_name="LASTNAME",
        )

        another_user = user_factory(
            profile__first_name="OTHERNAME",
            profile__last_name="OTHERlASTNAME",
        )

        mutation = """
            mutation($input: CreateRequestedCertificateInput!) {
              createRequestedCertificate(input: $input) {
                requestedCertificate {
                  id
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
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["fullName"] == "John Doe"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["state"] == "DF"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["certificateType"] == "FEDERAL"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["isLegalEntity"] is False
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["vat"] == "123.456.789-00"
        assert executed["data"]["createRequestedCertificate"]["requestedCertificate"]["serviceId"] == "123.123.123"

    def test_create_document_mutation(self, api_client, image_factory, user_factory):
        user = user_factory(profile__first_name="FIRSTNAME", profile__last_name="LASTNAME")
        file = image_factory(name="document.png", params={"width": 1})
        mutation = """
            mutation($input: CreateDocumentInput!) {
              createDocument(input: $input) {
                document {
                  file {
                    name
                  }
                }
              }
            }
        """

        api_client.force_authenticate(user)

        response = file_graphql_query(
            mutation,
            client=api_client,
            variables={"input": {"file": None}},
            files={"file": file},
            graphql_url="/api/graphql/",
        )

        executed = json.loads(response.content)

        assert "errors" not in executed

    def test_create_issued_certificate_mutation(
        self,
        graphene_client,
        requested_certificate_factory,
        document_factory,
        image_factory,
        issued_certificate_factory,
        user_factory,
    ):
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
                    file {
                      name
                    }
                    link
                  }
                }
              }
            }
        """

        user = user_factory(profile__first_name="FIRSTNAME", profile__last_name="LASTNAME")
        file = image_factory(name="document.png", params={"width": 1})

        request = requested_certificate_factory(
            user=user,
            certificate_type="Federal",
            is_legal_entity=True,
            full_name="Mark Zuck",
        )
        document = document_factory(file=file)
        issued_certificate = issued_certificate_factory(request_id=request.id, document_id=document.id)

        graphene_client.force_authenticate(user)

        input_data = {
            "request": str(request.id),
            "document": str(document.id),
        }

        executed = graphene_client.mutate(
            mutation,
            variable_values={"input": input_data},
        )

        assert "errors" not in executed
        assert executed["data"]["createIssuedCertificate"]["issuedCertificate"]["request"] == {
            "fullName": request.full_name,
            "certificateType": "FEDERAL",
        }
        assert executed["data"]["createIssuedCertificate"]["issuedCertificate"]["document"] == {
            "file": {'name': 'document.png'},
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
