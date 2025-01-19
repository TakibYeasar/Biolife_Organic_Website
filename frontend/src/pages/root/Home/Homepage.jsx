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
  FeaturedCategory,
} from '../../../components';

const Homepage = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6">
            <Categorylist />
          </div>
          <div className="md:col-span-2">
            <Banner />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Features />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <FeaturedCategory />
      </section>

      {/* Our Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <OurProducts />
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-12 bg-gray-100">
        <div className="mx-auto">
          <Specialoffer />
        </div>
      </section>

      {/* Discounted and Bestselling Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6">
            <Discountprod />
          </div>
          <div className="lg:col-span-2 p-6">
            <Bestsellingprod />
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Companies />
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-12">
        <OurArticles />
      </section>
    </div>
  );
};

export default Homepage;
