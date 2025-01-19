import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [commentData, setCommentData] = useState('');

    const handleChange = (e) => setCommentData(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentData.trim()) return;
        onSubmit(commentData);
        setCommentData('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                placeholder="Write your comment..."
                value={commentData}
                onChange={handleChange}
                className="w-full p-4 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                rows="4"
            ></textarea>
            <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
