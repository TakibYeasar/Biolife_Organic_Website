from django.urls import path
from .views import *

urlpatterns = [
    path('add-to-cart/<int:product_id>/',
         AddToCartView.as_view(), name='add-to-cart'),
    path('my-cart/', MyCart.as_view(), name='my-cart'),
    path('increase-cart-product/<int:product_id>/', IncreaseCartProdQuantity.as_view(),
         name='increase-cart-product'),
    path('decrease-cart-product/<int:product_id>/', DecreaseCartProdQuantity.as_view(),
         name='decrease-cart-product'),
    path('delete-cart-product/<int:product_id>/',
         DeleteCartProduct.as_view(), name='delete-cart-product'),
    path('delete-full-cart/', DeleteFullCart.as_view(), name='delete-full-cart'),
]
