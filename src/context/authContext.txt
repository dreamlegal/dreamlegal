


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

export function useNewAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useNewAuth must be used within an AuthProvider');
  }
  return context;
}