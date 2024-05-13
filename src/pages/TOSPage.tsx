import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Terms of Service
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-500">
              These terms of service ("Terms") govern your access to and use of
              our website and services. By accessing or using our website, you
              agree to be bound by these Terms and our Privacy Policy.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-gray-500 space-y-2">
              <li>
                You agree to use our website and services in a lawful and
                responsible manner.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account and password.
              </li>
              <li>
                You agree not to engage in any activity that could harm or
                interfere with the website or services.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-gray-500">
              Our website and services, including all content and intellectual
              property, are owned by our company and protected by copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Termination
            </h2>
            <p className="text-gray-500">
              We reserve the right to suspend or terminate your access to our
              website and services at any time, for any reason, including if we
              reasonably believe you have violated these Terms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-gray-500">
              Our website and services are provided "as is" without warranties.
              We shall not be liable for any direct, indirect, or consequential
              damages related to your use of our website or services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Changes to Terms
            </h2>
            <p className="text-gray-500">
              We reserve the right to modify these Terms at any time. Your
              continued use of our website and services after any changes
              constitutes your acceptance of the new Terms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Governing Law and Disputes
            </h2>
            <p className="text-gray-500">
              These Terms and any disputes arising from or relating to them shall
              be governed by the laws of [your jurisdiction], and any disputes
              shall be resolved in the courts of [your jurisdiction].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;