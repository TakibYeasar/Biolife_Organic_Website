import React from 'react';

const SalesReports = () => {
    const salesData = [
        { date: '2024-09-01', totalSales: 200, totalOrders: 10 },
        { date: '2024-09-02', totalSales: 150, totalOrders: 5 },
        { date: '2024-09-03', totalSales: 300, totalOrders: 15 },
        // Add more sales data as needed
    ];

    const bestSellingProducts = [
        { id: 1, name: 'Organic Apples', quantitySold: 50 },
        { id: 2, name: 'Organic Bananas', quantitySold: 30 },
        { id: 3, name: 'Organic Carrots', quantitySold: 20 },
    ];

    const totalSales = salesData.reduce((acc, curr) => acc + curr.totalSales, 0);
    const totalOrders = salesData.reduce((acc, curr) => acc + curr.totalOrders, 0);

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Sales Reports</h1>

            <div className="mb-6">
                <h2 className="text-xl font-medium">Sales Overview</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="card bg-base-200 p-4 shadow-md">
                        <h3 className="text-lg font-semibold">Total Sales</h3>
                        <p className="text-2xl font-bold">${totalSales}</p>
                    </div>
                    <div className="card bg-base-200 p-4 shadow-md">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-medium">Sales Data</h2>
                <table className="table w-full mt-4">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Sales</th>
                            <th>Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.date}</td>
                                <td>${sale.totalSales}</td>
                                <td>{sale.totalOrders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-xl font-medium">Best Selling Products</h2>
                <table className="table w-full mt-4">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSellingProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantitySold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReports;
