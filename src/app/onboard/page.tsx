
// "use client";

// import { motion } from "framer-motion";
// import { ArrowLeft, Check } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/authContext"; // Adjust the path as needed

// const OnBoard = () => {
//   const { userId, userType, isAuthenticated, isLoading, hasCompletedOnboarding, checkAuth } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     organizationName: "",
//     organizationType: "",
//     teamSize: 1,
//   });

//   // Redirect if user is not authenticated or has already completed onboarding
//   useEffect(() => {
//     if (isLoading) return;
    
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       return;
//     }
    
//     if (hasCompletedOnboarding) {
//       router.push("/legal_professionals/dashboard");
//       return;
//     }
    
//     if (userType === "vendor") {
//       router.push("/tech_vendor/dashboard");
//       return;
//     }
//   }, [isAuthenticated, userType, hasCompletedOnboarding, isLoading, router]);

//   const teamSizeOptions = [
//     { value: 1, label: "1 person" },
//     { value: 20, label: "2-20 people" },
//     { value: 50, label: "21-50 people" },
//     { value: 200, label: "51-200 people" },
//     { value: 500, label: "201-500 people" },
//     { value: 501, label: "500+ people" },
//   ];

//   const orgTypes = [
//     {
//       id: "law-firm",
//       icon: "⚖️",
//       title: "Law Firm",
//       description: "Legal practice and services",
//     },
//     {
//       id: "enterprise",
//       icon: "🏢",
//       title: "Enterprise",
//       description: "Large scale business",
//     },
//     {
//       id: "individual",
//       icon: "👤",
//       title: "Individual",
//       description: "Solo practitioner",
//     },
//     {
//       id: "startup",
//       icon: "🚀",
//       title: "Startup",
//       description: "Growing business",
//     },
//     {
//       id: "government",
//       icon: "🏛️",
//       title: "Government",
//       description: "Public sector",
//     },
//     {
//       id: "judiciary",
//       icon: "⚡",
//       title: "Judiciary",
//       description: "Legal system",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (step < 3) {
//       setStep((prev) => prev + 1);
//     } else {
//       handleCompleteSetup();
//     }
//   };

//   const handleCompleteSetup = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/onboard-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: userId,
//           organizationName: formData.organizationName,
//           organizationType: formData.organizationType,
//           teamSize: formData.teamSize
//         }),
//       });
      
