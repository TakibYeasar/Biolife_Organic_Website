import React, { useState } from 'react';
import { useCreateCategoryMutation } from '../../redux/features/products/productsApi';

const CreateProdCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        parent: '',
        icon: null,
        image: null,
    });

    const [createCategory, { isLoading, isError, isSuccess, error }] = useCreateCategoryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct FormData for file uploads
        const data = new FormData();
        data.append('name', formData.name);
        if (formData.parent) data.append('parent', formData.parent);
        if (formData.icon) data.append('icon', formData.icon);
        if (formData.image) data.append('image', formData.image);

        try {
            await createCategory(data).unwrap();
            alert('Category created successfully!');
            setFormData({ name: '', parent: '', icon: null, image: null }); // Reset form
        } catch (err) {
            console.error('Failed to create category:', err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                        Parent Category
                    </label>
                    <input
                        type="text"
                        id="parent"
                        name="parent"
                        value={formData.parent}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon
                    </label>
                    <input
                        type="file"
                        id="icon"
                        name="icon"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {isLoading ? 'Creating...' : 'Create Category'}
                </button>

                {isError && (
                    <p className="mt-2 text-sm text-red-500">Error: {error?.data?.message || 'Something went wrong.'}</p>
                )}

                {isSuccess && (
                    <p className="mt-2 text-sm text-green-500">Category created successfully!</p>
                )}
            </form>
        </div>
    );
};

export default CreateProdCategory;
