import React from 'react';
import {
  CategorySection,
  Banner,
  Features,
  OurProducts,
  Specialoffer,
  Bestsellingprod,
  Discountprod,
  Companies,
  OurArticles,
  FeaturedCategory,
} from '../../components';

const Homepage = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 md:col-span-1">
            <CategorySection />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Banner />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
          <Features />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <FeaturedCategory />
      </section>

      {/* Our Products Section */}
      <section className="container mx-auto px-4">
          <OurProducts />
      </section>

      {/* Special Offer Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4">
          <Specialoffer />
        </div>
      </section>

      {/* Discounted and Bestselling Products */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-12">
          <div className="md:col-span-1 lg:col-span-1">
            <Discountprod />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <Bestsellingprod />
          </div>
      </section>

      {/* Partner Companies */}
      <section className="container mx-auto px-4">
          <Companies />
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-12">
        <OurArticles />
      </section>
    </div>
  );
};

export default Homepage;
