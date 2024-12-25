import { useState } from 'react';
import AccountSettings from './components/AccountSettings';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import RateAndReview from './components/RateAndReview';
import RecurringPurchases from './components/RecurringPurchases';
import Wishlists from './components/Wishlists';

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState('wishlists');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex mt-32">
      <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Customer Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'wishlists' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('wishlists')}
            >
              WishLists
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'history' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('history')}
            >
              Order History
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'purshase' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('purshase')}
            >
              Recurring Purchases
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'tracking' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('tracking')}
            >
              Order Tracking
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'review' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('review')}
            >
              Rate & Review
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'settings' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('settings')}
            >
              Account Settings
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        {activeSection === 'wishlists' && (
          <div>
            <Wishlists />
          </div>
        )}

        {activeSection === 'history' && (
          <div>
            <OrderHistory />
          </div>
        )}

        {activeSection === 'purshase' && (
          <div>
            <RecurringPurchases />
          </div>
        )}

        {activeSection === 'tracking' && (
          <div>
            <OrderTracking />
          </div>
        )}

        {activeSection === 'review' && (
          <div>
            <RateAndReview />
          </div>
        )}

        {activeSection === 'settings' && (
          <div>
            <AccountSettings />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
