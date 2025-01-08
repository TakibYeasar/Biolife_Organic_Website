import React, { useState, useEffect } from "react";
import { useFetchCategoryQuery, useCreateProductMutation, useUpdateProductMutation } from "../../redux/features/products/productsApi";
import { toast } from "react-toastify";

const ProductForm = ({ onClose, productData }) => {
    const [formData, setFormData] = useState({
        title: "",
        categories: [], // Changed to array for multiple selections if needed
        main_image: null,
        images: [],
        price: "",
        old_price: "",
        description: "",
        additional_info: [],
    });

    const { data: availableCategories = [] } = useFetchCategoryQuery();
    const [createProduct, { isLoading: isCreating, error: createError }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();

    useEffect(() => {
        if (productData) {
            setFormData({
                ...productData,
                main_image: null, // Allow new uploads
                categories: productData.categories ? productData.categories.map(cat => cat.slug) : [], // Extract slugs if needed
            });
        }
    }, [productData]);


    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "images" ? [...e.target.files] : e.target.files[0],
        }));
    };

    const handleCategoryChange = (e) => {
        // Handle multiple selections if your backend supports it
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData(prev => ({ ...prev, categories: selectedOptions }));
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

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];

                if (key === "images" && value && value.length > 0) {
                    value.forEach(file => data.append("images", file));
                } else if (key === "main_image" && value instanceof File) {
                    data.append("main_image", value);
                } else if (key === "categories" && value && value.length > 0) {
                    value.forEach(cat => data.append("categories", cat)); // Append each category
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
            onClose();
        } catch (error) {
            console.error("Error submitting product:", error);
            const errorMessage = error?.data?.message || JSON.stringify(error?.data) || "Failed to submit product.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                {productData ? "Update Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Categories */}
                <select
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleCategoryChange}
                    className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    multiple // Add multiple attribute for multiple selections
                >
                    <option value="">Select Categories</option>
                    {availableCategories.map((category) => (
                        <option key={category.id} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Main Image */}
                <div className="mb-4">
                    <label htmlFor="main_image" className="block text-sm font-medium text-gray-700">Main Image</label>
                    <input
                        type="file"
                        id="main_image"
                        name="main_image"
                        onChange={handleFileChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                        required={!productData}
                    />
                    {formData.main_image && formData.main_image instanceof File && (
                        <img
                            src={URL.createObjectURL(formData.main_image)}
                            alt="Image Preview"
                            className="mt-2 h-16 w-16 object-cover"
                        />
                    )}

                </div>

                {/* Additional Images */}
                <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Additional Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm border rounded-md focus:ring-green-500 focus:border-green-500"
                        accept="image/*"
                    />
                    {/* Preview for selected images */}
                    {formData.images && formData.images.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {Array.from(formData.images).map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    className="h-16 w-16 object-cover rounded-md shadow-md"
                                />
                            ))}
                        </div>
                    )}
                </div>


                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Old Price */}
                <div className="mb-4">
                    <label htmlFor="old_price" className="block text-sm font-medium text-gray-700">Old Price</label>
                    <input
                        type="number"
                        id="old_price"
                        name="old_price"
                        value={formData.old_price}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Additional Info */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                    {formData.additional_info.map((info, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Question"
                                value={info.question}
                                onChange={(e) => handleInfoChange(index, "question", e.target.value)}
                                className="flex-1 mr-2 p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Answer"
                                value={info.answer}
                                onChange={(e) => handleInfoChange(index, "answer", e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveInfo(index)}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddInfo}
                        className="mt-2 text-green-500"
                    >
                        Add Info
                    </button>
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                    <button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className={`w-full p-2 rounded-md text-white ${isCreating || isUpdating ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isCreating || isUpdating ? 'Saving...' : productData ? 'Update Product' : 'Create Product'}
                    </button>
                </div>

                {/* Error Message */}
                {(createError || updateError) && (
                    <div className="text-red-500 text-sm mt-2">
                        Error: {createError?.data?.message || updateError?.data?.message || 'Something went wrong.'}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProductForm;
