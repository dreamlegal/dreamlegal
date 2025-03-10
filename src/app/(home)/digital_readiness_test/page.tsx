"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock, 
  Users, 
  Sparkles,
  BarChart3,
  FileCheck
} from 'lucide-react';

const FloatingElement = ({ children, delay, duration = 3 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    }}
  >
    {children}
  </motion.div>
);

const CustomButton = ({ href, children, className = "" }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
  >
    <a href={href}>
      <button className={`
        px-8 py-3 bg-blue-600 text-white rounded-xl font-medium
        hover:bg-blue-700 transition-all duration-300 
        flex items-center justify-center gap-2 group
        shadow-lg shadow-blue-500/20
        ${className}
      `}>
        {children}
      </button>
    </a>
  </motion.div>
);

const LegalMaturityLanding = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const features = [
    { 
      icon: BarChart3, 
      title: "Legal Tech Maturity Score", 
      description: "Understand your firm's digital adoption level with a comprehensive score."
    },
    { 
      icon: Shield, 
      title: "Efficiency Breakdown", 
      description: "Identify where your legal workflows excel or need improvement." 
    },
    { 
      icon: FileCheck, 
      title: "Category-Wise Insights", 
      description: "Get detailed evaluations across key legal operations." 
    }
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000ff08_1px,transparent_1px),linear-gradient(to_bottom,#0000ff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl" />
      </div>
      
      {/* Abstract Shapes */}
      <div className="absolute top-32 right-4 md:right-12 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
      <div className="absolute top-40 right-20 md:right-32 w-8 h-8 bg-blue-200 rounded-full opacity-30"></div>
      <div className="absolute top-60 left-8 md:left-24 w-12 h-12 bg-blue-100 rounded-lg rotate-12 opacity-60"></div>
      <div className="absolute bottom-20 right-12 md:right-40 w-20 h-20 bg-blue-50 rounded-lg -rotate-12 opacity-40"></div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="pt-32 pb-20">
          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 
                           text-sm font-medium">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                DreamLegal Assessment Tool
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              <div className="inline-block">
                Legal Team Maturity 
                <span className="text-4xl sm:text-5xl md:text-6xl">&</span>
              </div>
              <div className="relative inline-block mt-2 md:mt-0">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 ml-0 md:ml-2">
                  Digital Readiness
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-12 relative"
            >
              <div className="relative z-10 max-w-4xl mx-auto">
                {/* Creative angled card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30, y: 20, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: -2 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border-t border-l border-blue-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-medium text-blue-800">Balance & Assessment</div>
                    </div>
                    <p className="text-gray-700">
                      Your legal team's maturity depends on the <span className="font-semibold text-blue-600">right balance of technology and efficiency</span>. 
                      Take this test to assess where your firm or legal department stands. Discover gaps, strengths, 
                      and actionable recommendations to optimize your legal operations.
                    </p>
                  </motion.div>
                  
                  {/* Second Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30, y: -20, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gradient-to-bl from-white to-blue-50 rounded-xl p-6 shadow-lg border-t border-r border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-300"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-medium text-blue-800">Benchmark & Optimize</div>
                    </div>
                    <p className="text-gray-700">
                      This test by DreamLegal provides a <span className="font-semibold text-blue-600">quick assessment of your legal team's operational efficiency 
                      and technology adoption</span>—benchmarking your performance against industry standards and identifying 
                      opportunities for workflow optimization and cost savings.
                    </p>
                  </motion.div>
                </div>
                
                {/* Connector Line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center z-20 hidden md:flex">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </motion.p>

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <CustomButton href="#start-assessment">
                Start Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CustomButton>
            </motion.div> */}

            {/* Premium Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-blue-100
                          hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Premium Corner Gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-50 to-transparent" />

                {/* Content */}
                <div className="relative space-y-3">
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-lg font-semibold bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
                      <Sparkles className="w-5 h-5" />
                      <span>Your Assessment Report Includes</span>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: BarChart3, title: "Overall Maturity Score" },
                      { icon: Shield, title: "Efficiency vs. Technology Breakdown" },
                      { icon: FileCheck, title: "Category-Wise Insights" },
                      { icon: Users, title: "Actionable Recommendations" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex flex-col items-center gap-3 group">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center 
                                          group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-center text-gray-800 font-medium">{item.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Middle Section - How Long Will It Take */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-20 relative overflow-hidden" id="start-assessment">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">QUICK ASSESSMENT</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  How long will it take?
                </h2>
                <p className="text-gray-600 text-lg">
                  The test consists of five category-specific questions and takes just 2-3 minutes to complete. 
                  Your answers don't need to be precise, but to get the most meaningful insights, you should 
                  have a good overall understanding of your legal operations and technology usage.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Who is it for?</h3>
                <p className="text-gray-600">
                  This test is designed for every law firm and in-house legal team/legal department 
                  looking to assess their technology adoption, workflow efficiency, and overall operational maturity.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <CustomButton href="#" className="px-10 py-4 text-lg shadow-lg shadow-blue-200">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </CustomButton>
              </div>
            </motion.div>

            {/* Right Side - Image/Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 relative overflow-hidden">
                {/* Corner Gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-blue-50 to-transparent rounded-bl-full" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    What this test report will contain:
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      "Overall Legal Tech Maturity Score – Understand your firm's digital adoption level.",
                      "Efficiency vs. Technology Score Breakdown – Identify where your legal workflows excel or need improvement.",
                      "Category-Wise Insights – Get detailed evaluations across key legal operations tailored to your type and team size.",
                      "Actionable Recommendations – Tailored next steps to streamline processes and enhance legal tech adoption."
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 z-0">
                <FloatingElement delay={0.1}>
                  <div className="w-16 h-16 rounded-xl bg-blue-100 opacity-30" />
                </FloatingElement>
              </div>
              <div className="absolute -bottom-8 -left-8 z-0">
                <FloatingElement delay={0.3}>
                  <div className="w-20 h-20 rounded-full bg-blue-200 opacity-20" />
                </FloatingElement>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section - Simplified */}
      {/* <div className="bg-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <CustomButton 
                href="#" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 text-lg shadow-xl shadow-blue-200"
              >
                Start The Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CustomButton>
            </motion.div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LegalMaturityLanding;
// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Clock, 
//   Users,
//   HelpCircle,
//   BarChart3
// } from 'lucide-react';

// const CustomButton = ({ href, children, className = "" }) => (
//   <motion.div 
//     whileHover={{ scale: 1.05 }} 
//     whileTap={{ scale: 0.95 }}
//   >
//     <a href={href}>
//       <button className={`
//         px-8 py-3 bg-blue-600 text-white rounded-xl font-medium
//         hover:bg-blue-700 transition-all duration-300 
//         flex items-center justify-center gap-2 group
//         shadow-lg shadow-blue-500/20
//         ${className}
//       `}>
//         {children}
//       </button>
//     </a>
//   </motion.div>
// );

// const LegalMaturityLanding = () => {
//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>

//       {/* Space for floating navbar */}
//       <div className="h-16"></div>

//       <div className="max-w-7xl mx-auto px-4 py-12 relative">
//         {/* Header Section */}
//         <div className="text-center text-white mb-16">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
//             Legal Team Maturity & Digital Readiness
//           </h1>
//         </div>

//         {/* Main Content Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
//           {/* Left Column - FAQ/Questions */}
//           <div className="lg:col-span-3 bg-blue-800/50 rounded-2xl p-4 sm:p-8 backdrop-blur-sm border border-blue-700/50">
//             <div className="space-y-6 sm:space-y-8">
//               {/* Intro Section - moved from top */}
//               <div className="pb-6 sm:pb-8 border-b border-blue-600/50">
//                 <p className="text-blue-100 mb-6">
//                   Your legal team's maturity depends on the right balance of technology and efficiency. 
//                   Take this Legal Team Maturity and Digital Readiness Test to assess where your firm or legal department stands. 
//                   Discover gaps, strengths, and actionable recommendations to optimize your legal operations.
//                 </p>
//                 <p className="text-blue-100 mb-6">
//                   This test by DreamLegal provides a quick assessment of your legal team's operational efficiency 
//                   and technology adoption—benchmarking your performance against industry standards and identifying 
//                   opportunities for workflow optimization and cost savings.
//                 </p>
                
//                 <div className="text-center mt-8">
//                   <CustomButton href="#" className="text-lg px-8 sm:px-10 py-3 sm:py-4 bg-blue-500 hover:bg-blue-400">
//                     Start Assessment
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </CustomButton>
//                 </div>
//               </div>
              
//               {/* Section 1: What will you receive? */}
//               <div className="pb-6 sm:pb-8 border-b border-blue-600/50">
//                 <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                   <div className="flex-shrink-0 bg-blue-600 rounded-full p-2 mt-1">
//                     <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl text-white font-semibold">
//                     What this test report will contain?
//                   </h2>
//                 </div>
                
//                 <div className="space-y-4 pl-6 sm:pl-12">
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-300">✅</div>
//                     <p className="text-blue-100">
//                       <span className="font-medium text-white">Overall Legal Tech Maturity Score</span> – Understand your firm's digital adoption level.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-300">✅</div>
//                     <p className="text-blue-100">
//                       <span className="font-medium text-white">Efficiency vs. Technology Score Breakdown</span> – Identify where your legal workflows excel or need improvement.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-300">✅</div>
//                     <p className="text-blue-100">
//                       <span className="font-medium text-white">Category-Wise Insights</span> – Get detailed evaluations across key legal operations tailored to your type and team size.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-300">✅</div>
//                     <p className="text-blue-100">
//                       <span className="font-medium text-white">Actionable Recommendations</span> – Tailored next steps to streamline processes and enhance legal tech adoption.
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Section 2: How long will it take? */}
//               <div className="pb-6 sm:pb-8 border-b border-blue-600/50">
//                 <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                   <div className="flex-shrink-0 bg-blue-600 rounded-full p-2 mt-1">
//                     <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl text-white font-semibold">
//                     How long will it take?
//                   </h2>
//                 </div>
                
