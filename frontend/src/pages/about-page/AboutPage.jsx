import React from 'react';
import bg from '/assets/images/home/biolife-banner__style-01.jpg';
import bn01 from '/assets/images/about-us/bn01.jpg';
import { Testimonial } from '../../components';

const AboutPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative">
                <img src={bg} alt="Background" className="w-full h-[30vh] object-cover" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                    Organic Fruits
                </h1>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center mb-6 space-x-2 text-lg text-fontColor">
                    <a href="/" className="font-medium hover:text-primary transition">Home</a>
                    <span>/</span>
                    <a href="/about" className="font-medium hover:text-primary transition">About Us</a>
                </nav>

                {/* About Us Text */}
                <div className="text-center my-16">
                    <h4 className="text-2xl font-semibold text-fontColor">Welcome to Biolife Store!</h4>
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center">
                        <img src={bn01} alt="About Us" className="w-full md:w-1/2 h-auto rounded-lg shadow-xl" />
                        <div className="md:ml-8 mt-6 md:mt-0 text-left">
                            <p className="text-lg text-gray-700">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </p>
                            <p className="mt-4 text-lg italic text-primary">
                                “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="my-16 text-center">
                    <h4 className="text-2xl font-semibold text-fontColor">Why Choose Us</h4>
                    <p className="mt-4 text-lg text-gray-600">Natural food is taken from the world's most modern farms with strict safety cycles</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h1 className="text-primary text-3xl font-semibold">01</h1>
                            <h2 className="text-lg font-semibold mt-4">Always Fresh</h2>
                            <p className="mt-2 text-gray-700">Natural products are kept in the best condition to ensure always fresh.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h1 className="text-primary text-3xl font-semibold">02</h1>
                            <h2 className="text-lg font-semibold mt-4">Overall Healthy</h2>
                            <p className="mt-2 text-gray-700">Natural products are kept in the best condition to ensure always fresh.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h1 className="text-primary text-3xl font-semibold">03</h1>
                            <h2 className="text-lg font-semibold mt-4">Environmental Safety</h2>
                            <p className="mt-2 text-gray-700">Natural products are kept in the best condition to ensure always fresh.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <Testimonial />
                
            </div>
        </div>
    );
};

export default AboutPage;
