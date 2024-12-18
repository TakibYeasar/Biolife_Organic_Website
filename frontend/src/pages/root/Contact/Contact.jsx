import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  // Dummy data
  const contactInfo = {
    address: '7563 St. Vicent Place, Glasgow, Greater Newyork NH7689, UK',
    phone: '(800) 123 456789',
    email: 'organic@example.com',
    storeOpen: '8am - 08pm, Mon - Sat',
  };

  return (
    <section className="py-10">
      <div className="bg-primary text-white py-6">
        <h1 className="text-3xl text-center font-bold">Organic Fruits</h1>
      </div>

      <div className="container mx-auto my-8">
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
          {/* Contact Information Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h4 className="text-2xl font-semibold mb-4">Our Contact</h4>
            <p className="mb-6">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <strong className="font-semibold">Address:</strong>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <strong className="font-semibold">Phone:</strong>
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <strong className="font-semibold">Email:</strong>
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <strong className="font-semibold">Store Open:</strong>
                <span>{contactInfo.storeOpen}</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-semibold">Follow Us</h5>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FaPinterest size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FaYoutube size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h4 className="text-2xl font-semibold mb-4">Send Us a Message</h4>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input type="tel" placeholder="Phone Number" className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Leave Message</span>
                </label>
                <textarea
                  placeholder="Leave Message"
                  className="textarea textarea-bordered w-full"
                  rows="6"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
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
