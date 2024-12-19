import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-white shadow-md w-64 p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-semibold text-gray-800">Sidebar</span>
                <a href="#" className="text-2xl text-gray-600 hover:text-gray-800" aria-label="Close Sidebar">&times;</a>
            </div>

            <div className="space-y-8">
                {/* Departments Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Departments</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Organic Food</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Fresh Fruit</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Dried Fruits</a></li>
                    </ul>
                </div>

                {/* Shipping & Pickup Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Shipping & Pickup</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Show all</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">2-Day shipping</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Shop to Home</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Free Pickup</a></li>
                    </ul>
                </div>

                {/* Price Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Price</h4>
                    <form action="#" method="get" className="space-y-4 mb-4">
                        <div className="flex space-x-2">
                            <div className="w-1/3">
                                <label htmlFor="pr-from" className="text-sm text-gray-600">Min</label>
                                <input type="number" id="pr-from" name="price-from" className="input input-bordered w-full" placeholder="$" />
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="pr-to" className="text-sm text-gray-600">Max</label>
                                <input type="number" id="pr-to" name="price-to" className="input input-bordered w-full" placeholder="$" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Go</button>
                    </form>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">$0 - $5</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">$5 - $10</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">$15 - $20</a></li>
                    </ul>
                </div>

                {/* Brand Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Brand</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Great Value Organic</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Plum Organic</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Shop to Home</a></li>
                    </ul>
                </div>

                {/* Color Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Color</h4>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-blue-600 hover:underline">Multi</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Red</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Orange</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Other</a></li>
                    </ul>
                </div>

                {/* Popular Size Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Popular Size</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">8oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">15oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">6oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">30oz</a></li>
                    </ul>
                </div>

                {/* Number of Pieces Widget */}
                <div className="widget">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Number of Pieces</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">1 to 9</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">10 to 15</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
