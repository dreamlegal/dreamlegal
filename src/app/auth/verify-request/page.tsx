'use client'
import React from 'react';
import Link from 'next/link';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            A sign in link has been sent to your email address.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Please check your email (including spam folder) and click on the link to complete the sign-in process.
          </p>
          <div className="mt-8">
            <Link 
              href="/auth/user/login"
              className="text-indigo-600 hover:text-indigo-900 font-medium"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}