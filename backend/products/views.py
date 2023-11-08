from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

# # Create your views here.


class CategoryView(APIView):
    def get(self, request):
        category_obj = Category.objects.all()
        category_serializer = CategorySerializer(category_obj, many=True, context={'request':request}).data
        data = []
        for cata in category_serializer:
            subcata_obj = Subcategory.objects.filter(category=cata['id'])
            cata['subcategory'] = SubcategorySerializer(subcata_obj, context={'request':request}, many=True).data
            data.append(cata)
        return Response(data)
    
    
class BannerView(APIView):
    def get(self, request):
        banner_obj = Banner.objects.all()
        banner_serializers = BannerSerializer(banner_obj, many=True, context={'request':request}).data
        return Response(banner_serializers)
    

class FeaturedView(APIView):
    def get(self, request):
        Featured_obj = Featured.objects.all()
        Featured_serializers = FeaturedSerializer(Featured_obj, many=True, context={'request':request}).data
        return Response(Featured_serializers)


class ProductView(APIView):
    def get(self, request):
        product_obj = Product.objects.all()
        product_serializer = ProductSerializer(product_obj, context={'request':request}, many=True).data
        data = []
        for faq in product_serializer:
            faq_obj = Shippingfaq.objects.filter(product=faq['id'])
            faq['shippingfaq'] = ShippingfaqSerializer(faq_obj, context={'request':request}, many=True).data
            data.append(faq)
        for info in product_serializer:
            info_obj = Shippingfaq.objects.filter(product=info['id'])
            info['shippingfaq'] = ShippingfaqSerializer(info_obj, context={'request':request}, many=True).data
            data.append(faq)
        return Response(data)


class CategoryprodsView(APIView):
    def get(self, request, pk):
        category_obj = Subcategory.objects.filter(id=pk)
        category_serializer = CategorySerializer(category_obj, context={'request':request}, many=True).data
        data = []
        for cata in category_serializer:
            product_obj = Product.objects.filter(category=cata['id'])
            cata['products'] = ProductSerializer(product_obj, context={'request':request}, many=True).data
            data.append(cata)
        return Response(data)
    
    
class SingleProductView(APIView):
    def get(self, request, pk):
        product_obj = Product.objects.filter(id=pk)
        product_serializer = SingleProductSerializer(product_obj, many=True, context={'request':request}).data
        return Response(product_serializer)
    
    
class LikeUnlikeprodView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=post_id)
            liked = product.likes.filter(id=request.customer.id).exists()

            if liked:
                product.likes.remove(request.customer.id)
                return Response(ProductSerializer(product).data , status=status.HTTP_200_OK)
            else:
                product.likes.add(request.customer.id)
                product.save()
                return Response(ProductSerializer(product).data , status=status.HTTP_200_OK)
        except:
            return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)  


class ReviewprodView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        review_serializer = ReviewSerializer(data=request.data)
        if review_serializer.is_valid():
            product = Product.objects.filter(pk=id).first()
            if product:
                review_serializer.save(customer=request.customer, product=product)
                return Response(review_serializer.data , status=status.HTTP_200_OK)
            else:
                return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        review = Review.objects.filter(pk=id)
        if review.customer.id == request.customer.id:
            review.delete()
            return Response({'msg': "Comment Deleted"} , status=status.HTTP_200_OK)
        else:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)




class SpecialOfferView(APIView):
    def get(self, request):
        soffer_obj = SpecialOffer.objects.all()
        soffer_serializer = SpecialOfferSerializer(soffer_obj, context={'request':request}, many=True).data
        return Response(soffer_serializer)


class TopratedProdView(APIView):
    def get(self, request):
        toprated_obj = TopratedProd.objects.all()
        toprated_serializer = TopratedprodSerializer(toprated_obj, context={'request':request}, many=True).data
        return Response(toprated_serializer)
    

class OnsaleProdView(APIView):
    def get(self, request):
        onsale_obj = OnsaleProd.objects.all()
        onsale_serializer = OnsaleprodSerializer(onsale_obj, context={'request':request}, many=True).data
        return Response(onsale_serializer)


class BestsellingView(APIView):
    def get(self, request):
        bestselling_obj = Bestselling.objects.all()
        bestselling_serializer = BestsellingSerializer(bestselling_obj, context={'request':request}, many=True).data
        return Response(bestselling_serializer)

class DiscountProductView(APIView):
    def get(self, request):
        discount_obj = DiscountProduct.objects.all()
        discount_serializer = DiscountProductSerializer(discount_obj, context={'request':request}, many=True).data
        return Response(discount_serializer)


class AllBrandsView(APIView):
    def get(self, request):
        brands_obj = Brands.objects.all()
        brands_serializer = BrandsSerializer(brands_obj, context={'request':request}, many=True).data
        return Response(brands_serializer)

    
    
