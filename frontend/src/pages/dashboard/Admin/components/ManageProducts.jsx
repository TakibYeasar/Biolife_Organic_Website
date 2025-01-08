import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { CreateProdCategory, CreateProduct } from "../../../../components";
import {
    useFetchCategoryQuery,
    useDeleteCategoryMutation,
    useManageProductsQuery,
    useApproveProductMutation,
    useEditApprovalMutation,
    useRemoveProductMutation,
} from "../../../../redux/features/products/productsApi";

const ManageProducts = () => {
    // Queries
    const { data: categories = [], isLoading: isLoadingCategories } = useFetchCategoryQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useManageProductsQuery();

    // Mutations
    const [approveProduct] = useApproveProductMutation();
    const [editApproval] = useEditApprovalMutation();
    const [removeProduct] = useRemoveProductMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(null);
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    // Handlers
    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleApproveProduct = async (productId) => {
        await approveProduct({ id: productId, status: "Approved" });
    };

    const handleDisapproveProduct = async (productId) => {
        await editApproval({ id: productId, status: "Pending" });
    };

    const handleDeleteProduct = async (productId) => {
        if (!productId) {
            console.error("Product ID is undefined.");
            return;
        }
        try {
            await removeProduct(productId);
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Add a slight delay for the toast to display
            console.log("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!categoryId) {
            console.error("Category ID is undefined.");
            return;
        }
        try {
            await deleteCategory(categoryId);
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Add a slight delay for the toast to display
            console.log("Category deleted successfully.");
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleUpdateCategory = (categoryId) => {
        setUpdateCategory(categoryId);
        setShowCreateCategory(true);
    };

    const filteredProducts = products.filter(
        (product) =>
            (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === "" || product.category === selectedCategory) &&
            (selectedStatus === "" || product.status === selectedStatus)
    );

    if (isLoadingCategories || isLoadingProducts) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-700">Manage Products & Categories</h1>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
                            onClick={() => setShowCreateProduct(true)}
                        >
                            + Create Product
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
                            onClick={() => setShowCreateCategory(true)}
                        >
                            + Create Category
                        </button>
                    </div>
                </div>

                {showCreateProduct && <CreateProduct onClose={() => setShowCreateProduct(false)} />}
                {showCreateCategory && (
                    <CreateProdCategory
                        onClose={() => setShowCreateCategory(false)}
                        updateCategory={updateCategory}
                    />
                )}

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search by name or category"
                            className="block w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>

                    <select
                        className="border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
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
                        className="border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Category Listings */}
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
                                    <td className="py-3 px-4 space-x-2 flex">
                                        <button
                                            className="bg-primary text-white px-3 py-1 rounded flex items-center gap-2"
                                            onClick={() => handleUpdateCategory(category.id)}
                                        >
                                            <FaEdit /> Update
                                        </button>

                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Product Listings */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product Listings</h2>
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Price</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={product.id} className="border-b">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{product.name}</td>
                                    <td className="py-3 px-4">{product.category}</td>
                                    <td className="py-3 px-4">${product.price}</td>
                                    <td className="py-3 px-4">{product.status}</td>
                                    <td className="py-3 px-4 space-x-2 flex">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2"
                                            onClick={() => handleApproveProduct(product.id)}
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-2"
                                            onClick={() => handleDisapproveProduct(product.id)}
                                        >
                                            <FaTimes /> Disapprove
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
