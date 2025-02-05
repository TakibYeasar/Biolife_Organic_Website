from rest_framework import serializers
from .models import Order, SubOrder, Payment, Address
from cart.models import CartProduct


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class CartProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = CartProduct
        fields = ["id", "product_name", "quantity", "price"]


class SubOrderSerializer(serializers.ModelSerializer):
    products = CartProductSerializer(many=True, read_only=True)
    farmer_name = serializers.CharField(
        source="farmer.username", read_only=True)

    class Meta:
        model = SubOrder
        fields = ["id", "order", "farmer", "farmer_name",
                  "products", "subtotal", "order_status", "paid"]


class OrderSerializer(serializers.ModelSerializer):
    sub_orders = SubOrderSerializer(many=True, read_only=True)
    customer_name = serializers.CharField(
        source="customer.username", read_only=True)
    address = AddressSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer", "customer_name", "cart", "address", "subtotal",
                  "discount", "total", "payment", "payment_complete", "order_status", "sub_orders"]


