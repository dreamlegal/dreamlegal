
'use client'
import React, { Suspense } from 'react'
import { useParams } from 'next/navigation';
import RfpDisplayEdit from '../_components/RfpDisplayEdit';

const RfpDetailPage = () => {
  const params = useParams();
  const rfpId = params.id;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
          <p className="text-[#334155]">Loading RFP...</p>
        </div>
      </div>
    }>
      <RfpDisplayEdit rfpId={rfpId} />
    </Suspense>
  );
};

export default RfpDetailPage;