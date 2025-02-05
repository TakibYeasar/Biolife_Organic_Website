import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const PromotionsDiscounts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [promotionName, setPromotionName] = useState('');
    const [discountType, setDiscountType] = useState('Percentage');
    const [discountValue, setDiscountValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [promotions, setPromotions] = useState([]);

    const handleAddPromotion = (e) => {
        e.preventDefault();
        const newPromotion = {
            id: promotions.length + 1,
            name: promotionName,
            type: discountType,
            value: discountValue,
            startDate,
            endDate,
            status: 'Active', // Default status
        };
        setPromotions([...promotions, newPromotion]);
        // Reset the form
        setPromotionName('');
        setDiscountValue('');
        setStartDate('');
        setEndDate('');
    };

    const filteredPromotions = promotions.filter((promo) =>
        promo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Promotions & Discounts</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search promotions..."
                        className="border px-4 py-2 rounded w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        <FaSearch />
                    </button>
                </div>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setPromotionName('')}
                >
                    + Add Promotion
                </button>
            </div>

            <form className="mb-6" onSubmit={handleAddPromotion}>
                <h2 className="text-xl font-medium mb-4">Add New Promotion</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Promotion Name"
                        className="border px-4 py-2 rounded"
                        value={promotionName}
                        onChange={(e) => setPromotionName(e.target.value)}
                        required
                    />
                    <select
                        className="border px-4 py-2 rounded"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                    >
                        <option value="Percentage">Percentage Discount</option>
                        <option value="Fixed Amount">Fixed Amount Discount</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Discount Value"
                        className="border px-4 py-2 rounded"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="border px-4 py-2 rounded"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="border px-4 py-2 rounded"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Promotion
                </button>
            </form>

            <div>
                <h2 className="text-xl font-medium mb-4">Current Promotions</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Promotion Name</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Value</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">End Date</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPromotions.length > 0 ? (
                            filteredPromotions.map((promo) => (
                                <tr key={promo.id}>
                                    <td className="border px-4 py-2">{promo.name}</td>
                                    <td className="border px-4 py-2">{promo.type}</td>
                                    <td className="border px-4 py-2">
                                        {promo.type === 'Percentage' ? `${promo.value}%` : `$${promo.value}`}
                                    </td>
                                    <td className="border px-4 py-2">{promo.startDate}</td>
                                    <td className="border px-4 py-2">{promo.endDate}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-sm rounded ${promo.status === 'Active'
                                                ? 'bg-green-200 text-green-700'
                                                : 'bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {promo.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No promotions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PromotionsDiscounts;
