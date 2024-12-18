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
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Payout Settings</h1>

            <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                    <h2 className="text-xl font-medium mb-4">Bank Account Information</h2>
                    <input
                        type="text"
                        placeholder="Account Holder Name"
                        className="input w-full mb-4"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Bank Name"
                        className="input w-full mb-4"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Bank Account Number"
                        className="input w-full mb-4"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-4">Payout Frequency</h2>
                    <select
                        className="select w-full mb-4"
                        value={payoutFrequency}
                        onChange={(e) => setPayoutFrequency(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-4">Notifications</h2>
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="toggle toggle-primary"
                        />
                        <span className="ml-2">{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default PayoutSettings;
