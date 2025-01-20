import React from 'react';
import CommentItem from './CommentItem';

const CommentsList = ({
    comments,
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
    return (
        <ul className="space-y-6">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
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
    );
};

export default CommentsList;
