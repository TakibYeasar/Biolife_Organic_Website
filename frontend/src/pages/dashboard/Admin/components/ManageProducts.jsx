import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { CreateProdCategory, CreateProduct } from "../../../../components";
import {
    useFetchCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchAllProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from "../../../../redux/features/products/productsApi";

const ManageProducts = () => {
    // Queries
    const { data: categories = [], isLoading: isLoadingCategories } = useFetchCategoryQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useFetchAllProductsQuery();

    // Mutations
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    // Local States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);

    // Handlers
    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleApproveProduct = async (productId) => {
        await updateProduct({ id: productId, status: "Approved" });
    };

    const handleDisapproveProduct = async (productId) => {
        await updateProduct({ id: productId, status: "Pending" });
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProduct(productId);
    };

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId);
    };

    const filteredProducts = products?.filter(
        (product) =>
            (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === "" || product.category === selectedCategory) &&
            (selectedStatus === "" || product.status === selectedStatus)
    ) || [];


    // Loading state
    if (isLoadingCategories || isLoadingProducts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Manage Products & Categories</h1>

            {/* Create buttons */}
            <div className="flex justify-between items-center mb-6">
                <div className="space-x-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowCreateProduct(true)}
                    >
                        + Create Product
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowCreateCategory(true)}
                    >
                        + Create Category
                    </button>
                </div>
            </div>

            {showCreateProduct && (
                <CreateProduct onClose={() => setShowCreateProduct(false)} />
            )}
            {showCreateCategory && (
                <CreateProdCategory onClose={() => setShowCreateCategory(false)} />
            )}

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center border rounded overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search by name or category"
                        className="px-4 py-2 w-64 focus:outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="bg-blue-500 text-white px-4">
                        <FaSearch />
                    </button>
                </div>

                <select
                    className="border px-4 py-2 rounded"
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
                    className="border px-4 py-2 rounded"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            {/* Categories */}
            <div>
                <h2 className="text-xl font-bold mb-4">Category Listings</h2>
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 text-left">#</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Slug</th>
                            <th className="py-2 px-4 text-left">Image</th>
                            <th className="py-2 px-4 text-left">Products</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-b">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{category.name}</td>
                                <td className="py-2 px-4">{category.slug}</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4">{category.product_count}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
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

            {/* Products */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Product Listings</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Old Price</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="border py-4 px-4">{index + 1}</td>
                                <td className="border px-4 py-2">{product.title}</td>
                                <td className="border px-4 py-2">{product.categories}</td>
                                <td className="border px-4 py-2">${product.price}</td>
                                <td className="border px-4 py-2">{product.old_price}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 text-sm rounded ${product.status === "Approved"
                                                ? "bg-green-200 text-green-700"
                                                : "bg-yellow-200 text-yellow-700"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    {product.status === "Pending" ? (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleApproveProduct(product.id)}
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDisapproveProduct(product.id)}
                                        >
                                            <FaTimes /> Disapprove
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
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
    );
};

export default ManageProducts;
