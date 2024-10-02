import React, { useState } from 'react';

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
        // Logic to update user information would go here
        setSuccessMessage('Account information updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Logic to change password would go here
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
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}

            {/* Personal Information Section */}
            <form onSubmit={handleUpdateInfo} className="mb-6">
                <h2 className="text-xl mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        className="input input-bordered w-full"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Information
                </button>
            </form>

            {/* Change Password Section */}
            <form onSubmit={handleChangePassword} className="mb-6">
                <h2 className="text-xl mb-4">Change Password</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change Password
                </button>
            </form>

            {/* Notification Preferences Section */}
            <div>
                <h2 className="text-xl mb-4">Notification Preferences</h2>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                    <span className="ml-2">Receive Notifications</span>
                </label>
            </div>
        </div>
    );
};

export default AccountSettings;
