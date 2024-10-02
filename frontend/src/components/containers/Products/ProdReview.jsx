import React, { useState } from 'react';
import { FaAngleRight, FaFlag, FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

const ProdReview = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        rating: 0,
    });

    const reviews = [
        {
            id: 1,
            name: "Shop Organic",
            date: "01/04/2018",
            rating: 4.4,
            text: "There are few things in life that please people more than the succulence of quality fresh fruit and vegetables. At Fresh Fruits we work to deliver the world’s freshest, choicest, and juiciest produce to discerning customers across the UAE and GCC.",
            likes: 100,
            dislikes: 20,
        },
        // Add more dummy reviews here if needed
    ];

    const handleRating = (value) => {
        setFormData({ ...formData, rating: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Review submitted:', formData);
        // Reset form data
        setFormData({ name: '', email: '', comment: '', rating: 0 });
    };

    return (
        <div className="container mx-auto my-10">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 mb-8 lg:mb-0">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-xl font-bold">
                            <span className="text-yellow-500">{reviews[0].rating.toFixed(1)}</span> out of 5
                        </p>
                        <p className="text-gray-500">See all {reviews.length} reviews</p>
                        <ul className="mt-5">
                            {Array.from({ length: 5 }, (_, index) => {
                                const starRating = 5 - index;
                                return (
                                    <li key={starRating} className="flex items-center justify-between">
                                        <span>{starRating} star</span>
                                        <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`bg-yellow-500 h-2 rounded-full`}
                                                style={{ width: `${(reviews[0].rating >= starRating ? 1 : 0) * 100}%` }}
                                            />
                                        </div>
                                        <span>{starRating * 10}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-2/3">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Submit your review</h2>
                        <form onSubmit={handleSubmit} className="mt-5">
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Your rating of this product:</label>
                                <div className="flex space-x-1 mt-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`text-xl ${formData.rating >= index + 1 ? 'text-yellow-500' : 'text-gray-400'}`}
                                            onClick={() => handleRating(index + 1)}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                className="input input-bordered w-full mb-4"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                className="input input-bordered w-full mb-4"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="comment"
                                placeholder="Write your review here..."
                                className="textarea textarea-bordered w-full mb-4"
                                rows="4"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <ol className="list-decimal pl-5">
                    {reviews.map((review) => (
                        <li key={review.id} className="mb-4">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="font-bold">{review.name}</p>
                                <p className="text-sm text-gray-500">{review.date}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500">{review.rating} </span>
                                    <FaStar className="text-yellow-500" />
                                </div>
                                <p className="mt-2">{review.text}</p>
                                <div className="mt-2 flex space-x-4">
                                    <button className="btn btn-outline" type="button">
                                        <FaThumbsUp /> Yes ({review.likes})
                                    </button>
                                    <button className="btn btn-outline" type="button">
                                        <FaThumbsDown /> No ({review.dislikes})
                                    </button>
                                    <button className="btn btn-outline" type="button">
                                        <FaFlag /> Report
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default ProdReview;
