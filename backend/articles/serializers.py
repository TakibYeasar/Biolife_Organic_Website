from rest_framework import serializers
from .models import ArticleCategory, ArticleTag, Article, ArticleComment


class CreateArticleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCategory
        fields = ['name', 'parent', 'icon', 'image']

    def create(self, validated_data):
        # Assign the authenticated user to the category
        user = self.context['request'].user
        return ArticleCategory.objects.create(user=user, **validated_data)
    

class ArticleCategorySerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField()

    class Meta:
        model = ArticleCategory
        fields = ['id', 'name', 'parent', 'icon', 'image', 'is_active',
                  'slug', 'created_at', 'article_count']
        read_only_fields = ['slug', 'created_at']

    def get_article_count(self, obj):
        return obj.articles.count()


class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = ['id', 'title', 'created_at']
        read_only_fields = ['created_at']



class ArticleCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    article = serializers.SlugRelatedField(
        queryset=Article.objects.all(), slug_field='slug'
    )
    parent_comment = serializers.StringRelatedField(
        source="parent", read_only=True)
    like_count = serializers.SerializerMethodField()
    dislike_count = serializers.SerializerMethodField()

    class Meta:
        model = ArticleComment
        fields = [
            'id', 'user', 'article', 'parent', 'parent_comment', 'comment',
            'image', 'link', 'likes', 'dislikes', 'like_count', 'dislike_count', 'created_at'
        ]
        read_only_fields = ['likes', 'dislikes',
                            'like_count', 'dislike_count', 'created_at']

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_dislike_count(self, obj):
        return obj.dislikes.count()


class ArticleSerializer(serializers.ModelSerializer):
    categories = ArticleCategorySerializer(many=True, read_only=True)
    tags = ArticleTagSerializer(many=True, read_only=True)
    comments = ArticleCommentSerializer(
        many=True, read_only=True, source='comments.all')
    user = serializers.StringRelatedField(read_only=True)
    like_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'user', 'categories', 'tags', 'image', 'image_url', 'title',
            'description', 'author_name', 'author_profession', 'likes', 'like_count',
            'slug', 'is_active', 'created_at', 'comments'
        ]
        read_only_fields = ['slug', 'created_at', 'user', 'like_count']

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None


class ArticleCreateUpdateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=20),
        write_only=True
    )

    class Meta:
        model = Article
        fields = [
            'title', 'categories', 'image', 'description',
            'author_name', 'author_profession', 'tags'
        ]

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        tags_data = validated_data.pop('tags', [])
        user = self.context['request'].user

        # Create the article instance
        article = Article.objects.create(user=user, **validated_data)

        # Assign categories to the article
        article.categories.set(categories_data)

        # Handle tags: Create or retrieve them, and assign them to the article
        tag_instances = []
        for tag_title in tags_data:
            tag, created = ArticleTag.objects.get_or_create(title=tag_title)
            tag_instances.append(tag)
        article.tags.set(tag_instances)

        return article

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', [])
        tags_data = validated_data.pop('tags', [])

        # Update the instance attributes from validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update the categories
        instance.categories.set(categories_data)

        # Handle tags: Create or retrieve them, and assign them to the article
        tag_instances = []
        for tag_title in tags_data:
            tag, created = ArticleTag.objects.get_or_create(title=tag_title)
            tag_instances.append(tag)
        instance.tags.set(tag_instances)

        # Save the instance after the updates
        instance.save()
        return instance
