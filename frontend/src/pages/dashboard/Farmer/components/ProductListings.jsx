import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProductForm from './ProductForm';
import { useFetchUserProductsQuery, useDeleteProductMutation } from '../../../../redux/features/products/productsApi';

const ProductListings = () => {
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    // Fetch products using RTK's useFetchUserProductsQuery
    const { data: products, isLoading, isError } = useFetchUserProductsQuery();

    // Delete product mutation using RTK
    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id); // Perform delete action
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">Product Listings</h1>

            {/* Add New Product Button */}
            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreateProduct(true)}
                >
                    + Add New Product
                </button>
            </div>

            {/* Add New Product Form */}
            {showCreateProduct && (
                <ProductForm onClose={() => setShowCreateProduct(false)} />
            )}

            {/* Product List Table */}
            <h2 className="text-xl mb-4">Current Product Listings</h2>
            <div className="overflow-x-auto">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : isError ? (
                    <p>Error fetching products.</p>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Old Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={product.main_image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.old_price}</td>
                                    <td>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductListings;
