import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8">
      <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight mb-8">Terms of Service</h1>
      
      <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6">
        <p className="text-sm text-neutral-500">Last Updated: March 24, 2026</p>
        
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the AURAWEAR website, services, and online store, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">2. Products and Online Store</h2>
          <p>
            Certain products or services may be available exclusively online through the website. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
          </p>
          <p className="mt-2">
            We reserve the right, but are not obligated, to limit the sales of our products or services to any person, geographic region or jurisdiction. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">3. Payments and Billing</h2>
          <p>
            We accept all major credit cards processed securely through Stripe. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">4. Shipping, Returns, and Refunds</h2>
          <p>
            We process and ship orders within 2-3 business days. If you are not entirely satisfied with your purchase, you may request a return within 14 days of receiving your item. The item must be unused, in its original packaging, and in the same condition that you received it. Refunds will be processed back to the original payment method upon receipt and inspection of the item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">5. Prohibited Uses</h2>
          <p>
            In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; or (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">6. Limitation of Liability</h2>
          <p>
            In no case shall AURAWEAR, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, arising from your use of any of the service or any products procured using the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">7. Changes to Terms of Service</h2>
          <p>
            You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-3 mt-8">8. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at legal@aurawear.com.
          </p>
        </section>
      </div>
    </div>
  );
}
