import React from "react";
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// FAQ Item Component
const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#f5f7fa] group border border-gray-200 rounded-xl md:rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <button
        type="button"
        aria-label={isOpen ? "Close question" : "Open question"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start md:items-center justify-between w-full p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl gap-4"
      >
        <p className="text-base md:text-lg font-semibold text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300 text-left pr-2">
          {title}
        </p>
        <ChevronDown 
          className={`w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee] transform transition-transform duration-300 flex-shrink-0 mt-1 md:mt-0 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-3 md:p-4 pt-0 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

function ContactFaq() {
  // FAQ data stored as JSON
  const faqData = [
    {
      id: 1,
      title: "What is the best way to get started with DreamLegal?",
      content: "The best way to begin is by <strong>signing up</strong> and exploring our platform. If you have urgent needs, feel free to use our <strong>Contact Us</strong> form for immediate assistance."
    },
    {
      id: 2,
      title: "Who can benefit from DreamLegal's solutions?",
      content: "Our platform is designed for <strong>law firms and in-house legal teams</strong> looking to streamline their operations, automate workflows, and enhance efficiency with legal technology."
    },
    {
      id: 3,
      title: "Is DreamLegal free, or do I need to pay for services?",
      content: "DreamLegal offers <strong>several free tools</strong>, including our <strong>Technology Discovery Platform, Learning Hub, and more</strong>. For premium solutions like <strong>AI-powered legal process audits</strong> and <strong>legal operations analytics</strong>, pricing depends on your requirements."
    },
    {
      id: 4,
      title: "When should a legal team start using DreamLegal's solutions?",
      content: "The best time to engage with DreamLegal is <strong>now</strong>. Whether you're setting up your legal operations or optimizing existing processes, early adoption of <strong>legal technology and automation</strong> ensures maximum efficiency and compliance."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#ffffff]">
      {/* Decorative Background Elements - Adjusted for mobile */}
      {/* <div className="absolute left-1/4 top-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute right-1/4 bottom-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10 animate-pulse delay-500" /> */}

      <div className="px-4 py-10 md:py-16 mx-auto max-w-7xl lg:px-8 lg:py-20 font-clarity relative z-10">
        <div className="max-w-xl mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-8 md:mb-16 text-center animate-fadeIn">
            <div className="inline-flex flex-col items-center">
              <div className="inline-block px-4 py-1 bg-[#7cc6ee] bg-opacity-20 rounded-full mb-4 hover:bg-opacity-30 transition-colors duration-300">
                <p className="text-[#1e2556] font-medium text-xs md:text-sm">FAQ</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] text-center md:text-left">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <p className="text-[#334155] text-sm md:text-base max-w-2xl mx-auto">
              Find answers to common questions about DreamLegal's services and solutions.
            </p>
          </div>

          <div className="space-y-3 md:space-y-5 animate-slideUp">
            {faqData.map((faq) => (
                
              <Item key={faq.id} title={faq.title}>
                <div 
                  className="text-[#2d2d2d] leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                />
              </Item>
            ))}
          </div>
          
       
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default ContactFaq;