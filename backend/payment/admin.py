from django.contrib import admin
from .models import *


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "address_type",
        "street_address",
        "city",
        "state",
        "zip_code",
        "country",
        "is_default",
        "created_at",
    )
    list_filter = ("address_type", "is_default", "created_at")
    search_fields = (
        "user__username",
        "street_address",
        "city",
        "state",
        "zip_code",
        "country",
    )
    ordering = ("-created_at",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "payment_method",
        "payment_id",
        "amount_paid",
        "status",
        "created_at",
    )
    list_filter = ("payment_method", "status", "created_at")
    search_fields = ("customer__username", "payment_id")
    ordering = ("-created_at",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "cart",
        "address",
        "subtotal",
        "discount",
        "total",
        "payment",
        "payment_complete",
        "order_status",
        "created_at",
    )
    list_filter = ("order_status", "payment_complete", "created_at")
    search_fields = (
        "customer__username",
        "cart__id",
        "address__street_address",
        "payment__payment_id",
    )
    ordering = ("-created_at",)
    readonly_fields = ("subtotal", "discount", "total")


class CartProductInline(admin.TabularInline):
    model = SubOrder.products.through
    extra = 0
    verbose_name = "Cart Product"
    verbose_name_plural = "Cart Products"

@admin.register(SubOrder)
class SubOrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order",
        "farmer",
        "subtotal",
        "order_status",
    )
    list_filter = ("order_status", "farmer")
    search_fields = ("order__id", "farmer__username")
    inlines = [CartProductInline]
    readonly_fields = ("subtotal",)

