import React from 'react';

const ReviewForm = ({ formData, handleFormChange, handleRatingChange, onSubmit, isEditing, isLoading }) => {
    const { rate, name, email, comment } = formData;

    const handleClickRating = (rating) => {
        handleRatingChange(rating); // Call the correct prop function
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {/* Rating Section */}
            <div>
                <p className="text-xl font-semibold">Rate the product</p>
                <div className="flex space-x-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <button
                            type="button"
                            key={index + 1}
                            className={`text-2xl ${rate >= index + 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => handleClickRating(index + 1)}  // Use handleRatingChange here
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            {/* Name, Email, and Comment Fields */}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                    name="comment"
                    value={comment}
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={isLoading}
            >
                {isEditing ? (isLoading ? 'Updating...' : 'Update Review') : (isLoading ? 'Submitting...' : 'Submit Review')}
            </button>
        </form>
    );
};

export default ReviewForm;
