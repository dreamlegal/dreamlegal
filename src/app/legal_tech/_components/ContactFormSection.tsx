// // "use client"
// // import React, { useState } from "react";
// // import { ArrowRight, Sparkles, User, Building, Mail, Phone, Target, CheckCircle } from 'lucide-react';

// // // Alert component
// // const Alert = ({ message, type, onClose }) => {
// //   return (
// //     <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
// //       type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
// //       'bg-red-50 text-red-700 border border-red-200'
// //     }`}>
// //       <div className="flex-1">{message}</div>
// //       <button 
// //         onClick={onClose}
// //         className="p-1 hover:bg-white/80 rounded-full transition-colors"
// //       >
// //         ✕
// //       </button>
// //     </div>
// //   );
// // };

// // const ContactFormSection = () => {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     organization: '',
// //     email: '',
// //     phone: '',
// //     interestAreas: []
// //   });
  
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [alert, setAlert] = useState({
// //     show: false,
// //     message: '',
// //     type: 'success'
// //   });

// //   const interestOptions = [
// //     { id: 'market-insights', label: 'Market Insights', icon: Target },
// //     { id: 'high-intent-leads', label: 'High Intent Leads', icon: User },
// //     { id: 'branding-visibility', label: 'Branding and Visibility', icon: Sparkles }
// //   ];

// //   const toggleInterestArea = (areaId) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       interestAreas: prev.interestAreas.includes(areaId)
// //         ? prev.interestAreas.filter(id => id !== areaId)
// //         : [...prev.interestAreas, areaId]
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
  
// //     try {
// //       const response = await fetch('/api/tech-vendor-lead', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Failed to submit form');
// //       }
  
// //       // Success handling
// //       setAlert({
// //         show: true,
// //         message: 'Your message has been sent successfully! We\'ll get back to you soon.',
// //         type: 'success'
// //       });
  
// //       // Reset form
// //       setFormData({
// //         fullName: '',
// //         organization: '',
// //         email: '',
// //         phone: '',
// //         interestAreas: []
// //       });
  
// //     } catch (error) {
// //       console.error('Submission error:', error);
// //       setAlert({
// //         show: true,
// //         message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
// //         type: 'error'
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="py-20 px-4 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
// //       {alert.show && (
// //         <Alert
// //           message={alert.message}
// //           type={alert.type}
// //           onClose={() => setAlert({ ...alert, show: false })}
// //         />
// //       )}
      
// //       {/* Background decoration */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-[#1e2556]/5" />
// //       <div className="absolute top-10 right-10 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
// //       <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#1e2556]/10 rounded-full blur-3xl" />
      
// //       <div className="max-w-4xl mx-auto relative">
// //         {/* Header */}
// //         <div className="text-center mb-16">
// //           <div className="flex items-center justify-center gap-2 mb-4">
// //             <Sparkles className="w-6 h-6 text-[#7cc6ee] animate-pulse" />
// //             <span className="text-sm font-semibold text-[#7cc6ee] tracking-wider uppercase">
// //               Get in Touch
// //             </span>
// //           </div>
// //           <h2 className="text-5xl font-bold text-[#1e2556] mb-6 leading-tight">
// //             Let's Start a <span className="text-[#7cc6ee]">Conversation</span>
// //           </h2>
// //           <p className="text-xl text-[#334155] max-w-2xl mx-auto">
// //             Ready to transform your business? Tell us about your needs and we'll craft a solution that drives results.
// //           </p>
// //         </div>

// //         {/* Form */}
// //         <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-[#7cc6ee]/20">
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Name and Organization Row */}
// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
// //                   <User className="w-4 h-4 text-[#7cc6ee]" />
// //                   Full Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={formData.fullName}
// //                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// //                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
// //                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
// //                            transition-all duration-300 placeholder:text-gray-400
// //                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
// //                   placeholder="Enter your full name"
// //                 />
// //               </div>
              
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
// //                   <Building className="w-4 h-4 text-[#7cc6ee]" />
// //                   Organization / Company
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={formData.organization}
// //                   onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
// //                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
// //                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
// //                            transition-all duration-300 placeholder:text-gray-400
// //                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
// //                   placeholder="Enter your organization"
// //                 />
// //               </div>
// //             </div>

// //             {/* Email and Phone Row */}
// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
// //                   <Mail className="w-4 h-4 text-[#7cc6ee]" />
// //                   Email Address
// //                 </label>
// //                 <input
// //                   type="email"
// //                   required
// //                   value={formData.email}
// //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
// //                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
// //                            transition-all duration-300 placeholder:text-gray-400
// //                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
// //                   placeholder="Enter your email address"
// //                 />
// //               </div>
              
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
// //                   <Phone className="w-4 h-4 text-[#7cc6ee]" />
// //                   Phone Number 
// //                   <span className="text-xs text-gray-500 font-normal">(Optional)</span>
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   value={formData.phone}
// //                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
// //                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
// //                            transition-all duration-300 placeholder:text-gray-400
// //                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
// //                   placeholder="Enter your phone number"
// //                 />
// //               </div>
// //             </div>

// //             {/* Interest Areas */}
// //             <div className="space-y-4">
// //               <label className="block text-sm font-semibold text-[#1e2556] mb-4">
// //                 What is your interest area? (Select all that apply)
// //               </label>
// //               <div className="grid md:grid-cols-3 gap-4">
// //                 {interestOptions.map((option) => {
// //                   const IconComponent = option.icon;
// //                   const isSelected = formData.interestAreas.includes(option.id);
                  
// //                   return (
// //                     <button
// //                       key={option.id}
// //                       type="button"
// //                       onClick={() => toggleInterestArea(option.id)}
// //                       className={`group relative p-5 rounded-xl border-2 transition-all duration-300 text-left
// //                         ${isSelected 
// //                           ? 'border-[#7cc6ee] bg-[#7cc6ee]/10 shadow-lg shadow-[#7cc6ee]/20' 
// //                           : 'border-gray-200 bg-white/50 hover:border-[#7cc6ee]/50 hover:bg-white/80'
// //                         }`}
// //                     >
// //                       <div className="flex items-start gap-3">
// //                         <div className={`p-2 rounded-lg transition-colors duration-300 ${
// //                           isSelected ? 'bg-[#7cc6ee] text-white' : 'bg-gray-100 text-[#7cc6ee] group-hover:bg-[#7cc6ee]/20'
// //                         }`}>
// //                           <IconComponent className="w-5 h-5" />
// //                         </div>
// //                         <div className="flex-1">
// //                           <div className="flex items-center justify-between">
// //                             <h3 className={`font-semibold transition-colors duration-300 ${
// //                               isSelected ? 'text-[#1e2556]' : 'text-[#1e2556] group-hover:text-[#1e2556]'
// //                             }`}>
// //                               {option.label}
// //                             </h3>
// //                             {isSelected && (
// //                               <CheckCircle className="w-5 h-5 text-[#7cc6ee] animate-in zoom-in-50 duration-200" />
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </button>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <div className="pt-4">
// //               <button
// //                 type="submit"
// //                 disabled={isLoading || formData.interestAreas.length === 0}
// //                 className="group relative w-full py-4 px-6 bg-[#1e2556]
// //                        hover:bg-[#161c44] text-white font-semibold text-lg
// //                        rounded-xl shadow-lg shadow-[#1e2556]/25 hover:shadow-xl
// //                        hover:shadow-[#1e2556]/30 transition-all duration-300
// //                        focus:ring-2 focus:ring-[#7cc6ee]/20 focus:ring-offset-2
// //                        overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed
// //                        transform hover:scale-[1.02] active:scale-[0.98]"
// //               >
// //                 <div className="relative flex items-center justify-center gap-3">
// //                   <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
// //                     {isLoading ? 'Submitting Your Request...' : 'Send Message'}
// //                   </span>
// //                   {!isLoading && (
// //                     <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
// //                   )}
// //                 </div>
// //                 <div className="absolute inset-0 bg-[#7cc6ee]/10
// //                              opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
// //               </button>
              
// //               {formData.interestAreas.length === 0 && (
// //                 <p className="text-sm text-gray-500 mt-2 text-center">
// //                   Please select at least one interest area to continue
// //                 </p>
// //               )}
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ContactFormSection;
// "use client"
// import React, { useState } from "react";
// import { ArrowRight, Sparkles, User, Building, Mail, Phone } from 'lucide-react';

// // Alert component
// const Alert = ({ message, type, onClose }) => {
//   return (
//     <div className={`fixed top-20 right-4 z-[9999] p-4 rounded-lg shadow-lg flex items-center gap-3 ${
//       type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
//       'bg-red-50 text-red-700 border border-red-200'
//     }`}>
//       <div className="flex-1">{message}</div>
//       <button 
//         onClick={onClose}
//         className="p-1 hover:bg-white/80 rounded-full transition-colors"
//       >
//         ✕
//       </button>
//     </div>
//   );
// };

// const ContactFormSection = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     organization: '',
//     email: '',
//     phone: '',
//     interestAreas: []
//   });
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState({
//     show: false,
//     message: '',
//     type: 'success'
//   });

//   const interestOptions = [
//     { id: 'market-insights', label: 'Market Insights' },
//     { id: 'high-intent-leads', label: 'High Intent Leads' },
//     { id: 'branding-visibility', label: 'Branding and Visibility' }
//   ];

//   const toggleInterestArea = (areaId) => {
//     setFormData(prev => ({
//       ...prev,
//       interestAreas: prev.interestAreas.includes(areaId)
//         ? prev.interestAreas.filter(id => id !== areaId)
//         : [...prev.interestAreas, areaId]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
  
//     try {
//       const response = await fetch('/api/tech-vendor-lead', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }
  
//       // Success handling
//       setAlert({
//         show: true,
//         message: 'Your message has been sent successfully! We\'ll get back to you soon.',
//         type: 'success'
//       });
  
//       // Reset form
//       setFormData({
//         fullName: '',
//         organization: '',
//         email: '',
//         phone: '',
//         interestAreas: []
//       });
  
//     } catch (error) {
//       console.error('Submission error:', error);
//       setAlert({
//         show: true,
//         message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
//         type: 'error'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="py-20 px-4 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
//       {alert.show && (
//         <Alert
//           message={alert.message}
//           type={alert.type}
//           onClose={() => setAlert({ ...alert, show: false })}
//         />
//       )}
      
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-[#1e2556]/5" />
//       <div className="absolute top-10 right-10 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#1e2556]/10 rounded-full blur-3xl" />
      
//       <div className="max-w-4xl mx-auto relative">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Sparkles className="w-6 h-6 text-[#7cc6ee] animate-pulse" />
//             <span className="text-sm font-semibold text-[#7cc6ee] tracking-wider uppercase">
//               Get in Touch
//             </span>
//           </div>
//           <h2 className="text-5xl font-bold text-[#1e2556] mb-6 leading-tight">
//             Let's Start a <span className="text-[#7cc6ee]">Conversation</span>
//           </h2>
//           <p className="text-xl text-[#334155] max-w-2xl mx-auto">
//             Ready to transform your business? Tell us about your needs and we'll craft a solution that drives results.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-[#7cc6ee]/20">
//           <div className="space-y-8">
//             {/* Name and Organization Row */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
//                   <User className="w-4 h-4 text-[#7cc6ee]" />
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
//                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
//                            transition-all duration-300 placeholder:text-gray-400
//                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
//                   <Building className="w-4 h-4 text-[#7cc6ee]" />
//                   Organization / Company
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.organization}
//                   onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
//                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
//                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
//                            transition-all duration-300 placeholder:text-gray-400
//                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
//                   placeholder="Enter your organization"
//                 />
//               </div>
//             </div>

//             {/* Email and Phone Row */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
//                   <Mail className="w-4 h-4 text-[#7cc6ee]" />
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
//                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
//                            transition-all duration-300 placeholder:text-gray-400
//                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
//                   placeholder="Enter your email address"
//                 />
//               </div>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
//                   <Phone className="w-4 h-4 text-[#7cc6ee]" />
//                   Phone Number 
//                   <span className="text-xs text-gray-500 font-normal">(Optional)</span>
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full px-5 py-4 rounded-xl bg-white/50 border border-gray-200 
//                            focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
//                            transition-all duration-300 placeholder:text-gray-400
//                            hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556]"
//                   placeholder="Enter your phone number"
//                 />
//               </div>
//             </div>

//             {/* Interest Areas */}
//             <div className="space-y-4">
//               <label className="block text-sm font-semibold text-[#1e2556] mb-4">
//                 What is your interest area? (Select all that apply)
//               </label>
//               <div className="grid md:grid-cols-3 gap-4">
//                 {interestOptions.map((option) => {
//                   const isSelected = formData.interestAreas.includes(option.id);
                  
//                   return (
//                     <button
//                       key={option.id}
//                       type="button"
//                       onClick={() => toggleInterestArea(option.id)}
//                       className={`group relative p-5 rounded-xl border-2 transition-all duration-300 text-left
//                         ${isSelected 
//                           ? 'border-[#7cc6ee] bg-[#7cc6ee]/10 shadow-lg shadow-[#7cc6ee]/20' 
//                           : 'border-gray-200 bg-white/50 hover:border-[#7cc6ee]/50 hover:bg-white/80'
//                         }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         {/* Circle Selection Indicator */}
//                         <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
//                           isSelected 
//                             ? 'border-[#7cc6ee] bg-[#7cc6ee]' 
//                             : 'border-gray-300 bg-white group-hover:border-[#7cc6ee]/50'
//                         }`}>
//                           {isSelected && (
//                             <div className="w-3 h-3 bg-white rounded-full animate-in zoom-in-50 duration-200" />
//                           )}
//                         </div>
                        
//                         <div className="flex-1">
//                           <h3 className={`font-semibold transition-colors duration-300 ${
//                             isSelected ? 'text-[#1e2556]' : 'text-[#1e2556] group-hover:text-[#1e2556]'
//                           }`}>
//                             {option.label}
//                           </h3>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading || formData.interestAreas.length === 0}
//                 onClick={handleSubmit}
//                 className="group relative w-full py-4 px-6 bg-[#1e2556]
//                        hover:bg-[#161c44] text-white font-semibold text-lg
//                        rounded-xl shadow-lg shadow-[#1e2556]/25 hover:shadow-xl
//                        hover:shadow-[#1e2556]/30 transition-all duration-300
//                        focus:ring-2 focus:ring-[#7cc6ee]/20 focus:ring-offset-2
//                        overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed
//                        transform hover:scale-[1.02] active:scale-[0.98]"
//               >
//                 <div className="relative flex items-center justify-center gap-3">
//                   <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
//                     {isLoading ? 'Submitting Your Request...' : 'Send Message'}
//                   </span>
//                   {!isLoading && (
//                     <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
//                   )}
//                 </div>
//                 <div className="absolute inset-0 bg-[#7cc6ee]/10
//                              opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//               </button>
              
//               {formData.interestAreas.length === 0 && (
//                 <p className="text-sm text-gray-500 mt-2 text-center">
//                   Please select at least one interest area to continue
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // export default ContactFormSection;
"use client"
import React, { useState } from "react";
import { ArrowRight, Sparkles, User, Building, Mail, Phone } from 'lucide-react';

// Alert component
const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-16 sm:top-20 right-4 left-4 sm:left-auto sm:right-4 z-[9999] p-3 sm:p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm sm:max-w-none mx-auto sm:mx-0 ${
      type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
      'bg-red-50 text-red-700 border border-red-200'
    }`}>
      <div className="flex-1 text-sm sm:text-base">{message}</div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/80 rounded-full transition-colors flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    interestAreas: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const interestOptions = [
    { id: 'market-insights', label: 'Market Insights' },
    { id: 'high-intent-leads', label: 'High Intent Leads' },
    { id: 'branding-visibility', label: 'Branding and Visibility' }
  ];

  const toggleInterestArea = (areaId) => {
    setFormData(prev => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(areaId)
        ? prev.interestAreas.filter(id => id !== areaId)
        : [...prev.interestAreas, areaId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/tech-vendor-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      // Success handling
      setAlert({
        show: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.',
        type: 'success'
      });
  
      // Reset form
      setFormData({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        interestAreas: []
      });
  
    } catch (error) {
      console.error('Submission error:', error);
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] relative overflow-hidden">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-[#1e2556]/5" />
      <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-24 h-24 sm:w-48 sm:h-48 bg-[#1e2556]/10 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#7cc6ee] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#7cc6ee] tracking-wider uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Let's Start a <span className="text-[#7cc6ee]">Conversation</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#334155] max-w-2xl mx-auto px-4 sm:px-0">
            Ready to transform your business? Tell us about your needs and we'll craft a solution that drives results.
          </p>
        </div>

        {/* Form */}
        <div id="contact" className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-[#7cc6ee]/20">
          <div className="space-y-6 sm:space-y-8">
            {/* Name and Organization Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e2556]">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556] text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e2556]">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                  Organization / Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556] text-sm sm:text-base"
                  placeholder="Enter your organization"
                />
              </div>
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e2556]">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556] text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e2556]">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#7cc6ee]" />
                  Phone Number 
                  <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80 text-[#1e2556] text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Interest Areas */}
            <div className="space-y-3 sm:space-y-4">
              <label className="block text-xs sm:text-sm font-semibold text-[#1e2556] mb-3 sm:mb-4">
                What is your interest area? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {interestOptions.map((option) => {
                  const isSelected = formData.interestAreas.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterestArea(option.id)}
                      className={`group relative p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-left
                        ${isSelected 
                          ? 'border-[#7cc6ee] bg-[#7cc6ee]/10 shadow-lg shadow-[#7cc6ee]/20' 
                          : 'border-gray-200 bg-white/50 hover:border-[#7cc6ee]/50 hover:bg-white/80'
                        }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Circle Selection Indicator */}
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
                          isSelected 
                            ? 'border-[#7cc6ee] bg-[#7cc6ee]' 
                            : 'border-gray-300 bg-white group-hover:border-[#7cc6ee]/50'
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-in zoom-in-50 duration-200" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold transition-colors duration-300 text-sm sm:text-base leading-snug ${
                            isSelected ? 'text-[#1e2556]' : 'text-[#1e2556] group-hover:text-[#1e2556]'
                          }`}>
                            {option.label}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isLoading || formData.interestAreas.length === 0}
                onClick={handleSubmit}
                className="group relative w-full py-3 sm:py-4 px-6 bg-[#1e2556]
                       hover:bg-[#161c44] text-white font-semibold text-base sm:text-lg
                       rounded-lg sm:rounded-xl shadow-lg shadow-[#1e2556]/25 hover:shadow-xl
                       hover:shadow-[#1e2556]/30 transition-all duration-300
                       focus:ring-2 focus:ring-[#7cc6ee]/20 focus:ring-offset-2
                       overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
              >
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                    {isLoading ? 'Submitting Your Request...' : 'Send Message'}
                  </span>
                  {!isLoading && (
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-[#7cc6ee]/10
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
              
              {formData.interestAreas.length === 0 && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center px-4">
                  Please select at least one interest area to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;