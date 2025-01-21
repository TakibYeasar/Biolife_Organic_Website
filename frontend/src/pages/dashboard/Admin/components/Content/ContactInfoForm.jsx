import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateContactInfoMutation,
  useUpdateContactInfoMutation,
} from '../../../../../redux/features/core/coreApi';

const ContactInfoForm = ({ contactData, onClose }) => {
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    working_hours: '',
    facebook_link: '',
    twitter_link: '',
    instagram_link: '',
    youtube_link: '',
    linkedin_link: '',
  });

  const [createContactInfo, { isLoading: isCreating }] = useCreateContactInfoMutation();
  const [updateContactInfo, { isLoading: isUpdating }] = useUpdateContactInfoMutation();

  useEffect(() => {
    if (contactData) {
      setFormData({
        address: contactData.address || '',
        phone: contactData.phone || '',
        email: contactData.email || '',
        working_hours: contactData.working_hours || '',
        facebook_link: contactData.facebook_link || '',
        twitter_link: contactData.twitter_link || '',
        instagram_link: contactData.instagram_link || '',
        youtube_link: contactData.youtube_link || '',
        linkedin_link: contactData.linkedin_link || '',
      });
    }
  }, [contactData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (contactData) {
        // Update contact information
        await updateContactInfo({ id: contactData.id, ...formData }).unwrap();
        toast.success('Contact information updated successfully!');
      } else {
        // Create new contact information
        await createContactInfo(formData).unwrap();
        toast.success('Contact information created successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.data?.message || 'An error occurred. Please try again.');
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
        {contactData ? 'Update Contact Information' : 'Create Contact Information'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Address */}
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Working Hours */}
        <div className="mb-6">
          <label htmlFor="working_hours" className="block text-sm font-medium text-gray-700">
            Working Hours
          </label>
          <input
            type="text"
            id="working_hours"
            name="working_hours"
            value={formData.working_hours}
            onChange={handleChange}
            className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Social Links */}
        {['facebook_link', 'twitter_link', 'instagram_link', 'youtube_link', 'linkedin_link'].map((field) => (
          <div key={field} className="mb-6">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field.replace('_', ' ').replace('link', 'Link').replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <input
              type="url"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {contactData ? 'Update Information' : 'Create Information'}
        </button>
      </form>
    </div>
  );
};

export default ContactInfoForm;
