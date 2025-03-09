from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'contact_number', 'city',
                    'state', 'is_deleted', 'created_at')
    list_filter = ('city', 'state', 'is_deleted', 'created_at')
    search_fields = ('user__username', 'email',
                     'contact_number', 'city', 'state', 'farm_name')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('User Information', {
            'fields': ('user', 'profile_photo', 'email', 'contact_number', 'address', 'city', 'state', 'zip_code', 'bio', 'social_media_links')
        }),
        ('Customer Details', {
            'fields': ('preferred_products', 'purchase_history'),
            'classes': ('collapse',)
        }),
        ('Farmer Details', {
            'fields': ('farm_name', 'farm_location', 'products_offered', 'certifications', 'website_url'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('is_deleted', 'created_at', 'updated_at'),
        }),
    )
