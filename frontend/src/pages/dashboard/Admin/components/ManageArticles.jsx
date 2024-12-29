import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

const ManageArticles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showCreateArticle, setShowCreateArticle] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);

    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "Benefits of Organic Farming",
            category: "Agriculture",
            author: "John Doe",
            status: "Pending",
        },
        {
            id: 2,
            title: "Advancements in Renewable Energy",
            category: "Environment",
            author: "Jane Smith",
            status: "Published",
        },
    ]);

    const [categories, setCategories] = useState([
        { id: 1, name: "Agriculture" },
        { id: 2, name: "Environment" },
        { id: 3, name: "Technology" },
    ]);

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const filteredArticles = articles.filter(
        (article) =>
            (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === "" || article.category === selectedCategory) &&
            (selectedStatus === "" || article.status === selectedStatus)
    );

    const handlePublishArticle = (articleId) => {
        setArticles(
            articles.map((article) =>
                article.id === articleId ? { ...article, status: "Published" } : article
            )
        );
    };

    const handleUnpublishArticle = (articleId) => {
        setArticles(
            articles.map((article) =>
                article.id === articleId ? { ...article, status: "Pending" } : article
            )
        );
    };

    const handleDeleteArticle = (articleId) =>
        setArticles(articles.filter((article) => article.id !== articleId));

    const handleDeleteCategory = (categoryId) =>
        setCategories(categories.filter((category) => category.id !== categoryId));

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Manage Articles & Categories</h1>

            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreateArticle(true)}
                >
                    + Create Article
                </button>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreateCategory(true)}
                >
                    + Create Category
                </button>
            </div>

            {showCreateArticle && (
                <div className="p-4 bg-gray-100 rounded mb-4">Create Article Form Here</div>
            )}

            {showCreateCategory && (
                <div className="p-4 bg-gray-100 rounded mb-4">Create Category Form Here</div>
            )}

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Category Listings</h2>
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

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Article Listings</h2>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center border rounded overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search by title or category"
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
                        <option value="Published">Published</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Author</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map((article) => (
                            <tr key={article.id}>
                                <td className="border px-4 py-2">{article.title}</td>
                                <td className="border px-4 py-2">{article.category}</td>
                                <td className="border px-4 py-2">{article.author}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 text-sm rounded ${article.status === "Published"
                                            ? "bg-green-200 text-green-700"
                                            : "bg-yellow-200 text-yellow-700"
                                            }`}
                                    >
                                        {article.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    {article.status === "Pending" ? (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => handlePublishArticle(article.id)}
                                        >
                                            <FaCheck /> Publish
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleUnpublishArticle(article.id)}
                                        >
                                            <FaTimes /> Unpublish
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDeleteArticle(article.id)}
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

export default ManageArticles;
