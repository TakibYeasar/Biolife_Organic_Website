from django.urls import path
from .views import *

urlpatterns = [
    path('contact-info/', GetContactInfoView.as_view(), name='get_contactinfo'),
    path('create-contact-info/', CreateContactInfoView.as_view(),
         name='create_contactinfo'),
    path('update-contact-info/<int:pk>/',
         UpdateContactInfoView.as_view(), name='update_contactinfo'),
    path('delete-contact-info/<int:pk>/',
         DeleteContactInfoView.as_view(), name='delete_contactinfo'),

    path('banners/', GetBannerView.as_view(), name='get_banner'),
    path('create/banner/', CreateBannerView.as_view(), name='create_banner'),
    path('update/banner/<int:pk>/',
         UpdateBannerView.as_view(), name='update_banner'),
    path('delete/banner/<int:pk>/',
         DeleteBannerView.as_view(), name='delete_banner'),
    
    path('featureds/', GetFeaturedView.as_view(), name='get_featured'),
    path('create/featured/', CreateFeaturedView.as_view(), name='create_featured'),
    path('update/featured/<int:pk>/',
         UpdateFeaturedView.as_view(), name='update_featured'),
    path('delete/featured/<int:pk>/',
         DeleteFeaturedView.as_view(), name='delete_featured'),


    path('brands/', GetBrandsView.as_view(), name='get_brands'),
    path('create-brand/', CreateBrandView.as_view(), name='create_brands'),
    path('update-brand/<int:pk>/',
         UpdateBrandView.as_view(), name='update_brands'),
    path('delete-brand/<int:pk>/',
         DeleteBrandView.as_view(), name='delete_brands'),

    path('testimonial/', GetTestimonialView.as_view(), name='get_testimonial'),
    path('newsletter/', GetNewsletterView.as_view(), name='get_newsletter'),
]
