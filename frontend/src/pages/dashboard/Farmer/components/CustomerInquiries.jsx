import React, { useState } from 'react';

const CustomerInquiries = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const inquiries = [
        {
            id: 1,
            customerName: 'John Doe',
            inquiryDate: '2024-09-10',
            status: 'Pending',
            message: 'What are the benefits of organic apples?',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            inquiryDate: '2024-09-12',
            status: 'Resolved',
            message: 'Do you have any discounts on bulk orders?',
        },
        {
            id: 3,
            customerName: 'Emily Johnson',
            inquiryDate: '2024-09-15',
            status: 'Pending',
            message: 'Can you provide more details about your delivery options?',
        },
        // Add more inquiries as needed
    ];

    const filteredInquiries = inquiries.filter((inquiry) =>
        inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Customer Inquiries</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search inquiries..."
                    className="input w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">Total Inquiries: {filteredInquiries.length}</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Inquiry Date</th>
                            <th>Status</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.id}>
                                    <td>{inquiry.customerName}</td>
                                    <td>{inquiry.inquiryDate}</td>
                                    <td>
                                        <span
                                            className={`badge ${inquiry.status === 'Pending' ? 'badge-warning' : 'badge-success'
                                                }`}
                                        >
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td>{inquiry.message}</td>
                                    <td>
                                        <button className="btn btn-primary">Respond</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
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
