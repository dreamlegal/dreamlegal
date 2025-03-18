// // 'use client'
// // // context/AuthContext.js
// // import { createContext, useContext, useState, useEffect } from 'react';

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [userId, setUserId] = useState(null);
// //   const [vendorId, setVendorId] = useState(null);
  
// //   const [userType, setUserType] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true); // Add loading state

// //   // Function to check auth status
// //   const checkAuth = async () => {
// //     try {
// //       const res = await fetch('/api/check-auth', {
// //         method: 'GET',
// //         credentials: 'include', // Important for cookies
// //       });
      
// //       const data = await res.json();
      
// //       if (data.success && data.user) {
// //         // Update state based on user type
// //         if (data.user.type === 'user') {
// //           setUserId(data.user.id);
// //           setVendorId(null);
// //         } else if (data.user.type === 'vendor') {
// //           setVendorId(data.user.id);
// //           setUserId(null);
// //         }
// //         setUserType(data.user.type);
// //         setUserEmail(data.user.email);
// //       } else {
// //         // Clear state if no valid auth
// //         setUserId(null);
// //         setVendorId(null);
// //         setUserType(null);
// //         setUserEmail(null);
// //       }
// //     } catch (error) {
// //       console.error('Error checking auth status:', error);
// //       // Clear state on error
// //       setUserId(null);
// //       setVendorId(null);
// //       setUserType(null);
// //       setUserEmail(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Check auth status when component mounts
// //   useEffect(() => {
// //     checkAuth();
// //   }, []);



  
// // // const login = async (formData) => {
// // //   try {
// // //     const response = await fetch("/api/user-login", {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       credentials: 'include',
// // //       body: JSON.stringify(formData),
// // //     });

// // //     const data = await response.json();

// // //     if (data.success) {
// // //       // Update context state
// // //       if (data.user.type === 'user') {
// // //         setUserId(data.user.id);
// // //         setVendorId(null);
// // //       } else if (data.user.type === 'vendor') {
// // //         setVendorId(data.user.id);
// // //         setUserId(null);
// // //       }
// // //       setUserType(data.user.type);
// // //       setUserEmail(data.user.email);

// // //       return { success: true, type: data.user.type };
// // //     } else {
// // //       return { success: false, error: data.error };
// // //     }
// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     return { success: false, error: 'An unexpected error occurred' };
// // //   }
// // // };


// // const logout = async () => {
// //     try {
// //       const res = await fetch('/api/logout', {
// //         method: 'POST',
// //         credentials: 'include', // Important for cookie handling
// //       });
  
// //       const data = await res.json();
      
// //       if (data.success) {
// //         // Clear all auth state
// //         setUserId(null);
// //         setVendorId(null);
// //         setUserType(null);
// //         setUserEmail(null);
        
// //         // Optionally redirect to login page
// //         window.location.href = '/login'; // or use Next.js router
// //       } else {
// //         console.error('Logout failed:', data.error);
// //       }
// //     } catch (error) {
// //       console.error('Error during logout:', error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider 
// //       value={{
// //         userId,
// //         vendorId,
// //         userType,
// //         userEmail,
// //         login,
// //         logout,
// //         isAuthenticated: !!(userId || vendorId),
// //         isLoading
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }

// 'use client'
// // context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [userId, setUserId] = useState(null);
//   const [vendorId, setVendorId] = useState(null);
//   const [userType, setUserType] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Function to check auth status
//   const checkAuth = async () => {
//     try {
//       const res = await fetch('/api/check-auth', {
//         method: 'GET',
//         credentials: 'include',
//       });
      
//       const data = await res.json();
      
//       if (data.success && data.user) {
//         if (data.user.type === 'user') {
//           setUserId(data.user.id);
//           setVendorId(null);
//         } else if (data.user.type === 'vendor') {
//           setVendorId(data.user.id);
//           setUserId(null);
//         }
//         setUserType(data.user.type);
//         setUserEmail(data.user.email);
//       } else {
//         setUserId(null);
//         setVendorId(null);
//         setUserType(null);
//         setUserEmail(null);
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//       setUserId(null);
//       setVendorId(null);
//       setUserType(null);
//       setUserEmail(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const login = async (formData) => {
//     try {
//       console.log('Login attempt with:', formData);
      
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

