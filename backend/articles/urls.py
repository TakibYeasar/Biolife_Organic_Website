from django.urls import path
from .views import *

urlpatterns = [
    path('article_categories/', GetArticleCategoryView.as_view(),
         name='get_article_category'),
    path('single/category/<int:id>/',
         GetArticleCategoryView.as_view(), name='single_article_category'),
    path('create/category/', CreateArticleCategoryView.as_view(),
         name='create_article_category'),
    path('update/category/<int:id>/',
         UpdateArticleCategoryView.as_view(), name='update_article_category'),
    path('delete/category/<int:id>/',
         DeleteArticleCategoryView.as_view(), name='delete_article_category'),

    path('all_articles/', GetArticleView.as_view(), name='get_article'),
    path('single/article/<int:id>/',
         GetArticleView.as_view(), name='single_article'),
    path('create/article/', CreateArticleView.as_view(), name='create_article'),
    path('update/article/<int:id>/',
         UpdateArticleView.as_view(), name='update_article'),
    path('delete/article/<int:id>/',
         DeleteArticleView.as_view(), name='delete_article'),

    path('article/like_unlike/<int:article_id>/',
         LikeUnlikeArticleView.as_view(), name='like_unlike_article'),
    path('like/article/<int:article_id>/',
         AddLikeUnlikeArticleView.as_view(), name='add_like_article'),
    path('unlike/article/<int:article_id>/',
         RemoveLikeUnlikeArticleView.as_view(), name='remove_like_article'),

    path('article/<int:article_id>/create/comment/',
         CreateCommentArticleView.as_view(), name='create_article_comment'),
    path('article/update/comment/<int:comment_id>/',
         UpdateCommentArticleView.as_view(), name='update_article_comment'),
    path('article/delete/comment/<int:comment_id>/',
         DeleteCommentArticleView.as_view(), name='delete_article_comment'),

    path('article/comment/<int:comment_id>/create/like_dislike/',
         CreateCommentLikeDislikeView.as_view(), name='create_comment_like_dislike'),
    path('article/comment/<int:comment_id>/remove/like_dislike/',
         RemoveCommentLikeDislikeView.as_view(), name='remove_comment_like_dislike'),
    path('article/comment/<int:comment_id>/count/like_dislike/',
         GetCommentLikeDislikeCountView.as_view(), name='get_comment_like_dislike_count'),
]
