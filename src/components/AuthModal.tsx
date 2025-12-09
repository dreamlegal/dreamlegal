// // components/AuthModal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import { Mail } from 'lucide-react';
// import { FcGoogle } from 'react-icons/fc';
// import { BsLinkedin } from 'react-icons/bs';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message?: string;
//   userType?: 'user' | 'vendor';
// }

// export default function AuthModal({ 
//   isOpen, 
//   onClose, 
//   message = "Sign in to continue",
//   userType = 'user' 
// }: AuthModalProps) {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Get current URL as returnUrl
//   const getReturnUrl = () => {
//     const currentPath = pathname;
//     const params = searchParams.toString();
//     return params ? `${currentPath}?${params}` : currentPath;
//   };

//   // Store returnUrl in multiple places for safety
//   const setReturnUrl = (url: string) => {
//     if (typeof window !== 'undefined') {
//       sessionStorage.setItem('returnUrl', url);
//       document.cookie = `returnUrl=${url}; path=/; max-age=3600`;
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       const returnUrl = getReturnUrl();
//       setReturnUrl(returnUrl);
//     }
//   }, [isOpen]);

//   // Close on ESC key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
    
//     if (isOpen) {
//       window.addEventListener('keydown', handleEsc);
//       document.body.style.overflow = 'hidden';
//     }
    
//     return () => {
//       window.removeEventListener('keydown', handleEsc);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleEmailSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage('Sending magic link...');
    
//     const returnUrl = getReturnUrl();
    
//     try {
//       const endpoint = userType === 'vendor' 
//         ? '/api/auth/new/vendor/send-magic-link'
//         : '/api/auth/new/user/send-magic-link';
      
//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, returnUrl }),
//       });
      
//       const data = await res.json();
      
//       if (data.success) {
//         setStatusMessage('✓ Check your email! We sent you a magic link.');
//       } else {
//         setStatusMessage('Error: ' + (data.error || 'Failed to send magic link'));
//       }
//     } catch (error) {
//       setStatusMessage('Error: Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleProviderSignIn = async (provider: 'google' | 'linkedin') => {
//   //   setLoading(true);
//   //   const returnUrl = getReturnUrl();
    
//   //   try {
//   //     // Use NextAuth for OAuth
//   //     await signIn(provider, {
//   //       callbackUrl: `/auth/new/callback?returnUrl=${encodeURIComponent(returnUrl)}`,
//   //       redirect: true,
//   //     });
//   //   } catch (error) {
//   //     console.error(`Error with ${provider}:`, error);
//   //     setStatusMessage(`Error signing in with ${provider}`);
//   //     setLoading(false);
//   //   }
//   // };
//   // ✅ CORRECT - In AuthModal.tsx
// const handleProviderSignIn = async (provider: 'google' | 'linkedin') => {
//   setLoading(true);
//   const returnUrl = getReturnUrl();
  
//   // Store returnUrl before OAuth redirect
//   setReturnUrl(returnUrl);
  
//   try {
//     // Use NextAuth for OAuth - it will use our callback in auth.ts
//     await signIn(provider, {
//       callbackUrl: `/auth/new/callback?returnUrl=${encodeURIComponent(returnUrl)}`,
//       redirect: true,
//     });
//   } catch (error) {
//     console.error(`Error with ${provider}:`, error);
//     setStatusMessage(`Error signing in with ${provider}`);
//     setLoading(false);
//   }
// };

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <div 
//           className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
//                 {userType === 'vendor' ? 'Vendor Sign In' : 'Welcome back'}
//               </h2>
//               <p className="text-sm mt-1" style={{ color: '#334155' }}>{message}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             {statusMessage && (
//               <div className={`p-4 rounded-xl text-sm ${
//                 statusMessage.includes('Error') 
//                   ? 'bg-red-50 text-red-700 border border-red-100' 
//                   : 'bg-green-50 text-green-700 border border-green-100'
//               }`}>
//                 {statusMessage}
//               </div>
//             )}

