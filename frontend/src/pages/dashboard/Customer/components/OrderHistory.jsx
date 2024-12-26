import React, { useState } from 'react';

// Sample order data
const sampleOrders = [
    {
        orderId: '12345',
        date: '2024-09-30',
        total: 59.99,
        status: 'Delivered',
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
        items: [
            { id: 3, name: 'Almond Milk', quantity: 1, price: 2.49 },
            { id: 4, name: 'Organic Apples', quantity: 5, price: 1.99 },
        ],
    },
];

const OrderHistory = () => {
    const [orders] = useState(sampleOrders);
    const [openOrderId, setOpenOrderId] = useState(null);

    const toggleOrderDetails = (orderId) => {
        setOpenOrderId(openOrderId === orderId ? null : orderId);
    };

    return (
        <div className="p-6 bg-white shadow rounded-md">
            <h1 className="text-2xl font-semibold mb-6">Order History</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no order history.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Order ID</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Total</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order.orderId}>
                                    <tr>
                                        <td className="border px-4 py-2">{order.orderId}</td>
                                        <td className="border px-4 py-2">{order.date}</td>
                                        <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-sm rounded ${order.status === 'Delivered'
                                                        ? 'bg-green-200 text-green-700'
                                                        : 'bg-yellow-200 text-yellow-700'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={() => toggleOrderDetails(order.orderId)}
                                            >
                                                {openOrderId === order.orderId
                                                    ? 'Hide Details'
                                                    : 'View Details'}
                                            </button>
                                        </td>
                                    </tr>
                                    {openOrderId === order.orderId && (
                                        <tr>
                                            <td colSpan={5} className="bg-gray-100">
                                                <div className="p-4">
                                                    <h3 className="font-bold mb-2">Items:</h3>
                                                    <ul className="list-disc pl-5">
                                                        {order.items.map((item) => (
                                                            <li key={item.id} className="mb-1">
                                                                {item.quantity} x {item.name} - ${item.price.toFixed(2)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
