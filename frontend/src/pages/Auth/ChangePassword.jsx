import React, { useState } from 'react';

const Changepassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // Handle password change logic here (dummy data example)
        console.log("Password changed to:", password);
        setError(""); // Clear the error if passwords match
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Change Password</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fid-pass" className="block text-sm font-medium text-gray-700">
                            Password:<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="fid-pass"
                            name="password"
                            placeholder="Password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fid-confirm-pass" className="block text-sm font-medium text-gray-700">
                            Confirm Password:<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="fid-confirm-pass"
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
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Changepassword;
