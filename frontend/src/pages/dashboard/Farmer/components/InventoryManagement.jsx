import React, { useState } from "react";

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([
        { id: 1, name: "Organic Apples", quantity: 50, lowStockThreshold: 20 },
        { id: 2, name: "Organic Bananas", quantity: 10, lowStockThreshold: 15 },
        { id: 3, name: "Organic Carrots", quantity: 0, lowStockThreshold: 5 },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [showLowStockOnly, setShowLowStockOnly] = useState(false);

    const handleUpdateStock = (id, newQuantity) => {
        setInventory((prevInventory) =>
            prevInventory.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const filteredInventory = inventory.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesLowStockFilter =
            !showLowStockOnly || item.quantity < item.lowStockThreshold;
        return matchesSearch && matchesLowStockFilter;
    });

    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Inventory Management</h1>

            {/* Search and Filter */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="px-4 py-2 border rounded w-64 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={showLowStockOnly}
                        onChange={(e) => setShowLowStockOnly(e.target.checked)}
                    />
                    <span>Show Low Stock Only</span>
                </label>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Current Quantity</th>
                            <th className="border px-4 py-2">Low Stock Threshold</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map((item) => (
                            <tr
                                key={item.id}
                                className={
                                    item.quantity < item.lowStockThreshold ? "bg-red-100" : ""
                                }
                            >
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        className="px-2 py-1 border rounded w-20"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleUpdateStock(
                                                item.id,
                                                Math.max(0, parseInt(e.target.value) || 0)
                                            )
                                        }
                                        min="0"
                                    />
                                </td>
                                <td className="border px-4 py-2">{item.lowStockThreshold}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
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

            {/* Low Stock Products */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Low Stock Products</h2>
                {inventory.some((item) => item.quantity < item.lowStockThreshold) ? (
                    <ul className="list-disc pl-6">
                        {inventory
                            .filter((item) => item.quantity < item.lowStockThreshold)
                            .map((item) => (
                                <li key={item.id} className="text-red-600">
                                    {item.name} (Current Stock: {item.quantity})
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p className="text-green-600">All products are sufficiently stocked!</p>
                )}
            </div>
        </div>
    );
};

export default InventoryManagement;
