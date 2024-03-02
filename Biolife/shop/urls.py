from django.urls import path
from . import views

urlpatterns = [
    # Add to cart
    path('products/<int:product_id>/add/',
         views.AddToCartView.as_view(), name='add_to_cart'),
    # View my cart
    path('cart/', views.MyCart.as_view(), name='my_cart'),
    # Increase cart product quantity
    path('cart/<int:product_id>/increase/',
         views.IncreaseCartProdQuantity.as_view(), name='increase_cart_quantity'),
    # Decrease cart product quantity
    path('cart/<int:product_id>/decrease/',
         views.DecreaseCartProdQuantity.as_view(), name='decrease_cart_quantity'),
    # Delete cart product
    path('cart/<int:product_id>/delete/',
         views.DeleteCartProduct.as_view(), name='delete_cart_product'),
    # Delete complete cart
    path('cart/delete/', views.DeleteFullCart.as_view(), name='delete_full_cart'),
]
