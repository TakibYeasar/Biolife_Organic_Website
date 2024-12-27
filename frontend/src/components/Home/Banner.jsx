import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchBannersQuery } from '../../redux/features/core/coreApi';


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
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-primary">Error: {error.message}</div>;
  }

  return (
    <div className="relative w-full lg:w-9/12 md:w-8/12 mx-auto">
      <AnimatePresence initial={false}>
        {banners.map((item, index) => (
          index === currentIndex && (
            <motion.div
              key={item.id}
              className="relative w-full h-[80vh] bg-cover rounded-lg overflow-hidden"
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              custom={direction}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center text-fontLight bg-black bg-opacity-50">
                <h2 className="text-title-two font-bold">{item.title}</h2>
                <h1 className="text-main-title my-4">{item.subtitle}</h1>
                <p className="mb-6 text-fontLight">{item.desc}</p>
                <div className="flex space-x-4">
                  <a href="#" className="py-2 px-6 bg-primary text-fontLight rounded-full hover:bg-secondary transition duration-300">
                    Shop Now
                  </a>
                  <a href="#" className="py-2 px-6 bg-transparent border-2 border-fontLight text-fontLight rounded-full hover:bg-bgGrey transition duration-300">
                    View Lookbook
                  </a>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Left Arrow Button */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={prevStep} className="p-3 bg-navColor rounded-full text-fontLight hover:bg-bgLight focus:outline-none transition duration-300">
          <FaAngleLeft className="text-2xl" />
        </button>
      </div>

      {/* Right Arrow Button */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={nextStep} className="p-3 bg-navColor rounded-full text-fontLight hover:bg-bgLight focus:outline-none transition duration-300">
          <FaAngleRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
