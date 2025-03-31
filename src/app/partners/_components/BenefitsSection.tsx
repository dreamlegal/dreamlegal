"use client"
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Building2, Scale, FileText, Search, Zap, Users } from 'lucide-react';

import Modal from "./Modal"
const BenefitsSection = () => {
   const [showModal, setShowModal] = useState(false);
  const benefits = [
    {
      title: "For Legal Tech Companies",
      icon: Building2,
      features: [
        "Product Use Case Fit: Identify the best market segments for your product.",
        "AI Client Prospecting: Generate sector specific custom proposals with AI.",
        "Feature Validation: Test and refine features with real-world insights.",
        "Extensive Product Profiles: Showcase your product to attract customers.",
        "Managed Reviews and Social Proof: Build trust with verified reviews."
      ],
      buttonText: "Learn More",
      imagePath: "/partners/legal_tech.png",
      href: "/tech_vendor"
    },
    {
      title: "For Legal Services Providers",
      icon: Scale,
      features: [
        "Legal Ops Management: Streamline operations for business clients.",
        "Technology Implementation: Adopt tailored legal tech solutions easily.",
        "Better Workflows: Enhance efficiency and client outcomes."
      ],
      buttonText: "Learn More",
      imagePath: "/partners/legal_Service.png",
      href: ""
    },
    {
      title: "For Legal Ops/Legal Tech Consulting Companies",
      icon: FileText,
      features: [
        "AI Workflow Analysis: Offer data-driven insights for your clients.",
        "Access to Tech Directory: Explore a wide range of legal tech tools.",
        "Comparison Tools: Simplify technology evaluations.",
        "RFP Management: Streamline vendor proposals for your clients."
      ],
      buttonText: "Explore Solutions",
      imagePath: "/partners/legal_consulting.png",
      href: ""
    }
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#f5f7fa] 
                       rounded-full border border-[#7cc6ee]/20 shadow-lg 
                       transition-all duration-300 mb-10 group hover:shadow-xl">
            <Sparkles className="w-4 h-4 text-[#7cc6ee] animate-pulse" />
            <span className="text-sm font-semibold text-[#7cc6ee] 
                     transition-all duration-300">
              PARTNERSHIP BENEFITS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e2556] mb-6">
            How this partnership will benefit you?
          </h2>
        </div>

        {/* Benefits Cards */}
        <div className="space-y-32">
          {benefits.map((benefit, index) => {
            const isEven = index % 2 === 0;
            const Icon = benefit.icon;
            
            return (
              <div key={index} className={`relative rounded-3xl p-8 md:p-12 ${index % 2 === 0 ? 'bg-[#f5f7fa]' : 'bg-white border border-[#7cc6ee]/10'}`}>
                <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
                               items-center gap-12 py-8`}>
                  {/* Content Section */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-start flex-col md:flex-row md:items-center gap-3">
                        <div className="p-3 bg-[#1e2556] rounded-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                          <Sparkles className="w-4 h-4 text-[#7cc6ee]" />
                          <span className="text-base font-medium text-[#1e2556]">{benefit.title}</span>
                        </div>
                      </div>

                      <div className="space-y-4 pl-2">
                        {benefit.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-4 group/item 
                                               p-3 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-8 h-8 rounded-full bg-[#f5f7fa] flex items-center justify-center 
                                        group-hover/item:bg-[#f5f7fa] flex-shrink-0 border border-[#7cc6ee]/20">
                              <Zap className="w-4 h-4 text-[#7cc6ee]" />
                            </div>
                            <p className="text-[#2d2d2d] text-base">{feature}</p>
                          </div>
                        ))}
                      </div>

                        {benefit.href ? (
                        <a 
                          href={benefit.href}
                          className="mt-8 group inline-flex items-center gap-3 px-8 py-4 
                               bg-[#1e2556] 
                               text-white rounded-xl font-medium shadow-lg 
                               hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          {benefit.buttonText}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        ) : (
                        <button 
                          onClick={() => setShowModal(true)}
                          className="mt-8 group inline-flex items-center gap-3 px-8 py-4 
                               bg-[#1e2556] 
                               text-white rounded-xl font-medium shadow-lg 
                               hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          {benefit.buttonText}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        )}
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#1e2556] 
                                  rounded-2xl blur opacity-20 group-hover:opacity-40 
                                  transition duration-1000 group-hover:duration-200" />
                      
                      <div className="relative bg-white p-6 rounded-2xl shadow-xl 
                                  transform hover:scale-[1.02] transition-all duration-500 
                                  border border-[#7cc6ee]/10">
                        <img
                          src={benefit.imagePath}
                          alt={benefit.title}
                          className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default BenefitsSection;