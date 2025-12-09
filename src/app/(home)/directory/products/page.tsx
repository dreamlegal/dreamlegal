
"use client";
// import DirectoryPage from "../_components/DirectoryPage";
// import React from "react";

// function Page() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
//       <DirectoryPage />
//     </div>
//   );
// }

// export default Page;
// /directory/products/page.js
import DirectoryPage from "../_components/DirectoryPage";
export const dynamic = "force-dynamic";

import { Suspense } from 'react'

// Wrap your DirectoryPage component like this:
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Suspense fallback={<div>Loading...</div>}>
        <DirectoryPage />
      </Suspense>
    </div>
  )
}