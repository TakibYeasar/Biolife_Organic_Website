from django.contrib import admin

from .models import (
    Category,
    Shippingfaq,
    Additionalinfo,
    ProductImage,
    Product,
    Review,
    TopratedProd,
    OnsaleProd,
    BestsellingProd,
    DiscountProd,
)

admin.site.register([
    Category,
    Shippingfaq,
    Additionalinfo,
    ProductImage,
    Product,
    Review,
    TopratedProd,
    OnsaleProd,
    BestsellingProd,
    DiscountProd,
])
