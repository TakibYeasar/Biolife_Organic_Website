from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include('authapi.urls')),
    path('api/products/', include('products.urls')),
    path('api/shop/', include('shop.urls')),
]
