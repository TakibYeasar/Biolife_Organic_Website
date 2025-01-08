import React, { useState } from 'react';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categories', categories);
        formData.append('tags', tags);
        formData.append('image', image);
        formData.append('is_active', isActive);

        // Send data to backend
        fetch('/api/articles/', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    alert('Article Created Successfully');
                    setTitle('');
                    setDescription('');
                    setCategories([]);
                    setTags([]);
                    setImage(null);
                    setIsActive(true);
                } else {
                    alert('Error creating article');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <h1 className="text-xl font-bold mb-4">Create Article</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <div>
                    <label className="block font-semibold">Categories</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value.split(','))}
                        placeholder="Enter category IDs separated by commas"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Tags</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value.split(','))}
                        placeholder="Enter tag IDs separated by commas"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label>Active</label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Article
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;
