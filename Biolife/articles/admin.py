from django.contrib import admin

from .models import (
    Articlecategory,
    Articletags,
    Article,
    ArticleComment,
)

admin.site.register([
    Articlecategory,
    Articletags,
    Article,
    ArticleComment,
])
