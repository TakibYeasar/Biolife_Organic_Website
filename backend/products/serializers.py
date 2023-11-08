from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    
    
class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = "__all__"

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")

    
    
class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    

class FeaturedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Featured
        fields = "__all__"

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    
class ShippingfaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shippingfaq
        fields = "__all__"

    

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        # depth = 1

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    
    
class SingleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        depth = 1
        
        
class ReplayReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplayReview
        fields = "__all__"
        depth = 1
    

class FeaturedprodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(instance.product, context={'request':request}).data
        return response
    
    
class TopratedprodSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopratedProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(instance.product, context={'request':request}).data
        return response
    

class OnsaleprodSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnsaleProd
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(instance.product, context={'request':request}).data
        return response
        
        
class SpecialOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialOffer
        fields = "__all__"
        
    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    


class BestsellingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bestselling
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(instance.product, context={'request':request}).data
        return response


class DiscountProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountProduct
        fields = "__all__"
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(instance.product, context={'request':request}).data
        return response



class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brands
        fields = "__all__"

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")



class ArticlescategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Articlescategory
        fields = "__all__"
        depth = 1
        
        
class ArticlestagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articlestag
        fields = "__all__"
        depth = 1
        
 

class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
    
    
    
class ArticleReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleReview
        fields = "__all__"
        depth = 1
        
        
class RepalyArticleReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplayArticleReview
        fields = "__all__"
        depth = 1
        
        
        
class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")
   
    
    
class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.obj.get('request')
        return request.url("image")


class NewslatterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newslatter
        fields = "__all__"
        depth = 1

