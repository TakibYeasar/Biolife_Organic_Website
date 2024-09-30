from rest_framework import serializers
from .models import *


class ArticlecategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Articlecategory
        fields = "__all__"
        depth = 1
      
        
class ArticletagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articletags
        fields = "__all__"
        depth = 1
 

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"
        depth = 1

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url
    
    
class ArticleCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleComment
        fields = "__all__"
        # depth = 1
