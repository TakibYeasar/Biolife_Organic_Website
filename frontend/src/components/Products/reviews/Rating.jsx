import React from 'react';

const Rating = ({ starRating, reviews }) => {
    const totalReviews = reviews.length;
    const ratingCount = reviews.filter((review) => review.rate === starRating).length;
    const percentage = totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0;

    return (
        <li className="flex items-center justify-between">
            <span>{starRating} star{starRating > 1 && 's'}</span>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span>{ratingCount}</span>
        </li>
    );
};

export default Rating;
