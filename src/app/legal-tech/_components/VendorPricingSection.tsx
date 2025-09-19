
// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import { Check, X, Star, Crown, Zap, ArrowRight, Users, TrendingUp, CheckCircle, Settings } from 'lucide-react';

// // Custom hook for intersection observer
// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsIntersecting(entry.isIntersecting);
//     }, { threshold: 0.2, ...options });

//     const currentTarget = targetRef.current;
//     if (currentTarget) {
//       observer.observe(currentTarget);
//     }

//     return () => {
//       if (currentTarget) {
//         observer.unobserve(currentTarget);
//       }
//     };
//   }, [options]);

//   return [targetRef, isIntersecting];
// };

// const VendorPricingSection = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [userLocation, setUserLocation] = useState('IN'); // Default to India

//   // Detect user location (simplified - in real app you'd use proper geolocation)
//   useEffect(() => {
//     // This would be replaced with actual geolocation detection
//     const isIndianIP = true; // Placeholder
//     setUserLocation(isIndianIP ? 'IN' : 'US');
//   }, []);

//   const pricingPlans = [
//     {
//       name: "Free",
//       icon: <Zap className="w-6 h-6" />,
//       price: "₹0",
//       priceUS: "$0",
//       period: "",
//       subtitle: "Perfect for early-stage startups who need visibility without upfront costs.",
//       features: [
//         "Basic profile",
//         "Unlimited reviews",
//         "SEO-optimized listing", 
//         "Quarterly info update"
//       ],
//       highlight: "Great for testing visibility before scaling.Getting started with Dreamlegal",
//       cta: "Request Profile",
//       ctaStyle: "soft",
//       popular: false,
//       color: "#7cc6ee"
//     },
//     {
//       name: "Verified",
//       icon: <Star className="w-6 h-6" />,
//       price: "₹85,000",
//       priceUS: "$1,100",
//       period: "per year",
//       subtitle: "For growing vendors who want trust, credibility, and steady discovery by buyers.",
//       features: [
//         "Everything in free plan",
//         "Geo based listing preference",
//         "Social media post",
//         "Article review"
//       ],
//       highlight: "Best for companies with 5+ clients ready to accelerate discovery.",
//       cta: "Get Started",
//       ctaStyle: "main",
//       popular: false,
//       color: "#1e2556"
//     },
//     {
//       name: "Premium",
//       icon: <Crown className="w-6 h-6" />,
//       price: "₹4,20,000",
//       priceUS: "$5,500",
//       period: "per year",
//       subtitle: "Best for scale-ups ready to dominate their category and drive consistent inbound leads.",
//       features: [
//         "Everything in verified plan",
//         "Premium Partner tag",
//         "Demo video",
//         "Founder Interview",
//         "4 guide articles"
//       ],
//       highlight: "Ideal for vendors who want to outcompete rivals and own mindshare in their niche.",
//       cta: "Contact Team",
//       ctaStyle: "main",
//       popular: true,
//       color: "#1e2556"
//     },
//     {
//       name: "Custom Partnership",
//       icon: <Settings className="w-6 h-6" />,
//       price: "",
//       priceUS: "",
//       period: "",
//       placeholderText: "Custom Pricing",
//       placeholderSubtext: "Tailored to your needs",
//       subtitle: "Best for legacy vendors seeking tailored, strategic collaboration opportunities.",
//       features: [
//         "Market research",
//         "Competitive landscape",
//         "Custom reports",
//         "Tailored Growth campaigns"
//       ],
//       highlight: "Ideal for vendors looking to create exclusive, high-impact initiatives.",
//       cta: "Contact Team",
//       ctaStyle: "main",
//       popular: false,
//       color: "#1e2556"
//     }
//   ];

