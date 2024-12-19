import React from 'react';

// Dummy data for brands
const brands = [
  { id: 1, image: 'https://via.placeholder.com/214x163?text=Brand+1' },
  { id: 2, image: 'https://via.placeholder.com/214x163?text=Brand+2' },
  { id: 3, image: 'https://via.placeholder.com/214x163?text=Brand+3' },
  { id: 4, image: 'https://via.placeholder.com/214x163?text=Brand+4' },
  { id: 5, image: 'https://via.placeholder.com/214x163?text=Brand+5' },
];

const Companies = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <ul className="flex flex-wrap justify-center gap-8">
          {brands.map((item) => (
            <li key={item.id} className="w-full sm:w-1/2 lg:w-1/5">
              <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <a href="#" className="block">
                  <figure className="flex justify-center">
                    <img
                      src={item.image}
                      alt={`Brand ${item.id}`}
                      className="rounded-lg shadow-md w-full h-auto object-contain"
                    />
                  </figure>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Companies;
