import React, { useState } from "react";
import {
    useFetchCategoryQuery,
    useCreateProductMutation,
} from "../../redux/features/products/productsApi";

const CreateProduct = ({ onClose }) => {
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

    // Fetch categories using RTK Query
    const { data: availableCategories = [] } = useFetchCategoryQuery();
    const [createProduct] = useCreateProductMutation();

    // Handle text and number input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "images" ? [...prev.images, ...files] : files[0],
        }));
    };

    // Handle multi-select dropdown changes
    const handleMultiSelectChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setFormData((prev) => ({ ...prev, categories: selectedValues }));
    };

    // Add an additional info entry
    const handleAddInfo = () => {
        setFormData((prev) => ({
            ...prev,
            additional_info: [...prev.additional_info, { question: "", answer: "" }],
        }));
    };

    // Update additional info fields
    const handleInfoChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedInfo = [...prev.additional_info];
            updatedInfo[index][field] = value;
            return { ...prev, additional_info: updatedInfo };
        });
    };

    // Remove an additional info entry
    const handleRemoveInfo = (index) => {
        setFormData((prev) => ({
            ...prev,
            additional_info: prev.additional_info.filter((_, i) => i !== index),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct(formData).unwrap();
            onClose(); // Close the form on success
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Create Product
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Product Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Product Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Categories */}
                <div className="mb-4">
                    <label
                        htmlFor="categories"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Categories
                    </label>
                    <select
                        id="categories"
                        name="categories"
                        multiple
                        value={formData.categories}
                        onChange={handleMultiSelectChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    >
                        {availableCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Main Image */}
                <div className="mb-4">
                    <label
                        htmlFor="main_image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Main Image
                    </label>
                    <input
                        type="file"
                        id="main_image"
                        name="main_image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm"
                    />
                </div>

                {/* Additional Images */}
                <div className="mb-4">
                    <label
                        htmlFor="images"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Additional Images
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Old Price */}
                <div className="mb-4">
                    <label
                        htmlFor="old_price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Old Price
                    </label>
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
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                </div>

                {/* Additional Information */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Additional Information
                    </label>
                    {formData.additional_info.map((info, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Question"
                                value={info.question}
                                onChange={(e) =>
                                    handleInfoChange(index, "question", e.target.value)
                                }
                                className="flex-1 mr-2 p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Answer"
                                value={info.answer}
                                onChange={(e) =>
                                    handleInfoChange(index, "answer", e.target.value)
                                }
                                className="flex-1 mr-2 p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveInfo(index)}
                                className="p-2 text-sm text-white bg-red-500 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddInfo}
                        className="mt-2 text-sm bg-green-500 text-white py-1 px-4 rounded-md"
                    >
                        Add Info
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
