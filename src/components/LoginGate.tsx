// components/LoginGate.tsx
'use client';

import { useNewAuth } from '@/context/NewAuthContext';;
import { useState } from 'react';
import AuthModal from './AuthModal';

interface LoginGateProps {
  children: React.ReactNode;
  message?: string;
  blur?: boolean; // If true, shows blurred content behind
}

/**
 * Simple component to wrap any content that requires login
 * 
 * Usage:
 * <LoginGate message="Sign up to view company details">
 *   <CompanyDetails />
 * </LoginGate>
 */
export default function LoginGate({ 
  children, 
  message = "Please sign in to continue",
  blur = true 
}: LoginGateProps) {
  const { isAuthenticated, isLoading } = useNewAuth();
  const [showModal, setShowModal] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    );
  }

  // ✅ If logged in, show content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // ❌ If not logged in, show login prompt
  return (
    <div className="relative">
      {/* Blurred content (optional) */}
      {blur && (
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
      )}
      
      {/* Login overlay */}
      <div className={`${blur ? 'absolute inset-0' : ''} flex items-center justify-center`}>
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto text-center border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1e2556] to-[#7cc6ee] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>
            Sign In Required
          </h3>
          
          <p className="text-sm mb-6" style={{ color: '#334155' }}>
            {message}
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-[#1e2556] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f1729] transition-all duration-200"
          >
            Sign In to Continue
          </button>
          
          <p className="text-xs mt-4" style={{ color: '#64748b' }}>
            Takes less than 30 seconds • No credit card required
          </p>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showModal && (
        <AuthModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}