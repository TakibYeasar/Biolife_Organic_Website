from rest_framework import serializers
from .models import Customer, Farmer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = "__all__"
