import { useState } from 'react';
import ManageUsers from './components/ManageUsers';
import OrderFulfillment from './components/OrderFulfillment';
import ManageProducts from './components/Products/ManageProducts';
import ManagePromotions from './components/ManagePromotions';
import SalesAnalytics from './components/SalesAnalytics';
import ManageArticles from './components/Articles/ManageArticles';

const sections = [
  { name: 'users', label: 'Manage Users', component: <ManageUsers /> },
  { name: 'articles', label: 'Manage Articles', component: <ManageArticles /> },
  { name: 'products', label: 'Manage Products', component: <ManageProducts /> },
  { name: 'orders', label: 'Manage Orders', component: <OrderFulfillment /> },
  { name: 'promotions', label: 'Manage Promotions', component: <ManagePromotions /> },
  { name: 'analytics', label: 'Sales & Analytics', component: <SalesAnalytics /> }
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

  const handleSectionChange = (section) => setActiveSection(section);

  const renderSection = () => {
    const active = sections.find((section) => section.name === activeSection);
    return active ? active.component : null;
  };

  return (
    <div className="flex mt-32">
      <nav className="w-1/4 bg-gray-800 text-white min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
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

export default AdminDashboard;
