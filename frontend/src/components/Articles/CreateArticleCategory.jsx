import React, { useState } from 'react';

const CreateArticleCategory = () => {
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryData = { name, parent: parent || null, is_active: isActive };

        // Send data to backend
        fetch('/api/article-categories/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoryData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Article Category Created Successfully');
                    setName('');
                    setParent('');
                    setIsActive(true);
                } else {
                    alert('Error creating article category');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <h1 className="text-xl font-bold mb-4">Create Article Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Parent Category (Optional)</label>
                    <input
                        type="text"
                        value={parent}
                        onChange={(e) => setParent(e.target.value)}
                        placeholder="Enter Parent Category ID"
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
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default CreateArticleCategory;
