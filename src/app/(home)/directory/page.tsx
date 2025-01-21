// import DirectoryPage from "@/pages/DirectoryPage";
// import React from "react";

// function page() {
//   return <DirectoryPage />;
// }

// export default page;

"use client";
import DirectoryPage from "./_components/DirectoryPage";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <DirectoryPage />
    </div>
  );
}

export default Page;