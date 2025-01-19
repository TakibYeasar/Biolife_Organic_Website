import React, { useState } from 'react';
import {
    FaAngleRight,
    FaComment,
    FaFileImage,
    FaPaperclip,
    FaSmile,
    FaThumbsDown,
    FaThumbsUp,
} from 'react-icons/fa';
import author02 from "/assets/images/blogpost/author-02.png";
import author03 from "/assets/images/blogpost/author-03.png";

const dummyComments = [
    {
        id: 1,
        author: "Christiano Bale",
        avatar: author02,
        time: "4 days ago",
        content: "Nam sed eleifend dui, eu eleifend leo. Mauris ornare eros quis placerat mollis.",
        likes: 9,
        dislikes: 1,
        replies: [
            {
                id: 2,
                author: "Samuel Godi",
                avatar: author03,
                time: "4 days ago",
                content: "Ut pellentesque gravida justo non rhoncus. Nunc ullamcorper tortor id aliquet luctus.",
                likes: 9,
                dislikes: 1,
            },
        ],
    },
];

const Comments = () => {
    const [commentData, setCommentData] = useState("");

    const handleChange = (e) => setCommentData(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted comment:", commentData);
        setCommentData("");
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold">
                Comments <span className="text-gray-500 text-lg">(26)</span>
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    placeholder="Write your comment..."
                    value={commentData}
                    onChange={handleChange}
                    className="w-full p-4 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    rows="4"
                ></textarea>
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                    >
                        Post Comment
                    </button>
                    <div className="flex space-x-3 text-gray-500">
                        <FaSmile className="hover:text-primary cursor-pointer" />
                        <FaPaperclip className="hover:text-primary cursor-pointer" />
                        <FaFileImage className="hover:text-primary cursor-pointer" />
                    </div>
                </div>
            </form>

            {/* Comment List */}
            <ul className="space-y-6">
                {dummyComments.map((comment) => (
                    <li key={comment.id} className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-start space-x-4">
                            <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold">{comment.author}</h4>
                                    <span className="text-sm text-gray-400">{comment.time}</span>
                                </div>
                                <p className="mt-2 text-gray-700">{comment.content}</p>
                                <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                                    <button className="hover:text-primary flex items-center space-x-1">
                                        <FaComment />
                                        <span>Reply</span>
                                    </button>
                                    <button className="hover:text-primary flex items-center space-x-1">
                                        <FaThumbsUp />
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button className="hover:text-primary flex items-center space-x-1">
                                        <FaThumbsDown />
                                        <span>{comment.dislikes}</span>
                                    </button>
                                </div>

                                {/* Replies */}
                                {comment.replies && (
                                    <ul className="mt-4 space-y-4 pl-8 border-l-2 border-gray-200">
                                        {comment.replies.map((reply) => (
                                            <li key={reply.id} className="p-3 bg-gray-50 rounded-md">
                                                <div className="flex items-start space-x-4">
                                                    <img
                                                        src={reply.avatar}
                                                        alt={reply.author}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center">
                                                            <h5 className="font-medium">
                                                                {reply.author}
                                                            </h5>
                                                            <span className="text-sm text-gray-400">
                                                                {reply.time}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-gray-700">{reply.content}</p>
                                                        <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                                                            <button className="hover:text-primary flex items-center space-x-1">
                                                                <FaComment />
                                                                <span>Reply</span>
                                                            </button>
                                                            <button className="hover:text-primary flex items-center space-x-1">
                                                                <FaThumbsUp />
                                                                <span>{reply.likes}</span>
                                                            </button>
                                                            <button className="hover:text-primary flex items-center space-x-1">
                                                                <FaThumbsDown />
                                                                <span>{reply.dislikes}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
                <button className="px-3 py-1 bg-primary text-white rounded-md">1</button>
                <button className="px-3 py-1 text-gray-500 hover:bg-gray-200 rounded-md">2</button>
                <button className="px-3 py-1 text-gray-500 hover:bg-gray-200 rounded-md">3</button>
                <span className="text-gray-400">...</span>
                <button className="px-3 py-1 text-gray-500 hover:bg-gray-200 rounded-md">20</button>
                <button className="px-3 py-1 text-gray-500 hover:bg-gray-200 rounded-md">
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default Comments;