//                 <p className="text-blue-100 pl-6 sm:pl-12">
//                   The test consists of five category-specific questions and takes just 2-3 minutes to complete. 
//                   Your answers don't need to be precise, but to get the most meaningful insights, you should 
//                   have a good overall understanding of your legal operations and technology usage.
//                 </p>
//               </div>
              
//               {/* Section 3: Who is it for? */}
//               <div>
//                 <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                   <div className="flex-shrink-0 bg-blue-600 rounded-full p-2 mt-1">
//                     <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl text-white font-semibold">
//                     Who is it for?
//                   </h2>
//                 </div>
                
//                 <p className="text-blue-100 pl-6 sm:pl-12">
//                   This test is designed for every law firm and in-house legal team/legal department 
//                   looking to assess their technology adoption, workflow efficiency, and overall operational maturity.
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Column - Visual Circle Diagram */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-700/50 text-white h-full flex flex-col justify-center items-center">
//               <div className="relative w-full max-w-xs mx-auto aspect-square">
//                 {/* Center Text */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="bg-blue-900/70 rounded-full w-1/3 h-1/3 flex items-center justify-center text-center p-2">
//                     <div>
//                       <div className="text-xs sm:text-sm font-medium">COMPLEXITY</div>
//                       <div className="text-xs sm:text-sm font-medium">OF DOCUMENT</div>
//                       <div className="text-xs sm:text-sm font-medium">PORTFOLIO</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Circular Categories */}
//                 <div className="absolute top-0 right-0 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">TECHNOLOGY</div>
//                     <div className="text-[0.65rem] sm:text-xs">&</div>
//                     <div className="text-[0.65rem] sm:text-xs">TOOLS</div>
//                   </div>
//                 </div>
                
