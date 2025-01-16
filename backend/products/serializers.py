from rest_framework import serializers
from .models import Category, Product, Review, ProductImage, AdditionalInfo


class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'parent', 'icon', 'image']

    def create(self, validated_data):
        # Assign the authenticated user to the category
        user = self.context['request'].user
        return Category.objects.create(user=user, **validated_data)


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon',
                  'image', 'product_count', 'user']
        read_only_fields = ['user', 'slug', 'product_count']

    def get_product_count(self, obj):
        return obj.products.count() if hasattr(obj, 'products') else 0


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image', 'created_at']
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None



class AdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalInfo
        fields = ['title', 'description']


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'categories', 'main_image', 'images', 'price', 'old_price',
                  'description', 'additional_info']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        additional_info_data = validated_data.pop('additional_info', [])
        categories_data = validated_data.pop('categories', [])

        user = self.context['request'].user
        product = Product.objects.create(user=user, **validated_data)

        product.categories.set(categories_data)

        # Save images
        for image_data in images_data:
            ProductImage.objects.create(product=product, image=image_data)

        # Save additional info
        for info_data in additional_info_data:
            AdditionalInfo.objects.create(product=product, **info_data)

        return product


class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(), slug_field='slug', many=True
    )
    images = ProductImageSerializer(many=True, required=False)
    additional_info = AdditionalInfoSerializer(many=True, required=False)
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['user', 'title', 'main_image', 'images', 'price', 'old_price',
                  'description', 'categories', 'additional_info', 'likes', 'likes_count',
                  'is_active', 'slug', 'created_at', 'is_approved']
        read_only_fields = ['slug', 'created_at', 'user']

    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None


class ReviewProductSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product = serializers.SlugRelatedField(
        queryset=Product.objects.all(), slug_field='slug'
    )

    class Meta:
        model = Review
        fields = ['product', 'user', 'name',
                  'email', 'comment', 'rate', 'created_at']
        read_only_fields = ['created_at']
