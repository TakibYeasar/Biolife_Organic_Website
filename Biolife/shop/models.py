from django.db import models
from authapi.models import CustomUser
from products.models import Product

# Create your models here.

class Cart(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-created', ]


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    subtotal = models.DecimalField(decimal_places=2, max_digits=8, default=0)

    def get_product_total(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"


ADDRESS_TYPE = (
    ("ship", "shipping"),
    ("bill", "billing"),
)

class Address(models.Model):
    user = models.ForeignKey(CustomUser, default=1, on_delete=models.CASCADE)
    address_type = models.CharField(
        max_length=10, choices=ADDRESS_TYPE, default="ship")
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    mobile = models.CharField(max_length=50, null=True, blank=True)
    street_address = models.CharField(max_length=200, null=True, blank=True)
    town = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    zip_code = models.CharField(max_length=50, null=True, blank=True)
    is_default = models.BooleanField(default=False, blank=True)
    is_active = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"{self.user.username} => {self.email}"


PAYMENT_METHOD = (
    ('paypal', 'PayPal'),
    ('stripe', 'stripe'),
)


class Payment(models.Model):
    customer = models.ForeignKey(
        CustomUser, default=1, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD)
    payment_id = models.CharField(max_length=255)
    amount_paid = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.payment_id



ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)


class Order(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE, default=None)
    in_processing = models.BooleanField(default=False)
    address = models.ForeignKey(
        Address, on_delete=models.SET_NULL, null=True, blank=True)
    subtotal = models.DecimalField(decimal_places=2, max_digits=8, default=0)
    discount = models.DecimalField(decimal_places=2, max_digits=8)
    total = models.DecimalField(decimal_places=2, max_digits=8)
    payment = models.ForeignKey(
        Payment, on_delete=models.SET_NULL, null=True, blank=True)
    payment_complete = models.BooleanField(
        default=False, blank=True, null=True)
    order_status = models.CharField(max_length=50, choices=ORDER_STATUS)
    created_at = models.DateTimeField(
        verbose_name="Order date", auto_now_add=True)

    class Meta:
        ordering = ['-created_at', ]

    def __str__(self):
        return self.buyer.username


