import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-10">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <ol className="list-decimal pl-5">
                {reviews.map((review) => {
                    // Format the created_at date
                    const reviewDate = new Date(review.created_at).toLocaleDateString();

                    return (
                        <li key={review.id} className="mb-4">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="font-bold">{review.name}</p>
                                <p className="text-sm text-gray-500">{reviewDate}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500">{review.rate} </span>
                                    <FaStar className="text-yellow-500" />
                                </div>
                                <p className="mt-2">{review.comment}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default ReviewList;
