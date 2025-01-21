import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from '../../../../../redux/features/core/coreApi';

const BrandForm = ({ brandData, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
  });

  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  useEffect(() => {
    if (brandData) {
      setFormData({
        name: brandData.name || '',
        logo: null, // Reset file input as files can't be pre-filled
      });
    }
  }, [brandData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    if (formData.logo) {
      formDataToSubmit.append('logo', formData.logo);
    }

    try {
      if (brandData) {
        // Update existing brand
        await updateBrand({ id: brandData.id, data: formDataToSubmit }).unwrap();
        toast.success('Brand updated successfully.');
      } else {
        // Create new brand
        await createBrand(formDataToSubmit).unwrap();
        toast.success('Brand created successfully.');
      }
      onClose(); // Close the modal after success
    } catch (error) {
      console.error('Failed to save the brand:', error);
      toast.error('Failed to save the brand. Please try again.');
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
        {brandData ? 'Update Brand' : 'Create Brand'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Logo */}
        <div className="mb-6">
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Brand Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleFileChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isCreating || isUpdating ? 'Saving...' : brandData ? 'Update Brand' : 'Create Brand'}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
