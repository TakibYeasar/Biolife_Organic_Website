import React, { useState } from 'react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setMessage('');
            return;
        }
        setMessage("Password reset successfully!");
        setError('');
        // Reset the fields
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                {message && <p className="text-green-600 mb-4">{message}</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                            New Password:<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            name="newPassword"
                            placeholder="New Password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password:<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <a href="/" className="text-blue-500 hover:underline">Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
