
// "use client";
// import { Mail } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { BsLinkedin } from "react-icons/bs";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/authContext";
// import { signIn as nextAuthSignIn } from "next-auth/react"; // Import NextAuth directly

// const UserLoginPage = () => {
//   const { isAuthenticated, userType, hasCompletedOnboarding, isLoading, signInWithProvider } = useAuth();
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
//               <h1 className="text-3xl font-bold text-[#1e2556]">Welcome back</h1>
//               <p className="text-[#334155] mt-2">
//                 Sign in to access your DreamLegal account
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
//               Don't have an account?{" "}
//               <a
//                 href="/auth/user/signup"
//                 className="text-[#7cc6ee] hover:underline font-medium"
//               >
//                 Sign up
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
"use client";
import { Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signIn as nextAuthSignIn } from "next-auth/react"; // Import NextAuth directly

const UserLoginPage = () => {
  const { isAuthenticated, userType, hasCompletedOnboarding, isLoading, signInWithProvider } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get redirect parameter from URL
  const redirectUrl = searchParams.get('redirect');

  // Function to determine where to redirect after successful login
  const getRedirectDestination = () => {
    // Priority 1: Use redirect parameter if provided
    if (redirectUrl) {
      return decodeURIComponent(redirectUrl);
    }
    
    // Priority 2: Default redirects based on user type
    if (userType === "vendor") {
      return "/tech-vendor/dashboard";
    } else if (userType === "user" && !hasCompletedOnboarding) {
      return "/onboard";
    } else if (userType === "user" && hasCompletedOnboarding) {
      return "/legal-professionals/dashboard";
    }
    
    // Priority 3: Fallback
    return "/";
  };

  // Check if user is already authenticated
  useEffect(() => {
    if (isLoading) return;
    
    if (isAuthenticated) {
      const destination = getRedirectDestination();
      router.push(destination);
    }
  }, [isAuthenticated, userType, hasCompletedOnboarding, isLoading, router, redirectUrl]);

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("Sending magic link...");
    
    try {
      // Determine callback URL - use redirect parameter if available
      const callbackUrl = redirectUrl ? decodeURIComponent(redirectUrl) : '/auth/success';
      
      const result = await nextAuthSignIn("email", {
        email: email,
        redirect: true,
        callbackUrl: callbackUrl,
      });
      
      if (!result?.ok) {
        setMessage("Error sending magic link. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleProviderSignIn(provider) {
    setLoading(true);
    try {
      // For provider sign-in, we need to pass the redirect URL differently
      // since your signInWithProvider might handle redirects internally
      
      const callbackUrl = redirectUrl ? decodeURIComponent(redirectUrl) : 
        (userType === "vendor" ? "/tech-vendor/dashboard" : 
         userType === "user" && !hasCompletedOnboarding ? "/onboard" : 
         "/legal-professionals/dashboard");

      // Option 1: If your signInWithProvider supports callbackUrl
      await signInWithProvider(provider, {
        ...(provider === 'google' ? { prompt: 'select_account' } : {}),
        callbackUrl: callbackUrl
      });

      // Option 2: Alternative - use NextAuth directly for providers too
      // await nextAuthSignIn(provider, {
      //   redirect: true,
      //   callbackUrl: callbackUrl,
      //   ...(provider === 'google' ? { prompt: 'select_account' } : {})
      // });

    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setMessage(`Error signing in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }
  
  // If already checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center pt-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 mt-16 shadow-lg border border-gray-100">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1e2556]">Welcome back</h1>
              <p className="text-[#334155] mt-2">
                Sign in to access your DreamLegal account
              </p>
              {/* Show redirect message if coming from prompts */}
              {redirectUrl && redirectUrl.includes('/prompts') && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🎯 You'll be redirected back to the prompt library after signing in
                  </p>
                </div>
              )}
            </div>

            {message && (
              <div className={`p-4 rounded-xl ${message.includes("Error") ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7cc6ee]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 pl-12 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all duration-200 ease-in-out"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl bg-[#1e2556] hover:bg-[#1e2556]/90 text-white py-4 transition-all duration-200 ease-in-out"
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign in with Email"}
              </Button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm font-medium text-[#334155]">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleProviderSignIn("google")}
                className="w-full rounded-xl bg-white hover:bg-gray-50 text-[#2d2d2d] py-4 border border-gray-200 transition-all duration-200 ease-in-out"
                disabled={loading}
              >
                <FcGoogle size={20} className="mr-3" /> Continue with Google
              </Button>
              <Button
                onClick={() => handleProviderSignIn("linkedin")}
                className="w-full rounded-xl bg-[#7cc6ee] hover:bg-[#7cc6ee]/90 text-white py-4 transition-all duration-200 ease-in-out"
                disabled={loading}
              >
                <BsLinkedin size={20} className="mr-3" /> Continue with LinkedIn
              </Button>
            </div>

            <div className="text-center text-[#334155] mt-8">
              Don't have an account?{" "}
              <a
                href={`/auth/user/signup${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="text-[#7cc6ee] hover:underline font-medium"
              >
                Sign up
              </a>
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
};

export default UserLoginPage;