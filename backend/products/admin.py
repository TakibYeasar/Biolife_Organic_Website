from django.contrib import admin

from .models import (
    Category,
    AdditionalInfo,
    ProductImage,
    Product,
    Review,
)

admin.site.register([
    Category,
    AdditionalInfo,
    ProductImage,
    Product,
    Review,
])
