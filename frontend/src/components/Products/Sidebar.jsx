import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-white shadow-lg w-64 p-6 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Sidebar</h2>
                <button className="text-xl text-gray-600 hover:text-gray-800">&times;</button>
            </div>

            {/* Departments */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Departments</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Organic Food</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Fresh Fruit</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Dried Fruits</a></li>
                </ul>
            </div>

            {/* Shipping & Pickup */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping & Pickup</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Show all</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">2-Day Shipping</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Shop to Home</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Free Pickup</a></li>
                </ul>
            </div>

            {/* Price Filter */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price</h3>
                <form className="space-y-4 mb-4">
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <label htmlFor="pr-from" className="text-sm text-gray-600">Min</label>
                            <input type="number" id="pr-from" name="price-from" className="w-full p-2 border rounded" placeholder="$" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="pr-to" className="text-sm text-gray-600">Max</label>
                            <input type="number" id="pr-to" name="price-to" className="w-full p-2 border rounded" placeholder="$" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Go</button>
                </form>
                <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:underline">$0 - $5</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">$5 - $10</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">$10 - $20</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
