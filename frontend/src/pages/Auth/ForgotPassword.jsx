import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate a successful email submission
        setMessage(`Password reset link sent to ${email}`);
        // Reset the email input
        setEmail('');
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                {message && <p className="text-green-600 mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fid-email" className="block text-sm font-medium text-gray-700">
                            Email Address:<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="fid-email"
                            name="email"
                            placeholder="Email Address"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Submit
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

export default ForgotPassword;
