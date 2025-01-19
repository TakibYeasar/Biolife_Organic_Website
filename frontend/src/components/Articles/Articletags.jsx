import React from 'react';

const Articletags = ({ article }) => {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-800">Tags:</span>
            {article?.tags?.slice(0, 5).map((tag, index) => (
                <a
                    key={index}
                    href="#"
                    className="text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all duration-200"
                >
                    {tag?.title}
                </a>
            ))}
        </div>
    );
};

export default Articletags;
