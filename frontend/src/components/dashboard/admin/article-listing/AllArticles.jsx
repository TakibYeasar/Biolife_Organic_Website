import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// Article Table Component
const AllArticles = ({
    articles,
    categories,
    filteredArticles,
    actions,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
}) => {
    if (isLoading) return <p className="text-gray-600">Loading articles...</p>;

    return (
        <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Article Listings</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                {/* Search Bar */}
                <div className="flex items-center border rounded-md w-full md:w-1/2 bg-white border-gray-300 hover:border-indigo-500 focus-within:border-indigo-500 transition-all">
                    <input
                        type="text"
                        placeholder="Search by title or category"
                        className="bg-white px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 rounded-r-md transition duration-200">
                        <FaSearch />
                    </button>
                </div>


                {/* Category Filter */}
                <select
                    className="border px-4 py-2 rounded-md bg-gray-50 text-gray-700 border-gray-300 focus:ring-2 focus:ring-indigo-500"
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

                {/* Status Filter */}
                <select
                    className="border px-4 py-2 rounded-md bg-gray-50 text-gray-700 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Published">Published</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>


            {/* Article Table */}
            <table className="min-w-full bg-white border rounded-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">#</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Title</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Category</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Author</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Status</th>
                        <th className="py-3 px-4 text-left text-sm text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArticles.map((article, index) => (
                        <tr key={article.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                            <td className="py-3 px-4 text-gray-700">{article.title}</td>
                            <td className="py-3 px-4 text-gray-700">{article.category}</td>
                            <td className="py-3 px-4 text-gray-700">{article.author_name}</td>
                            <td className="py-3 px-4 text-gray-700">{article.status}</td>
                            <td className="py-3 px-4 flex gap-2">
                                {actions(article)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllArticles;
