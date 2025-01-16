import React, { useState, useEffect } from 'react';
import { useFetchProdCategoryQuery, useCreateProdCategoryMutation, useUpdateProdCategoryMutation } from '../../../../../redux/features/products/productsApi';
import { toast } from 'react-toastify';

const ProdCategoryForm = ({ categoryData, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        parent: '',
        icon: null,
        image: null,
    });

    const { data: categories } = useFetchProdCategoryQuery();
    const [createCategory, { isLoading: isCreating, error: createError }] = useCreateProdCategoryMutation();
    const [updateCategory, { isLoading: isUpdating, error: updateError }] = useUpdateProdCategoryMutation();

    useEffect(() => {
        if (categoryData) {
            setFormData({
                name: categoryData.name,
                parent: categoryData.parent || '',
                icon: categoryData.icon || null,
                image: categoryData.image || null,
            });
        }
    }, [categoryData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        if (formData.parent) data.append('parent', formData.parent);
        if (formData.icon) data.append('icon', formData.icon);
        if (formData.image) data.append('image', formData.image);

        try {
            if (categoryData) {
                await updateCategory({ id: categoryData.id, data }).unwrap();
                toast.success('Category updated successfully!');
            } else {
                await createCategory(data).unwrap();
                toast.success('Category created successfully!');
            }

            setFormData({ name: '', parent: '', icon: null, image: null });
            if (onClose) onClose();
            window.location.reload();
        } catch (err) {
            toast.error(categoryData ? 'Failed to update category.' : 'Failed to create category.');
        }
    };

    return (
        <div className="relative max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            {/* Close Button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-2xl font-semibold mb-4">{categoryData ? 'Update Category' : 'Create Category'}</h2>

            <form onSubmit={handleSubmit}>
                {/* Category Name */}
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Parent Category */}
                <div className="mb-6">
                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                        Parent Category
                    </label>
                    <select
                        id="parent"
                        name="parent"
                        value={formData.parent}
                        onChange={handleChange}
                        className="bg-white mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">None</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Icon Upload */}
                <div className="mb-6">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon
                    </label>
                    <input
                        type="file"
                        id="icon"
                        name="icon"
                        onChange={handleFileChange}
                        className="mt-2 block w-full py-2 px-3 border border-gray-300 rounded-md"
                    />
                    {formData.icon && (
                        <img
                            src={URL.createObjectURL(formData.icon)}
                            alt="Icon Preview"
                            className="mt-3 h-16 w-16 object-cover border border-gray-300 rounded-md"
                        />
                    )}
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-2 block w-full py-2 px-3 border border-gray-300 rounded-md"
                    />
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Image Preview"
                            className="mt-3 h-16 w-16 object-cover border border-gray-300 rounded-md"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className={`w-full py-3 px-4 rounded-md text-white ${isCreating || isUpdating ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isCreating || isUpdating ? 'Saving...' : categoryData ? 'Update Category' : 'Create Category'}
                </button>

                {/* Error Message */}
                {(createError || updateError) && (
                    <p className="mt-4 text-sm text-red-500">
                        Error: {createError?.data?.message || updateError?.data?.message || 'Something went wrong.'}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ProdCategoryForm;
