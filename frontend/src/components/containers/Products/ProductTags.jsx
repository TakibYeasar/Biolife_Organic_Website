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
        <div className="widget bg-white p-4 shadow rounded-lg">
            <h4 className="wgt-title text-lg font-semibold mb-4">Product Tags</h4>
            <div className="wgt-content">
                <ul className="flex flex-wrap space-x-2">
                    {productTags.map(tag => (
                        <li key={tag.id} className="tag-item">
                            <a
                                href="#"
                                className="tag-link inline-block bg-blue-100 text-blue-600 rounded-full py-1 px-3 text-sm hover:bg-blue-200 transition duration-300"
                            >
                                {tag.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductTags;
