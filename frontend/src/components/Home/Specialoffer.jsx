import React from 'react';

// Dummy data for special offers
const dummySpecialOffers = [
  {
    title: "Limited Time Offer!",
    subtitle: "50% Off on All Items",
    image: "https://via.placeholder.com/780x450", // Replace with your image URL
  },
  {
    title: "Spring Sale!",
    subtitle: "30% Off on Selected Items",
    image: "https://via.placeholder.com/780x450", // Replace with your image URL
  },
  {
    title: "Clearance Sale!",
    subtitle: "Up to 70% Off",
    image: "https://via.placeholder.com/780x450", // Replace with your image URL
  },
];

const Specialoffer = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dummySpecialOffers.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
              {/* Offer Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <span className="text-xl font-semibold text-primary">{item.title}</span>
                <h3 className="text-2xl font-extrabold text-gray-800 mt-2">{item.subtitle}</h3>
                <p className="text-gray-500 mt-4">Limited time only!</p>

                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-block bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-200"
                  >
                    See Offer Now!
                  </a>
                </div>
              </div>

              {/* Offer Image */}
              <div className="relative group-hover:scale-105 transition-transform duration-300 ease-in-out">
                <a href="#">
                  <img
                    src={item.image}
                    alt="Special Offer"
                    className="w-full h-64 object-cover rounded-b-xl"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialoffer;
