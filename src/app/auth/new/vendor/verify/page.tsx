// app/auth/new/vendor/verify/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';

function VendorVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      const returnUrl = searchParams.get('returnUrl');

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        // Same verify endpoint works for both user and vendor
        const res = await fetch(`/api/auth/new/user/verify-token?token=${token}`);
        const data = await res.json();

        if (data.success) {
          setStatus('success');
          setMessage('Email verified! Redirecting to dashboard...');
          
          setTimeout(() => {
            const finalReturnUrl = 
              returnUrl || 
              sessionStorage.getItem('returnUrl') ||
              document.cookie.split('; ').find(row => row.startsWith('returnUrl='))?.split('=')[1] ||
              '/tech-vendor/dashboard';
            
            sessionStorage.removeItem('returnUrl');
            document.cookie = 'returnUrl=; path=/; max-age=0';
            
            window.location.href = decodeURIComponent(finalReturnUrl);
          }, 1500);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>
              Verifying Your Email
            </h1>
            <p className="text-sm" style={{ color: '#334155' }}>
              Setting up your vendor account...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold mb-2 text-green-600">
              Welcome to DreamLegal!
            </h1>
            <p className="text-sm" style={{ color: '#334155' }}>
              {message}
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
              Verification Failed
            </h1>
            <p className="text-sm mb-4" style={{ color: '#334155' }}>
              {message}
            </p>
            <button
              onClick={() => router.push('/auth/vendor/login')}
              className="px-6 py-2 bg-[#1e2556] text-white rounded-lg font-semibold hover:bg-[#0f1729] transition-all"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VendorVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    }>
      <VendorVerifyContent />
    </Suspense>
  );
}