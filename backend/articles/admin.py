from django.contrib import admin
from .models import ArticleCategory, ArticleTag, Article, ArticleComment
from django.core.exceptions import ValidationError


@admin.register(ArticleCategory)
class ArticleCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'parent', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ArticleTag)
class ArticleTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')
    search_fields = ('title',)
    ordering = ('-created_at',)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at', 'categories')
    search_fields = ('title', 'description',
                     'author_name', 'author_profession')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('categories', 'tags', 'likes')


@admin.register(ArticleComment)
class ArticleCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'article', 'parent', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('comment', 'user__username', 'article__title')
    autocomplete_fields = ('user', 'article', 'parent')
    
    def save_model(self, request, obj, form, change):
        if obj.parent and obj.parent.article != obj.article:
            raise ValidationError(
                "The parent comment must belong to the same article.")
        super().save_model(request, obj, form, change)

