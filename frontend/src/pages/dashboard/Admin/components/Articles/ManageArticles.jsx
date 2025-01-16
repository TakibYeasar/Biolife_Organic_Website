import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import {
    useFetchArticleCategoriesQuery,
    useDeleteArticleCategoryMutation,
    useFetchArticlesQuery,
    useApproveArticleMutation,
    useRemoveArticleMutation,
} from "../../../../../redux/features/articles/articlesApi";
import { ActionButton } from "../../../../../components";
import ArticleCategoryForm from "./ArticleCategoryForm";
import ArticleForm from "./ArticleForm";
import AllArticles from "./AllArticles";
import AllArticleCategories from "./AllArticleCategories";

const ManageArticles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showModal, setShowModal] = useState(null);  // track which modal to show
    const [editData, setEditData] = useState(null);

    const { data: categories = [], isLoading: categoriesLoading } = useFetchArticleCategoriesQuery();
    const { data: articles = [], isLoading: articlesLoading } = useFetchArticlesQuery();
    const [deleteCategory] = useDeleteArticleCategoryMutation();
    const [approveArticle] = useApproveArticleMutation();
    const [removeArticle] = useRemoveArticleMutation();

    const filteredArticles = articles.filter(
        (article) =>
            (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === "" || article.category === selectedCategory) &&
            (selectedStatus === "" || article.status === selectedStatus)
    );

    const handleDeleteCategory = async (categoryId) => await deleteCategory(categoryId);
    const handleApproveArticle = async (articleId) => await approveArticle(articleId);
    const handleRemoveArticle = async (articleId) => await removeArticle(articleId);

    const handleEditCategory = (category) => {
        setEditData(category);
        setShowModal("category");
    };

    const handleEditArticle = (article) => {
        setEditData(article);
        setShowModal("article");
    };

    const closeModal = () => {
        setShowModal(null);
        setEditData(null);
    };

    return (
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Articles & Categories</h1>

            {/* Create Article & Category Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <button
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    onClick={() => {
                        setEditData(null);
                        setShowModal("article");  // show create article modal
                    }}
                >
                    <FaEdit /> + Create Article
                </button>
                <button
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    onClick={() => {
                        setEditData(null);
                        setShowModal("category");  // show create category modal
                    }}
                >
                    <FaEdit /> + Create Category
                </button>
            </div>

            {/* Modal for Create Article or Category */}
            {showModal === "article" && (
                <ArticleForm onClose={closeModal} initialData={editData} />
            )}
            {showModal === "category" && (
                <ArticleCategoryForm onClose={closeModal} initialData={editData} />
            )}

            {/* Category Listings */}
            <AllArticleCategories
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
                isLoading={categoriesLoading}
            />

            {/* Article Listings */}
            <AllArticles
                articles={articles}
                categories={categories}
                filteredArticles={filteredArticles}
                actions={(article) => (
                    <>
                        <ActionButton
                            label="Edit"
                            onClick={() => handleEditArticle(article)}
                            icon={<FaEdit />}
                            bgColor="bg-blue-500"
                            hoverColor="bg-blue-600"
                        />
                        {article.status === "Pending" ? (
                            <ActionButton
                                label="Publish"
                                onClick={() => handleApproveArticle(article.id)}
                                icon={<FaCheck />}
                                bgColor="bg-green-500"
                                hoverColor="bg-green-600"
                            />
                        ) : (
                            <ActionButton
                                label="Unpublish"
                                onClick={() => handleRemoveArticle(article.id)}
                                icon={<FaTimes />}
                                bgColor="bg-yellow-500"
                                hoverColor="bg-yellow-600"
                            />
                        )}
                        <ActionButton
                            label="Delete"
                            onClick={() => handleRemoveArticle(article.id)}
                            icon={<FaTrash />}
                            bgColor="bg-red-500"
                            hoverColor="bg-red-600"
                        />
                    </>
                )}
                isLoading={articlesLoading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />
        </div>
    );
};

export default ManageArticles;
