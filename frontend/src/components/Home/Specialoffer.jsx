import React, { useEffect, useState } from 'react';
import { useFetchSpecialOfferQuery } from '../../redux/features/products/productsApi';

const Specialoffer = () => {
  const { data: specialOffer, isLoading, isError } = useFetchSpecialOfferQuery();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (specialOffer && specialOffer[0]?.end_date) {
      const endTime = new Date(specialOffer[0].end_date).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      const timer = setInterval(updateCountdown, 1000);

      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [specialOffer]);

  if (isLoading) {
    return <div className="text-center">Loading special offers...</div>;
  }

  if (isError || !specialOffer) {
    return <div className="text-center text-red-600">Failed to load special offers.</div>;
  }

  const {
    discount,
    category: { name, image },
  } = specialOffer[0];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Left Section: Offer Details */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Special Discount: {discount}%
          </h2>
          <p className="text-lg text-gray-600">For all {name} products</p>
          <div className="flex justify-center md:justify-start gap-4 text-gray-800 text-xl font-semibold">
            <div className="text-center">
              <span className="block text-4xl text-gray-900">{timeLeft.days}</span>
              <span>Days</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl text-gray-900">{timeLeft.hours}</span>
              <span>Hours</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl text-gray-900">{timeLeft.minutes}</span>
              <span>Mins</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl text-gray-900">{timeLeft.seconds}</span>
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
            src={image}
            alt={`${name} Offer`}
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Specialoffer;
