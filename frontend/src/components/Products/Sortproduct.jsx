import React from 'react';

const Sortproduct = () => {
  return (
    <div id="top-functions-area" className="top-functions-area p-4 flex justify-between items-center bg-white shadow-md rounded-lg">
      <div className="flt-item to-left group-on-mobile">
        <span className="flt-title font-semibold text-lg">Refine</span>
        <a href="#" className="icon-for-mobile">
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </a>
        <div className="wrap-selectors mt-2">
          <form action="#" name="frm-refine" method="get" className="space-y-2">
            <span className="title-for-mobile block text-sm font-medium">Refine Products By</span>
            <div className="selector-item">
              <select name="price" className="select select-bordered w-full">
                <option value="all">Price</option>
                <option value="className-1st">Less than $5</option>
                <option value="className-2nd">$5-$10</option>
                <option value="className-3rd">$10-$20</option>
                <option value="className-4th">$20-$45</option>
                <option value="className-5th">$45-$100</option>
                <option value="className-6th">$100-$150</option>
                <option value="className-7th">More than $150</option>
              </select>
            </div>
            <div className="selector-item">
              <select name="brand" className="select select-bordered w-full">
                <option value="all">Top brands</option>
                <option value="br2">Brand first</option>
                <option value="br3">Brand second</option>
                <option value="br4">Brand third</option>
                <option value="br5">Brand fourth</option>
                <option value="br6">Brand fifth</option>
              </select>
            </div>
            <div className="selector-item">
              <select name="availability" className="select select-bordered w-full">
                <option value="all">Availability</option>
                <option value="vl2">Availability 1</option>
                <option value="vl3">Availability 2</option>
                <option value="vl4">Availability 3</option>
                <option value="vl5">Availability 4</option>
                <option value="vl6">Availability 5</option>
              </select>
            </div>
            <p className="btn-for-mobile">
              <button type="submit" className="btn btn-primary w-full">Go</button>
            </p>
          </form>
        </div>
      </div>
      <div className="flt-item to-right">
        <span className="flt-title font-semibold text-lg">Sort</span>
        <div className="wrap-selectors mt-2">
          <div className="selector-item orderby-selector">
            <select name="orderby" className="select select-bordered w-full" aria-label="Shop order">
              <option value="menu_order" selected="selected">Default sorting</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Average rating</option>
              <option value="date">Newness</option>
              <option value="price">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <div className="selector-item viewmode-selector mt-2">
            <a href="category-grid-left-sidebar.html" className="viewmode grid-mode mr-2">
              <i className="biolife-icon icon-grid"></i>
            </a>
            <a href="category-list-left-sidebar.html" className="viewmode detail-mode">
              <i className="biolife-icon icon-list"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sortproduct;
