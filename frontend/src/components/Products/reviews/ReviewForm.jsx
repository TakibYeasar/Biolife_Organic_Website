import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ formData, handleSubmit, handleChange, handleRating }) => {
    return (
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
    );
};

export default ReviewForm;
