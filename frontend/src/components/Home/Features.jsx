import React from 'react';

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
    <section className="py-16">
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

        
      </div>
    </section>
  );
};

export default Features;
