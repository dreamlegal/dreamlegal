
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';

// interface Software {
//   id: string;
//   slug: string;
//   logoUrl: string;
//   productName: string;
//   category: string;
//   description: string;
//   briefDescription: string;
//   companyName: string;
//   headquarters: string;
//   founded: string;
//   founders?: string;
//   website: string;
//   email?: string;
//   phone?: string;
//   startingPrice: string;
//   pricingModel: string;
//   freeTrial: string;
//   customPricing?: string;
//   pricingTier: string;
//   coreFunctionalities: string[];
//   keyFeatures: any[];
//   bestKnownFor: string[];
//   criticalOpinions: string[];
//   topUseCases: string[];
//   userSatisfaction: string;
//   targetUsers: string;
//   deploymentOptions: string;
//   technologyStack: string;
// }

// interface Comparison {
//   id: string;
//   slug: string;
//   description: string;
//   qna: any;
// }

// interface ComparisonData {
//   comparison: Comparison;
//   software: Software[];
// }

// export default function ComparisonPage() {
//   const params = useParams();
//   const slug = params.slug as string;
  
//   const [data, setData] = useState<ComparisonData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeSection, setActiveSection] = useState('overview');

//   // Navigation sections
//   const sections = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'features', label: 'Features' },
//     { id: 'pricing', label: 'Pricing' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'sources', label: 'Sources' }
//   ];

//   useEffect(() => {
//     if (slug) {
//       fetchComparisonData();
//     }
//   }, [slug]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 200;
      
//       for (const section of sections) {
//         const element = document.getElementById(section.id);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const offsetBottom = offsetTop + element.offsetHeight;
          
//           if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
//             setActiveSection(section.id);
//             // Update URL hash
//             if (window.history.replaceState) {
//               window.history.replaceState(null, null, `#${section.id}`);
//             }
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle initial hash in URL
//   useEffect(() => {
//     const hash = window.location.hash.slice(1);
//     if (hash && sections.find(s => s.id === hash)) {
//       setActiveSection(hash);
//       setTimeout(() => scrollToSection(hash), 100);
//     }
//   }, [data]);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offset = 200; // Account for existing navbar + sticky navbar height
//       const elementPosition = element.offsetTop - offset;
//       window.scrollTo({
//         top: elementPosition,
//         behavior: 'smooth'
//       });
      
//       // Update the URL hash
//       if (window.history.pushState) {
//         window.history.pushState(null, null, `#${sectionId}`);
//       }
//     }
//   };

//   const fetchComparisonData = async () => {
//     try {
//       const response = await fetch(`/api/comparisons/${slug}`);
//       const result = await response.json();

//       if (result.success) {
//         setData(result);
//       } else {
//         setError(result.error || 'Failed to load comparison');
//       }
//     } catch (err) {
//       setError('Failed to load comparison data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (price: string) => {
//     if (!price) return 'Contact for pricing';
//     if (price.includes('$')) return price;
//     return `$${price}`;
//   };

//   const getPricingTierDisplay = (tier: string) => {
//     const tierMap = {
//       'BUDGET': { symbol: '$', label: 'Budget' },
//       'MID_RANGE': { symbol: '$$', label: 'Mid-Range' },
//       'PREMIUM': { symbol: '$$$', label: 'Premium' },
//       'ENTERPRISE': { symbol: '$$$+', label: 'Enterprise' }
//     };
//     return tierMap[tier as keyof typeof tierMap] || { symbol: '', label: tier };
//   };

//   const formatCategoryName = (category: string) => {
//     return category.replace(/_/g, ' ').toLowerCase()
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-16" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#7cc6ee' }}></div>
//           <p className="font-medium" style={{ color: '#334155' }}>Loading comparison...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-16" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>Comparison Not Found</h1>
//           <p className="mb-6" style={{ color: '#334155' }}>{error || 'The comparison you\'re looking for doesn\'t exist.'}</p>
//           <Link
//             href="/compare"
//             className="px-6 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Create New Comparison
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const { comparison, software } = data;
//   const productNames = software.map(s => s.productName).join(' vs ');

