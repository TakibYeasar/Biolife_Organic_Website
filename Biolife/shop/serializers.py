from django.db.models import fields
from .models import *
from products.models import Product
from rest_framework import serializers


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
        depth = 1


class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = "__all__"
        depth = 1


class AddAdressSerializer(serializers.ModelSerializer):
    is_default = serializers.BooleanField()

    class Meta:
        model = Address
        fields = "_all_"

    def validate(self, attrs):
        print("attrs => ", attrs)
        data = {
            "street": attrs.get('street'),
            "zip_code": attrs.get('zip_code'),
            "city": attrs.get('city'),
            "country": attrs.get('country'),
            "is_default": attrs.get('is_default'),
        }
        return data

    def create(self, validate_data):
        print("validate_data => ", validate_data)
        address = Address.objects.create(**validate_data)
        return address


class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', ]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        

class PaymentSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=225)

    class Meta:
        models: Payment
        fields = ['token', ]
