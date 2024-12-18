import React from 'react';

const RecentPost = () => {
    const articles = [
        {
            id: 1,
            title: "Understanding Tailwind CSS",
            date: "2024-10-01",
            image: "https://via.placeholder.com/130x50?text=Image+1", // Replace with actual image URLs
        },
        {
            id: 2,
            title: "Getting Started with React",
            date: "2024-09-28",
            image: "https://via.placeholder.com/130x50?text=Image+2",
        },
        {
            id: 3,
            title: "Advanced JavaScript Concepts",
            date: "2024-09-25",
            image: "https://via.placeholder.com/130x50?text=Image+3",
        },
        {
            id: 4,
            title: "CSS Grid vs Flexbox",
            date: "2024-09-22",
            image: "https://via.placeholder.com/130x50?text=Image+4",
        },
        {
            id: 5,
            title: "Exploring Next.js Features",
            date: "2024-09-20",
            image: "https://via.placeholder.com/130x50?text=Image+5",
        },
    ];

    return (
        <div className="pb-6 mb-6 border-b border-secondary">
            <h4 className="text-2xl font-semibold mb-4">Recent Posts</h4>
            <div className="post-content">
                <ul className="list-none p-0">
                    {articles.map((item, i) => (
                        <li key={item.id} className="flex mb-4">
                            <div className="thumb mr-2">
                                <a href="#">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-12 w-32 object-cover rounded"
                                    />
                                </a>
                            </div>
                            <div className="detail flex flex-col">
                                <h4 className="post-name text-lg font-semibold">
                                    <a href="#" className="text-primary hover:underline">
                                        {item.title}
                                    </a>
                                </h4>
                                <p className="post-archive text-sm text-gray-600">{item.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentPost;
