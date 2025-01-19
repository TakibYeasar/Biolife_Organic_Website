import React from 'react';

const Rating = ({ starRating, reviews }) => {
    return (
        <li className="flex items-center justify-between">
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
};

export default Rating;
