import React, { useState } from 'react';
import { FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CommentForm from './CommentForm';

// CommentItem.jsx
const CommentItem = ({
    comment,
    currentUser,
    replyToCommentId,
    editCommentId,
    onEdit,
    onDelete,
    onLikeDislike,
    onRemoveReaction,
    onReply,
    onReplySubmit,
    onEditSubmit,
    onCancelEdit
}) => {
    const [editedComment, setEditedComment] = useState(comment.comment);
    const hasLiked = comment.likes?.includes(currentUser?.id);
    const hasDisliked = comment.dislikes?.includes(currentUser?.id);

    const handleEditSubmit = (editedComment) => {
        // Pass the edited comment directly (not as an event)
        onEditSubmit(comment.id, editedComment);
    };

    return (
        <li className="p-4 bg-gray-100 rounded-lg mb-4">
            {editCommentId === comment.id ? (
                <div className="mb-4">
                    <CommentForm
                        onSubmit={handleEditSubmit} // Pass handleEditSubmit correctly
                        placeholder="Edit your comment..."
                        initialValue={editedComment}
                        onChange={(value) => setEditedComment(value)}
                        onCancel={onCancelEdit}
                    />
                </div>
            ) : (
                <div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{comment.user}</h4>
                                <span className="text-sm text-gray-400">
                                    {new Date(comment.created_at).toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-700">{comment.comment}</p>
                            <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                                <button
                                    className="hover:text-primary flex items-center space-x-1"
                                    onClick={() => onReply(comment.id)}
                                >
                                    <FaComment />
                                    <span>Reply</span>
                                </button>
                                {currentUser?.username === comment.user && (
                                    <>
                                        <button
                                            className="hover:text-primary flex items-center space-x-1"
                                            onClick={() => onEdit(comment.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="hover:text-primary flex items-center space-x-1"
                                            onClick={() => onDelete(comment.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                <button
                                    className={`hover:text-primary flex items-center space-x-1 ${hasLiked ? "text-blue-500" : ""}`}
                                    onClick={() =>
                                        hasLiked
                                            ? onRemoveReaction(comment.id)
                                            : onLikeDislike(comment.id, "like")
                                    }
                                >
                                    <FaThumbsUp />
                                    <span>{comment.like_count}</span>
                                </button>
                                <button
                                    className={`hover:text-primary flex items-center space-x-1 ${hasDisliked ? "text-red-500" : ""}`}
                                    onClick={() =>
                                        hasDisliked
                                            ? onRemoveReaction(comment.id)
                                            : onLikeDislike(comment.id, "dislike")
                                    }
                                >
                                    <FaThumbsDown />
                                    <span>{comment.dislike_count}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {replyToCommentId === comment.id && (
                        <div className="mt-4 ml-8">
                            <CommentForm onSubmit={onReplySubmit} placeholder="Write your reply..." />
                        </div>
                    )}
                </div>
            )}

            {comment.children && comment.children.length > 0 && (
                <ul className="ml-8 mt-4">
                    {comment.children.map((child) => (
                        <CommentItem
                            key={child.id}
                            comment={child}
                            currentUser={currentUser}
                            replyToCommentId={replyToCommentId}
                            editCommentId={editCommentId}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onLikeDislike={onLikeDislike}
                            onRemoveReaction={onRemoveReaction}
                            onReply={onReply}
                            onReplySubmit={onReplySubmit}
                            onEditSubmit={onEditSubmit}
                            onCancelEdit={onCancelEdit}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default CommentItem;
