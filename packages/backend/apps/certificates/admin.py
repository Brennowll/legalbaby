from django.contrib import admin
from . import models


@admin.register(models.State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'uf')


@admin.register(models.Court)
class CourtAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(models.CertificateSubCategorie)
class CertificateSubCategorieAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(models.CertificateCategorie)
class CertificateCategorieAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(models.Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('doc_id', 'name', 'city_residence')


@admin.register(models.Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'court',
        'available_person_type',
        'category',
        'credits_needed',
        'deadline_days',
    )


@admin.register(models.RequestedCertificate)
class RequestedCertificateAdmin(admin.ModelAdmin):
    list_display = ('certificate', 'url', 'issued')


@admin.register(models.Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'document', 'status')
