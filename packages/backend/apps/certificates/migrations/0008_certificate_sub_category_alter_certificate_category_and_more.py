# Generated by Django 4.2 on 2024-03-19 21:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('certificates', '0007_alter_state_uf'),
    ]

    operations = [
        migrations.AddField(
            model_name='certificate',
            name='sub_category',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to='certificates.certificatesubcategorie',
            ),
        ),
        migrations.AlterField(
            model_name='certificate',
            name='category',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to='certificates.certificatecategorie'
            ),
        ),
        migrations.AlterField(
            model_name='document',
            name='city_residence',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='doc_id',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='doc_id_state',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='father',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='gender',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='marital_status',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='mother',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='rg',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='rg_ssp',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='document',
            name='social_security_number',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
