import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchBannersQuery } from '../../store/features/core/coreApi';

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.6 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

const Banner = () => {
  const { data: banners, error, isLoading } = useFetchBannersQuery();
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

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        {banners.map((item, index) => (
          index === currentIndex && (
            <motion.div
              key={item.id}
              className="absolute top-0 left-0 w-full h-2/3"
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              custom={direction}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full"
              />

              {/* Overlay Content */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent flex justify-center items-center">
                <div className="text-center text-white px-6">
                  <p className="text-white text-lg md:text-6xl font-bold tracking-tight">{item.title}</p>
                  <p className="text-white text-2xl md:text-xl mt-4 max-w-2xl mx-auto">{item.subtitle}</p>
                  <p className="text-white text-lg md:text-xl mt-4 max-w-2xl mx-auto">{item.description}</p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <a
                      href="#"
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition"
                    >
                      Shop Now
                    </a>
                    <a
                      href="#"
                      className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow-md hover:bg-white hover:text-black transition"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevStep}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
        aria-label="Previous Slide"
      >
        <FaAngleLeft className="text-3xl" />
      </button>
      <button
        onClick={nextStep}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
        aria-label="Next Slide"
      >
        <FaAngleRight className="text-3xl" />
      </button>
    </div>
  );
};

export default Banner;
