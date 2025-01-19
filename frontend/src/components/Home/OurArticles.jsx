import React from 'react';
import { ArticleCard } from '../index';
import { useFetchArticlesQuery } from '../../redux/features/articles/articlesApi';

const OurArticles = () => {
  const { data: articles = [], isLoading: articlesLoading } = useFetchArticlesQuery();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-4xl font-semibold text-gray-900">Our Latest Articles</h3>
          <a
            href="/articles"
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition duration-300"
          >
            View All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <ArticleCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurArticles;
