from django.db import models
from authapi.models import CustomUser
from django.shortcuts import reverse

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='category/', blank=True, null=True)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:category", kwargs={
            'slug': self.slug
        })
        
        
        
class Subcategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='category/', blank=True, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Sub Categories'
        ordering = ('-created',)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:subcategory", kwargs={
            'slug': self.slug
        })

        

class Banner(models.Model):
    image = models.ImageField(upload_to='banner/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Banners'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:banner", kwargs={
            'slug': self.slug
        })
    


class Featured(models.Model):
    image = models.ImageField(upload_to='featured/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Featureds'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:featured", kwargs={
            'slug': self.slug
        })



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


class Product(models.Model):
    category = models.ManyToManyField(Subcategory)
    title = models.CharField(max_length=255, blank=True, null=True)
    photo_main = models.ImageField(upload_to='products/')
    photo_2 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_3 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_4 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_5 = models.ImageField(upload_to='products/', blank=True, null=True)
    price = models.PositiveBigIntegerField()
    old_price = models.PositiveBigIntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    additional_info = models.ManyToManyField(Additionalinfo, blank=True)
    faq = models.ManyToManyField(Shippingfaq)
    likes = models.ManyToManyField(CustomUser, blank=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Products'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'slug': self.slug
        })
        
        
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    rate = models.IntegerField(default=0)
    # likes = models.ManyToManyField(CustomUser, related_name="likes", blank=True)
    # dislikes = models.ManyToManyField(CustomUser, related_name="dislikes", blank=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Product Reviews'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.product} From: {self.customer}"
    
    
    
class ReplayReview(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    comment = models.TextField()
    rate = models.IntegerField(default=0)
    # likes = models.ManyToManyField(CustomUser, related_name="likes", blank=True)
    # dislikes = models.ManyToManyField(CustomUser, related_name="dislikes", blank=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Replay Reviews'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.review} From: {self.customer}"
        
    

class FeaturedProd(models.Model):
    product = models.ManyToManyField(Product)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Featured Products'
        ordering = ('-created',)

    def __str__(self):
        return self.product.title
    
    
class TopratedProd(models.Model):
    product = models.ManyToManyField(Product)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Toprated Products'
        ordering = ('-created',)

    def __str__(self):
        return self.product.title
    


class OnsaleProd(models.Model):
    product = models.ManyToManyField(Product)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Onsale Products'
        ordering = ('-created',)

    def __str__(self):
        return self.product.title

    
    
class SpecialOffer(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='offer/')
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Special offers'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:specialoffer", kwargs={
            'slug': self.slug
        })
    



class Bestselling(models.Model):
    product = models.ManyToManyField(Product)
    time = models.DateTimeField(auto_now_add=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Bestselling Product'
        ordering = ('-created',)

    def __str__(self):
        return self.product.title
    


class DiscountProduct(models.Model):
    product = models.ManyToManyField(Product)
    discounted_price = models.PositiveBigIntegerField()
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Discount Product'
        ordering = ('-created',)

    def __str__(self):
        return self.product.title
    
    
    

class Brands(models.Model):
    image = models.ImageField(upload_to='brands/', blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Brands'
        ordering = ('-created',)



class Articlescategory(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Article Category'
        ordering = ('-created',)
    
    def __str__(self):
        return self.title
    
    
    
class Articlestag(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Article Tags'
        ordering = ('-created',)
    
    def __str__(self):
        return self.title
    
    

class Articles(models.Model):
    image = models.ImageField(upload_to='articles/')
    title = models.CharField(max_length=150, blank=True, null=True)
    category = models.ManyToManyField(Articlescategory)
    date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField(Articlestag, blank=True)
    likes = models.ManyToManyField(CustomUser, blank=True)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Articles'
        ordering = ('-created',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("core:articles", kwargs={
            'slug': self.slug
        })
    
    
class ArticleReview(models.Model):
    article = models.ForeignKey(Articles, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    rate = models.IntegerField(default=0)
    # likes = models.ManyToManyField(CustomUser, related_name="likes", blank=True)
    # dislikes = models.ManyToManyField(CustomUser, related_name="dislikes", blank=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Article Reviews'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.product} From: {self.customer}"
    
    
    
class ReplayArticleReview(models.Model):
    review = models.ForeignKey(ArticleReview, on_delete=models.CASCADE)
    article = models.ForeignKey(Articles, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    rate = models.IntegerField(default=0)
    # likes = models.ManyToManyField(CustomUser, related_name="likes", blank=True)
    # dislikes = models.ManyToManyField(CustomUser, related_name="dislikes", blank=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Replay Article Reviews'
        ordering = ('-created',)

    def __str__(self):
        return f"To: {self.product} From: {self.customer}"
    
    
    
class About(models.Model):
    image = models.ImageField(upload_to='about/')
    desc = models.TextField()
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'About'
        ordering = ('-created',)
    
    def __str__(self):
        return self.image
    
    
    
class Testimonial(models.Model):
    image = models.ImageField(upload_to='testimonial/')
    comment = models.TextField()
    author = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    ratings = models.IntegerField()
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Testimonials'
        ordering = ('-created',)
    
    def __str__(self):
        return self.author
 
    
class Newslatter(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=16, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Newslatter'
        ordering = ('-created',)
    
    def __str__(self):
        return self.email
    
    

    
    