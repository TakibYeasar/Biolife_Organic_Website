import React from 'react';

const Specialoffer = () => {
  return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* Left Section: Offer Details */}
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Special Discount
            </h2>
            <p className="text-lg text-gray-600">
              For all fruit products
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-gray-800 text-xl font-semibold">
              <div className="text-center">
                <span className="block text-4xl text-gray-900">00</span>
                <span>Days</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl text-gray-900">00</span>
                <span>Hours</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl text-gray-900">00</span>
                <span>Mins</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl text-gray-900">00</span>
                <span>Secs</span>
              </div>
            </div>
            <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              See Offer Now
            </button>
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center">
            <img
              src="/path/to/your/image.jpg"
              alt="Special Offer"
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
  );
};

export default Specialoffer;
