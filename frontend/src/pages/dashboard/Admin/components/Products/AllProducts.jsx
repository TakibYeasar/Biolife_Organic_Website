import React from "react";

const AllProducts = ({
    filteredProducts,
    actions,
}) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product Listings</h2>

            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">Price</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <tr key={product.id} className="border-b">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{product.title}</td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">${product.price}</td>
                                <td className="py-3 px-4">{product.status}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    {actions(product)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-4 text-gray-500"
                            >
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;