//   const comparisonFeatures = [
//     { name: "Basic Profile", free: true, verified: true, premium: true, custom: true },
//     { name: "Unlimited Reviews", free: true, verified: true, premium: true, custom: true },
//     { name: "SEO-optimized Listing", free: true, verified: true, premium: true, custom: true },
//     { name: "Quarterly Info Update", free: true, verified: true, premium: true, custom: true },
//     { name: "Geo Based Listing Preference", free: false, verified: true, premium: true, custom: true },
//     { name: "Social Media Post", free: false, verified: true, premium: true, custom: true },
//     { name: "Article Review", free: false, verified: true, premium: true, custom: true },
//     { name: "Premium Partner Tag", free: false, verified: false, premium: true, custom: true },
//     { name: "Demo Video", free: false, verified: false, premium: true, custom: true },
//     { name: "Founder Interview", free: false, verified: false, premium: true, custom: true },
//     { name: "Guide Articles", free: false, verified: false, premium: "4", custom: "Custom" },
//     { name: "Market Research", free: false, verified: false, premium: false, custom: true },
//     { name: "Competitive Landscape", free: false, verified: false, premium: false, custom: true },
//     { name: "Custom Reports", free: false, verified: false, premium: false, custom: true },
//     { name: "Tailored Growth Campaigns", free: false, verified: false, premium: false, custom: true }
//   ];

//   const PricingCard = ({ plan, index }) => (
//     <div
//       className={`relative group transform transition-all duration-700 hover:scale-105
//                  ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//       style={{ transitionDelay: `${index * 200}ms` }}
//     >
//       {plan.popular && (
//         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
//           <div className="bg-[#1e2556] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
//             Most Popular
//           </div>
//         </div>
//       )}
      
//       <div className={`relative rounded-2xl overflow-hidden h-full border-2 transition-all duration-300 flex flex-col
//                      ${plan.popular ? 'border-[#1e2556] shadow-2xl' : 'border-gray-200 hover:border-[#7cc6ee]/50 shadow-lg hover:shadow-xl'}`}>
//         <div className="absolute inset-0 bg-[#f5f7fa]" />
        
//         {/* Header */}
//         <div className="relative pl-8 pr-8 pt-8 pb-4 text-center">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 bg-[#1e2556]">
//             <div className="text-white">
//               {plan.icon}
//             </div>
//           </div>
          
//           <h3 className="text-xl font-bold text-[#1e2556] mb-3">{plan.name}</h3>
          
//           <div className="mb-4 h-16 flex flex-col justify-center">
//             {plan.price || plan.priceUS ? (
//               <>
//                 <span className="text-3xl font-bold text-[#1e2556]">
//                   {userLocation === 'IN' ? plan.price : plan.priceUS}
//                 </span>
//                 {plan.period && (
//                   <span className="text-[#334155] text-sm">
//                     {plan.period}
//                   </span>
//                 )}
//               </>
//             ) : (
//               <>
//                 <span className="text-2xl font-bold text-[#1e2556]">
//                   {plan.placeholderText}
//                 </span>
//                 <span className="text-[#334155] text-sm">
//                   {plan.placeholderSubtext}
//                 </span>
//               </>
//             )}
//           </div>
          
//           <p className="text-[#334155] text-sm leading-relaxed mb-6">
//             {plan.subtitle}
//           </p>
//         </div>

//         {/* Features */}
//         <div className="relative px-8 flex-grow flex flex-col">
//           <ul className="space-y-2 mb-6 flex-grow">
//             {plan.features.map((feature, idx) => (
//               <li key={idx} className="flex items-start gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                 <span className="text-[#2d2d2d] text-sm">{feature}</span>
//               </li>
//             ))}
//           </ul>
          
//           <div className="bg-[#7cc6ee]/10 rounded-lg p-4 mb-6 mt-auto">
//             <div className="flex items-center gap-2 mb-2">
//               <TrendingUp className="w-4 h-4 text-[#7cc6ee]" />
//               <span className="text-[#7cc6ee] font-semibold text-sm">Key Benefit</span>
//             </div>
//             <p className="text-[#2d2d2d] text-sm">
//               {plan.highlight}
//             </p>
//           </div>
          
//           <a href="#contact" className="w-full py-3 px-6 mb-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#1e2556] text-white hover:bg-[#2a3066] shadow-lg hover:shadow-xl">
//             {plan.cta}
//             <ArrowRight className="w-4 h-4" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );

//   const ComparisonTable = () => (
//     <div className={`transition-all duration-700 transform
//                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//          style={{ transitionDelay: '400ms' }}>
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//         {/* Table Header */}
//         <div className="bg-[#1e2556] text-white p-6">
//           <h3 className="text-xl font-bold text-center">Detailed Feature Comparison</h3>
//         </div>
        
