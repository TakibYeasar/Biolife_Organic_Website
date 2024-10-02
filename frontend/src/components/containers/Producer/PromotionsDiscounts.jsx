import React, { useState } from 'react';

const PromotionsDiscounts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [promotionName, setPromotionName] = useState('');
    const [discountType, setDiscountType] = useState('Percentage'); // or 'Fixed Amount'
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
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Promotions & Discounts</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search promotions..."
                    className="input w-full max-w-xs mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <form className="mb-6" onSubmit={handleAddPromotion}>
                <h2 className="text-xl font-medium mb-4">Add New Promotion</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Promotion Name"
                        className="input w-full"
                        value={promotionName}
                        onChange={(e) => setPromotionName(e.target.value)}
                        required
                    />
                    <select
                        className="select w-full"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                    >
                        <option value="Percentage">Percentage Discount</option>
                        <option value="Fixed Amount">Fixed Amount Discount</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Discount Value"
                        className="input w-full"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="input w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="input w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Promotion
                </button>
            </form>

            <div>
                <h2 className="text-xl font-medium mb-4">Current Promotions</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Promotion Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPromotions.length > 0 ? (
                            filteredPromotions.map((promo) => (
                                <tr key={promo.id}>
                                    <td>{promo.name}</td>
                                    <td>{promo.type}</td>
                                    <td>{promo.type === 'Percentage' ? `${promo.value}%` : `$${promo.value}`}</td>
                                    <td>{promo.startDate}</td>
                                    <td>{promo.endDate}</td>
                                    <td>
                                        <span className={`badge ${promo.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                                            {promo.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary mr-2">Edit</button>
                                        <button className="btn btn-error">Delete</button>
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
