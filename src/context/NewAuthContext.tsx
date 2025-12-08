// context/NewAuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signOut as nextAuthSignOut } from 'next-auth/react';

interface AuthContextType {
  userId: string | null;
  vendorId: string | null;
  userType: 'user' | 'vendor' | null;
  userEmail: string | null;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  showAuthModal: (options?: { message?: string; returnUrl?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function NewAuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'user' | 'vendor' | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
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
          setHasCompletedOnboarding(true); // Vendors don't have onboarding
        }
        setUserType(data.user.type);
        setUserEmail(data.user.email);
      } else {
        // Not authenticated
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

  // Logout function
  const logout = async () => {
    try {
      const currentUserType = userType;
      
      // Call NextAuth signOut
      await nextAuthSignOut({ redirect: false });
      
      // Call our custom logout endpoint
      await fetch('/api/auth/new/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear all state
      setUserId(null);
      setVendorId(null);
      setUserType(null);
      setUserEmail(null);
      setHasCompletedOnboarding(false);
      
      // Redirect based on user type
      if (currentUserType === 'vendor') {
        window.location.href = '/auth/vendor/login';
      } else {
        window.location.href = '/auth/user/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Show auth modal (you can emit custom event or use state management)
  const showAuthModal = (options?: { message?: string; returnUrl?: string }) => {
    // Emit custom event that AuthModal can listen to
    const event = new CustomEvent('showAuthModal', { detail: options });
    window.dispatchEvent(event);
  };

  const value = {
    userId,
    vendorId,
    userType,
    userEmail,
    hasCompletedOnboarding,
    isAuthenticated: !!(userId || vendorId),
    isLoading,
    logout,
    checkAuth,
    showAuthModal,
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
    throw new Error('useNewAuth must be used within NewAuthProvider');
  }
  return context;
}