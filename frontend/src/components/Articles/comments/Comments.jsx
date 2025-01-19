import React, { useState } from 'react';
import { useCurrentUserQuery } from '../../../redux/features/auth/authApi';
import {
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeDislikeCommentMutation,
    useRemoveLikeDislikeCommentMutation
} from '../../../redux/features/articles/articlesApi';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

const Comments = ({ articleId, comments }) => {
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentData, setEditCommentData] = useState('');
    const { data: currentUser } = useCurrentUserQuery();

    // Mutations for create, update, delete, like/dislike actions
    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [likeDislikeComment] = useLikeDislikeCommentMutation();
    const [removeLikeDislikeComment] = useRemoveLikeDislikeCommentMutation();

    // Handle the creation of a new comment
    const handleCreateComment = async (commentData) => {
        if (!articleId) {
            console.error('No articleId provided');
            return;
        }
        try {
            await createComment({ articleId, data: { comment: commentData } }).unwrap();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    // Handle the submission of an updated comment
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editCommentData.trim()) return;

        try {
            await updateComment({ commentId: editCommentId, data: { comment: editCommentData } }).unwrap();
            setEditCommentId(null);
            setEditCommentData('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // Handle comment deletion
    const handleDelete = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment(commentId).unwrap();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    // Handle like/dislike actions on comments
    const handleLikeDislike = async (commentId, action) => {
        try {
            await likeDislikeComment({ commentId, action }).unwrap();
        } catch (error) {
            console.error("Error liking/disliking comment:", error);
        }
    };

    // Handle removal of like/dislike reactions
    const handleRemoveReaction = async (commentId) => {
        try {
            await removeLikeDislikeComment({ commentId }).unwrap();
        } catch (error) {
            console.error('Error removing like/dislike:', error);
        }
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold">
                Comments <span className="text-gray-500 text-lg">({comments.length})</span>
            </h3>

            {/* Comment Form for creating a new comment */}
            <CommentForm onSubmit={handleCreateComment} />

            {/* Comments List rendering existing comments */}
            <CommentsList
                comments={comments}
                currentUser={currentUser}
                onEdit={(id, comment) => {
                    setEditCommentId(id);
                    setEditCommentData(comment);
                }}
                onDelete={handleDelete}
                onLikeDislike={handleLikeDislike}
                onRemoveReaction={handleRemoveReaction}
            />
        </div>
    );
};

export default Comments;
