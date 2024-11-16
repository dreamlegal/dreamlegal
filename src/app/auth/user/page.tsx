
// "use client"

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, MessageSquare, Mail, Twitter, Phone, MapPin, Facebook, Linkedin, Youtube, Link, Check, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link2, Home, Users, Box, Star, FileText, Briefcase } from 'lucide-react';

// const PremiumOnboarding = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     organizationName: '',
//     organizationType: '',
//     teamSize: 1
//   });
//   const [isVendor, setIsVendor] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     hasLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });

//   const teamSizeOptions = [
//     { value: 1, label: "1 person" },
//     { value: 20, label: "2-20 people" },
//     { value: 50, label: "21-50 people" },
//     { value: 200, label: "51-200 people" },
//     { value: 500, label: "201-500 people" },
//     { value: 501, label: "500+ people" }
//   ];

//   const orgTypes = [
//     { id: 'law-firm', icon: '⚖️', title: 'Law Firm', description: 'Legal practice and services' },
//     { id: 'enterprise', icon: '🏢', title: 'Enterprise', description: 'Large scale business' },
//     { id: 'individual', icon: '👤', title: 'Individual', description: 'Solo practitioner' },
//     { id: 'startup', icon: '🚀', title: 'Startup', description: 'Growing business' },
//     { id: 'government', icon: '🏛️', title: 'Government', description: 'Public sector' },
//     { id: 'judiciary', icon: '⚡', title: 'Judiciary', description: 'Legal system' }
//   ];

//   useEffect(() => {
//     const checkPasswordStrength = (password) => {
//       setPasswordStrength({
//         hasLength: password.length >= 8,
//         hasUppercase: /[A-Z]/.test(password),
//         hasLowercase: /[a-z]/.test(password),
//         hasNumber: /[0-9]/.test(password),
//         hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//       });
//     };

//     checkPasswordStrength(formData.password);
//   }, [formData.password]);

//   const renderPasswordCheck = (condition, text) => (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex items-center gap-2 text-sm"
//     >
//       {condition ? 
//         <Check size={16} className="text-green-500" /> : 
//         <X size={16} className="text-gray-300" />}
//       <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
//     </motion.div>
//   );

//   const getTeamSizeLabel = (value) => {
//     const option = teamSizeOptions.find(opt => opt.value <= value);
//     return option ? option.label : teamSizeOptions[0].label;
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
//               <p className="text-gray-500 mt-2">Enter your details to get started</p>
//             </div>

//             <div className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="space-y-4"
//               >
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 />
                
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   className={`w-full p-3.5 rounded-2xl border bg-white focus:outline-none ${
//                     formData.confirmPassword && formData.password !== formData.confirmPassword
//                       ? 'border-red-300 focus:border-red-400'
//                       : 'border-gray-200 focus:border-gray-300'
//                   }`}
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//                 />

//                 <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//                   {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
//                   {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
//                   {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
//                   {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
//                   {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         );

//       case 2:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900">Organization Details</h1>
//               <p className="text-gray-500 mt-2">Tell us about your organization</p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//             >
//               <input
//                 type="text"
//                 placeholder="Organization name"
//                 className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                 value={formData.organizationName}
//                 onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
//               />
//             </motion.div>
//           </motion.div>
//         );

//       case 3:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900">What describes you the best?</h1>
//               <p className="text-gray-500 mt-2">Select your organization type</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {orgTypes.map((type, index) => (
//                 <motion.button
//                   key={type.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   onClick={() => setFormData({...formData, organizationType: type.id})}
//                   className={`p-4 rounded-2xl transition-all group relative overflow-hidden ${
//                     formData.organizationType === type.id 
//                       ? 'bg-black text-white border-2 border-black shadow-lg scale-105' 
//                       : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900'
//                   }`}
//                 >
//                   <div className="flex flex-col h-full relative z-10">
//                     <div className="text-xl mb-2">{type.icon}</div>
//                     <div className="font-medium">{type.title}</div>
//                     <div className={`text-sm mt-1 ${
//                       formData.organizationType === type.id ? 'text-gray-300' : 'text-gray-500'
//                     }`}>{type.description}</div>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         );

//       case 4:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900">How big is your team?</h1>
//               <p className="text-gray-500 mt-2">Select your team size range</p>
//             </div>

