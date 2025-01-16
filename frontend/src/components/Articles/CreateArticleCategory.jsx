import React, { useEffect, useState } from 'react';
import { useFetchArticleCategoriesQuery, useCreateArticleCategoryMutation, useUpdateArticleCategoryMutation } from '../../redux/features/articles/articlesApi';
import { toast } from 'react-toastify';

const ArticleCategoryForm = ({ categoryData }) => {
    const [formData, setFormData] = useState({
        name: '',
        parent: '',
        icon: null,
        image: null,
    });

    const { data: categories } = useFetchArticleCategoriesQuery();
    const [createCategory, { isLoading: isCreating, error: createError }] = useCreateArticleCategoryMutation();
    const [updateCategory, { isLoading: isUpdating, error: updateError }] = useUpdateArticleCategoryMutation();

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
            window.location.reload();
        } catch (err) {
            toast.error(categoryData ? 'Failed to update category.' : 'Failed to create category.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{categoryData ? 'Update Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Category Name */}
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
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Parent Category */}
                <div className="mb-4">
                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                        Parent Category
                    </label>
                    <select
                        id="parent"
                        name="parent"
                        value={formData.parent}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                <div className="mb-4">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon
                    </label>
                    <input
                        type="file"
                        id="icon"
                        name="icon"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                    {formData.icon && (
                        <img
                            src={URL.createObjectURL(formData.icon)}
                            alt="Icon Preview"
                            className="mt-2 h-16 w-16 object-cover"
                        />
                    )}
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Image Preview"
                            className="mt-2 h-16 w-16 object-cover"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className={`w-full py-2 px-4 rounded-md text-white ${isCreating || isUpdating ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isCreating || isUpdating ? 'Saving...' : categoryData ? 'Update Category' : 'Create Category'}
                </button>

                {/* Error Message */}
                {(createError || updateError) && (
                    <p className="mt-2 text-sm text-red-500">
                        Error: {createError?.data?.message || updateError?.data?.message || 'Something went wrong.'}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ArticleCategoryForm;
