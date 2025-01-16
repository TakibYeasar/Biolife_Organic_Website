from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


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


class CreateArticleTagView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is an admin
        if not hasattr(user, 'role') or user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to create a tag."
            )

        serializer = ArticleTagCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateArticleTagView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user

        # Check if the user is an admin
        if not hasattr(user, 'role') or user.role != 'admin':
            raise PermissionDenied(
                "You do not have permission to update a tag."
            )

        tag_id = kwargs.get('id')
        try:
            tag = ArticleTag.objects.get(id=tag_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Tag not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ArticleTagCreateUpdateSerializer(
            tag, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        try:
            article = Article.objects.get(id=article_id)
            article.likes.add(request.user.id)
            article.save()
            return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({'error': "No article found"}, status=status.HTTP_404_NOT_FOUND)


class RemoveLikeUnlikeArticleView(APIView):
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
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        serializer = ArticleCommentSerializer(data={'action': request.data.get(
            'action'), 'user': request.user.id, 'comment': comment_id})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': serializer.data['action'] + 'd'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveCommentLikeDislikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        try:
            like_or_dislike = ArticleComment.likes.through.objects.get(
                user=request.user, comment_id=comment_id)
            like_or_dislike.delete()
            return Response({'msg': 'Like/dislike removed'}, status=status.HTTP_200_OK)
        except ArticleComment.likes.through.DoesNotExist:
            return Response({'error': 'Like/dislike not found'}, status=status.HTTP_404_NOT_FOUND)
