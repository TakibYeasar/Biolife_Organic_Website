from rest_framework import serializers
from .models import Address, Payment, Order
from cart.models import CartProduct
from cart.serializers import CartProductSerializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'user', 'address_type', 'first_name', 'last_name', 'email',
            'phone', 'street_address', 'city', 'state', 'zip_code',
            'country', 'is_default', 'created_at'
        ]
        read_only_fields = ['created_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'customer', 'payment_method', 'payment_id', 'amount_paid',
            'status', 'created_at'
        ]
        read_only_fields = ['created_at']


class OrderSerializer(serializers.ModelSerializer):
    cart_products = serializers.SerializerMethodField()
    address = AddressSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'cart', 'address', 'cart_products',
            'subtotal', 'discount', 'total', 'payment',
            'payment_complete', 'order_status', 'created_at'
        ]
        read_only_fields = ['subtotal', 'total', 'created_at']

    def get_cart_products(self, obj):
        """
        Retrieve all cart products associated with the cart in the order.
        """
        cart_products = CartProduct.objects.filter(cart=obj.cart)
        return CartProductSerializer(cart_products, many=True).data
