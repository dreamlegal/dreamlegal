// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { data } from "./data";

// interface CategoryData {
//   slug: string;
//   name: string;
//   description: string;
//   image: string;
// }

// const CategoryPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     setLoading(true);
//     if (pathname) {
//       const category = pathname.split("/category/")[1];
      
//       // Find the category in the new nested data structure
//       let foundCategory: CategoryData | null = null;
      
//       // Loop through each main category
//       for (const mainCategory of data) {
//         // Loop through each key in the main category object
//         for (const key in mainCategory) {
//           const categoryArray = mainCategory[key];
//           // Find matching category by slug
//           const match = categoryArray.find((item: CategoryData) => item.slug === category);
//           if (match) {
//             foundCategory = match;
//             break;
//           }
//         }
//         if (foundCategory) break;
//       }
      
//       if (foundCategory) {
//         setCategoryData(foundCategory);
//       } else {
//         router.replace("/");
//       }
//     }
//     setLoading(false);
//   }, [pathname]);
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <p className="text-lg" style={{ color: '#334155' }}>Loading...</p>
//       </div>
//     );
//   }

//   if (!categoryData) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <p className="text-lg" style={{ color: '#334155' }}>Category not found</p>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white">
//       {/* Add top padding to account for navbar */}
//       <div className="pt-16 md:pt-20 lg:pt-24">
//         <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 font-clarity">
//           {/* Header Section */}
//           <div className="space-y-6 md:space-y-8 lg:space-y-10">
//             {/* Title */}
//             <div className="text-center md:text-left">
//               <h1 
//                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
//                 style={{ color: '#1e2556' }}
//               >
//                 {categoryData.name}
//               </h1>
//             </div>
            
//             {/* Image */}
//             <div className="w-full max-w-4xl mx-auto md:mx-0">
//               <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
//                 <img
//                   src={categoryData.image}
//                   alt={categoryData.name}
//                   className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
//                 />
//               </div>
//             </div>
            
//             {/* Description */}
//             <div className="max-w-4xl mx-auto md:mx-0">
//               <p 
//                 className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify md:text-left"
//                 style={{ color: '#2d2d2d' }}
//               >
//                 {categoryData.description}
//               </p>
//             </div>
//           </div>

//           {/* Additional Section */}
//           <div className="mt-12 md:mt-16 lg:mt-20">
//             {/* Additional content can be added here if needed */}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CategoryPage;
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { data } from "./data";
import ProductsSection from "./ProductsSection"; // Import the new component

interface CategoryData {
  slug: string;
  name: string;
  description: string;
  image: string;
}

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (pathname) {
      const category = pathname.split("/category/")[1];
      
      // Find the category in the new nested data structure
      let foundCategory: CategoryData | null = null;
      
      // Loop through each main category
      for (const mainCategory of data) {
        // Loop through each key in the main category object
        for (const key in mainCategory) {
          const categoryArray = mainCategory[key];
          // Find matching category by slug
          const match = categoryArray.find((item: CategoryData) => item.slug === category);
          if (match) {
            foundCategory = match;
            break;
          }
        }
        if (foundCategory) break;
      }
      
      if (foundCategory) {
        setCategoryData(foundCategory);
      } else {
        router.replace("/");
      }
    }
    setLoading(false);
  }, [pathname]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg" style={{ color: '#334155' }}>Loading...</p>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg" style={{ color: '#334155' }}>Category not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
     
      {/* <div className="pt-16 md:pt-20 lg:pt-24">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 font-clarity">
          
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            
            <div className="text-center md:text-left">
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: '#1e2556' }}
              >
                {categoryData.name}
              </h1>
            </div>
            
           
            <div className="w-full max-w-4xl mx-auto md:mx-0">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={categoryData.image}
                  alt={categoryData.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            
           
            <div className="max-w-4xl mx-auto md:mx-0">
              <p 
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify md:text-left"
                style={{ color: '#2d2d2d' }}
              >
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="pt-16 md:pt-20 lg:pt-24 bg-[#1e2556] text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-[#1e2556]" />
  <div className="absolute inset-0 opacity-30 bg-[#7cc6ee]/10" />
  <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 font-clarity relative z-10">
    {/* Header Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
      {/* Content - Left Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title */}
        <div>
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
          >
            {categoryData.name}
          </h1>
        </div>
        
        {/* Description */}
        <div>
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90"
          >
            {categoryData.description}
          </p>
        </div>
      </div>
      
      {/* Image - Right Side */}
      <div className="lg:col-span-1">
        <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <img
              src={categoryData.image}
              alt={categoryData.name}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Products Section */}
      <ProductsSection 
        categorySlug={categoryData.slug} 
        categoryName={categoryData.name}
      />
    </main>
  );
};

export default CategoryPage;