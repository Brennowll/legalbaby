import hashid_field
from django.db import models

from ..users.models import User
from .utils import state_options


class RequestedCertificate(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=60)
    state = models.CharField(max_length=2, choices=state_options)
    certificate_type = models.CharField(
        max_length=20,
        choices=[
            ("Military", "Military"),
            ("State", "State"),
            ("Labor", "Labor"),
            ("Federal", "Federal"),
        ],
    )
    is_legal_entity = models.BooleanField()
    vat = models.CharField(max_length=20)

    service_id = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    # category = models.CharField(max_length=30, default="distribuicao")

    class Meta:
        unique_together = [
            "user",
            "full_name",
            "state",
            "certificate_type",
            "is_legal_entity",
        ]

    def __str__(self):
        return f"{self.full_name} - {self.certificate_type}"


class Document(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    file = models.FileField(upload_to="certificate-documents/")
    link = models.CharField(max_length=200)

    def __str__(self):
        return self.file.name


class IssuedCertificate(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    request = models.ForeignKey(RequestedCertificate, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.request.full_name} - {self.request.certificate_type}"
