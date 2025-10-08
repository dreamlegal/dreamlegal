
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { data } from "./data";
import ProductsSection from "./ProductsSection"; // Import the new component
import FinalSection from "./FinalSection";

interface CategoryData {
  slug: string;
  name: string;
  description: string;
  image: string;
  functionalities: string[];
  lifecycle: string[];
}

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Mapping from slug to category constants for FinalSection (same as ProductsSection)
  const categorySlugToEnum = {
    'contract-lifecycle-management': 'CONTRACT_LIFECYCLE_MANAGEMENT',
    'legal-ai': 'LEGAL_AI',
    'document-management-system': 'DOCUMENT_MANAGEMENT_SYSTEM',
    'litigation-management-and-analytics': 'LITIGATION_MANAGEMENT_AND_ANALYTICS',
    'intellectual-property-management': 'IP_MANAGEMENT',
    'legal-research': 'LEGAL_RESEARCH',
    'e-discovery': 'E_DISCOVERY',
    'case-management': 'CASE_MANAGEMENT',
'governance-risk-compliance': 'GOVERNANCE_RISK_COMPLIANCE',
'legal-due-diligence': 'LEGAL_DUE_DILIGENCE'
  };

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

  const truncateDescription = (text: string, lines: number = 2) => {
    const words = text.split(' ');
    const wordsPerLine = 15; // Approximate words per line
    const maxWords = lines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7cc6ee]"></div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-[#334155]">Category not found</p>
      </div>
    );
  }

  // Get the category constant for FinalSection
  const categoryConstant = categorySlugToEnum[categoryData.slug] || 'LEGAL_RESEARCH'; // fallback

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <div className="pt-16 md:pt-20 lg:pt-24 bg-[#1e2556] text-white relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-[#1e2556]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#7cc6ee]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7cc6ee]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="px-4 py-6 pb-10 mx-auto max-w-7xl sm:px-6 lg:px-8 font-clarity relative z-10">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center mb-8">
            {/* Content - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
                  {categoryData.name}
                </h1>
              </div>
              
              {/* Description with Read More */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-light">
                  {showFullDescription 
                    ? categoryData.description 
                    : truncateDescription(categoryData.description)
                  }
                </p>
                {categoryData.description.split(' ').length > 30 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="inline-flex items-center space-x-2 text-[#7cc6ee] hover:text-white transition-all duration-300 font-medium text-sm group"
                  >
                    <span className="border-b border-[#7cc6ee] group-hover:border-white transition-colors duration-300">
                      {showFullDescription ? 'Read Less' : 'Read More'}
                    </span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${showFullDescription ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Image - Right Side */}
            <div className="lg:col-span-1">
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="relative w-full group" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 bg-[#7cc6ee]/20 rounded-xl blur transform scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={categoryData.image}
                    alt={categoryData.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Functionalities Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-[#7cc6ee] rounded-full"></div>
              <h3 className="text-lg font-bold text-white tracking-wide">Core Functionalities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {categoryData.functionalities.map((functionality, index) => (
                <div
                  key={index}
                  className="group bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-white/20 hover:border-[#7cc6ee]/50 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Premium Hover Effect */}
                  <div className="absolute inset-0 bg-[#7cc6ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  
                  <div className="flex items-start space-x-2 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 bg-[#7cc6ee] rounded-md flex items-center justify-center shadow-md group-hover:shadow-[#7cc6ee]/50 transition-shadow duration-300">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#2d2d2d] text-xs leading-snug group-hover:text-[#1e2556] transition-colors duration-300">
                        {functionality}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1 h-6 bg-[#7cc6ee] rounded-full"></div>
              <h3 className="text-lg font-bold text-white tracking-wide">Process Lifecycle</h3>
            </div>
            
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/20"></div>
                <div className="absolute top-4 left-0 h-0.5 bg-[#7cc6ee] transition-all duration-2000 ease-out" style={{ width: '100%' }}></div>
                
                <div className="flex items-center justify-between relative z-10">
                  {categoryData.lifecycle.map((stage, index) => (
                    <div 
                      key={index} 
                      className="flex-1 relative group"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex flex-col items-center">
                        {/* Premium Circle */}
                        <div className="relative">
                          <div className="w-8 h-8 bg-[#7cc6ee] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg group-hover:shadow-[#7cc6ee]/50 transition-all duration-300 group-hover:scale-110 border-2 border-white/20">
                            {index + 1}
                          </div>
                          {/* Pulse Effect */}
                          <div className="absolute inset-0 w-8 h-8 bg-[#7cc6ee] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                        </div>
                        
                        {/* Stage Name */}
                        <div className="mt-3 text-center">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 px-3 shadow-lg border border-white/20 group-hover:border-[#7cc6ee]/50 transition-all duration-300 group-hover:-translate-y-1">
                            <h4 className="font-semibold text-[#2d2d2d] text-xs whitespace-nowrap group-hover:text-[#1e2556] transition-colors duration-300">
                              {stage}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Timeline */}
            <div className="lg:hidden">
              <div className="space-y-3 relative">
                {/* Vertical Line */}
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-white/20"></div>
                <div className="absolute left-2.5 top-0 w-0.5 bg-[#7cc6ee] transition-all duration-2000 ease-out" style={{ height: '100%' }}></div>
                
                {categoryData.lifecycle.map((stage, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 relative z-10"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Premium Circle */}
                    <div className="relative">
                      <div className="w-6 h-6 bg-[#7cc6ee] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md border-2 border-white/20">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Stage Name */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 px-3 shadow-lg flex-1 border border-white/20 hover:border-[#7cc6ee]/50 transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-[#2d2d2d] text-xs">{stage}</h4>
                    </div>
                  </div>
                ))}
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
      
      {/* Final Section with Category */}
      <FinalSection category={categoryConstant} />
    </main>
  );
};

export default CategoryPage;