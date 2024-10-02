import React, { useState } from 'react';

// Sample order data
const sampleOrders = [
    {
        orderId: '12345',
        date: '2024-09-30',
        total: 59.99,
        status: 'Shipped',
        trackingNumber: 'TRACK123456',
        carrier: 'FedEx',
        items: [
            { id: 1, name: 'Organic Avocados', quantity: 2, price: 3.99 },
            { id: 2, name: 'Quinoa', quantity: 1, price: 4.99 },
        ],
    },
    {
        orderId: '12346',
        date: '2024-09-28',
        total: 34.99,
        status: 'Delivered',
        trackingNumber: 'TRACK123457',
        carrier: 'UPS',
        items: [
            { id: 3, name: 'Almond Milk', quantity: 1, price: 2.49 },
            { id: 4, name: 'Organic Apples', quantity: 5, price: 1.99 },
        ],
    },
];

const OrderTracking = () => {
    const [orders, setOrders] = useState(sampleOrders);

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Order Tracking</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders to track.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Carrier</th>
                                <th>Tracking Number</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.date}</td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td>{order.carrier}</td>
                                    <td>{order.trackingNumber}</td>
                                    <td>
                                        <button
                                            className="btn btn-info"
                                            onClick={() => alert(`Details for Order ID: ${order.orderId}`)}
                                        >
                                            View Details
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
