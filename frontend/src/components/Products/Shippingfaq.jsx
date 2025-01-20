import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const ShippingFAQ = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="tab_3rd" className="tab-contain shipping-delivery-tab p-6">
            <div className="biolife-accodition">
                <ul className="space-y-4">
                    {faqs.map((faq, index) => (
                        <li key={index} className="tab-item border-b">
                            <button
                                className="flex justify-between items-center w-full p-4 bg-white text-left rounded-lg shadow hover:bg-gray-100"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="title text-lg font-semibold">{faq.title}</span>
                                {openIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                            </button>
                            {openIndex === index && (
                                <div className="content p-4">
                                    <p className="text-gray-700">{faq.description}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShippingFAQ;