//   return (
//     <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
//       {/* Header */}
//       <div className="text-white py-8" style={{ backgroundColor: '#1e2556' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="text-sm mb-4">
//             <Link href="/" className="hover:text-white" style={{ color: '#7cc6ee' }}>Business Software</Link>
//             <span className="mx-2">/</span>
//             <Link href="/compare" className="hover:text-white" style={{ color: '#7cc6ee' }}>Compare Software</Link>
//             <span className="mx-2">/</span>
//             <span>Product Comparison</span>
//           </nav>
          
//           <h1 className="text-3xl font-bold text-white mb-2">
//             {productNames} - Detailed Comparison
//           </h1>
//           {comparison.description && (
//             <p className="max-w-4xl opacity-90">{comparison.description}</p>
//           )}
//         </div>
//       </div>

//       {/* Sticky Navigation */}
//       <div className="sticky bg-white shadow-md z-50 border-b border-gray-200" style={{ top: '64px' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-4">
//             <div className="flex space-x-1 overflow-x-auto">
//               {sections.map((section) => (
//                 <button
//                   key={section.id}
//                   onClick={() => scrollToSection(section.id)}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap ${
//                     activeSection === section.id
//                       ? 'text-white shadow-sm'
//                       : 'hover:bg-gray-50'
//                   }`}
//                   style={{
//                     backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent',
//                     color: activeSection === section.id ? 'white' : '#334155'
//                   }}
//                 >
//                   {section.label}
//                 </button>
//               ))}
//             </div>
            
//             <Link
//               href="/compare"
//               className="ml-4 inline-flex items-center px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90 whitespace-nowrap"
//               style={{ backgroundColor: '#1e2556' }}
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Add Product
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Mobile Scroll Hint */}
//         <div className="lg:hidden mb-6 text-center">
//           <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
//             <svg className="w-4 h-4" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
//             </svg>
//             <span className="text-sm" style={{ color: '#334155' }}>Scroll horizontally to see all details</span>
//             <svg className="w-4 h-4" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </div>
//         </div>

//         {/* Comparison Description & QNA Section */}
      

//         {/* Overview Section */}
//         <section id="overview" className="scroll-mt-44 mb-12">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//             Overview - {productNames}
//           </h2>

//           {/* Product Headers */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 bg-gray-50 z-10">
//                 <div className="h-20 flex items-center">
//                   <h3 className="text-lg font-bold" style={{ color: '#1e2556' }}>Products</h3>
//                 </div>
//               </div>
//               {software.map((soft, index) => (
//                 <div key={soft.id} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="text-center">
//                     <div className="w-16 h-16 mx-auto mb-4 relative rounded-lg overflow-hidden shadow-sm">
//                       <img
//                         src={soft.logoUrl}
//                         alt={soft.productName}
//                         className="w-full h-full object-contain p-1"
//                       />
//                     </div>
//                     <h3 className="text-lg font-bold mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h3>
//                     <Link
//                       href={`/product/${soft.slug}`}
//                       className="text-sm font-medium hover:underline"
//                       style={{ color: '#7cc6ee' }}
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Description</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`desc-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   {/* <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d2d2d' }}>
//                     {soft.briefDescription || soft.description}
//                   </p> */}
//                   {soft.briefDescription && soft.briefDescription !== soft.description && (
//                     <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>
//                       {soft.description}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Category Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Category</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`cat-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#7cc6ee' }}>
//                     {formatCategoryName(soft.category)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Pricing Tier Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Pricing Tier</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`tier-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
//                       {getPricingTierDisplay(soft.pricingTier).symbol}
//                     </span>
//                     <span className="text-sm font-medium" style={{ color: '#1e2556' }}>
//                       {getPricingTierDisplay(soft.pricingTier).label}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Company Information Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Company Information</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`company-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-2 text-xs">
//                     <div>
//                       <span className="font-medium" style={{ color: '#334155' }}>Company: </span>
//                       <span style={{ color: '#2d2d2d' }}>{soft.companyName}</span>
//                     </div>
//                     <div>
//                       <span className="font-medium" style={{ color: '#334155' }}>HQ: </span>
//                       <span style={{ color: '#2d2d2d' }}>{soft.headquarters}</span>
//                     </div>
//                     <div>
//                       <span className="font-medium" style={{ color: '#334155' }}>Founded: </span>
//                       <span style={{ color: '#2d2d2d' }}>{soft.founded}</span>
//                     </div>
//                     {soft.founders && (
//                       <div>
//                         <span className="font-medium" style={{ color: '#334155' }}>Founders: </span>
//                         <span style={{ color: '#2d2d2d' }}>{soft.founders}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Target Users Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Target Users</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`target-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {soft.targetUsers}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="scroll-mt-44 mb-12">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//             Features - {productNames}
//           </h2>

