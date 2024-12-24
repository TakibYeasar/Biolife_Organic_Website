from django.urls import path
from .views import *

urlpatterns = [
    path('all-prod_categories/', GetCategoryView.as_view(), name='get_categories'),
    path('single-prd_category/<int:id>/',
         GetCategoryView.as_view(), name='single_category'),
    path('create-prod_category/', CreateCategoryView.as_view(), name='create_category'),
    path('update-prod_category/<int:id>/',
         UpdateCategoryView.as_view(), name='update_category'),
    path('delete-prod_category/<int:id>/',
         DeleteCategoryView.as_view(), name='delete_category'),

    path('all_products/', GetProductView.as_view(), name='get_products'),
    path('single-product/<int:id>/',
         GetProductView.as_view(), name='single_product'),
    path('create-product/', CreateProductView.as_view(), name='create_product'),
    path('update-product/<int:id>/',
         UpdateProductView.as_view(), name='update_product'),
    path('delete-product/<int:id>/',
         DeleteProductView.as_view(), name='delete_product'),

    path('product/<int:product_id>/create-likes/',
         CreateProductLikeView.as_view(), name='create_product_like'),
    path('product/<int:product_id>/remove-likes/',
         RemoveProductLikeView.as_view(), name='remove_product_like'),

    path('product/<int:product_id>/create-review/',
         CreateProductReviewView.as_view(), name='create_product_review'),
    path('product/update-review/<int:review_id>',
         UpdateProductReviewView.as_view(), name='update_product_review'),
    path('product/delete-review/<int:review_id>',
         DeleteProductReviewView.as_view(), name='delete_review'),
]
