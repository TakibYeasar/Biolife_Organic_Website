from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('register/verifing/', UserAccountVerification.as_view(), name='verifing'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('new-password-request/', RequestPasswordResetView.as_view(), name='new_password'),
    path('reset-password/<str:uidb64>/<str:token>/', ResetPasswordView.as_view(), name='reset'),
    path('logout/', LogOutView.as_view(), name='logout')

]
