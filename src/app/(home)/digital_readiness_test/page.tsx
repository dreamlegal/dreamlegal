"use client"
import React from 'react';
import { Clock, Users, Check, Sparkles, ArrowRight } from 'lucide-react';

const LegalMaturityAssessment = () => {
  return (
    <div className="w-full bg-white mt-16 text-[#2d2d2d] font-sans pt-10 sm:pt-16 relative overflow-hidden">
      {/* Background Elements */}
      
      {/* Animated Background Elements */}
      <div className="absolute left-0 top-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute right-0 bottom-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
        {/* Header */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-[#f5f7fa] text-[#7cc6ee] text-xs sm:text-sm font-medium">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Professional Assessment
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight text-[#1e2556]">
            Legal Team Maturity and Digital Readiness Test
          </h1>
          
          <div className="w-16 sm:w-20 h-1 bg-[#1e2556] rounded-full mb-4 sm:mb-6"></div>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-[#2d2d2d]">
            Your legal team's maturity depends on the right balance of technology and efficiency. 
            Take this Legal Team Maturity and Digital Readiness Test to assess where your firm or 
            legal department stands. Discover gaps, strengths, and actionable recommendations to 
            optimize your legal operations.
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed text-[#2d2d2d]">
            This test by DreamLegal provides a quick assessment of your legal team's operational 
            efficiency and technology adoption—benchmarking your performance against industry 
            standards and identifying opportunities for workflow optimization and cost savings.
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center mb-8 sm:mb-12">
            <a 
            href="/digital_readiness_test/assesment" 
            className="group relative w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-[#1e2556] text-white font-semibold 
                   rounded-lg shadow-lg hover:shadow-xl
                   transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
            Start Assessment
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
        </div>
        
        {/* Features Section */}
        <div className="flex flex-col md:flex-row gap-8 sm:gap-10 mb-8 sm:mb-10">
          <div className="flex flex-col md:w-1/2">
            {/* What will you receive section */}
            <div className="flex flex-col sm:flex-row sm:items-start mb-6">
              <div className="bg-[#1e2556] rounded-full p-1.5 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight text-[#1e2556]">What will you receive?</h2>
                <ul className="list-none space-y-4">
                  <li className="flex items-start group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f5f7fa] flex-shrink-0 flex items-center justify-center group-hover:bg-[#7cc6ee]/20 transition-colors mr-2 sm:mr-3 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#2d2d2d]">Overall Legal Tech Maturity Score – Understand your firm's digital adoption level.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f5f7fa] flex-shrink-0 flex items-center justify-center group-hover:bg-[#7cc6ee]/20 transition-colors mr-2 sm:mr-3 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#2d2d2d]">Efficiency vs. Technology Score Breakdown – Identify where your legal workflows excel or need improvement.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f5f7fa] flex-shrink-0 flex items-center justify-center group-hover:bg-[#7cc6ee]/20 transition-colors mr-2 sm:mr-3 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#2d2d2d]">Category-Wise Insights – Get detailed evaluations across key legal operations tailored to your type and team size.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f5f7fa] flex-shrink-0 flex items-center justify-center group-hover:bg-[#7cc6ee]/20 transition-colors mr-2 sm:mr-3 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#2d2d2d]">Actionable Recommendations – Tailored next steps to streamline processes and enhance legal tech adoption.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center md:w-1/2">
            {/* Square Image */}
            <div className="relative w-full max-w-xs">
              <div className="relative w-full aspect-square sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white shadow-lg rounded-lg overflow-hidden border border-[#7cc6ee]/20">
                <img 
                  src="/api/placeholder/256/256" 
                  alt="Legal Tech Maturity" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1e2556]/60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <p className="font-semibold text-sm sm:text-base">Comprehensive Assessment</p>
                  <p className="text-xs sm:text-sm text-[#7cc6ee]">Tailored for your team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How long will it take section */}
        <div className="flex flex-col sm:flex-row sm:items-start mb-6 sm:mb-10 bg-[#f5f7fa] rounded-xl p-5 sm:p-6 shadow-lg border border-[#7cc6ee]/20 hover:shadow-xl transition-all duration-300 group">
          <div className="bg-[#1e2556] rounded-xl p-2 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start sm:min-w-10 group-hover:scale-110 transition-transform duration-300">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors">How long will it take?</h2>
            <p className="text-sm sm:text-base text-[#2d2d2d] leading-relaxed">
              The test consists of five category-specific questions and takes just 2-3 minutes to complete. 
              Your answers don't need to be precise, but to get the most meaningful insights, you should have 
              a good overall understanding of your legal operations and technology usage.
            </p>
          </div>
        </div>
        
        {/* Who is it for section */}
        <div className="flex flex-col sm:flex-row sm:items-start mb-8 bg-[#f5f7fa] rounded-xl p-5 sm:p-6 shadow-lg border border-[#7cc6ee]/20 hover:shadow-xl transition-all duration-300 group">
          <div className="bg-[#1e2556] rounded-xl p-2 mb-4 sm:mb-0 sm:mr-4 sm:mt-1 shadow-md flex items-center justify-center self-start sm:min-w-10 group-hover:scale-110 transition-transform duration-300">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors">Who is it for?</h2>
            <p className="text-sm sm:text-base text-[#2d2d2d] leading-relaxed">
              This test is designed for every law firm and in-house legal team/legal department 
              looking to assess their technology adoption, workflow efficiency, and overall operational maturity.
            </p>
          </div>
        </div>
      
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LegalMaturityAssessment;