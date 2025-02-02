

// import React from 'react'

// function page() {
//   return (
//     <div>
//       Rahul Santra
//     </div>
//   )
// }

// export default page


'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleWorkflowClick = () => {
    router.push('/workflow');
  };

  const handleProposalClick = () => {
    router.push('/custom_proposal');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center p-12 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 max-w-lg w-full mx-4 transform hover:scale-105 transition-all duration-300">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Try Out Our Features
        </h1>
        
        <div className="space-y-6">
          <button
            onClick={handleWorkflowClick}
            className="group w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Workflow Analysis</span>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
          </button>
          
          <button
            onClick={handleProposalClick}
            className="group w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Custom Proposal</span>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Explore our powerful tools designed for your success
        </div>
      </div>
    </div>
  );
};

export default Page;