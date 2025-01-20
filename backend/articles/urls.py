from django.urls import path
from .views import *

urlpatterns = [
    path('article_categories/', GetArticleCategoryView.as_view(),
         name='get_article_category'),
    path('single-article-category/<int:id>/',
         GetArticleCategoryView.as_view(), name='single_article_category'),
    path('create-article-category/', CreateArticleCategoryView.as_view(),
         name='create_article_category'),
    path('update-article-category/<int:id>/',
         UpdateArticleCategoryView.as_view(), name='update_article_category'),
    path('delete-article-category/<int:id>/',
         DeleteArticleCategoryView.as_view(), name='delete_article_category'),
    
    path('article_tags/', GetArticleTagView.as_view(), name='get_article_tags'),
    path('single-article-tag/<int:id>/',
         GetArticleTagView.as_view(), name='single_article_tag'),
    path('delete-article-tag/<int:id>/',
         DeleteArticleTagView.as_view(), name='delete_article_tag'),
    
    path('manage-articles/', ManageArticlesView.as_view(), name='manage_articles'),
    path('articles/<int:pk>/approve/',
         ManageArticlesView.as_view(), name='approve_prod'),
    path('articles/<int:pk>/edit-approval/',
         ManageArticlesView.as_view(), name='edit-approval'),
    path('articles/<int:pk>/remove/', ManageArticlesView.as_view(), name='remove_prod'),

    path('all_articles/', GetArticleView.as_view(), name='get_article'),
    path('single-article/<int:id>/',
         GetArticleView.as_view(), name='single_article'),
    path('create-article/', CreateArticleView.as_view(), name='create_article'),
    path('update-article/<int:id>/',
         UpdateArticleView.as_view(), name='update_article'),
    path('delete-article/<int:id>/',
         DeleteArticleView.as_view(), name='delete_article'),
    
    path('like-article/<int:article_id>/',
         AddLikeUnlikeArticleView.as_view(), name='add_like_article'),
    path('unlike-article/<int:article_id>/',
         RemoveLikeUnlikeArticleView.as_view(), name='remove_like_article'),

    path('article/<int:article_id>/create-comment/',
         CreateCommentArticleView.as_view(), name='create_article_comment'),
    path('articles/<int:article_id>/comments/<int:parent_id>/create-reply-comment/',
        CreateCommentArticleView.as_view(), name='create_reply_comment'),
    path('article-update-comment/<int:comment_id>/',
         UpdateCommentArticleView.as_view(), name='update_article_comment'),
    path('article-delete-comment/<int:comment_id>/',
         DeleteCommentArticleView.as_view(), name='delete_article_comment'),

    path('article-comment/<int:comment_id>/create-like_dislike/',
         CreateCommentLikeDislikeView.as_view(), name='create_comment_like_dislike'),
    path('article-comment/<int:comment_id>/remove-like_dislike/',
         RemoveCommentLikeDislikeView.as_view(), name='remove_comment_like_dislike'),
]
