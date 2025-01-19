import React from 'react';

const RecentComments = () => {
    const comments = [
        { author: "Jessica Alba", post: "Healthy Organics" },
        { author: "Jessica Alba", post: "Best Organics" },
        { author: "Jessica Alba", post: "Healthy Organics" },
        { author: "Jessica Alba", post: "Healthy Organics" },
    ];

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Recent Comments</h4>
            <ul className="divide-y divide-gray-200">
                {comments.map((comment, index) => (
                    <li key={index} className="py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href="#"
                                className="text-gray-900 font-medium hover:text-blue-600 transition"
                            >
                                {comment.author}
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 text-sm mt-2 sm:mt-0 hover:text-blue-500 transition"
                            >
                                on {comment.post}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentComments;
