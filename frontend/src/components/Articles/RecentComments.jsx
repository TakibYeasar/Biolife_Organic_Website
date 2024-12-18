import React from 'react';

const RecentComments = () => {
    const comments = [
        { author: "Jessica Alba", post: "Healthy Organics" },
        { author: "Jessica Alba", post: "Best Organics" },
        { author: "Jessica Alba", post: "Healthy Organics" },
        { author: "Jessica Alba", post: "Healthy Organics" },
    ];

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="text-2xl font-semibold mb-4">Recent Comments</h4>
            <div className="space-y-4">
                <ul className="space-y-2">
                    {comments.map((comment, index) => (
                        <li key={index} className="text-base">
                            <p className="flex items-center space-x-2">
                                <a href="#" className="text-primary font-semibold hover:text-primary-focus">
                                    <i className="biolife-icon icon-conversation mr-1"></i>{comment.author}
                                </a>
                                <a href="#" className="text-secondary hover:text-secondary-focus">
                                    on {comment.post}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RecentComments;
