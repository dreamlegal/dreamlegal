// 'use client'
// // context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [userId, setUserId] = useState(null);
//   const [vendorId, setVendorId] = useState(null);
  
//   const [userType, setUserType] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Add loading state

//   // Function to check auth status
//   const checkAuth = async () => {
//     try {
//       const res = await fetch('/api/check-auth', {
//         method: 'GET',
//         credentials: 'include', // Important for cookies
//       });
      
//       const data = await res.json();
      
//       if (data.success && data.user) {
//         // Update state based on user type
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
//         // Clear state if no valid auth
//         setUserId(null);
//         setVendorId(null);
//         setUserType(null);
//         setUserEmail(null);
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//       // Clear state on error
//       setUserId(null);
//       setVendorId(null);
//       setUserType(null);
//       setUserEmail(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Check auth status when component mounts
//   useEffect(() => {
//     checkAuth();
//   }, []);



  
// // const login = async (formData) => {
// //   try {
// //     const response = await fetch("/api/user-login", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       credentials: 'include',
// //       body: JSON.stringify(formData),
// //     });

// //     const data = await response.json();

// //     if (data.success) {
// //       // Update context state
// //       if (data.user.type === 'user') {
// //         setUserId(data.user.id);
// //         setVendorId(null);
// //       } else if (data.user.type === 'vendor') {
// //         setVendorId(data.user.id);
// //         setUserId(null);
// //       }
// //       setUserType(data.user.type);
// //       setUserEmail(data.user.email);

// //       return { success: true, type: data.user.type };
// //     } else {
// //       return { success: false, error: data.error };
// //     }
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return { success: false, error: 'An unexpected error occurred' };
// //   }
// // };


// const logout = async () => {
//     try {
//       const res = await fetch('/api/logout', {
//         method: 'POST',
//         credentials: 'include', // Important for cookie handling
//       });
  
//       const data = await res.json();
      
//       if (data.success) {
//         // Clear all auth state
//         setUserId(null);
//         setVendorId(null);
//         setUserType(null);
//         setUserEmail(null);
        
//         // Optionally redirect to login page
//         window.location.href = '/login'; // or use Next.js router
//       } else {
//         console.error('Logout failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider 
//       value={{
//         userId,
//         vendorId,
//         userType,
//         userEmail,
//         login,
//         logout,
//         isAuthenticated: !!(userId || vendorId),
//         isLoading
//       }}
//     >
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

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
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
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUserId(null);
      setVendorId(null);
      setUserType(null);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
        if (data.user.type === 'user') {
          setUserId(data.user.id);
          setVendorId(null);
        } else if (data.user.type === 'vendor') {
          setVendorId(data.user.id);
          setUserId(null);
        }
        setUserType(data.user.type);
        setUserEmail(data.user.email);

        return { success: true, type: data.user.type };
      } 
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      
      if (data.success) {
        // Store the userType before clearing it
        const currentUserType = userType;
        
        // Clear all user state
        setUserId(null);
        setVendorId(null);
        setUserType(null);
        setUserEmail(null);
        
        // Redirect based on stored user type
        if (currentUserType === 'vendor') {
            window.location.href = '/auth/vendor/login';
        } else if (currentUserType === 'user') {
            window.location.href = '/auth/user/login';
        } 
      } else {
        console.error('Logout failed:', data.error);
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
    isAuthenticated: !!(userId || vendorId),
    isLoading,
    login,    // Make sure login is included here
    logout
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