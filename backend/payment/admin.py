from django.contrib import admin

from .models import (
    Address,
    Payment,
    Order,
)

admin.site.register([
    Address,
    Payment,
    Order,
])
