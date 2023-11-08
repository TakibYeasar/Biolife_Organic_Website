import React from 'react';
import { Banner, Features, Products, Specialoffer, Bestselling, Companies, Articles, Categories, Prodfeature } from "../containers";

const Homepage = () => {
  return (
    <div className="homepage">
      <Banner />
      <Features />
      <Categories />
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