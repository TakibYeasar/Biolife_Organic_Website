import React, { useState } from 'react';

// Sample product data
const sampleProduct = {
    id: 1,
    name: 'Organic Avocados',
    reviews: [
        {
            id: 1,
            rating: 5,
            comment: 'These avocados are fantastic! Super fresh and creamy.',
            date: '2024-09-29',
        },
        {
            id: 2,
            rating: 4,
            comment: 'Great quality but a bit pricey.',
            date: '2024-09-28',
        },
    ],
};

const RateAndReview = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState(sampleProduct.reviews);
    const [successMessage, setSuccessMessage] = useState('');

    const handleRatingChange = (rate) => {
        setRating(rate);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (rating > 0 && comment) {
            const newReview = {
                id: reviews.length + 1,
                rating,
                comment,
                date: new Date().toLocaleDateString(),
            };
            setReviews([...reviews, newReview]);
            setSuccessMessage('Review submitted successfully!');
            setRating(0);
            setComment('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Rate & Review</h1>
            <h2 className="text-xl mb-4">{sampleProduct.name}</h2>

            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmitReview} className="mb-6">
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            onClick={() => handleRatingChange(index + 1)}
                            className={`w-8 h-8 cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-400'
                                }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 15l-6.16 3.24 1.18-6.86L0 6.24l6.91-1L10 0l2.09 5.24L20 6.24l-4.82 4.14 1.18 6.86z" />
                        </svg>
                    ))}
                </div>
                <textarea
                    className="textarea w-full border border-gray-300 rounded p-2 mb-4"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows="4"
                ></textarea>
                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>
            </form>

            <h2 className="text-xl mb-4">Previous Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review.id} className="border border-gray-300 p-4 rounded">
                            <div className="flex items-center">
                                <div className="flex">
                                    {[...Array(review.rating)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className="w-5 h-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-6.16 3.24 1.18-6.86L0 6.24l6.91-1L10 0l2.09 5.24L20 6.24l-4.82 4.14 1.18 6.86z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600 text-sm">{review.date}</span>
                            </div>
                            <p className="mt-2">{review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RateAndReview;
