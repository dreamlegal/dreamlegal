
// "use client";

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Check, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Alert from '@/components/Alert';


// const VendorSignupPage = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [alert, setAlert] = useState(null);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     otp: ''
//   });
//   const [passwordStrength, setPasswordStrength] = useState({
//     hasLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });
//   const [otpSent, setOtpSent] = useState(false);

//   const showAlert = (message, type = 'success') => {
//     setAlert({ message, type });
//     // Auto dismiss after 3 seconds
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000);
//   };

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

//   const handleSendOtp = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: formData.email }),
//       });
//       const data = await res.json();
      
//       if (data.success) {
//         showAlert('OTP sent successfully!', 'success');
//         setOtpSent(true);
//         setStep(2);
//       } else {
//         showAlert(data.error || 'Failed to send OTP', 'error');
//       }
//     } catch (error) {
//       showAlert('An error occurred while sending OTP', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

  

// // const handleVerifyOtp = async () => {
// //   try {
// //     setLoading(true);
// //     const res = await fetch('/api/verify-otp-and-create-vendor', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       credentials: 'include', // Important for cookies
// //       body: JSON.stringify({
// //         email: formData.email,
// //         otp: formData.otp,
// //         password: formData.password,
// //       }),
// //     });
  
// //     const data = await res.json();
// //     if (data.success) {
// //       showAlert('Account created successfully!', 'success');
      
// //       if (data.freelancerId) {
// //         // Optional: Keep localStorage for backward compatibility
   
        
// //         // Short delay before redirect to show success message
// //         setTimeout(() => {
// //           router.push(`/tech_vendor/dashboard`);
// //         }, 1500);
// //       }
// //     } else {
// //       showAlert(data.error || 'Invalid OTP or failed to create account', 'error');
// //     }
// //   } catch (error) {
// //     showAlert('An error occurred during verification', 'error');
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// const handleVerifyOtp = async () => {
//   try {
//     setLoading(true);
//     const res = await fetch('/api/verify-otp-and-create-vendor', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // Important for cookies
//       body: JSON.stringify({
//         email: formData.email,
//         otp: formData.otp,
//         password: formData.password,
//       }),
//     });
  
//     const data = await res.json();
//     if (data.success) {
//       showAlert('Account created successfully!', 'success');
      
//       // Short delay before redirect to show success message
//       setTimeout(() => {
//         // Redirect based on user type
//         if (data.type === 'vendor') {
//           router.push('/tech-vendor/dashboard');
//         } else if (data.type === 'user') {
//           router.push('/dashboard'); // or whatever your user dashboard route is
//         }
//       }, 1500);
//     } else {
//       showAlert(data.error || 'Invalid OTP or failed to create account', 'error');
//     }
//   } catch (error) {
//     showAlert('An error occurred during verification', 'error');
//   } finally {
//     setLoading(false);
//   }
// };


// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (step === 1) {
//       const isPasswordValid = Object.values(passwordStrength).every(Boolean);
//       if (!isPasswordValid) {
//         showAlert('Please meet all password requirements', 'error');
//         return;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         showAlert('Passwords do not match', 'error');
//         return;
//       }
//       handleSendOtp();
//     } else if (step === 2) {
//       handleVerifyOtp();
//     }
// };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6 pt-8"
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
//                   disabled={loading}
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
//                   disabled={loading}
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
//                   disabled={loading}
//                 />

//                 <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//                   {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
//                   {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
//                   {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
//                   {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
//                   {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
//                 </div>
//                 <div className="text-center text-sm text-gray-500">
//             Already have an account?{' '}
//             <a href="/auth/vendor/login" className="text-black hover:underline">
//               Sign In
//             </a>
//           </div>
//               </motion.div>
//             </div>
//           </motion.div>
          
//         );

//       case 2:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6 pt-8"
//           >
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
//               <p className="text-gray-500 mt-2">Enter the OTP sent to {formData.email}</p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                 value={formData.otp}
//                 onChange={(e) => setFormData({...formData, otp: e.target.value})}
//                 disabled={loading}
//               />
//             </motion.div>

//             <p className="text-sm text-gray-500 mt-4">
//               Didn't receive the code?{' '}
//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 disabled={loading}
//                 className="text-black hover:underline disabled:text-gray-400"
//               >
//                 Resend OTP
//               </button>
//             </p>
//           </motion.div>
//         );

