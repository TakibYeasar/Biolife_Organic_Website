import React, { useState } from "react";
import { FaSearch, FaEnvelope } from "react-icons/fa";

const CustomerInquiries = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const inquiries = [
        {
            id: 1,
            customerName: "John Doe",
            inquiryDate: "2024-09-10",
            status: "Pending",
            message: "What are the benefits of organic apples?",
        },
        {
            id: 2,
            customerName: "Jane Smith",
            inquiryDate: "2024-09-12",
            status: "Resolved",
            message: "Do you have any discounts on bulk orders?",
        },
        {
            id: 3,
            customerName: "Emily Johnson",
            inquiryDate: "2024-09-15",
            status: "Pending",
            message: "Can you provide more details about your delivery options?",
        },
    ];

    const filteredInquiries = inquiries.filter((inquiry) =>
        inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Customer Inquiries</h1>

            <div className="flex items-center mb-6">
                <div className="flex items-center border rounded overflow-hidden w-72">
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        className="px-4 py-2 w-full focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4">
                        <FaSearch />
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">
                    Total Inquiries: {filteredInquiries.length}
                </h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Customer Name</th>
                            <th className="border px-4 py-2">Inquiry Date</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Message</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.id}>
                                    <td className="border px-4 py-2">{inquiry.customerName}</td>
                                    <td className="border px-4 py-2">{inquiry.inquiryDate}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-sm rounded ${inquiry.status === "Pending"
                                                    ? "bg-yellow-200 text-yellow-700"
                                                    : "bg-green-200 text-green-700"
                                                }`}
                                        >
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{inquiry.message}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                                            <FaEnvelope className="mr-2" /> Respond
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No inquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerInquiries;
