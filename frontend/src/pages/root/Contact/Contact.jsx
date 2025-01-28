import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useFetchContactInfoQuery, useCreateContactMutation } from '../../../redux/features/core/coreApi';

const Contact = () => {
  const { data: contactInfo, error, isLoading } = useFetchContactInfoQuery();
  const [createContact] = useCreateContactMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(formData).unwrap();
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="bg-white py-10">
      <div className="bg-primary text-white py-6">
        <h1 className="text-3xl text-center font-bold">Organic Fruits</h1>
      </div>

      <div className="container mx-auto my-8 px-4">
        <div className="breadcrumbs text-sm mb-6">
          <ul className="flex space-x-2">
            <li>
              <a href="/" className="text-primary hover:underline">Home</a>
            </li>
            <li>/</li>
            <li className="text-gray-600">Contact us</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <h4 className="text-2xl font-semibold mb-4">Our Contact</h4>
            <p className="mb-6 text-gray-600">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>

            {contactInfo?.map((item) => (
              <ul key={item.id} className="space-y-4">
                <li className="flex items-center space-x-2 text-gray-700">
                  <strong className="font-semibold">Address:</strong>
                  <span>{item?.address}</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <strong className="font-semibold">Phone:</strong>
                  <span>{item?.phone}</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <strong className="font-semibold">Email:</strong>
                  <span>{item?.email}</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <strong className="font-semibold">Store Open:</strong>
                  <span>{item?.working_hours}</span>
                </li>
              </ul>
            ))}

            <div className="mt-6">
              <h5 className="font-semibold text-gray-700">Follow Us</h5>
              <div className="flex space-x-4 mt-2">
                {contactInfo?.[0]?.twitter_link && (
                  <a href={contactInfo[0].twitter_link} className="text-gray-500 hover:text-primary">
                    <FaTwitter size={24} />
                  </a>
                )}
                {contactInfo?.[0]?.facebook_link && (
                  <a href={contactInfo[0].facebook_link} className="text-gray-500 hover:text-primary">
                    <FaFacebook size={24} />
                  </a>
                )}
                {contactInfo?.[0]?.linkedin_link && (
                  <a href={contactInfo[0].linkedin_link} className="text-gray-500 hover:text-primary">
                    <FaLinkedin size={24} />
                  </a>
                )}
                {contactInfo?.[0]?.youtube_link && (
                  <a href={contactInfo[0].youtube_link} className="text-gray-500 hover:text-primary">
                    <FaYoutube size={24} />
                  </a>
                )}
                {contactInfo?.[0]?.instagram_link && (
                  <a href={contactInfo[0].instagram_link} className="text-gray-500 hover:text-primary">
                    <FaInstagram size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <h4 className="text-2xl font-semibold mb-4">Send Us a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Leave Message"
                  className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows="6"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;