from rest_framework import serializers
from .models import Cart, CartProduct
from products.serializers import ProductSerializer


class CartProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartProduct
        fields = ['id', 'cart', 'product', 'quantity', 'subtotal']
        read_only_fields = ['subtotal']


class CartSerializer(serializers.ModelSerializer):
    cart_products = CartProductSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'total',
                  'complete', 'created_at', 'cart_products']
        read_only_fields = ['total', 'created_at']