//             {/* Email Form */}
//             <form onSubmit={handleEmailSignIn} className="space-y-4">
//               <div className="relative">
//                 <Mail
//                   size={20}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7cc6ee]"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full p-4 pl-12 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-xl bg-[#1e2556] hover:bg-[#1e2556]/90 text-white py-4 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Sending...' : 'Send Magic Link'}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="flex items-center my-6">
//               <div className="flex-grow h-px bg-gray-200"></div>
//               <span className="px-4 text-sm font-medium text-[#334155]">OR</span>
//               <div className="flex-grow h-px bg-gray-200"></div>
//             </div>

//             {/* OAuth Buttons */}
//             <div className="space-y-3">
//               <button
//                 onClick={() => handleProviderSignIn('google')}
//                 disabled={loading}
//                 className="w-full rounded-xl bg-white hover:bg-gray-50 text-[#2d2d2d] py-4 border border-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 <FcGoogle size={24} />
//                 <span className="font-semibold">Continue with Google</span>
//               </button>

//               <button
//                 onClick={() => handleProviderSignIn('linkedin')}
//                 disabled={loading}
//                 className="w-full rounded-xl bg-[#0077B5] hover:bg-[#006399] text-white py-4 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 <BsLinkedin size={24} />
//                 <span className="font-semibold">Continue with LinkedIn</span>
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="text-center mt-6 text-xs" style={{ color: '#64748b' }}>
//               <p>
//                 By continuing, you agree to DreamLegal's{' '}
//                 <a href="/terms" className="underline hover:text-[#1e2556]">Terms of Service</a>
//                 {' '}and{' '}
//                 <a href="/privacy" className="underline hover:text-[#1e2556]">Privacy Policy</a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// components/AuthModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin } from 'react-icons/bs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  userType?: 'user' | 'vendor';
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  message = "Sign in to continue",
  userType = 'user' 
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // ✅ FIXED: Get search params safely (client-side only)
  const getReturnUrl = () => {
    if (typeof window === 'undefined') return '/';
    
    const currentPath = pathname;
    const params = window.location.search;
    return params ? `${currentPath}${params}` : currentPath;
  };

  // Store returnUrl in multiple places for safety
  const setReturnUrl = (url: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('returnUrl', url);
      document.cookie = `returnUrl=${url}; path=/; max-age=3600`;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const returnUrl = getReturnUrl();
      setReturnUrl(returnUrl);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Sending magic link...');
    
    const returnUrl = getReturnUrl();
    
    try {
      const endpoint = userType === 'vendor' 
        ? '/api/auth/new/vendor/send-magic-link'
        : '/api/auth/new/user/send-magic-link';
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, returnUrl }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatusMessage('✓ Check your email! We sent you a magic link.');
      } else {
        setStatusMessage('Error: ' + (data.error || 'Failed to send magic link'));
      }
    } catch (error) {
      setStatusMessage('Error: Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'linkedin') => {
    setLoading(true);
    const returnUrl = getReturnUrl();
    
    // Store returnUrl before OAuth redirect
    setReturnUrl(returnUrl);
    
    try {
      // Use NextAuth for OAuth - it will use our callback in auth.ts
      await signIn(provider, {
        callbackUrl: returnUrl, // Direct to returnUrl
        redirect: true,
      });
    } catch (error) {
      console.error(`Error with ${provider}:`, error);
      setStatusMessage(`Error signing in with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
                {userType === 'vendor' ? 'Vendor Sign In' : 'Welcome back'}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#334155' }}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {statusMessage && (
              <div className={`p-4 rounded-xl text-sm ${
                statusMessage.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-100' 
                  : 'bg-green-50 text-green-700 border border-green-100'
              }`}>
                {statusMessage}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7cc6ee]"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 pl-12 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1e2556] hover:bg-[#1e2556]/90 text-white py-4 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
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
                className="w-full rounded-xl bg-white hover:bg-gray-50 text-[#2d2d2d] py-4 border border-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <FcGoogle size={24} />
                <span className="font-semibold">Continue with Google</span>
              </button>

              <button
                onClick={() => handleProviderSignIn('linkedin')}
                disabled={loading}
                className="w-full rounded-xl bg-[#0077B5] hover:bg-[#006399] text-white py-4 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <BsLinkedin size={24} />
                <span className="font-semibold">Continue with LinkedIn</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-xs" style={{ color: '#64748b' }}>
              <p>
                By continuing, you agree to DreamLegal's{' '}
                <a href="/terms" className="underline hover:text-[#1e2556]">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-[#1e2556]">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}