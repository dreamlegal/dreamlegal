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

  // Uncomment if you want to require authentication
  // if (!userId) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-[#1e2556] mb-2">Please Sign In</h2>
  //         <p className="text-[#334155] mb-4">You need to be signed in to create an RFP.</p>
  //         <a 
  //           href="/auth/user/login" 
  //           className="inline-block px-6 py-3 bg-[#7cc6ee] text-white rounded-lg hover:bg-[#5eb6e0] transition-colors"
  //         >
  //           Sign In
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

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