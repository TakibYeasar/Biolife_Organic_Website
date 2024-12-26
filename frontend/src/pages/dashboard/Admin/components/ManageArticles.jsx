import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

const ManageArticles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [activeTab, setActiveTab] = useState("articles"); // 'articles' or 'categories'
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
                <div className="space-x-4">
                    <button
                        className={`px-4 py-2 ${activeTab === "articles" ? "bg-blue-500 text-white" : "bg-gray-200"
                            } rounded`}
                        onClick={() => setActiveTab("articles")}
                    >
                        Article Listings
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "categories" ? "bg-blue-500 text-white" : "bg-gray-200"
                            } rounded`}
                        onClick={() => setActiveTab("categories")}
                    >
                        Category Listings
                    </button>
                </div>

                {activeTab === "articles" && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowCreateArticle(true)}
                    >
                        + Create Article
                    </button>
                )}
                {activeTab === "categories" && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowCreateCategory(true)}
                    >
                        + Create Category
                    </button>
                )}
            </div>

            {showCreateArticle && (
                <div className="p-4 bg-gray-100 rounded">Create Article Form Here</div>
            )}
            {showCreateCategory && (
                <div className="p-4 bg-gray-100 rounded">Create Category Form Here</div>
            )}

            {activeTab === "articles" && (
                <>
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
                </>
            )}

            {activeTab === "categories" && (
                <div>
                    <ul>
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className="flex justify-between items-center border-b py-2"
                            >
                                <span>{category.name}</span>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ManageArticles;
