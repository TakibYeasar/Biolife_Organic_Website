import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewList = ({ reviews, onEdit, onDelete }) => {
    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
            {reviews.length > 0 ? (
                <ol className="mt-6 space-y-6">
                    {reviews.map((review) => {
                        // Format the review creation date
                        const reviewDate = new Date(review.created_at).toLocaleDateString();

                        return (
                            <li key={review.id} className="border-b border-gray-200 pb-4">
                                <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-sm">
                                    {/* Reviewer's Name */}
                                    <p className="font-semibold text-gray-700">{review.name}</p>

                                    {/* Review Date */}
                                    <p className="text-sm text-gray-500">{reviewDate}</p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FaStar
                                                key={index}
                                                className={`${index < review.rate
                                                        ? 'text-yellow-500'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 mt-2">{review.comment}</p>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button
                                            onClick={() => onEdit(review.id)}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(review.id)}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <p className="text-gray-600 mt-4">No reviews yet. Be the first to leave a review!</p>
            )}
        </div>
    );
};

export default ReviewList;