//         {/* Table Content */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-[#f5f7fa] border-b">
//                 <th className="text-left p-4 font-semibold text-[#1e2556]">Feature</th>
//                 <th className="text-center p-4 font-semibold text-[#1e2556]">Free</th>
//                 <th className="text-center p-4 font-semibold text-[#1e2556]">Verified</th>
//                 <th className="text-center p-4 font-semibold text-[#1e2556]">Premium</th>
//                 <th className="text-center p-4 font-semibold text-[#1e2556]">Custom Partnership</th>
//               </tr>
//             </thead>
//             <tbody>
//               {comparisonFeatures.map((feature, index) => (
//                 <tr key={index} className={`border-b hover:bg-[#f5f7fa]/50 transition-colors
//                                           ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f7fa]/30'}`}>
//                   <td className="p-4 font-medium text-[#2d2d2d]">{feature.name}</td>
//                   <td className="p-4 text-center">
//                     {typeof feature.free === 'boolean' ? (
//                       feature.free ? (
//                         <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                       ) : (
//                         <X className="w-5 h-5 text-gray-400 mx-auto" />
//                       )
//                     ) : (
//                       <span className="text-[#2d2d2d] text-sm">{feature.free}</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-center">
//                     {typeof feature.verified === 'boolean' ? (
//                       feature.verified ? (
//                         <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                       ) : (
//                         <X className="w-5 h-5 text-gray-400 mx-auto" />
//                       )
//                     ) : (
//                       <span className="text-[#2d2d2d] text-sm">{feature.verified}</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-center">
//                     {typeof feature.premium === 'boolean' ? (
//                       feature.premium ? (
//                         <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                       ) : (
//                         <X className="w-5 h-5 text-gray-400 mx-auto" />
//                       )
//                     ) : (
//                       <span className="text-[#2d2d2d] text-sm">{feature.premium}</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-center">
//                     {typeof feature.custom === 'boolean' ? (
//                       feature.custom ? (
//                         <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
//                       ) : (
//                         <X className="w-5 h-5 text-gray-400 mx-auto" />
//                       )
//                     ) : (
//                       <span className="text-[#2d2d2d] text-sm">{feature.custom}</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div ref={sectionRef} id="vendor-pricing" className="w-full bg-white py-8 md:py-12 lg:py-24 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <div className={`mb-12 md:mb-20 text-center relative transition-all duration-700 transform
//                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-block">
//             <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
//               VENDOR PARTNERSHIPS
//             </span>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
//               Vendor Partnerships with DreamLegal
//               <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
//                            transform origin-left transition-transform duration-1000 
//                            ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//             </h2>
//             <p className="text-[#334155] mt-6 max-w-2xl mx-auto text-lg">
//               Choose the Plan That Matches Your Growth Stage
//             </p>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {pricingPlans.map((plan, index) => (
//             <PricingCard 
//               key={plan.name}
//               plan={plan} 
//               index={index}
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

import React, { useState, useEffect } from 'react';
import { Check, X, Star, Crown, Zap, ArrowRight, Users, TrendingUp, CheckCircle, Settings } from 'lucide-react';

