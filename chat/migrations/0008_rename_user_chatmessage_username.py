# Generated by Django 3.2.4 on 2021-06-22 20:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_rename_username_chatmessage_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmessage',
            old_name='user',
            new_name='username',
        ),
    ]
