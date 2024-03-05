from django.urls import path
from .views import *

urlpatterns = [
    path('contactinfo/', GetContactinfoView.as_view(), name='get_contactinfo'),
    path('create/contactinfo/', CreateContactinfoView.as_view(),
         name='create_contactinfo'),
    path('update/contactinfo/<int:pk>/',
         UpdateContactinfoView.as_view(), name='update_contactinfo'),
    path('delete/contactinfo/<int:pk>/',
         DeleteContactinfoView.as_view(), name='delete_contactinfo'),

    path('banners/', GetBannerView.as_view(), name='get_banner'),
    path('create/banner/', CreateBannerView.as_view(), name='create_banner'),
    path('update/banner/<int:pk>/',
         UpdateBannerView.as_view(), name='update_banner'),
    path('delete/banner/<int:pk>/',
         DeleteBannerView.as_view(), name='delete_banner'),

    path('featured/', GetFeaturedView.as_view(), name='get_featured'),
    path('create/featured/', CreateFeaturedView.as_view(), name='create_featured'),
    path('update/featured/<int:pk>/',
         UpdateFeaturedView.as_view(), name='update_featured'),
    path('delete/featured/<int:pk>/',
         DeleteFeaturedView.as_view(), name='delete_featured'),

    path('specialoffer/', GetSpecialOfferView.as_view(), name='get_specialoffer'),
    path('create/specialoffer/', CreateSpecialOfferView.as_view(),
         name='create_specialoffer'),
    path('update/specialoffer/<int:pk>/',
         UpdateSpecialOfferView.as_view(), name='update_specialoffer'),
    path('delete/specialoffer/<int:pk>/',
         DeleteSpecialOfferView.as_view(), name='delete_specialoffer'),

    path('brands/', GetBrandsView.as_view(), name='get_brands'),
    path('create/brands/', CreateBrandsView.as_view(), name='create_brands'),
    path('update/brands/<int:pk>/',
         UpdateBrandsView.as_view(), name='update_brands'),
    path('delete/brands/<int:pk>/',
         DeleteBrandsView.as_view(), name='delete_brands'),

    path('about/', GetAboutView.as_view(), name='get_about'),
    path('create/about/', CreateAboutView.as_view(), name='create_about'),
    path('update/about/<int:pk>/', UpdateAboutView.as_view(), name='update_about'),
    path('delete/about/<int:pk>/', DeleteAboutView.as_view(), name='delete_about'),

    path('testimonial/', GetTestimonialView.as_view(), name='get_testimonial'),
    path('create/testimonial/', CreateTestimonialView.as_view(),
         name='create_testimonial'),
    path('update/testimonial/<int:pk>/',
         UpdateTestimonialView.as_view(), name='update_testimonial'),
    path('delete/testimonial/<int:pk>/',
         DeleteTestimonialView.as_view(), name='delete_testimonial'),
]
