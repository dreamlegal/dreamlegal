'use client';

import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | DreamLegal";
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1e2556] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Privacy Policy</h1>
          <p className="mt-4 text-center text-lg max-w-3xl mx-auto">
            KYLT Automation Services Pvt. Ltd.<br />
            Last Updated: March 20, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-[#f5f7fa] rounded-lg shadow-md p-8">
          <div className="mb-8">
            <p className="text-[#2d2d2d] mb-6">
              KYLT Automation Services Pvt. Ltd. ("DreamLegal," "we," "our," or "us") operates the website{" "}
              <a href="https://dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                DreamLegal
              </a>{" "}
              ("Website"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and share your information. This Privacy Policy explains our practices regarding your personal data when you access or use our services, including our legal tech directory, legal tech consultancy, and market intelligence services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-[#2d2d2d] mb-4">
              We collect the following categories of information:
            </p>

            <h3 className="text-[#334155] text-xl font-semibold mb-3">a) Information You Provide Directly</h3>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>
                <strong>Email Address</strong>: When you sign up for our services, subscribe to newsletters, or contact us.
              </li>
              <li>
                <strong>Professional Details</strong>: Such as your name, job title, company, and legal practice area when you create a professional profile or interact with our directory.
              </li>
            </ul>

            <h3 className="text-[#334155] text-xl font-semibold mb-3">b) Information We Collect Automatically</h3>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-2">
              <li>
                <strong>Browsing History</strong>: Including pages visited, time spent on the site, and interactions with our services.
              </li>
              <li>
                <strong>Device Information</strong>: Such as IP address, browser type, operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies</strong>: We use Google Analytics to track user behavior and improve recommendations. For more details, see Section 6.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-[#2d2d2d] mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
              <li>
                <strong>Improving Recommendations</strong>: Personalizing content and service suggestions based on your usage patterns.
              </li>
              <li>
                <strong>Enhancing User Experience</strong>: Optimizing navigation, interface, and engagement strategies.
              </li>
              <li>
                <strong>Providing Market Intelligence</strong>: Identifying legal tech trends and insights without personally identifying users.
              </li>
              <li>
                <strong>Responding to Inquiries</strong>: Addressing user requests, support tickets, and feedback.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">3. How We Share Your Information</h2>
            <p className="text-[#2d2d2d] mb-4">
              We do <strong>not</strong> sell or rent your personal data. However, we may share information in the following ways:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
              <li>
                <strong>Aggregated Analytics Data</strong>: We share non-personally identifiable analytics data with third parties to analyze legal tech trends. This data cannot be traced back to any individual user.
              </li>
              <li>
                <strong>Service Providers</strong>: We may engage third-party vendors for website hosting, analytics, and security purposes.
              </li>
              <li>
                <strong>Legal Compliance</strong>: We may disclose information if required by law, regulation, or court order.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">4. Third-Party Services and Tracking</h2>
            <p className="text-[#2d2d2d] mb-4">
              We use <strong>Google Analytics</strong> to collect and analyze site traffic. Google Analytics may use cookies and other tracking technologies to gather information about your interactions with our website. You can learn more about Google Analytics' data practices here.
            </p>
            <p className="text-[#2d2d2d] mb-4">
              You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">5. How We Protect Your Data</h2>
            <p className="text-[#2d2d2d] mb-4">
              We implement the following security measures:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
              <li>
                <strong>Encryption</strong>: Protecting data in transit and at rest.
              </li>
              <li>
                <strong>Access Controls</strong>: Restricting access to authorized personnel only.
              </li>
              <li>
                <strong>Regular Audits</strong>: Conducting security audits and vulnerability assessments to ensure compliance.
              </li>
            </ul>
            <p className="text-[#2d2d2d] mb-4">
              While we take reasonable steps to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We encourage users to take precautions in safeguarding their information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
            <p className="text-[#2d2d2d] mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
              <li>
                <strong>Opt-Out</strong>: You can opt out of email communications by clicking the "unsubscribe" link in emails.
              </li>
              <li>
                <strong>Account Deletion</strong>: You may request account deletion by contacting us at{" "}
                <a href="mailto:contact@dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                  contact@dreamlegal.in
                </a>.
              </li>
              <li>
                <strong>Access and Correction</strong>: You can request access to the personal data we hold about you and correct inaccuracies.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">7. Retention of Data</h2>
            <p className="text-[#2d2d2d] mb-4">
              We retain user data only as long as necessary to provide our services and comply with legal obligations. If you request account deletion, we will delete your information within a reasonable timeframe, except where retention is legally required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-[#2d2d2d] mb-4">
              We may update this Privacy Policy from time to time. If significant changes are made, we will notify users via email or a notice on our website. Continued use of our services after changes take effect constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-4">9. Contact Us</h2>
            <p className="text-[#2d2d2d] mb-4">
              For any questions or concerns about this Privacy Policy or our data practices, contact us at:
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-4">
              <p className="font-bold mb-2">KYLT Automation Services Pvt. Ltd.</p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                  contact@dreamlegal.in
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="https://dreamlegal.in" className="text-[#7cc6ee] hover:underline">
                  https://dreamlegal.in
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}