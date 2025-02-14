
"use client"


// export default PremiumHero;
import React, { useState } from 'react';
import { ArrowRight, LogIn, Sparkles , X,  ChevronDown} from 'lucide-react';
import { useRouter } from 'next/navigation';

import Modal from "./Modal"
const PremiumHero = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full min-h-[85vh] bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-16 relative overflow-hidden">
      {/* Grid Pattern + Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA15_0%,transparent_60%)]" />
        
        {/* Fade edges of grid */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-xl backdrop-blur-sm"
            style={{
              width: `${Math.random() * 30 + 15}px`,
              height: `${Math.random() * 30 + 15}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[85vh] py-16 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
                       backdrop-blur-md rounded-full border border-blue-100 shadow-lg 
                       transition-all duration-300 mb-10 group hover:shadow-xl">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
                         bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 
                         transition-all duration-300">
              PARTNER WITH US
            </span>
          </div>

          {/* Main Text Section */}
          {/* <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
              <div className="flex flex-col gap-6">
                <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                             bg-clip-text text-transparent leading-[1.3] pb-2">
                  Harmonizing Legal Tradition
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
                             bg-clip-text text-transparent leading-[1.3] pb-2">
                  With Partnerships And
                </span>
                <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                             bg-clip-text text-transparent leading-[1.3] pb-2">
                  Collaborations
                </span>
              </div>
            </h1>
          </div> */}
          {/* <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8 px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
      <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                     bg-clip-text text-transparent leading-tight sm:leading-[1.3] pb-1 sm:pb-2">
        Harmonizing Legal Tradition
      </span>
      <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
                     bg-clip-text text-transparent leading-tight sm:leading-[1.3] pb-1 sm:pb-2">
        With Partnerships And
      </span>
      <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                     bg-clip-text text-transparent leading-tight sm:leading-[1.3] pb-1 sm:pb-2">
        Collaborations
      </span>
    </div>
  </h1>
</div> */}
<div className="space-y-1 mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
    <div className="flex flex-col">
      <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                     bg-clip-text text-transparent leading-tight mb-1">
        Harmonizing Legal Tradition
      </span>
      <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
                     bg-clip-text text-transparent leading-tight mb-1">
        With Partnerships And
      </span>
      <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                     bg-clip-text text-transparent leading-tight">
        Collaborations
      </span>
    </div>
  </h1>
</div>


          {/* Premium Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <button 
             onClick={() => setShowModal(true)}
            className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white rounded-xl font-medium shadow-lg 
                           transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className="relative flex items-center justify-center gap-2">
                <span className="transform group-hover:translate-x-[-2px] transition-transform duration-300">
                  Join Us
                </span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <button 
      onClick={() => router.push('/auth/user/login')}
      className="flex-1 group relative px-6 py-3 bg-white/80 border border-blue-100 
                 text-gray-800 hover:text-blue-600 rounded-xl font-medium shadow-md backdrop-blur-sm
                 transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="transform group-hover:translate-x-[-2px] transition-transform duration-300">
          Login
        </span>
        <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </button>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(5deg); }
        }
      `}</style>
       <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PremiumHero;
