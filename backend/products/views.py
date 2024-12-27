from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

# Create your views here.


class GetCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                products = Product.objects.filter(
                    categories=category  # Use the correct field to filter
                )
                product_count = products.count()
                serializer = ProductSerializer(products, many=True)
                response_data = {
                    'category': CategorySerializer(category, context={'request': request}).data,
                    'product_count': product_count,
                    'products': serializer.data,
                }
                return Response(response_data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Annotate each category with the correct product count
            categories = Category.objects.annotate(
                # Use the 'products' related_name
                product_count=Count('products')
            )
            serialized_categories = CategorySerializer(
                categories, many=True, context={'request': request}
            ).data
            return Response(serialized_categories, status=status.HTTP_200_OK)



class CreateCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a category.")
            
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a category.")
            
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
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs): 
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a category.")
        
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
                # category = product.category.all().values_list('id', flat=True)
                reviews = Review.objects.filter(product=product)
                serializer = ProductSerializer(
                    product, context={'request': request})
                # serializer.data['category'] = list(category)
                serializer.data['reviews'] = [
                    {'review': review.review_field, 'rating': review.rating} for review in reviews]
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all()
            products_data = ProductSerializer(
                products, context={'request': request}, many=True).data
            return Response(data=products_data, status=status.HTTP_200_OK)
        

class GetProductsByUserView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        products = Product.objects.filter(user=user)
        if not products.exists():
            return Response({'message': "No products found for this user."}, status=status.HTTP_404_NOT_FOUND)
        products_data = ProductSerializer(
            products, context={'request': request}, many=True).data
        return Response(data=products_data, status=status.HTTP_200_OK)


class CreateProductView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'farmer':
            raise PermissionDenied(
                "You do not have permission to create a product.")
            
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=product_id)
            
            if product.farmer != request.user:
                raise PermissionDenied(
                    "You do not have permission to update a product.")
                
        except ObjectDoesNotExist:
            return Response({'error': 'product not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProductView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=product_id)
            if product.farmer != request.user:
                raise PermissionDenied(
                    "You do not have permission to delete a product.")
                
            product.delete()
            return Response({'message': 'product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': 'product not found'}, status=status.HTTP_404_NOT_FOUND)


class CreateProductLikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, product_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to like a product.")
            
        product = self._get_product(product_id)
        product.likes.add(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)


class RemoveProductLikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, product_id):
        product = self._get_product(product_id)
        
        if product.customer != request.user:
            raise PermissionDenied(
                "You do not have permission to unlike a product.")
            
        product.likes.remove(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)



class CreateProductReviewView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, product_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to review a product.")
            
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
    permission_classes = [IsAuthenticated]
    
    def put(self, request, review_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to update product review.")
            
        try:
            review_product = Review.objects.get(id=review_id)
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
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to delete product review.")
            
        review_id = kwargs.get('id')
        try:
            review = Review.objects.get(id=review_id)
            review.delete()
            return Response({'message': 'review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': 'review not found'}, status=status.HTTP_404_NOT_FOUND)
