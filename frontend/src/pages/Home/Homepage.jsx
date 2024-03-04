import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Categorylist, Banner, Features, Products, Specialoffer, Bestselling, Companies, Articles, Prodcategories, Prodfeature } from "./index.js";

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
      <Prodcategories />
      <Products />
      <Specialoffer />
      <Bestselling />
      <Companies />
      <Prodfeature />
      <Articles />
    </div>
  )
}

export default Homepage