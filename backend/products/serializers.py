from rest_framework import serializers
from .models import Category, Product, Review, ProductImage, AdditionalInfo


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'image', 'product_count']
        read_only_fields = ['user']

    def get_product_count(self, obj):
        return obj.products.count()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'created_at']


class AdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalInfo
        fields = ['id', 'title', 'description']


class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(), slug_field='slug', many=True
    )
    main_image = ProductImageSerializer()
    images = ProductImageSerializer(many=True, required=False)
    additional_info = AdditionalInfoSerializer(many=True, required=False)
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'main_image', 'images', 'price', 'old_price',
                  'description', 'categories', 'additional_info', 'likes', 'likes_count',
                  'is_active', 'slug', 'created_at', 'user']
        read_only_fields = ['slug', 'created_at', 'user']

    def get_likes_count(self, obj):
        return obj.likes.count()


class ReviewProductSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product = serializers.SlugRelatedField(
        queryset=Product.objects.all(), slug_field='slug'
    )

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'name',
                  'email', 'comment', 'rate', 'created_at']
        read_only_fields = ['created_at']
