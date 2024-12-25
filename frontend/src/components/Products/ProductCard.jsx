import React from 'react';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
    const navigate = useNavigate();

    const proddetails = () => {
        navigate(`/product/${item.id}`);
    };

    return (
        <div className="group w-64 bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="relative">
                <a href="#" className="block" onClick={proddetails}>
                    <img
                        src={item?.main_image?.image}
                        alt={item?.title}
                        className="h-64 w-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                    />
                </a>
            </div>
            <div className="p-4 text-center">
                <p className="text-sm text-gray-500">{item?.category}</p>
                <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
                    <a
                        href="#"
                        className="hover:text-primary transition duration-300"
                        onClick={proddetails}
                    >
                        {item?.title}
                    </a>
                </h4>
                <div className="flex justify-center items-baseline my-2">
                    <ins className="text-lg font-bold text-gray-800">£{item?.price}</ins>
                    {item?.old_price && (
                        <del className="text-sm line-through text-gray-500 ml-2">£{item?.old_price}</del>
                    )}
                </div>
                <div className="hidden group-hover:block mt-4">
                    <p className="text-sm text-gray-600">{item?.description}</p>
                    <div className="flex justify-center space-x-2 mt-4">
                        <button className="px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300">
                            <FaHeart className="text-xl" />
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition duration-300">
                            Add to Cart
                        </button>
                        <button className="px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300" onClick={proddetails}>
                            <FaEye className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
