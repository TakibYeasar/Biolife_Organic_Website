import React, { useState } from 'react';
import { FaAngleRight, FaComment, FaFileImage, FaPaperclip, FaSmile, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import author02 from "/assets/images/blogpost/author-02.png";
import author03 from "/assets/images/blogpost/author-03.png";
import viewer from "/assets/images/blogpost/viewer-avt.png";

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
    const [commentData, setCommentData] = useState({
        comment: "",
        image: "",
        link: "",
    });

    const handleChange = (e) => {
        setCommentData({ ...commentData, comment: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted comment:", commentData);
    };

    return (
        <div className="post-comments">
            <h3 className="text-2xl font-bold mb-4">Comments<sup className="text-gray-500 text-lg">(26)</sup></h3>

            <div className="comment-form mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            name="txt-comment"
                            id="txt-comment"
                            placeholder="Write your comment"
                            value={commentData.comment}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-40 p-4"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="btn btn-primary">Post a comment</button>
                        <div className="flex space-x-2">
                            <a href="#" className="btn btn-outline"><FaSmile aria-hidden="true" /></a>
                            <a href="#" className="btn btn-outline"><FaPaperclip aria-hidden="true" /></a>
                            <a href="#" className="btn btn-outline"><FaFileImage aria-hidden="true" /></a>
                        </div>
                    </div>
                </form>
            </div>

            <div className="comment-list">
                <ol className="space-y-6">
                    {dummyComments.map((comment) => (
                        <li key={comment.id} className="comment-elem">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <a href="#" className="flex items-center space-x-2">
                                        <img src={comment.avatar} alt="author" width={29} height={28} className="rounded-full" />
                                        <span>{comment.author}</span>
                                    </a>
                                    <span className="text-gray-500 text-sm">{comment.time}</span>
                                </div>
                                <p className="mt-2">{comment.content}</p>
                                <div className="flex space-x-4 mt-3">
                                    <a href="#" className="btn btn-link"><FaComment aria-hidden="true" /> Comment</a>
                                    <a href="#" className="btn btn-link"><FaThumbsUp aria-hidden="true" /> {comment.likes}</a>
                                    <a href="#" className="btn btn-link"><FaThumbsDown aria-hidden="true" /> {comment.dislikes}</a>
                                </div>

                                {comment.replies && (
                                    <div className="pl-8 mt-4">
                                        <ol className="space-y-6">
                                            {comment.replies.map((reply) => (
                                                <li key={reply.id}>
                                                    <div className="bg-gray-100 p-4 rounded-lg">
                                                        <div className="flex items-center justify-between">
                                                            <a href="#" className="flex items-center space-x-2">
                                                                <img src={reply.avatar} alt="author" width={29} height={28} className="rounded-full" />
                                                                <span>{reply.author}</span>
                                                            </a>
                                                            <span className="text-gray-500 text-sm">{reply.time}</span>
                                                        </div>
                                                        <p className="mt-2">{reply.content}</p>
                                                        <div className="flex space-x-4 mt-3">
                                                            <a href="#" className="btn btn-link"><FaComment aria-hidden="true" /> Comment</a>
                                                            <a href="#" className="btn btn-link"><FaThumbsUp aria-hidden="true" /> {reply.likes}</a>
                                                            <a href="#" className="btn btn-link"><FaThumbsDown aria-hidden="true" /> {reply.dislikes}</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="biolife-panigations-block mt-8">
                    <ul className="pagination flex space-x-2">
                        <li><span className="btn btn-sm btn-primary">1</span></li>
                        <li><a href="#" className="btn btn-sm">2</a></li>
                        <li><a href="#" className="btn btn-sm">3</a></li>
                        <li><span className="text-gray-500">....</span></li>
                        <li><a href="#" className="btn btn-sm">20</a></li>
                        <li><a href="#" className="btn btn-sm"><FaAngleRight aria-hidden="true" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Comments;
