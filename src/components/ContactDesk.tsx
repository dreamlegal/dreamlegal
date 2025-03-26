
// import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { Mail, Users, Box } from 'lucide-react';

// function ContactDesk() {
//   return (
//     <div className="py-8 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
//       {/* Animated Background Elements - Adjusted for mobile */}
//       <div className="absolute left-1/4 bottom-0 w-48 md:w-96 h-48 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
//       <div className="absolute right-1/4 top-0 w-48 md:w-96 h-48 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />

//       <div className="px-4 mx-auto max-w-7xl relative z-10">
//         <div className="max-w-xl mx-auto">
//           <div className="flex flex-col mb-8 md:mb-16 text-center animate-fadeIn">
//             <div className="inline-block mx-auto px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300 w-fit">
//               <p className="text-blue-600 font-medium text-xs md:text-sm">REACH OUT</p>
//             </div>
//             <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent px-4">
//               Contact us directly
//             </h2>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-0 md:px-4">
//           <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {/* Support Card */}
//             <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-blue-400 hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative p-4 md:p-5 bg-white rounded-xl">
//                 <div className="flex items-start md:items-center gap-3 mb-2">
//                   <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex-shrink-0">
//                     <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
//                   </div>
//                   <h6 className="font-bold leading-tight text-lg md:text-xl group-hover:text-blue-600 transition-colors duration-300">
//                     User Support
//                   </h6>
//                 </div>
//                 <p className="mb-3 mt-3 text-sm text-slate-500 line-clamp-2">
//                   Explore how we ensure exceptional user support. Reach out for assistance today!
//                 </p>
//                 <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
//                   <a 
//                     href="mailto:support@dreamlegal.in"
//                     className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate"
//                   >
//                     support@dreamlegal.in
//                   </a>
//                   <IoIosArrowRoundForward className="text-lg md:text-xl text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
//                 </div>
//               </div>
//             </div>

//             {/* Career Card */}
//             <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-blue-400 hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative p-4 md:p-5 bg-white rounded-xl">
//                 <div className="flex items-start md:items-center gap-3 mb-2">
//                   <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex-shrink-0">
//                     <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
//                   </div>
//                   <h6 className="font-bold leading-tight text-lg md:text-xl group-hover:text-blue-600 transition-colors duration-300">
//                     Career opportunities
//                   </h6>
//                 </div>
//                 <p className="mb-3 mt-3 text-sm text-slate-500 line-clamp-2">
//                   Discover rewarding career opportunities with us. Join our team and grow professionally!
//                 </p>
//                 <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
//                   <a 
//                     href="mailto:career@dreamlegal.in"
//                     className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate"
//                   >
//                     career@dreamlegal.in
//                   </a>
//                   <IoIosArrowRoundForward className="text-lg md:text-xl text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
//                 </div>
//               </div>
//             </div>

//             {/* Vendor Card */}
//             <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-blue-400 hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white md:col-span-2 lg:col-span-1">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative p-4 md:p-5 bg-white rounded-xl">
//                 <div className="flex items-start md:items-center gap-3 mb-2">
//                   <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex-shrink-0">
//                     <Box className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
//                   </div>
//                   <h6 className="font-bold leading-tight text-lg md:text-xl group-hover:text-blue-600 transition-colors duration-300">
//                     Vendor support
//                   </h6>
//                 </div>
//                 <p className="mb-3 mt-3 text-sm text-slate-500 line-clamp-2">
//                   Learn about our dedicated vendor support services. Connect with us to discuss partnerships and support.
//                 </p>
//                 <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
//                   <a 
//                     href="mailto:vendor@dreamlegal.in"
//                     className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate"
//                   >
//                     vendor@dreamlegal.in
//                   </a>
//                   <IoIosArrowRoundForward className="text-lg md:text-xl text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ContactDesk;
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Mail, Users, Box } from 'lucide-react';

function ContactDesk() {
  return (
    <div className="py-8 md:py-16 lg:py-20 bg-gradient-to-b from-white to-[#f5f7fa] relative overflow-hidden">
      {/* Animated Background Elements - Adjusted for mobile */}
      <div className="absolute left-1/4 bottom-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute right-1/4 top-0 w-48 md:w-96 h-48 md:h-96 bg-[#7cc6ee]/20 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />

      <div className="px-4 mx-auto max-w-7xl relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col mb-8 md:mb-16 text-center animate-fadeIn">
            <div className="inline-block mx-auto px-4 py-1 bg-[#f5f7fa] rounded-full mb-4 hover:bg-[#f5f7fa]/80 transition-colors duration-300 w-fit">
              <p className="text-[#7cc6ee] font-medium text-xs md:text-sm">REACH OUT</p>
            </div>
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] bg-clip-text text-transparent px-4">
              Contact us directly
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-0 md:px-4">
          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Support Card */}
            <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-[#7cc6ee] hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7fa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 md:p-5 bg-white rounded-xl">
                <div className="flex items-start md:items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7cc6ee]/20 group-hover:bg-[#7cc6ee]/30 transition-colors duration-300 flex-shrink-0">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
                  </div>
                  <h6 className="font-bold leading-tight text-lg md:text-xl text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300">
                    User Support
                  </h6>
                </div>
                <p className="mb-3 mt-3 text-sm text-[#2d2d2d] line-clamp-2">
                  Explore how we ensure exceptional user support. Reach out for assistance today!
                </p>
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <a 
                    href="mailto:support@dreamlegal.in"
                    className="text-sm font-bold text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300 truncate"
                  >
                    support@dreamlegal.in
                  </a>
                  <IoIosArrowRoundForward className="text-lg md:text-xl text-[#7cc6ee] transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Career Card */}
            <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-[#7cc6ee] hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7fa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 md:p-5 bg-white rounded-xl">
                <div className="flex items-start md:items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7cc6ee]/20 group-hover:bg-[#7cc6ee]/30 transition-colors duration-300 flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
                  </div>
                  <h6 className="font-bold leading-tight text-lg md:text-xl text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300">
                    Career opportunities
                  </h6>
                </div>
                <p className="mb-3 mt-3 text-sm text-[#2d2d2d] line-clamp-2">
                  Discover rewarding career opportunities with us. Join our team and grow professionally!
                </p>
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <a 
                    href="mailto:career@dreamlegal.in"
                    className="text-sm font-bold text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300 truncate"
                  >
                    career@dreamlegal.in
                  </a>
                  <IoIosArrowRoundForward className="text-lg md:text-xl text-[#7cc6ee] transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="group relative p-0.5 overflow-hidden transition duration-300 transform border rounded-xl md:rounded-2xl hover:border-[#7cc6ee] hover:cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-xl bg-white md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7fa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-4 md:p-5 bg-white rounded-xl">
                <div className="flex items-start md:items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7cc6ee]/20 group-hover:bg-[#7cc6ee]/30 transition-colors duration-300 flex-shrink-0">
                    <Box className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
                  </div>
                  <h6 className="font-bold leading-tight text-lg md:text-xl text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300">
                    Vendor support
                  </h6>
                </div>
                <p className="mb-3 mt-3 text-sm text-[#2d2d2d] line-clamp-2">
                  Learn about our dedicated vendor support services. Connect with us to discuss partnerships and support.
                </p>
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <a 
                    href="mailto:vendor@dreamlegal.in"
                    className="text-sm font-bold text-[#1e2556] group-hover:text-[#7cc6ee] transition-colors duration-300 truncate"
                  >
                    vendor@dreamlegal.in
                  </a>
                  <IoIosArrowRoundForward className="text-lg md:text-xl text-[#7cc6ee] transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ContactDesk;