//       default:
//         return null;
//     }
//   };

//   const renderButton = () => {
//     if (loading) {
//       return (
//         <button
//           disabled
//           className="px-6 py-2.5 rounded-2xl bg-gray-400 text-white cursor-not-allowed"
//         >
//           Loading...
//         </button>
//       );
//     }

//     if (step === 2) {
//       return (
//         <button
//           type="submit"
//           className="px-6 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors"
//         >
//           Complete Signup
//         </button>
//       );
//     }

//     const isDisabled = !formData.email || !formData.password || 
//                       !formData.confirmPassword || 
//                       formData.password !== formData.confirmPassword ||
//                       !Object.values(passwordStrength).every(Boolean);
    
//     return (
//       <button
//         type="submit"
//         disabled={isDisabled}
//         className={`px-6 py-2.5 rounded-2xl transition-colors ${
//           isDisabled 
//             ? 'bg-gray-300 cursor-not-allowed' 
//             : 'bg-black text-white hover:bg-gray-800'
//         }`}
//       >
//         Next step
//       </button>
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 pt-8">
//       {alert && (
//         <Alert
//           message={alert.message}
//           type={alert.type}
//           onClose={() => setAlert(null)}
//         />
//       )}
      
//       <form
//         onSubmit={handleSubmit}
//         className="rounded-3xl p-8 shadow-sm"
//       >
//         {renderStep()}

//         {/* Navigation */}
//         <div className="flex justify-between items-center mt-8">
//           {/* Go Back Button */}
//           <div
//             onClick={() => !loading && setStep(step - 1)}
//             className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer ${
//               step === 1 || loading ? 'invisible' : ''
//             }`}
//           >
//             <ArrowLeft size={20} />
//             Go back
//           </div>

//           {/* Next or Submit Button */}
//           {renderButton()}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default VendorSignupPage;
// app/auth/new/vendor/login/page.tsx
'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';
import { useNewAuth } from '@/context/NewAuthContext';
import Link from 'next/link';

export default function VendorLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userType, isLoading } = useNewAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const returnUrl = searchParams.get('returnUrl') || '/tech-vendor/dashboard';

  // Redirect if already logged in
  useEffect(() => {
    if (isLoading) return;
    
    if (isAuthenticated) {
      if (userType === 'user') {
        router.push('/legal-professionals/dashboard');
      } else if (userType === 'vendor') {
        router.push(decodeURIComponent(returnUrl));
      }
    }
  }, [isAuthenticated, userType, isLoading, router, returnUrl]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Sending magic link...');
    
    try {
      const res = await fetch('/api/auth/new/vendor/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          returnUrl: decodeURIComponent(returnUrl) 
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage('✓ Check your email! We sent you a magic link.');
      } else {
        setMessage('Error: ' + (data.error || 'Failed to send magic link'));
      }
    } catch (error) {
      setMessage('Error: Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold" style={{ color: '#1e2556' }}>
              DreamLegal
            </h1>
          </Link>
          <p className="text-sm text-[#7cc6ee] mt-2 font-semibold">Vendor Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1e2556]">Vendor Login</h1>
              <p className="text-[#334155] mt-2">
                Access your vendor dashboard
              </p>
            </div>

            {message && (
              <div className={`p-4 rounded-xl ${
                message.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-100' 
                  : 'bg-green-50 text-green-700 border border-green-100'
              }`}>
                {message}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-5">
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7cc6ee]"
                />
                <input
                  type="email"
                  placeholder="Vendor Email"
                  className="w-full p-4 pl-12 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1e2556] hover:bg-[#1e2556]/90 text-white py-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-[#334155] mt-8">
              Don't have a vendor account?{' '}
              <Link
                href="/auth/new/vendor/signup"
                className="text-[#7cc6ee] hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>

            {/* User Login Link */}
            <div className="text-center text-sm text-[#64748b] mt-4">
              Are you a legal professional?{' '}
              <Link
                href="/auth/new/user/login"
                className="text-[#7cc6ee] hover:underline"
              >
                User Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-[#334155]">
          <p>© 2025 DreamLegal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}