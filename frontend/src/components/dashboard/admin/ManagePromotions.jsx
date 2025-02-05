import React, { useState } from "react";

const ManagePromotions = () => {
    const [promotions, setPromotions] = useState([
        {
            id: 1,
            name: "Summer Sale",
            discountType: "Percentage",
            value: 20,
            startDate: "2024-07-01",
            endDate: "2024-07-31",
            status: "Active",
        },
        {
            id: 2,
            name: "New Year Discount",
            discountType: "Fixed",
            value: 15,
            startDate: "2024-12-20",
            endDate: "2025-01-05",
            status: "Upcoming",
        },
    ]);

    const [newPromotion, setNewPromotion] = useState({
        name: "",
        discountType: "Percentage",
        value: "",
        startDate: "",
        endDate: "",
    });

    const [showCreatePromotion, setShowCreatePromotion] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPromotion((prevState) => ({ ...prevState, [name]: value }));
    };

    const addPromotion = () => {
        const newPromo = {
            ...newPromotion,
            id: promotions.length + 1,
            status: "Upcoming",
        };
        setPromotions([...promotions, newPromo]);
        setNewPromotion({
            name: "",
            discountType: "Percentage",
            value: "",
            startDate: "",
            endDate: "",
        });
        setShowCreatePromotion(false);
    };

    const deletePromotion = (id) => {
        setPromotions(promotions.filter((promo) => promo.id !== id));
    };

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Manage Promotions</h1>

            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreatePromotion(true)}
                >
                    + Create Promotion
                </button>
            </div>

            {showCreatePromotion && (
                <div className="p-4 bg-gray-100 rounded mb-6">
                    <h2 className="text-xl font-bold mb-4">Add New Promotion</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Promotion Name"
                            className="border px-4 py-2 w-full rounded"
                            value={newPromotion.name}
                            onChange={handleInputChange}
                        />
                        <select
                            name="discountType"
                            className="border px-4 py-2 w-full rounded"
                            value={newPromotion.discountType}
                            onChange={handleInputChange}
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Fixed">Fixed</option>
                        </select>
                        <input
                            type="number"
                            name="value"
                            placeholder="Discount Value"
                            className="border px-4 py-2 w-full rounded"
                            value={newPromotion.value}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="startDate"
                            className="border px-4 py-2 w-full rounded"
                            value={newPromotion.startDate}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="endDate"
                            className="border px-4 py-2 w-full rounded"
                            value={newPromotion.endDate}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={addPromotion}
                        >
                            Save Promotion
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotions.map((promotion) => (
                    <div
                        key={promotion.id}
                        className={`p-4 border rounded shadow ${promotion.status === "Expired" ? "opacity-50" : ""
                            }`}
                    >
                        <h2 className="text-xl font-bold mb-2">{promotion.name}</h2>
                        <p>
                            Discount:{" "}
                            {promotion.discountType === "Percentage"
                                ? `${promotion.value}%`
                                : `$${promotion.value}`}
                        </p>
                        <p>Start Date: {promotion.startDate}</p>
                        <p>End Date: {promotion.endDate}</p>
                        <p className={`font-bold ${promotion.status === "Active" ? "text-green-600" : "text-yellow-600"}`}>
                            Status: {promotion.status}
                        </p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => deletePromotion(promotion.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagePromotions;
