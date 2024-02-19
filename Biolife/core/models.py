from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from django.utils.timezone import now, datetime

# Create your models here.

class Contactinfo(models.Model):
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    duration = models.CharField(max_length=100, blank=True, null=True)
    facebook_link = models.CharField(max_length=255, blank=True, null=True)
    twitter_link = models.CharField(max_length=255, blank=True, null=True)
    google_link = models.CharField(max_length=255, blank=True, null=True)
    instagram_link = models.CharField(max_length=255, blank=True, null=True)
    youtube_link = models.CharField(max_length=255, blank=True, null=True)
    linkedin_link = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Contact Info'

    def __str__(self):
        return self.email


class Banner(models.Model):
    image = models.ImageField(upload_to='banner/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Banners'
        ordering = ('-created',)

    def __str__(self):
        return self.title


class Featured(models.Model):
    image = models.ImageField(upload_to='featured/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Featureds'
        ordering = ('-created',)

    def __str__(self):
        return self.title


class SpecialOffer(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='offer/')
    start_date = models.DateTimeField(default=datetime(2023, 1, 1, 0, 0, 0))
    end_date = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Special offers'
        ordering = ('-created',)
    
    def __str__(self):
        return f"{self.title} ({self.get_display_duration()})"

    def get_display_duration(self):
        if self.duration:
            # Use timedelta formatting with appropriate units
            return str(self.duration).split(".")[0].replace(",", "")
        elif self.end_date and self.start_date:
            # Calculate duration if end_date exists
            self.duration = self.end_date - self.start_date
            return self.get_display_duration()
        else:
            return "Ongoing"

    def is_active(self):
        if not self.start_date:
            return False
        if self.end_date:
            return now() <= self.end_date
        else:
            return True


class Brands(models.Model):
    image = models.ImageField(upload_to='brands/', blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Brands'
        ordering = ('-created',)


class About(models.Model):
    image = models.ImageField(upload_to='about/')
    desc = models.TextField()
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'About'
        ordering = ('-created',)


class Testimonial(models.Model):
    image = models.ImageField(upload_to='testimonial/')
    name = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    slug = models.SlugField(null=False, allow_unicode=True,
                            db_index=True, blank=True, unique=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Testimonials'
        ordering = ('-created',)
    
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('core:testimonials', args=[self.slug])


class Newslatter(models.Model):
    email = models.EmailField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Newslatter'
        ordering = ('-created',)

    def __str__(self):
        return self.email
