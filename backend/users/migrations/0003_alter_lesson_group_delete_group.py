# Generated by Django 5.1.2 on 2024-11-08 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_meeting_participants_meetingparticipant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='group',
            field=models.TextField(verbose_name='group'),
        ),
        migrations.DeleteModel(
            name='Group',
        ),
    ]
