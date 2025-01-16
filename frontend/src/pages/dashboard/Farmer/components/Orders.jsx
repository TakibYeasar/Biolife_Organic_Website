import React, { useState } from "react";
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const orders = [
        {
            id: 1,
            customerName: 'John Doe',
            orderDate: '2024-09-10',
            status: 'Pending',
            totalAmount: 45.99,
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            orderDate: '2024-09-12',
            status: 'Shipped',
            totalAmount: 39.50,
        },
        {
            id: 3,
            customerName: 'Emily Johnson',
            orderDate: '2024-09-15',
            status: 'Delivered',
            totalAmount: 29.99,
        },
    ];

    const filteredOrders = orders.filter(
        (order) =>
            (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderDate.includes(searchTerm)) &&
            (selectedStatus === "" || order.status === selectedStatus)
    );

    const handleSearch = (e) => setSearchTerm(e.target.value);

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Manage Orders</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="space-x-4">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="bg-white px-4 py-2 w-64 border rounded"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className="bg-blue-500 text-white p-4 rounded">
                        <FaSearch />
                    </button>
                </div>

                <select
                    className="bg-white border px-4 py-2 rounded"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            <h2 className="text-xl font-medium mb-4">Total Orders: {filteredOrders.length}</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Order Date</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="border px-4 py-2">{order.id}</td>
                                <td className="border px-4 py-2">{order.customerName}</td>
                                <td className="border px-4 py-2">{order.orderDate}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 text-sm rounded ${order.status === 'Pending'
                                            ? 'bg-yellow-200 text-yellow-700'
                                            : order.status === 'Shipped'
                                                ? 'bg-blue-200 text-blue-700'
                                                : 'bg-green-200 text-green-700'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                        <FaEye /> View
                                    </button>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        <FaEdit /> Update Status
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
