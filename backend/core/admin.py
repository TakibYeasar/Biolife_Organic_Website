from django.contrib import admin
from .models import ContactInfo, Banner, Featured, Brand, Testimonial, Newsletter


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone', 'address')
    search_fields = ('email', 'phone', 'address')


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'subtitle', 'created_at')
    search_fields = ('title', 'subtitle')
    list_filter = ('created_at',)


@admin.register(Featured)
class FeaturedAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'subtitle', 'created_at')
    search_fields = ('title', 'subtitle')
    list_filter = ('created_at',)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'position', 'created_at')
    search_fields = ('name', 'position', 'comment')
    list_filter = ('created_at',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'subscribed_at')
    search_fields = ('email',)
    list_filter = ('subscribed_at',)

