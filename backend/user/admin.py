from django.contrib import admin

from .models import (
    Customer,
    Farmer,
)

admin.site.register([
    Customer,
    Farmer,
])
