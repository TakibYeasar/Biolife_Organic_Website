from django.contrib import admin
from .models import Category, AdditionalInfo, ProductImage, Product, Review, SpecialOffer


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


# Registering models with custom admin views
admin.site.register(Category, CategoryAdmin)
admin.site.register(AdditionalInfo, AdditionalInfoAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(SpecialOffer, SpecialOfferAdmin)
