import React, { useState } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaCartArrowDown,
  FaHeart,
  FaLeaf,
  FaStar,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import {
  Shippingfaq,
  ProdReview,
  Relatedprod,
} from "../../../components";
import { useFetchSingleProductQuery } from "../../../store/features/products/productsApi";

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
    <section className="py-12 bg-gray-50 font-sans text-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm breadcrumbs mb-8 text-gray-500">
          <ul className="flex space-x-2">
            <li>
              <a href="/" className="hover:text-green-700 transition-colors">
                Home
              </a>
            </li>
            <span>/</span>
            <li>
              <a
                onClick={navigateToProducts}
                className="hover:text-green-700 cursor-pointer transition-colors"
              >
                Our Products
              </a>
            </li>
            <span>/</span>
            <li className="text-green-700">{product?.title}</li>
          </ul>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <img
                src={product?.main_image}
                alt={product?.title}
                className="rounded-lg w-full h-auto object-cover"
              />
              <div className="flex space-x-4 mt-4 overflow-x-auto">
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
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              {product?.title}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-gray-500">(4.8 / 5.0)</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product?.description}
            </p>
            <div className="text-3xl font-bold text-green-700 mb-6">
              ${product?.price}
              {product?.old_price && (
                <span className="text-red-500 line-through ml-3 text-xl">
                  ${product.old_price}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                <FaLeaf className="mr-2" />
                Eco-Friendly Product
              </span>
              <span className="text-gray-500">In Stock: {product?.stock}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-md border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    onClick={decrementQuantity}
                  >
                    <FaCaretDown />
                  </button>
                  <span className="text-lg w-8 text-center">{quantity}</span>
                  <button
                    className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    onClick={incrementQuantity}
                  >
                    <FaCaretUp />
                  </button>
                </div>
              </div>
              <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-4 flex items-center justify-center">
                <FaCartArrowDown className="mr-2" />
                Add to Cart
              </button>
              <div className="flex space-x-4">
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                  <FaHeart className="mr-2" />
                  Wishlist
                </button>
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-20">
          {/* Information & Reviews Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-md">
            <div className="p-6 border-r border-gray-200">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Shipping & FAQs
              </h3>
              <Shippingfaq faqs={product.additional_info} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Customer Reviews
              </h3>
              <ProdReview reviews={product.reviews} productId={product.id} />
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20 bg-gray-50 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">
              Related Products
            </h3>
            <Relatedprod />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;