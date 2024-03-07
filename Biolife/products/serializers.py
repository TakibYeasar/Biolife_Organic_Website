from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        depth = 1


class ShippingfaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shippingfaq
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class ReviewProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        depth = 1

    
class TopratedprodSerializer(serializers.ModelSerializer):
    # Adjusted field name to match the model
    product = ProductSerializer(many=True)

    class Meta:
        model = TopratedProd
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductSerializer(
            instance.product.all(), many=True).data  # Adjusted field name
        return response


class OnsaleprodSerializer(serializers.ModelSerializer):
    # Adjusted field name to match the model
    product = ProductSerializer(many=True)
    class Meta:
        model = OnsaleProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductSerializer(
            instance.product.all(), many=True).data  # Adjusted field name
        return response
        

class BestsellingprodSerializer(serializers.ModelSerializer):
    # Adjusted field name to match the model
    product = ProductSerializer(many=True)
    class Meta:
        model = BestsellingProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductSerializer(
            instance.product.all(), many=True).data  # Adjusted field name
        return response


class DiscountprodSerializer(serializers.ModelSerializer):
    # Adjusted field name to match the model
    product = ProductSerializer(many=True)
    class Meta:
        model = DiscountProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductSerializer(
            instance.product.all(), many=True).data  # Adjusted field name
        return response
