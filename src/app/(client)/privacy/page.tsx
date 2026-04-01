import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8">
      <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
        <p className="text-sm text-neutral-500">Last Updated: March 24, 2026</p>
        
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">1. Introduction</h2>
          <p>
            At AURAWEAR, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website (the "Site").
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">2. Information We Collect</h2>
          <p className="font-medium text-neutral-800 mt-4 mb-2">Device Information</p>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>

          <p className="font-medium text-neutral-800 mt-4 mb-2">Order Information</p>
          <p>
            Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers processed securely via Stripe), email address, and phone number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">3. How We Use Your Information</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Communicate with you;</li>
            <li>Screen our orders for potential risk or fraud; and</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">4. Sharing Your Personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe to power our secure checkout and payments. We also use analytics tools to help us understand how our customers use the Site.
          </p>
          <p className="mt-2">
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">5. Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">6. Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">7. Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at privacy@aurawear.com.
          </p>
        </section>
      </div>
    </div>
  );
}
