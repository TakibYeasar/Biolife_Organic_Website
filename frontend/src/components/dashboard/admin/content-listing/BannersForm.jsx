import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from '../../../../store/features/core/coreApi';

const BannersForm = ({ bannerData, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    subtitle: '',
    description: '',
  });

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

  useEffect(() => {
    if (bannerData) {
      setFormData({
        image: null, // Image won't be pre-filled
        title: bannerData.title || '',
        subtitle: bannerData.subtitle || '',
        description: bannerData.description || '',
      });
    }
  }, [bannerData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      if (bannerData) {
        // Update banner logic
        await updateBanner({ id: bannerData.id, data: formDataToSubmit }).unwrap();
        toast.success('Banner updated successfully!');
      } else {
        // Create banner logic
        await createBanner(formDataToSubmit).unwrap();
        toast.success('Banner created successfully!');
      }
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong!');
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {bannerData ? 'Update Banner' : 'Create Banner'}
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

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isCreating || isUpdating
            ? `${bannerData ? 'Updating...' : 'Creating...'}`
            : `${bannerData ? 'Update Banner' : 'Create Banner'}`}
        </button>
      </form>
    </div>
  );
};

export default BannersForm;
