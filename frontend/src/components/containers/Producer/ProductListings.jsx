import React, { useState } from 'react';

const ProductListings = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        setProducts([...products, { ...newProduct, id: Date.now() }]);
        setNewProduct({ name: '', description: '', price: '', image: '' });
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Product Listings</h1>

            {/* Add New Product Form */}
            <form onSubmit={handleAddProduct} className="mb-6">
                <h2 className="text-xl mb-4">Add New Product</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>

            {/* Product List Table */}
            <h2 className="text-xl mb-4">Current Product Listings</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                                </td>
                                <td>
                                    <button className="btn btn-secondary mr-2">Edit</button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductListings;
