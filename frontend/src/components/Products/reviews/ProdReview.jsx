import React, { useState } from 'react';
import {
    useCreateProductReviewMutation,
    useUpdateProductReviewMutation,
    useDeleteProductReviewMutation,
} from '../../../redux/features/products/productsApi';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ProdReview = ({ reviews = [], productId }) => {
    const [editReviewId, setEditReviewId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        rating: 0,
    });

    const [createReview] = useCreateProductReviewMutation();
    const [updateReview] = useUpdateProductReviewMutation();
    const [deleteReview] = useDeleteProductReviewMutation();

    const handleRating = (value) => {
        setFormData((prev) => ({ ...prev, rating: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productId) {
            console.error('Product ID is missing.');
            return;
        }

        const payload = {
            ...formData,
            product: productId,
        };

        try {
            if (editReviewId) {
                await updateReview({ reviewId: editReviewId, data: payload }).unwrap();
                setEditReviewId(null);
            } else {
                await createReview({ productId, data: payload }).unwrap();
            }

            setFormData({ name: '', email: '', comment: '', rating: 0 });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleEditReview = (review) => {
        setEditReviewId(review.id);
        setFormData({
            name: review.name,
            email: review.email,
            comment: review.comment,
            rating: review.rate,
        });
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReview(reviewId).unwrap();
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((total, review) => total + review.rate, 0) / reviews.length
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
                            {Array.from({ length: 5 }, (_, index) => (
                                <Rating
                                    key={5 - index}
                                    starRating={5 - index}
                                    reviews={reviews}
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-2/3">
                    <ReviewForm
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleRating={handleRating}
                        isEditing={!!editReviewId}
                    />
                </div>
            </div>

            <ReviewList
                reviews={reviews}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
            />
        </div>
    );
};

export default ProdReview;
