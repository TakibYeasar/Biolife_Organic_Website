from django.db import models
from authapi.models import CustomUser, Address
from products.models import Product

# Create your models here.


class Cart(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ('-date',)

    def __str__(self):
        return self.customer.username
    
    @property
    def total_price(self):
        total_price = 0
        for prod in self.product.all():
            total_price += prod.subtotal
        return total_price
    
    @property
    def items_count(self):
        return self.product.all().count()



class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} of {self.product}"

    @property
    def subtotal(self):
        return self.product.price * self.quantity
    
    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"
    


class BillingAddress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.username
    
    
class ShippingAddress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.username
    

ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    billing_address = models.ForeignKey(BillingAddress, on_delete=models.SET_NULL, blank=True, null=True)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, blank=True, null=True)
    order_status = models.CharField(max_length=255, choices=ORDER_STATUS, default="Order Received")
    payment_complete = models.BooleanField(default=False, blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('-date',)

    def __str__(self):
        return f"{self.user} - {self.code}"
    
    def get_total_price(self, obj):
        total_price = 0
        for prod in obj.cart.product.all():
            total_price += prod.subtotal
        return total_price
    
    # def save(self, *args, **kwargs):
    #     self.code = id_generator()
    #     super(Order, self).save(*args, **kwargs)



class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


