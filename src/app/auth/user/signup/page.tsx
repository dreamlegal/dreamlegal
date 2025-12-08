// "use client";
// import { Mail } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { BsLinkedin } from "react-icons/bs";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useNewAuth } from '@/context/NewAuthContext';
// import { signIn as nextAuthSignIn } from "next-auth/react"; // Import NextAuth directly

// const UserLoginPage = () => {
//   const { isAuthenticated, userType, hasCompletedOnboarding, isLoading, signInWithProvider } = useNewAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Check if user is already authenticated
//   useEffect(() => {
//     if (isLoading) return;
    
//     if (isAuthenticated) {
//       // Redirect based on user type and onboarding status
//       if (userType === "vendor") {
//         router.push("/tech-vendor/dashboard");
//       } else if (userType === "user" && !hasCompletedOnboarding) {
//         router.push("/onboard");
//       } else if (userType === "user" && hasCompletedOnboarding) {
//         router.push("/legal-professionals/dashboard");
//       }
//     }
//   }, [isAuthenticated, userType, hasCompletedOnboarding, isLoading, router]);

//   async function handleEmailSignIn(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("Sending magic link...");
    
//     try {
//       // Use NextAuth's signIn directly instead of your custom hook
//       // This is critical for the verification page flow to work correctly
//       const result = await nextAuthSignIn("email", {
//         email: email,
//         redirect: true, // Important: allow NextAuth to handle redirect
//         // Use a generic URL and let NextAuth's redirect callback determine the actual destination
//         // This will go through your onboarding check in the redirect callback
//         callbackUrl: '/auth/success',
//       });
      
//       // Note: if redirect is true, the code below will only run if there's an error
//       // because successful auth will redirect to the verify page
//       if (!result?.ok) {
//         setMessage("Error sending magic link. Please try again.");
//       }
//     } catch (error) {
//       setMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleProviderSignIn(provider) {
//     setLoading(true);
//     try {
//       await signInWithProvider(provider, 
//         provider === 'google' ? { prompt: 'select_account' } : {});
//     } catch (error) {
//       console.error(`Error signing in with ${provider}:`, error);
//       setMessage(`Error signing in with ${provider}. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   }
  
//   // If already checking auth status
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center pt-8">
//         <div className="max-w-md w-full mx-auto">
//           <div className="bg-white rounded-2xl p-8 shadow-lg">
//             <div className="flex justify-center items-center h-32">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full mx-auto">
//         {/* Logo or branding element */}
       
