from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify

# Create your models here.


class ContactInfo(models.Model):
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    working_hours = models.CharField(
        max_length=100, blank=True, null=True, help_text="e.g., Mon-Fri 9:00 AM - 5:00 PM")
    facebook_link = models.URLField(max_length=255, blank=True, null=True)
    twitter_link = models.URLField(max_length=255, blank=True, null=True)
    instagram_link = models.URLField(max_length=255, blank=True, null=True)
    youtube_link = models.URLField(max_length=255, blank=True, null=True)
    linkedin_link = models.URLField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Contact Information'

    def __str__(self):
        return self.email or "Contact Info"


class Banner(models.Model):
    image = models.ImageField(upload_to='banners/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Banners'
        ordering = ('-created_at',)

    def __str__(self):
        return self.title or "Banner"


class Featured(models.Model):
    image = models.ImageField(upload_to='featureds/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Featureds'
        ordering = ('-created_at',)

    def __str__(self):
        return self.title or "Featured"


class Brand(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Brands'
        ordering = ('-created_at',)

    def __str__(self):
        return self.name or "Brand"


class Testimonial(models.Model):
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    position = models.CharField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    slug = models.SlugField(null=False, unique=True,
                            blank=True, allow_unicode=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Testimonials'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('testimonials:detail', args=[self.slug])


class Newsletter(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Newsletter Subscriptions'
        ordering = ('-subscribed_at',)

    def __str__(self):
        return self.email

