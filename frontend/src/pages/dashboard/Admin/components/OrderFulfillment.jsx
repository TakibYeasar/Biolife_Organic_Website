import { useState } from 'react';
import { FaSearch, FaCheck, FaTruck, FaTimes, FaEye } from 'react-icons/fa';

const OrderFulfillment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [orders, setOrders] = useState([
        {
            id: 1,
            customer: 'Alice Johnson',
            items: [
                { name: 'Organic Honey', quantity: 2, price: 15.99 },
                { name: 'Organic Apples', quantity: 1, price: 5.49 },
            ],
            status: 'Pending',
            total: 37.47,
        },
        {
            id: 2,
            customer: 'Bob Smith',
            items: [
                { name: 'Organic Carrots', quantity: 5, price: 3.99 },
            ],
            status: 'Shipped',
            total: 19.95,
        },
        // More order data...
    ]);

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter function
    const filteredOrders = orders.filter((order) =>
        (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toString().includes(searchQuery)) &&
        (selectedStatus === '' || order.status === selectedStatus)
    );

    // Handle order status update
    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Order Fulfillment</h1>

            {/* Search and Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="form-control w-full max-w-xs">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search by order ID or customer name"
                            className="input input-bordered"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span className="btn btn-square">
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <select
                    className="select select-bordered w-full max-w-xs"
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

            {/* Order Table */}
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>
                                    {order.items.map(item => (
                                        <div key={item.name}>
                                            {item.quantity} x {item.name} (${item.price})
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${order.status === 'Pending' ? 'badge-warning' : order.status === 'Shipped' ? 'badge-info' : 'badge-success'}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>${order.total.toFixed(2)}</td>
                                <td className="flex gap-2">
                                    {order.status === 'Pending' && (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                                        >
                                            <FaTruck /> Ship
                                        </button>
                                    )}
                                    {order.status === 'Shipped' && (
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleUpdateStatus(order.id, 'Completed')}
                                        >
                                            <FaCheck /> Complete
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => console.log(`View details for order ${order.id}`)}
                                    >
                                        <FaEye /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <div className="btn-group">
                    <button className="btn">«</button>
                    <button className="btn">1</button>
                    <button className="btn btn-active">2</button>
                    <button className="btn">3</button>
                    <button className="btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default OrderFulfillment;
