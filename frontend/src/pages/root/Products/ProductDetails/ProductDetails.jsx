import React, { useState } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaCartArrowDown,
  FaHeart,
  FaLeaf,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import {
  Shippingfaq,
  ProdReview,
  Relatedprod,
} from "../../../../components";
import { useFetchSingleProductQuery } from "../../../../redux/features/products/productsApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: product, error, isLoading } = useFetchSingleProductQuery(id);

  const incrementQuantity = () => setQuantity((prevQty) => prevQty + 1);
  const decrementQuantity = () =>
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  const navigateToProducts = () => navigate("/products");

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-50 font-serif text-gray-800">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm breadcrumbs mb-6 text-gray-500">
          <ul className="flex space-x-2">
            <li>
              <a href="/" className="hover:text-green-700">
                Home
              </a>
            </li>
            <span>/</span>
            <li>
              <a
                onClick={navigateToProducts}
                className="hover:text-green-700 cursor-pointer"
              >
                Our Products
              </a>
            </li>
            <span>/</span>
            <li>{product?.title}</li>
          </ul>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="relative">
            <img
              src={product?.main_image}
              alt={product?.title}
              className="rounded-lg w-full bg-white shadow-lg object-cover border border-green-200"
            />
            <div className="flex space-x-4 mt-4">
              {product?.images?.map((item, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt={`Product Image ${i}`}
                  className="w-16 h-16 rounded-lg border border-green-200 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              {product?.title}
            </h2>
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <div className="text-2xl font-bold text-green-600">
              ${product?.price}
              {product?.old_price && (
                <span className="text-red-500 line-through ml-2">
                  ${product.old_price}
                </span>
              )}
            </div>
            <div className="mt-4">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                <FaLeaf className="inline mr-1" />
                Eco-Friendly Product
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  onClick={decrementQuantity}
                >
                  <FaCaretDown />
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  onClick={incrementQuantity}
                >
                  <FaCaretUp />
                </button>
              </div>
            </div>
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4">
              Add to Cart <FaCartArrowDown className="ml-2 inline" />
            </button>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Wishlist <FaHeart className="ml-2 inline" />
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12">
          <Shippingfaq faqs={product.additional_info} />
          <ProdReview reviews={product.reviews} productId={product.id} />
          <Relatedprod />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
