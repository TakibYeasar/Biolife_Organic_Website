import React, { useState } from 'react';
import { useCreateProductReviewMutation, useUpdateProductReviewMutation } from '../../../redux/features/products/productsApi';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ProdReview = ({ reviews = [], productId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        rating: 0,
    });

    const [createReview] = useCreateProductReviewMutation();
    const [updateReview] = useUpdateProductReviewMutation();

    const handleRating = (value) => {
        setFormData({ ...formData, rating: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = { ...formData, product: productId };

        if (formData.id) {
            updateReview({ id: formData.id, ...reviewData });  // If we are updating a review
        } else {
            createReview(reviewData);  // If we are creating a new review
        }

        // Reset form data after submission
        setFormData({ name: '', email: '', comment: '', rating: 0 });
    };

    // Calculate the average rating if reviews are not empty
    const averageRating = reviews.length > 0 ?
        reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
        : 0;

    return (
        <div className="container mx-auto my-10">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 mb-8 lg:mb-0">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-xl font-bold">
                            <span className="text-yellow-500">{averageRating.toFixed(1)}</span> out of 5
                        </p>
                        <p className="text-gray-500">See all {reviews.length} reviews</p>
                        <ul className="mt-5">
                            {Array.from({ length: 5 }, (_, index) => {
                                const starRating = 5 - index;
                                return (
                                    <Rating key={starRating} starRating={starRating} reviews={reviews} />
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-2/3">
                    <ReviewForm
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleRating={handleRating}
                    />
                </div>
            </div>

            <ReviewList reviews={reviews} />
        </div>
    );
};

export default ProdReview;
