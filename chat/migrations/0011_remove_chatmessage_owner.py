# Generated by Django 3.2.4 on 2021-06-24 20:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0010_chatmessage_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatmessage',
            name='owner',
        ),
    ]