import React, { useState } from 'react';
import { FaAngleRight, FaHeart, FaRandom } from 'react-icons/fa';
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import { Sortproduct, Sidebar, RecentlyViewed, ProductTags, ProductCard } from '../../../components';
import { useFetchAllProductsQuery } from '../../../redux/features/products/productsApi';

const Products = () => {
  const { data: allproducts, error, isLoading } = useFetchAllProductsQuery();

  const navigate = (id) => {
    console.log(`Navigating to product with id: ${id}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-primary">Error: {error.message}</div>;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-72">
        <img src={bg} alt="banner" className="w-full h-full object-cover" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
          Organic Fruits
        </h1>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto my-4">
        <div className="flex items-center text-lg text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">/</span>
          <a href="/allprods" className="hover:text-gray-900">Our Products</a>
        </div>
      </div>

      <div className="container mx-auto flex space-x-4">
        {/* Main Content */}
        <div className="w-3/4">
          {/* Sorting Product */}
          <Sortproduct />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {allproducts.map((item, i) => (
              <div key={item.i} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                <ProductCard item={item} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <ul className="pagination flex space-x-2">
              <li className="btn btn-sm btn-outline">1</li>
              <li className="btn btn-sm btn-outline">2</li>
              <li className="btn btn-sm btn-outline">3</li>
              <li className="btn btn-sm btn-outline">
                <FaAngleRight />
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-1/4">
          <Sidebar />
          <RecentlyViewed />
          <ProductTags />
        </aside>
      </div>
    </div>
  );
};

export default Products;
