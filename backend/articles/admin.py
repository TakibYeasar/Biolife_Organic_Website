from django.contrib import admin

from .models import (
    ArticleCategory,
    ArticleTag,
    Article,
    ArticleComment,
)

admin.site.register([
    ArticleCategory,
    ArticleTag,
    Article,
    ArticleComment,
])
