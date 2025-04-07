import React, { useState, useEffect } from "react";
import {
    useFetchProdCategoryQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
} from "../../../store/features/products/productsApi";
import { toast } from "react-toastify";

const ProductForm = ({ productData, onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        categories: [],
        main_image: null,
        images: [],
        price: "",
        old_price: "",
        description: "",
        additional_info: [],
    });

    const { data: categoriesData } = useFetchProdCategoryQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const flattenCategories = (categories) => {
        const flatList = [];
        const traverse = (cat_list) => {
            cat_list.forEach((category) => {
                flatList.push(category);
                if (category.children?.length) traverse(category.children);
            });
        };
        traverse(categories);
        return flatList;
    };

    const categories = flattenCategories(categoriesData || []);

    useEffect(() => {
        if (productData) {
            setFormData({
                ...productData,
                main_image: null,
                categories: productData.categories ? productData.categories.map((cat) => cat.id) : [],
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "images") {
            setFormData((prev) => ({ ...prev, images: Array.from(files) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleMultiSelectChange = (e, fieldName) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, [fieldName]: selectedValues }));
    };

    const handleAddInfo = () => {
        setFormData((prev) => ({
            ...prev,
            additional_info: [...prev.additional_info, { question: "", answer: "" }],
        }));
    };

    const handleInfoChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedInfo = [...prev.additional_info];
            updatedInfo[index][field] = value;
            return { ...prev, additional_info: updatedInfo };
        });
    };

    const handleRemoveInfo = (index) => {
        setFormData((prev) => ({
            ...prev,
            additional_info: prev.additional_info.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Append data to FormData
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];

                if (key === "images" && value && value.length > 0) {
                    value.forEach((file) => data.append("images", file));
                } else if (key === "main_image" && value instanceof File) {
                    data.append("main_image", value);
                } else if (key === "categories" && value && value.length > 0) {
                    value.forEach((cat) => data.append("categories", cat));
                } else if (key === "additional_info") {
                    data.append(key, JSON.stringify(value));
                } else if (value !== "" && value !== null && value !== undefined) {
                    data.append(key, value);
                } else if (key === "old_price") {
                    data.append(key, value || 0); // Use 0 if empty/null/undefined
                }
            }
        }

        try {
            if (productData) {
                await updateProduct({ id: productData.id, data }).unwrap();
                toast.success("Product updated successfully!");
            } else {
                await createProduct(data).unwrap();
                toast.success("Product created successfully!");
            }
            onSuccess && onSuccess();
            onClose();
        } catch (error) {
            console.error("Error submitting product:", error);
            const errorMessage = error?.data?.message || JSON.stringify(error?.data) || "Failed to submit product.";
            toast.error(errorMessage);
        }
    };

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

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                {productData ? "Update Product" : "Create Product"}
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

                {/* Main Image */}
                <FormField
                    label="Main Image"
                    type="file"
                    name="main_image"
                    onChange={handleFileChange}
                    preview={formData.main_image && URL.createObjectURL(formData.main_image)}
                    className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />

                {/* Additional Images */}
                <div>
                    <FormField
                        label="Additional Images"
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        isMultiple
                        className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.images && formData.images.length > 0 && (
                        <div className="mt-2 flex gap-4">
                            {formData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-24 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        label="Price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />

                    <FormField
                        label="Old Price"
                        type="number"
                        name="old_price"
                        value={formData.old_price}
                        onChange={handleChange}
                        className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

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

                {/* Additional Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Info</h3>
                    {formData.additional_info.map((info, index) => (
                        <div key={index} className="w-full flex gap-4 mb-4">
                            <FormField
                                label="Question"
                                type="text"
                                name={`question_${index}`}
                                value={info.question}
                                onChange={(e) => handleInfoChange(index, "question", e.target.value)}
                                className="bg-gray-100 focus:ring-2 focus:ring-blue-500 flex-1"
                            />
                            <FormField
                                label="Answer"
                                type="text"
                                name={`answer_${index}`}
                                value={info.answer}
                                onChange={(e) => handleInfoChange(index, "answer", e.target.value)}
                                className="bg-gray-100 focus:ring-2 focus:ring-blue-500 flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveInfo(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddInfo}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Add Info
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${isCreating || isUpdating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        }`}
                    disabled={isCreating || isUpdating}
                >
                    {isCreating || isUpdating ? "Submitting..." : productData ? "Update Product" : "Create Product"}
                </button>
            </form>
        </div>
    );
};

const FormField = ({ label, type, name, value, onChange, options, isMultiple, preview, className }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-lg font-semibold text-gray-700 mb-2">
                {label}
            </label>
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    multiple={isMultiple}
                    className={`py-2 px-3 rounded-md ${className}`}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "file" ? (
                <>
                    <input
                        type="file"
                        name={name}
                        onChange={onChange}
                        accept="image/*"
                        className={`py-2 px-3 rounded-md ${className}`}
                        multiple={isMultiple}
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md" />}
                </>
            ) : type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`py-2 px-3 rounded-md ${className}`}
                    rows={4}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`py-2 px-3 rounded-md ${className}`}
                />
            )}
        </div>
    );
};

export default ProductForm;
