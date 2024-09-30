from django.contrib import admin

from .models import (
    Contactinfo,
    Banner,
    Featured,
    SpecialOffer,
    Brands,
    About,
    Testimonial,
    Newslatter,
)

admin.site.register([
    Contactinfo,
    Banner,
    Featured,
    SpecialOffer,
    Brands,
    About,
    Testimonial,
    Newslatter,
])
