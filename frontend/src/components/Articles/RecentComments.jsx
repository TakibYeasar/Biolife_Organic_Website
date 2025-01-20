import React from 'react';

const RecentComments = ({ comments }) => {
    const formatTime = (isoString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    const renderComments = (commentList) => {
        return commentList.map((comment) => (
            <li key={comment.id} className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <a
                        href="#"
                        className="text-gray-900 font-medium hover:text-blue-600 transition"
                    >
                        {comment.user}
                    </a>
                    <span className="text-sm text-gray-500">
                        {formatTime(comment.created_at)}
                    </span>
                </div>
                <p className="text-gray-700 mt-2">
                    {comment.comment.split(' ').slice(0, 10).join(' ')}
                    {comment.comment.split(' ').length > 10 && '...'}
                </p>
                {/* Render child comments if they exist */}
                {comment.children && comment.children.length > 0 && (
                    <ul className="ml-6 mt-4 border-l border-gray-300 pl-4">
                        {renderComments(comment.children)}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Recent Comments</h4>
            {comments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {renderComments(comments.slice(0, 5))}
                </ul>
            ) : (
                <p className="text-gray-500">No recent comments available.</p>
            )}
        </div>
    );
};

export default RecentComments;
