import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import author01 from '/assets/images/about-us/author-01.png';
import author02 from '/assets/images/about-us/author-02.png';
import author03 from '/assets/images/about-us/author-03.png';
import quotes from '/assets/images/about-us/double-quotes.png';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Ms. Jay Doe',
      title: 'Sales Manager',
      text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...',
      img: author01,
    },
    {
      name: 'Mr. Braun',
      title: 'Sales Manager',
      text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text...',
      img: author02,
    },
    {
      name: 'Ms. Danien',
      title: 'Sales Manager',
      text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...',
      img: author03,
    },
  ];
  return (
    <div className="my-16">
      <div className="flex justify-center items-center mb-8">
        <FaStar className="text-primary" />
        <FaStar className="text-primary" />
        <FaStar className="text-primary" />
        <h4 className="text-2xl font-semibold mx-4 text-fontColor">What Our Clients Say</h4>
        <FaStar className="text-primary" />
        <FaStar className="text-primary" />
        <FaStar className="text-primary" />
      </div>

      <div className="flex overflow-x-auto space-x-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex-none w-80 mx-2">
            <div className="text-center">
              <div className="relative">
                <img src={testimonial.img} alt={testimonial.name} className="mx-auto rounded-full w-24 h-24" />
                <img src={quotes} alt="Quote" className="absolute top-0 left-0 w-8 h-8" />
              </div>
              <p className="mt-4 text-lg text-gray-700">{testimonial.text}</p>
              <div className="mt-6 text-center">
                <p className="font-semibold text-xl">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                <div className="flex justify-center mt-2">
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStarHalf className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial