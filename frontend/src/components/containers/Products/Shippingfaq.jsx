import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

// Dummy data for FAQs
const faqs = [
    {
        question: "How long will it take to receive my order?",
        answer: `Orders placed before 3pm eastern time will normally be processed and shipped by the following business day. 
        For orders received after 3pm, they will generally be processed and shipped on the second business day. 
        For example, if you place your order after 3pm on Monday, the order will ship on Wednesday. 
        Business days do not include Saturday and Sunday and all Holidays. 
        Please allow additional processing time if your order is placed on a weekend or holiday. 
        Once an order is processed, speed of delivery will be determined as follows based on the shipping mode selected:`,
        shippingModes: [
            "Standard (in transit 3-5 business days)",
            "Priority (in transit 2-3 business days)",
            "Express (in transit 1-2 business days)",
            "Gift Card Orders are shipped via USPS First Class Mail. First Class mail will be delivered within 8 business days."
        ]
    }
];

const ShippingFAQ = () => {
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
                                <span className="title text-lg font-semibold">{faq.question}</span>
                                {openIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                            </button>
                            {openIndex === index && (
                                <div className="content p-4">
                                    <p>{faq.answer}</p>
                                    <div className="desc-expand mt-4">
                                        <span className="title font-bold">Shipping mode</span>
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            {faq.shippingModes.map((mode, i) => (
                                                <li key={i} className="text-gray-700">{mode}</li>
                                            ))}
                                        </ul>
                                    </div>
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
