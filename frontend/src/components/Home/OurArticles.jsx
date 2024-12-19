import React from 'react';
import { ArticleCard } from '../index';

// Dummy data for articles
const articles = [
  {
    id: 1,
    title: 'Article One',
    description: 'This is a summary of article one.',
    image: 'https://via.placeholder.com/150?text=Article+One',
  },
  {
    id: 2,
    title: 'Article Two',
    description: 'This is a summary of article two.',
    image: 'https://via.placeholder.com/150?text=Article+Two',
  },
  {
    id: 3,
    title: 'Article Three',
    description: 'This is a summary of article three.',
    image: 'https://via.placeholder.com/150?text=Article+Three',
  },
  {
    id: 4,
    title: 'Article Four',
    description: 'This is a summary of article four.',
    image: 'https://via.placeholder.com/150?text=Article+Four',
  },
];

const OurArticles = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-semibold text-gray-800">Our Latest Articles</h3>
          <a
            href="/articleslist"
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300"
          >
            View All Articles
          </a>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((item) => (
            <li key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <ArticleCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurArticles;
