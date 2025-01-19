import React from 'react';

const Sortproduct = () => {
  return (
    <div className="flex justify-between p-6 bg-white shadow-md rounded-lg">
      {/* Refine Section */}
      <div className="w-full sm:w-3/4 md:w-1/2">
        <h2 className="font-semibold text-xl text-gray-800">Refine</h2>
        <button className="block mt-2 text-gray-600">
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
        <form className="mt-4 space-y-4">
          <span className="text-sm font-medium text-gray-600">Refine Products By</span>

          {/* Price Selector */}
          <select
            name="price"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Price</option>
            <option value="less-5">Less than $5</option>
            <option value="5-10">$5-$10</option>
            <option value="10-20">$10-$20</option>
            <option value="20-45">$20-$45</option>
            <option value="45-100">$45-$100</option>
            <option value="100-150">$100-$150</option>
            <option value="more-150">More than $150</option>
          </select>

          {/* Availability Selector */}
          <select
            name="availability"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Availability</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of stock</option>
          </select>

          {/* Order By Selector */}
          <select
            name="orderby"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default sorting</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Average rating</option>
            <option value="date">Newness</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>

          {/* View Mode Icons */}
          <div className="flex items-center mt-4 space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <i className="biolife-icon icon-grid text-xl text-gray-600"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <i className="biolife-icon icon-list text-xl text-gray-600"></i>
            </button>
          </div>

          {/* Submit Button */}
          <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sortproduct;
