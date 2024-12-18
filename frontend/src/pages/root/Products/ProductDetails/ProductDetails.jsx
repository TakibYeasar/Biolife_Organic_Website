import React, { useState } from 'react';
import { FaAngleRight, FaCaretDown, FaCaretUp, FaCartArrowDown, FaHeart, FaPlus, FaShareAlt, FaStar, FaStarHalf } from 'react-icons/fa';
import { Shippingfaq, ProdReview, Relatedprod } from '../../../../components';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    title: "Organic Fruit",
    description: "This is a high-quality organic fruit.",
    price: 15.99,
    old_price: 19.99,
    color: "Red",
    size: "Large",
    main_image: { image: "https://via.placeholder.com/500" },
    images: [{ image: "https://via.placeholder.com/500" }],
    rating: 4.5,
  };

  const incrementQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Our Products</a></li>
            <li>{product.title}</li>
          </ul>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <img src={product.main_image.image} alt={product.title} className="rounded-lg w-full" />
            <div className="flex space-x-4 mt-4">
              {product.images.map((item, i) => (
                <img key={i} src={item.image} alt={`Product Image ${i}`} className="w-1/4 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <div className="flex items-center mb-4">
              <div className="flex space-x-1 text-yellow-500">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <FaStarHalf />
              </div>
              <span className="ml-2 text-sm text-gray-500">(4.5 Rating)</span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="text-lg mb-4">
              <span className="font-bold text-2xl text-green-600">${product.price}</span>
              <span className="ml-2 line-through text-red-500">${product.old_price}</span>
            </div>
            <p className="text-sm text-gray-500">Color: {product.color}</p>
            <p className="text-sm text-gray-500">Size: {product.size}</p>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-circle" onClick={decrementQuantity}>
                    <FaCaretDown />
                  </button>
                  <span>{quantity}</span>
                  <button className="btn btn-circle" onClick={incrementQuantity}>
                    <FaCaretUp />
                  </button>
                </div>
              </div>
              <button className="btn btn-primary w-full mb-4">Add to Cart <FaCartArrowDown className="ml-2" /></button>
              <div className="flex justify-between">
                <button className="btn btn-outline">Wishlist <FaHeart className="ml-2" /></button>
                <button className="btn btn-outline">Compare <FaPlus className="ml-2" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8">
          <div className="tabs">
            <a className="tab tab-bordered tab-active">Description</a>
            <a className="tab tab-bordered">Additional Information</a>
            <a className="tab tab-bordered">Shipping & Delivery</a>
            <a className="tab tab-bordered">Customer Reviews</a>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>

        {/* Shipping FAQ and Customer Review */}
        <Shippingfaq />
        <ProdReview />
        <Relatedprod />
      </div>
    </section>
  );
};

export default ProductDetails;
