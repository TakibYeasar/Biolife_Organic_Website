from django.urls import path
from .views import *

urlpatterns = [
    path('manage-users/', ManageUserView.as_view(), name='all_users'),
    path('user/<int:pk>/change-role/',
         ManageUserView.as_view(), name='change_role'),
    path('user/<int:pk>/remove/',  ManageUserView.as_view(), name='remove_user'),
    path("create-profile/", CreateUserProfileView.as_view(), name="create_profile"),
    path("profile/", UserProfileView.as_view(), name="user_profile"),
    path("update-profile/", UserProfileUpdateView.as_view(),
         name="user_profile_update"),
]
