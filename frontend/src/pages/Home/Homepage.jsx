import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Categorylist, Banner, Features, OurProducts, Specialoffer, Bestsellingprod, Discountprod, Companies, Articles, FeaturedCategory} from "./index.js";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="container">
        <div className="row">
          <Categorylist />
          <Banner />
        </div>
      </div>
      <Features />
      <FeaturedCategory />
      <OurProducts />
      <Specialoffer />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Discountprod />
          </div>
          <div className="col-lg-8">
            <Bestsellingprod />
          </div>
        </div>
      </div>
      <Companies />
      <Articles />
    </div>
  )
}

export default Homepage