"use client"

import React, { useState } from 'react';
import { ArrowRight, LogIn, Sparkles, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Modal from "./Modal"
const PremiumHero = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full min-h-[90vh] bg-[#1e2556] pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#1e2556]" />

      {/* Floating Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#7cc6ee]/20 rounded-xl"
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
      </div> */}

      {/* Glowing orbs */}
      {/* <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl animate-pulse delay-700" /> */}

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1e2556]/40 
                       rounded-full border border-[#7cc6ee]/30 shadow-lg 
                       transition-all duration-300 mb-10 group hover:shadow-xl">
            <Sparkles className="w-4 h-4 text-[#7cc6ee] animate-pulse" />
            <span className="text-sm font-semibold text-[#7cc6ee]
                         transition-all duration-300">
              PARTNER WITH US
            </span>
          </div>

          {/* Main Text Section */}
          <div className="space-y-1 mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
              <div className="flex flex-col gap-4">
                <span className="block text-white leading-tight mb-1">
                  Harmonizing Legal Tradition
                </span>
                <span className="block text-[#7cc6ee] leading-tight mb-1">
                  With Partnerships And
                </span>
                <span className="block text-white leading-tight">
                  Collaborations
                </span>
              </div>
            </h1>
          </div>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <button 
              onClick={() => setShowModal(true)}
              className="flex-1 group relative px-6 py-3 bg-[#7cc6ee]
                         text-[#1e2556] rounded-xl font-medium shadow-lg 
                         transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className="relative flex items-center justify-center gap-2">
                <span className="transform group-hover:translate-x-[-2px] transition-transform duration-300 font-bold">
                  Join Us
                </span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            <button 
              onClick={() => router.push('/auth/user/login')}
              className="flex-1 group relative px-6 py-3 bg-transparent border border-[#7cc6ee]/30
                         text-white hover:text-[#7cc6ee] hover:border-[#7cc6ee] rounded-xl font-medium
                         transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative flex items-center justify-center gap-2">
                <span className="transform group-hover:translate-x-[-2px] transition-transform duration-300">
                  Login
                </span>
                <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
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