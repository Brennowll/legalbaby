# Generated by Django 4.2 on 2024-03-05 11:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('certificates', '0002_remove_requestedcertificate_issued_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='link',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
