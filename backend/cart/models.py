from django.db import models
from django.conf import settings
from products.models import Product

# Create your models here.

class Cart(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(
        auto_now_add=True) 

    class Meta:
        ordering = ['-created_at', ]

    def __str__(self):
        return f"Cart {self.id} for {self.customer.username}"


class CartProduct(models.Model):
    cart = models.ForeignKey(
        Cart, related_name="cart_products", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)

    def get_product_total(self):
        return self.product.price * self.quantity

    def save(self, *args, **kwargs):
        self.subtotal = self.get_product_total()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"CartProduct {self.id} for Cart {self.cart.id}"

