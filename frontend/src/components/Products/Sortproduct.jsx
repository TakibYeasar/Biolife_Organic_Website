import React from 'react';

const Sortproduct = () => {
  return (
    <div id="top-functions-area" className="top-functions-area p-6 bg-white shadow-md rounded-lg flex justify-between items-center">
      {/* Refine Section */}
      <div className="flt-item to-left flex flex-col w-1/2 sm:w-3/4 md:w-1/2">
        <span className="flt-title font-semibold text-xl text-gray-800">Refine</span>
        <a href="#" className="icon-for-mobile block mt-2">
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </a>
        <div className="wrap-selectors mt-4">
          <form action="#" name="frm-refine" method="get" className="space-y-4">
            <span className="title-for-mobile block text-sm font-medium text-gray-600">Refine Products By</span>

            {/* Price Selector */}
            <div className="selector-item">
              <select name="price" className="select select-bordered w-full text-gray-700 bg-gray-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

            {/* Brand Selector */}
            <div className="selector-item">
              <select name="brand" className="select select-bordered w-full text-gray-700 bg-gray-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">Top brands</option>
                <option value="br2">Brand first</option>
                <option value="br3">Brand second</option>
                <option value="br4">Brand third</option>
                <option value="br5">Brand fourth</option>
                <option value="br6">Brand fifth</option>
              </select>
            </div>

            {/* Availability Selector */}
            <div className="selector-item">
              <select name="availability" className="select select-bordered w-full text-gray-700 bg-gray-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">Availability</option>
                <option value="vl2">Availability 1</option>
                <option value="vl3">Availability 2</option>
                <option value="vl4">Availability 3</option>
                <option value="vl5">Availability 4</option>
                <option value="vl6">Availability 5</option>
              </select>
            </div>

            {/* Submit Button */}
            <p className="btn-for-mobile mt-4">
              <button type="submit" className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2">
                Go
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Sort Section */}
      <div className="flt-item to-right w-1/2 sm:w-1/2 flex flex-col items-end">
        <span className="flt-title font-semibold text-xl text-gray-800">Sort</span>
        <div className="wrap-selectors mt-4">
          <div className="selector-item orderby-selector">
            <select name="orderby" className="select select-bordered w-full text-gray-700 bg-gray-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Shop order">
              <option value="menu_order" selected="selected">Default sorting</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Average rating</option>
              <option value="date">Newness</option>
              <option value="price">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          <div className="selector-item viewmode-selector mt-4 flex items-center space-x-3">
            <a href="category-grid-left-sidebar.html" className="viewmode grid-mode p-2 rounded-full hover:bg-gray-200">
              <i className="biolife-icon icon-grid text-xl text-gray-600"></i>
            </a>
            <a href="category-list-left-sidebar.html" className="viewmode detail-mode p-2 rounded-full hover:bg-gray-200">
              <i className="biolife-icon icon-list text-xl text-gray-600"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sortproduct;
