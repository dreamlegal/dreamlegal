
// "use client"

// import React, { useState, useEffect } from 'react';
// import { Check, X, Star, Crown, Zap, ArrowRight, Users, TrendingUp, CheckCircle, Settings, Building } from 'lucide-react';

// const VendorPricingSection = () => {
//   const [userLocation, setUserLocation] = useState('US');

//   useEffect(() => {
//     // Detect user location based on IP
//     const detectLocation = async () => {
//       try {
//         const response = await fetch('https://ipapi.co/json/');
//         const data = await response.json();
        
//         // Set location based on country code
//         if (data.country_code === 'IN') {
//           setUserLocation('IN');
//         } else {
//           setUserLocation('US');
//         }
//       } catch (error) {
//         console.error('Error detecting location:', error);
//         // Default to US if detection fails
//         setUserLocation('US');
//       }
//     };
    
//     detectLocation();
//   }, []);

//   const pricingPlans = [
//     {
//       name: "Free",
//       icon: <Zap className="w-6 h-6" />,
//       price: "₹0",
//       priceUS: "$0",
//       subtitle: "Perfect for early-stage companies that need visibility without upfront costs.",
//       targetAudience: "Ideal for companies with 0-5 clients",
//       features: [
//         "Create your professional DreamLegal profile",
//         "Standard vendor information page",
//         "Collect customer success stories and testimonials",
//         "Benefit from organic profile distribution reaching 50,000+ legal practitioners",
//         "Access to DreamLegal community forum and peer support",
//         "Share customer testimonials across partner legal platforms"
//       ],
//       highlight: "Start for free by claiming your profile, collecting client success stories, and building initial legal market credibility on DreamLegal.",
//       cta: "Get Started Free",
//       popular: false
//     },
//     {
//       name: "Launchpad",
//       icon: <Star className="w-6 h-6" />,
//       price: "₹45,000",
//       priceUS: "$599",
//       period: "per year",
//       subtitle: "For growing vendors who want trust, credibility, and steady discovery by buyers.",
//       targetAudience: "Ideal for companies with 5-15 clients",
//       features: [
//         "Create your professional DreamLegal profile",
//         "Standard vendor information page",
//         "Collect customer success stories and testimonials",
//         "Benefit from organic profile distribution reaching 50,000+ legal practitioners",
//         "Access to the DreamLegal community forum and peer support",
//         "Share customer testimonials across partner legal platforms",
//         "Geo-based product visibility",
//         "Product review article with dedicated badge",
//         "Social media post to kickstart visibility"
//       ],
//       highlight: "Help buyers find you, build credibility, and start converting inbound interest into meetings.",
//       cta: "Get Started",
//       popular: false
//     },
//     {
//       name: "Growth Program",
//       icon: <Crown className="w-6 h-6" />,
//       price: "",
//       priceUS: "",
//       period: "",
//       placeholderText: "Contact Sales",
//       placeholderSubtext: "Custom pricing",
//       subtitle: "Best for scale-ups ready to dominate their category and drive consistent inbound leads.",
//       targetAudience: "Ideal for companies with 15+ clients",
//       features: [
//         "Everything in Launchpad, plus:",
//         "Premium Partner badge and priority placement in buyer searches",
//         "Professionally produced demo video (short product/service demo)",
//         "Founder/leadership interview (editorial feature)",
//         "Up to 4 long-form guide articles or thought-leadership pieces published by DreamLegal",
//         "Targeted email spotlight to segmented buyer lists",
//         "Cross-posting of testimonials across partner legal platforms and channels",
//         "Monthly performance & lead-quality reporting with recommendations"
//       ],
//       highlight: "Ideal for vendors who want to outcompete rivals and own mindshare in their niche.",
//       cta: "Contact Sales",
//       popular: true
//     },
//     {
//       name: "Enterprise Package",
//       icon: <Building className="w-6 h-6" />,
//       price: "",
//       priceUS: "",
//       period: "",
//       placeholderText: "Contact Sales",
//       placeholderSubtext: "Custom solutions",
//       subtitle: "Everything in the Growth Program, customizable at scale.",
//       targetAudience: "Ideal for vendors looking to create exclusive, high-impact initiatives",
//       features: [
//         "Everything in the Growth Program, customizable at scale",
//         "Custom research & market landscape report for chosen verticals/regions",
//         "Competitive benchmarking and go-to-market playbook development",
//         "Bespoke content campaigns (co-branded whitepapers, webinars, multi-touch sequences)",
//         "Tailored growth campaigns (paid + organic) across DreamLegal & partner networks",
//         "Custom reporting dashboards and ROI measurement (monthly cadence)",
//         "Options for exclusive marketplace placement and cohort-based buyer introductions"
//       ],
//       highlight: "Ideal for vendors looking to create exclusive, high-impact initiatives.",
//       cta: "Contact Sales",
//       popular: false
//     }
//   ];

