import React, { useState } from 'react';

const FAQPage = () => {
  type accordion = number | null;
  const [activeIndex, setActiveIndex] = useState<accordion>(null);
  const toggleAccordion = (index:accordion) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What are price comparisons and shopping galleries?',
      answer:
        'With price comparisons, you can display alternative retailers selling the same product, so readers can choose the best price at whichever merchant they want. A shopping gallery, on the other hand, highlights a variety of products from one or more merchants. Each creates a better shopping experience for your readers, because adding editorially curated products in an engaging and visually appealing way offers readers the chance to explore — and likely purchase — more products from you, a source they trust. ',
    },
    {
      question: 'Commerce Product API: A scalable way to deliver a customized shopping experience',
      answer:
        'The Product Data API lets you easily retrieve accurate, detailed metadata about almost any retail product and ingest it into any system you choose, providing an efficient and scalable way to deliver to readers a customizable shopping experience across all your commerce content.',
    },
    {
      question: 'How does it work?',
      answer:
        'Once you have your unique Sovrn Commerce Product Data API key, you can instantly retrieve detailed product information for more than 210 million products from hundreds of retailers across North America, Europe, and Australia. Then ingest that data into your CMS or any other system of choice, and use it in any way you like. You can automatically present multiple retailer options, retrieve detailed product information, update prices and flag out-of-stock items, and geolocate offers based on your readers’ location. ',
    },
    {
      question: 'Ready to get started?',
      answer:
        'Sovrn Commerce is the fastest, most flexible way to build an affiliate marketing program, optimize your affiliate strategy, and earn affiliate revenue.',
    },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 ${
                activeIndex === index ? 'pb-6' : 'pb-4'
              }`}
            >
              <button
                className="flex justify-between items-center w-full focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="mt-4 text-gray-500">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;