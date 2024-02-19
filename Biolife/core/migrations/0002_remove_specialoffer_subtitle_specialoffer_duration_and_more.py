# Generated by Django 4.2.7 on 2024-01-30 13:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specialoffer',
            name='subtitle',
        ),
        migrations.AddField(
            model_name='specialoffer',
            name='duration',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='specialoffer',
            name='end_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='specialoffer',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 1, 0, 0)),
        ),
    ]
