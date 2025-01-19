import React from 'react';
import { useFetchBrandsQuery } from '../../redux/features/core/coreApi';

const Companies = () => {
  const { data: brands, error, isLoading } = useFetchBrandsQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-primary">Error: {error.message}</div>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <ul className="flex flex-wrap justify-center gap-8">
          {brands.map((item) => (
            <li key={item.id} className="w-full sm:w-1/2 lg:w-1/5">
              <div className="p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <a href="#" className="block">
                  <figure className="flex justify-center">
                    <img
                      src={item.logo}
                      alt={`Brand ${item.id}`}
                      className="rounded-lg shadow-md w-full h-auto object-contain"
                    />
                  </figure>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Companies;
