import React from 'react';

const AffiliateDisclosurePage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Affiliate Disclosure
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is Affiliate Disclosure?
            </h2>
            <p className="text-gray-500">
              Affiliate disclosure is a statement that lets users know when you
              may be receiving a commission or compensation for recommending or
              linking to a product or service.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Affiliate Relationships
            </h2>
            <p className="text-gray-500">
              We may earn commissions or fees from certain companies and products
              we recommend or link to on our website. This helps us to continue
              providing valuable content and resources to our users.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Transparency and Objectivity
            </h2>
            <p className="text-gray-500">
              While we may earn commissions, we always strive to provide honest,
              objective, and unbiased recommendations. Our primary goal is to
              help our users find the best products and services to meet their
              needs.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Examples of Affiliate Relationships
            </h2>
            <ul className="list-disc pl-6 text-gray-500 space-y-2">
              <li>
                We may earn a commission if you click on a link to Amazon and
                make a purchase.
              </li>
              <li>
                We may receive a fee if you sign up for a service through one of
                our referral links.
              </li>
              <li>
                We may earn a percentage of sales for products we recommend
                through our affiliate partnerships.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Trust is Important to Us
            </h2>
            <p className="text-gray-500">
              We value your trust and will always be transparent about our
              affiliate relationships. If you have any questions or concerns,
              please don't hesitate to reach out to us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDisclosurePage;