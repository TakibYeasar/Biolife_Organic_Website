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
    useEditApprovalMutation,
    useDeleteProductMutation,
} from "../../../../../redux/features/products/productsApi";

const ManageProducts = () => {
    // State management
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(null);
    const [editData, setEditData] = useState(null);

    // API queries and mutations
    const { data: categoriesData, isLoading: isLoadingCategories } = useFetchProdCategoryQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useManageProductsQuery();
    const [updateProdCategory] = useUpdateProdCategoryMutation();
    const [deleteProdCategory] = useDeleteProdCategoryMutation();
    const [approveProduct] = useEditApprovalMutation();
    const [deleteProduct] = useDeleteProductMutation();

    // Handlers
    const handleSearch = (e) => setSearchQuery(e.target.value);

    const flattenCategories = (categories) => {
        const flatList = [];
        const traverse = (categoryList) => {
            categoryList.forEach((category) => {
                flatList.push(category);
                if (category.children?.length) traverse(category.children);
            });
        };
        traverse(categories);
        return flatList;
    };

    const categories = flattenCategories(categoriesData || []);

    const handleEditCategory = (category) => {
        setEditData(category);
        setShowModal("category");
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!categoryId) return;
        await deleteProdCategory({ id: categoryId });
    };

    const handleApproveProduct = async (productId) => {
        if (!productId) return;
        await approveProduct(productId).unwrap();
    };

    const handleDeleteProduct = async (productId) => {
        if (!productId) return;
        await deleteProduct(productId).unwrap();
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
                <h1 className="text-3xl font-semibold mb-6 text-gray-700">
                    Manage Products & Categories
                </h1>

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
                            {product.is_approved ? (
                                <ActionButton
                                    label="Unapprove"
                                    onClick={() => handleApproveProduct(product.id, false)}
                                    icon={<FaTimes />}
                                    bgColor="bg-yellow-500"
                                    hoverColor="bg-yellow-600"
                                />
                            ) : (
                                <ActionButton
                                    label="Approve"
                                    onClick={() => handleApproveProduct(product.id, true)}
                                    icon={<FaCheck />}
                                    bgColor="bg-green-500"
                                    hoverColor="bg-green-600"
                                />
                            )}
                            <ActionButton
                                label="Delete"
                                onClick={() => handleDeleteProduct(product.id)}
                                icon={<FaTrash />}
                                bgColor="bg-red-500"
                                hoverColor="bg-red-600"
                            />
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default ManageProducts;
