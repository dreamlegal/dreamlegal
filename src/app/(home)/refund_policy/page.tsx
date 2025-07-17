'use client';

import { useEffect } from 'react';

export default function RefundPolicy() {
  useEffect(() => {
    document.title = "Refund Policy | DreamLegal";
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1e2556] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Refund Policy</h1>
          <p className="mt-4 text-center text-lg max-w-3xl mx-auto">
            Last Updated: March 20, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-[#f5f7fa] rounded-lg shadow-md p-8">
          <p className="text-[#2d2d2d] mb-6">
            At <strong>DreamLegal.in</strong>, we are committed to ensuring satisfaction and value through our legal technology marketplace and related services. However, as our services often involve tailored deliverables and professional engagements, refunds are governed as follows:
          </p>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">1. Custom Engagements</h2>
            <p className="text-[#2d2d2d] mb-4">
              Refunds for any product or service listed, promoted, or facilitated through DreamLegal.in shall be subject to the specific <strong>Engagement Agreement</strong> individually agreed upon and executed between the parties involved (DreamLegal and the Customer, or the Customer and the Vendor).
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li><strong>Each engagement</strong> may carry its own refund, cancellation, or replacement terms.</li>
              <li>In the absence of an express clause within the engagement agreement, no automatic refund shall be presumed.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">2. Digital Products & Listings</h2>
            <p className="text-[#2d2d2d] mb-4">
              For digital products, directory listings, lead generation services, or any other subscription-based offering on DreamLegal.in:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li><strong>No refund</strong> shall be provided once the product is delivered or the listing is live, except as expressly stated in a written agreement.</li>
              <li>If the service has not commenced or the product has not been delivered, you may be eligible for a partial or full refund <strong>only upon mutual consent</strong> and as per the terms in the respective engagement agreement.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">3. Dispute Resolution</h2>
            <p className="text-[#2d2d2d] mb-4">
              If you believe a refund is justified, you may write to us at{" "}
              <a href="mailto:ranjan@dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                <strong>ranjan@dreamlegal.in</strong>
              </a>{" "}
              with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>Your full name and contact details</li>
              <li>Transaction reference or agreement details</li>
              <li>Reason for the refund request</li>
            </ul>
            <p className="text-[#2d2d2d] mb-4">
              Our team will evaluate your request in light of the governing engagement agreement and respond within <strong>7 business days</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">4. No Blanket Refunds</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal.in does not offer blanket or general refunds for all services or interactions. Each transaction is governed by its individual terms.
            </p>
          </section>

          <section className="mb-8">
            <div className="bg-[#e8f4f8] p-6 rounded-lg border-l-4 border-[#7cc6ee]">
              <p className="text-[#2d2d2d] font-semibold">
                <strong>Note:</strong> By availing any service or product through DreamLegal.in, you acknowledge that you have read and agreed to this refund policy and the terms of your specific engagement agreement.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}