//   const comparisonFeatures = [
//     { name: "DreamLegal Profile creation", free: true, launchpad: true, growth: true, enterprise: true },
//     { name: "Collect Customer Success Stories & Testimonials", free: true, launchpad: true, growth: true, enterprise: true },
//     { name: "Access to Community Forum & Peer Support", free: false, launchpad: true, growth: true, enterprise: true },
//     { name: "Verified Product badge", free: false, launchpad: true, growth: true, enterprise: true },
//     { name: "Product Review Article", free: false, launchpad: true, growth: true, enterprise: true },
//     { name: "Product Use case Article: Targeting workflow/ User Persona", free: false, launchpad: true, growth: true, enterprise: true },
//     { name: "Premium Partner Badge", free: false, launchpad: false, growth: true, enterprise: true },
//     { name: "Two custom award badges: User love us/ Report/ Milestone/ Annual", free: false, launchpad: false, growth: true, enterprise: true },
//     { name: "Thought Leadership / Long-form Articles (up to 4)", free: false, launchpad: false, growth: true, enterprise: true },
//     { name: "Founder / Leadership Interview (Editorial Feature)", free: false, launchpad: false, growth: true, enterprise: true },
//     { name: "Custom Research & Market Landscape Report", free: false, launchpad: false, growth: false, enterprise: true },
//     { name: "Competitive Benchmarking & Market dominance", free: false, launchpad: false, growth: false, enterprise: true },
//     { name: "Co-branded Content Campaigns (Webinars, Whitepapers)", free: false, launchpad: false, growth: false, enterprise: true },
//     { name: "Exclusive Marketplace Placement", free: false, launchpad: false, growth: false, enterprise: true }
//   ];

//   const PricingCard = ({ plan }) => (
//     <div className="relative group hover:scale-105 transition-transform duration-200">
//       {plan.popular && (
//         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
//           <div className="bg-blue-900 text-white px-6 py-2 text-sm font-semibold shadow-lg">
//             Most Popular
//           </div>
//         </div>
//       )}
      
//       <div className={`relative overflow-hidden h-full border-2 flex flex-col ${
//         plan.popular 
//           ? 'border-blue-900 shadow-2xl' 
//           : 'border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
//       }`}>
//         <div className="absolute inset-0 bg-gray-50" />
        
//         {/* Header */}
//         <div className="relative px-8 pt-8 pb-4 text-center">
//           <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-900">
//             <div className="text-white">
//               {plan.icon}
//             </div>
//           </div>
          
//           <h3 className="text-xl font-bold text-blue-900 mb-3">{plan.name}</h3>
          
//           <div className="mb-4 h-16 flex flex-col justify-center">
//             {plan.price || plan.priceUS ? (
//               <>
//                 <span className="text-3xl font-bold text-blue-900">
//                   {userLocation === 'IN' ? plan.price : plan.priceUS}
//                 </span>
//                 {plan.period && (
//                   <span className="text-gray-600 text-sm">
//                     {plan.period}
//                   </span>
//                 )}
//               </>
//             ) : (
//               <>
//                 <span className="text-2xl font-bold text-blue-900">
//                   {plan.placeholderText}
//                 </span>
//                 <span className="text-gray-600 text-sm">
//                   {plan.placeholderSubtext}
//                 </span>
//               </>
//             )}
//           </div>
          