//         {/* Login Card */}
//         <div className="bg-white rounded-2xl p-8 mt-16 shadow-lg border border-gray-100">
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-[#1e2556]">Get Started</h1>
//               <p className="text-[#334155] mt-2">
//                 Sign Up to access your DreamLegal Platform
//               </p>
//             </div>

//             {message && (
//               <div className={`p-4 rounded-xl ${message.includes("Error") ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleEmailSignIn} className="space-y-5">
//               <div className="space-y-4">
//                 <div className="relative">
//                   <Mail
//                     size={20}
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7cc6ee]"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full p-4 pl-12 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all duration-200 ease-in-out"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full rounded-xl bg-[#1e2556] hover:bg-[#1e2556]/90 text-white py-4 transition-all duration-200 ease-in-out"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Sign in with Email"}
//               </Button>
//             </form>

//             <div className="flex items-center my-6">
//               <div className="flex-grow h-px bg-gray-200"></div>
//               <span className="px-4 text-sm font-medium text-[#334155]">OR</span>
//               <div className="flex-grow h-px bg-gray-200"></div>
//             </div>

//             <div className="space-y-3">
//               <Button
//                 onClick={() => handleProviderSignIn("google")}
//                 className="w-full rounded-xl bg-white hover:bg-gray-50 text-[#2d2d2d] py-4 border border-gray-200 transition-all duration-200 ease-in-out"
//                 disabled={loading}
//               >
//                 <FcGoogle size={20} className="mr-3" /> Continue with Google
//               </Button>
//               <Button
//                 onClick={() => handleProviderSignIn("linkedin")}
//                 className="w-full rounded-xl bg-[#7cc6ee] hover:bg-[#7cc6ee]/90 text-white py-4 transition-all duration-200 ease-in-out"
//                 disabled={loading}
//               >
//                 <BsLinkedin size={20} className="mr-3" /> Continue with LinkedIn
//               </Button>
//             </div>

//             <div className="text-center text-[#334155] mt-8">
//               Already have an account?{" "}
//               <a
//                 href="/auth/user/signup"
//                 className="text-[#7cc6ee] hover:underline font-medium"
//               >
//                 Log In
//               </a>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer */}
//         <div className="text-center mt-8 text-sm text-[#334155]">
//           <p>© 2025 DreamLegal. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLoginPage;
// app/auth/new/user/signup/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin } from 'react-icons/bs';
import { useNewAuth } from '@/context/NewAuthContext';
import Link from 'next/link';

export default function UserSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userType, hasCompletedOnboarding, isLoading } = useNewAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const returnUrl = searchParams.get('returnUrl') || '/legal-professionals/dashboard';

  // Redirect if already logged in
  useEffect(() => {
    if (isLoading) return;
    
    if (isAuthenticated) {
      if (userType === 'vendor') {
        router.push('/tech-vendor/dashboard');
      } else if (userType === 'user') {
        if (hasCompletedOnboarding) {
          router.push(decodeURIComponent(returnUrl));
        } else {
          router.push('/onboard');
        }
      }
    }
  }, [isAuthenticated, userType, hasCompletedOnboarding, isLoading, router, returnUrl]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Sending magic link...');
    
    try {
      const res = await fetch('/api/auth/new/user/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          returnUrl: decodeURIComponent(returnUrl) 
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage('✓ Check your email! We sent you a magic link to complete signup.');
      } else {
        setMessage('Error: ' + (data.error || 'Failed to send magic link'));
      }
    } catch (error) {
      setMessage('Error: Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'linkedin') => {
    setLoading(true);
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('returnUrl', decodeURIComponent(returnUrl));
      document.cookie = `returnUrl=${encodeURIComponent(returnUrl)}; path=/; max-age=3600`;
    }
    
    try {
      await signIn(provider, {
        callbackUrl: `/auth/new/callback?returnUrl=${encodeURIComponent(returnUrl)}`,
        redirect: true,
      });
    } catch (error) {
      console.error(`Error with ${provider}:`, error);
      setMessage(`Error signing in with ${provider}`);
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
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1e2556]">Get Started</h1>
              <p className="text-[#334155] mt-2">
                Create your DreamLegal account
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
                  placeholder="Email"
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
                {loading ? 'Sending...' : 'Sign Up with Email'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm font-medium text-[#334155]">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleProviderSignIn('google')}
                disabled={loading}
                className="w-full rounded-xl bg-white hover:bg-gray-50 text-[#2d2d2d] py-4 border border-gray-200 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <FcGoogle size={24} />
                <span className="font-semibold">Continue with Google</span>
              </button>

              <button
                onClick={() => handleProviderSignIn('linkedin')}
                disabled={loading}
                className="w-full rounded-xl bg-[#0077B5] hover:bg-[#006399] text-white py-4 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <BsLinkedin size={24} />
                <span className="font-semibold">Continue with LinkedIn</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-[#334155] mt-8">
              Already have an account?{' '}
              <Link
                href={`/auth/new/user/login${returnUrl !== '/legal-professionals/dashboard' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
                className="text-[#7cc6ee] hover:underline font-medium"
              >
                Log in
              </Link>
            </div>

            {/* Vendor Signup Link */}
            <div className="text-center text-sm text-[#64748b] mt-4">
              Are you a vendor?{' '}
              <Link
                href="/auth/new/vendor/signup"
                className="text-[#7cc6ee] hover:underline"
              >
                Vendor Signup
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