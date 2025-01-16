import { useState } from 'react';
import CustomerInquiries from './components/CustomerInquiries';
import Orders from './components/Orders';
import ProductListings from './components/ProductListings';
import PayoutSettings from './components/PayoutSettings';
import PromotionsDiscounts from './components/PromotionsDiscounts';
import SalesReports from './components/SalesReports';

const sections = [
  { name: 'inquiries', label: 'Customer Inquiries', component: <CustomerInquiries /> },
  { name: 'products', label: 'Product Listings', component: <ProductListings /> },
  { name: 'orders', label: 'Order History', component: <Orders /> },
  { name: 'payouts', label: 'Payout Settings', component: <PayoutSettings /> },
  { name: 'promotions', label: 'Promotions & Discounts', component: <PromotionsDiscounts /> },
  { name: 'analytics', label: 'Sales Reports', component: <SalesReports /> },
];

const FarmerDashboard = () => {
  const [activeSection, setActiveSection] = useState('inquiries');

  const handleSectionChange = (section) => setActiveSection(section);

  const renderSection = () => {
    const active = sections.find((section) => section.name === activeSection);
    return active ? active.component : null;
  };

  return (
    <div className="flex mt-32">
      <nav className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Farmer Dashboard</h2>
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

export default FarmerDashboard;
