from django.contrib import admin

from .models import (
    Address,
    Payment,
    OrderdItem,
    Order,
)

admin.site.register([
    Address,
    Payment,
    OrderdItem,
    Order,
])
