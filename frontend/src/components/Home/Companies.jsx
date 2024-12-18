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
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <ul className="flex flex-wrap justify-center">
          {brands.map((item) => (
            <li key={item.id} className="m-4">
              <div className="biolife-brd-container">
                <a href="#" className="block">
                  <figure>
                    <img src={item.image} width={214} height={163} alt={`Brand ${item.id}`} className="rounded-lg shadow-md" />
                  </figure>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Companies;