class ArticlescategoryView(APIView):
    def get(self, request):
        articles_obj = Articlescategory.objects.all()
        articles_serializer = ArticlescategorySerializer(articles_obj, context={'request':request}, many=True).data
        return Response(articles_serializer)
    
    
class AllArticlesView(APIView):
    def get(self, request):
        articles_obj = Articles.objects.all()
        articles_serializer = ArticlesSerializer(articles_obj, context={'request':request}, many=True).data
        return Response(articles_serializer)
    

class SingleArticleView(APIView):
    def get(self, request, pk):
        article_obj = Articles.objects.filter(id=pk)
        article_serializer = ArticlesSerializer(article_obj, many=True, context={'request':request}).data
        return Response(article_serializer)


class CategoryarticlesView(APIView):
    def get(self, request, pk):
        category_obj = Articlescategory.objects.filter(id=pk)
        category_serializer = ArticlescategorySerializer(category_obj, context={'request':request}, many=True).data
        data = []
        for cata in category_serializer:
            articles_obj = Articles.objects.filter(category=cata['id'])
            cata['articles'] = ArticlesSerializer(articles_obj, context={'request':request}, many=True).data
            data.append(cata)
        return Response(data)


class ReviewarticleView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        review_serializer = ArticleReviewSerializer(data=request.data)
        if review_serializer.is_valid():
            article = Articles.objects.filter(pk=id).first()
            if article:
                review_serializer.save(customer=request.customer, article=article)
                return Response(review_serializer.data , status=status.HTTP_200_OK)
            else:
                return Response({'error': "No Article found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        review = ArticleReviewSerializer.objects.filter(pk=id)
        if review.customer.id == request.customer.id:
            review.delete()
            return Response({'msg': "Comment Deleted"} , status=status.HTTP_200_OK)
        else:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)
        
        
class ReplayReviewarticleView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        replayreview_serializer = RepalyArticleReviewSerializer(data=request.data)
        if replayreview_serializer.is_valid():
            review = ArticleReview.objects.filter(pk=id).first()
            if review:
                replayreview_serializer.save(customer=request.customer, review=review)
                return Response(replayreview_serializer.data , status=status.HTTP_200_OK)
            else:
                return Response({'error': "No Article found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=replayreview_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        replayreview = RepalyArticleReviewSerializer.objects.filter(pk=id)
        if replayreview.customer.id == request.customer.id:
            replayreview.delete()
            return Response({'msg': "Comment Deleted"} , status=status.HTTP_200_OK)
        else:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)
        

class AboutView(APIView):
    def get(self, request):
        about_obj = About.objects.all()
        about_serializer = AboutSerializer(about_obj, context={'request':request}, many=True).data
        return Response(about_serializer)
    
    





























# class TestimonialView(APIView):
#     def get(self, request):
#         testimonial_obj = Testimonial.objects.all()
#         testimonial_serializer = TestimonialSerializer(testimonial_obj, context={'request':request}, many=True).data
#         return Response(testimonial_serializer)
    
    
# class NewslatterView(APIView):
#     def get(self, request):
#         newslatter_obj = Newslatter.objects.all()
#         newslatter_serializer = NewslatterSerializer(newslatter_obj, context={'request':request}, many=True).data
#         return Response(newslatter_serializer)




# class CreateProductView(APIView):
#     def post(self, request):
#         serializer = ProductSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(data=serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class DeleteProductView(APIView):
#     def delete(self, request, pk):
#         try:
#             product = Product.objects.filter(id=pk)
#             if product.customer.id == request.customer.id:
#                 product.delete()
#                 return Response({'msg': 'Post deleted'}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
#         except ObjectDoesNotExist:
#             return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)

    

# class ShippingfaqView(APIView):
#     def get(self, request):
#         faq_obj = Shippingfaq.objects.all()
#         faq_serializer = ShippingfaqSerializer(faq_obj, context={'request':request}, many=True).data
#         return Response(faq_serializer)



# class SearchView(APIView):
#     def get(self, request, q):
#         data = {}
#         posts_lookup = (Q(title__icontains=q)|Q(details__icontains=q)|Q(tags__icontains=q)|Q(price__icontains=q))
#         prod_obj = Product.objects.filter(time__lte = timezone.now()).filter(posts_lookup)
#         data['products'] = ProductSerializer(prod_obj, many=True, context={'request':request}).data

#         catagory_lookup = (Q(title__icontains=q)|Q(details__icontains=q))
#         catagory_obj = Category.objects.filter(date__lte=timezone.now()).filter(catagory_lookup)
#         data['catagory'] = CategorySerializer(catagory_obj, many=True, context={'request':request})

#         brand_lookup = (Q(title__icontains=q)|Q(details__icontains=q))
#         brand_obj = Brand.objects.filter(date__lte=timezone.now()).filter(brand_lookup)
#         data['brand'] = BrandSerializer(brand_obj, many=True, context={'request':request})

#         return Response(data)
    
   