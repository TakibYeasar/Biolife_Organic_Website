from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import *
from .serializers import *
from .utils import send_email
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegesterationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            email = serializer.validated_data["email"]
            data = {
                "detail": "We sent an email to you for verification.", "email": email}
            user_obj = CustomUser.objects.get(email=email)
            token = self.get_tokens_for_user(user_obj)
            send_email("Activate your account!", user_obj.email, {
                "user": user_obj}, {"token": token})
            return Response(data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)


class UserAccountVerificationView(APIView):
    def get(self, request):
        try:
            token = request.GET.get('token')
            playload = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
            user_id = playload['user_id']
            user_qs = CustomUser.objects.filter(id=user_id)
            if user_qs.exists():
                user = user_qs[0]
                user.is_verified = True
                user.is_active = True
                user.save()
                return Response({'success': 'Your account has been verified and activated successfully.'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'Error': 'Token is expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            return Response({'Error': 'Token is invalid'}, status=status.HTTP_400_BAD_REQUEST)


class ActivationResendView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ActivationResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_obj = serializer.validated_data["user"]
        token = self.get_tokens_for_user(user_obj)
        send_email("Activate your account!", user_obj.email, {
            "user": user_obj}, {"token": token})
        return Response(
            {"detail": "Email verification resent successfully."},
            status=status.HTTP_200_OK,
        )

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)


class LoginUserView(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogOutView(APIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': 'Loged Out'}, status=status.HTTP_200_OK)
        except:
            return Response({'Error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordApiView(APIView):
    permission_classes = [IsAuthenticated,]

    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("current_password")):
                return Response(
                    {"current Password": "Wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            self.object.set_password(serializer.data.get("password"))
            self.object.save()
            return Response(
                {"details": "Password changed successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_qs = CustomUser.objects.filter(email=serializer.data['email'])
        if user_qs.exists():
            user = user_qs[0]
            token = PasswordResetTokenGenerator().make_token(user)
            send_email("User Email", user.email, {
                "user": user}, {"token": token})
            return Response({"message": "Email sent for password reset"}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'password has sucessfuly reset'}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            query = UserProfile.objects.get(user=request.user)
            serializer = ProfileSerializer(query)
            response_message = {"error": False, "data": serializer.data}
        except Exception as e:
            print(e)
            response_message = {"error": True,
                                "message": "Something went Wrong"}
        return Response(response_message)


class UpdateUserProfile(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user
            query = CustomUser.objects.get(user=user)
            data = request.data
            serializers = ProfileSerializer(
                query, data=data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res = {"message": "Profile is Updated"}
        except Exception as e:
            print(e)
            return_res = {"message": "Something went Wrong Try Again!!!"}
        return Response(return_res)

