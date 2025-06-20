// "use client";
// import EditProductAdmin from "@/components/EditProductAdmin";
// import ProductDetailsAdmin from "@/components/ProductDetailsAdmin";
// import ReviewDetailsAdmin from "@/components/ReviewDetailsAdmin";
// import Link from "next/link";
// import React, { useState } from "react";

// function Page( {params}: { params: { id: string } } ) {
//   const [active, setActive] = useState("ProductDetails");

//   const renderContent = () => {
//     switch (active) {
//       case "ProductDetails":
//         return <ProductDetailsAdmin id={params.id} />;
//       case "Reviews":
//         return <ReviewDetailsAdmin  id={params.id} />;
//       case "Edit":
//           return <EditProductAdmin  editing={true} id={params.id}/>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full font-clarity">
//       <div className="w-full px-6 py-4 border-b rounded-md">
//         <span className="text-primary1">
//             <Link href={"/web-admin/"}>
//             Back to Dashboard</Link>
//         </span>
//       </div>
//       <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//         <div className="w-full grid grid-cols-1 md:grid-cols-5">
//           <div className="w-full col-span-1 border rounded-md shadow-sm h-fit sticky top-4">
//             <ul className="list-none p-0">
//               <li
//                 className={`p-2 cursor-pointer ${
//                   active === "ProductDetails" ? "bg-primary1 text-white rounded-md" : ""
//                 }`}
//                 onClick={() => setActive("ProductDetails")}
//               >
//                 Product Details
//               </li>
//               <li
//                 className={`p-2 cursor-pointer ${
//                   active === "Reviews" ? "bg-primary1 text-white rounded-md" : ""
//                 }`}
//                 onClick={() => setActive("Reviews")}
//               >
//                 Reviews
//               </li>
//               <li
//                 className={`p-2 cursor-pointer ${
//                   active === "Edit" ? "bg-primary1 text-white rounded-md" : ""
//                 }`}
//                 onClick={() => setActive("Edit")}
//               >
//                 Edit
//               </li>
//             </ul>
//           </div>
//           <div className="w-full col-span-4 pl-4">{renderContent()}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
'use client';

import { useEffect } from 'react';
import { useAdmin } from '../../../_components/AdminContext';
import { useRouter } from 'next/navigation';
import EditProductAdmin from '../../../_components/EditProductAdmin';
// import AllProductAdmin from "@/components/AllProductAdmin";
// import AllProductAdmin from '../_components/AllProductAdmin';
export default function ProductsPage() {
  const { hasPermission, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user doesn't have permission
    if (!isLoading && !hasPermission('EditProduct')) {
      router.push('/admin');
    }
  }, [hasPermission, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <EditProductAdmin />;
}