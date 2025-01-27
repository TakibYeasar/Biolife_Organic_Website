from django.db import models
from django.conf import settings
from products.models import Product

# Create your models here.


class Cart(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="carts"
    )
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

    def __str__(self):
        return f"Cart {self.id} for {self.customer.username}"


class CartProduct(models.Model):
    cart = models.ForeignKey(
        Cart, related_name="cart_products", on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        verbose_name = "Cart Product"
        verbose_name_plural = "Cart Products"

    def calculate_subtotal(self):
        return self.product.price * self.quantity

    def save(self, *args, **kwargs):
        self.subtotal = self.calculate_subtotal()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"CartProduct {self.id} for Cart {self.cart.id}"


