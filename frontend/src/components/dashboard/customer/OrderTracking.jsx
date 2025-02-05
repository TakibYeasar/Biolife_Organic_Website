import React, { useState } from "react";
import { FaSearch, FaEye } from "react-icons/fa";

const sampleOrders = [
    {
        orderId: "12345",
        date: "2024-09-30",
        total: 59.99,
        status: "Shipped",
        trackingNumber: "TRACK123456",
        carrier: "FedEx",
        items: [
            { id: 1, name: "Organic Avocados", quantity: 2, price: 3.99 },
            { id: 2, name: "Quinoa", quantity: 1, price: 4.99 },
        ],
    },
    {
        orderId: "12346",
        date: "2024-09-28",
        total: 34.99,
        status: "Delivered",
        trackingNumber: "TRACK123457",
        carrier: "UPS",
        items: [
            { id: 3, name: "Almond Milk", quantity: 1, price: 2.49 },
            { id: 4, name: "Organic Apples", quantity: 5, price: 1.99 },
        ],
    },
];

const OrderTracking = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(sampleOrders);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setFilteredOrders(
            sampleOrders.filter((order) =>
                order.orderId.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <div className="p-6 bg-white shadow rounded min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Order Tracking</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search by Order ID"
                        className="px-4 py-2 w-64 border rounded"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-gray-500">No orders found with the given criteria.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Order ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Total</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Carrier</th>
                                <th className="border px-4 py-2">Tracking Number</th>
                                <th className="border px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td className="border px-4 py-2">{order.orderId}</td>
                                    <td className="border px-4 py-2">{order.date}</td>
                                    <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{order.status}</td>
                                    <td className="border px-4 py-2">{order.carrier}</td>
                                    <td className="border px-4 py-2">{order.trackingNumber}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() =>
                                                alert(`Details for Order ID: ${order.orderId}`)
                                            }
                                        >
                                            <FaEye /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
