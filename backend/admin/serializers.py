from rest_framework import serializers
from .models import *


class ContactinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contactinfo
        fields = "__all__"


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url

class FeaturedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Featured
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class SpecialOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialOffer
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brands
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url
