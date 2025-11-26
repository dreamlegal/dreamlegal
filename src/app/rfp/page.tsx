
'use client'
import React, { Suspense } from 'react'
import { useAuth } from '@/context/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import RfpFormFlow from './_components/RfpFormFlow';

const RfpPageContent = () => {
  const { userId, userType } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const handleRfpGenerated = (rfpId) => {
    // Redirect to the shareable RFP URL
    router.push(`/rfp/${rfpId}`);
  };

  console.log('User ID:', userId);
  console.log('User Type:', userType);
  console.log('Category from URL:', categoryFromUrl);

  

  return (
    <RfpFormFlow 
      userId={userId} 
      onRfpGenerated={handleRfpGenerated}
      preSelectedCategory={categoryFromUrl}
    />
  );
};

const RfpPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
          <p className="text-[#334155]">Loading...</p>
        </div>
      </div>
    }>
      <RfpPageContent />
    </Suspense>
  );
};

export default RfpPage;