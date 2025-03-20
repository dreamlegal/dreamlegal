'use client';

import { useEffect } from 'react';

export default function TermsOfUse() {
  useEffect(() => {
    document.title = "Terms of Use | DreamLegal";
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1e2556] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Terms of Use</h1>
          <p className="mt-4 text-center text-lg max-w-3xl mx-auto">
            Last Updated: March 20, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-[#f5f7fa] rounded-lg shadow-md p-8">
          <p className="text-[#2d2d2d] mb-6 font-medium">
            Welcome to DreamLegal! These Terms of Use ("Terms") govern your
            access to and use of DreamLegal's website, services, and any related
            content (collectively, the "Platform"). By accessing or using the
            Platform, you agree to comply with these Terms.
          </p>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#2d2d2d] mb-4">
              By accessing or using DreamLegal, you confirm that you are at least 18
              years old and agree to be bound by these Terms, our Privacy Policy, and
              any other policies referenced herein. If you do not agree, do not use
              the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">2. Eligibility</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal is intended for legal professionals, legal tech enthusiasts,
              legal operations professionals, and anyone associated with legal
              technology or legal operations. We do not knowingly collect or solicit
              data from individuals under the age of 18.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">3. Ownership and User-Generated Content</h2>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
              <li>
                <strong>Ownership of Content:</strong> All content available on DreamLegal, including
                but not limited to text, graphics, software, and interactive
                features, is owned by or licensed to DreamLegal. Unauthorized use
                is prohibited.
              </li>
              <li>
                <strong>User-Generated Content:</strong> Users may post reviews, comments, or other
                content. By submitting content, you grant DreamLegal a worldwide,
                perpetual, irrevocable, royalty-free license to use, modify,
                distribute, and display such content.
              </li>
              <li>
                <strong>Moderation:</strong> DreamLegal reserves the right to moderate, modify, or
                remove user-generated content at its discretion, with or without
                user approval.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">4. Permitted and Prohibited Uses</h2>
            
            <h3 className="text-[#334155] text-xl font-semibold mb-3">4.1 Permitted Uses</h3>
            <p className="text-[#2d2d2d] mb-3">You may use DreamLegal to:</p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>Discover legal technology solutions</li>
              <li>Share insights on legal operations and technology</li>
              <li>Engage with the legal tech community</li>
              <li>Access resources and content provided by DreamLegal</li>
            </ul>

            <h3 className="text-[#334155] text-xl font-semibold mb-3">4.2 Prohibited Uses</h3>
            <p className="text-[#2d2d2d] mb-3">You may NOT:</p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>Use the Platform for any unlawful, fraudulent, or deceptive activity.</li>
              <li>Post false, misleading, defamatory, or abusive content.</li>
              <li>Infringe on intellectual property rights of DreamLegal or third parties.</li>
              <li>Attempt to access restricted areas of the Platform without authorization.</li>
              <li>Distribute malware, spam, or unauthorized advertising.</li>
            </ul>
            <p className="text-[#2d2d2d] italic">Violations may result in termination of access to the Platform.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">5. Third-Party Integrations</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal may include integrations with third-party tools or services.
              Use of such integrations is subject to the terms of the respective third
              parties, and DreamLegal is not responsible for their functionality,
              security, or availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">6. Artificial Intelligence Usage</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal utilizes AI-based tools to enhance user experience, including
              automated recommendations and data analysis. AI-generated content is
              informational and should not be considered legal advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">7. No Legal Advice Disclaimer</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal does not provide legal advice. Content on the Platform is for
              informational purposes only and should not be relied upon as
              professional legal counsel. Consult a qualified legal professional for
              legal matters.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">8. Data Storage and Security</h2>
            <p className="text-[#2d2d2d] mb-4">
              We implement industry-standard security measures in accordance with
              Indian regulations to protect user data. However, no online platform can
              guarantee absolute security, and users should exercise caution when
              sharing information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal and its affiliates shall not be liable for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>Any indirect, incidental, or consequential damages arising from Platform use.</li>
              <li>Errors, omissions, or inaccuracies in the content.</li>
              <li>Unauthorized access or breaches affecting user data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">10. Governing Law and Dispute Resolution</h2>
            <p className="text-[#2d2d2d] mb-4">
              These Terms shall be governed by and construed in accordance with the
              laws of India. Any disputes arising under these Terms shall be resolved
              exclusively in the courts of India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">11. Changes to Terms</h2>
            <p className="text-[#2d2d2d] mb-4">
              DreamLegal reserves the right to modify these Terms at any time. We will
              notify users of significant changes. Continued use of the Platform
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-[#2d2d2d] mb-4">
              For any questions regarding these Terms, please contact us at:{" "}
              <a href="mailto:ranjan@dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                ranjan@dreamlegal.in
              </a>
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-[#2d2d2d] italic">
              By using DreamLegal, you acknowledge that you have read, understood, and
              agree to these Terms of Use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}