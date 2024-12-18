import { useState } from 'react';

const ManagePromotions = () => {
    const [promotions, setPromotions] = useState([
        {
            id: 1,
            name: 'Summer Sale',
            discountType: 'Percentage',
            value: 20,
            startDate: '2024-07-01',
            endDate: '2024-07-31',
            status: 'Active',
        },
        {
            id: 2,
            name: 'New Year Discount',
            discountType: 'Fixed',
            value: 15,
            startDate: '2024-12-20',
            endDate: '2025-01-05',
            status: 'Upcoming',
        },
    ]);

    const [newPromotion, setNewPromotion] = useState({
        name: '',
        discountType: 'Percentage',
        value: '',
        startDate: '',
        endDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPromotion((prevState) => ({ ...prevState, [name]: value }));
    };

    const addPromotion = () => {
        const newPromo = {
            ...newPromotion,
            id: promotions.length + 1,
            status: 'Upcoming',
        };
        setPromotions([...promotions, newPromo]);
        setNewPromotion({
            name: '',
            discountType: 'Percentage',
            value: '',
            startDate: '',
            endDate: '',
        });
    };

    const deletePromotion = (id) => {
        const updatedPromotions = promotions.filter((promo) => promo.id !== id);
        setPromotions(updatedPromotions);
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Promotions & Discounts</h1>

            {/* Promotions Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {promotions.map((promotion) => (
                    <div
                        key={promotion.id}
                        className={`card bg-base-200 shadow-lg p-4 ${promotion.status === 'Expired' ? 'opacity-50' : ''
                            }`}
                    >
                        <h2 className="text-xl font-bold">{promotion.name}</h2>
                        <p>
                            Discount: {promotion.discountType === 'Percentage'
                                ? `${promotion.value}%`
                                : `$${promotion.value}`}
                        </p>
                        <p>Start Date: {promotion.startDate}</p>
                        <p>End Date: {promotion.endDate}</p>
                        <p>Status: <span className={`font-bold ${promotion.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{promotion.status}</span></p>
                        <div className="flex justify-end mt-4">
                            <button className="btn btn-error mr-2" onClick={() => deletePromotion(promotion.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Promotion */}
            <div className="card bg-base-200 shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Create New Promotion</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Promotion Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered"
                            value={newPromotion.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Discount Type</span>
                        </label>
                        <select
                            name="discountType"
                            className="select select-bordered"
                            value={newPromotion.discountType}
                            onChange={handleInputChange}
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Fixed">Fixed Amount</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Discount Value</span>
                        </label>
                        <input
                            type="number"
                            name="value"
                            className="input input-bordered"
                            value={newPromotion.value}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            className="input input-bordered"
                            value={newPromotion.startDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            className="input input-bordered"
                            value={newPromotion.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="btn btn-primary" onClick={addPromotion}>
                        Add Promotion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagePromotions;
