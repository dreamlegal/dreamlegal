
import React, { useState } from "react";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import ContactForm from "./ContactForm";
import VideoPlayer from "./VideoPlayer"
import CreateRfps from "./CreateRfp"
const HeroSection = () => {
  // const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  return (
    <div className="relative overflow-hidden bg-[#1e2556]">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7cc6ee20_0%,transparent_70%)]" />
      
      {/* Animated orbs */}
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse delay-700" />
    
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="max-w-2xl lg:max-w-none lg:pr-8 lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 
                   leading-[1.1] lg:leading-[1.1]">
              Discover, evaluate, & implement 
              <span className="text-[#7cc6ee]">
                {" "} the right legal tech {" "}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl font-medium leading-relaxed">
            DreamLegal helps law firms and legal departments make smarter tech decisions- through reliable product information and easy vendor connect.
            </p>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Sign Up Button */}
              {/* <Link href="/auth/user/signup" passHref> */}
                <button 
                 onClick={() => setIsRfpFormOpen(true)}
                  className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#7cc6ee] 
                          text-white rounded-xl font-medium hover:bg-[#5eb6e0] active:bg-[#7cc6e0] 
                          transition-all duration-200 flex items-center 
                          justify-center gap-2 shadow-sm hover:shadow-md text-lg 
                          cursor-pointer focus:outline-none 
                          hover:ring-2 hover:ring-[#5eb6e0] hover:ring-opacity-50 
                          hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  Share Requirements
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              {/* </Link> */}

              {/* Contact Us Button */}
              <Link href="/directory" passHref>
              <button 
               
                className="relative z-20 group whitespace-nowrap px-8 py-4 bg-white 
                          text-[#1e2556] rounded-xl font-medium hover:bg-gray-100 active:bg-white
                          transition-all duration-200 flex items-center 
                          justify-center gap-2 shadow-sm hover:shadow-md text-lg 
                          cursor-pointer focus:outline-none 
                          hover:ring-2 hover:ring-white hover:ring-opacity-50 
                          hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Explore marketplace
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
            </div>
          </div>

          {/* Right Video */}
          <div className="relative z-10 w-full max-w-2xl lg:max-w-none mx-auto lg:w-1/2">
            <div className="lg:ml-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#7cc6ee]/20">
                <VideoPlayer />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">🌐</span> Enterprise-ready
              </span>
              <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">⚡</span> AI powered
              </span>
              <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">🔒</span> Highly secure
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isRfpFormOpen && (
        <CreateRfps 
          isOpen={isRfpFormOpen} 
          onClose={() => setIsRfpFormOpen(false)} 
        />
      )}
      
      <style jsx global>{`
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

export default HeroSection;