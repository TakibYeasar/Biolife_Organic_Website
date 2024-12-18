import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-white shadow-md w-64 p-4">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Sidebar</span>
                <a href="#" className="text-xl" aria-label="Close Sidebar">&times;</a>
            </div>
            <div className="space-y-6">
                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Departments</h4>
                    <ul className="list-disc pl-5">
                        <li><a href="#" className="text-blue-600 hover:underline">Organic Food</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Fresh Fruit</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Dried Fruits</a></li>
                    </ul>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Shipping & Pickup</h4>
                    <ul className="list-disc pl-5">
                        <li><a href="#" className="text-blue-600 hover:underline">Show all</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">2-Day shipping</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Shop to Home</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Free Pickup</a></li>
                    </ul>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Price</h4>
                    <div>
                        <form action="#" method="get" className="flex flex-col mb-2">
                            <div className="flex items-center mb-2">
                                <label htmlFor="pr-from" className="mr-2">$</label>
                                <input type="number" id="pr-from" name="price-from" className="input input-bordered w-1/3 mr-2" placeholder="Min" />
                                <label htmlFor="pr-to" className="mr-2">to $</label>
                                <input type="number" id="pr-to" name="price-to" className="input input-bordered w-1/3" placeholder="Max" />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Go</button>
                        </form>
                        <ul className="list-disc pl-5">
                            <li><a href="#" className="text-blue-600 hover:underline">$0 - $5</a></li>
                            <li><a href="#" className="text-blue-600 hover:underline">$5 - $10</a></li>
                            <li><a href="#" className="text-blue-600 hover:underline">$15 - $20</a></li>
                        </ul>
                    </div>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Brand</h4>
                    <ul className="list-disc pl-5">
                        <li><a href="#" className="text-blue-600 hover:underline">Great Value Organic</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Plum Organic</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Shop to Home</a></li>
                    </ul>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Color</h4>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-blue-600 hover:underline">Multi</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Red</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Orange</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Other</a></li>
                    </ul>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Popular Size</h4>
                    <ul className="list-disc pl-5">
                        <li><a href="#" className="text-blue-600 hover:underline">8oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">15oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">6oz</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">30oz</a></li>
                    </ul>
                </div>

                <div className="widget">
                    <h4 className="text-lg font-semibold mb-2">Number of Pieces</h4>
                    <ul className="list-disc pl-5">
                        <li><a href="#" className="text-blue-600 hover:underline">1 to 9</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">10 to 15</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
