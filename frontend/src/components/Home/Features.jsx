import React from 'react';
import { FaBeer, FaCalendarAlt, FaCarAlt } from 'react-icons/fa';

// Dummy data for featured items
const featureds = [
  {
    id: 1,
    title: 'Feature One',
    subtitle: 'Description for feature one',
    image: 'https://via.placeholder.com/193x185?text=Feature+One',
  },
  {
    id: 2,
    title: 'Feature Two',
    subtitle: 'Description for feature two',
    image: 'https://via.placeholder.com/193x185?text=Feature+Two',
  },
  {
    id: 3,
    title: 'Feature Three',
    subtitle: 'Description for feature three',
    image: 'https://via.placeholder.com/193x185?text=Feature+Three',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featureds.map((item) => (
            <li key={item.id} className="relative">
              <div className="overflow-hidden rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105">
                <a href="#" className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform transform hover:scale-110"
                  />
                </a>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40 text-white px-4 py-8">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm mt-2">{item.subtitle}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <ul className="flex justify-around border-2 border-gray-300 rounded-lg py-6 px-8 bg-white shadow-md">
            <li>
              <div className="flex items-center space-x-4">
                <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  1
                </span>
                <FaBeer className="text-2xl" />
                <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                  Full Stamped Product
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-4">
                <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  2
                </span>
                <FaCalendarAlt className="text-2xl" />
                <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                  Place and Delivery on Time
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-4">
                <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  3
                </span>
                <FaCarAlt className="text-2xl" />
                <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                  Free Shipping in the City
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
