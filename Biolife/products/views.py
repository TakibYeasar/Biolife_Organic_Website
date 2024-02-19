from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Create your views here.


class GetCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                products = Product.objects.filter(category=category)
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.all()
            category_data = CategorySerializer(
                category, many=True).data
            return Response(data=category_data, status=status.HTTP_200_OK)


class CreateCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        try:
            category = Category.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)


class GetProductView(APIView):
    def get(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                category = product.category.all().values_list('id', flat=True)
                reviews = Review.objects.filter(product=product)
                serializer = ProductSerializer(product)
                serializer.data['category'] = list(category)
                serializer.data['reviews'] = [
                    {'review': review.review_field, 'rating': review.rating} for review in reviews]
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all()
            products_data = ProductSerializer(products, many=True).data
            return Response(data=products_data, status=status.HTTP_200_OK)


class CreateProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=product_id)
        except ObjectDoesNotExist:
            return Response({'error': 'product not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({'message': 'product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': 'product not found'}, status=status.HTTP_404_NOT_FOUND)


class GetProductLikeCountView(APIView):
    def get(self, request, product_id):
        product = self._get_product(product_id)
        return Response({'likes_count': product.likes.count()}, status=status.HTTP_200_OK)


class CreateProductLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, product_id):
        product = self._get_product(product_id)
        product.likes.add(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)


class RemoveProductLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, product_id):
        product = self._get_product(product_id)
        product.likes.remove(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)


class GetProductReviewView(APIView):
    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            review_products = Review.objects.filter(product=product)
            serializer = ReviewProductSerializer(review_products, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'No product found'}, status=status.HTTP_404_NOT_FOUND)


class CreateProductReviewView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ReviewProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user, product=product)
                return Response({'message': 'Review created successfully'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'No product found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateProductReviewView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, review_product_id):
        try:
            review_product = Review.objects.get(id=review_product_id)
            if review_product.user.id != request.user.id:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = ReviewProductSerializer(
                review_product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Review updated successfully'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': 'No review found'}, status=status.HTTP_404_NOT_FOUND)


class DeleteProductReviewView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        review_id = kwargs.get('id')
        try:
            review = Review.objects.get(id=review_id)
            review.delete()
            return Response({'message': 'review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': 'review not found'}, status=status.HTTP_404_NOT_FOUND)


class CreateReviewLikeDislikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
            action = request.data.get('action')

            if action == 'like':
                review.likes.add(request.user)
                # Remove a dislike if exists
                review.dislikes.remove(request.user)
                return Response({'msg': 'Liked'}, status=status.HTTP_201_CREATED)
            elif action == 'dislike':
                review.dislikes.add(request.user)
                review.likes.remove(request.user)  # Remove a like if exists
                return Response({'msg': 'Disliked'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        except Review.DoesNotExist:
            return Response({'error': "review not found"}, status=status.HTTP_404_NOT_FOUND)


class RemoveReviewLikeDislikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
            action = request.data.get('action')

            if action == 'remove_like':
                review.likes.remove(request.user)
                return Response({'msg': 'Like removed'}, status=status.HTTP_204_NO_CONTENT)
            elif action == 'remove_dislike':
                review.dislikes.remove(request.user)
                return Response({'msg': 'Dislike removed'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        except Review.DoesNotExist:
            return Response({'error': "review not found"}, status=status.HTTP_404_NOT_FOUND)


class GetReviewLikeDislikeCountView(APIView):
    def get(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
            like_count = review.likes.count()
            dislike_count = review.dislikes.count()
            return Response({'likes': like_count, 'dislikes': dislike_count}, status=status.HTTP_200_OK)

        except Review.DoesNotExist:
            return Response({'error': "review not found"}, status=status.HTTP_404_NOT_FOUND)



class GetTopratedProdView(APIView):
    def get(self, request):
        try:
            product_obj = TopratedProd.objects.all()
            serializer = TopratedprodSerializer(product_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No products found"}, status=status.HTTP_404_NOT_FOUND)


class CreateTopratedProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = TopratedprodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateTopratedProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            product_obj = TopratedProd.objects.get(pk=pk)
            serializer = TopratedprodSerializer(
                product_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteTopratedProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            product_obj = TopratedProd.objects.get(pk=pk)
            product_obj.delete()
            return Response({'message': 'Toprated product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class GetOnsaleProdView(APIView):
    def get(self, request):
        try:
            product_obj = OnsaleProd.objects.all()
            serializer = OnsaleprodSerializer(product_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No products found"}, status=status.HTTP_404_NOT_FOUND)


class CreateOnsaleProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = OnsaleprodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateOnsaleProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            product_obj = OnsaleProd.objects.get(pk=pk)
            serializer = OnsaleprodSerializer(
                product_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class DleteOnsaleProdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            product_obj = OnsaleProd.objects.get(pk=pk)
            product_obj.delete()
            return Response({'message': 'Onsale product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class GetBestsellingView(APIView):
    def get(self, request):
        try:
            product_obj = BestsellingProd.objects.all()
            serializer = BestsellingprodSerializer(
                product_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No products found"}, status=status.HTTP_404_NOT_FOUND)


class CreateBestsellingView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = BestsellingprodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBestsellingView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            product_obj = BestsellingProd.objects.get(pk=pk)
            serializer = BestsellingprodSerializer(
                product_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBestsellingView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            product_obj = BestsellingProd.objects.get(pk=pk)
            product_obj.delete()
            return Response({'message': 'Bestselling product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class GetDiscountProductView(APIView):
    def get(self, request):
        try:
            product_obj = DiscountProd.objects.all()
            serializer = DiscountprodSerializer(product_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No products found"}, status=status.HTTP_404_NOT_FOUND)


class CreateDiscountProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = DiscountprodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateDiscountProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            product_obj = DiscountProd.objects.get(pk=pk)
            serializer = DiscountprodSerializer(
                product_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteDiscountProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            product_obj = DiscountProd.objects.get(pk=pk)
            product_obj.delete()
            return Response({'message': 'Discount product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)

