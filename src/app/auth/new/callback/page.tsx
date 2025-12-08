// app/auth/new/callback/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if user is authenticated
        const res = await fetch('/api/check-auth', {
          credentials: 'include',
        });
        
        const data = await res.json();
        
        if (data.success && data.user) {
          // Get returnUrl
          const returnUrl = 
            searchParams.get('returnUrl') ||
            sessionStorage.getItem('returnUrl') ||
            document.cookie.split('; ').find(row => row.startsWith('returnUrl='))?.split('=')[1];
          
          // Clear storage
          sessionStorage.removeItem('returnUrl');
          document.cookie = 'returnUrl=; path=/; max-age=0';
          
          // Check onboarding status for users
          if (data.user.type === 'user') {
            const hasCompletedOnboarding = data.user.hasCompletedOnboarding || false;
            
            // Redirect to returnUrl or dashboard
            const finalUrl = returnUrl 
              ? decodeURIComponent(returnUrl)
              : (hasCompletedOnboarding ? '/legal-professionals/dashboard' : '/legal-professionals/dashboard');
            
            window.location.href = finalUrl;
          } else if (data.user.type === 'vendor') {
            const finalUrl = returnUrl 
              ? decodeURIComponent(returnUrl)
              : '/tech-vendor/dashboard';
            
            window.location.href = finalUrl;
          }
        } else {
          // Not authenticated, redirect to login
          setStatus('error');
          setTimeout(() => {
            window.location.href = '/auth/user/login';
          }, 2000);
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setTimeout(() => {
          window.location.href = '/auth/user/login';
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'processing' && (
          <>
            <div className="w-16 h-16 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>
              Completing Sign In
            </h1>
            <p className="text-sm" style={{ color: '#334155' }}>
              Just a moment...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold mb-2 text-red-600">
              Something Went Wrong
            </h1>
            <p className="text-sm" style={{ color: '#334155' }}>
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}