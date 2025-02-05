import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import bg from '/assets/images/home/biolife-banner__style-01.jpg';
import { ArticleCard } from '../../components';
import { useFetchArticlesQuery } from '../../store/features/articles/articlesApi';

const ArticlesPage = () => {
    const { data: articles = [], isLoading: articlesLoading } = useFetchArticlesQuery();
    const articlesPerPage = 6;
    const [currentPage, setCurrentPage] = React.useState(1);

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-white">
            {/* Banner Section */}
            <div className="relative">
                <img src={bg} alt="Banner" className="w-full h-[30vh] object-cover" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-white text-center">
                    Organic Fruits
                </h1>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 mt-8">
                <nav className="flex items-center space-x-2 text-lg font-medium text-gray-700">
                    <a href="/" className="hover:text-blue-600">Home</a>
                    <FaAngleRight className="text-gray-500" />
                    <a href="/Articleslist" className="hover:text-blue-600">Our Articles</a>
                </nav>
            </div>

            {/* Blog Content */}
            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentArticles.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <ArticleCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
