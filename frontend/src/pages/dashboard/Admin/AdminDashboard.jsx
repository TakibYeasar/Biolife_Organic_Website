import { useState } from 'react';
import ManageUsers from './components/ManageUsers';
import OrderFulfillment from './components/OrderFulfillment';
import ManageProducts from './components/ManageProducts';
import ManagePromotions from './components/ManagePromotions';
import SalesAnalytics from './components/SalesAnalytics';
import ManageArticles from './components/ManageArticles';


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

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
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'users' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('users')}
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'articles' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('articles')}
            >
              Manage Articles
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'products' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('products')}
            >
              Manage Products
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'orders' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('orders')}
            >
              Manage Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'promotions' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('promotions')}
            >
              Manage Promotions
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === 'analytics' ? 'bg-gray-600' : ''}`}
              onClick={() => handleSectionChange('analytics')}
            >
              Sales & Analytics
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-5 bg-gray-100 min-h-screen">
        {activeSection === 'users' && (
          <div>
            <ManageUsers />
          </div>
        )}

        {activeSection === 'articles' && (
          <div>
            <ManageArticles />
          </div>
        )}

        {activeSection === 'products' && (
          <div>
            <ManageProducts />
          </div>
        )}

        {activeSection === 'orders' && (
          <div>
            <OrderFulfillment />
          </div>
        )}

        {activeSection === 'promotions' && (
          <div>
            <ManagePromotions />
          </div>
        )}

        {activeSection === 'analytics' && (
          <div>
            <SalesAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
