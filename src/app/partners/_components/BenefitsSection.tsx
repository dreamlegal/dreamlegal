// import React from 'react';
// import { Sparkles, ArrowRight, Building2, Scale, FileText, Search, Zap, Users } from 'lucide-react';

// const BenefitsSection = () => {
//   const benefits = [
//     {
//       title: "For Legal Tech Companies",
//       icon: Building2,
//       features: [
//         "Product Use Case Fit: Identify the best market segments for your product.",
//         "AI Client Prospecting: Generate sector specific custom proposals with AI.",
//         "Feature Validation: Test and refine features with real-world insights.",
//         "Extensive Product Profiles: Showcase your product to attract customers.",
//         "Managed Reviews and Social Proof: Build trust with verified reviews."
//       ],
//       buttonText: "Read More",
//       imagePath: "/partners/legal_tech.png"
//     },
//     {
//       title: "For Legal Services Providers",
//       icon: Scale,
//       features: [
//         "Legal Ops Management: Streamline operations for business clients.",
//         "Technology Implementation: Adopt tailored legal tech solutions easily.",
//         "Better Workflows: Enhance efficiency and client outcomes."
//       ],
//       buttonText: "Learn More",
//       imagePath: "/partners/legal_Service.png"
//     },
//     {
//       title: "For Legal Ops/Legal Tech Consulting Companies",
//       icon: FileText,
//       features: [
//         "AI Workflow Analysis: Offer data-driven insights for your clients.",
//         "Access to Tech Directory: Explore a wide range of legal tech tools.",
//         "Comparison Tools: Simplify technology evaluations.",
//         "RFP Management: Streamline vendor proposals for your clients."
//       ],
//       buttonText: "Explore Solutions",
//       imagePath: "/partners/legal_consulting.png"
//     }
//   ];

//   return (
//     <div className="w-full py-4 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//   <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//   <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/95 to-transparent" />
//   <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/95 to-transparent" />
// </div>

//       {/* Content Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header */}
//         <div className="text-center mb-20">


//            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
//                                  backdrop-blur-md rounded-full border border-blue-100 shadow-lg 
//                                  transition-all duration-300 mb-10 group hover:shadow-xl">
//                       <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
//                       <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
//                                    bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 
//                                    transition-all duration-300">
//                         PARTNERSHIP BENEFITS
//                       </span>
//                     </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
//             How this partnership will benefit you?
//           </h2>
//         </div>

//         {/* Benefits Cards */}
//         <div className="space-y-24">
//           {benefits.map((benefit, index) => {
//             const isEven = index % 2 === 0;
//             const Icon = benefit.icon;
            
//             return (
//               <div key={index} className="relative group">
//                 {/* Background blur effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 
//                              opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-xl" />
                
//                 <div className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
//                                items-center gap-12 py-8`}>
//                   {/* Content Section */}
//                   <div className="flex-1 space-y-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <Icon className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
//                           <Sparkles className="w-3.5 h-3.5 text-blue-600" />
//                           <span className="text-sm text-blue-600 font-medium">{benefit.title}</span>
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         {benefit.features.map((feature, idx) => (
//                           <div key={idx} className="flex items-start gap-3 group/item 
//                                                   p-3 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
//                             <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center 
//                                         group-hover/item:bg-blue-100 flex-shrink-0">
//                               <Zap className="w-3.5 h-3.5 text-blue-600" />
//                             </div>
//                             <p className="text-gray-600 text-sm md:text-base">{feature}</p>
//                           </div>
//                         ))}
//                       </div>

//                       <button className="mt-6 group inline-flex items-center gap-2 px-6 py-3 
//                                      bg-gradient-to-r from-blue-600 to-blue-500 
//                                      text-white rounded-xl font-medium shadow-lg 
//                                      hover:shadow-xl transition-all duration-300">
//                         {benefit.buttonText}
//                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Image Section */}
//                   <div className="flex-1">
//                     <div className="relative">
//                       <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 
//                                   rounded-2xl blur opacity-20 group-hover:opacity-40 
//                                   transition duration-1000 group-hover:duration-200" />
                      
//                       <div className="relative bg-white p-6 rounded-2xl shadow-xl 
//                                   transform group-hover:scale-[1.02] transition-all duration-500 
//                                   border border-gray-100">
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 
//                                     rounded-2xl opacity-50" />
//                         <img
//                           src={benefit.imagePath}
//                           alt={benefit.title}
//                           className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BenefitsSection;
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
    <div className="w-full py-4 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/95 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
                         backdrop-blur-md rounded-full border border-blue-100 shadow-lg 
                         transition-all duration-300 mb-10 group hover:shadow-xl">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
                           bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 
                           transition-all duration-300">
              PARTNERSHIP BENEFITS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            How this partnership will benefit you?
          </h2>
        </div>

        {/* Benefits Cards */}
        <div className="space-y-24">
          {benefits.map((benefit, index) => {
            const isEven = index % 2 === 0;
            const Icon = benefit.icon;
            
            return (
              <div key={index} className="relative group">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 
                             opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-xl" />
                
                <div className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
                               items-center gap-12 py-8`}>
                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-sm text-blue-600 font-medium">{benefit.title}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {benefit.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item 
                                                  p-3 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center 
                                        group-hover/item:bg-blue-100 flex-shrink-0">
                              <Zap className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <p className="text-gray-600 text-sm md:text-base">{feature}</p>
                          </div>
                        ))}
                      </div>

                        {benefit.href ? (
                        <a 
                          href={benefit.href}
                          className="mt-6 group inline-flex items-center gap-2 px-6 py-3 
                               bg-gradient-to-r from-blue-600 to-blue-500 
                               text-white rounded-xl font-medium shadow-lg 
                               hover:shadow-xl transition-all duration-300">
                          {benefit.buttonText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        ) : (
                        <button 
                          onClick={() => setShowModal(true)}
                          className="mt-6 group inline-flex items-center gap-2 px-6 py-3 
                               bg-gradient-to-r from-blue-600 to-blue-500 
                               text-white rounded-xl font-medium shadow-lg 
                               hover:shadow-xl transition-all duration-300">
                          {benefit.buttonText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        )}
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 
                                  rounded-2xl blur opacity-20 group-hover:opacity-40 
                                  transition duration-1000 group-hover:duration-200" />
                      
                      <div className="relative bg-white p-6 rounded-2xl shadow-xl 
                                  transform group-hover:scale-[1.02] transition-all duration-500 
                                  border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 
                                    rounded-2xl opacity-50" />
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