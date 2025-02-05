'use client';

import React, { useState, useEffect } from "react";
import {
    useFetchArticleCategoriesQuery,
    useFetchArticleTagsQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
} from "../../../../store/features/articles/articlesApi";
import { toast } from "react-toastify";

const ArticleForm = ({ articleData, onSuccess, onClose }) => {
    const initialState = {
        title: "",
        categories: [],
        image: null,
        description: "",
        author_name: "",
        author_profession: "",
        tags: [],
    };

    const [formData, setFormData] = useState(initialState);

    const { data: categories = [], isLoading: isCategoriesLoading } = useFetchArticleCategoriesQuery();
    const { data: tags = [], isLoading: isTagsLoading } = useFetchArticleTagsQuery();
    const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
    const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();

    useEffect(() => {
        if (articleData) {
            setFormData({
                ...articleData,
                categories: articleData.categories.map((cat) => cat.id),
                tags: articleData.tags.map((tag) => tag.title),
            });
        }
    }, [articleData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleMultiSelectChange = (e, fieldName) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, [fieldName]: selectedValues }));
    };

    const handleTagsChange = (e) => {
        const tagInput = e.target.value;
        const tagsArray = tagInput.split(",").map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags: tagsArray }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => data.append(key, item));
            } else if (key === "image" && value) {
                data.append(key, value);
            } else {
                data.append(key, value);
            }
        });

        try {
            if (articleData) {
                await updateArticle({ id: articleData.id, data }).unwrap();
                toast.success("Article updated successfully!");
            } else {
                await createArticle(data).unwrap();
                toast.success("Article created successfully!");
            }
            onSuccess && onSuccess();
        } catch (err) {
            toast.error("Error submitting article!");
            console.error(err);
        }
    };

    if (isCategoriesLoading || isTagsLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-lg shadow-lg relative">
            <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                onClick={onClose}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                {articleData ? "Update Article" : "Create Article"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <FormField
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Categories */}
                <FormField
                    label="Categories"
                    type="select"
                    name="categories"
                    value={formData.categories}
                    onChange={(e) => handleMultiSelectChange(e, "categories")}
                    options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                    isMultiple
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Image */}
                <FormField
                    label="Image"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    preview={formData.image && URL.createObjectURL(formData.image)}
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Description */}
                <FormField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Author Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        label="Author Name"
                        type="text"
                        name="author_name"
                        value={formData.author_name}
                        onChange={handleChange}
                        className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <FormField
                        label="Author Profession"
                        type="text"
                        name="author_profession"
                        value={formData.author_profession}
                        onChange={handleChange}
                        className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Tags */}
                <FormField
                    label="Tags (comma-separated)"
                    type="text"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleTagsChange}
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${isCreating || isUpdating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        }`}
                    disabled={isCreating || isUpdating}
                >
                    {isCreating || isUpdating ? "Submitting..." : articleData ? "Update Article" : "Create Article"}
                </button>
            </form>
        </div>
    );
};

// Reusable FormField Component
const FormField = ({
    label,
    type,
    name,
    value,
    onChange,
    options,
    isMultiple,
    preview,
    required,
    className,
}) => (
    <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800 mb-2">{label}</label>
        {type === "textarea" ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
                required={required}
                rows="4"
            />
        ) : type === "select" ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                multiple={isMultiple}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : type === "file" ? (
            <div>
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
                    accept="image/*"
                />
                {preview && (
                    <div className="mt-4">
                        <img src={preview} alt="Image Preview" className="w-full h-auto rounded-lg" />
                    </div>
                )}
            </div>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
                required={required}
            />
        )}
    </div>
);

export default ArticleForm;
