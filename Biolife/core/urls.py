from django.urls import path
from .views import *

urlpatterns = [
    path('contactinfo/', GetContactinfoView.as_view(), name='get_contactinfo'),
    path('contactinfo/create/', CreateContactinfoView.as_view(),
         name='create_contactinfo'),
    path('contactinfo/update/<int:pk>/',
         UpdateContactinfoView.as_view(), name='update_contactinfo'),
    path('contactinfo/delete/<int:pk>/',
         DeleteContactinfoView.as_view(), name='delete_contactinfo'),

    path('banners/', GetBannerView.as_view(), name='get_banner'),
    path('banner/create/', CreateBannerView.as_view(), name='create_banner'),
    path('banner/update/<int:pk>/',
         UpdateBannerView.as_view(), name='update_banner'),
    path('banner/delete/<int:pk>/',
         DeleteBannerView.as_view(), name='delete_banner'),

    path('featured/', GetFeaturedView.as_view(), name='get_featured'),
    path('featured/create/', CreateFeaturedView.as_view(), name='create_featured'),
    path('featured/update/<int:pk>/',
         UpdateFeaturedView.as_view(), name='update_featured'),
    path('featured/delete/<int:pk>/',
         DeleteFeaturedView.as_view(), name='delete_featured'),

    path('specialoffer/', GetSpecialOfferView.as_view(), name='get_specialoffer'),
    path('specialoffer/create/', CreateSpecialOfferView.as_view(),
         name='create_specialoffer'),
    path('specialoffer/update/<int:pk>/',
         UpdateSpecialOfferView.as_view(), name='update_specialoffer'),
    path('specialoffer/delete/<int:pk>/',
         DeleteSpecialOfferView.as_view(), name='delete_specialoffer'),

    path('brands/', GetBrandsView.as_view(), name='get_brands'),
    path('brands/create/', CreateBrandsView.as_view(), name='create_brands'),
    path('brands/update/<int:pk>/',
         UpdateBrandsView.as_view(), name='update_brands'),
    path('brands/delete/<int:pk>/',
         DeleteBrandsView.as_view(), name='delete_brands'),

    path('about/', GetAboutView.as_view(), name='get_about'),
    path('about/create/', CreateAboutView.as_view(), name='create_about'),
    path('about/update/<int:pk>/', UpdateAboutView.as_view(), name='update_about'),
    path('about/delete/<int:pk>/', DeleteAboutView.as_view(), name='delete_about'),

    path('testimonial/', GetTestimonialView.as_view(), name='get_testimonial'),
    path('testimonial/create/', CreateTestimonialView.as_view(),
         name='create_testimonial'),
    path('testimonial/update/<int:pk>/',
         UpdateTestimonialView.as_view(), name='update_testimonial'),
    path('testimonial/delete/<int:pk>/',
         DeleteTestimonialView.as_view(), name='delete_testimonial'),
]
