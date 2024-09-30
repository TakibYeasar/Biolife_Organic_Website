from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/auth/", include('authapi.urls')),
    # path('api/articles/', include('articles.urls')),
    # path('api/core/', include('core.urls')),
    # path('api/products/', include('products.urls')),
    # path('api/shop/', include('shop.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
