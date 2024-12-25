import { useState } from 'react';
import CustomerInquiries from './components/CustomerInquiries';
import InventoryManagement from './components/InventoryManagement';
import Orders from './components/Orders';
import ProductListings from './components/ProductListings';
import PayoutSettings from './components/PayoutSettings';
import PromotionsDiscounts from './components/PromotionsDiscounts';
import SalesReports from './components/SalesReports';

const FarmerDashboard = () => {
  const [activeSection, setActiveSection] = useState('inquiries');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex mt-32">
      <div className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'inquiries' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('inquiries')}
            >
              Customer Inquiries
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'inventory' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('inventory')}
            >
              Inventory Management
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'orders' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('orders')}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'products' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('products')}
            >
              Product Listings
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'payouts' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('payouts')}
            >
              Payout Settings
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'promotions' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('promotions')}
            >
              Promotions & Discounts
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'analytics' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('analytics')}
            >
              Sales Reports
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        {activeSection === 'inquiries' && (
          <div>
            <CustomerInquiries />
          </div>
        )}

        {activeSection === 'inventory' && (
          <div>
            <InventoryManagement />
          </div>
        )}

        {activeSection === 'orders' && (
          <div>
            <Orders />
          </div>
        )}

        {activeSection === 'products' && (
          <div>
            <ProductListings />
          </div>
        )}

        {activeSection === 'payouts' && (
          <div>
            <PayoutSettings />
          </div>
        )}

        {activeSection === 'promotions' && (
          <div>
            <PromotionsDiscounts />
          </div>
        )}

        {activeSection === 'analytics' && (
          <div>
            <SalesReports />
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
