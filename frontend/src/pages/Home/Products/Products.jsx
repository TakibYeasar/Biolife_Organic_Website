import React, { useState } from 'react';
import { FaAngleRight, FaHeart, FaRandom } from 'react-icons/fa';
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import p11 from "/assets/images/products/p-11.jpg";
import { Sortproduct, Sidebar, RecentlyViewed, ProductTags } from '../../../components';

const Products = () => {
  // Dummy data for products
  const [allproducts] = useState([
    {
      id: 1,
      title: 'Fresh Apple',
      main_image: { image: p11 },
      price: '10.00',
      old_price: '15.00',
    },
    {
      id: 2,
      title: 'Organic Banana',
      main_image: { image: p11 },
      price: '8.00',
      old_price: '12.00',
    },
    {
      id: 3,
      title: 'Fresh Mango',
      main_image: { image: p11 },
      price: '12.00',
      old_price: '18.00',
    },
  ]);

  const navigate = (id) => {
    console.log(`Navigating to product with id: ${id}`);
  };

  return (
    <div className="allprod-sec">
      <div className="relative h-72">
        <img src={bg} alt="banner" className="w-full h-full object-cover" />
        <h1 className="absolute text-white text-4xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Organic Fruits</h1>
      </div>

      <div className="container mx-auto my-4">
        <div className="flex items-center text-lg text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">/</span>
          <a href="/allprods" className="hover:text-gray-900">Our Products</a>
        </div>
      </div>

      <div className="container mx-auto flex">
        <div className="w-3/4">
          <Sortproduct />

          <div className="grid grid-cols-1 gap-4">
            {allproducts.map((item, i) => (
              <div key={i} className="bg-white shadow-md p-4 flex">
                <div className="w-1/4">
                  <a href="#" onClick={() => navigate(item.id)}>
                    <img src={item.main_image.image} alt={item.title} className="w-64 h-64 object-cover" />
                  </a>
                </div>
                <div className="w-3/4 pl-4">
                  <p className="text-gray-500">Fresh Fruit</p>
                  <h4 className="text-2xl font-semibold">
                    <a href="#" onClick={() => navigate(item.id)} className="hover:text-gray-700">{item.title}</a>
                  </h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg font-bold text-green-500">£{item.price}</span>
                    <span className="line-through text-red-500">£{item.old_price}</span>
                  </div>
                  <div className="mt-4 space-x-2">
                    <button className="btn btn-outline btn-accent"><FaHeart /></button>
                    <button className="btn btn-primary">Add to Cart</button>
                    <button className="btn btn-outline btn-secondary"><FaRandom /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <ul className="pagination">
              <li className="btn btn-sm btn-outline">1</li>
              <li className="btn btn-sm btn-outline">2</li>
              <li className="btn btn-sm btn-outline">3</li>
              <li className="btn btn-sm btn-outline">
                <FaAngleRight />
              </li>
            </ul>
          </div>
        </div>

        <aside className="w-1/4 ml-4">
          <Sidebar />
          <RecentlyViewed />
          <ProductTags />
        </aside>
      </div>
    </div>
  );
};

export default Products;
