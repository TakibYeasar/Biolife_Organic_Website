from django.contrib import admin
from .models import Cart, CartProduct


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "total", "complete", "created_at")
    list_filter = ("complete", "created_at")
    search_fields = ("customer__username", "id")
    ordering = ("-created_at",)


@admin.register(CartProduct)
class CartProductAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity", "subtotal")
    list_filter = ("cart", "product")
    search_fields = ("cart__id", "product__name")