//                 <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">MARKET</div>
//                     <div className="text-[0.65rem] sm:text-xs">ALIGNMENT</div>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-0 right-0 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">SKILLS &</div>
//                     <div className="text-[0.65rem] sm:text-xs">KNOWLEDGE</div>
//                     <div className="text-[0.65rem] sm:text-xs">MANAGEMENT</div>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-0 left-0 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">WORK</div>
//                     <div className="text-[0.65rem] sm:text-xs">ALLOCATION</div>
//                   </div>
//                 </div>
                
//                 <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">ORGANIZATION</div>
//                     <div className="text-[0.65rem] sm:text-xs">ACCOUNTABILITY</div>
//                   </div>
//                 </div>
                
//                 <div className="absolute top-0 left-0 bg-blue-600/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-center">
//                   <div>
//                     <div className="text-[0.65rem] sm:text-xs">WORKFLOW</div>
//                     <div className="text-[0.65rem] sm:text-xs">EFFICIENCY</div>
//                   </div>
//                 </div>
                
//                 {/* Draw a circular outline */}
//                 <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"></div>
//               </div>
              
//               <div className="mt-8 sm:mt-12 text-center">
//                 <p className="text-base sm:text-lg font-medium text-blue-200 mb-4">
//                   Receive a comprehensive analysis across key operational dimensions
//                 </p>
//                 <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300 mx-auto mb-4" />
//                 <p className="text-xs sm:text-sm text-blue-200">
//                   Identify strengths and opportunities in your legal operations framework
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalMaturityLanding;
// "use client";


