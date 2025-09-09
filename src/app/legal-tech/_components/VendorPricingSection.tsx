"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Check, X, Star, Crown, Zap, ArrowRight, Users, TrendingUp } from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const VendorPricingSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState('pricing');
  const [userLocation, setUserLocation] = useState('IN'); // Default to India

  // Detect user location (simplified - in real app you'd use proper geolocation)
  useEffect(() => {
    // This would be replaced with actual geolocation detection
    const isIndianIP = true; // Placeholder
    setUserLocation(isIndianIP ? 'IN' : 'US');
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
        "Basic profile + unlimited reviews",
        "SEO optimized listing", 
        "Quarterly info updates"
      ],
      highlight: "Great for testing visibility before scaling.",
      cta: "Request Profile",
      ctaStyle: "soft",
      popular: false,
      color: "#7cc6ee"
    },
    {
      name: "Verified",
      icon: <Star className="w-6 h-6" />,
      price: "₹85,000",
      priceUS: "$1,100",
      period: "per year",
      subtitle: "For growing vendors who want trust, credibility, and steady discovery by buyers.",
      features: [
        "Advanced profile with verified badge (lifetime)",
        "SEO + Geo-based visibility",
        "Premium listing above non-paid members",
        "Social media post + article review",
        "5 ICP-qualified leads"
      ],
      highlight: "Best for companies with 5+ clients ready to accelerate discovery.",
      cta: "Get Started",
      ctaStyle: "main",
      popular: true,
      color: "#1e2556"
    },
    {
      name: "Premium",
      icon: <Crown className="w-6 h-6" />,
      price: "Custom",
      priceUS: "Custom",
      period: "pricing",
      subtitle: "Best for scale-ups ready to dominate their category and drive consistent inbound leads.",
      features: [
        "Everything in Verified + Premium Partner tag",
        "Multiple content features (demo video, website articles, founder interview)",
        "4 article reviews per year",
        "25 ICP-qualified leads"
      ],
      highlight: "Ideal for vendors who want to outcompete rivals and own mindshare in their niche.",
      cta: "Contact Partnership Team",
      ctaStyle: "main",
      popular: false,
      color: "#1e2556"
    }
  ];

  const comparisonFeatures = [
    { name: "Profile", free: "Basic", verified: "Advanced", premium: "Advanced" },
    { name: "Review Collection", free: "Yes (unlimited)", verified: "Yes (unlimited)", premium: "Yes (unlimited)" },
    { name: "SEO Optimization", free: false, verified: true, premium: true },
    { name: "Quarterly Info Update", free: false, verified: true, premium: true },
    { name: "Premium Listing", free: false, verified: true, premium: true },
    { name: "Geo-Based Visibility", free: false, verified: true, premium: true },
    { name: "Review Badge", free: false, verified: "Lifetime", premium: "Lifetime" },
    { name: "Special Tag", free: false, verified: "Verified Tick (1yr)", premium: "Premium Partner Tag (1yr)" },
    { name: "Social Media Post", free: false, verified: true, premium: true },
    { name: "Article Review", free: false, verified: "1", premium: "4" },
    { name: "Demo Video", free: false, verified: false, premium: true },
    { name: "Website Articles", free: false, verified: false, premium: true },
    { name: "Leads", free: false, verified: "5 ICP-qualified leads", premium: "25 ICP-qualified leads" },
    { name: "Founder Interview", free: false, verified: false, premium: true }
  ];

  const PricingCard = ({ plan, index, isPopular }) => (
    <div
      className={`relative group transform transition-all duration-700 
                 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                 ${isPopular ? 'scale-105 z-10' : 'hover:scale-105'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-[#7cc6ee] text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}
      
      <div className={`relative rounded-2xl overflow-hidden h-full border-2 transition-all duration-300
                     ${isPopular ? 'border-[#7cc6ee] shadow-2xl' : 'border-gray-200 hover:border-[#7cc6ee]/50 shadow-lg hover:shadow-xl'}`}>
        <div className="absolute inset-0 bg-[#f5f7fa]" />
        
        {/* Header */}
        <div className="relative pl-8 pr-8 pt-8 pb-4 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4
                         ${isPopular ? 'bg-[#7cc6ee]' : 'bg-[#1e2556]'}`}>
            <div className="text-white">
              {plan.icon}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-[#1e2556] mb-2">{plan.name}</h3>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-[#1e2556]">
              {userLocation === 'IN' ? plan.price : plan.priceUS}
            </span>
            {plan.period && (
              <span className="text-[#334155] ml-2">
                {plan.period}
              </span>
            )}
          </div>
          
          <p className="text-[#334155] text-sm leading-relaxed mb-6">
            {plan.subtitle}
          </p>
        </div>

        {/* Features */}
        <div className="relative px-8 pb-8">
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#7cc6ee] mt-0.5 flex-shrink-0" />
                <span className="text-[#2d2d2d] text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-[#7cc6ee]/10 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#7cc6ee]" />
              <span className="text-[#7cc6ee] font-semibold text-sm">Key Benefit</span>
            </div>
            <p className="text-[#2d2d2d] text-sm">
              {plan.highlight}
            </p>
          </div>
          
          <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                           ${plan.ctaStyle === 'main' 
                             ? 'bg-[#1e2556] text-white hover:bg-[#2a3066] shadow-lg hover:shadow-xl' 
                             : 'bg-[#7cc6ee] text-white hover:bg-[#6bb3db] shadow-lg hover:shadow-xl'}`}>
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ComparisonTable = () => (
    <div className={`transition-all duration-700 transform
                   ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
         style={{ transitionDelay: '400ms' }}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="bg-[#1e2556] text-white p-6">
          <h3 className="text-xl font-bold text-center">Detailed Feature Comparison</h3>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f7fa] border-b">
                <th className="text-left p-4 font-semibold text-[#1e2556]">Feature</th>
                <th className="text-center p-4 font-semibold text-[#1e2556]">Free</th>
                <th className="text-center p-4 font-semibold text-[#1e2556]">Verified</th>
                <th className="text-center p-4 font-semibold text-[#1e2556]">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr key={index} className={`border-b hover:bg-[#f5f7fa]/50 transition-colors
                                          ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f7fa]/30'}`}>
                  <td className="p-4 font-medium text-[#2d2d2d]">{feature.name}</td>
                  <td className="p-4 text-center">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-[#7cc6ee] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#2d2d2d] text-sm">{feature.free}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.verified === 'boolean' ? (
                      feature.verified ? (
                        <Check className="w-5 h-5 text-[#7cc6ee] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#2d2d2d] text-sm">{feature.verified}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <Check className="w-5 h-5 text-[#7cc6ee] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#2d2d2d] text-sm">{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full bg-white py-8 md:py-12 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`mb-12 md:mb-20 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              VENDOR PARTNERSHIPS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
              Vendor Partnerships with DreamLegal
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-[#334155] mt-6 max-w-2xl mx-auto text-lg">
              Choose the Plan That Matches Your Growth Stage
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '200ms' }}>
          <div className="bg-[#f5f7fa] rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                         ${activeTab === 'pricing' 
                           ? 'bg-[#1e2556] text-white shadow-lg' 
                           : 'text-[#334155] hover:text-[#1e2556]'}`}
            >
              Pricing Plans
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                         ${activeTab === 'comparison' 
                           ? 'bg-[#1e2556] text-white shadow-lg' 
                           : 'text-[#334155] hover:text-[#1e2556]'}`}
            >
              Feature Comparison
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        {activeTab === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={plan.name}
                plan={plan} 
                index={index}
                isPopular={plan.popular}
              />
            ))}
          </div>
        )}

        {/* Comparison Table */}
        {activeTab === 'comparison' && <ComparisonTable />}

        {/* Bottom CTA */}
        {/* <div className={`text-center mt-16 transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '600ms' }}>
          <div className="bg-[#1e2556] rounded-2xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-[#7cc6ee]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready to accelerate your growth?
              </h3>
            </div>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of legal tech vendors who trust DreamLegal to connect them with qualified buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#7cc6ee] text-white px-8 py-3 rounded-xl font-semibold 
                               hover:bg-[#6bb3db] transition-all duration-300 shadow-lg hover:shadow-xl
                               flex items-center justify-center gap-2">
                Start Free Profile
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold 
                               hover:bg-white hover:text-[#1e2556] transition-all duration-300
                               flex items-center justify-center gap-2">
                Talk to Partnership Team
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VendorPricingSection;