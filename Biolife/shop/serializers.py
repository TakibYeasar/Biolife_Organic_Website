from rest_framework import serializers
from .models import *
from authapi.serializers import CustomUserSerializer
from products.serializers import ProductSerializer


class CartProductSerializer(serializers.ModelSerializer):
    # Nested read-only product representation
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartProduct
        fields = ('id', 'cart', 'product', 'quantity', 'subtotal')


class CartSerializer(serializers.ModelSerializer):
    # Nested read-only customer representation
    customer = CustomUserSerializer(read_only=True)
    total = serializers.IntegerField(
        read_only=True)  # Calculate total dynamically
    # Nested read-only list of cart products
    cart_products = CartProductSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'customer', 'total', 'complete',
                  'created', 'cart_products')


class AddAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    # Nested read-only customer representation
    customer = CustomUserSerializer(read_only=True)
    # Nested read-only cart representation
    cart = CartSerializer(read_only=True)
    # Nested read-only address representation
    address = AddAdressSerializer(read_only=True)
    # Nested read-only payment representation
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