// second 
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Clock, 
//   Users,
//   HelpCircle,
//   BarChart3
// } from 'lucide-react';

// const CustomButton = ({ href, children, className = "" }) => (
//   <motion.div 
//     whileHover={{ scale: 1.05 }} 
//     whileTap={{ scale: 0.95 }}
//   >
//     <a href={href}>
//       <button className={`
//         px-8 py-3.5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl font-medium
//         hover:from-blue-800 hover:to-indigo-900 transition-all duration-300 
//         flex items-center justify-center gap-2 group
//         shadow-xl shadow-indigo-900/20
//         ${className}
//       `}>
//         {children}
//       </button>
//     </a>
//   </motion.div>
// );

// const LegalMaturityLanding = () => {
//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
//       {/* Premium background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
//         <div className="absolute top-1/3 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl"></div>
//         <div className="absolute -bottom-20 right-20 w-72 h-72 bg-blue-50 rounded-full opacity-60 blur-3xl"></div>
//       </div>

//       {/* Space for floating navbar */}
//       <div className="h-16"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-700 pb-2">
//               Legal Team Maturity & Digital Readiness
//             </h1>
//           </motion.div>
//         </div>

//         {/* Main Content Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12"
//         >
//           {/* Left Column - FAQ/Questions */}
//           <div className="lg:col-span-3 bg-white rounded-2xl p-8 sm:p-10 
//                         shadow-[0_20px_50px_rgba(8,112,184,0.08)] border border-blue-100">
//             <div className="space-y-8 sm:space-y-10">
//               {/* Intro Section - moved from top */}
//               <div className="pb-8 sm:pb-10 border-b border-gray-100">
//                 <p className="text-gray-700 mb-6 leading-relaxed text-lg">
//                   Your legal team's maturity depends on the right balance of technology and efficiency. 
//                   Take this Legal Team Maturity and Digital Readiness Test to assess where your firm or legal department stands. 
//                   Discover gaps, strengths, and actionable recommendations to optimize your legal operations.
//                 </p>
//                 <p className="text-gray-700 mb-8 leading-relaxed text-lg">
//                   This test by DreamLegal provides a quick assessment of your legal team's operational efficiency 
//                   and technology adoption—benchmarking your performance against industry standards and identifying 
//                   opportunities for workflow optimization and cost savings.
//                 </p>
                
//                 <div className="text-center mt-8">
//                   <CustomButton href="#" className="text-lg px-10 sm:px-12 py-3.5 sm:py-4">
//                     Start Assessment
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </CustomButton>
//                 </div>
//               </div>
              
//               {/* Section 1: What will you receive? */}
//               <div className="pb-8 sm:pb-10 border-b border-gray-100">
//                 <div className="flex items-start gap-3 sm:gap-4 mb-5">
//                   <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full p-2.5 mt-1 shadow-lg">
//                     <HelpCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl text-indigo-900 font-semibold">
//                     What this test report will contain?
//                   </h2>
//                 </div>
                
//                 <div className="space-y-5 pl-7 sm:pl-12">
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-600">✅</div>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold text-indigo-900">Overall Legal Tech Maturity Score</span> – Understand your firm's digital adoption level.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-600">✅</div>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold text-indigo-900">Efficiency vs. Technology Score Breakdown</span> – Identify where your legal workflows excel or need improvement.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-600">✅</div>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold text-indigo-900">Category-Wise Insights</span> – Get detailed evaluations across key legal operations tailored to your type and team size.
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3 items-start">
//                     <div className="flex-shrink-0 text-blue-600">✅</div>
//                     <p className="text-gray-700 text-base">
//                       <span className="font-semibold text-indigo-900">Actionable Recommendations</span> – Tailored next steps to streamline processes and enhance legal tech adoption.
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Section 2: How long will it take? */}
//               <div className="pb-8 sm:pb-10 border-b border-gray-100">
//                 <div className="flex items-start gap-3 sm:gap-4 mb-5">
//                   <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full p-2.5 mt-1 shadow-lg">
//                     <Clock className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl text-indigo-900 font-semibold">
//                     How long will it take?
//                   </h2>
//                 </div>
                
