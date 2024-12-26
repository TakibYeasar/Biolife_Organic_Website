import React, { useState } from "react";
import { FaSearch, FaCheck, FaTruck, FaTimes, FaEye } from "react-icons/fa";

const OrderFulfillment = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [orders, setOrders] = useState([
        {
            id: 1,
            customer: "Alice Johnson",
            items: [
                { name: "Organic Honey", quantity: 2, price: 15.99 },
                { name: "Organic Apples", quantity: 1, price: 5.49 },
            ],
            status: "Pending",
            total: 37.47,
        },
        {
            id: 2,
            customer: "Bob Smith",
            items: [
                { name: "Organic Carrots", quantity: 5, price: 3.99 },
            ],
            status: "Shipped",
            total: 19.95,
        },
    ]);

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const filteredOrders = orders.filter(
        (order) =>
            (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toString().includes(searchQuery)) &&
            (selectedStatus === "" || order.status === selectedStatus)
    );

    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Order Fulfillment</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center border rounded overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search by order ID or customer name"
                        className="px-4 py-2 w-64 focus:outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="bg-blue-500 text-white px-4">
                        <FaSearch />
                    </button>
                </div>

                <select
                    className="border px-4 py-2 rounded"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Customer</th>
                        <th className="border px-4 py-2">Items</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">{order.id}</td>
                            <td className="border px-4 py-2">{order.customer}</td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} ({item.quantity} x ${item.price.toFixed(2)})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <span
                                    className={`px-2 py-1 text-sm rounded ${order.status === "Pending"
                                            ? "bg-yellow-200 text-yellow-700"
                                            : order.status === "Shipped"
                                                ? "bg-blue-200 text-blue-700"
                                                : order.status === "Completed"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-red-200 text-red-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="border px-4 py-2 space-x-2">
                                {order.status === "Pending" && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleUpdateStatus(order.id, "Shipped")}
                                    >
                                        <FaTruck /> Ship
                                    </button>
                                )}
                                {order.status === "Shipped" && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleUpdateStatus(order.id, "Completed")}
                                    >
                                        <FaCheck /> Complete
                                    </button>
                                )}
                                {order.status !== "Cancelled" && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                )}
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                    <FaEye /> View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderFulfillment;