//             <div className="space-y-8">
//               {teamSizeOptions.map((option, index) => (
//                 <motion.button
//                   key={option.value}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   onClick={() => setFormData({...formData, teamSize: option.value})}
//                   className={`w-full p-2 rounded-xl flex items-center justify-between transition-all ${
//                     formData.teamSize === option.value
//                       ? 'bg-black text-white shadow-lg'
//                       : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900'
//                   }`}
//                 >
//                   <span className="font-medium">{option.label}</span>
//                   {formData.teamSize === option.value && (
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="bg-white rounded-full p-1"
//                     >
//                       <Check size={16} className="text-black" />
//                     </motion.div>
//                   )}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-6 shadow-lg fixed top-4 left-8 bottom-4 rounded-2xl overflow-y-auto">
//       {/* Logo Section */}
//       <div className="flex items-center gap-2 mb-6">
//         <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
//           <span className="text-white font-bold text-sm">D</span>
//         </div>
//         <span className="font-semibold text-sm text-gray-900">
//           DreamLegal
//         </span>
//       </div>

//       {/* Section Divider */}
//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       {/* Navigation Links */}
//       <div className="space-y-1 mb-6">
//         {[
//           { icon: Home, text: 'Home' },
//           { icon: Box, text: 'Products' },
//           { icon: Briefcase, text: 'Workflow' },
//           { icon: Users, text: 'About Us' },
//           { icon: Star, text: 'Testimonials' },
//           { icon: FileText, text: 'Blog' },
//         ].map((item) => (
//           <button
//             key={item.text}
//             className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm"
//           >
//             <item.icon size={16} />
//             <span className="font-medium">{item.text}</span>
//           </button>
//         ))}
//       </div>

//       {/* Section Divider */}
//       <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

//       {/* Vendor Switch */}
//       <button
//         onClick={() => setIsVendor(!isVendor)}
//         className="w-full mb-6 px-3 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
//       >
//         {isVendor ? 'Switch to User' : 'Switch to Vendor'}
//       </button>

//       {/* Chat Section - Reimagined */}
//       <div className="mb-6 bg-gray-50 p-4 rounded-xl">
//         <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
//         <div className="flex justify-between items-center mb-2">
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
//           </button>
//           <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
//             <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
//             <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
//           </button>
//         </div>
//         {/* <p className="text-xs text-gray-500 text-center mt-2">Available 8am-5pm ET</p> */}
//       </div>

//       {/* Section Divider */}
//       {/* <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" /> */}

//       {/* Social Links */}
//       <div className="bg-gray-50 rounded-xl p-2">
//         <div className="flex justify-between">
//           {[Facebook, Twitter, Linkedin, Youtube, Link].map((Icon, index) => (
//             <button
//               key={index}
//               className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
//             >
//               <Icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>
//       </div>
      
//       <div className="flex-1 pl-96 p-6">
//         <div className="max-w-2xl mx-auto">
//           {/* Gradient Logo */}
//           {/* <div className="w-12 h-12 mb-8 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div> */}
          
//           {/* Form Content */}
//           <div className=" rounded-3xl p-8 shadow-sm">
//             {renderStep()}
            
//             {/* Navigation */}
//             <div className="flex justify-between items-center mt-8">
//               <button
//                 onClick={() => setStep(step - 1)}
             
                   
//                 className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl ${step === 1 ? 'invisible' : ''}`}
//               >
//                 <ArrowLeft size={20} />
//                 Go back
//               </button>
              
//               <button
//                 onClick={() => {
//                   if (step === 4) {
//                     // Handle form submission
//                     console.log('Form submitted:', formData);
//                   } else {
//                     setStep(step + 1);
//                   }
//                 }}
//                 disabled={
//                   (step === 1 && (!formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword)) ||
//                   (step === 2 && !formData.organizationName) ||
//                   (step === 3 && !formData.organizationType)
//                 }
//                 className={`px-6 py-2.5 rounded-2xl transition-colors ${
//                   ((step === 1 && (!formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword)) ||
//                   (step === 2 && !formData.organizationName) ||
//                   (step === 3 && !formData.organizationType))
//                     ? 'bg-gray-300 cursor-not-allowed'
//                     : 'bg-black text-white hover:bg-gray-800'
//                 }`}
//               >
//                 {step === 4 ? 'Complete Setup' : 'Next step'}
//               </button>
//             </div>
//           </div>

//           {/* Progress indicator */}
//           {/* <div className="mt-8 flex justify-center gap-2">
//             {[1, 2, 3, 4].map((stepNumber) => (
//               <div
//                 key={stepNumber}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   stepNumber === step 
//                     ? 'w-8 bg-black' 
//                     : stepNumber < step 
//                       ? 'bg-gray-400' 
//                       : 'bg-gray-200'
//                 }`}
//               />
//             ))}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumOnboarding;

import { redirect } from "next/navigation";

export default function UserPage() {
  redirect("/auth/user/login"); // Redirect to user login page
}
