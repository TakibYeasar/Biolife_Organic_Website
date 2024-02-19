from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAdminUser

# # Create your views here.

class GetContactinfoView(APIView):
    def get(self, request):
        try:
            info_obj = Contactinfo.objects.all()
            serializer = ContactinfoSerializer(info_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class CreateContactinfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = ContactinfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateContactinfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            info_obj = Contactinfo.objects.get(pk=pk)
            serializer = ContactinfoSerializer(info_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteContactinfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            info_obj = Contactinfo.objects.get(pk=pk)
            info_obj.delete()
            return Response({'message': 'Contact info deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Contactinfo found"}, status=status.HTTP_404_NOT_FOUND)


class GetBannerView(APIView):
    def get(self, request):
        try:
            banner_obj = Banner.objects.all()
            serializer = BannerSerializer(banner_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class CreateBannerView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBannerView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            banner_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(banner_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBannerView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            banner = Banner.objects.get(pk=pk)
            banner.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class GetFeaturedView(APIView):
    def get(self, request):
        try:
            featured_obj = Banner.objects.all()
            serializer = BannerSerializer(featured_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
                return Response({'error': "No Banner found"}, status=status.HTTP_404_NOT_FOUND)


class CreateFeaturedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateFeaturedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            featured_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(featured_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Featured found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteFeaturedView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            featured_obj = Banner.objects.get(pk=pk)
            featured_obj.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Featured found"}, status=status.HTTP_404_NOT_FOUND)


class GetSpecialOfferView(APIView):
    def get(self, request):
        try:
            soffer_obj = Banner.objects.all()
            serializer = BannerSerializer(soffer_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class CreateSpecialOfferView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateSpecialOfferView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            soffer_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(soffer_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteSpecialOfferView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            soffer_obj = Banner.objects.get(pk=pk)
            soffer_obj.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No SpecialOffer found"}, status=status.HTTP_404_NOT_FOUND)


class GetBrandsView(APIView):
    def get(self, request):
        try:
            brand_obj = Banner.objects.all()
            serializer = BannerSerializer(brand_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class CreateBrandsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = BannerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBrandsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            brand_obj = Banner.objects.get(pk=pk)
            serializer = BannerSerializer(brand_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteBrandsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            brand_obj = Banner.objects.get(pk=pk)
            brand_obj.delete()
            return Response({'message': 'Banner deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Brands found"}, status=status.HTTP_404_NOT_FOUND)


class GetAboutView(APIView):
    def get(self, request):
        try:
            about_obj = About.objects.all()
            serializer = AboutSerializer(about_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No About found"}, status=status.HTTP_404_NOT_FOUND)


class CreateAboutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = AboutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAboutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            about_obj = About.objects.get(pk=pk)
            serializer = AboutSerializer(about_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No About found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteAboutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            about_obj = About.objects.get(pk=pk)
            about_obj.delete()
            return Response({'message': 'About deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No About found"}, status=status.HTTP_404_NOT_FOUND)


class GetTestimonialView(APIView):
    def get(self, request):
        try:
            test_obj = Testimonial.objects.all()
            serializer = TestimonialSerializer(test_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No About found"}, status=status.HTTP_404_NOT_FOUND)


class CreateTestimonialView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = TestimonialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateTestimonialView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, pk):
        try:
            test_obj = Testimonial.objects.get(pk=pk)
            serializer = TestimonialSerializer(test_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': "No About found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteTestimonialView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        try:
            test_obj = Testimonial.objects.get(pk=pk)
            test_obj.delete()
            return Response({'message': 'Testimonial deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'error': "No Testimonial found"}, status=status.HTTP_404_NOT_FOUND)
