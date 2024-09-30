from django.db import models
from authapi.models import CustomUser
from django.shortcuts import reverse
from django.utils.text import slugify

# Create your models here.

class Category(models.Model):
    cat_name = models.CharField(max_length=255, blank=True, null=True)
    parent = models.ForeignKey('self', blank=True, null=True,
                               on_delete=models.CASCADE, verbose_name="Parent Category")
    icon = models.ImageField(upload_to='product/', blank=True, null=True)
    image = models.ImageField(upload_to='product/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(null=False, allow_unicode=True, db_index=True, blank=True, unique=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('-created',)
    
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.cat_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.cat_name

    def get_absolute_url(self):
        return reverse('products:category', args=[self.slug])


class Shippingfaq(models.Model):
    question = models.CharField(max_length=255, blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Shipping Faq'
        ordering = ('-created',)

    def __str__(self):
        return self.question


class Additionalinfo(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Additional info'

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Product Images'

    def __str__(self):
        return str(self.image)


class Product(models.Model):
    category = models.ManyToManyField(
        Category, verbose_name="Product Category")
    title = models.CharField(max_length=255, blank=True, null=True)
    main_image = models.ForeignKey(
        ProductImage, related_name='productitem_main_image', on_delete=models.CASCADE, default=1)
    images = models.ManyToManyField(
        ProductImage, related_name='productitem_images', blank=True)
    price = models.PositiveBigIntegerField(verbose_name="Product Price")
    old_price = models.PositiveBigIntegerField(
        blank=True, null=True, verbose_name="Product Old Price")
    description = models.TextField(blank=True, null=True)
    additional_info = models.ManyToManyField(Additionalinfo, blank=True)
    faq = models.ManyToManyField(Shippingfaq, blank=True)
    likes = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="likes_product", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(null=False,
                            allow_unicode=True, db_index=True, blank=True, unique=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Products'
        ordering = ('-created',)
        
    def save(self, *args, **kwargs):
        # Use a custom slugify function if desired
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'({self.category}) - ({self.title})'

    def get_absolute_url(self):
        return reverse('products:product', args=[self.slug])



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', blank=True, null=True,
                               on_delete=models.CASCADE, verbose_name="Product Review")
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    rate = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Product Reviews'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.product} From: {self.customer}"


class TopratedProd(models.Model):
    product = models.ManyToManyField(Product)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Toprated Products'
        ordering = ('-created',)


class OnsaleProd(models.Model):
    product = models.ManyToManyField(Product)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Onsale Products'
        ordering = ('-created',)


class BestsellingProd(models.Model):
    product = models.ManyToManyField(Product)
    time = models.DateTimeField(auto_now_add=True)
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Bestselling Product'
        ordering = ('-created',)


class DiscountProd(models.Model):
    product = models.ManyToManyField(Product)
    discounted_price = models.PositiveBigIntegerField()
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Discount Product'
        ordering = ('-created',)
