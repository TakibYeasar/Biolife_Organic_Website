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
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dummySpecialOffers.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg flex flex-col p-6">
              <div className="text-center mb-6">
                <span className="text-xl font-semibold text-blue-600">{item.title}</span>
                <br />
                <b className="text-2xl font-bold">{item.subtitle}</b>
                <div className="mt-4">
                  <p className="text-gray-600">Limited time only!</p>
                </div>
                <div className="mt-6">
                  <a href="#" className="btn btn-primary">See Offer Now!</a>
                </div>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <a href="#" className="block">
                  <img src={item.image} alt="Special Offer" className="w-full h-auto rounded-lg" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Specialoffer;
