import React from 'react';
import "./Sortproduct.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Sortproduct = () => {
  return (

    <div id="top-functions-area" className="top-functions-area" >
      <div className="flt-item to-left group-on-mobile">
        <span className="flt-title">Refine</span>
        <a href="#" className="icon-for-mobile">
          <span></span>
          <span></span>
          <span></span>
        </a>
        <div className="wrap-selectors">
          <form action="#" name="frm-refine" method="get">
            <span className="title-for-mobile">Refine Products By</span>
            <div data-title="Price:" className="selector-item">
              <select name="price" className="selector">
                <option value="all">Price</option>
                <option value="className-1st">Less than 5$</option>
                <option value="className-2nd">$5-10$</option>
                <option value="className-3rd">$10-20$</option>
                <option value="className-4th">$20-45$</option>
                <option value="className-5th">$45-100$</option>
                <option value="className-6th">$100-150$</option>
                <option value="className-7th">More than 150$</option>
              </select>
            </div>
            <div data-title="Brand:" className="selector-item">
              <select name="brad" className="selector">
                <option value="all">Top brands</option>
                <option value="br2">Brand first</option>
                <option value="br3">Brand second</option>
                <option value="br4">Brand third</option>
                <option value="br5">Brand fourth</option>
                <option value="br6">Brand fiveth</option>
              </select>
            </div>
            <div data-title="Avalability:" className="selector-item">
              <select name="ability" className="selector">
                <option value="all">Availability</option>
                <option value="vl2">Availability 1</option>
                <option value="vl3">Availability 2</option>
                <option value="vl4">Availability 3</option>
                <option value="vl5">Availability 4</option>
                <option value="vl6">Availability 5</option>
              </select>
            </div>
            <p className="btn-for-mobile"><button type="submit" className="btn-submit">Go</button></p>
          </form>
        </div>
      </div>
      <div className="flt-item to-right">
        <span className="flt-title">Sort</span>
        <div className="wrap-selectors">
          <div className="selector-item orderby-selector">
            <select name="orderby" className="orderby" aria-label="Shop order">
              <option value="menu_order" selected="selected">Default sorting</option>
              <option value="popularity">popularity</option>
              <option value="rating">average rating</option>
              <option value="date">newness</option>
              <option value="price">price: low to high</option>
              <option value="price-desc">price: high to low</option>
            </select>
          </div>
          <div className="selector-item viewmode-selector">
            <a href="category-grid-left-sidebar.html" className="viewmode grid-mode"><i className="biolife-icon icon-grid"></i></a>
            <a href="category-list-left-sidebar.html" className="viewmode detail-mode active"><i className="biolife-icon icon-list"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sortproduct