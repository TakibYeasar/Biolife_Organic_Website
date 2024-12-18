import React, { useState } from 'react';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Organic Apples', quantity: 50, lowStockThreshold: 20 },
        { id: 2, name: 'Organic Bananas', quantity: 10, lowStockThreshold: 15 },
        { id: 3, name: 'Organic Carrots', quantity: 0, lowStockThreshold: 5 },
        // Add more products as needed
    ]);

    const handleUpdateStock = (id, newQuantity) => {
        const updatedInventory = inventory.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setInventory(updatedInventory);
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Inventory Management</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Current Quantity</th>
                            <th>Low Stock Threshold</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item.id} className={item.quantity < item.lowStockThreshold ? 'bg-red-100' : ''}>
                                <td>{item.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="input input-bordered w-20"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateStock(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                                        min="0"
                                    />
                                </td>
                                <td>{item.lowStockThreshold}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleUpdateStock(item.id, item.quantity)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <p className="text-lg font-semibold">Low Stock Products:</p>
                <ul className="list-disc pl-5">
                    {inventory
                        .filter(item => item.quantity < item.lowStockThreshold)
                        .map(item => (
                            <li key={item.id} className="text-red-600">
                                {item.name} (Current Stock: {item.quantity})
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default InventoryManagement;
