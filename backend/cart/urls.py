from django.urls import path
from .views import *

urlpatterns = [
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('my-cart/', MyCart.as_view(), name='my-cart'),
    path('increase-cart-product/', IncreaseCartProdQuantity.as_view(),
         name='increase-cart-product'),
    path('decrease-cart-product/', DecreaseCartProdQuantity.as_view(),
         name='decrease-cart-product'),
    path('delete-cart-product/<int:pk>/',
         DeleteCartProduct.as_view(), name='delete-cart-product'),
    path('delete-full-cart/', DeleteFullCart.as_view(), name='delete-full-cart'),
]
