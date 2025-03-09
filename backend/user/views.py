from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from authapi.models import CustomUser
from authapi.serializers import UserSerializer
from .models import UserProfile
from .serializers import UserProfileSerializer
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


class ChangeUserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, user_id):
        if request.user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update user details.")

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        new_role = request.data.get('role')
        if new_role not in dict(CustomUser.ROLE_CHOICES):
            return Response({"error": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

        user.role = new_role
        user.save()
        return Response({"message": "Role updated successfully."}, status=status.HTTP_200_OK)


class RemoveUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        if request.user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete users.")

        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):
    """
    View to retrieve the authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            user_profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            raise NotFound({"detail": "User profile not found."})


class UserProfileUpdateView(APIView):
    """
    View to update the authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        try:
            user_profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(
                user_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            raise NotFound({"detail": "User profile not found."})
