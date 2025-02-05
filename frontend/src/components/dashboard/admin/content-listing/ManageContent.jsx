import React from 'react';
import ContactInformation from './ContactInformation';
import AllBanners from './AllBanners';
import AllFeatureds from './AllFeatureds';
import AllBrands from './AllBrands';
import AllNewsletters from './AllNewsletters';
import AllTestimonials from './AllTestimonials';

const ManageContent = () => {
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-8">Manage Content</h2>

      {/* Contact Information */}
      <div className="mb-6">
        <ContactInformation />
      </div>

      {/* Banners */}
      <div className="mb-6">
        <AllBanners />
      </div>

      {/* Featureds */}
      <div className="mb-6">
        <AllFeatureds />
      </div>

      {/* Brands */}
      <div className="mb-6">
        <AllBrands />
      </div>

      {/* Testimonials */}
      <div className="mb-6">
        <AllTestimonials />
      </div>

      {/* Newsletter Subscriptions */}
      <div className="mb-6">
        <AllNewsletters />
      </div>
    </div>
  );
};

export default ManageContent;
