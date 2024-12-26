import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const sampleRecurringPurchases = [
    {
        id: 1,
        productName: "Organic Almonds",
        frequency: "Weekly",
        nextDelivery: "2024-10-05",
    },
    {
        id: 2,
        productName: "Organic Quinoa",
        frequency: "Biweekly",
        nextDelivery: "2024-10-12",
    },
];

const RecurringPurchases = () => {
    const [recurringPurchases, setRecurringPurchases] = useState(sampleRecurringPurchases);
    const [productName, setProductName] = useState("");
    const [frequency, setFrequency] = useState("Weekly");
    const [nextDelivery, setNextDelivery] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleAddRecurringPurchase = (e) => {
        e.preventDefault();
        if (productName && nextDelivery) {
            const newPurchase = {
                id: recurringPurchases.length + 1,
                productName,
                frequency,
                nextDelivery,
            };
            setRecurringPurchases([...recurringPurchases, newPurchase]);
            setSuccessMessage("Recurring purchase added successfully!");
            setProductName("");
            setNextDelivery("");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
    };

    const handleCancelPurchase = (id) => {
        setRecurringPurchases(recurringPurchases.filter((purchase) => purchase.id !== id));
        setSuccessMessage("Recurring purchase canceled successfully!");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-6">Recurring Purchases</h1>

            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleAddRecurringPurchase} className="mb-6">
                <h2 className="text-xl mb-4">Add New Recurring Purchase</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        className="px-4 py-2 border rounded-md w-full focus:outline-none"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <select
                        className="px-4 py-2 border rounded-md w-full"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border rounded-md w-full"
                        value={nextDelivery}
                        onChange={(e) => setNextDelivery(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                    Add Recurring Purchase
                </button>
            </form>

            <h2 className="text-xl mb-4">Your Recurring Purchases</h2>
            {recurringPurchases.length === 0 ? (
                <p className="text-gray-500">No recurring purchases found.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Product</th>
                            <th className="border px-4 py-2">Frequency</th>
                            <th className="border px-4 py-2">Next Delivery</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recurringPurchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td className="border px-4 py-2">{purchase.productName}</td>
                                <td className="border px-4 py-2">{purchase.frequency}</td>
                                <td className="border px-4 py-2">{purchase.nextDelivery}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => {
                                            // Logic for editing purchase can be implemented here
                                            alert("Edit functionality not implemented yet.");
                                        }}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleCancelPurchase(purchase.id)}
                                    >
                                        <FaTrash /> Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecurringPurchases;
