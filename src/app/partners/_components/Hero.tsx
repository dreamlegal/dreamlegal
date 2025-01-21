
// import React from 'react';
// import { ArrowRight, LogIn, Sparkles } from 'lucide-react';

// const PartnershipHero = () => {
//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA20_0%,transparent_50%)]" />

//       {/* Enhanced Grid Background Pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>

//       {/* Main Content */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
//         <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
//           {/* Enhanced Top Badge */}
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 
//                        rounded-full border border-blue-100/50 shadow-sm hover:shadow-md 
//                        transition-all duration-300 mb-12 group animate-fade-in-up backdrop-blur-sm">
//             <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
//             <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
//                          bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 
//                          transition-all duration-300">
//               PARTNER WITH US
//             </span>
//           </div>

//           {/* Main Heading with Enhanced Typography */}
//           <div className="space-y-4 mb-8">
//                           <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
//                 <div className="flex flex-col gap-6">
//                   <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
//                                bg-clip-text text-transparent leading-[1.3] pb-2">
//                     Harmonizing legal tradition
//                   </span>
//                   <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
//                                bg-clip-text text-transparent leading-[1.3] pb-2">
//                     with partnerships and
//                   </span>
//                   <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
//                                bg-clip-text text-transparent leading-[1.3] pb-2">
//                     collaborations
//                   </span>
//                 </div>
//               </h1>
//           </div>

//           {/* Enhanced Subtitle */}
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-12 leading-[2] font-medium px-4 py-2">
//             For legal technology companies, legal ops/legal tech consulting companies
//             and legal service providers
//           </p>

//           {/* Enhanced Buttons Container */}
//           <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto">
//             {/* Contact Us Button */}
//             <button className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
//                            text-white rounded-xl font-medium shadow-lg hover:shadow-xl
//                            transition-all duration-300 transform hover:-translate-y-0.5">
//               <div className="relative flex items-center justify-center gap-2">
//                 <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
//                   Contact Us
//                 </span>
//                 <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 
//                            opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//             </button>

//             {/* Login Button */}
//             <button className="flex-1 group relative px-8 py-4 bg-white/80 backdrop-blur-sm border border-blue-100 
//                            text-gray-700 rounded-xl font-medium shadow-md hover:shadow-lg
//                            transition-all duration-300 transform hover:-translate-y-0.5">
//               <div className="relative flex items-center justify-center gap-2">
//                 <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
//                   Login
//                 </span>
//                 <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 
//                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Background Elements */}
//       <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
//       <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Animation Styles */}
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PartnershipHero;
"use client"
// import React from 'react';
// import { ArrowRight, LogIn, Sparkles } from 'lucide-react';

// const PartnershipHero = () => {
//   return (
//     <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-blue-50/50">
//       {/* Premium Background Pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#3b82f608_1px,transparent_0)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA15_0%,transparent_60%)]" />
        
//         {/* Glowing orbs */}
//         <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
//         <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
//       </div>

//       {/* Premium Floating Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-xl backdrop-blur-sm"
//             style={{
//               width: `${Math.random() * 40 + 20}px`,
//               height: `${Math.random() * 40 + 20}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + i}s ease-in-out infinite`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
//           {/* Premium Badge */}
//           <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-white/80 to-white/40 
//                        backdrop-blur-md rounded-full border border-blue-100 shadow-lg 
//                        transition-all duration-300 mb-12 hover:shadow-xl">
//             <Sparkles className="w-4 h-4 text-blue-600" />
//             <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
//                          bg-clip-text text-transparent">
//               PARTNER WITH US
//             </span>
//           </div>

//           {/* Premium Title Stack */}
//           <div className="space-y-4 mb-12">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
//               <div className="flex flex-col gap-4">
//                 <span className="bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent leading-tight">
//                   Harmonizing legal
//                 </span>
//                 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
//                   tradition with
//                 </span>
//                 <span className="bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent leading-tight">
//                   partnerships
//                 </span>
//               </div>
//             </h1>
//           </div>

//           {/* Premium Subtitle */}
//           <p className="text-lg text-gray-600 max-w-2xl mb-12 leading-relaxed">
//             For legal technology companies, legal ops/legal tech consulting companies
//             and legal service providers
//           </p>

//           {/* Premium Button Group */}
//           <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
//             <button className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
//                            text-white rounded-xl font-medium shadow-lg 
//                            transition-all duration-300 hover:shadow-2xl overflow-hidden">
//               <div className="relative flex items-center justify-center gap-2">
//                 <span>Contact Us</span>
//                 <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
//                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//             </button>

//             <button className="flex-1 group relative px-6 py-3 bg-white/80 border border-blue-100 
//                            text-gray-800 rounded-xl font-medium shadow-md 
//                            transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
//               <div className="relative flex items-center justify-center gap-2">
//                 <span>Login</span>
//                 <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 
//                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0); }
//           50% { transform: translate(10px, -10px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PartnershipHero;
// import React from 'react';
// import { ArrowRight, LogIn, Sparkles } from 'lucide-react';

// const PremiumHero = () => {
//   return (
//     <div className="w-full min-h-[85vh] bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Grid Pattern + Gradient Overlay */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA15_0%,transparent_60%)]" />
        
//         {/* Fade edges of grid */}
//         <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/90 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>

//       {/* Premium Floating Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-xl backdrop-blur-sm"
//             style={{
//               width: `${Math.random() * 30 + 15}px`,
//               height: `${Math.random() * 30 + 15}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + i}s ease-in-out infinite`,
//               animationDelay: `${i * 0.5}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Glowing orbs */}
//       <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-700" />

//       {/* Main Content */}
      
        
//            <div className="space-y-4 mb-8">
//                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
//                  <div className="flex flex-col gap-6">
//                    <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
//                                 bg-clip-text text-transparent leading-[1.3] pb-2">
//                      Harmonizing legal tradition
//                    </span>
//                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
//                                 bg-clip-text text-transparent leading-[1.3] pb-2">
//                      with partnerships and
//                    </span>
//                    <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
//                                 bg-clip-text text-transparent leading-[1.3] pb-2">
//                      collaborations
//                    </span>
//                  </div>
//                </h1>
//            </div>
    

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           50% { transform: translate(10px, -10px) rotate(5deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

const CategorySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = [
    "For Legal Tech Companies",
    "For Legal Services Providers",
    "For Legal Ops/Legal Tech Consulting Companies"
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select category"}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onChange(category);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${category === value ? "bg-blue-50 text-blue-600" : "text-gray-700"} flex items-center gap-2`}
              >
                <span className={`w-2 h-2 rounded-full ${category === value ? "bg-blue-600" : "bg-gray-300"}`} />
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// export default PremiumHero;
import React, { useState } from 'react';
import { ArrowRight, LogIn, Sparkles , X,  ChevronDown} from 'lucide-react';
import { useRouter } from 'next/navigation';

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
          <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8 px-4 sm:px-6 lg:px-8">
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

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gradient-to-b from-white to-blue-50/50 rounded-3xl max-w-md w-full 
                     shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
                     border border-blue-100">
          
          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-blue-50 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                        transition-colors duration-300" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">JOIN OUR NETWORK</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                         bg-clip-text text-transparent">
                Get Started Today
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         transition-all duration-300 placeholder:text-gray-400
                         hover:border-blue-200"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <CategorySelector
                  value={formData.category}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         transition-all duration-300 placeholder:text-gray-400
                         hover:border-blue-200"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
                       text-white font-medium rounded-xl shadow-lg hover:shadow-xl
                       transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                    Join Network
                  </span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};