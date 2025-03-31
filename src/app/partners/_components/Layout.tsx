"use client"

import React from 'react';
import { Mail } from 'lucide-react';

const CurvedLayout = () => {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden w-full h-auto py-16 relative overflow-hidden bg-[#f5f7fa]">
        <div className="w-full h-full flex items-center justify-center px-4 pb-4">
          <img 
            src="partners/layout.png" 
            alt="Legal Consulting" 
            className="w-full max-w-sm object-cover rounded-lg shadow-lg" 
            style={{ 
              filter: 'drop-shadow(0 0 2px white) drop-shadow(1px 2px 2px rgba(128, 128, 128, 0.7))'
            }}
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full h-screen bg-[#f5f7fa] relative overflow-hidden py-8">
        {/* Background solid color */}
        <div className="absolute inset-0 bg-[#f5f7fa]" />

        {/* Section Title - Moved up */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2556]">
            Comprehensive Legal Solutions
          </h2>
          <p className="text-[#2d2d2d] mt-4 max-w-2xl mx-auto">
            Our platform connects every aspect of the legal ecosystem to provide seamless service delivery
          </p>
        </div>

        {/* Left scattered icons - adjusted positions */}
        <div className="absolute left-0 top-0 w-[300px] h-full">
          <div className="absolute left-12 top-[12%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float">
            <img src="/icons/icons8-law-100.png" className="w-8 h-8 opacity-80" alt="Law" />
          </div>
          <div className="absolute left-32 top-[30%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-1">
            <img src="/icons/icons8-registered-trademark-100.png" className="w-8 h-8 opacity-80" alt="Trademark" />
          </div>
          <div className="absolute left-16 top-[55%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-2">
            <img src="/icons/icons8-mail-64.png" className="w-8 h-8 opacity-80" alt="Mail" />
          </div>
          <div className="absolute left-40 top-[75%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-3">
            <img src="/icons/icons8-test-passed-100.png" className="w-8 h-8 opacity-80" alt="Test Passed" />
          </div>
        </div>

        {/* Right scattered icons - adjusted positions */}
        <div className="absolute right-0 top-0 w-[300px] h-full">
          <div className="absolute right-36 top-[15%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-2">
            <img src="/icons/icons8-contract-60.png" className="w-8 h-8 opacity-80" alt="Contract" />
          </div>
          <div className="absolute right-16 top-[40%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float">
            <img src="/icons/icons8-artificial-intelligence-100.png" className="w-8 h-8 opacity-80" alt="AI" />
          </div>
          <div className="absolute right-32 top-[60%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-1">
            <img src="/icons/icons8-trademark-80.png" className="w-8 h-8 opacity-80" alt="Trademark" />
          </div>
          <div className="absolute right-60 top-[80%] bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 animate-icon-float-delay-3">
            <img src="/icons/icons8-scales-100.png" className="w-8 h-8 opacity-80" alt="Scales" />
          </div>
        </div>

        {/* Center content - Shifted upward */}
        <div className="w-full h-full flex items-center justify-center pt-0 pb-16">
          <div className="relative w-[1000px] aspect-video">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
              <line x1="500" y1="450" x2="500" y2="240" stroke="#7cc6ee" strokeWidth="3" />
              <path d="M 500,450 C 500,450 200,450 150,240" fill="none" stroke="#7cc6ee" strokeWidth="3" />
              <path d="M 500,450 C 500,450 800,450 850,240" fill="none" stroke="#7cc6ee" strokeWidth="3" />
            </svg>

            {/* Bottom center laptop image - moved up */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              <img 
                src="partners/laptop.png" 
                alt="Laptop" 
                className="w-100 h-64 object-cover rounded-lg transition-transform duration-500 hover:scale-105" 
                style={{ 
                  filter: 'drop-shadow(0 0 2px white) drop-shadow(1px 2px 2px rgba(128, 128, 128, 0.7))'
                }}
              />
            </div>

            {/* Curved arrangement of three images - moved up */}
            <div className="absolute w-full top-0">
              <div className="relative w-full h-48">
                <div className="absolute left-8 top-16 transform -translate-y-4 transition-all duration-500 hover:scale-105 hover:-translate-y-6">
                  <img 
                    src="partners/legal_tech.png" 
                    alt="Legal Tech" 
                    className="w-64 h-48 object-cover rounded-lg shadow-lg" 
                    style={{ 
                      filter: 'drop-shadow(0 0 2px white) drop-shadow(1px 2px 2px rgba(128, 128, 128, 0.7))'
                    }}
                  />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <img 
                    src="partners/legal_consulting.png" 
                    alt="Legal Consulting" 
                    className="w-64 h-48 object-cover rounded-lg shadow-lg" 
                    style={{ 
                      filter: 'drop-shadow(0 0 2px white) drop-shadow(1px 2px 2px rgba(128, 128, 128, 0.7))'
                    }}
                  />
                </div>
                <div className="absolute right-8 top-16 transform -translate-y-4 transition-all duration-500 hover:scale-105 hover:-translate-y-6">
                  <img 
                    src="partners/legal_Service.png" 
                    alt="Legal Service" 
                    className="w-64 h-48 object-cover rounded-lg shadow-lg" 
                    style={{ 
                      filter: 'drop-shadow(0 0 2px white) drop-shadow(1px 2px 2px rgba(128, 128, 128, 0.7))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes icon-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(1deg); }
          50% { transform: translate(-1px, -4px) rotate(-1deg); }
          75% { transform: translate(-2px, -1px) rotate(1deg); }
        }
        
        .animate-icon-float {
          animation: icon-float 6s ease-in-out infinite;
        }
        
        .animate-icon-float-delay-1 {
          animation: icon-float 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-icon-float-delay-2 {
          animation: icon-float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-icon-float-delay-3 {
          animation: icon-float 6s ease-in-out infinite;
          animation-delay: 4.5s;
        }
      `}</style>
    </>
  );
};

export default CurvedLayout;