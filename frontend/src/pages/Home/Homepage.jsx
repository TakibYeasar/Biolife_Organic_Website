import React from 'react';
import { Categorylist, Banner, Features, OurProducts, Specialoffer, Bestsellingprod, Discountprod, Companies, OurArticles, FeaturedCategory } from "../../components";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <Categorylist />
          </div>
          <div className="col-span-2">
            <Banner />
          </div>
        </div>
      </div>
      <Features />
      <FeaturedCategory />
      <OurProducts />
      <Specialoffer />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <Discountprod />
          </div>
          <div className="col-span-2">
            <Bestsellingprod />
          </div>
        </div>
      </div>
      <Companies />
      <OurArticles />
    </div>
  )
}

export default Homepage;
