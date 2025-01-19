from django.db import models
from django.conf import settings
from django.urls import reverse
from django.utils.text import slugify


class ArticleCategory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="article_categories"
    )
    name = models.CharField(max_length=50, unique=True)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="subcategories",
        verbose_name="Parent Category"
    )
    icon = models.ImageField(
        upload_to='articles/categories/icons/', blank=True, null=True)
    image = models.ImageField(
        upload_to='articles/categories/images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(blank=True, unique=True,
                            allow_unicode=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Categories'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('articles:category_detail', args=[self.slug])


class ArticleTag(models.Model):
    title = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Tags'
        ordering = ('-created_at',)

    def __str__(self):
        return self.title


class Article(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="articles"
    )
    categories = models.ManyToManyField(
        ArticleCategory,
        related_name="articles",
        verbose_name="Article Categories"
    )
    tags = models.ManyToManyField(
        ArticleTag,
        related_name="articles",
        verbose_name="Article Tags"
    )
    image = models.ImageField(upload_to='articles/images/', blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    author_name = models.CharField(max_length=150, blank=True, null=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="liked_articles",
        blank=True
    )
    author_profession = models.CharField(max_length=150, blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    slug = models.SlugField(blank=True, unique=True,
                            allow_unicode=True, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Articles'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('articles:detail', args=[self.slug])


class ArticleComment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="article_comments"
    )
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name="comments"
    )
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="replies",
        verbose_name="Parent Comment"
    )
    comment = models.TextField()
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="liked_comments",
        blank=True
    )
    dislikes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="disliked_comments",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Comments'
        ordering = ('-created_at',)

    def __str__(self):
        return f"Comment by {self.user} on {self.article}"
