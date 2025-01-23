// "use client"

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, MessageSquare, Mail, Twitter, Phone, MapPin, Facebook, Linkedin, Youtube, Link, Check, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link2, Home, Users, Box, Star, FileText, Briefcase } from 'lucide-react';
// import { toast } from "@/components/ui/use-toast";
// import { useRouter } from 'next/navigation';

// const UserSignupPage = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     organizationName: '',
//     organizationType: '',
//     teamSize: 1
//   });

//   const [passwordStrength, setPasswordStrength] = useState({
//     hasLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });
//   const router = useRouter();
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
//   const [alert, setAlert] = useState({ show: false, title: '', message: '' });

//   const showAlert = (title, message) => {
//     setAlert({ show: true, title, message });
//     setTimeout(() => setAlert({ show: false, title: '', message: '' }), 5000);
//   };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('/api/user-signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // Important for cookie handling
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.status === 201 && data.success) {
//       showAlert('Success', 'User created successfully. Redirecting to dashboard...');
      
//       // Redirect to appropriate dashboard
//       setTimeout(() => {
//         router.push('/legal_proffesionals/dashboard');
//       }, 1500);

//     } else if (data.userExists) {
//       showAlert("User Already Exists", data.message || 'Email already registered. Please log in.');
//     } else if (response.status === 400) {
//       showAlert("Invalid Input", data.message || 'Please check your input and try again.');
//     } else if (response.status === 500) {
//       showAlert("Server Error", data.message || 'Something went wrong on our end. Please try again later.');
//     } else {
//       showAlert("Unexpected Error", data.message || 'An unexpected error occurred. Please try again.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     showAlert("Network Error", "Could not connect to the server. Please check your connection.");
//   }
// };

//   return (
    
      
     
//         <div className="max-w-2xl mx-auto">
//           {alert.show && (
//         <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
//           <h4 className="font-bold">{alert.title}</h4>
//           <p>{alert.message}</p>
//         </div>
//       )}

         
        
//           <div className="max-w-2xl mx-auto">
  
// <form
//   onSubmit={(e) => {
//     e.preventDefault(); // Prevent default form submission
//     // No need to call handleSubmit() here for step 4
//   }}
//   className="rounded-3xl p-8 shadow-sm"
// >
//   {renderStep()}

//   {/* Navigation */}
//   <div className="flex justify-between items-center mt-8">
//     {/* Go Back Button */}
//     <div
//       onClick={() => setStep(step - 1)}
//       className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer ${step === 1 ? 'invisible' : ''}`}
//     >
//       <ArrowLeft size={20} />
//       Go back
//     </div>

//     {/* Next or Submit Button */}
//     {step === 4 ? (
//       <button
//         type="button" // Change to "button" to prevent form submission
//         onClick={() => handleSubmit()} // Call handleSubmit manually
//         className={`px-6 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors`}
//       >
//         Complete Setup
//       </button>
//     ) : (
//       <div
//         onClick={() => setStep(step + 1)}
//         className={`px-6 py-2.5 rounded-2xl transition-colors cursor-pointer ${
//           ((step === 1 && (!formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword)) ||
//             (step === 2 && !formData.organizationName) ||
//             (step === 3 && !formData.organizationType))
//             ? 'bg-gray-300 cursor-not-allowed'
//             : 'bg-black text-white hover:bg-gray-800'
//         }`}
//       >
//         Next step
//       </div>
//     )}
//   </div>
// </form>

// </div>


//         </div>
     
   
//   );
// };

// export default UserSignupPage;
"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';

const UserSignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationType: '',
    teamSize: 1,
    otp: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const [otpSent, setOtpSent] = useState(false);

  const teamSizeOptions = [
    { value: 1, label: "1 person" },
    { value: 20, label: "2-20 people" },
    { value: 50, label: "21-50 people" },
    { value: 200, label: "51-200 people" },
    { value: 500, label: "201-500 people" },
    { value: 501, label: "500+ people" }
  ];

  const orgTypes = [
    { id: 'law-firm', icon: '⚖️', title: 'Law Firm', description: 'Legal practice and services' },
    { id: 'enterprise', icon: '🏢', title: 'Enterprise', description: 'Large scale business' },
    { id: 'individual', icon: '👤', title: 'Individual', description: 'Solo practitioner' },
    { id: 'startup', icon: '🚀', title: 'Startup', description: 'Growing business' },
    { id: 'government', icon: '🏛️', title: 'Government', description: 'Public sector' },
    { id: 'judiciary', icon: '⚡', title: 'Judiciary', description: 'Legal system' }
  ];

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const checkPasswordStrength = (password) => {
      setPasswordStrength({
        hasLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      });
    };

    checkPasswordStrength(formData.password);
  }, [formData.password]);

  const renderPasswordCheck = (condition, text) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      {condition ? 
        <Check size={16} className="text-green-500" /> : 
        <X size={16} className="text-gray-300" />}
      <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
    </motion.div>
  );

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      
      if (data.success) {
        showAlert('OTP sent successfully!', 'success');
        setOtpSent(true);
        setStep(2);
      } else {
        showAlert(data.error || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      showAlert('An error occurred while sending OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/verify-otp-and-create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
          organizationName: formData.organizationName,
          organizationType: formData.organizationType,
          teamSize: formData.teamSize
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        showAlert('Account created successfully!', 'success');
        setTimeout(() => {
          router.push('/legal_professionals/dashboard');
        }, 1500);
      } else {
        showAlert(data.error || 'Invalid OTP or failed to create account', 'error');
      }
    } catch (error) {
      showAlert('An error occurred during verification', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      const isPasswordValid = Object.values(passwordStrength).every(Boolean);
      if (!isPasswordValid) {
        showAlert('Please meet all password requirements', 'error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
      }
      handleSendOtp();
    } else if (step === 5) {
      handleVerifyOtp();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-gray-500 mt-2">Enter your details to get started</p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                />
                
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3.5 rounded-2xl border bg-white focus:outline-none ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-gray-300'
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  disabled={loading}
                />

                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
                  {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
                  {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
                  {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
                  {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-500 mt-2">Enter the OTP sent to {formData.email}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                disabled={loading}
              />
            </motion.div>

            <p className="text-sm text-gray-500 mt-4">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-black hover:underline disabled:text-gray-400"
              >
                Resend OTP
              </button>
            </p>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Organization Details</h1>
              <p className="text-gray-500 mt-2">Tell us about your organization</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Organization name"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                value={formData.organizationName}
                onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
              />
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">What describes you the best?</h1>
              <p className="text-gray-500 mt-2">Select your organization type</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {orgTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setFormData({...formData, organizationType: type.id})}
                  className={`p-4 rounded-2xl transition-all group relative overflow-hidden ${
                    formData.organizationType === type.id 
                      ? 'bg-black text-white border-2 border-black shadow-lg scale-105' 
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900'
                  }`}
                >
                  <div className="flex flex-col h-full relative z-10">
                    <div className="text-xl mb-2">{type.icon}</div>
                    <div className="font-medium">{type.title}</div>
                    <div className={`text-sm mt-1 ${
                      formData.organizationType === type.id ? 'text-gray-300' : 'text-gray-500'
                    }`}>{type.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">How big is your team?</h1>
              <p className="text-gray-500 mt-2">Select your team size range</p>
            </div>

            <div className="space-y-4">
              {teamSizeOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setFormData({...formData, teamSize: option.value})}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                    formData.teamSize === option.value
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {formData.teamSize === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white rounded-full p-1"
                    >
                      <Check size={16} className="text-black" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <button
          disabled
          className="px-6 py-2.5 rounded-2xl bg-gray-400 text-white cursor-not-allowed"
        >
          Loading...
        </button>
      );
    }

    if (step === 5) {
      return (
        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors"
          onClick={handleVerifyOtp}
        >
          Complete Setup
        </button>
      );
    }

    const isDisabled = () => {
      switch (step) {
        case 1:
          return !formData.email || !formData.password || 
                 !formData.confirmPassword || 
                 formData.password !== formData.confirmPassword ||
                 !Object.values(passwordStrength).every(Boolean);
        case 2:
          return !formData.otp || formData.otp.length < 6;
        case 3:
          return !formData.organizationName;
        case 4:
          return !formData.organizationType;
        default:
          return false;
      }
    };
    
    return (
      <button
        type="submit"
        disabled={isDisabled()}
        className={`px-6 py-2.5 rounded-2xl transition-colors ${
          isDisabled() 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {step === 4 ? 'Complete Setup' : 'Next step'}
      </button>
    );
  };

  return (

       <div className="max-w-2xl mx-auto mt-8 pt-8">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl p-8 shadow-sm"
      >
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {/* Go Back Button */}
          {step > 1 && (
            <div
              onClick={() => !loading && setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer"
            >
              <ArrowLeft size={20} />
              Go back
            </div>
          )}
          {step === 1 && <div />}

          {/* Next or Submit Button */}
          {renderButton()}
        </div>
      </form>
    </div>
  );
};

export default UserSignupPage;