import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({
    formData,
    handleSubmit,
    handleChange,
    handleRating,
    isEditing,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Your Review' : 'Submit Your Review'}
            </h2>
            <form onSubmit={handleSubmit} className="mt-6">
                {/* Rating Section */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">
                        Rate this product:
                    </label>
                    <div className="flex mt-2">
                        {Array.from({ length: 5 }, (_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`text-2xl ${formData.rating >= index + 1
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                onClick={() => handleRating(index + 1)}
                            >
                                <FaStar />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="block w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="block w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Comment Section */}
                <div className="mb-6">
                    <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Review
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Write your review here..."
                        className="block w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="4"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {isEditing ? 'Update Review' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
