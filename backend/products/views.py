from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


# Create your views here.


class GetCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                products = Product.objects.filter(categories=category)
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
            # Fetch only top-level categories (no parent) and include nested children
            root_categories = Category.objects.filter(parent__isnull=True).annotate(
                product_count=Count('products')
            )
            serialized_categories = CategorySerializer(
                root_categories, many=True, context={'request': request}
            ).data
            return Response(serialized_categories, status=status.HTTP_200_OK)


class CreateCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is an admin
        if not hasattr(user, 'role') or user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a category.")

        serializer = CategoryCreateSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            category = serializer.save()
            return Response(CategoryCreateSerializer(category).data, status=status.HTTP_201_CREATED)
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


class ManageProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Get all products. Only accessible by admin users.
        """
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to view products."},
                status=status.HTTP_403_FORBIDDEN
            )

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk, *args, **kwargs):
        """
        Toggle approval status of a product. Only accessible by admin users.
        """
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to approve or edit products."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        # Toggle the approval status
        new_status = not product.is_approved
        product.is_approved = new_status
        product.save()

        status_message = "approved" if new_status else "unapproved"
        return Response(
            {"detail": f"Product '{product.title}' has been {status_message}."},
            status=status.HTTP_200_OK,
        )


    def delete(self, request, pk, *args, **kwargs):
        """
        Delete a product. Only accessible by admin users.
        """
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to delete products."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        product_title = product.title
        product.delete()
        return Response(
            {"detail": f"Product '{product_title}' has been successfully removed."},
            status=status.HTTP_200_OK,
        )


class GetProductView(APIView):
    def get(self, request, *args, **kwargs):
        product_id = kwargs.get('id')

        if product_id:
            try:
                # Fetch the product along with related data
                product = Product.objects.select_related('user').prefetch_related(
                    'categories', 'images', 'additional_info', 'reviews'
                ).get(id=product_id, is_approved=True)

                # Serialize the product
                serializer = ProductSerializer(
                    product, context={'request': request}
                )

                # Return the serialized product data
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ObjectDoesNotExist:
                # Handle case where the product is not found
                return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Fetch all approved products
            products = Product.objects.filter(is_approved=True).prefetch_related(
                'categories', 'images', 'additional_info'
            )

            # Serialize the list of products
            serializer = ProductSerializer(
                products, context={'request': request}, many=True
            )

            return Response(serializer.data, status=status.HTTP_200_OK)


class TopratedProdView(APIView):
    """
    API view to fetch top-rated products based on average rating from reviews.
    """

    def get(self, request, *args, **kwargs):
        # Annotate products with their average review rating
        products = Product.objects.filter(
            is_approved=True, is_active=True
        ).prefetch_related(
            'categories', 'images', 'additional_info'
        ).annotate(average_rating=Avg('reviews__rate')).order_by('-average_rating')

        # Serialize the products
        serializer = ProductSerializer(
            products, context={'request': request}, many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class BestsellingApiView(APIView):
    """
    API view to fetch bestselling products based on the number of likes.
    """

    def get(self, request, *args, **kwargs):
        # Annotate products with their total number of likes
        products = Product.objects.filter(
            is_approved=True, is_active=True
        ).prefetch_related(
            'categories', 'images', 'additional_info'
        ).annotate(likes_count=Count('likes')).order_by('-likes_count')

        # Serialize the products
        serializer = ProductSerializer(
            products, context={'request': request}, many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class RelatedProdApiView(APIView):
    """
    API view to fetch related products based on shared categories.
    """

    def get(self, request, product_id, *args, **kwargs):
        product = get_object_or_404(Product, id=product_id)

        # Fetch related products
        related_products = Product.objects.filter(
            categories__in=product.categories.all()
        ).exclude(id=product.id).distinct()

        # Serialize the related products
        serializer = ProductSerializer(related_products, many=True)

        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)

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

        # Ensure only farmers can create products
        if not hasattr(user, 'role') or user.role != 'farmer':
            raise PermissionDenied(
                "Only farmers are allowed to create products.")

        # Initialize the serializer with request data and context
        serializer = ProductCreateUpdateSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            # Save the product with the authenticated user as the owner
            product = serializer.save(user=user)
            return Response(
                ProductCreateUpdateSerializer(
                    product, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )

        # Return validation errors if the data is invalid
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
            
        product = Product.objects.get(id=product_id)
        
        if user.id in product.likes.values_list('id', flat=True):
            raise PermissionDenied("You have already liked this product.")
        
        product.likes.add(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)


class RemoveProductLikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, product_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to unlike a product.")
            
        product = Product.objects.get(id=product_id)
            
        if user.id not in product.likes.values_list('id', flat=True):
            raise PermissionDenied("You have not liked this product yet.")
            
        product.likes.remove(request.user.id)
        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)


class UserLikedProductView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to see liked product list.")

        # Get the updated list of products liked by the user
        liked_products = Product.objects.filter(likes=user)
        serializer = ProductSerializer(
            liked_products, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateProductReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        user = request.user

        # Ensure that the user is a customer
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to review a product.")

        try:
            # Retrieve the product for the given product_id
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Prepare the review data
        review_data = request.data.copy()
        review_data['user'] = user.id  # Add the user ID to the review data
        # Add the product ID to the review data
        review_data['product'] = product.id

        # Pass the request object to the serializer context
        serializer = ReviewCreateUpdateSerializer(
            data=review_data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Review created successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, review_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to update product review.")

        try:
            review_product = Review.objects.get(id=review_id)
            if review_product.user != request.user:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the ReviewCreateUpdateSerializer for updating the review
            serializer = ReviewCreateUpdateSerializer(
                review_product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()  # Save the updated review
                return Response({'message': 'Review updated successfully'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Review.DoesNotExist:
            return Response({'error': 'No review found'}, status=status.HTTP_404_NOT_FOUND)


class DeleteProductReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, review_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to delete product review.")

        try:
            review = Review.objects.get(id=review_id)
            if review.user != request.user:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)


class GetSpecialOfferView(APIView):
    def get(self, request):
        try:
            soffer_obj = SpecialOffer.objects.all()
            serializer = SpecialOfferSerializer(
                soffer_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class CreateSpecialOfferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SpecialOfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateSpecialOfferView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            soffer_obj = SpecialOffer.objects.get(pk=pk)
            serializer = SpecialOfferSerializer(
                soffer_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteSpecialOfferView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            soffer_obj = SpecialOffer.objects.get(pk=pk)
            soffer_obj.delete()
            return Response({'message': 'SpecialOffer deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class GetDiscountProductView(APIView):
    def get(self, request):
        try:
            product_obj = DiscountProduct.objects.all()
            serializer = DiscountProductSerializer(
                product_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No products found"}, status=status.HTTP_404_NOT_FOUND)


class CreateDiscountProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DiscountProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateDiscountProductView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            product_obj = DiscountProduct.objects.get(pk=pk)
            serializer = DiscountProductSerializer(
                product_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteDiscountProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            product_obj = DiscountProduct.objects.get(pk=pk)
            product_obj.delete()
            return Response({'message': 'Discount product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No product found"}, status=status.HTTP_404_NOT_FOUND)

