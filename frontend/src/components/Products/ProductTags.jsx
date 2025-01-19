import React from 'react';

// Dummy data for product tags
const productTags = [
    { id: 1, name: 'Fresh Fruit' },
    { id: 2, name: 'Natural Food' },
    { id: 3, name: 'Hot' },
    { id: 4, name: 'Organics' },
    { id: 5, name: 'Dried Organic' },
];

const ProductTags = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Product Tags</h4>
            <ul className="flex flex-wrap space-x-2">
                {productTags.map(tag => (
                    <li key={tag.id}>
                        <a
                            href="#"
                            className="inline-block bg-blue-100 text-blue-600 rounded-full py-1 px-3 text-sm hover:bg-blue-200 transition"
                        >
                            {tag.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductTags;
