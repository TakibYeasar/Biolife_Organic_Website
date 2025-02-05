import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Category Table Component
const AllArticleCategories = ({
    categories,
    actions,
    isLoading,
}) => {
    if (isLoading) return <p className="text-gray-600">Loading categories...</p>;

    return (
        <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Listings</h2>
            <table className="min-w-full bg-white border rounded-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">#</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Icon</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Name</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Image</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                            <td className="py-3 px-4 text-gray-700">
                                <img src={category.icon} alt="Category Icon" className="w-10 h-10" />
                            </td>
                            <td className="py-3 px-4 text-gray-700">{category.name}</td>
                            <td className="py-3 px-4 text-gray-700">
                                <img src={category.image} alt="Category Icon" className="w-10 h-10" />
                            </td>
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

export default AllArticleCategories;