//                 <p className="text-gray-700 pl-7 sm:pl-12 leading-relaxed text-base">
//                   The test consists of five category-specific questions and takes just 2-3 minutes to complete. 
//                   Your answers don't need to be precise, but to get the most meaningful insights, you should 
//                   have a good overall understanding of your legal operations and technology usage.
//                 </p>
//               </div>
              
//               {/* Section 3: Who is it for? */}
//               <div>
//                 <div className="flex items-start gap-3 sm:gap-4 mb-5">
//                   <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full p-2.5 mt-1 shadow-lg">
//                     <Users className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl text-indigo-900 font-semibold">
//                     Who is it for?
//                   </h2>
//                 </div>
                
//                 <p className="text-gray-700 pl-7 sm:pl-12 leading-relaxed text-base">
//                   This test is designed for every law firm and in-house legal team/legal department 
//                   looking to assess their technology adoption, workflow efficiency, and overall operational maturity.
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Column - Premium visualization */}
//           <div className="lg:col-span-2 flex flex-col gap-6 h-full">
//             <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(8,112,184,0.08)] 
//                           border border-blue-100 h-full flex flex-col justify-center items-center">
            
//               {/* Premium circular visualization */}
//               <div className="relative w-full max-w-xs mx-auto flex items-center justify-center aspect-square mb-8">
//                 {/* Main large circle */}
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-50 to-indigo-50 
//                                border-4 border-white shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]"></div>
                
//                 {/* Center circle */}
//                 <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full shadow-xl
//                                flex items-center justify-center z-20 border-8 border-blue-50">
//                   <div className="text-center">
//                     <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">LEGAL</div>
//                     <div className="text-sm font-semibold text-gray-600">MATURITY</div>
//                     <div className="text-sm font-semibold text-gray-600">ASSESSMENT</div>
//                   </div>
//                 </div>
                
//                 {/* Orbital circles */}
//                 <div className="absolute top-5 right-10 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-xl
//                                flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   TECHNOLOGY & TOOLS
//                 </div>
                
//                 <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 
//                                bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-xl
//                                flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   MARKET ALIGNMENT
//                 </div>
                
//                 <div className="absolute bottom-5 right-10 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 
//                                rounded-full shadow-xl flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   SKILLS & KNOWLEDGE
//                 </div>
                
//                 <div className="absolute bottom-5 left-10 w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 
//                                rounded-full shadow-xl flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   WORKFLOW EFFICIENCY
//                 </div>
                
//                 <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 
//                                bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full shadow-xl
//                                flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   ORGANIZATION
//                 </div>
                
//                 <div className="absolute top-5 left-10 w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 
//                                rounded-full shadow-xl flex items-center justify-center text-xs font-semibold text-white p-1 text-center">
//                   DOCUMENT PORTFOLIO
//                 </div>
                
//                 {/* Connecting lines */}
//                 <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-100 opacity-70"></div>
//               </div>
              
//               <div className="mt-6 text-center">
//                 <p className="text-lg font-medium text-indigo-900 mb-4">
//                   Comprehensive analysis across key dimensions
//                 </p>
//                 <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                 <p className="text-sm text-gray-600">
//                   Identify strengths and opportunities in your legal operations framework
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LegalMaturityLanding;



// final 
// import React from 'react';
// import { Clock, Users, Check, Sparkles, ArrowRight } from 'lucide-react';

// const LegalMaturityAssessment = () => {
//   return (
//     <div className="w-full bg-white mt-16 text-gray-800 font-sans pt-10 sm:pt-16 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>
      
//       {/* Animated Background Elements - reduced size on mobile */}
//       <div className="absolute left-0 top-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
      
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
//         {/* Header - Premium styling with blue accent */}
//         <div className="relative mb-8">
//           <div className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium">
//             <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
//             Professional Assessment
//           </div>
          
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight">
//             Legal Team Maturity and{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
//               Digital Readiness
//             </span>{' '}
//             Test
//           </h1>
          
//           <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4 sm:mb-6"></div>
          
