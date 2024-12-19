import React from 'react';
import {
  Categorylist,
  Banner,
  Features,
  OurProducts,
  Specialoffer,
  Bestsellingprod,
  Discountprod,
  Companies,
  OurArticles,
  FeaturedCategory
} from "../../../components";

const Homepage = () => {
  return (
    <div className="homepage bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="bg-white shadow rounded-lg p-4">
            <Categorylist />
          </div>
          <div className="md:col-span-2 bg-white shadow rounded-lg overflow-hidden">
            <Banner />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-b from-white to-gray-100">
        <Features />
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-12">
        <FeaturedCategory />
      </div>

      {/* Our Products Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <OurProducts />
        </div>
      </div>

      {/* Special Offer Section */}
      <div className="py-12 bg-gray-100">
        <Specialoffer />
      </div>

      {/* Discount and Best Selling Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <Discountprod />
          </div>
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <Bestsellingprod />
          </div>
        </div>
      </div>

      {/* Partner Companies Section */}
      <div className="py-12 bg-gray-50">
        <Companies />
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-12">
        <OurArticles />
      </div>
    </div>
  );
};

export default Homepage;