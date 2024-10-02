import React from 'react';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Example usage with dummy data
const dummyProduct = {
    id: 1,
    title: "Sample Product",
    category: "Category Name",
    price: "19.99",
    old_price: "29.99",
    description: "This is a sample product description.",
    main_image: {
        image: "https://via.placeholder.com/270"
    }
};


const ProductCard = ({ item }) => {
    const navigate = useNavigate();

    const proddetails = () => {
        navigate(`/productview/${item.id}`);
    };

    return (
        <div className="group w-64 p-4 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out hover:shadow-xl">
            <div className="relative">
                <a href="#" className="block" onClick={proddetails}>
                    <img
                        src={item?.main_image?.image}
                        alt={item?.title}
                        className="h-64 w-full object-cover rounded-t-lg"
                    />
                </a>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-500">{item?.category}</p>
                <h4 className="text-lg font-semibold">
                    <a
                        href="#"
                        className="text-gray-800 hover:text-blue-500"
                        onClick={proddetails}
                    >
                        {item?.title}
                    </a>
                </h4>
                <div className="flex justify-center items-baseline my-2">
                    <ins className="text-lg font-bold text-gray-800">
                        £{item?.price}
                    </ins>
                    {item?.old_price && (
                        <del className="text-sm line-through text-gray-500 ml-2">
                            £{item?.old_price}
                        </del>
                    )}
                </div>
                <div className="hidden group-hover:block">
                    <p className="text-sm text-gray-600">{item?.description}</p>
                    <div className="flex justify-center space-x-2 mt-2">
                        <button className="btn btn-sm">
                            <FaHeart className="text-xl" />
                        </button>
                        <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                            Add to Cart
                        </button>
                        <button className="btn btn-sm" onClick={proddetails}>
                            <FaEye className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;