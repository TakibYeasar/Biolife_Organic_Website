import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import bg from '/assets/images/home/biolife-banner__style-01.jpg';
import bn01 from '/assets/images/about-us/bn01.jpg';
import bn04 from '/assets/images/about-us/bn04.jpg';
import author01 from '/assets/images/about-us/author-01.png';
import author02 from '/assets/images/about-us/author-02.png';
import author03 from '/assets/images/about-us/author-03.png';
import quotes from '/assets/images/about-us/double-quotes.png';

const About = () => {
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
        <div className="aboutus-sec">
            <div className="relative">
                <img src={bg} alt="" className="w-full h-[30vh] object-cover" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                    Organic Fruits
                </h1>
            </div>

            <div className="container mx-auto p-4">
                <nav className="flex items-center mb-4">
                    <a href="/" className="text-lg font-medium text-gray-700">Home</a>
                    <span className="mx-2 text-lg text-gray-700">/</span>
                    <a href="/about" className="text-lg font-medium text-gray-700">About us</a>
                </nav>

                <div className="text-center my-16">
                    <h4 className="text-2xl font-semibold">Welcome to Biolife store!</h4>
                    <div className="flex flex-col md:flex-row md:justify-center md:items-center mt-8">
                        <img src={bn01} alt="" className="w-full md:w-1/2 h-auto" />
                        <div className="md:ml-8 text-left">
                            <p className="mt-4">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </p>
                            <p className="mt-4 text-lg italic text-primary">
                                “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”
                            </p>
                        </div>
                    </div>
                </div>

                <div className="my-16">
                    <h4 className="text-2xl font-semibold text-center">Why Choose us</h4>
                    <p className="text-center text-lg text-gray-600">Natural food is taken from the world's most modern farms with strict safety cycles</p>
                    <div className="flex flex-col md:flex-row justify-between mt-8">
                        <div className="md:w-1/3">
                            <ul className="space-y-4">
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">01</h1>
                                    <h2 className="text-lg font-semibold">Always Fresh</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">02</h1>
                                    <h2 className="text-lg font-semibold">Overall Healthy</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">03</h1>
                                    <h2 className="text-lg font-semibold">Environmental Safety</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/3">
                            <img src={bn04} alt="" className="w-full h-auto rounded-lg shadow" />
                        </div>
                        <div className="md:w-1/3">
                            <ul className="space-y-4">
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">04</h1>
                                    <h2 className="text-lg font-semibold">Antioxidant Capacity</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">05</h1>
                                    <h2 className="text-lg font-semibold">Good For Arteries</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow">
                                    <h1 className="text-primary text-2xl">06</h1>
                                    <h2 className="text-lg font-semibold">Quality Standards</h2>
                                    <p>Natural products are kept in the best condition to ensure always fresh.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="my-16">
                    <div className="flex items-center justify-center">
                        <FaStar className="text-primary" />
                        <FaStar className="text-primary" />
                        <FaStar className="text-primary" />
                        <h4 className="text-2xl font-semibold mx-4">Testimonial</h4>
                        <FaStar className="text-primary" />
                        <FaStar className="text-primary" />
                        <FaStar className="text-primary" />
                    </div>

                    <div className="flex overflow-x-auto mt-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex-none w-80 mx-2">
                                <div className="text-center">
                                    <div className="relative">
                                        <img src={testimonial.img} alt="" className="mx-auto rounded-full w-24 h-24" />
                                        <img src={quotes} alt="" className="absolute top-0 left-0 w-8 h-8" />
                                    </div>
                                    <p className="mt-4">{testimonial.text}</p>
                                    <div className="mt-4 text-center">
                                        <b className="text-lg">{testimonial.name}</b><br />
                                        <b className="text-sm text-gray-600">{testimonial.title}</b>
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
            </div>
        </div>
    );
}

export default About;
