from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
)


class GetArticleCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        if category_id:
            try:
                category = Articlecategory.objects.get(id=category_id)
                articles = Article.objects.filter(category=category)
                serializer = ArticleSerializer(articles, many=True)
                return Response(serializer.data, context={'request': request}, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = Articlecategory.objects.all()
            category_data = ArticlecategorySerializer(
                category, context={'request': request}, many=True).data
            return Response(data=category_data, status=status.HTTP_200_OK)


class CreateArticleCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request, *args, **kwargs):
        serializer = ArticlecategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateArticleCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        try:
            category = Articlecategory.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = ArticlecategorySerializer(
            category, context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteArticleCategoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def delete(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        try:
            category = Articlecategory.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=HTTP_404_NOT_FOUND)
        
        category.delete()
        return Response({'message': 'Category deleted successfully'}, status=HTTP_204_NO_CONTENT)



class GetArticleView(APIView):
    def get(self, request, *args, **kwargs):
        article_id = kwargs.get('id')
        if article_id:
            try:
                article = Article.objects.get(id=article_id)
                serializer = ArticleSerializer(
                    article, context={'request': request})
                category_ids = [category.id for category in article.category.all()]
                serializer.data['category'] = category_ids
                comments = ArticleComment.objects.filter(article=article).order_by('-created')
                flat_comments = []
                for comment in ArticleCommentSerializer(comments, many=True).data:
                    children = self.get_children(comment['id'])
                    comment['children'] = children
                    flat_comments.append(comment)
                serializer.data['comments'] = flat_comments

                return Response(serializer.data, status=status.HTTP_200_OK)
            except Article.DoesNotExist:
                return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            articles = Article.objects.all()
            articles_data = ArticleSerializer(
                articles, context={'request': request}, many=True).data
            return Response(data=articles_data, status=status.HTTP_200_OK)

    def get_children(self, parent_id):
        """Recursive function to retrieve child comments (replies)"""
        children = ArticleComment.objects.filter(
            parent_id=parent_id).order_by('-created')
        children_data = ArticleCommentSerializer(children, many=True).data
        for child in children_data:
            child['children'] = self.get_children(child['id'])
        return children_data



class CreateArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def post(self, request, *args, **kwargs):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def put(self, request, *args, **kwargs):
        article_id = kwargs.get('id')
        try:
            article = Article.objects.get(id=article_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ArticleSerializer(
            article, context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    def delete(self, request, *args, **kwargs):
        article_id = kwargs.get('id')
        try:
            article = Article.objects.get(id=article_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
        
        article.delete()
        return Response({'message': 'Article deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



class LikeUnlikeArticleView(APIView):
    def get(self, request, article_id):
        try:
            article = Article.objects.get(id=article_id)
            return Response({'likes_count': article.likes.count()}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)

class AddLikeUnlikeArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, article_id):
        try:
            article = Article.objects.get(id=article_id)
            article.likes.add(request.user.id)
            article.save()
            return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)


class RemoveLikeUnlikeArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, article_id):
        try:
            article = Article.objects.get(id=article_id)
            article.likes.remove(request.user.id)
            article.save()
            return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)


class CreateCommentArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, article_id, parent_id=None):
        try:
            article = ArticleComment.objects.get(id=article_id)
        except ArticleComment.DoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ArticleCommentSerializer(data=request.data)
        if serializer.is_valid():
            if parent_id:
                try:
                    parent_comment = ArticleComment.objects.get(id=parent_id)
                except ArticleComment.DoesNotExist:
                    return Response({'error': "No parent comment found"}, status=status.HTTP_404_NOT_FOUND)
                serializer.save(user=request.user,
                                article=article, parent=parent_comment)
            else:
                serializer.save(user=request.user, article=article)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCommentArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, comment_id):
        try:
            comment = ArticleComment.objects.get(id=comment_id)
            if comment.user.id != request.user.id:
                return Response({'error': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except ArticleComment.DoesNotExist:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ArticleCommentSerializer(
            comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteCommentArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, comment_id):
        try:
            comment = ArticleComment.objects.get(id=comment_id)
            if comment.user.id == request.user.id:
                comment.delete()
                return Response({'msg': "Comment deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'error': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except ArticleComment.DoesNotExist:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)
    

class CreateCommentLikeDislikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        serializer = ArticleCommentSerializer(data={'action': request.data.get(
            'action'), 'user': request.user.id, 'comment': comment_id})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': serializer.data['action'] + 'd'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveCommentLikeDislikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        try:
            like_or_dislike = ArticleComment.likes.through.objects.get(
                user=request.user, comment_id=comment_id)
            like_or_dislike.delete()
            return Response({'msg': 'Like/dislike removed'}, status=status.HTTP_200_OK)
        except ArticleComment.likes.through.DoesNotExist:
            return Response({'error': 'Like/dislike not found'}, status=status.HTTP_404_NOT_FOUND)


class GetCommentLikeDislikeCountView(APIView):
    def get(self, request, comment_id):
        try:
            comment = ArticleComment.objects.get(id=comment_id)
            like_count = comment.likes.count()
            dislike_count = comment.dislikes.count()
            return Response({'likes': like_count, 'dislikes': dislike_count}, status=status.HTTP_200_OK)
        except ArticleComment.DoesNotExist:
            return Response({'error': "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
