from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from authapi.models import CustomUser
from authapi.serializers import UserSerializer
from .models import Customer, Farmer
from .serializers import CustomerSerializer, FarmerSerializer
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import PermissionDenied


class ManageUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            raise PermissionDenied("You do not have permission to view users.")

        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update user details.")

        user_id = kwargs.get('user_id')
        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        new_role = request.data.get('role')
        if new_role and new_role not in dict(CustomUser.ROLE_CHOICES):
            return Response({"error": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete users.")

        user_id = kwargs.get('user_id')
        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class CreateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        if user.role == 'admin':
            profile_type = request.data.get('profile_type')

            if profile_type == 'customer':
                return self.create_customer_profile(request)
            elif profile_type == 'farmer':
                return self.create_farmer_profile(request)
            else:
                return Response({"error": "Invalid profile type. Must be 'customer' or 'farmer'."}, status=status.HTTP_400_BAD_REQUEST)

        elif user.role == 'customer':
            return self.create_customer_profile(request)

        elif user.role == 'farmer':
            return self.create_farmer_profile(request)

        else:
            raise PermissionDenied(
                "You do not have permission to create profiles.")

    def create_customer_profile(self, request):
        customer_data = {
            **request.data,
            'user': request.user.id,
        }
        serializer = CustomerSerializer(data=customer_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_farmer_profile(self, request):
        farmer_data = {
            **request.data,
            'user': request.user.id,
        }
        serializer = FarmerSerializer(data=farmer_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """
    View to retrieve the authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == "customer":
            try:
                customer = Customer.objects.get(user=user)
                serializer = CustomerSerializer(customer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except customer.DoesNotExist:
                raise NotFound({"detail": "customer profile not found."})

        elif user.role == "farmer":
            try:
                farmer = Farmer.objects.get(user=user)
                serializer = FarmerSerializer(farmer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except farmer.DoesNotExist:
                raise NotFound({"detail": "farmer profile not found."})

        return Response(
            {"detail": "Invalid user role."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserProfileUpdateView(APIView):
    """
    View to update the authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        if user.role == "customer":
            try:
                customer = Customer.objects.get(user=user)
                serializer = CustomerSerializer(
                    customer, data=request.data, partial=True
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except customer.DoesNotExist:
                raise NotFound({"detail": "customer profile not found."})

        elif user.role == "farmer":
            try:
                farmer = Farmer.objects.get(user=user)
                serializer = FarmerSerializer(
                    farmer, data=request.data, partial=True
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except farmer.DoesNotExist:
                raise NotFound({"detail": "farmer profile not found."})

        return Response(
            {"detail": "Invalid user role."}, status=status.HTTP_400_BAD_REQUEST
        )
