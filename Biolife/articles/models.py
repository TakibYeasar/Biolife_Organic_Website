from django.db import models
from authapi.models import CustomUser
from django.shortcuts import reverse
from django.utils.text import slugify

# Create your models here.

class Articlecategory(models.Model):
    cat_name = models.CharField(max_length=255, blank=True, null=True)
    parent = models.ForeignKey('self', null=True, blank=True,
                               on_delete=models.CASCADE, verbose_name="Parent Category")
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(null=False, allow_unicode=True,
                            db_index=True, blank=True, unique=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Category'
        ordering = ('-created',)
    
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.cat_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.cat_name

    def get_absolute_url(self):
        return reverse('articles:articlescategory', args=[self.slug])


class Articletags(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Tags'
        ordering = ('-created',)

    def __str__(self):
        return self.title


class Article(models.Model):
    category = models.ManyToManyField(
        Articlecategory, verbose_name="Article Category")
    image = models.ImageField(upload_to='articles/')
    title = models.CharField(max_length=150, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField(Articletags, related_name="article_tags")
    author_name = models.CharField(max_length=150, blank=True, null=True)
    author_profession = models.CharField(max_length=150, blank=True, null=True)
    likes = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="likes_article", blank=True, null=True)
    slug = models.SlugField(null=False, allow_unicode=True,
                            db_index=True, blank=True, unique=True)
    is_active = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Articles'
        ordering = ('-created',)
    
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'({self.category}) - ({self.title})'

    def get_absolute_url(self):
        return reverse('articles:article', args=[self.slug])


class ArticleComment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE,
                               verbose_name="Articles Comments", null=True, blank=True)
    comment = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='comments/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    likes = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="likes_article_comment", blank=True, null=True)
    dislikes = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="dislikes_article_comment", blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Article Comments'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.article} From: {self.customer}"
