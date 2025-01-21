import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import {
    useFetchContactInfoQuery,
    useDeleteContactInfoMutation,
} from '../../../../../redux/features/core/coreApi';
import ContactInfoForm from './ContactInfoForm';
import { toast } from 'react-toastify';

const ContactInformation = () => {
    const { data: contactInfo, isLoading, isError } = useFetchContactInfoQuery();
    const [deleteContactInfo] = useDeleteContactInfoMutation();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteContactInfo(id).unwrap();
            toast.success('Contact information deleted successfully.');
        } catch (error) {
            toast.error('Failed to delete contact information.');
        }
    };

    const handleCreateOrEdit = (contact = null) => {
        setSelectedContact(contact);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setSelectedContact(null);
        setIsFormOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to fetch contact information.</div>;
    }

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>

            {/* Create Information Button */}
            <button
                onClick={() => handleCreateOrEdit()}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 mb-4"
            >
                <FaEdit /> + Create Information
            </button>

            {/* Contact Info Table */}
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Working Hours</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contactInfo && contactInfo.length > 0 ? (
                        contactInfo.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.address}</td>
                                <td className="border px-4 py-2">{item.phone}</td>
                                <td className="border px-4 py-2">{item.email}</td>
                                <td className="border px-4 py-2">{item.working_hours}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleCreateOrEdit(item)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No Contact Information available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Contact Info Form */}
            {isFormOpen && (
                <ContactInfoForm
                    contactData={selectedContact}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default ContactInformation;
