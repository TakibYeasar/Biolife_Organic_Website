import React from "react";

const AllProductCategories = ({ 
    categories,
    actions,
    isLoading,
}) => {
    if (isLoading) return <p className="text-gray-600">Loading categories...</p>;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Category Listings</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Image</th>
                        <th className="py-3 px-4 text-left">Products</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id} className="border-b">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{category.name}</td>
                            <td className="py-3 px-4">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="py-3 px-4">{category.product_count}</td>
                            <td className="py-3 px-4 flex gap-2">
                                {actions(category)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllProductCategories;
