
"use client"

import Modal from "./Modal"
// const Modal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     email: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm transition-all duration-300"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative bg-gradient-to-b from-white to-blue-50/50 rounded-3xl max-w-md w-full 
//                      shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
//                      border border-blue-100">
          
//           {/* Content */}
//           <div className="relative p-8">
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute right-6 top-6 p-2 rounded-full hover:bg-blue-50 
//                        transition-all duration-300 group"
//             >
//               <X className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
//                         transition-colors duration-300" />
//             </button>

//             {/* Header */}
//             <div className="mb-8">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
//                 <Sparkles className="w-4 h-4 text-blue-600" />
//                 <span className="text-sm font-semibold text-blue-600">JOIN OUR NETWORK</span>
//               </div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
//                          bg-clip-text text-transparent">
//                 Get Started Today
//               </h2>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
//                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
//                          transition-all duration-300 placeholder:text-gray-400
//                          hover:border-blue-200"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Category
//                 </label>
//                 <CategorySelector
//                   value={formData.category}
//                   onChange={(value) => setFormData({ ...formData, category: value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
//                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
//                          transition-all duration-300 placeholder:text-gray-400
//                          hover:border-blue-200"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
//                        text-white font-medium rounded-xl shadow-lg hover:shadow-xl
//                        transition-all duration-300 transform hover:-translate-y-0.5"
//               >
//                 <div className="relative flex items-center justify-center gap-2">
//                   <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
//                     Join Network
//                   </span>
//                   <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//                 </div>
//                 <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, ChevronDown } from 'lucide-react';

// const CategorySelector = ({ value, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
  
//   const categories = [
//     "For Legal Tech Companies",
//     "For Legal Services Providers",
//     "For Legal Ops/Legal Tech Consulting Companies"
//   ];

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-left flex items-center justify-between"
//       >
//         <span className={value ? "text-gray-900" : "text-gray-400"}>
//           {value || "Select category"}
//         </span>
//         <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
//           <div className="max-h-64 overflow-y-auto">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => {
//                   onChange(category);
//                   setIsOpen(false);
//                 }}
//                 className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${category === value ? "bg-blue-50 text-blue-600" : "text-gray-700"} flex items-center gap-2`}
//               >
//                 <span className={`w-2 h-2 rounded-full ${category === value ? "bg-blue-600" : "bg-gray-300"}`} />
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


const FinalCTA = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full py-4 relative overflow-hidden bg-white">
    <div className="absolute inset-0">
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/95 to-transparent" />
  {/* <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/95 to-transparent" /> */}
</div>
      
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-8 h-8 rounded-lg ${i % 2 === 0 ? 'bg-blue-500/10' : 'bg-indigo-500/10'}`}
            style={{
              left: `${i * 15}%`,
              top: `${10 + i * 5}%`,
              animation: `float ${3 + i}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 border border-blue-100/50 shadow-lg backdrop-blur-sm">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/5 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">JOIN OUR NETWORK</span>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                  Shared network, Endless 
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Opportunities, Better ecosystem
                  </span>
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span>Join Now</span>
            <ArrowRight className="w-5 h-5" />
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