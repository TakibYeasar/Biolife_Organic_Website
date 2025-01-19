import React from 'react';
import { useFetchArticlesQuery } from '../../redux/features/articles/articlesApi';

const RecentPost = () => {
    const { data: articles = [], isLoading: articlesLoading } = useFetchArticlesQuery();

    if (articlesLoading) {
        return <p className="text-gray-500">Loading recent posts...</p>;
    }

    return (
        <div className="pb-6 mb-6 border-b border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Posts</h4>
            <div className="space-y-4">
                {articles.slice(0, 5).map((item) => (
                    <a
                        key={item.id}
                        href={`/article/${item.id}`}
                        className="flex items-center space-x-4 group"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-14 w-24 object-cover rounded-lg shadow-sm group-hover:opacity-90 transition-opacity duration-200"
                        />
                        <div>
                            <h5 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors duration-200">
                                {item.title}
                            </h5>
                            <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default RecentPost;
