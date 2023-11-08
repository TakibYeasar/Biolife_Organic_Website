from rest_framework import serializers
from .models import *


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
    def get_total_price(self, obj):
        return obj.total_price

    def get_items_count(self, obj):
        return obj.items_count
    



class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'
        
    def get_subtotal(self, obj):
        return obj.subtotal
        

        
class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        fields = '__all__'
        
        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'
        


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price

    def get_items_count(self, obj):
        return obj.cart.items.all().count()


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

