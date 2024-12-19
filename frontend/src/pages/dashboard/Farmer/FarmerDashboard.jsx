import { useState } from 'react';
import CustomerInquiries from './components/CustomerInquiries';
import InventoryManagement from './components/InventoryManagement';
import Orders from './components/Orders';
import ProductListings from './components/ProductListings';
import PayoutSettings from './components/PayoutSettings';
import PromotionsDiscounts from './components/PromotionsDiscounts';
import SalesReports from './components/SalesReports';

const FarmerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Product Listings');

  const components = [
    'Product Listings',
    'Inventory Management',
    'Sales Reports',
    'Customer Inquiries',
    'Orders',
    'Promotions & Discounts',
    'Payout Settings',
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
      case 'Product Listings':
        return <ProductListings />;
      case 'Inventory Management':
        return <InventoryManagement />;
      case 'Sales Reports':
        return <SalesReports />;
      case 'Customer Inquiries':
        return <CustomerInquiries />;
      case 'Orders':
        return <Orders />;
      case 'Promotions & Discounts':
        return <PromotionsDiscounts />;
      case 'Payout Settings':
        return <PayoutSettings />;
      default:
        return <ProductListings />;
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

export default FarmerDashboard;
