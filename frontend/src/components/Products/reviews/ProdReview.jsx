import React, { useState, useEffect } from 'react';
import { useCreateProductReviewMutation, useUpdateProductReviewMutation, useDeleteProductReviewMutation } from '../../../store/features/products/productsApi';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ProdReview = ({ productId, reviews = [] }) => {
    const [editReviewId, setEditReviewId] = useState(null);
    const [formData, setFormData] = useState({
        rate: 0,
        name: '',
        email: '',
        comment: ''
    });

    const [createReview, { isLoading: isCreatingReview }] = useCreateProductReviewMutation();
    const [updateReview, { isLoading: isUpdatingReview }] = useUpdateProductReviewMutation();
    const [deleteReview, { isLoading: isDeletingReview }] = useDeleteProductReviewMutation();

    const handleCreateReview = async () => {
        try {
            await createReview({ productId, data: formData }).unwrap();
            setFormData({ rate: 0, name: '', email: '', comment: '' }); // Reset form after submit
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    const handleEditSubmit = async () => {
        try {
            await updateReview({ reviewId: editReviewId, data: formData }).unwrap();
            setEditReviewId(null); // Reset after edit
            setFormData({ rate: 0, name: '', email: '', comment: '' }); // Reset form after update
        } catch (error) {
            console.error('Error updating review:', error);
        }
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

    const handleEditReview = (review) => {
        setEditReviewId(review.id);
        setFormData({
            rate: review.rate,
            name: review.name,
            email: review.email,
            comment: review.comment
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFormData((prevData) => ({
            ...prevData,
            rate: rating
        }));
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((total, review) => total + review.rate, 0) / reviews.length
        : 0;

    return (
        <div className="space-y-8">
            <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-2xl font-bold">Product Reviews</h3>
                <p className="text-xl font-semibold">
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

            {/* Review Form */}
            <ReviewForm
                formData={formData}
                handleFormChange={handleFormChange}
                handleRatingChange={handleRatingChange}  // Ensure this is passed as a prop
                isEditing={!!editReviewId}
                onSubmit={() =>
                    editReviewId ? handleEditSubmit() : handleCreateReview()
                }
                isLoading={isCreatingReview || isUpdatingReview}
            />

            {/* Review List */}
            <ReviewList
                reviews={reviews}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
                isDeleting={isDeletingReview}
            />
        </div>
    );
};

export default ProdReview;
