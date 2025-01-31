from django.db import models
from django.conf import settings
from cart.models import Cart, CartProduct

# Create your models here.

ADDRESS_TYPE_CHOICES = (
    ("ship", "Shipping"),
    ("bill", "Billing"),
)


class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    address_type = models.CharField(
        max_length=10, choices=ADDRESS_TYPE_CHOICES, default="ship"
    )
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    street_address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.user.username} - {self.get_address_type_display()} Address"


PAYMENT_METHOD_CHOICES = (
    ("stripe", "Stripe"),
    ("paypal", "Paypal"),
    ("credit_card", "Credit Card"),
)


class Payment(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payment_method = models.CharField(
        max_length=50, choices=PAYMENT_METHOD_CHOICES
    )
    payment_id = models.CharField(max_length=255, unique=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"

    def __str__(self):
        return f"Payment {self.payment_id} for {self.customer.username}"


ORDER_STATUS_CHOICES = (
    ("received", "Order Received"),
    ("processing", "Order Processing"),
    ("shipped", "Shipped"),
    ("completed", "Order Completed"),
    ("canceled", "Order Canceled"),
)


class Order(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders"
    )
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    address = models.ForeignKey(
        Address, on_delete=models.SET_NULL, null=True, blank=True
    )
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    discount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment = models.ForeignKey(
        Payment, on_delete=models.SET_NULL, null=True, blank=True
    )
    payment_complete = models.BooleanField(default=False)
    order_status = models.CharField(
        max_length=50, choices=ORDER_STATUS_CHOICES, default="received"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"Order {self.id} for {self.customer.username}"

    def calculate_totals(self):
        self.subtotal = sum(
            item.subtotal for item in self.cart.cart_products.all()
        )
        self.total = self.subtotal - self.discount

    def save(self, *args, **kwargs):
        self.calculate_totals()
        super().save(*args, **kwargs)


class SubOrder(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="sub_orders")
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sub_orders_as_farmer",
    )
    products = models.ManyToManyField(CartProduct, related_name="sub_orders")
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    order_status = models.CharField(
        max_length=50, choices=ORDER_STATUS_CHOICES, default="received"
    )

    class Meta:
        verbose_name = "Sub Order"
        verbose_name_plural = "Sub Orders"

    def __str__(self):
        return f"SubOrder {self.id} for Order {self.order.id} (Farmer: {self.farmer.username})"

    def calculate_subtotal(self):
        self.subtotal = sum(
            product.subtotal for product in self.products.all())

    def save(self, *args, **kwargs):
        self.calculate_subtotal()
        super().save(*args, **kwargs)

