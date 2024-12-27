from django.contrib import admin

from .models import (
    ContactInfo,
    Banner,
    Brand,
    Testimonial,
    Newsletter,
)

admin.site.register([
    ContactInfo,
    Banner,
    Brand,
    Testimonial,
    Newsletter,
])
