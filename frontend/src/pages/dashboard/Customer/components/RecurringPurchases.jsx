import React, { useState } from 'react';

// Sample recurring purchase data
const sampleRecurringPurchases = [
    {
        id: 1,
        productName: 'Organic Almonds',
        frequency: 'Weekly',
        nextDelivery: '2024-10-05',
    },
    {
        id: 2,
        productName: 'Organic Quinoa',
        frequency: 'Biweekly',
        nextDelivery: '2024-10-12',
    },
];

const RecurringPurchases = () => {
    const [recurringPurchases, setRecurringPurchases] = useState(sampleRecurringPurchases);
    const [productName, setProductName] = useState('');
    const [frequency, setFrequency] = useState('Weekly');
    const [nextDelivery, setNextDelivery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            setSuccessMessage('Recurring purchase added successfully!');
            setProductName('');
            setNextDelivery('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    const handleCancelPurchase = (id) => {
        setRecurringPurchases(recurringPurchases.filter((purchase) => purchase.id !== id));
        setSuccessMessage('Recurring purchase canceled successfully!');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
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
                        className="input input-bordered w-full"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <select
                        className="select select-bordered w-full"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={nextDelivery}
                        onChange={(e) => setNextDelivery(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Recurring Purchase
                </button>
            </form>

            <h2 className="text-xl mb-4">Your Recurring Purchases</h2>
            {recurringPurchases.length === 0 ? (
                <p className="text-gray-500">No recurring purchases found.</p>
            ) : (
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Frequency</th>
                            <th>Next Delivery</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recurringPurchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td>{purchase.productName}</td>
                                <td>{purchase.frequency}</td>
                                <td>{purchase.nextDelivery}</td>
                                <td>
                                    <button
                                        className="btn btn-warning mr-2"
                                        onClick={() => {
                                            // Logic for editing purchase can be implemented here
                                            alert('Edit functionality not implemented yet.');
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleCancelPurchase(purchase.id)}
                                    >
                                        Cancel
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
