from django.contrib import admin

from .models import (
    Cart,
    CartProduct,
    Address,
    Payment,
    Order,
)

admin.site.register([
    Cart,
    CartProduct,
    Address,
    Payment,
    Order,
])
