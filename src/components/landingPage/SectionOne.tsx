import React, { useState } from "react";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import ContactForm from "./ContactForm";
import VideoPlayer from "./VideoPlayer"
const HeroSection = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background patterns and gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7cc6ee20_0%,transparent_50%)]" />
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e25561A_1px,transparent_1px),linear-gradient(to_bottom,#1e25561A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>
    
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="max-w-2xl lg:max-w-none lg:pr-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1e2556] tracking-tight mb-6 
                   leading-[1.1] lg:leading-[1.1]">
              Driving digital transformation for 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7cc6ee] to-[#5eb6e0]">
                {" "}legal teams{" "}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#2d2d2d] mb-10 max-w-xl font-medium leading-relaxed">
              We are the trusted strategic partner for law firms and legal departments, driving innovation, accelerating technology adoption, and integrating AI to enhance efficiency and transform legal operations.
            </p>

            {/* Buttons Section */}
            {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link href="/auth/user/signup">
                <button className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#1e2556] 
                             text-white rounded-xl font-medium hover:bg-[#161c44] active:bg-[#1e2556] 
                             transition-all duration-200 flex items-center 
                             justify-center gap-2 shadow-sm hover:shadow-md text-lg">
                  Sign Up
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <button 
                onClick={() => setIsContactFormOpen(true)}
                className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#7cc6ee] 
                         text-white rounded-xl font-medium hover:bg-[#5eb6e0] active:bg-[#7cc6ee] 
                         transition-all duration-200 flex items-center 
                         justify-center gap-2 shadow-sm hover:shadow-md text-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Sign Up Button */}
      <Link href="/auth/user/signup" passHref>
        
          <button 
            className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#1e2556] 
                      text-white rounded-xl font-medium hover:bg-[#161c44] active:bg-[#1e2556] 
                      transition-all duration-200 flex items-center 
                      justify-center gap-2 shadow-sm hover:shadow-md text-lg 
                      cursor-pointer focus:outline-none 
                      hover:ring-2 hover:ring-[#1e2556] hover:ring-opacity-50 
                      hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Sign Up
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        
      </Link>

      {/* Contact Us Button */}
      <button 
        onClick={() => setIsContactFormOpen(true)}
        className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#7cc6ee] 
                  text-white rounded-xl font-medium hover:bg-[#5eb6e0] active:bg-[#7cc6e0] 
                  transition-all duration-200 flex items-center 
                  justify-center gap-2 shadow-sm hover:shadow-md text-lg 
                  cursor-pointer focus:outline-none 
                  hover:ring-2 hover:ring-[#5eb6e0] hover:ring-opacity-50 
                  hover:scale-105 active:scale-95 w-full sm:w-auto"
      >
        Contact Us
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
 
          </div>

          {/* Right Video */}
          <div className="relative z-10 w-full max-w-2xl lg:max-w-none mx-auto">
            <div className="lg:ml-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#7cc6ee]/20">
              <VideoPlayer />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-[#334155] font-medium">
              <span className="flex items-center gap-2 bg-[#f5f7fa] px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">🌐</span> Enterprise-ready
              </span>
              <span className="flex items-center gap-2 bg-[#f5f7fa] px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">⚡</span> AI powered
              </span>
              <span className="flex items-center gap-2 bg-[#f5f7fa] px-3 py-1.5 rounded-lg">
                <span className="text-[#7cc6ee]">🔒</span> Highly secure
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <ContactForm 
          isOpen={isContactFormOpen} 
          onClose={() => setIsContactFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default HeroSection;