from django.contrib import admin

from .models import (
    Cart,
    CartProduct,
    BillingAddress,
    ShippingAddress,
    Order,
    Payment,
)

admin.site.register([
    Cart,
    CartProduct,
    BillingAddress,
    ShippingAddress,
    Order,
    Payment,
])