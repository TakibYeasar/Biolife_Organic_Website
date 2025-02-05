import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateFeaturedMutation,
  useUpdateFeaturedMutation,
} from '../../../../store/features/core/coreApi';

const FeaturedItemForm = ({ featuredData, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    subtitle: '',
  });

  const [createFeatured, { isLoading: isCreating }] = useCreateFeaturedMutation();
  const [updateFeatured, { isLoading: isUpdating }] = useUpdateFeaturedMutation();

  useEffect(() => {
    if (featuredData) {
      setFormData({
        image: null,
        title: featuredData.title || '',
        subtitle: featuredData.subtitle || '',
      });
    }
  }, [featuredData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.image) formDataToSend.append('image', formData.image);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subtitle', formData.subtitle);

    try {
      if (featuredData) {
        // Update existing featured item
        await updateFeatured({ id: featuredData.id, body: formDataToSend }).unwrap();
        toast.success('Featured item updated successfully!');
      } else {
        // Create new featured item
        await createFeatured(formDataToSend).unwrap();
        toast.success('Featured item created successfully!');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {featuredData ? 'Update Featured Item' : 'Create Featured Item'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Image */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {isCreating || isUpdating
            ? 'Submitting...'
            : featuredData
              ? 'Update Featured Item'
              : 'Create Featured Item'}
        </button>
      </form>
    </div>
  );
};

export default FeaturedItemForm;
