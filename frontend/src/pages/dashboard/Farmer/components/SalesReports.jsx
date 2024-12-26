import React from 'react';

const SalesReports = () => {
    const salesData = [
        { date: '2024-09-01', totalSales: 200, totalOrders: 10 },
        { date: '2024-09-02', totalSales: 150, totalOrders: 5 },
        { date: '2024-09-03', totalSales: 300, totalOrders: 15 },
    ];

    const bestSellingProducts = [
        { id: 1, name: 'Organic Apples', quantitySold: 50 },
        { id: 2, name: 'Organic Bananas', quantitySold: 30 },
        { id: 3, name: 'Organic Carrots', quantitySold: 20 },
    ];

    const totalSales = salesData.reduce((acc, curr) => acc + curr.totalSales, 0);
    const totalOrders = salesData.reduce((acc, curr) => acc + curr.totalOrders, 0);

    return (
        <div className="p-6 bg-white shadow rounded min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Sales Reports</h1>

            {/* Sales Overview */}
            <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">Sales Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 p-4 shadow-md rounded">
                        <h3 className="text-lg font-semibold">Total Sales</h3>
                        <p className="text-2xl font-bold">${totalSales}</p>
                    </div>
                    <div className="bg-gray-200 p-4 shadow-md rounded">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                    </div>
                </div>
            </div>

            {/* Sales Data */}
            <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">Sales Data</h2>
                <table className="table-auto w-full border-collapse shadow-md">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Total Sales</th>
                            <th className="border px-4 py-2">Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((sale, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{sale.date}</td>
                                <td className="border px-4 py-2">${sale.totalSales}</td>
                                <td className="border px-4 py-2">{sale.totalOrders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Best Selling Products */}
            <div>
                <h2 className="text-xl font-medium mb-4">Best Selling Products</h2>
                <table className="table-auto w-full border-collapse shadow-md">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSellingProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.quantitySold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReports;
