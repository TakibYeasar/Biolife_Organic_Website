import React from 'react';

const ArticleCategory = ({ article }) => {
    return (
        <div className="pb-6 mb-6 border-b border-secondary">
            <h4 className="text-2xl font-bold mb-4">Categories</h4>
            <div className="space-y-2">
                {article?.category?.slice(0, 5).map((item, i) => (
                    <ul className="list-none" key={i}>
                        <li className="mb-2">
                            <a href="#" className="text-base text-gray-700 hover:text-primary transition-colors duration-300">
                                {item?.cat_name}
                            </a>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default ArticleCategory;
