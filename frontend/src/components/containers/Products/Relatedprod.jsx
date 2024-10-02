import React from 'react';

// Dummy data for related products
const relatedProducts = [
    { id: 1, title: "Product 1", category: "Fresh Fruit", price: "300", image: "path_to_image_1.jpg" },
    { id: 2, title: "Product 2", category: "Fresh Fruit", price: "450", image: "path_to_image_2.jpg" },
    { id: 3, title: "Product 3", category: "Fresh Fruit", price: "500", image: "path_to_image_3.jpg" },
    { id: 4, title: "Product 4", category: "Fresh Fruit", price: "600", image: "path_to_image_4.jpg" },
];

const RelatedProd = () => {
    return (
        <div className="product-related-box single-layout">
            <div className="biolife-title-box mb-6">
                <span className="biolife-icon icon-organic text-green-500"></span>
                <span className="subtitle text-sm text-gray-500">All the best items for You</span>
                <h3 className="main-title text-2xl font-bold">Related Products</h3>
            </div>
            <ul className="products-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((item) => (
                    <li key={item.id} className="product-item">
                        <div className="bg-white border rounded-lg shadow-md p-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="info text-center mt-3">
                                <b className="categories text-sm text-gray-500">{item.category}</b>
                                <h4 className="product-title mt-1">
                                    <a href="#" className="pr-name text-md font-semibold hover:text-blue-500 transition duration-200">{item.title}</a>
                                </h4>
                                <div className="price mt-2">
                                    <span className="price-amount font-bold text-blue-600">
                                        <span className="currencySymbol">£</span>{item.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedProd;