//           {/* Core Functionalities Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Core Functionalities</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`core-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-2">
//                     {soft.coreFunctionalities.slice(0, 8).map((func, index) => (
//                       <span
//                         key={index}
//                         className="inline-block px-2 py-1 rounded-md text-xs font-medium text-white mr-2 mb-2"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         {func}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Key Features Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Key Features</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`features-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-4">
//                     {soft.keyFeatures.slice(0, 6).map((feature, index) => (
//                       <div key={index} className="border border-gray-200 rounded-lg p-3">
//                         <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e2556' }}>
//                           {feature.heading}
//                         </h4>
//                         <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
//                           {feature.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Deployment Options Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Deployment Options</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`deploy-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {soft.deploymentOptions}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Technology Stack Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Technology Stack</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`tech-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {soft.technologyStack}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Pricing Section */}
//         <section id="pricing" className="scroll-mt-44 mb-12">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//             Pricing - {productNames}
//           </h2>

//           {/* Pricing Details Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Pricing Details</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`pricing-details-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-3">
//                     <div>
//                       <div className="text-sm font-medium" style={{ color: '#334155' }}>Starting:</div>
//                       <div className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
//                         {formatCurrency(soft.startingPrice)}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-sm font-medium" style={{ color: '#334155' }}>Model:</div>
//                       <div className="text-sm" style={{ color: '#2d2d2d' }}>
//                         {soft.pricingModel || 'Per user / per document quota'}
//                       </div>
//                     </div>
//                     {soft.freeTrial && (
//                       <div>
//                         <div className="text-sm font-medium" style={{ color: '#334155' }}>Free Trial:</div>
//                         <div className="text-sm font-medium" style={{ color: '#7cc6ee' }}>
//                           {soft.freeTrial}
//                         </div>
//                       </div>
//                     )}
//                     {soft.customPricing && (
//                       <div>
//                         <div className="text-sm font-medium" style={{ color: '#334155' }}>Custom:</div>
//                         <div className="text-sm" style={{ color: '#2d2d2d' }}>
//                           {soft.customPricing}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Reviews Section */}
//         <section id="reviews" className="scroll-mt-44 mb-12">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//             Reviews - {productNames}
//           </h2>

//           {/* Best Known For Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Best Known For</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`best-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-2">
//                     {soft.bestKnownFor.slice(0, 5).map((item, index) => (
//                       <div key={index} className="p-2 rounded-md text-xs" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Top Use Cases Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Top Use Cases</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`use-cases-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-2">
//                     {soft.topUseCases.slice(0, 5).map((useCase, index) => (
//                       <div key={index} className="p-2 rounded-md text-xs" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
//                         {useCase}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* User Satisfaction Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>User Satisfaction</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`satisfaction-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0fdf4', borderColor: '#7cc6ee' }}>
//                     <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                       {soft.userSatisfaction}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Sources Section */}
//         <section id="sources" className="scroll-mt-44 mb-12">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//             Sources - {productNames}
//           </h2>

