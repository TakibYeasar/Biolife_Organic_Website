import React, { useState } from 'react';

// CommentForm.jsx
const CommentForm = ({ onSubmit, placeholder, initialValue, onChange, onCancel }) => {
    const [commentData, setCommentData] = useState(initialValue || '');

    const handleChange = (e) => {
        setCommentData(e.target.value);
        if (onChange) onChange(e.target.value); // Notify parent of changes
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!commentData.trim()) return;
        onSubmit(commentData); // Pass comment data to parent
        setCommentData(''); // Clear the input after submission
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                placeholder={placeholder || "Write your comment..."}
                value={commentData}
                onChange={handleChange}
                className="w-full p-4 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                rows="4"
            />
            <div className="flex justify-between items-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                    Post Comment
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-500 hover:text-primary"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;
