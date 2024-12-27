from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from django.conf import settings
from django.utils.timezone import now, datetime


class Category(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="categories"
    )
    name = models.CharField(max_length=255, blank=True,
                            null=True, verbose_name="Category Name")
    parent = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.CASCADE, verbose_name="Parent Category"
    )
    icon = models.ImageField(
        upload_to='categories/icons/', blank=True, null=True)
    image = models.ImageField(
        upload_to='categories/images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, blank=True,
                            allow_unicode=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('products:category_detail', args=[self.slug])


class AdditionalInfo(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Additional Information'

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/images/')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Product Images'

    def __str__(self):
        return str(self.image)


class Product(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="products"
    )
    categories = models.ManyToManyField(Category, related_name="products")
    title = models.CharField(max_length=255, blank=True, null=True)
    main_image = models.ForeignKey(
        ProductImage, related_name='main_image', on_delete=models.CASCADE
    )
    images = models.ManyToManyField(
        ProductImage, related_name='additional_images', blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Price")
    old_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="Old Price")
    description = models.TextField(blank=True, null=True)
    additional_info = models.ManyToManyField(
        AdditionalInfo, blank=True, related_name="products")
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="liked_products", blank=True
    )
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, blank=True,
                            allow_unicode=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Products'
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('products:product_detail', args=[self.slug])


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews"
    )
    parent = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.CASCADE, related_name="child_reviews"
    )
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    rate = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Product Reviews'
        ordering = ('-created_at',)

    def __str__(self):
        return f"Review by {self.user} on {self.product}"


class SpecialOffer(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="special_offer")
    title = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateTimeField(default=datetime(2023, 1, 1, 0, 0, 0))
    end_date = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    discount = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="discount")
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
