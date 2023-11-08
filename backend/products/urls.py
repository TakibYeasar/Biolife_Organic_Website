from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('categories/', CategoryView.as_view()),
    path('banners/', BannerView.as_view()),
    path('featured/', FeaturedView.as_view()),
    path('all-products/', ProductView.as_view()),
    path('category-prod/<int:pk>/', CategoryprodsView.as_view()),
    path('single-prod/<int:pk>/', SingleProductView.as_view()),
    path('like-unlike-prod/', LikeUnlikeprodView.as_view()),
    path('rating-prod/', ReviewprodView.as_view()),
    path('special-offer/', SpecialOfferView.as_view()),
    path('toprated-prod/', TopratedProdView.as_view()),
    path('onsale-prod/', OnsaleProdView.as_view()),
    path('bestselling-prod/', BestsellingView.as_view()),
    path('discount-prod/', DiscountProductView.as_view()),
    path('all-brands/', AllBrandsView.as_view()),
    path('articles-cat/', ArticlescategoryView.as_view()),
    path('all-articles/', AllArticlesView.as_view()),
    path('cateogry-articles/<int:pk>/', CategoryarticlesView.as_view()),
    path('single-article/<int:pk>/', SingleArticleView.as_view()),
    path('comment-article/', ReviewarticleView.as_view()),
    path('replay-comment/', ReplayReviewarticleView.as_view()),
    path('about/', AboutView.as_view()),
    # # path('search/<str:q>/', SearchView.as_view()),
]
