// "use client"
// import React, { useState } from 'react';
// import { Mail, Lock, Eye } from 'lucide-react';
// import { useNewAuth } from '@/context/NewAuthContext';;
// import { useRouter } from 'next/navigation';

// const VendorLoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isResetModalOpen, setIsResetModalOpen] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [alert, setAlert] = useState({ show: false, title: '', message: '' });

//   const { login } = useNewAuth();
//   const router = useRouter();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
    
//   //   const result = await login(formData);

//   //   if (result.success) {
//   //     showAlert("Success", "Redirecting to dashboard");
      
//   //     // Redirect based on user type
//   //     setTimeout(() => {
//   //       if (result.type === 'vendor') {
//   //         router.push('/tech_vendor/dashboard');
//   //       } else {
//   //         router.push('/legal_proffesionals/dashboard');
//   //       }
//   //     }, 1500);
//   //   } else {
//   //     showAlert('Error', result.error || 'Failed to sign in');
//   //   }
//   // };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
    
//   //   try {
//   //     console.log('Attempting login with:', formData); // Debug log
      
//   //     const result = await login(formData);
//   //     console.log('Login result:', result); // Debug log
  
//   //     if (result.success) {
//   //       showAlert("Success", "Redirecting to dashboard");
        
//   //       // Redirect based on user type
//   //       setTimeout(() => {
//   //         if (result.type === 'vendor') {
//   //           router.push('/tech_vendor/dashboard');
//   //         } else {
//   //           router.push('/legal_proffesionals/dashboard'); // Note: "professionals" is misspelled
//   //         }
//   //       }, 1500);
//   //     } else {
//   //       showAlert('Error', result.error || 'Failed to sign in');
//   //     }
//   //   } catch (error) {
//   //     console.error('Login error:', error); // Debug log
//   //     showAlert('Error', 'An unexpected error occurred during login');
//   //   }
//   // };


// // const handleLogin = async (e) => {
// //   e.preventDefault();
  
// //   try {
// //     console.log('Attempting login with:', formData);

// //     // Make sure to await the login call
// //     const result = await login(formData);
// //     console.log('Login result:', result);

// //     if (result && result.success) {  // Add null check
// //       showAlert("Success", "Redirecting to dashboard");
      
// //       setTimeout(() => {
// //         if (result.type === 'vendor') {
// //           router.push('/tech_vendor/dashboard');
// //         } else {
// //           router.push('/legal_proffesionals/dashboard');
// //         }
// //       }, 1500);
// //     } else {
// //       showAlert('Error', (result && result.error) || 'Failed to sign in');
// //     }
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     showAlert('Error', 'An unexpected error occurred during login');
// //   }
// // };





// const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       // const response = await fetch("/api/vendor-login", {
//       const response = await fetch("/api/common-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
//       console.log('Login API response:', data);
  
      
//       if (data?.success) {
//         showAlert("Success", "Redirecting to dashboard");
        
//         setTimeout(() => {
//           window.location.href = data.type === 'vendor' ? '/tech_vendor/dashboard' : '/legal_professionals/dashboard';
//         }, 1500);
//       } else {
//         showAlert('Error', data?.error || 'Failed to sign in');
//       }
//     } catch (error) {
//       console.error('Login handler error:', error);
//       showAlert('Error', 'An unexpected error occurred during login');
//     }
//   };
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/reset-password-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: resetEmail }),
//       });

//       if (response.ok) {
//         setIsResetModalOpen(false);
//         showAlert('Success', 'Password reset instructions have been sent to your email.');
//         setResetEmail('');
//       } else if (response.status === 404) {
//         showAlert('Error', 'No account exists with this email address.');
//       } else {
//         showAlert('Error', 'Failed to send reset email. Please try again later.');
//       }
//     } catch (error) {
//       showAlert('Error', 'An unexpected error occurred.');
//     }
//   };

//   const showAlert = (title, message) => {
//     setAlert({ show: true, title, message });
//     setTimeout(() => setAlert({ show: false, title: '', message: '' }), 5000);
//   };

//   return (
   
//     <div className='pt-8'>
//     <div className="max-w-2xl mx-auto pt-24 pb-16">
//       {alert.show && (
//         <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-[9999]">
//           <h4 className="font-bold">{alert.title}</h4>
//           <p>{alert.message}</p>
//         </div>
//       )}

//       <div className="rounded-3xl p-8 shadow-sm">
//         <div className="space-y-6">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
//             <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <Lock 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   required
//                 />
//                 <Eye
//                   size={20}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsResetModalOpen(true)}
//               className="text-sm text-gray-600 hover:text-gray-800"
//             >
//               Forgot password?
//             </button>

//             <button
//               type="submit"
            
//               className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
//             >
//               Sign in
//             </button>
//           </form>

//           <div className="text-center text-sm text-gray-500">
//             Don't have an account?{' '}
//             <a href="/auth/vendor/signup" className="text-black hover:underline">
//               Sign up
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* {isResetModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//             <p className="text-gray-600 mb-4">Enter your email address to receive a password reset link.</p>
//             <form onSubmit={handleResetPassword}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full p-3 rounded-lg border mb-4"
//                 value={resetEmail}
//                 onChange={(e) => setResetEmail(e.target.value)}
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsResetModalOpen(false)}
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//                 >
//                   Send Reset Link
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )} */}
//       {isResetModalOpen && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
//             <div className="bg-white/90 p-8 rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 m-4">
//               <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
//               <p className="text-gray-600 mb-6">Enter your email address to receive a password reset link.</p>
//               <form onSubmit={handleResetPassword}>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full p-4 rounded-2xl border border-gray-200 mb-6 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200 ease-in-out"
//                   value={resetEmail}
//                   onChange={(e) => setResetEmail(e.target.value)}
//                   required
//                 />
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsResetModalOpen(false)}
//                     className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                     <button
//                     type="submit"
//                     className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
//                     >
//                     Send Reset Link
//                     </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//     </div>
//   </div>
   
  
//   );
// };

// export default VendorLoginPage;



// app/auth/new/vendor/login/page.tsx
'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect ,Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';
import { useNewAuth } from '@/context/NewAuthContext';
import Link from 'next/link';

function VendorLoginContent() {
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
export default function VendorLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    }>
      <VendorLoginContent />
    </Suspense>
  );
}