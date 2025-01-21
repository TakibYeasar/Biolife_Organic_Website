from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

# # Create your views here.

class GetContactInfoView(APIView):
    def get(self, request):
        try:
            info_obj = ContactInfo.objects.all()
            serializer = ContactInfoSerializer(
                info_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class CreateContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create contact info.")
            
        serializer = ContactInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update contact info.")
            
        try:
            info_obj = ContactInfo.objects.get(pk=pk)
            serializer = ContactInfoSerializer(
                info_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteContactInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete contact info.")
            
        try:
            info_obj = ContactInfo.objects.get(pk=pk)
            info_obj.delete()
            return Response({'message': 'Contact info deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class GetBannerView(APIView):
    def get(self, request):
        try:
            banner_obj = Banner.objects.all()
            serializer = BannerSerializer(
                banner_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class CreateBannerView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a banner.")
            
        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBannerView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a banner.")
            
        try:
            banner_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(
                banner_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBannerView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a banner.")
            
        try:
            banner = Banner.objects.get(pk=pk)
            banner.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class GetFeaturedView(APIView):
    def get(self, request):
        try:
            featured_obj = Featured.objects.all()
            serializer = FeaturedSerializer(
                featured_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Featured items found"}, status=status.HTTP_404_NOT_FOUND)


class CreateFeaturedView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a featured item.")

        serializer = FeaturedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateFeaturedView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a featured item.")

        try:
            featured_obj = Featured.objects.get(pk=pk)
            serializer = FeaturedSerializer(
                featured_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Featured item found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteFeaturedView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a featured item.")

        try:
            featured = Featured.objects.get(pk=pk)
            featured.delete()
            return Response({'message': 'Featured item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Featured item found"}, status=status.HTTP_404_NOT_FOUND)


class GetBrandsView(APIView):
    def get(self, request):
        try:
            brand_obj = Brand.objects.all()
            serializer = BrandSerializer(
                brand_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class CreateBrandView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a brand.")
            
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBrandView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a brand.")
            
        try:
            brand_obj = Brand.objects.get(pk=pk)
            serializer = BrandSerializer(
                brand_obj, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBrandView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a brand.")
            
        try:
            brand_obj = Brand.objects.get(pk=pk)
            brand_obj.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class GetTestimonialView(APIView):
    def get(self, request):
        try:
            test_obj = Testimonial.objects.all()
            serializer = TestimonialSerializer(
                test_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Testimonial found"}, status=status.HTTP_404_NOT_FOUND)


class GetNewsletterView(APIView):
    def get(self, request):
        try:
            newsletter_obj = Newsletter.objects.all()
            serializer = NewsletterSerializer(
                newsletter_obj, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Newsletter found"}, status=status.HTTP_404_NOT_FOUND)
