import React from 'react';
import { ArticleCard } from '../../../components';

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
    <div className="article-sec my-8">
      <div className="container mx-auto">
        <div className="section-heading flex justify-between items-center mb-4">
          <h3 className="main-title text-2xl font-bold">Our Latest Articles</h3>
          <a href="/articleslist" className="blog-link text-white bg-secondary px-4 py-2 rounded hover:bg-primary transition">
            View All Articles
          </a>
        </div>

        <ul className="articles-container flex space-x-4">
          {articles.slice(0, 3).map((item) => (
            <li key={item.id} className="articles-item w-1/3">
              <ArticleCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurArticles;
