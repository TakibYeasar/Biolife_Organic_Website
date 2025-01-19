import React from 'react';

const ArticleCategory = ({ article }) => {
    return (
        <div className="pb-6 mb-6 border-b border-gray-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
                {article?.categories?.slice(0, 5).map((category, index) => (
                    <a
                        key={index}
                        href="#"
                        className="text-sm text-gray-600 hover:text-primary transition-all duration-200"
                    >
                        {category?.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ArticleCategory;