//           <p className="text-gray-600 text-sm leading-relaxed mb-2">
//             {plan.subtitle}
//           </p>
          
//           <p className="text-blue-600 text-xs font-medium mb-6">
//             {plan.targetAudience}
//           </p>
//         </div>

//         {/* Features */}
//         <div className="relative px-8 flex-grow flex flex-col">
//           <ul className="space-y-3 mb-6 flex-grow">
//             {plan.features.map((feature, idx) => (
//               <li key={idx} className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-700 text-sm">{feature}</span>
//               </li>
//             ))}
//           </ul>
          
//           <div className="bg-blue-50 p-4 mb-6">
//             <div className="flex items-center gap-2 mb-2">
//               <TrendingUp className="w-4 h-4 text-blue-600" />
//               <span className="text-blue-600 font-semibold text-sm">Key Benefit</span>
//             </div>
//             <p className="text-gray-700 text-sm">
//               {plan.highlight}
//             </p>
//           </div>
          
//           <button 
//             className="w-full py-3 px-6 mb-4 font-semibold flex items-center justify-center gap-2 bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl transition-colors duration-200"
//             onClick={() => {
//               console.log(`Clicked ${plan.cta} for ${plan.name}`);
//             }}
//           >
//             {plan.cta}
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const ComparisonTable = () => (
//     <div className="bg-white shadow-xl overflow-hidden border border-gray-200">
//       {/* Table Header */}
//       <div className="bg-blue-900 text-white p-6">
//         <h3 className="text-xl font-bold text-center">Detailed Feature Comparison</h3>
//       </div>
      
//       {/* Table Content */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50 border-b">
//               <th className="text-left p-4 font-semibold text-blue-900">Feature</th>
//               <th className="text-center p-4 font-semibold text-blue-900">Free</th>
//               <th className="text-center p-4 font-semibold text-blue-900">Launchpad</th>
//               <th className="text-center p-4 font-semibold text-blue-900">Growth</th>
//               <th className="text-center p-4 font-semibold text-blue-900">Enterprise</th>
//             </tr>
//           </thead>
//           <tbody>
//             {comparisonFeatures.map((feature, index) => (
//               <tr key={index} className={`border-b hover:bg-gray-50 transition-colors ${
//                 index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
//               }`}>
//                 <td className="p-4 font-medium text-gray-800">{feature.name}</td>
//                 <td className="p-4 text-center">
//                   {feature.free ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                   ) : (
//                     <X className="w-5 h-5 text-gray-400 mx-auto" />
//                   )}
//                 </td>
//                 <td className="p-4 text-center">
//                   {feature.launchpad ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                   ) : (
//                     <X className="w-5 h-5 text-gray-400 mx-auto" />
//                   )}
//                 </td>
//                 <td className="p-4 text-center">
//                   {feature.growth ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                   ) : (
//                     <X className="w-5 h-5 text-gray-400 mx-auto" />
//                   )}
//                 </td>
//                 <td className="p-4 text-center">
//                   {feature.enterprise ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                   ) : (
//                     <X className="w-5 h-5 text-gray-400 mx-auto" />
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div id="vendor-pricing" className="w-full bg-white py-8 md:py-12 lg:py-24 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <div className="mb-12 md:mb-20 text-center relative">
//           <div className="inline-block">
//             <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//               VENDOR PARTNERSHIPS
//             </span>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 relative inline-block">
//               Vendor Partnerships with DreamLegal
//               <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600" />
//             </h2>
//             <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
//               Choose the Plan That Matches Your Growth Stage
//             </p>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {pricingPlans.map((plan) => (
//             <PricingCard 
//               key={plan.name}
//               plan={plan} 
//             />
//           ))}
//         </div>

//         {/* Comparison Table */}
//         <ComparisonTable />
//       </div>
//     </div>
//   );
// };

// export default VendorPricingSection;
"use client"

import React from 'react';
import { Check, X, Star, Crown, Zap, ArrowRight, Users, TrendingUp, CheckCircle, Settings, Building } from 'lucide-react';

const VendorPricingSection = () => {
  const pricingPlans = [
    {
      name: "Free",
      icon: <Zap className="w-6 h-6" />,
      price: "$0",
      subtitle: "Perfect for early-stage companies that need visibility without upfront costs.",
      targetAudience: "Ideal for companies with 0-5 clients",
      features: [
        "Create your professional DreamLegal profile",
        "Standard vendor information page",
        "Collect customer success stories and testimonials",
        "Benefit from organic profile distribution reaching 50,000+ legal practitioners",
        "Access to DreamLegal community forum and peer support",
        "Share customer testimonials across partner legal platforms"
      ],
      highlight: "Start for free by claiming your profile, collecting client success stories, and building initial legal market credibility on DreamLegal.",
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Launchpad",
      icon: <Star className="w-6 h-6" />,
      price: "$599",
      period: "per year",
      subtitle: "For growing vendors who want trust, credibility, and steady discovery by buyers.",
      targetAudience: "Ideal for companies with 5-15 clients",
      features: [
        "Create your professional DreamLegal profile",
        "Standard vendor information page",
        "Collect customer success stories and testimonials",
        "Benefit from organic profile distribution reaching 50,000+ legal practitioners",
        "Access to the DreamLegal community forum and peer support",
        "Share customer testimonials across partner legal platforms",
        "Geo-based product visibility",
        "Product review article with dedicated badge",
        "Social media post to kickstart visibility"
      ],
      highlight: "Help buyers find you, build credibility, and start converting inbound interest into meetings.",
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth Program",
      icon: <Crown className="w-6 h-6" />,
      price: "",
      period: "",
      placeholderText: "Contact Sales",
      placeholderSubtext: "Custom pricing",
      subtitle: "Best for scale-ups ready to dominate their category and drive consistent inbound leads.",
      targetAudience: "Ideal for companies with 15+ clients",
      features: [
        "Everything in Launchpad, plus:",
        "Premium Partner badge and priority placement in buyer searches",
        "Professionally produced demo video (short product/service demo)",
        "Founder/leadership interview (editorial feature)",
        "Up to 4 long-form guide articles or thought-leadership pieces published by DreamLegal",
        "Targeted email spotlight to segmented buyer lists",
        "Cross-posting of testimonials across partner legal platforms and channels",
        "Monthly performance & lead-quality reporting with recommendations"
      ],
      highlight: "Ideal for vendors who want to outcompete rivals and own mindshare in their niche.",
      cta: "Contact Sales",
      popular: true
    },
    {
      name: "Enterprise Package",
      icon: <Building className="w-6 h-6" />,
      price: "",
      period: "",
      placeholderText: "Contact Sales",
      placeholderSubtext: "Custom solutions",
      subtitle: "Everything in the Growth Program, customizable at scale.",
      targetAudience: "Ideal for vendors looking to create exclusive, high-impact initiatives",
      features: [
        "Everything in the Growth Program, customizable at scale",
        "Custom research & market landscape report for chosen verticals/regions",
        "Competitive benchmarking and go-to-market playbook development",
        "Bespoke content campaigns (co-branded whitepapers, webinars, multi-touch sequences)",
        "Tailored growth campaigns (paid + organic) across DreamLegal & partner networks",
        "Custom reporting dashboards and ROI measurement (monthly cadence)",
        "Options for exclusive marketplace placement and cohort-based buyer introductions"
      ],
      highlight: "Ideal for vendors looking to create exclusive, high-impact initiatives.",
      cta: "Contact Sales",
      popular: false
    }
  ];

  const comparisonFeatures = [
    { name: "DreamLegal Profile creation", free: true, launchpad: true, growth: true, enterprise: true },
    { name: "Collect Customer Success Stories & Testimonials", free: true, launchpad: true, growth: true, enterprise: true },
    { name: "Access to Community Forum & Peer Support", free: false, launchpad: true, growth: true, enterprise: true },
    { name: "Verified Product badge", free: false, launchpad: true, growth: true, enterprise: true },
    { name: "Product Review Article", free: false, launchpad: true, growth: true, enterprise: true },
    { name: "Product Use case Article: Targeting workflow/ User Persona", free: false, launchpad: true, growth: true, enterprise: true },
    { name: "Premium Partner Badge", free: false, launchpad: false, growth: true, enterprise: true },
    { name: "Two custom award badges: User love us/ Report/ Milestone/ Annual", free: false, launchpad: false, growth: true, enterprise: true },
    { name: "Thought Leadership / Long-form Articles (up to 4)", free: false, launchpad: false, growth: true, enterprise: true },
    { name: "Founder / Leadership Interview (Editorial Feature)", free: false, launchpad: false, growth: true, enterprise: true },
    { name: "Custom Research & Market Landscape Report", free: false, launchpad: false, growth: false, enterprise: true },
    { name: "Competitive Benchmarking & Market dominance", free: false, launchpad: false, growth: false, enterprise: true },
    { name: "Co-branded Content Campaigns (Webinars, Whitepapers)", free: false, launchpad: false, growth: false, enterprise: true },
    { name: "Exclusive Marketplace Placement", free: false, launchpad: false, growth: false, enterprise: true }
  ];

  const PricingCard = ({ plan }) => (
    <div className="relative group hover:scale-105 transition-transform duration-200">
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-blue-900 text-white px-6 py-2 text-sm font-semibold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className={`relative overflow-hidden h-full border-2 flex flex-col ${
        plan.popular 
          ? 'border-blue-900 shadow-2xl' 
          : 'border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
      }`}>
        <div className="absolute inset-0 bg-gray-50" />
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-900">
            <div className="text-white">
              {plan.icon}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-blue-900 mb-3">{plan.name}</h3>
          
          <div className="mb-4 h-16 flex flex-col justify-center">
            {plan.price ? (
              <>
                <span className="text-3xl font-bold text-blue-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-gray-600 text-sm">
                    {plan.period}
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-blue-900">
                  {plan.placeholderText}
                </span>
                <span className="text-gray-600 text-sm">
                  {plan.placeholderSubtext}
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            {plan.subtitle}
          </p>
          
          <p className="text-blue-600 text-xs font-medium mb-6">
            {plan.targetAudience}
          </p>
        </div>

        {/* Features */}
        <div className="relative px-8 flex-grow flex flex-col">
          <ul className="space-y-3 mb-6 flex-grow">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-50 p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">Key Benefit</span>
            </div>
            <p className="text-gray-700 text-sm">
              {plan.highlight}
            </p>
          </div>
          
          <button 
            className="w-full py-3 px-6 mb-4 font-semibold flex items-center justify-center gap-2 bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl transition-colors duration-200"
            onClick={() => {
              console.log(`Clicked ${plan.cta} for ${plan.name}`);
            }}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ComparisonTable = () => (
    <div className="bg-white shadow-xl overflow-hidden border border-gray-200">
      {/* Table Header */}
      <div className="bg-blue-900 text-white p-6">
        <h3 className="text-xl font-bold text-center">Detailed Feature Comparison</h3>
      </div>
      
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-semibold text-blue-900">Feature</th>
              <th className="text-center p-4 font-semibold text-blue-900">Free</th>
              <th className="text-center p-4 font-semibold text-blue-900">Launchpad</th>
              <th className="text-center p-4 font-semibold text-blue-900">Growth</th>
              <th className="text-center p-4 font-semibold text-blue-900">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr key={index} className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
              }`}>
                <td className="p-4 font-medium text-gray-800">{feature.name}</td>
                <td className="p-4 text-center">
                  {feature.free ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature.launchpad ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature.growth ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature.enterprise ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div id="vendor-pricing" className="w-full bg-white py-8 md:py-12 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center relative">
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              VENDOR PARTNERSHIPS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 relative inline-block">
              Vendor Partnerships with DreamLegal
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600" />
            </h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
              Choose the Plan That Matches Your Growth Stage
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.name}
              plan={plan} 
            />
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />
      </div>
    </div>
  );
};

export default VendorPricingSection;