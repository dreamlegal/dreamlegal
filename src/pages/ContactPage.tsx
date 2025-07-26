"use client"
import ContactDesk from "@/components/ContactDesk";
import ContactFaq from "@/components/ContactFaq";
import ContactHero from "@/components/ContactHero";
import React from "react";

function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactDesk />
      
      {/* Company Ownership Section */}
      <div className="py-8 md:py-12 bg-[#f5f7fa] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute right-1/3 top-1/2 w-32 md:w-64 h-32 md:h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        
        <div className="px-4 mx-auto max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#7cc6ee]/20">
              <div className="text-center">
                <div className="inline-block px-4 py-1 bg-[#f5f7fa] rounded-full mb-4 hover:bg-[#f5f7fa]/80 transition-colors duration-300">
                  <p className="text-[#7cc6ee] font-medium text-xs md:text-sm">COMPANY INFO</p>
                </div>
                <p className="text-base md:text-lg text-[#2d2d2d] leading-relaxed">
                  DreamLegal brand is legally owned by <span className="font-semibold text-[#1e2556]">KYLT Automation Services Private Limited</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ContactFaq />
    </div>
  );
}

export default ContactPage;
