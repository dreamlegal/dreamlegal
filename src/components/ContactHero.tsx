import React from "react";
import ContactForm from "./ContactForm";
import { Mail, Phone } from 'lucide-react';

function ContactHero() {
  return (
    <div className="pt-[80px] min-h-screen bg-[#f5f7fa] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/3 w-32 md:w-64 h-32 md:h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute right-0 bottom-1/4 w-32 md:w-64 h-32 md:h-64 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 md:w-2 h-1 md:h-2 bg-[#7cc6ee] rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="px-4 py-6 md:py-10 mx-auto max-w-7xl md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 px-0 md:px-24 py-8 md:py-20">
          {/* Left Column */}
          <div className="flex flex-col gap-5 animate-fadeIn md:w-1/3">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-[#f5f7fa] rounded-full mb-4 hover:bg-[#f5f7fa]/80 transition-colors duration-300">
                <p className="text-[#7cc6ee] font-medium text-xs md:text-sm">CONTACT US</p>
              </div>
              <h1 className="text-3xl md:text-[44px] font-bold text-[#1e2556] leading-tight">
                Get in touch
              </h1>
              <p className="text-sm md:text-base text-[#334155] leading-relaxed max-w-md">
                Your inquiries are important to us. Please use the form here or contact us directly through phone or email.
              </p>
            </div>

            <h2 className="text-lg md:text-xl font-bold mt-2 md:mt-5 text-[#1e2556]">Contact information</h2>

            {/* Contact Cards */}
            <div className="bg-white rounded-xl md:rounded-2xl py-4 md:py-5 px-3 flex flex-col gap-3 border border-[#7cc6ee]/20 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Email Card */}
              <div className="group bg-[#f5f7fa] border border-[#7cc6ee]/20 px-3 md:px-4 py-3 transition-all duration-300 hover:-translate-y-1 rounded-lg hover:border-[#7cc6ee]/50 flex gap-3 md:gap-5 items-center hover:cursor-pointer">
                <div className="bg-[#7cc6ee]/20 p-2 md:p-3 rounded-lg group-hover:bg-[#7cc6ee]/30 transition-colors duration-300">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
                </div>
                <div className="inline-flex flex-col overflow-hidden">
                  <h3 className="text-xs text-[#334155]">Send us an email</h3>
                  <a 
                    href="mailto:contact@dreamlegal.in" 
                    className="group-hover:text-[#7cc6ee] transition-colors duration-300 truncate"
                  >
                    <span className="text-xs md:text-sm font-bold text-[#1e2556] group-hover:text-[#7cc6ee]">
                      contact@dreamlegal.in
                    </span>
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-[#f5f7fa] border border-[#7cc6ee]/20 px-3 md:px-4 py-3 transition-all duration-300 hover:-translate-y-1 rounded-lg hover:border-[#7cc6ee]/50 flex gap-3 md:gap-5 items-center hover:cursor-pointer">
                <div className="bg-[#7cc6ee]/20 p-2 md:p-3 rounded-lg group-hover:bg-[#7cc6ee]/30 transition-colors duration-300">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
                </div>
                <div className="inline-flex flex-col">
                  <h3 className="text-xs text-[#334155]">Give us a call</h3>
                  <span className="text-xs md:text-sm font-bold text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300">
                    +91-93401-74001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3 md:pl-20 animate-slideIn">
            <div className="flex flex-col px-3 md:px-5 py-4 border border-[#7cc6ee]/20 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-lg backdrop-filter">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ContactHero;