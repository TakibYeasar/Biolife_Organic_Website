from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404


class GetArticleCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get('id')
        if category_id:
            try:
                category = ArticleCategory.objects.get(id=category_id)
                articles = Article.objects.filter(category=category)
                serializer = ArticleSerializer(articles, many=True)
                return Response(serializer.data, context={'request': request}, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = ArticleCategory.objects.all()
            category_data = ArticleCategorySerializer(
                category, context={'request': request}, many=True).data
            return Response(data=category_data, status=status.HTTP_200_OK)


class CreateArticleCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is an admin
        if not hasattr(user, 'role') or user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a category.")

        # Pass the request object in the serializer's context
        serializer = CreateArticleCategorySerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateArticleCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a category.")
            
            
        category_id = kwargs.get('id')
        try:
            category = ArticleCategory.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = CreateArticleCategorySerializer(
            category, context={'request': request}, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteArticleCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a category.")
            
        category_id = kwargs.get('id')
        try:
            category = ArticleCategory.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        category.delete()
        return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class GetArticleTagView(APIView):
    def get(self, request, *args, **kwargs):
        tag_id = kwargs.get('id')
        if tag_id:
            try:
                tag = ArticleTag.objects.get(id=tag_id)
                articles = Article.objects.filter(tags=tag)
                serializer = ArticleSerializer(articles, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Tag not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            tags = ArticleTag.objects.all()
            tag_data = ArticleTagSerializer(tags, many=True).data
            return Response(data=tag_data, status=status.HTTP_200_OK)


class DeleteArticleTagView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is an admin
        if not hasattr(user, 'role') or user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to delete a tag."
            )

        tag_id = kwargs.get('id')
        try:
            tag = ArticleTag.objects.get(id=tag_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Tag not found'}, status=status.HTTP_404_NOT_FOUND)

        tag.delete()
        return Response({'message': 'Tag deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class ManageArticlesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to view articles."},
                status=status.HTTP_403_FORBIDDEN
            )

        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk, *args, **kwargs):
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to approve or edit articles."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            article = Article.objects.get(pk=pk)
        except article.DoesNotExist:
            return Response({"detail": "article not found."}, status=status.HTTP_404_NOT_FOUND)

        is_approved = request.data.get("is_approved", None)

        if is_approved is not None:
            article.is_approved = is_approved
            article.save()

            status_message = (
                "approved" if is_approved else "set to pending approval"
            )
            return Response(
                {"detail": f"article '{article.name}' has been {status_message}."},
                status=status.HTTP_200_OK,
            )

        if article.is_approved:
            return Response(
                {"detail": f"article '{article.name}' is already approved."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        article.is_approved = True
        article.save()

        return Response(
            {"detail": f"article '{article.name}' approved successfully."},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, pk, *args, **kwargs):
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to delete articles."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            article = Article.objects.get(pk=pk)
        except article.DoesNotExist:
            return Response({"detail": "article not found."}, status=status.HTTP_404_NOT_FOUND)

        article.delete()
        return Response(
            {"detail": f"article '{article.name}' has been successfully removed."},
            status=status.HTTP_200_OK,
        )


class GetArticleView(APIView):
    def get(self, request, *args, **kwargs):
        article_id = kwargs.get('id')

        if article_id:
            try:
                article = Article.objects.select_related('user').prefetch_related(
                    'categories', 'tags', 'likes', 'comments__likes', 'comments__dislikes'
                ).get(id=article_id)

                serializer = ArticleSerializer(
                    article, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Article.DoesNotExist:
                return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)

        else:
            articles = Article.objects.all()
            serializer = ArticleSerializer(
                articles, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)



class CreateArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        if user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create an article."
            )

        # Pass the request context to the serializer
        serializer = ArticleCreateUpdateSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateArticleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        article_id = kwargs.get('id')
        try:
            article = Article.objects.get(id=article_id)
            
            if article.farmer != request.user:
                raise PermissionDenied(
                    "You do not have permission to update a article.")
            
            serializer = ArticleCreateUpdateSerializer(
                article, context={'request': request}, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        except ObjectDoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)


class DeleteArticleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        article_id = kwargs.get('id')
        try:
            article = Article.objects.get(id=article_id)
            
            if article.farmer != request.user:
                raise PermissionDenied(
                    "You do not have permission to delete a article.")

            article.delete()
            return Response({'message': 'Article deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
                
        except ObjectDoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)


class AddLikeUnlikeArticleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, article_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to like a article.")
            
        article = Article.objects.get(id=article_id)
        
        if user.id in article.likes.values_list('id', flat=True):
            raise PermissionDenied("You have already liked this article.")
        
        article.likes.add(request.user.id)
        article.save()
        return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)


class RemoveLikeUnlikeArticleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, article_id):
        user = request.user
        if user.role != 'customer':
            raise PermissionDenied(
                "You do not have permission to unlike a article.")
            
        article = Article.objects.get(id=article_id)
        
        if user.id not in article.likes.values_list('id', flat=True):
            raise PermissionDenied("You have not liked this article yet.")
        
        
        article.likes.remove(request.user.id)
        article.save()
        return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)


class CreateCommentArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, article_id, parent_id=None):
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['article'] = article.id  # Associate the article with the comment
        if parent_id:
            try:
                parent_comment = ArticleComment.objects.get(id=parent_id)
                # Associate the parent comment if provided
                data['parent'] = parent_comment.id
            except ArticleComment.DoesNotExist:
                return Response({'error': "No parent comment found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ArticleCommentCreateUpdateSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateCommentArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, comment_id):
        try:
            comment = ArticleComment.objects.get(id=comment_id)
        except ArticleComment.DoesNotExist:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the comment belongs to the authenticated user
        if comment.user.id != request.user.id:
            return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        # Ensure that the parent comment, if provided, is in the same article
        parent = request.data.get('parent')
        if parent:
            try:
                parent_comment = ArticleComment.objects.get(id=parent)
                if parent_comment.article != comment.article:
                    return Response({'error': "The parent comment must belong to the same article."}, status=status.HTTP_400_BAD_REQUEST)
            except ArticleComment.DoesNotExist:
                return Response({'error': "Parent comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Validate and update the comment
        serializer = ArticleCommentCreateUpdateSerializer(
            comment, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCommentArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, comment_id):
        try:
            comment = ArticleComment.objects.get(id=comment_id)
        except ArticleComment.DoesNotExist:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the comment belongs to the authenticated user
        if comment.user.id != request.user.id:
            return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        # Ensure that any replies to this comment are deleted before deleting the comment
        comment.replies.all().delete()

        # Delete the comment
        comment.delete()
        return Response({'msg': "Comment (and its replies) deleted successfully"}, status=status.HTTP_200_OK)

    

class CreateCommentLikeDislikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        # Expected values: 'like' or 'dislike'
        action = request.data.get('action')
        if action not in ['like', 'dislike']:
            return Response({'error': 'Invalid action. Must be "like" or "dislike".'}, status=status.HTTP_400_BAD_REQUEST)

        comment = get_object_or_404(ArticleComment, id=comment_id)

        # Remove any existing like or dislike by the user
        if comment.likes.filter(id=request.user.id).exists():
            comment.likes.remove(request.user)
        if comment.dislikes.filter(id=request.user.id).exists():
            comment.dislikes.remove(request.user)

        # Add the new action
        if action == 'like':
            comment.likes.add(request.user)
        elif action == 'dislike':
            comment.dislikes.add(request.user)

        return Response({'msg': f'Comment {action}d successfully'}, status=status.HTTP_200_OK)


class RemoveCommentLikeDislikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        comment = get_object_or_404(ArticleComment, id=comment_id)

        # Remove the user's reaction (like or dislike)
        if comment.likes.filter(id=request.user.id).exists():
            comment.likes.remove(request.user)
            return Response({'msg': 'Like removed'}, status=status.HTTP_200_OK)

        if comment.dislikes.filter(id=request.user.id).exists():
            comment.dislikes.remove(request.user)
            return Response({'msg': 'Dislike removed'}, status=status.HTTP_200_OK)

        return Response({'error': 'No like or dislike found to remove'}, status=status.HTTP_404_NOT_FOUND)

