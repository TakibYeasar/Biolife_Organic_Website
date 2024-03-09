# Generated by Django 4.2.7 on 2024-03-09 03:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0003_alter_articlecomment_options_remove_article_author_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlecomment',
            name='dislikes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dislikes_article_comment', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='articlecomment',
            name='likes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes_article_comment', to=settings.AUTH_USER_MODEL),
        ),
    ]
