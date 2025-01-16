import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { CreateArticleCategory, CreateArticle } from "../../../../components";
import {
    useFetchArticleCategoriesQuery,
    useDeleteArticleCategoryMutation,
    useFetchArticlesQuery,
    useApproveArticleMutation,
    useRemoveArticleMutation,
} from "../../../../redux/features/articles/articlesApi";

const ManageArticles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showCreateArticle, setShowCreateArticle] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data: categories = [], isLoading: categoriesLoading } = useFetchArticleCategoriesQuery();
    const { data: articles = [], isLoading: articlesLoading } = useFetchArticlesQuery();
    const [deleteCategory] = useDeleteArticleCategoryMutation();
    const [approveArticle] = useApproveArticleMutation();
    const [removeArticle] = useRemoveArticleMutation();

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const filteredArticles = articles.filter(
        (article) =>
            (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === "" || article.category === selectedCategory) &&
            (selectedStatus === "" || article.status === selectedStatus)
    );

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId);
    };

    const handleApproveArticle = async (articleId) => {
        await approveArticle(articleId);
    };

    const handleRemoveArticle = async (articleId) => {
        await removeArticle(articleId);
    };

    const handleEditCategory = (category) => {
        setEditData(category);
        setShowCreateCategory(true);
    };

    const handleEditArticle = (article) => {
        setEditData(article);
        setShowCreateArticle(true);
    };

    return (
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Articles & Categories</h1>

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => {
                        setEditData(null);
                        setShowCreateArticle(true);
                    }}
                >
                    + Create Article
                </button>
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => {
                        setEditData(null);
                        setShowCreateCategory(true);
                    }}
                >
                    + Create Category
                </button>
            </div>

            {showCreateArticle && (
                <CreateArticle
                    onClose={() => setShowCreateArticle(false)}
                    initialData={editData}
                />
            )}

            {showCreateCategory && (
                <CreateArticleCategory
                    onClose={() => setShowCreateCategory(false)}
                    initialData={editData}
                />
            )}

            <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Listings</h2>
                {categoriesLoading ? (
                    <p className="text-gray-600">Loading categories...</p>
                ) : (
                    <table className="min-w-full bg-white border rounded-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm text-gray-600">#</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-600">Name</th>
                                <th className="py-3 px-4 text-left text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                    <td className="py-3 px-4 text-gray-700">{category.name}</td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button
                                            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => handleEditCategory(category)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Article Listings</h2>

                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div className="flex items-center border rounded-md overflow-hidden w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search by title or category"
                            className="px-4 py-2 w-full focus:outline-none"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button className="bg-blue-500 text-white px-4">
                            <FaSearch />
                        </button>
                    </div>

                    <select
                        className="border px-4 py-2 rounded-md"
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
                        className="border px-4 py-2 rounded-md"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Published">Published</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {articlesLoading ? (
                    <p className="text-gray-600">Loading articles...</p>
                ) : (
                    <table className="w-full border-collapse bg-white rounded-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2 text-gray-600 text-left">Title</th>
                                <th className="border px-4 py-2 text-gray-600 text-left">Category</th>
                                <th className="border px-4 py-2 text-gray-600 text-left">Author</th>
                                <th className="border px-4 py-2 text-gray-600 text-left">Status</th>
                                <th className="border px-4 py-2 text-gray-600 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArticles.map((article) => (
                                <tr key={article.id} className="border-b hover:bg-gray-50">
                                    <td className="border px-4 py-2 text-gray-700">{article.title}</td>
                                    <td className="border px-4 py-2 text-gray-700">{article.category}</td>
                                    <td className="border px-4 py-2 text-gray-700">{article.author}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-sm rounded-md ${article.status === "Published"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-yellow-200 text-yellow-700"
                                                }`}
                                        >
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 flex gap-2">
                                        <button
                                            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => handleEditArticle(article)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        {article.status === "Pending" ? (
                                            <button
                                                className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                onClick={() => handleApproveArticle(article.id)}
                                            >
                                                <FaCheck /> Publish
                                            </button>
                                        ) : (
                                            <button
                                                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                                onClick={() => handleRemoveArticle(article.id)}
                                            >
                                                <FaTimes /> Unpublish
                                            </button>
                                        )}
                                        <button
                                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => handleRemoveArticle(article.id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageArticles;
