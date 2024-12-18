import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Dummy banner data
const banners = [
  {
    id: 1,
    image: "https://via.placeholder.com/800x600?text=Banner+1",
    title: "Summer Collection",
    subtitle: "Discover the new trends",
    desc: "Explore our summer collection and find the perfect outfits for your adventures.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/800x600?text=Banner+2",
    title: "Winter Sale",
    subtitle: "Up to 50% Off",
    desc: "Don't miss our winter sale on your favorite items. Limited time offer!",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/800x600?text=Banner+3",
    title: "New Arrivals",
    subtitle: "Check Out What's New",
    desc: "Be the first to explore our latest arrivals and elevate your wardrobe.",
  },
];

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeIn" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

const Banner = () => {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStep = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full lg:w-9/12 md:w-8/12 mx-auto">
      <AnimatePresence initial={false}>
        {banners.map((item, index) => (
          index === currentIndex && (
            <motion.div
              key={item.id}
              className="relative w-full h-[80vh] bg-cover"
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              custom={direction}
            >
              <img src={item.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 p-8 h-full flex flex-col justify-center text-white bg-black bg-opacity-50">
                <h2 className="text-3xl font-bold">{item.title}</h2>
                <h1 className="text-5xl my-4">{item.subtitle}</h1>
                <p className="mb-4">{item.desc}</p>
                <div className="flex space-x-4">
                  <a href="#" className="btn btn-primary">Shop Now</a>
                  <a href="#" className="btn btn-outline">View Lookbook</a>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={prevStep} className="p-2 bg-gray-700 rounded-full text-white">
          <FaAngleLeft className='text-2xl' />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={nextStep} className="p-2 bg-gray-700 rounded-full text-white">
          <FaAngleRight className='text-2xl' />
        </button>
      </div>
    </div>
  );
}

export default Banner;
