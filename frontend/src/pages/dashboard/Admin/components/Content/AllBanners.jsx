import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import {
    useFetchBannersQuery,
    useDeleteBannerMutation,
} from '../../../../../redux/features/core/coreApi';
import BannersForm from './BannersForm';
import { toast } from 'react-toastify';

const AllBanners = () => {
    const { data: banners, isLoading, isError } = useFetchBannersQuery();
    const [deleteBanner] = useDeleteBannerMutation();
    const [showForm, setShowForm] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null); // For editing banners

    // Handle delete banner
    const handleDelete = async (id) => {
        try {
            await deleteBanner(id).unwrap();
            toast.success('Banner deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete the banner.');
        }
    };

    // Toggle form modal
    const handleFormToggle = (banner = null) => {
        setCurrentBanner(banner);
        setShowForm(!showForm);
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Banners</h3>
            <button
                onClick={() => handleFormToggle()}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 mb-4"
            >
                <FaEdit /> + Create Banner
            </button>

            {isLoading ? (
                <p>Loading banners...</p>
            ) : isError ? (
                <p>Failed to load banners.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Subtitle</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners && banners.length > 0 ? (
                            banners.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <img src={item.image} alt="Banner Image" className="w-10 h-10" />
                                    </td>
                                    <td className="border px-4 py-2">{item.title}</td>
                                    <td className="border px-4 py-2">{item.subtitle}</td>
                                    <td className="border px-4 py-2">{item.description}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleFormToggle(item)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
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
                                <td colSpan="6" className="text-center py-4">
                                    No banners available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Form Modal */}
            {showForm && (
                <BannersForm
                    bannerData={currentBanner}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default AllBanners;
