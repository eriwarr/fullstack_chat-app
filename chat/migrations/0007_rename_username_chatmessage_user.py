# Generated by Django 3.2.4 on 2021-06-22 20:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_rename_user_chatmessage_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmessage',
            old_name='username',
            new_name='user',
        ),
    ]
