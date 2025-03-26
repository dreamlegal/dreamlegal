
// import React from "react";
// import { HelpCircle } from 'lucide-react';


// function ContactFaq() {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
//       {/* Decorative Background Elements - Adjusted for mobile */}
//       <div className="absolute left-1/4 top-0 w-48 md:w-96 h-48 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
//       <div className="absolute right-1/4 bottom-0 w-48 md:w-96 h-48 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />

//       <div className="px-4 py-10 md:py-16 mx-auto max-w-7xl lg:px-8 lg:py-20 font-clarity relative z-10">
//         <div className="max-w-xl mx-auto lg:max-w-2xl">
//           <div className="flex flex-col mb-8 md:mb-16 text-center animate-fadeIn">
//             <div className="inline-flex flex-col items-center">
//               <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
//                 <p className="text-blue-600 font-medium text-xs md:text-sm">FAQ</p>
//               </div>
//               <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-6">
                
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent text-center md:text-left">
//                   Frequently asked questions
//                 </h2>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3 md:space-y-5 animate-slideUp">
//             <Item title="What is DreamLegal directory?">
//               <div className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 DreamLegal directory is a comprehensive online resource that lists various legal technology tools and solutions available for lawyers, law firms, legal departments and other legal professionals.
//               </div>
//             </Item>

//             <Item title="What features are available in the directory?">
//               <div className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 Our directory offers comprehensive listings, detailed profiles, comparison of tools, search and filter options, user reviews, expert insights, vendor information and alerts.
//               </div>
//             </Item>

//             <Item title="Is this directory free to use?">
//               <div className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 Yes, this directory is free for users to view information, compare, download resources and use filters. Some functionalities may require signing in.
//               </div>
//             </Item>

//             <Item title="Do you also provide legal tech consultation?">
//               <div className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 Yes, DreamLegal helps with selection, onboarding, management and even training of employees post legal tech implementation. Kindly contact us in case you need any of the above services.
//               </div>
//             </Item>

//             <Item title="How can vendors list their product?">
//               <div className="text-gray-600 leading-relaxed text-sm md:text-base">
//                 Vendors can contact us via our website's contact form or email at vendor@dreamlegal.in to submit their product for listing.
//               </div>
//             </Item>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         .animate-slideUp {
//           animation: slideUp 1s ease-out forwards;
//           animation-delay: 0.2s;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// }


// export default ContactFaq;

// // Enhanced FAQ Item Component (save as FaqItem.tsx)
// import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// const Item = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="group border border-blue-100 rounded-xl md:rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
//       <button
//         type="button"
//         aria-label={isOpen ? "Close question" : "Open question"}
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-start md:items-center justify-between w-full p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl gap-4"
//       >
//         <p className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-left pr-2">
//           {title}
//         </p>
//         <ChevronDown 
//           className={`w-4 h-4 md:w-5 md:h-5 text-blue-600 transform transition-transform duration-300 flex-shrink-0 mt-1 md:mt-0 ${
//             isOpen ? 'rotate-180' : 'rotate-0'
//           }`}
//         />
//       </button>
//       <div
//         className={`transition-all duration-300 ease-in-out ${
//           isOpen
//             ? 'max-h-96 opacity-100'
//             : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="p-3 md:p-4 pt-0 border-t border-blue-100">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// FAQ Item Component
const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border border-[#7cc6ee]/20 rounded-xl md:rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <button
        type="button"
        aria-label={isOpen ? "Close question" : "Open question"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start md:items-center justify-between w-full p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-[#7cc6ee]/20 rounded-xl md:rounded-2xl gap-4"
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
        <div className="p-3 md:p-4 pt-0 border-t border-[#7cc6ee]/20">
          {children}
        </div>
      </div>
    </div>
  );
};

function ContactFaq() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f7fa] to-white">
      {/* Decorative Background Elements - Adjusted for mobile */}
      <div className="absolute left-1/4 top-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute right-1/4 bottom-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />

      <div className="px-4 py-10 md:py-16 mx-auto max-w-7xl lg:px-8 lg:py-20 font-clarity relative z-10">
        <div className="max-w-xl mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-8 md:mb-16 text-center animate-fadeIn">
            <div className="inline-flex flex-col items-center">
              <div className="inline-block px-4 py-1 bg-[#f5f7fa] rounded-full mb-4 hover:bg-[#f5f7fa]/80 transition-colors duration-300">
                <p className="text-[#7cc6ee] font-medium text-xs md:text-sm">FAQ</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] bg-clip-text text-transparent text-center md:text-left">
                  Frequently asked questions
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-5 animate-slideUp">
            <Item title="What is DreamLegal directory?">
              <div className="text-[#2d2d2d] leading-relaxed text-sm md:text-base">
                DreamLegal directory is a comprehensive online resource that lists various legal technology tools and solutions available for lawyers, law firms, legal departments and other legal professionals.
              </div>
            </Item>

            <Item title="What features are available in the directory?">
              <div className="text-[#2d2d2d] leading-relaxed text-sm md:text-base">
                Our directory offers comprehensive listings, detailed profiles, comparison of tools, search and filter options, user reviews, expert insights, vendor information and alerts.
              </div>
            </Item>

            <Item title="Is this directory free to use?">
              <div className="text-[#2d2d2d] leading-relaxed text-sm md:text-base">
                Yes, this directory is free for users to view information, compare, download resources and use filters. Some functionalities may require signing in.
              </div>
            </Item>

            <Item title="Do you also provide legal tech consultation?">
              <div className="text-[#2d2d2d] leading-relaxed text-sm md:text-base">
                Yes, DreamLegal helps with selection, onboarding, management and even training of employees post legal tech implementation. Kindly contact us in case you need any of the above services.
              </div>
            </Item>

            <Item title="How can vendors list their product?">
              <div className="text-[#2d2d2d] leading-relaxed text-sm md:text-base">
                Vendors can contact us via our website's contact form or email at vendor@dreamlegal.in to submit their product for listing.
              </div>
            </Item>
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