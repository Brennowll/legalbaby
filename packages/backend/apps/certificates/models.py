import hashid_field
from django.db import models

from django.utils import timezone
from ..users.models import User
from .utils import state_options


class State(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=20)
    uf = models.CharField(max_length=2, choices=state_options)

    def __str__(self):
        return f"{self.name} - {self.uf}"


class Court(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    states = models.ManyToManyField(State)

    def __str__(self):
        return f"{self.name}"


class CertificateSubCategorie(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"


class CertificateCategorie(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    sub_categories = models.ManyToManyField(CertificateSubCategorie)

    def __str__(self):
        return f"{self.name}"


class Document(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    doc_id = models.CharField(max_length=50, default='default_doc_id')  # input
    doc_id_state = models.CharField(max_length=50, default='default_doc_id_state')
    rg = models.CharField(max_length=50, default='default_rg')  # input
    rg_ssp = models.CharField(max_length=50, default='default_rg_ssp')  # input
    name = models.CharField(max_length=50, default='default_name')
    mother = models.CharField(max_length=50, default='default_mother')
    father = models.CharField(max_length=50, default='default_father')
    gender = models.CharField(max_length=50, default='default_gender')
    birth_date = models.DateTimeField(default=timezone.now)
    marital_status = models.CharField(max_length=50, default='default_marital_status')
    city_residence = models.CharField(max_length=50, default='default_city_residence')
    social_security_number = models.CharField(max_length=50, default='default_social_security_number')

    def __str__(self):
        return f"{self.name} - {self.doc_id}"


class Certificate(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    court = models.ForeignKey(Court, blank=True, null=True, on_delete=models.PROTECT)
    available_person_type = models.CharField(
        max_length=50,
        choices=[
            ("PF", "Pessoa Física"),
            ("PJ", "Pessoa Jurídica"),
            ("PF_PJ", "Pessoa Física e Pessoa Jurídica"),
        ],
    )
    category = models.ForeignKey(CertificateSubCategorie, on_delete=models.PROTECT)
    credits_needed = models.IntegerField()
    deadline_days = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.court}"


class RequestedCertificate(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    certificate = models.ForeignKey(Certificate, on_delete=models.PROTECT, default='0')
    url = models.CharField(max_length=200, blank=True)
    issued = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.certificate.name} - {self.certificate.court}"


class Request(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.PROTECT)
    requested_certificates = models.ManyToManyField(RequestedCertificate)
    status = models.CharField(max_length=50, choices=[("AN", "Em andamento"), ("FN", "Finalizado")])

    def __str__(self):
        return f"{self.user} - {self.document.doc_id}"
