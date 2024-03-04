from django.contrib import admin

from . import models


@admin.register(models.RequestedCertificate)
class RequestedCertificateAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'certificate_type')


@admin.register(models.Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("link",)


@admin.register(models.IssuedCertificate)
class IssuedCertificateAdmin(admin.ModelAdmin):
    list_display = ("request", "document")
