import React from 'react';
import { FaComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

const CommentItem = ({
    comment,
    currentUser,
    onEdit,
    onDelete,
    onLikeDislike,
    onRemoveReaction,
}) => {
    // Determine if the current user has reacted to this comment
    const hasLiked = comment.likes?.includes(currentUser?.id);
    const hasDisliked = comment.dislikes?.includes(currentUser?.id);

    return (
        <li key={comment.id} className="p-4 bg-gray-100 rounded-lg">
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
                        {currentUser?.username === comment.user && (
                            <>
                                <button
                                    className="hover:text-primary flex items-center space-x-1"
                                    onClick={() => onEdit(comment.id, comment.comment)}
                                >
                                    <FaComment />
                                    <span>Edit</span>
                                </button>
                                <button
                                    className="hover:text-primary flex items-center space-x-1"
                                    onClick={() => onDelete(comment.id)}
                                >
                                    <FaComment />
                                    <span>Delete</span>
                                </button>
                            </>
                        )}
                        <button
                            className={`hover:text-primary flex items-center space-x-1 ${hasLiked ? 'text-blue-500' : ''
                                }`}
                            onClick={() =>
                                hasLiked
                                    ? onRemoveReaction(comment.id)
                                    : onLikeDislike(comment.id, 'like')
                            }
                        >
                            <FaThumbsUp />
                            <span>{comment.like_count}</span>
                        </button>
                        <button
                            className={`hover:text-primary flex items-center space-x-1 ${hasDisliked ? 'text-red-500' : ''
                                }`}
                            onClick={() =>
                                hasDisliked
                                    ? onRemoveReaction(comment.id)
                                    : onLikeDislike(comment.id, 'dislike')
                            }
                        >
                            <FaThumbsDown />
                            <span>{comment.dislike_count}</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CommentItem;
