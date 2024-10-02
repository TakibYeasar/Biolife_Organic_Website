import { useState } from 'react';
import { AccountSettings, OrderHistory, OrderTracking, RateAndReview, RecurringPurchases, Wishlists } from '../../components';

const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Browse Products');

  const components = [
    'Browse Products',
    'Order Tracking',
    'Wishlists',
    'Order History',
    'Rate & Review',
    'Recurring Purchases',
    'Account Settings',
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
      case 'Browse Products':
        return <BrowseProducts />;
      case 'Order Tracking':
        return <OrderTracking />;
      case 'Wishlists':
        return <Wishlists />;
      case 'Order History':
        return <OrderHistory />;
      case 'Rate & Review':
        return <RateAndReview />;
      case 'Recurring Purchases':
        return <RecurringPurchases />;
      case 'Account Settings':
        return <AccountSettings />;
      default:
        return <BrowseProducts />;
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

// Example content components for each section (Replace with actual content as needed)
const BrowseProducts = () => (
  <div>
    <h2 className="text-2xl font-semibold">Browse Products</h2>
    <p>Explore the products available for purchase.</p>
  </div>
);

export default CustomerDashboard;
