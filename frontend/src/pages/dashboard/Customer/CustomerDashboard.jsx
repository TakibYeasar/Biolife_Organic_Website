import { useState } from 'react';
import AccountSettings from './components/AccountSettings';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import RateAndReview from './components/RateAndReview';
import RecurringPurchases from './components/RecurringPurchases';
import Wishlists from './components/Wishlists';

const sections = [
  { name: 'wishlists', label: 'WishLists', component: <Wishlists /> },
  { name: 'history', label: 'Order History', component: <OrderHistory /> },
  { name: 'purshase', label: 'Recurring Purchases', component: <RecurringPurchases /> },
  { name: 'tracking', label: 'Order Tracking', component: <OrderTracking /> },
  { name: 'review', label: 'Rate & Review', component: <RateAndReview /> },
  { name: 'settings', label: 'Account Settings', component: <AccountSettings /> },
];

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState('wishlists');

  const handleSectionChange = (section) => setActiveSection(section);

  const renderSection = () => {
    const active = sections.find((section) => section.name === activeSection);
    return active ? active.component : null;
  };

  return (
    <div className="flex mt-32">
      <nav className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Customer Dashboard</h2>
        <ul className="space-y-4">
          {sections.map(({ name, label }) => (
            <li key={name}>
              <button
                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === name ? 'bg-gray-600' : ''
                  }`}
                onClick={() => handleSectionChange(name)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="w-3/4 p-5 bg-gray-100 min-h-screen">
        {renderSection()}
      </main>
    </div>
  );
};

export default CustomerDashboard;