//       const data = await res.json();
//       if (data.success) {
//         // Update auth context to reflect completed onboarding
//         await checkAuth();
//         router.push('/legal_professionals/dashboard');
//       } else {
//         console.error('Failed to complete onboarding:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during onboarding:', error);
//     } finally {
//       setLoading(false);
//     }
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
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Organization Details
//               </h1>
//               <p className="text-gray-500 mt-2">
//                 Tell us about your organization
//               </p>
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
//                 onChange={(e) =>
//                   setFormData({ ...formData, organizationName: e.target.value })
//                 }
//               />
//             </motion.div>
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
//               <h1 className="text-2xl font-bold text-gray-900">
//                 What describes you the best?
//               </h1>
//               <p className="text-gray-500 mt-2">
//                 Select your organization type
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {orgTypes.map((type, index) => (
//                 <motion.button
//                   key={type.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   onClick={() =>
//                     setFormData({ ...formData, organizationType: type.id })
//                   }
//                   className={`p-4 rounded-2xl transition-all group relative overflow-hidden ${
//                     formData.organizationType === type.id
//                       ? "bg-black text-white border-2 border-black shadow-lg scale-105"
//                       : "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900"
//                   }`}
//                 >
//                   <div className="flex flex-col h-full relative z-10">
//                     <div className="text-xl mb-2">{type.icon}</div>
//                     <div className="font-medium">{type.title}</div>
//                     <div
//                       className={`text-sm mt-1 ${
//                         formData.organizationType === type.id
//                           ? "text-gray-300"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {type.description}
//                     </div>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
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
//               <h1 className="text-2xl font-bold text-gray-900">
//                 How big is your team?
//               </h1>
//               <p className="text-gray-500 mt-2">Select your team size range</p>
//             </div>

//             <div className="space-y-4">
//               {teamSizeOptions.map((option, index) => (
//                 <motion.button
//                   key={option.value}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   onClick={() =>
//                     setFormData({ ...formData, teamSize: option.value })
//                   }
//                   className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
//                     formData.teamSize === option.value
//                       ? "bg-black text-white shadow-lg"
//                       : "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900"
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

//     const isDisabled = () => {
//       switch (step) {
//         case 1:
//           return !formData.organizationName;
//         case 2:
//           return !formData.organizationType;
//         default:
//           return false;
//       }
//     };

//     return (
//       <button
//         type="submit"
//         disabled={isDisabled()}
//         className={`px-6 py-2.5 rounded-2xl transition-colors ${
//           isDisabled()
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-black text-white hover:bg-gray-800"
//         }`}
//       >
//         {step === 3 ? "Complete Setup" : "Next step"}
//       </button>
//     );
//   };

//   // Show loading state while checking session
//   if (isLoading) {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 pt-8 text-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-8 pt-8">
//       <form onSubmit={handleSubmit} className="rounded-3xl p-8 shadow-sm">
//         {renderStep()}

//         {/* Navigation */}
//         <div className="flex justify-between items-center mt-8">
//           {/* Go Back Button */}
//           {step > 1 && (
//             <div
//               onClick={() => !loading && setStep(step - 1)}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer"
//             >
//               <ArrowLeft size={20} />
//               Go back
//             </div>
//           )}
//           {step === 1 && <div />}

//           {/* Next or Submit Button */}
//           {renderButton()}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OnBoard;
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext"; // Adjust the path as needed

const OnBoard = () => {
  const { userId, userType, isAuthenticated, isLoading, hasCompletedOnboarding, checkAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    teamSize: 1,
  });

  // Get redirect parameter from URL
  const redirectUrl = searchParams.get('redirect');

  // Function to determine where to redirect after onboarding
  const getPostOnboardingDestination = () => {
    // Priority 1: Use redirect parameter if provided (e.g., back to prompts)
    if (redirectUrl) {
      return decodeURIComponent(redirectUrl);
    }
    
    // Priority 2: Default dashboard
    return '/legal-professionals/dashboard';
  };

  // Redirect if user is not authenticated or has already completed onboarding
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      // Preserve redirect parameter when redirecting to login
      const loginUrl = redirectUrl 
        ? `/auth/user/login?redirect=${encodeURIComponent(redirectUrl)}`
        : "/auth/user/login";
      router.push(loginUrl);
      return;
    }
    
    if (hasCompletedOnboarding) {
      // If already onboarded and there's a redirect, use it
      const destination = getPostOnboardingDestination();
      router.push(destination);
      return;
    }
    
    if (userType === "vendor") {
      router.push("/tech_vendor/dashboard");
      return;
    }
  }, [isAuthenticated, userType, hasCompletedOnboarding, isLoading, router, redirectUrl]);

  const teamSizeOptions = [
    { value: 1, label: "1 person" },
    { value: 20, label: "2-20 people" },
    { value: 50, label: "21-50 people" },
    { value: 200, label: "51-200 people" },
    { value: 500, label: "201-500 people" },
    { value: 501, label: "500+ people" },
  ];

  const orgTypes = [
    {
      id: "law-firm",
      icon: "⚖️",
      title: "Law Firm",
      description: "Legal practice and services",
    },
    {
      id: "enterprise",
      icon: "🏢",
      title: "Enterprise",
      description: "Large scale business",
    },
    {
      id: "individual",
      icon: "👤",
      title: "Individual",
      description: "Solo practitioner",
    },
    {
      id: "startup",
      icon: "🚀",
      title: "Startup",
      description: "Growing business",
    },
    {
      id: "government",
      icon: "🏛️",
      title: "Government",
      description: "Public sector",
    },
    {
      id: "judiciary",
      icon: "⚡",
      title: "Judiciary",
      description: "Legal system",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleCompleteSetup();
    }
  };

  const handleCompleteSetup = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/onboard-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          organizationName: formData.organizationName,
          organizationType: formData.organizationType,
          teamSize: formData.teamSize
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        // Update auth context to reflect completed onboarding
        await checkAuth();
        
        // Redirect to intended destination (prompts page or dashboard)
        const destination = getPostOnboardingDestination();
        router.push(destination);
      } else {
        console.error('Failed to complete onboarding:', data.error);
      }
    } catch (error) {
      console.error('Error during onboarding:', error);
    } finally {
      setLoading(false);
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
              <h1 className="text-2xl font-bold text-gray-900">
                Organization Details
              </h1>
              <p className="text-gray-500 mt-2">
                Tell us about your organization
              </p>
              {/* Show redirect message if coming from prompts */}
              {redirectUrl && redirectUrl.includes('/prompts') && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🎯 You'll be redirected back to the prompt library after setup
                  </p>
                </div>
              )}
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
                onChange={(e) =>
                  setFormData({ ...formData, organizationName: e.target.value })
                }
              />
            </motion.div>
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
              <h1 className="text-2xl font-bold text-gray-900">
                What describes you the best?
              </h1>
              <p className="text-gray-500 mt-2">
                Select your organization type
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {orgTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    setFormData({ ...formData, organizationType: type.id })
                  }
                  className={`p-4 rounded-2xl transition-all group relative overflow-hidden ${
                    formData.organizationType === type.id
                      ? "bg-black text-white border-2 border-black shadow-lg scale-105"
                      : "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900"
                  }`}
                >
                  <div className="flex flex-col h-full relative z-10">
                    <div className="text-xl mb-2">{type.icon}</div>
                    <div className="font-medium">{type.title}</div>
                    <div
                      className={`text-sm mt-1 ${
                        formData.organizationType === type.id
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {type.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
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
              <h1 className="text-2xl font-bold text-gray-900">
                How big is your team?
              </h1>
              <p className="text-gray-500 mt-2">Select your team size range</p>
            </div>

            <div className="space-y-4">
              {teamSizeOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    setFormData({ ...formData, teamSize: option.value })
                  }
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                    formData.teamSize === option.value
                      ? "bg-black text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900"
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
          {step === 3 ? "Completing Setup..." : "Loading..."}
        </button>
      );
    }

    const isDisabled = () => {
      switch (step) {
        case 1:
          return !formData.organizationName;
        case 2:
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
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {step === 3 
          ? (redirectUrl && redirectUrl.includes('/prompts') 
             ? "Complete & Go to Prompts" 
             : "Complete Setup"
            ) 
          : "Next step"
        }
      </button>
    );
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 pt-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 pt-8">
      <form onSubmit={handleSubmit} className="rounded-3xl p-8 shadow-sm">
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

export default OnBoard;