import React from 'react';

const Articletags = ({ article }) => {
    return (
        <div className="flex items-center space-x-2">
            <span className="font-semibold">Tags:</span>
            <ul className="flex flex-wrap space-x-2">
                {article?.tags?.slice(0, 5).map((item, i) => (
                    <li key={i} className="mb-2">
                        <a
                            href="#"
                            className="text-sm text-gray-700 bg-white border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition duration-300"
                        >
                            {item?.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articletags;
