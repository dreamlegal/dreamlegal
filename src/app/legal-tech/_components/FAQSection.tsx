"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Users, ArrowRight, HelpCircle } from 'lucide-react';

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

const FAQSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I start with a Free listing and upgrade later?",
      answer: "Yes. Many vendors begin with a Free profile and then upgrade to Verified or Premium as they grow. Upgrading is seamless, and all your data stays intact."
    },
    {
      question: "What does a \"Verified Vendor\" badge mean?",
      answer: "The Verified badge shows buyers that your company has been authenticated by DreamLegal. It signals trust, improves your ranking, and increases buyer engagement with your profile."
    },
    {
      question: "What is included in \"Premium Vendor\" leads?",
      answer: "Premium vendors receive a fixed number of qualified leads—buyers who are actively searching and match your ideal customer profile (ICP). Every lead is validated before we share it."
    },
    {
      question: "How do you define a \"qualified lead\"?",
      answer: "A qualified lead is a buyer who has expressed intent (e.g., demo request, product comparison, or category inquiry) and matches your target criteria like size, industry, or region."
    },
    {
      question: "Can I cancel or downgrade my plan?",
      answer: "Plans are annual commitments and cannot be cancelled or downgraded mid-cycle. This ensures consistency and better visibility for vendors while buyers see only reliable, long-term profiles."
    },
    {
      question: "Do you offer refunds?",
      answer: "No. We do not offer refunds once a plan is activated. This policy ensures fairness across all vendors and allows us to commit resources fully to delivering your visibility, credibility, and leads."
    },
    {
      question: "What's the first step for vendors?",
      answer: "The first step is simple: create your DreamLegal profile. This is your foundation for visibility—buyers can only discover, trust, and connect with you once your profile is live. From there, you can choose to stay Free, or upgrade to Verified or Premium for higher impact."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const FAQItem = ({ faq, index, isActive }) => (
    <div
      className={`relative group transform transition-all duration-700 
                 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`bg-[#f5f7fa] rounded-xl border-2 transition-all duration-300 overflow-hidden
                     ${isActive ? 'border-[#7cc6ee] shadow-lg' : 'border-gray-200 hover:border-[#7cc6ee]/50 hover:shadow-md'}`}>
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4 group-hover:bg-[#7cc6ee]/5 transition-colors duration-300"
        >
          <h3 className="text-base md:text-lg font-semibold text-[#1e2556] leading-relaxed pr-4">
            {faq.question}
          </h3>
          <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300
                         ${isActive ? 'bg-[#7cc6ee] text-white' : 'bg-[#1e2556] text-white group-hover:bg-[#7cc6ee]'}`}>
            {isActive ? (
              <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
                       ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="w-full h-px bg-[#7cc6ee]/20 mb-4"></div>
            <p className="text-[#2d2d2d] text-sm md:text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full bg-white py-8 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`mb-8 md:mb-12 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block leading-tight">
              Got Questions? We've Got Answers
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-[#334155] mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg">
              Everything you need to know about our vendor partnership program
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>

        {/* Final CTA */}
        <div className={`text-center transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '800ms' }}>
          <div className="bg-[#1e2556] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-[#7cc6ee]" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Ready to accelerate your growth?
              </h3>
            </div>
            <p className="text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Join hundreds of legal tech vendors who trust DreamLegal to connect them with qualified buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="bg-[#7cc6ee] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl font-semibold 
                               hover:bg-[#6bb3db] transition-all duration-300 shadow-lg hover:shadow-xl
                               flex items-center justify-center gap-2 text-sm md:text-base">
                Start Free Profile
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl font-semibold 
                               hover:bg-white hover:text-[#1e2556] transition-all duration-300
                               flex items-center justify-center gap-2 text-sm md:text-base">
                Talk to Partnership Team
              </button>
            </div>
          </div>
        </div>

        {/* Still have questions? */}
        <div className={`text-center mt-8 md:mt-12 transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '900ms' }}>
          <div className="flex items-center justify-center gap-2 text-[#334155]">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm md:text-base">
              Still have questions? 
              <a href="#contact" className="text-[#7cc6ee] hover:text-[#6bb3db] font-semibold ml-1 transition-colors">
                Contact our team
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;