const VendorPricingSection = () => {
  const [userLocation, setUserLocation] = useState('IN');

  useEffect(() => {
    // Simple location detection
    setUserLocation('IN'); // Default to India
  }, []);

  const pricingPlans = [
    {
      name: "Free",
      icon: <Zap className="w-6 h-6" />,
      price: "₹0",
      priceUS: "$0",
      period: "",
      subtitle: "Perfect for early-stage startups who need visibility without upfront costs.",
      features: [
        "Basic profile",
        "Unlimited reviews",
        "SEO-optimized listing", 
        "Quarterly info update"
      ],
      highlight: "Great for testing visibility before scaling. Getting started with Dreamlegal",
      cta: "Request Profile",
      popular: false
    },
    {
      name: "Verified",
      icon: <Star className="w-6 h-6" />,
      price: "₹85,000",
      priceUS: "$1,100",
      period: "per year",
      subtitle: "For growing vendors who want trust, credibility, and steady discovery by buyers.",
      features: [
        "Everything in free plan",
        "Geo based listing preference",
        "Social media post",
        "Article review"
      ],
      highlight: "Best for companies with 5+ clients ready to accelerate discovery.",
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      icon: <Crown className="w-6 h-6" />,
      price: "₹4,20,000",
      priceUS: "$5,500",
      period: "per year",
      subtitle: "Best for scale-ups ready to dominate their category and drive consistent inbound leads.",
      features: [
        "Everything in verified plan",
        "Premium Partner tag",
        "Demo video",
        "Founder Interview",
        "4 guide articles"
      ],
      highlight: "Ideal for vendors who want to outcompete rivals and own mindshare in their niche.",
      cta: "Contact Team",
      popular: true
    },
    {
      name: "Custom Partnership",
      icon: <Settings className="w-6 h-6" />,
      price: "",
      priceUS: "",
      period: "",
      placeholderText: "Custom Pricing",
      placeholderSubtext: "Tailored to your needs",
      subtitle: "Best for legacy vendors seeking tailored, strategic collaboration opportunities.",
      features: [
        "Market research",
        "Competitive landscape",
        "Custom reports",
        "Tailored Growth campaigns"
      ],
      highlight: "Ideal for vendors looking to create exclusive, high-impact initiatives.",
      cta: "Contact Team",
      popular: false
    }
  ];

  const comparisonFeatures = [
    { name: "Basic Profile", free: true, verified: true, premium: true, custom: true },
    { name: "Unlimited Reviews", free: true, verified: true, premium: true, custom: true },
    { name: "SEO-optimized Listing", free: true, verified: true, premium: true, custom: true },
    { name: "Quarterly Info Update", free: true, verified: true, premium: true, custom: true },
    { name: "Geo Based Listing Preference", free: false, verified: true, premium: true, custom: true },
    { name: "Social Media Post", free: false, verified: true, premium: true, custom: true },
    { name: "Article Review", free: false, verified: true, premium: true, custom: true },
    { name: "Premium Partner Tag", free: false, verified: false, premium: true, custom: true },
    { name: "Demo Video", free: false, verified: false, premium: true, custom: true },
    { name: "Founder Interview", free: false, verified: false, premium: true, custom: true },
    { name: "Guide Articles", free: false, verified: false, premium: "4", custom: "Custom" },
    { name: "Market Research", free: false, verified: false, premium: false, custom: true },
    { name: "Competitive Landscape", free: false, verified: false, premium: false, custom: true },
    { name: "Custom Reports", free: false, verified: false, premium: false, custom: true },
    { name: "Tailored Growth Campaigns", free: false, verified: false, premium: false, custom: true }
  ];

  const PricingCard = ({ plan }) => (
    <div className="relative group hover:scale-105 transition-transform duration-200">
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className={`relative rounded-2xl overflow-hidden h-full border-2 flex flex-col ${
        plan.popular 
          ? 'border-blue-900 shadow-2xl' 
          : 'border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
      }`}>
        <div className="absolute inset-0 bg-gray-50" />
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 bg-blue-900">
            <div className="text-white">
              {plan.icon}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-blue-900 mb-3">{plan.name}</h3>
          
          <div className="mb-4 h-16 flex flex-col justify-center">
            {plan.price || plan.priceUS ? (
              <>
                <span className="text-3xl font-bold text-blue-900">
                  {userLocation === 'IN' ? plan.price : plan.priceUS}
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
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {plan.subtitle}
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
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">Key Benefit</span>
            </div>
            <p className="text-gray-700 text-sm">
              {plan.highlight}
            </p>
          </div>
          
          <button 
            className="w-full py-3 px-6 mb-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl transition-colors duration-200"
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
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
              <th className="text-center p-4 font-semibold text-blue-900">Growth Program</th>
              <th className="text-center p-4 font-semibold text-blue-900">Custom Partnership</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr key={index} className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
              }`}>
                <td className="p-4 font-medium text-gray-800">{feature.name}</td>
                <td className="p-4 text-center">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-gray-700 text-sm">{feature.free}</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.verified === 'boolean' ? (
                    feature.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-gray-700 text-sm">{feature.verified}</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.premium === 'boolean' ? (
                    feature.premium ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-gray-700 text-sm">{feature.premium}</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {typeof feature.custom === 'boolean' ? (
                    feature.custom ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-gray-700 text-sm">{feature.custom}</span>
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