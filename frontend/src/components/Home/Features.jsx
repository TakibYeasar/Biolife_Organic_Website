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
    <div className="py-8">
      <div className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureds.map((item) => (
            <li className="featured_item relative" key={item.id}>
              <div className="banner-contain overflow-hidden rounded-lg shadow-md">
                <a href="#" className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="text-content absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40 text-white">
                  <span className="title text-lg font-normal">{item.title}</span>
                  <b className="subtitle text-lg font-bold uppercase">{item.subtitle}</b>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ul className="flex justify-around border-2 border-gray-300 rounded-lg p-4">
            <li>
              <div className="service-inner flex items-center">
                <span className="number bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  1
                </span>
                <FaBeer className="text-2xl" />
                <a className="srv-name ml-2 text-lg font-bold uppercase hover:text-primary" href="#">
                  full stamped product
                </a>
              </div>
            </li>
            <li>
              <div className="service-inner flex items-center">
                <span className="number bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  2
                </span>
                <FaCalendarAlt className="text-2xl" />
                <a className="srv-name ml-2 text-lg font-bold uppercase hover:text-primary" href="#">
                  place and delivery on time
                </a>
              </div>
            </li>
            <li>
              <div className="service-inner flex items-center">
                <span className="number bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  3
                </span>
                <FaCarAlt className="text-2xl" />
                <a className="srv-name ml-2 text-lg font-bold uppercase hover:text-primary" href="#">
                  Free shipping in the city
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
