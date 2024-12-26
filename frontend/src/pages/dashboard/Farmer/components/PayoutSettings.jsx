import React, { useState } from 'react';

const PayoutSettings = () => {
    const [bankAccount, setBankAccount] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [payoutFrequency, setPayoutFrequency] = useState('Monthly');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleSaveSettings = (e) => {
        e.preventDefault();
        // Save payout settings logic here (e.g., API call)
        alert('Payout settings updated!');
    };

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-5">Payout Settings</h1>

            <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Bank Account Information Section */}
                <div>
                    <h2 className="text-xl font-medium mb-4">Bank Account Information</h2>
                    <input
                        type="text"
                        placeholder="Account Holder Name"
                        className="input w-full mb-4 border border-gray-300 p-2 rounded"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Bank Name"
                        className="input w-full mb-4 border border-gray-300 p-2 rounded"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Bank Account Number"
                        className="input w-full mb-4 border border-gray-300 p-2 rounded"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        required
                    />
                </div>

                {/* Payout Frequency Section */}
                <div>
                    <h2 className="text-xl font-medium mb-4">Payout Frequency</h2>
                    <select
                        className="select w-full mb-4 border border-gray-300 p-2 rounded"
                        value={payoutFrequency}
                        onChange={(e) => setPayoutFrequency(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                {/* Notifications Section */}
                <div>
                    <h2 className="text-xl font-medium mb-4">Notifications</h2>
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="toggle toggle-primary"
                        />
                        <span className="ml-2">{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
                    </label>
                </div>

                {/* Save Settings Button */}
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PayoutSettings;
