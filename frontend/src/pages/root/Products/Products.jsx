import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import { Sortproduct, Sidebar, ProductTags, ProductCard } from '../../../components';
import { useFetchAllProductsQuery } from '../../../redux/features/products/productsApi';

const Products = () => {
  const { data: allproducts, error, isLoading } = useFetchAllProductsQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-80 mb-8">
        <img src={bg} alt="banner" className="w-full h-full object-cover rounded-lg shadow-md" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white text-shadow">
          Organic Fruits
        </h1>
      </div>

      {/* Breadcrumbs */}
      <nav className="container mx-auto text-lg text-gray-600 mb-8">
        <a href="/" className="hover:text-gray-900">Home</a>
        <span className="mx-2">/</span>
        <a href="/allprods" className="hover:text-gray-900">Our Products</a>
      </nav>

      <div className="container mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-8">

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allproducts.map((item) => (
              <div key={item.id} className="flex-none w-1/3 sm:w-1/4 md:w-1/5">
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
        </main>

        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-8">
          <div className="sticky top-24">
            {/* Sorting Product */}
            <Sortproduct />
            <Sidebar />
            <ProductTags />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Products;
