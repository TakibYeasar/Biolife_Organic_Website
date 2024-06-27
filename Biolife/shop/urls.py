from django.urls import path
from . import views

urlpatterns = [
    # Add to cart
    path('products/<int:product_id>/add/',
         views.AddToCartView.as_view(), name='add_to_cart'),
    path('cart/', views.MyCart.as_view(), name='my_cart'),
    path('cart/<int:product_id>/increase/',
         views.IncreaseCartProdQuantity.as_view(), name='increase_cart_quantity'),
    path('cart/<int:product_id>/decrease/',
         views.DecreaseCartProdQuantity.as_view(), name='decrease_cart_quantity'),
    path('cart/<int:product_id>/delete/',
         views.DeleteCartProduct.as_view(), name='delete_cart_product'),
    path('cart/delete/', views.DeleteFullCart.as_view(), name='delete_full_cart'),
    path('payment/', views.PaymentView.as_view(), name='payment'),
    path('payment-successfull/', views.PaymentView.as_view(), name='payment_successfull'),
    path('payment-failed/', views.PaymentView.as_view(), name='payment_failed'),
]
