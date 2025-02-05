import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
    useFetchFeaturedQuery,
    useDeleteFeaturedMutation,
} from '../../../../store/features/core/coreApi';
import FeaturedItemForm from './FeaturedItemForm';

const AllFeatureds = () => {
    const { data: featureds, isLoading, error } = useFetchFeaturedQuery();
    const [deleteFeatured] = useDeleteFeaturedMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeatured, setSelectedFeatured] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this featured item?")) {
            try {
                await deleteFeatured(id).unwrap();
                alert("Featured item deleted successfully.");
            } catch (error) {
                console.error("Failed to delete featured item:", error);
                alert("Failed to delete the featured item.");
            }
        }
    };

    const handleCreateOrEdit = (featured = null) => {
        setSelectedFeatured(featured);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedFeatured(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Featured Items</h3>
            <button
                onClick={() => handleCreateOrEdit()}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 mb-4"
            >
                <FaEdit /> + Create Featured
            </button>
            {isLoading ? (
                <p>Loading featured items...</p>
            ) : error ? (
                <p>Error fetching featured items.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Subtitle</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {featureds && featureds.length > 0 ? (
                            featureds.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <img
                                            src={item.image}
                                            alt="Featured Image"
                                            className="w-10 h-10 object-cover"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{item.title}</td>
                                    <td className="border px-4 py-2">{item.subtitle}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleCreateOrEdit(item)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No featured items available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Modal for Create/Edit */}
            {isModalOpen && (
                <FeaturedItemForm
                    featuredData={selectedFeatured}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AllFeatureds;
