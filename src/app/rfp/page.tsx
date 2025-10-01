// // // app/rfp/page.jsx - Main RFP Form Page
// // 'use client'
// // import React, { Suspense } from 'react'
// // import { useAuth } from '@/context/authContext';
// // import { useRouter } from 'next/navigation';
// // import RfpFormFlow from './_components/RfpFormFlow';

// // const RfpPage = () => {
// //   const { userId, userType } = useAuth();
// //   const router = useRouter();

// //   const handleRfpGenerated = (rfpId) => {
// //     // Redirect to the shareable RFP URL
// //     router.push(`/rfp/${rfpId}`);
// //   };

// //   console.log(userId, userType);

// //   if (!userId) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-[#1e2556] mb-2">Please Sign In</h2>
// //           <p className="text-[#334155] mb-4">You need to be signed in to create an RFP.</p>
// //           <p className="text-[#334155]">
// //             <a href="/auth/user/login" className="text-[#7cc6ee] hover:underline">Click here to log in</a>
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Suspense fallback={
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
// //           <p className="text-[#334155]">Loading...</p>
// //         </div>
// //       </div>
// //     }>
// //       <RfpFormFlow 
// //         userId={userId} 
// //         onRfpGenerated={handleRfpGenerated}
// //       />
// //     </Suspense>
// //   );
// // };

// // export default RfpPage;


// // app/rfp/page.jsx - Main RFP Form Page
// 'use client'
// import React, { Suspense } from 'react'
// import { useAuth } from '@/context/authContext';
// import { useRouter } from 'next/navigation';
// import RfpFormFlow from './_components/RfpFormFlow';

// const RfpPage = () => {
//   const { userId, userType } = useAuth();
//   const router = useRouter();

//   const handleRfpGenerated = (rfpId) => {
//     // Redirect to the shareable RFP URL
//     router.push(`/rfp/${rfpId}`);
//   };

//   console.log(userId, userType);

//   // if (!userId) {
//   //   return (
//   //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//   //       <div className="text-center">
//   //         <h2 className="text-2xl font-bold text-[#1e2556] mb-2">Please Sign In</h2>
//   //         <p className="text-[#334155] mb-4">You need to be signed in to create an RFP.</p>
//   //         <p className="text-[#334155]">
//   //           <a href="/auth/user/login" className="text-[#7cc6ee] hover:underline">Click here to log in</a>
//   //         </p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
//           <p className="text-[#334155]">Loading...</p>
//         </div>
//       </div>
//     }>
//       <RfpFormFlow 
//         userId={userId} 
//         onRfpGenerated={handleRfpGenerated}
//       />
//     </Suspense>
//   );
// };

// export default RfpPage;
// app/rfp/page.jsx - Main RFP Form Page
'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import RfpFormFlow from './_components/RfpFormFlow';

const RfpPageContent = ({ userId, userType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const handleRfpGenerated = (rfpId) => {
    // Redirect to the shareable RFP URL
    router.push(`/rfp/${rfpId}`);
  };

  console.log(userId, userType);
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
  // You can get userId from your auth context here
  // const { userId, userType } = useAuth();
  
  // For demo purposes, using placeholder values
  const userId = 'demo-user-123';
  const userType = 'user';

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
          <p className="text-[#334155]">Loading...</p>
        </div>
      </div>
    }>
      <RfpPageContent userId={userId} userType={userType} />
    </Suspense>
  );
};

export default RfpPage;