//       if (data.success) {
//         if (data.user.type === 'user') {
//           setUserId(data.user.id);
//           setVendorId(null);
//         } else if (data.user.type === 'vendor') {
//           setVendorId(data.user.id);
//           setUserId(null);
//         }
//         setUserType(data.user.type);
//         setUserEmail(data.user.email);

//         return { success: true, type: data.user.type };
//       } 
//       return { success: false, error: data.error };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: 'An unexpected error occurred' };
//     }
//   };

//   const logout = async () => {
//     try {
//       const res = await fetch('/api/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await res.json();
      
//       if (data.success) {
//         // Store the userType before clearing it
//         const currentUserType = userType;
        
//         // Clear all user state
//         setUserId(null);
//         setVendorId(null);
//         setUserType(null);
//         setUserEmail(null);
        
//         // Redirect based on stored user type
//         if (currentUserType === 'vendor') {
//             window.location.href = '/auth/vendor/login';
//         } else if (currentUserType === 'user') {
//             window.location.href = '/auth/user/login';
//         } 
//       } else {
//         console.error('Logout failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   // Create the value object with all context values
//   const value = {
//     userId,
//     vendorId,
//     userType,
//     userEmail,
//     isAuthenticated: !!(userId || vendorId),
//     isLoading,
//     login,    // Make sure login is included here
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


'use client'
// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check auth status
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (data.success && data.user) {
        if (data.user.type === 'user') {
          setUserId(data.user.id);
          setVendorId(null);
          setHasCompletedOnboarding(data.user.hasCompletedOnboarding || false);
        } else if (data.user.type === 'vendor') {
          setVendorId(data.user.id);
          setUserId(null);
        }
        setUserType(data.user.type);
        setUserEmail(data.user.email);
      } else {
        setUserId(null);
        setVendorId(null);
        setUserType(null);
        setUserEmail(null);
        setHasCompletedOnboarding(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUserId(null);
      setVendorId(null);
      setUserType(null);
      setUserEmail(null);
      setHasCompletedOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Legacy login function for custom auth (for vendor login)
  const login = async (formData) => {
    try {
      console.log('Login attempt with:', formData);
      
      const response = await fetch("/api/common-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login API response:', data);

      if (data.success) {
        await checkAuth(); // Re-check auth to update context
        return { success: true, type: data.user.type };
      } 
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Provider sign-in function using NextAuth
  const signInWithProvider = async (provider, options = {}) => {
    try {
      // For Google, add prompt='select_account' to force account selection
      const providerOptions = provider === 'google' 
        ? { ...options, prompt: 'select_account' }
        : options;
        
      const result = await nextAuthSignIn(provider, providerOptions);
      // After NextAuth sign-in, it will set our auth cookie,
      // so we need to refresh our auth context
      await checkAuth();
      return { success: true, result };
    } catch (error) {
      console.error('Provider sign-in error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Store the userType before clearing it
      const currentUserType = userType;
      
      // For NextAuth providers, also call their signOut
      await nextAuthSignOut({ redirect: false });
      
      // Call our custom logout endpoint
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear all user state
      setUserId(null);
      setVendorId(null);
      setUserType(null);
      setUserEmail(null);
      setHasCompletedOnboarding(false);
      
      // Redirect based on stored user type
      if (currentUserType === 'vendor') {
        window.location.href = '/auth/vendor/login';
      } else if (currentUserType === 'user') {
        window.location.href = '/auth/user/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Create the value object with all context values
  const value = {
    userId,
    vendorId,
    userType,
    userEmail,
    hasCompletedOnboarding,
    isAuthenticated: !!(userId || vendorId),
    isLoading,
    login,    // Legacy login for vendor auth
    signInWithProvider, // For provider-based auth
    logout,
    checkAuth // Expose this so components can refresh auth state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}