'use client';

import { useEffect } from 'react';

export default function CommunityGuidelines() {
  useEffect(() => {
    document.title = "Community Guidelines | DreamLegal";
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1e2556] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Community Guidelines</h1>
          <p className="mt-4 text-center text-lg max-w-3xl mx-auto">
            Building a trusted space for legal professionals
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-[#f5f7fa] rounded-lg shadow-md p-8">
          <div className="mb-8">
            <p className="text-[#2d2d2d] mb-6">
              DreamLegal is committed to creating a trusted and valuable space for legal professionals, legal tech vendors, and industry experts. Our goal is to facilitate informed decision-making, unbiased discussions, and a collaborative community for digital transformation in legal teams. These guidelines outline the principles we operate by to ensure a fair and professional environment.
            </p>

            <p className="text-[#2d2d2d] mb-6">
              DreamLegal may update these Community Guidelines from time to time. By participating in the DreamLegal community and using our platform, you agree to follow these guidelines, comply with applicable laws, and adhere to our <strong>Terms of Use</strong>.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-[#1e2556] text-2xl font-bold mb-6">DreamLegal's Goals: Ensuring Transparency, Fairness, and Value</h2>
          
            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">1. Authentic and Unbiased Contributions</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>All reviews and discussions should be honest, based on real experiences, and free from external influence.</li>
                <li>DreamLegal does not engage in or allow <strong>pay-to-play</strong> practices. Vendor listings and reviews are independent of any financial relationship with DreamLegal.</li>
                <li>Misleading, exaggerated, or fabricated reviews are strictly prohibited.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">2. Professionalism and Respectful Engagement</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Maintain a professional and constructive tone in all interactions.</li>
                <li>Personal attacks, hate speech, discrimination, harassment, or inappropriate content will not be tolerated.</li>
                <li>Disagreements should be expressed respectfully, with a focus on adding value to the discussion.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">3. Review Moderation and Verification</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Reviews undergo <strong>automated and manual checks</strong> to ensure compliance with our guidelines before publication.</li>
                <li>DreamLegal may verify reviewer authenticity through account history, professional credentials, or additional validation processes.</li>
                <li>Users who attempt to manipulate reviews, including writing multiple reviews from the same IP address, may have their content removed and accounts restricted.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">4. Transparent Reviewer Labels</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Reviews may be labeled based on the reviewer's status:</li>
                <ul className="list-none pl-6 mt-2 space-y-2">
                  <li><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Validated Reviewer</span> for users authenticated through professional verification.</li>
                  <li><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Verified Current User</span> for reviewers providing proof of software usage.</li>
                  <li><span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Business Partner</span> for users affiliated with the reviewed vendor.</li>
                </ul>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">5. No Review Manipulation</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Vendors may <strong>not</strong> pressure users to leave positive reviews or remove negative ones.</li>
                <li>Attempts to manipulate ratings—such as posting fake reviews, discouraging negative feedback, or incentivizing biased content—will result in community alerts and potential removal of listings.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">6. Objectivity and Data Integrity</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>DreamLegal <strong>does not alter</strong> review content or scores. Our rankings and evaluations are based purely on community-driven insights and objective data sources.</li>
                <li>We aggregate and analyze <strong>publicly available</strong> data, user reviews, and engagement metrics to provide transparent insights into legal tech solutions.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">7. Guest and Trial User Reviews</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Users who have tested a legal tech solution in a <strong>trial or evaluation</strong> capacity are welcome to share insights, provided they disclose their limited usage experience.</li>
                <li>Guest users who access a software <strong>outside their organization</strong> may contribute reviews, but these may be flagged accordingly.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">8. Editing and Updating Reviews</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Reviewers may <strong>update their reviews</strong> over time to reflect evolving experiences.</li>
                <li>Edited reviews will undergo a re-moderation process before being republished.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">9. Incentivized Reviews Policy</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>DreamLegal may <strong>occasionally offer incentives</strong> (such as discounts or gift cards) to encourage genuine reviews.</li>
                <li>Incentives are provided <strong>after moderation</strong> and are <strong>never based on whether a review is positive or negative</strong>.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[#334155] text-xl font-semibold mb-4">10. Community Reporting and Enforcement</h3>
              <ul className="list-disc pl-6 mb-4 text-[#2d2d2d] space-y-3">
                <li>Users are encouraged to <strong>report</strong> violations of these guidelines.</li>
                <li>DreamLegal reserves the right to <strong>suspend or ban</strong> users who repeatedly violate community standards.</li>
              </ul>
            </div>
          </section>

          <div className="bg-[#1e2556] text-white p-6 rounded-lg mb-8">
            <p className="text-lg font-medium mb-4">
              By participating in the DreamLegal community, you help us build a transparent, unbiased, and professional ecosystem for legal digital transformation.
            </p>
            <p className="text-lg">
              Thank you for contributing to a trusted legal tech ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}