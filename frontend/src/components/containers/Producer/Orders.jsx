import React, { useState } from 'react';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
        // Add more orders as needed
    ];

    const filteredOrders = orders.filter((order) =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Orders</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="input w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">Total Orders: {filteredOrders.length}</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.orderDate}</td>
                                    <td>
                                        <span
                                            className={`badge ${order.status === 'Pending'
                                                    ? 'badge-warning'
                                                    : order.status === 'Shipped'
                                                        ? 'badge-info'
                                                        : 'badge-success'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>${order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-primary mr-2">View</button>
                                        <button className="btn btn-secondary">Update Status</button>
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
        </div>
    );
};

export default Orders;
