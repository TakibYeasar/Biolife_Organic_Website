from django.urls import path
from .views import *

urlpatterns = [
    path("orders/", OrderAPIView.as_view(), name="order-list"),
    path("order_create/", OrderAPIView.as_view(), name="order-create"),
    path("address_add/", AddAddressAPIView.as_view(), name="add-address"),
    path("payment/", PaymentView.as_view(), name="process-payment"),
]
