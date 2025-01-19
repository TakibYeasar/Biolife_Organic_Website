from rest_framework import serializers
from .models import Category, Product, Review, ProductImage, AdditionalInfo


class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'parent', 'icon', 'image']

    def create(self, validated_data):
        user = self.context['request'].user
        return Category.objects.create(user=user, **validated_data)


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'image',
                  'parent', 'product_count', 'children', 'user']
        read_only_fields = ['user', 'slug', 'product_count', 'children']

    def get_children(self, obj):
        children = Category.objects.filter(parent=obj)
        return CategorySerializer(children, many=True, context=self.context).data

    def get_product_count(self, obj):
        return obj.products.count()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']

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
    images = ProductImageSerializer(many=True, required=False)
    additional_info = AdditionalInfoSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ['title', 'categories', 'main_image', 'images',
                  'price', 'old_price', 'description', 'additional_info']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        additional_info_data = validated_data.pop('additional_info', [])
        categories_data = validated_data.pop('categories', [])

        user = self.context['request'].user
        product = Product.objects.create(**validated_data)

        product.categories.set(categories_data)

        # Save images
        for image_data in images_data:
            ProductImage.objects.create(
                product=product, image=image_data['image'])

        # Save additional info
        for info_data in additional_info_data:
            AdditionalInfo.objects.create(
                title=info_data['title'], description=info_data['description'], products=product)

        return product

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.price = validated_data.get('price', instance.price)
        instance.old_price = validated_data.get(
            'old_price', instance.old_price)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.main_image = validated_data.get(
            'main_image', instance.main_image)
        instance.save()

        # Handle categories
        if 'categories' in validated_data:
            categories_data = validated_data.pop('categories', [])
            instance.categories.set(categories_data)

        # Handle images
        if 'images' in validated_data:
            images_data = validated_data.pop('images', [])
            instance.images.clear()
            for image_data in images_data:
                ProductImage.objects.create(
                    image=image_data['image'], product=instance)

        # Handle additional info
        if 'additional_info' in validated_data:
            additional_info_data = validated_data.pop('additional_info', [])
            instance.additional_info.clear()
            for info_data in additional_info_data:
                AdditionalInfo.objects.create(
                    title=info_data['title'], description=info_data['description'], products=instance)

        return instance


class ReviewCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['product', 'user', 'name', 'email', 'comment', 'rate']
        read_only_fields = ['user']

    def validate_rate(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Rate must be between 0 and 5.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class ReviewProductSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product = serializers.SlugRelatedField(
        queryset=Product.objects.all(), slug_field='slug')

    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'name',
                  'email', 'comment', 'rate', 'created_at']
        read_only_fields = ['created_at']


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(), slug_field='slug', many=True)
    images = ProductImageSerializer(many=True, required=False)
    additional_info = AdditionalInfoSerializer(
        many=True, read_only=True, source='additional_info.all')
    reviews = ReviewProductSerializer(
        many=True, read_only=True, source='reviews.all')
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'user', 'title', 'main_image', 'images', 'price', 'old_price', 'description', 'categories',
                  'additional_info', 'likes', 'likes_count', 'reviews', 'is_active', 'slug', 'created_at', 'is_approved']
        read_only_fields = ['slug', 'created_at', 'user']

    def get_likes_count(self, obj):
        return obj.likes.count()
