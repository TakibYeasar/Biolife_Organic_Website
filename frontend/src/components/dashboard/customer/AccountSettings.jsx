import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSave } from 'react-icons/fa';

const AccountSettings = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+1234567890');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notifications, setNotifications] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        // Logic to update user information
        setSuccessMessage('Account information updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Logic to change password
        if (newPassword === confirmPassword) {
            setSuccessMessage('Password changed successfully!');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } else {
            setSuccessMessage('Passwords do not match!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}

            {/* Personal Information Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <form onSubmit={handleUpdateInfo} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            className="input input-bordered w-full sm:w-1/3"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            className="input input-bordered w-full sm:w-1/3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            className="input input-bordered w-full sm:w-1/3"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2">
                        <FaSave />
                        <span>Update Information</span>
                    </button>
                </form>
            </div>

            {/* Change Password Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="password"
                            className="input input-bordered w-full sm:w-1/2"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="input input-bordered w-full sm:w-1/2"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2">
                        <FaSave />
                        <span>Change Password</span>
                    </button>
                </form>
            </div>

            {/* Notification Preferences Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                    <span>Receive Notifications</span>
                </label>
            </div>
        </div>
    );
};

export default AccountSettings;
