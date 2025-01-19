import React from 'react';
import CommentItem from './CommentItem';

const CommentsList = ({ comments, currentUser, onEdit, onDelete, onLikeDislike, onRemoveReaction }) => {
    return (
        <ul className="space-y-6">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onLikeDislike={onLikeDislike}
                    onRemoveReaction={onRemoveReaction}
                />
            ))}
        </ul>
    );
};

export default CommentsList;
