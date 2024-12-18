import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

const ManageProducts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Organic Honey',
            category: 'Honey',
            price: 15.99,
            stock: 30,
            status: 'Pending',
        },
        {
            id: 2,
            name: 'Organic Apples',
            category: 'Fruits',
            price: 5.49,
            stock: 100,
            status: 'Approved',
        },
        // More product data...
    ]);

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter function
    const filteredProducts = products.filter(
        (product) =>
            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedCategory === '' || product.category === selectedCategory) &&
            (selectedStatus === '' || product.status === selectedStatus)
    );

    // Handle product approval
    const handleApproveProduct = (productId) => {
        setProducts(
            products.map((product) =>
                product.id === productId ? { ...product, status: 'Approved' } : product
            )
        );
    };

    // Handle product disapproval
    const handleDisapproveProduct = (productId) => {
        setProducts(
            products.map((product) =>
                product.id === productId ? { ...product, status: 'Pending' } : product
            )
        );
    };

    // Handle product delete
    const handleDeleteProduct = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Product Listings</h1>

            {/* Search and Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="form-control w-full max-w-xs">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search by product name or category"
                            className="input input-bordered"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span className="btn btn-square">
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Filter by Category</option>
                    <option value="Honey">Honey</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                </select>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span
                                        className={`badge ${product.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {product.status === 'Pending' ? (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleApproveProduct(product.id)}
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleDisapproveProduct(product.id)}
                                        >
                                            <FaTimes /> Disapprove
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => console.log(`Edit product ${product.id}`)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <div className="btn-group">
                    <button className="btn">«</button>
                    <button className="btn">1</button>
                    <button className="btn btn-active">2</button>
                    <button className="btn">3</button>
                    <button className="btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
