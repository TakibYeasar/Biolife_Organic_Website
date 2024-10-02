import { useState } from 'react';
import { ManageUsers, OrderFulfillment, ManageProducts, ManagePromotions, SalesAnalytics } from '../../components';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const components = [
    'Dashboard',
    'Manage Users',
    'Product Listings',
    'Order Fulfillment',
    'Sales Analytics',
    'Promotions & Discounts',
  ];

  // Sidebar component
  const Sidebar = () => (
    <div className="h-full w-64 bg-base-200 p-4">
      <ul className="menu bg-base-100 p-4 rounded-box">
        {components.map((component, index) => (
          <li key={index} className={`cursor-pointer ${activeComponent === component ? 'bg-primary text-white' : ''}`}>
            <a onClick={() => setActiveComponent(component)}>{component}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  // Content component
  const Content = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Manage Users':
        return <ManageUsers />;
      case 'Product Listings':
        return <ManageProducts />;
      case 'Order Fulfillment':
        return <OrderFulfillment />;
      case 'Sales Analytics':
        return <SalesAnalytics />;
      case 'Promotions & Discounts':
        return <ManagePromotions />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-base-100">
        <Content />
      </div>
    </div>
  );
};

// Example content components for each section (You can replace these with actual content)
const DashboardContent = () => (
  <div>
    <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
    <p>Overview of the admin dashboard</p>
  </div>
);

export default AdminDashboard;
