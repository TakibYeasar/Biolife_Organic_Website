import { useState } from 'react';
import { Line } from 'react-chartjs-2'; // Make sure to install this package
import 'chart.js/auto';

const SalesAnalytics = () => {
    const [dateRange, setDateRange] = useState('last30days'); // Example ranges: last30days, last7days, custom

    // Mock data
    const salesData = {
        totalSales: 15000,
        totalOrders: 300,
        totalCustomers: 120,
        salesTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [3000, 4000, 2500, 5000, 4500, 7000],
        },
        topProducts: [
            { name: 'Organic Apples', sales: 1500 },
            { name: 'Organic Honey', sales: 1200 },
            { name: 'Organic Carrots', sales: 900 },
            { name: 'Organic Almonds', sales: 800 },
        ],
        salesByCategory: [
            { category: 'Fruits', sales: 7000 },
            { category: 'Vegetables', sales: 5000 },
            { category: 'Nuts', sales: 2000 },
        ],
    };

    const salesChartData = {
        labels: salesData.salesTrend.labels,
        datasets: [
            {
                label: 'Sales',
                data: salesData.salesTrend.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Sales Analytics</h1>

            {/* Sales Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="card bg-base-200 p-4 shadow-lg">
                    <h2 className="text-xl font-bold">Total Sales</h2>
                    <p className="text-2xl text-green-600">${salesData.totalSales.toFixed(2)}</p>
                </div>
                <div className="card bg-base-200 p-4 shadow-lg">
                    <h2 className="text-xl font-bold">Total Orders</h2>
                    <p className="text-2xl text-blue-600">{salesData.totalOrders}</p>
                </div>
                <div className="card bg-base-200 p-4 shadow-lg">
                    <h2 className="text-xl font-bold">Total Customers</h2>
                    <p className="text-2xl text-purple-600">{salesData.totalCustomers}</p>
                </div>
            </div>

            {/* Date Range Picker */}
            <div className="mb-4">
                <label className="label">
                    <span className="label-text">Date Range:</span>
                </label>
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                >
                    <option value="last30days">Last 30 Days</option>
                    <option value="last7days">Last 7 Days</option>
                    <option value="custom">Custom Range</option>
                </select>
            </div>

            {/* Sales Trend Chart */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Sales Trend</h2>
                <div className="card bg-base-200 shadow-lg p-4">
                    <Line data={salesChartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            },
                        },
                    }} />
                </div>
            </div>

            {/* Top Products */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Top Products</h2>
                <div className="card bg-base-200 shadow-lg p-4">
                    <ul className="list-disc pl-5">
                        {salesData.topProducts.map((product, index) => (
                            <li key={index}>
                                {product.name}: <span className="font-bold">${product.sales}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Sales by Category */}
            <div>
                <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
                <div className="card bg-base-200 shadow-lg p-4">
                    <ul className="list-disc pl-5">
                        {salesData.salesByCategory.map((category, index) => (
                            <li key={index}>
                                {category.category}: <span className="font-bold">${category.sales}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;
