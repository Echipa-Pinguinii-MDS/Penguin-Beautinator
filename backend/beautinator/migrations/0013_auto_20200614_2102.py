# Generated by Django 3.0.2 on 2020-06-14 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('beautinator', '0012_auto_20200614_1416'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='date',
            new_name='day',
        ),
    ]
