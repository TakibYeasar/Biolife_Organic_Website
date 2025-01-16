import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import ProdCategoryForm from "./ProdCategoryForm";
import { ActionButton } from "../../../../../components";
import AllProductCategories from "./AllProductCategories";
import AllProducts from "./AllProducts";
import {
    useFetchProdCategoryQuery,
    useUpdateProdCategoryMutation,
    useDeleteProdCategoryMutation,
    useManageProductsQuery,
    useApproveProductMutation,
    useEditApprovalMutation,
} from "../../../../../redux/features/products/productsApi";

const ManageProducts = () => {
    // State management
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(null);
    const [editData, setEditData] = useState(null);

    // API queries and mutations
    const { data: categories = [], isLoading: isLoadingCategories } = useFetchProdCategoryQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useManageProductsQuery();
    const [updateProdCategory] = useUpdateProdCategoryMutation();
    const [deleteProdCategory] = useDeleteProdCategoryMutation();
    const [approveProduct] = useApproveProductMutation();
    const [editApproval] = useEditApprovalMutation();

    // Handlers
    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleEditCategory = async (categoryId) => {
        if (!categoryId) return;
        await updateProdCategory(categoryId);
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!categoryId) return;
        await deleteProdCategory(categoryId);
    };

    const handleApproveProduct = async (productId) => {
        if (!productId) return;
        await approveProduct(productId);
    };

    const handleEditApproval = async (productId) => {
        if (!productId) return;
        await editApproval(productId);
    };

    const closeModal = () => {
        setShowModal(null);
        setEditData(null);
    };

    if (isLoadingCategories || isLoadingProducts) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-700">Manage Products & Categories</h1>

                {/* Create Category Button */}
                <div className="flex justify-end mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
                        onClick={() => {
                            setEditData(null);
                            setShowModal("category");
                        }}
                    >
                        + Create Category
                    </button>
                </div>

                {/* Modals */}
                {showModal === "category" && (
                    <ProdCategoryForm onClose={closeModal} initialData={editData} />
                )}

                {/* Product Categories */}
                <AllProductCategories
                    categories={categories}
                    actions={(category) => (
                        <>
                            <ActionButton
                                label="Edit"
                                onClick={() => handleEditCategory(category)}
                                icon={<FaEdit />}
                                bgColor="bg-blue-500"
                                hoverColor="bg-blue-600"
                            />
                            <ActionButton
                                label="Delete"
                                onClick={() => handleDeleteCategory(category.id)}
                                icon={<FaTrash />}
                                bgColor="bg-red-500"
                                hoverColor="bg-red-600"
                            />
                        </>
                    )}
                    isLoading={isLoadingCategories}
                />

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search by name or category"
                            className="bg-white block w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>

                    <select
                        className="bg-white border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Filter by Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="bg-white border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Products */}
                <AllProducts
                    products={products}
                    categories={categories}
                    filteredProducts={products.filter(
                        (product) =>
                            (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
                            (selectedCategory === "" || product.category === selectedCategory) &&
                            (selectedStatus === "" || product.status === selectedStatus)
                    )}
                    actions={(product) => (
                        <>
                            {product.status === "Pending" ? (
                                <ActionButton
                                    label="Approve"
                                    onClick={() => handleApproveProduct(product.id)}
                                    icon={<FaCheck />}
                                    bgColor="bg-green-500"
                                    hoverColor="bg-green-600"
                                />
                            ) : (
                                <ActionButton
                                    label="Unapprove"
                                    onClick={() => handleEditApproval(product.id)}
                                    icon={<FaTimes />}
                                    bgColor="bg-yellow-500"
                                    hoverColor="bg-yellow-600"
                                />
                            )}
                            <ActionButton
                                label="Delete"
                                onClick={() => handleEditApproval(product.id)}
                                icon={<FaTrash />}
                                bgColor="bg-red-500"
                                hoverColor="bg-red-600"
                            />
                        </>
                    )}
                    isLoading={isLoadingProducts}
                />
            </div>
        </div>
    );
};

export default ManageProducts;
