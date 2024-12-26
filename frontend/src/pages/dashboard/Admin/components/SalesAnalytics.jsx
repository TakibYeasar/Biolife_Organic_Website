import { useState } from "react";
import { Line } from "react-chartjs-2"; // Make sure to install this package
import "chart.js/auto";

const SalesAnalytics = () => {
    const [dateRange, setDateRange] = useState("last30days");

    // Mock data
    const salesData = {
        totalSales: 15000,
        totalOrders: 300,
        totalCustomers: 120,
        salesTrend: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            data: [3000, 4000, 2500, 5000, 4500, 7000],
        },
        topProducts: [
            { name: "Organic Apples", sales: 1500 },
            { name: "Organic Honey", sales: 1200 },
            { name: "Organic Carrots", sales: 900 },
            { name: "Organic Almonds", sales: 800 },
        ],
        salesByCategory: [
            { category: "Fruits", sales: 7000 },
            { category: "Vegetables", sales: 5000 },
            { category: "Nuts", sales: 2000 },
        ],
    };

    const salesChartData = {
        labels: salesData.salesTrend.labels,
        datasets: [
            {
                label: "Sales",
                data: salesData.salesTrend.data,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Sales</h2>
                    <p className="text-xl font-bold text-green-500">${salesData.totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <p className="text-xl font-bold text-blue-500">{salesData.totalOrders}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Customers</h2>
                    <p className="text-xl font-bold text-purple-500">{salesData.totalCustomers}</p>
                </div>
            </div>

            {/* Date Range Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date Range</label>
                <select
                    className="w-full border rounded p-2"
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
                <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
                <Line data={salesChartData} />
            </div>

            {/* Top Products */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Top Products</h2>
                <ul className="space-y-2">
                    {salesData.topProducts.map((product, index) => (
                        <li
                            key={index}
                            className="flex justify-between bg-gray-100 p-3 rounded shadow"
                        >
                            <span>{product.name}</span>
                            <span className="font-bold">${product.sales}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sales by Category */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
                <ul className="space-y-2">
                    {salesData.salesByCategory.map((category, index) => (
                        <li
                            key={index}
                            className="flex justify-between bg-gray-100 p-3 rounded shadow"
                        >
                            <span>{category.category}</span>
                            <span className="font-bold">${category.sales}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SalesAnalytics;