//           {/* Description - Premium typography */}
//           <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-700">
//             Your legal team's maturity depends on the right balance of technology and efficiency. 
//             Take this Legal Team Maturity and Digital Readiness Test to assess where your firm or 
//             legal department stands. Discover gaps, strengths, and actionable recommendations to 
//             optimize your legal operations.
//           </p>
//           <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed text-gray-700">
//             This test by DreamLegal provides a quick assessment of your legal team's operational 
//             efficiency and technology adoption—benchmarking your performance against industry 
//             standards and identifying opportunities for workflow optimization and cost savings.
//           </p>
//         </div>
        
//         {/* CTA Button - Premium blue styling */}
//         <div className="flex justify-center mb-8 sm:mb-12">
//           <button className="group relative w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold 
//                          rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 
//                          transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
//             Start Assessment
//             <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 
//                         opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
//           </button>
//         </div>
        
//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-8 sm:mb-10">
//           <div className="flex flex-col">
//             {/* What will you receive section - reorganized for mobile */}
//             <div className="flex flex-col sm:flex-row sm:items-start mb-6">
//               <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-1.5 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start">
//                 <Check className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight text-gray-900">What will you receive?</h2>
//                 <ul className="list-none space-y-4">
//                   <li className="flex items-start group">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-100 transition-colors mr-2 sm:mr-3 mt-0.5">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm sm:text-base text-gray-700">Overall Legal Tech Maturity Score – Understand your firm's digital adoption level.</span>
//                   </li>
//                   <li className="flex items-start group">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-100 transition-colors mr-2 sm:mr-3 mt-0.5">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm sm:text-base text-gray-700">Efficiency vs. Technology Score Breakdown – Identify where your legal workflows excel or need improvement.</span>
//                   </li>
//                   <li className="flex items-start group">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-100 transition-colors mr-2 sm:mr-3 mt-0.5">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm sm:text-base text-gray-700">Category-Wise Insights – Get detailed evaluations across key legal operations tailored to your type and team size.</span>
//                   </li>
//                   <li className="flex items-start group">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-100 transition-colors mr-2 sm:mr-3 mt-0.5">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm sm:text-base text-gray-700">Actionable Recommendations – Tailored next steps to streamline processes and enhance legal tech adoption.</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center items-center">
//             {/* Square Image - premium styling - mobile responsive */}
//             <div className="relative w-full max-w-xs">
//               <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-2xl blur-lg transform -rotate-3"></div>
//               <div className="relative w-full aspect-square sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white shadow-2xl rounded-lg overflow-hidden border border-blue-200/30 transform hover:scale-105 transition-all duration-500 group">
//                 <img 
//                   src="/api/placeholder/256/256" 
//                   alt="Legal Tech Maturity" 
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 via-blue-600/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
//                   <p className="font-semibold text-sm sm:text-base">Comprehensive Assessment</p>
//                   <p className="text-xs sm:text-sm text-blue-100">Tailored for your team</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* How long will it take section - made responsive */}
//         <div className="flex flex-col sm:flex-row sm:items-start mb-6 sm:mb-10 bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-2 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start sm:min-w-10 group-hover:scale-110 transition-transform duration-300">
//             <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">How long will it take?</h2>
//             <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//               The test consists of five category-specific questions and takes just 2-3 minutes to complete. 
//               Your answers don't need to be precise, but to get the most meaningful insights, you should have 
//               a good overall understanding of your legal operations and technology usage.
//             </p>
//           </div>
//         </div>
        
//         {/* Who is it for section - made responsive */}
//         <div className="flex flex-col sm:flex-row sm:items-start mb-8 bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-2 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start sm:min-w-10 group-hover:scale-110 transition-transform duration-300">
//             <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">Who is it for?</h2>
//             <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//               This test is designed for every law firm and in-house legal team/legal department 
//               looking to assess their technology adoption, workflow efficiency, and overall operational maturity.
//             </p>
//           </div>
//         </div>
        
//         {/* Final CTA - made responsive */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 sm:p-8 text-center shadow-xl mt-8 sm:mt-12">
//           <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Ready to transform your legal operations?</h3>
//           <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-5">Get your detailed assessment report in minutes</p>
//           <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg 
//                         hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 
//                         shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto">
//             Take the Assessment Now
//             <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
//           </button>
//         </div>
//       </div>
      
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.3; }
//         }
//         .animate-pulse {
//           animation: pulse 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LegalMaturityAssessment;