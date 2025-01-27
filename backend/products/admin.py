from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'is_active', 'created_at')
    search_fields = ('name', 'slug')
    list_filter = ('is_active',)
    prepopulated_fields = {'slug': ('name',)}


class AdditionalInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    search_fields = ('title', 'description')


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'created_at')
    search_fields = ('image',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'old_price',
                    'is_active', 'created_at', 'user')
    list_filter = ('is_active', 'categories')
    search_fields = ('title', 'description', 'categories__name')
    prepopulated_fields = {'slug': ('title',)}


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'user', 'rate', 'created_at')
    list_filter = ('rate', 'created_at')
    search_fields = ('product__title', 'user__username', 'comment')


class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'discount',
                    'start_date', 'end_date', 'created')
    list_filter = ('category', 'start_date', 'end_date')
    search_fields = ('title', 'category__name')


class DiscountProductAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'discount_percentage',
                    'start_date', 'end_date', 'is_valid', 'created_at')
    list_filter = ('start_date', 'end_date', 'user')
    search_fields = ('product__title', 'user__username', 'slug')
    readonly_fields = ('created_at', 'updated_at', 'slug',
                       'start_date')  # Mark start_date as readonly
    ordering = ('-created_at',)
    fieldsets = (
        (None, {
            # Exclude start_date
            'fields': ('product', 'user', 'discount_percentage', 'end_date', 'slug')
        }),
        ('Timestamps', {
            # Add start_date to readonly section
            'fields': ('start_date', 'created_at', 'updated_at')
        }),
    )

    def is_valid(self, obj):
        """Display if the discount is currently valid."""
        return obj.is_valid_discount()
    is_valid.boolean = True
    is_valid.short_description = 'Valid Discount'

# Registering models with custom admin views
admin.site.register(Category, CategoryAdmin)
admin.site.register(AdditionalInfo, AdditionalInfoAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(SpecialOffer, SpecialOfferAdmin)
admin.site.register(DiscountProduct, DiscountProductAdmin)