//           {/* Contact Information Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Contact Information</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`contact-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-3">
//                     {soft.website && (
//                       <div>
//                         <Link
//                           href={soft.website}
//                           target="_blank"
//                           className="text-sm font-medium hover:underline"
//                           style={{ color: '#7cc6ee' }}
//                         >
//                           Website
//                         </Link>
//                       </div>
//                     )}
//                     <div>
//                       <span className="text-sm" style={{ color: '#334155' }}>
//                         Email: {soft.email || '[Not Available]'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-sm" style={{ color: '#334155' }}>
//                         Phone: {soft.phone || '[Not Available]'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
//             <div className="flex min-w-max">
//               <div className="w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
//                 <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Actions</h3>
//               </div>
//               {software.map((soft) => (
//                 <div key={`actions-${soft.id}`} className="w-80 p-6 border-r border-gray-200 last:border-r-0">
//                   <div className="space-y-3">
//                     <Link
//                       href={`/product/${soft.slug}`}
//                       className="block w-full px-4 py-2 rounded-lg text-center font-medium text-white transition-colors hover:opacity-90"
//                       style={{ backgroundColor: '#1e2556' }}
//                     >
//                       View Details
//                     </Link>
//                     <button
//                       className="w-full px-4 py-2 rounded-lg border font-medium transition-colors hover:opacity-90"
//                       style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
//                     >
//                       Get Demo
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Comparison Analysis Section */}
//         {(comparison.description || (comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0)) && (
//           <section className="mb-12">
//             {/* <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//               Detailed Analysis - {productNames}
//             </h2> */}
            
//             {/* Description Section */}
//             {/* {comparison.description && (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//                 <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>
//                   Comparison Overview
//                 </h3>
//                 <div className="prose max-w-none">
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {comparison.description}
//                   </p>
//                 </div>
//               </div>
//             )} */}
            
//             {(comparison.description || comparison.qna) && (
//           <section className="mb-12">
//             <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>
//               About This Comparison
//             </h2>
            
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               {comparison.description && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Description</h3>
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {comparison.description}
//                   </p>
//                 </div>
//               )}
              
              
//             </div>
//           </section>
//         )}
//             {/* Q&A Section */}
//             {comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0 && (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <h3 className="text-lg font-bold mb-6" style={{ color: '#1e2556' }}>
//                   Frequently Asked Questions
//                 </h3>
//                 <div className="space-y-6">
//                   {comparison.qna.map((item: any, index: number) => (
//                     <div key={index} className="border-l-4 pl-6" style={{ borderColor: '#7cc6ee' }}>
//                       <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>
//                         Q{index + 1}: {item.question}
//                       </h4>
//                       <div className="rounded-lg p-4" style={{ backgroundColor: '#f5f7fa' }}>
//                         <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                           {item.answer}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Software {
  id: string;
  slug: string;
  logoUrl: string;
  productName: string;
  category: string;
  description: string;
  briefDescription: string;
  companyName: string;
  headquarters: string;
  founded: string;
  founders?: string;
  website: string;
  email?: string;
  phone?: string;
  startingPrice: string;
  pricingModel: string;
  freeTrial: string;
  customPricing?: string;
  pricingTier: string;
  coreFunctionalities: string[];
  keyFeatures: any[];
  bestKnownFor: string[];
  criticalOpinions: string[];
  topUseCases: string[];
  userSatisfaction: string;
  targetUsers: string;
  deploymentOptions: string;
  technologyStack: string;
}

interface Comparison {
  id: string;
  slug: string;
  description: string;
  qna: any;
}

interface ComparisonData {
  comparison: Comparison;
  software: Software[];
}

