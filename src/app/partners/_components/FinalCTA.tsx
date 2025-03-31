"use client"

import Modal from "./Modal"
import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, ChevronDown } from 'lucide-react';

const FinalCTA = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-[#1e2556]">
      <div className="absolute inset-0 bg-[#1e2556]" />
      
      {/* <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-8 h-8 rounded-lg bg-[#7cc6ee]/20`}
            style={{
              left: `${i * 15}%`,
              top: `${10 + i * 5}%`,
              animation: `float ${3 + i}s ease-in-out infinite`
            }}
          />
        ))}
      </div> */}

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-3xl p-10 md:p-16 border border-[#7cc6ee]/10 shadow-xl">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f7fa] rounded-full">
              <Sparkles className="w-4 h-4 text-[#7cc6ee]" />
              <span className="text-sm font-semibold text-[#7cc6ee]">JOIN OUR NETWORK</span>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="text-[#1e2556]">
                  Shared network, Endless 
                </span>
                <br />
                <span className="relative inline-block text-[#7cc6ee]">
                  Opportunities, Better ecosystem
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-5 bg-[#1e2556] text-white rounded-xl hover:bg-[#1e2556]/90 transition-colors flex items-center gap-3 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>Join Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default FinalCTA;