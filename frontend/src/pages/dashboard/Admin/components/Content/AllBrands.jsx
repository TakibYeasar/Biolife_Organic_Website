import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import {
    useFetchBrandsQuery,
    useDeleteBrandMutation,
} from '../../../../../redux/features/core/coreApi';
import BrandForm from './BrandForm';

const AllBrands = () => {
    const { data: brands, isLoading, isError } = useFetchBrandsQuery();
    const [deleteBrand] = useDeleteBrandMutation();
    const [showForm, setShowForm] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            try {
                await deleteBrand(id).unwrap();
                toast.success("Brand deleted successfully.");
            } catch (error) {
                console.error("Failed to delete the brand:", error);
                toast.error("Failed to delete the brand. Please try again.");
            }
        }
    };

    const handleCreate = () => {
        setSelectedBrand(null); // Reset the selected brand for a new creation
        setShowForm(true);
    };

    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Brands</h3>
            <button
                onClick={handleCreate}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
                <FaEdit /> + Create Brand
            </button>

            <table className="w-full table-auto border-collapse mt-4">
                <thead>
                    <tr>
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Logo</th>
                        <th className="border px-4 py-2">Created At</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Loading...</td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">Failed to load brands.</td>
                        </tr>
                    ) : brands && brands.length > 0 ? (
                        brands.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">
                                    <img src={item.logo} alt="Brand" className="w-10 h-10" />
                                </td>
                                <td className="border px-4 py-2">{item.created_at}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No brands available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Brand Form Modal */}
            {showForm && (
                <BrandForm brandData={selectedBrand} onClose={closeForm} />
            )}
        </div>
    );
};

export default AllBrands;