export default function ComparisonPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation sections
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'sources', label: 'Sources' }
  ];

  useEffect(() => {
    if (slug) {
      fetchComparisonData();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            // Update URL hash
            if (window.history.replaceState) {
              window.history.replaceState(null, null, `#${section.id}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial hash in URL
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sections.find(s => s.id === hash)) {
      setActiveSection(hash);
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [data]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = window.innerWidth >= 768 ? 200 : 120; // Smaller offset for mobile
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update the URL hash
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${sectionId}`);
      }
      
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const response = await fetch(`/api/comparisons/${slug}`);
      const result = await response.json();

      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Failed to load comparison');
      }
    } catch (err) {
      setError('Failed to load comparison data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (price: string) => {
    if (!price) return 'Contact for pricing';
    if (price.includes('$')) return price;
    return `$${price}`;
  };

  const getPricingTierDisplay = (tier: string) => {
    const tierMap = {
      'BUDGET': { symbol: '$', label: 'Budget' },
      'MID_RANGE': { symbol: '$$', label: 'Mid-Range' },
      'PREMIUM': { symbol: '$$$', label: 'Premium' },
      'ENTERPRISE': { symbol: '$$$+', label: 'Enterprise' }
    };
    return tierMap[tier as keyof typeof tierMap] || { symbol: '', label: tier };
  };

  const formatCategoryName = (category: string) => {
    return category.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#7cc6ee' }}></div>
          <p className="font-medium text-sm sm:text-base" style={{ color: '#334155' }}>Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>Comparison Not Found</h1>
          <p className="mb-6 text-sm sm:text-base" style={{ color: '#334155' }}>{error || 'The comparison you\'re looking for doesn\'t exist.'}</p>
          <Link
            href="/compare"
            className="px-6 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: '#1e2556' }}
          >
            Create New Comparison
          </Link>
        </div>
      </div>
    );
  }

  const { comparison, software } = data;
  const productNames = software.map(s => s.productName).join(' vs ');

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <div className="text-white py-6 sm:py-8" style={{ backgroundColor: '#1e2556' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm mb-3 sm:mb-4 overflow-x-auto">
            <div className="flex whitespace-nowrap">
              <Link href="/" className="hover:text-white" style={{ color: '#7cc6ee' }}>Business Software</Link>
              <span className="mx-2">/</span>
              <Link href="/compare" className="hover:text-white" style={{ color: '#7cc6ee' }}>Compare Software</Link>
              <span className="mx-2">/</span>
              <span className="truncate">Product Comparison</span>
            </div>
          </nav>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            {productNames} - Detailed Comparison
          </h1>
          {comparison.description && (
            <p className="max-w-4xl opacity-90 text-sm sm:text-base leading-relaxed">{comparison.description}</p>
          )}
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky bg-white shadow-md z-50 border-b border-gray-200" style={{ top: '64px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Desktop Navigation */}
            <div className="hidden sm:flex space-x-1 overflow-x-auto flex-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs lg:text-sm whitespace-nowrap ${
                    activeSection === section.id
                      ? 'text-white shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent',
                    color: activeSection === section.id ? 'white' : '#334155'
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Navigation Button */}
            <button
              className="sm:hidden flex items-center px-3 py-2 rounded-lg border border-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: '#334155' }}
            >
              <span className="text-sm font-medium mr-2">
                {sections.find(s => s.id === activeSection)?.label || 'Menu'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <Link
              href="/compare"
              className="ml-2 sm:ml-4 inline-flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90 text-xs sm:text-sm whitespace-nowrap"
              style={{ backgroundColor: '#1e2556' }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </div>
          
          {/* Mobile Navigation Dropdown */}
          {isMobileMenuOpen && (
            <div className="sm:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
              <div className="px-4 py-2 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                      activeSection === section.id
                        ? 'text-white'
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent',
                      color: activeSection === section.id ? 'white' : '#334155'
                    }}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Overview Section */}
        <section id="overview" className="scroll-mt-32 sm:scroll-mt-44 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
            Overview - {productNames}
          </h2>

          {/* Product Headers - Mobile Stacked, Desktop Table */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Products</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={soft.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 relative rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={soft.logoUrl}
                          alt={soft.productName}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h3>
                      <Link
                        href={`/product/${soft.slug}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#7cc6ee' }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 bg-gray-50 z-10">
                  <div className="h-20 flex items-center">
                    <h3 className="text-lg font-bold" style={{ color: '#1e2556' }}>Products</h3>
                  </div>
                </div>
                {software.map((soft, index) => (
                  <div key={soft.id} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 relative rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={soft.logoUrl}
                          alt={soft.productName}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h3>
                      <Link
                        href={`/product/${soft.slug}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#7cc6ee' }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Description</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`desc-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    {/* <p className="text-sm leading-relaxed mb-3" style={{ color: '#2d2d2d' }}>
                      {soft.briefDescription || soft.description}
                    </p> */}
                    {soft.briefDescription && soft.briefDescription !== soft.description && (
                      <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>
                        {soft.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Description</h3>
                </div>
                {software.map((soft) => (
                  <div key={`desc-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    {/* <p className="text-sm leading-relaxed mb-4" style={{ color: '#2d2d2d' }}>
                      {soft.briefDescription || soft.description}
                    </p> */}
                    {soft.briefDescription && soft.briefDescription !== soft.description && (
                      <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>
                        {soft.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Category</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`cat-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#7cc6ee' }}>
                      {formatCategoryName(soft.category)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Category</h3>
                </div>
                {software.map((soft) => (
                  <div key={`cat-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#7cc6ee' }}>
                      {formatCategoryName(soft.category)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Tier Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Pricing Tier</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`tier-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
                        {getPricingTierDisplay(soft.pricingTier).symbol}
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#1e2556' }}>
                        {getPricingTierDisplay(soft.pricingTier).label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Pricing Tier</h3>
                </div>
                {software.map((soft) => (
                  <div key={`tier-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
                        {getPricingTierDisplay(soft.pricingTier).symbol}
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#1e2556' }}>
                        {getPricingTierDisplay(soft.pricingTier).label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Company Information</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`company-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>Company: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.companyName}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>HQ: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.headquarters}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>Founded: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.founded}</span>
                      </div>
                      {soft.founders && (
                        <div>
                          <span className="font-medium" style={{ color: '#334155' }}>Founders: </span>
                          <span style={{ color: '#2d2d2d' }}>{soft.founders}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Company Information</h3>
                </div>
                {software.map((soft) => (
                  <div key={`company-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>Company: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.companyName}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>HQ: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.headquarters}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#334155' }}>Founded: </span>
                        <span style={{ color: '#2d2d2d' }}>{soft.founded}</span>
                      </div>
                      {soft.founders && (
                        <div>
                          <span className="font-medium" style={{ color: '#334155' }}>Founders: </span>
                          <span style={{ color: '#2d2d2d' }}>{soft.founders}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Target Users Section */}
          <div>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Target Users</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`target-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.targetUsers}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Target Users</h3>
                </div>
                {software.map((soft) => (
                  <div key={`target-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.targetUsers}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="scroll-mt-32 sm:scroll-mt-44 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
            Features - {productNames}
          </h2>

          {/* Core Functionalities Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Core Functionalities</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`core-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-2">
                      {soft.coreFunctionalities.slice(0, 8).map((func, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 rounded-md text-xs font-medium text-white mr-2 mb-2"
                          style={{ backgroundColor: '#7cc6ee' }}
                        >
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Core Functionalities</h3>
                </div>
                {software.map((soft) => (
                  <div key={`core-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-2">
                      {soft.coreFunctionalities.slice(0, 8).map((func, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 rounded-md text-xs font-medium text-white mr-2 mb-2"
                          style={{ backgroundColor: '#7cc6ee' }}
                        >
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Key Features</h3>
              <div className="space-y-6">
                {software.map((soft) => (
                  <div key={`features-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-4" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-4">
                      {soft.keyFeatures.slice(0, 6).map((feature, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <h5 className="font-semibold text-sm mb-2" style={{ color: '#1e2556' }}>
                            {feature.heading}
                          </h5>
                          <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Key Features</h3>
                </div>
                {software.map((soft) => (
                  <div key={`features-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-4">
                      {soft.keyFeatures.slice(0, 6).map((feature, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e2556' }}>
                            {feature.heading}
                          </h4>
                          <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deployment Options Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Deployment Options</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`deploy-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.deploymentOptions}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Deployment Options</h3>
                </div>
                {software.map((soft) => (
                  <div key={`deploy-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.deploymentOptions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack Section */}
          <div>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Technology Stack</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`tech-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-2" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.technologyStack}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Technology Stack</h3>
                </div>
                {software.map((soft) => (
                  <div key={`tech-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {soft.technologyStack}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="scroll-mt-32 sm:scroll-mt-44 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
            Pricing - {productNames}
          </h2>

          {/* Pricing Details Section */}
          <div>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Pricing Details</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`pricing-details-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#334155' }}>Starting:</div>
                        <div className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
                          {formatCurrency(soft.startingPrice)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#334155' }}>Model:</div>
                        <div className="text-sm" style={{ color: '#2d2d2d' }}>
                          {soft.pricingModel || 'Per user / per document quota'}
                        </div>
                      </div>
                      {soft.freeTrial && (
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#334155' }}>Free Trial:</div>
                          <div className="text-sm font-medium" style={{ color: '#7cc6ee' }}>
                            {soft.freeTrial}
                          </div>
                        </div>
                      )}
                      {soft.customPricing && (
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#334155' }}>Custom:</div>
                          <div className="text-sm" style={{ color: '#2d2d2d' }}>
                            {soft.customPricing}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Pricing Details</h3>
                </div>
                {software.map((soft) => (
                  <div key={`pricing-details-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#334155' }}>Starting:</div>
                        <div className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
                          {formatCurrency(soft.startingPrice)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#334155' }}>Model:</div>
                        <div className="text-sm" style={{ color: '#2d2d2d' }}>
                          {soft.pricingModel || 'Per user / per document quota'}
                        </div>
                      </div>
                      {soft.freeTrial && (
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#334155' }}>Free Trial:</div>
                          <div className="text-sm font-medium" style={{ color: '#7cc6ee' }}>
                            {soft.freeTrial}
                          </div>
                        </div>
                      )}
                      {soft.customPricing && (
                        <div>
                          <div className="text-sm font-medium" style={{ color: '#334155' }}>Custom:</div>
                          <div className="text-sm" style={{ color: '#2d2d2d' }}>
                            {soft.customPricing}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="scroll-mt-32 sm:scroll-mt-44 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
            Reviews - {productNames}
          </h2>

          {/* Best Known For Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Best Known For</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`best-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-2">
                      {soft.bestKnownFor.slice(0, 5).map((item, index) => (
                        <div key={index} className="p-2 rounded-md text-sm" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Best Known For</h3>
                </div>
                {software.map((soft) => (
                  <div key={`best-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-2">
                      {soft.bestKnownFor.slice(0, 5).map((item, index) => (
                        <div key={index} className="p-2 rounded-md text-xs" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Use Cases Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Top Use Cases</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`use-cases-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-2">
                      {soft.topUseCases.slice(0, 5).map((useCase, index) => (
                        <div key={index} className="p-2 rounded-md text-sm" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Top Use Cases</h3>
                </div>
                {software.map((soft) => (
                  <div key={`use-cases-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-2">
                      {soft.topUseCases.slice(0, 5).map((useCase, index) => (
                        <div key={index} className="p-2 rounded-md text-xs" style={{ backgroundColor: '#f0f9ff', color: '#2d2d2d' }}>
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Satisfaction Section */}
          <div>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>User Satisfaction</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`satisfaction-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0fdf4', borderColor: '#7cc6ee' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {soft.userSatisfaction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>User Satisfaction</h3>
                </div>
                {software.map((soft) => (
                  <div key={`satisfaction-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0fdf4', borderColor: '#7cc6ee' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {soft.userSatisfaction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sources Section */}
        <section id="sources" className="scroll-mt-32 sm:scroll-mt-44 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
            Sources - {productNames}
          </h2>

          {/* Contact Information Section */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Contact Information</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`contact-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-3">
                      {soft.website && (
                        <div>
                          <Link
                            href={soft.website}
                            target="_blank"
                            className="text-sm font-medium hover:underline"
                            style={{ color: '#7cc6ee' }}
                          >
                            Website
                          </Link>
                        </div>
                      )}
                      <div>
                        <span className="text-sm" style={{ color: '#334155' }}>
                          Email: {soft.email || '[Not Available]'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm" style={{ color: '#334155' }}>
                          Phone: {soft.phone || '[Not Available]'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Contact Information</h3>
                </div>
                {software.map((soft) => (
                  <div key={`contact-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-3">
                      {soft.website && (
                        <div>
                          <Link
                            href={soft.website}
                            target="_blank"
                            className="text-sm font-medium hover:underline"
                            style={{ color: '#7cc6ee' }}
                          >
                            Website
                          </Link>
                        </div>
                      )}
                      <div>
                        <span className="text-sm" style={{ color: '#334155' }}>
                          Email: {soft.email || '[Not Available]'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm" style={{ color: '#334155' }}>
                          Phone: {soft.phone || '[Not Available]'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Actions</h3>
              <div className="space-y-4">
                {software.map((soft) => (
                  <div key={`actions-${soft.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="font-semibold text-base mb-3" style={{ color: '#1e2556' }}>{soft.productName}</h4>
                    <div className="space-y-3">
                      <Link
                        href={`/product/${soft.slug}`}
                        className="block w-full px-4 py-2 rounded-lg text-center font-medium text-white transition-colors hover:opacity-90 text-sm"
                        style={{ backgroundColor: '#1e2556' }}
                      >
                        View Details
                      </Link>
                      <button
                        className="w-full px-4 py-2 rounded-lg border font-medium transition-colors hover:opacity-90 text-sm"
                        style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                      >
                        Get Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <div className="flex min-w-max">
                <div className="w-48 lg:w-64 p-6 border-r border-gray-200 sticky left-0 z-10" style={{ backgroundColor: '#f5f7fa' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Actions</h3>
                </div>
                {software.map((soft) => (
                  <div key={`actions-${soft.id}`} className="w-72 lg:w-80 p-6 border-r border-gray-200 last:border-r-0">
                    <div className="space-y-3">
                      <Link
                        href={`/product/${soft.slug}`}
                        className="block w-full px-4 py-2 rounded-lg text-center font-medium text-white transition-colors hover:opacity-90 text-sm"
                        style={{ backgroundColor: '#1e2556' }}
                      >
                        View Details
                      </Link>
                      <button
                        className="w-full px-4 py-2 rounded-lg border font-medium transition-colors hover:opacity-90 text-sm"
                        style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                      >
                        Get Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Analysis Section */}
        {(comparison.description || (comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0)) && (
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
              About This Comparison
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              {comparison.description && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3" style={{ color: '#1e2556' }}>Description</h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                    {comparison.description}
                  </p>
                </div>
              )}
              
              {/* Q&A Section */}
              {comparison.qna && Array.isArray(comparison.qna) && comparison.qna.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ color: '#1e2556' }}>
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {comparison.qna.map((item: any, index: number) => (
                      <div key={index} className="border-l-4 pl-3 sm:pl-6" style={{ borderColor: '#7cc6ee' }}>
                        <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style={{ color: '#1e2556' }}>
                          Q{index + 1}: {item.question}
                        </h4>
                        <div className="rounded-lg p-3 sm:p-4" style={{ backgroundColor: '#f5f7fa' }}>
                          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}