# Generated by Django 3.0.6 on 2020-06-15 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beautinator', '0015_merge_20200615_1434'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='category',
            field=models.CharField(choices=[('FH', 'Coafor'), ('BE', 'Cosmetica'), ('MH', 'Frizerie'), ('MP', 'Manichiura'), ('MG', 'Masaj')], max_length=2),
        ),
    ]
