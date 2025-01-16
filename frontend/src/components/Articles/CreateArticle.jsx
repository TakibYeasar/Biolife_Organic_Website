'use client';

import React, { useState, useEffect } from "react";
import {
    useFetchArticleCategoriesQuery,
    useFetchArticleTagsQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
} from "../../redux/features/articles/articlesApi";
import { toast } from "react-toastify";

const ArticleForm = ({ articleData, onSuccess }) => {
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
                tags: articleData.tags.map((tag) => tag.id),
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
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
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
                />

                {/* Image */}
                <FormField
                    label="Image"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    preview={formData.image && URL.createObjectURL(formData.image)}
                />

                {/* Description */}
                <FormField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                {/* Author Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        label="Author Name"
                        type="text"
                        name="author_name"
                        value={formData.author_name}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Author Profession"
                        type="text"
                        name="author_profession"
                        value={formData.author_profession}
                        onChange={handleChange}
                    />
                </div>

                {/* Tags */}
                <FormField
                    label="Tags"
                    type="select"
                    name="tags"
                    value={formData.tags}
                    onChange={(e) => handleMultiSelectChange(e, "tags")}
                    options={tags.map((tag) => ({ value: tag.id, label: tag.title }))}
                    isMultiple
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${isCreating || isUpdating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
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
}) => (
    <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
        {type === "textarea" ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required={required}
                rows="4"
            />
        ) : type === "select" ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                multiple={isMultiple}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value} className="text-gray-700">
                        {label}
                    </option>
                ))}
            </select>
        ) : (
            <>
                <input
                    type={type}
                    name={name}
                    value={type === "file" ? undefined : value}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required={required}
                />
                {preview && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-20 w-20 rounded-md object-cover shadow-md"
                        />
                    </div>
                )}
            </>
        )}
    </div>
);


export default ArticleForm;
