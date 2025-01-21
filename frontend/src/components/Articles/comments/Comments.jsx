import React, { useState } from 'react';
import { useCurrentUserQuery } from '../../../redux/features/auth/authApi';
import {
    useCreateCommentMutation,
    useCreateReplyCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeDislikeCommentMutation,
    useRemoveLikeDislikeCommentMutation,
} from '../../../redux/features/articles/articlesApi';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

const Comments = ({ articleId, comments }) => {
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
    const { data: currentUser } = useCurrentUserQuery();

    const [createComment] = useCreateCommentMutation();
    const [createReplyComment] = useCreateReplyCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [likeDislikeComment] = useLikeDislikeCommentMutation();
    const [removeLikeDislikeComment] = useRemoveLikeDislikeCommentMutation();

    const handleCreateComment = async (commentData) => {
        try {
            await createComment({ articleId, data: { comment: commentData } }).unwrap();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleCreateReply = async (commentData) => {
        if (!replyToCommentId) return;

        try {
            await createReplyComment({
                articleId,
                data: { comment: commentData, parent: replyToCommentId },
            }).unwrap();
            setReplyToCommentId(null);
        } catch (error) {
            console.error('Error creating reply:', error);
        }
    };

    const handleEditComment = (commentId) => {
        setEditCommentId(commentId);
    };

    const handleEditSubmit = async (commentId, updatedComment) => {
        try {
            await updateComment({
                commentId,
                data: { comment: updatedComment },
            }).unwrap();
            setEditCommentId(null); // Reset after edit
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDelete = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment(commentId).unwrap();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    const handleLikeDislike = async (commentId, action) => {
        try {
            await likeDislikeComment({ commentId, action }).unwrap();
        } catch (error) {
            console.error('Error liking/disliking comment:', error);
        }
    };


    const handleRemoveReaction = async (commentId) => {
        try {
            await removeLikeDislikeComment(commentId).unwrap();
        } catch (error) {
            console.error('Error removing reaction:', error);
        }
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold">
                Comments <span className="text-gray-500 text-lg">({comments.length})</span>
            </h3>

            <CommentForm onSubmit={handleCreateComment} />

            <CommentsList
                comments={comments}
                currentUser={currentUser}
                replyToCommentId={replyToCommentId}
                editCommentId={editCommentId}
                onEdit={handleEditComment}
                onDelete={handleDelete}
                onLikeDislike={handleLikeDislike}
                onRemoveReaction={handleRemoveReaction}
                onReply={setReplyToCommentId}
                onReplySubmit={handleCreateReply}
                onEditSubmit={handleEditSubmit}
                onCancelEdit={() => setEditCommentId(null)} // Cancel edit
            />
        </div>
    );
};

export default Comments;
