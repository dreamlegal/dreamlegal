
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const SoftwareDetailPage = ({ slug }) => {
//   const [software, setSoftware] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');

//   useEffect(() => {
//     const fetchSoftware = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`/api/software/${slug}`);
        
//         if (!response.ok) {
//           if (response.status === 404) {
//             setError('Software not found');
//           } else {
//             setError('Failed to load software details');
//           }
//           return;
//         }
        
//         const data = await response.json();
//         setSoftware(data); // API returns software object directly
//       } catch (error) {
//         console.error('Error fetching software:', error);
//         setError('Network error. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       fetchSoftware();
//     }
//   }, [slug]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['overview', 'features', 'pricing', 'reviews', 'sources'];
//       const scrollPosition = window.scrollY + 100;

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const offsetBottom = offsetTop + element.offsetHeight;
          
//           if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const formatCategoryName = (category) => {
//     return category.replace(/_/g, ' ').toLowerCase()
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const getPricingTierDisplay = (tier) => {
//     const tierMap = {
//       'BUDGET': { symbol: '$', label: 'Budget' },
//       'MID_RANGE': { symbol: '$$', label: 'Mid-Range' },
//       'PREMIUM': { symbol: '$$$', label: 'Premium' },
//       'ENTERPRISE': { symbol: '$$$+', label: 'Enterprise' }
//     };
//     return tierMap[tier] || { symbol: '', label: tier };
//   };

//   const getImpactLevelColor = (level) => {
//     const colors = {
//       'High': 'bg-green-50 text-green-700 border-green-200',
//       'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
//       'Low': 'bg-gray-50 text-gray-700 border-gray-200'
//     };
//     return colors[level] || 'bg-gray-50 text-gray-700 border-gray-200';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#7cc6ee] mx-auto mb-4"></div>
//           <p style={{ color: '#334155' }} className="text-base font-medium">Loading software details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center max-w-md mx-auto p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#ffffff' }}>
//           <div className="mb-4">
//             <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
//               <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>Oops!</h1>
//           <p className="mb-6" style={{ color: '#334155' }}>{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!software) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center max-w-md mx-auto p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#ffffff' }}>
//           <div className="mb-4">
//             <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#f1f5f9' }}>
//               <svg className="w-8 h-8" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09m10.582 0A7.962 7.962 0 0112 15c2.034 0 3.9.785 5.291 2.09M15 11V9a3 3 0 11-6 0v2a1 1 0 001 1h4a1 1 0 001-1z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>Software Not Found</h1>
//           <p className="mb-6" style={{ color: '#334155' }}>The software you're looking for doesn't exist.</p>
//           <a 
//             href="/"
//             className="inline-block px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             Back to Home
//           </a>
//         </div>
//       </div>
//     );
//   }

//   const sections = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'features', label: 'Features & Functionalities' },
//     { id: 'pricing', label: 'Pricing Plans' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'sources', label: 'Sources' }
//   ];

//   return (
//     <div className="min-h-screen pt-20" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex">
//         {/* Left Sidebar */}
//         <div className="w-[30%] bg-white shadow-xl sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
//           <div className="p-6">
//             {/* Logo and Basic Info */}
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 mx-auto mb-3 relative rounded-xl overflow-hidden shadow-md">
//                 <Image
//                   src={software.logoUrl || '/placeholder-logo.png'}
//                   alt={`${software.productName} logo`}
//                   fill
//                   className="object-contain p-1"
//                 />
//               </div>
//               <h1 className="text-xl font-bold mb-2" style={{ color: '#1e2556' }}>{software.productName}</h1>
//               <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
//                     style={{ backgroundColor: '#7cc6ee' }}>
//                 {formatCategoryName(software.category)}
//               </span>
//             </div>

//             {/* Description */}
//             <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//               <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{software.description}</p>
//             </div>

//             {/* Company Information */}
//             <div className="mb-6">
//               <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Company Information</h3>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-2">
//                   <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                   <div>
//                     <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Company</span>
//                     <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.companyName}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-2">
//                   <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                   <div>
//                     <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Headquarters</span>
//                     <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.headquarters}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-2">
//                   <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                   <div>
//                     <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Founded</span>
//                     <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.founded}</span>
//                   </div>
//                 </div>
//                 {software.founders && (
//                   <div className="flex items-start space-x-2">
//                     <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                     <div>
//                       <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Founders</span>
//                       <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.founders}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Contact Information</h3>
//               <div className="space-y-3">
//                 {software.phone && software.phone !== '[Not Available]' && (
//                   <div className="flex items-start space-x-2">
//                     <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                     <div>
//                       <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Phone</span>
//                       <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.phone}</span>
//                     </div>
//                   </div>
//                 )}
//                 {software.website && (
//                   <div className="flex items-start space-x-2">
//                     <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                     <div>
//                       <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Website</span>
//                       <Link 
//                         href={software.website} 
//                         target="_blank" 
//                         className="block text-sm font-medium transition-colors duration-200 hover:underline"
//                         style={{ color: '#7cc6ee' }}
//                       >
//                         Visit Website
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//                 {software.email && software.email !== '[Not Available]' && (
//                   <div className="flex items-start space-x-2">
//                     <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                     <div>
//                       <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Email</span>
//                       <span className="block text-sm" style={{ color: '#2d2d2d' }}>{software.email}</span>
//                     </div>
//                   </div>
//                 )}
//                 {software.socialMedia && (
//                   <div className="flex items-start space-x-2">
//                     <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                     <div>
//                       <span className="block font-semibold text-xs" style={{ color: '#334155' }}>Social</span>
//                       <div className="text-xs" style={{ color: '#2d2d2d' }}>{software.socialMedia}</div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Main Content */}
//         <div className="w-[70%] relative">
//           {/* Sticky Navigation */}
//           <div className="sticky top-20 bg-white shadow-lg z-10 border-b border-gray-100">
//             <div className="flex space-x-1 p-4">
//               {sections.map((section) => (
//                 <button
//                   key={section.id}
//                   onClick={() => scrollToSection(section.id)}
//                   className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-xs transform hover:-translate-y-0.5 ${
//                     activeSection === section.id
//                       ? 'text-white shadow-md'
//                       : 'text-white hover:shadow-sm'
//                   }`}
//                   style={{ 
//                     backgroundColor: activeSection === section.id ? '#1e2556' : '#7cc6ee'
//                   }}
//                 >
//                   {section.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Content Sections */}
//           <div className="p-6">
//             {/* Section 1: Overview */}
//             <section id="overview" className="mb-10">
//               <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Overview</h2>
              
//               <div className="grid grid-cols-1 gap-6">
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Description</h3>
//                   <p className="leading-relaxed" style={{ color: '#2d2d2d' }}>{software.briefDescription}</p>
//                 </div>

//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Target Users</h3>
//                   <p className="leading-relaxed" style={{ color: '#2d2d2d' }}>{software.targetUsers}</p>
//                 </div>

//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Primary Purpose</h3>
//                   <p className="leading-relaxed" style={{ color: '#2d2d2d' }}>{software.primaryPurpose}</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                     <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Technology Stack</h3>
//                     <p className="leading-relaxed text-sm" style={{ color: '#2d2d2d' }}>{software.technologyStack}</p>
//                   </div>

//                   <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                     <h3 className="text-lg font-bold mb-3" style={{ color: '#1e2556' }}>Deployment Options</h3>
//                     <p className="leading-relaxed text-sm" style={{ color: '#2d2d2d' }}>{software.deploymentOptions}</p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 2: Features and Functionalities */}
//             <section id="features" className="mb-10">
//               <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Features & Functionalities</h2>
              
//               <div className="space-y-8">
//                 {/* Core Functionalities */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Core Functionalities</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {software.coreFunctionalities.map((functionality, index) => (
//                       <div key={index} className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm" style={{ backgroundColor: '#f5f7fa' }}>
//                         <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#7cc6ee' }}></div>
//                         <span className="text-sm font-medium" style={{ color: '#2d2d2d' }}>{functionality}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Key Features */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Key Features</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {software.keyFeatures.map((feature, index) => (
//                       <div key={index} className="group p-4 rounded-lg border-2 border-gray-100 transition-all duration-300 hover:border-[#7cc6ee] hover:shadow-md hover:-translate-y-0.5" style={{ backgroundColor: '#f5f7fa' }}>
//                         <h4 className="font-bold text-base mb-2 group-hover:text-[#1e2556] transition-colors duration-300" style={{ color: '#1e2556' }}>{feature.heading}</h4>
//                         <p className="leading-relaxed text-sm" style={{ color: '#2d2d2d' }}>{feature.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Impact on Process Lifecycle */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Impact on Process Lifecycle</h3>
//                   <div className="space-y-3">
//                     {software.lifecycleStages
//                       .sort((a, b) => a.stage_number - b.stage_number)
//                       .map((stage, index) => (
//                         <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
//                           <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md" style={{ backgroundColor: '#1e2556' }}>
//                             {stage.stage_number}
//                           </div>
//                           <div className="flex-grow">
//                             <div className="flex items-center space-x-3 mb-2">
//                               <h4 className="text-base font-bold" style={{ color: '#1e2556' }}>{stage.stage_name}</h4>
//                               <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${getImpactLevelColor(stage.impact_level)}`}>
//                                 {stage.impact_level} Impact
//                               </span>
//                             </div>
//                             <p className="leading-relaxed text-sm" style={{ color: '#2d2d2d' }}>{stage.feature_impact_description}</p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 3: Pricing Plans */}
//             <section id="pricing" className="mb-10">
//               <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Pricing Plans</h2>
              
//               <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="p-4 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//                     <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Pricing Information</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="text-2xl font-bold" style={{ color: '#7cc6ee' }}>
//                           {getPricingTierDisplay(software.pricingTier).symbol}
//                         </div>
//                         <div>
//                           <div className="text-base font-bold" style={{ color: '#1e2556' }}>
//                             {getPricingTierDisplay(software.pricingTier).label}
//                           </div>
//                           <div className="text-xs" style={{ color: '#334155' }}>Pricing Tier</div>
//                         </div>
//                       </div>
                      
//                       {software.startingPrice && software.startingPrice !== '[Not Available]' && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7cc6ee' }}></div>
//                           <div>
//                             <span className="font-semibold text-sm" style={{ color: '#334155' }}>Starting Price: </span>
//                             <span className="text-sm" style={{ color: '#2d2d2d' }}>{software.startingPrice}</span>
//                           </div>
//                         </div>
//                       )}
                      
//                       {software.pricingModel && (
//                         <div className="flex items-start space-x-2">
//                           <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: '#7cc6ee' }}></div>
//                           <div>
//                             <span className="font-semibold text-sm block" style={{ color: '#334155' }}>Pricing Model</span>
//                             <span className="text-sm" style={{ color: '#2d2d2d' }}>{software.pricingModel}</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="p-4 rounded-lg text-white" style={{ backgroundColor: '#1e2556' }}>
//                     <h3 className="text-lg font-bold mb-4 text-white">Additional Options</h3>
//                     <div className="space-y-4">
//                       {software.freeTrial && (
//                         <div className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-10">
//                           <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7cc6ee' }}>
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <div>
//                             <div className="font-semibold text-white text-sm">Free Trial Available</div>
//                             <div className="text-gray-200 text-xs">{software.freeTrial}</div>
//                           </div>
//                         </div>
//                       )}
                      
//                       {software.customPricing && (
//                         <div className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-10">
//                           <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7cc6ee' }}>
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <div>
//                             <div className="font-semibold text-white text-sm">Custom Pricing</div>
//                             <div className="text-gray-200 text-xs">{software.customPricing}</div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 4: Reviews */}
//             <section id="reviews" className="mb-10">
//               <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Reviews</h2>
              
//               <div className="space-y-6">
//                 {/* User Satisfaction */}
//                 <div className="bg-green-50 border-2 border-green-100 p-6 rounded-xl shadow-md">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-bold text-green-800">User Satisfaction</h3>
//                   </div>
//                   <p className="text-green-700 leading-relaxed">{software.userSatisfaction}</p>
//                 </div>

//                 {/* Top Use Cases */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Top Use Cases</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {software.topUseCases.map((useCase, index) => (
//                       <div key={index} className="p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ backgroundColor: '#f0f9ff', borderColor: '#7cc6ee' }}>
//                         <div className="flex items-start space-x-2">
//                           <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#7cc6ee' }}></div>
//                           <p className="leading-relaxed text-sm" style={{ color: '#2d2d2d' }}>{useCase}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Critical Opinions */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Critical Opinions</h3>
//                   <div className="space-y-3">
//                     {software.criticalOpinions.map((opinion, index) => (
//                       <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-100 hover:shadow-sm transition-all duration-300">
//                         <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <p className="text-yellow-800 leading-relaxed text-sm">{opinion}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Best Known For */}
//                 <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                   <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>Best Known For</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {software.bestKnownFor.map((feature, index) => (
//                       <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
//                         <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <p className="text-sm font-medium" style={{ color: '#2d2d2d' }}>{feature}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 5: Sources */}
//             <section id="sources" className="mb-10">
//               <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Sources</h2>
              
//               <div className="space-y-6">
//                 {Object.entries(software.sources).map(([category, links]) => (
//                   <div key={category} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
//                     <h3 className="text-lg font-bold mb-4" style={{ color: '#1e2556' }}>
//                       {category.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
//                         word.charAt(0).toUpperCase() + word.slice(1)
//                       ).join(' ')}
//                     </h3>
//                     <div className="grid grid-cols-1 gap-3">
//                       {links.map((link, index) => (
//                         <Link 
//                           key={index}
//                           href={link}
//                           target="_blank"
//                           className="group p-4 rounded-lg border-2 border-gray-100 hover:border-[#7cc6ee] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
//                           style={{ backgroundColor: '#f5f7fa' }}
//                         >
//                           <div className="flex items-center space-x-2">
//                             <div className="w-2 h-2 rounded-full group-hover:bg-[#7cc6ee] transition-colors duration-300" style={{ backgroundColor: '#7cc6ee' }}></div>
//                             <p className="text-sm font-medium break-all group-hover:text-[#1e2556] transition-colors duration-300" style={{ color: '#7cc6ee' }}>
//                               {link}
//                             </p>
//                             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                             </svg>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SoftwareDetailPage;
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SoftwareDetailPage = ({ slug }) => {
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/software/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Software not found');
          } else {
            setError('Failed to load software details');
          }
          return;
        }
        
        const data = await response.json();
        setSoftware(data);
      } catch (error) {
        console.error('Error fetching software:', error);
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSoftware();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'features', 'pricing', 'reviews', 'sources'];
      const scrollPosition = window.scrollY + 120; // Adjusted for better offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const formatCategoryName = (category) => {
    return category.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getPricingTierDisplay = (tier) => {
    const tierMap = {
      'BUDGET': { symbol: '$', label: 'Budget' },
      'MID_RANGE': { symbol: '$$', label: 'Mid-Range' },
      'PREMIUM': { symbol: '$$$', label: 'Premium' },
      'ENTERPRISE': { symbol: '$$$+', label: 'Enterprise' }
    };
    return tierMap[tier] || { symbol: '', label: tier };
  };

  const getImpactLevelColor = (level) => {
    const colors = {
      'High': 'bg-green-50 text-green-700 border-green-200',
      'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Low': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[level] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#7cc6ee] mx-auto mb-3"></div>
          <p style={{ color: '#334155' }} className="text-sm font-medium">Loading software details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center max-w-sm mx-auto p-5 rounded-lg shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <div className="mb-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-lg font-bold mb-1" style={{ color: '#1e2556' }}>Oops!</h1>
          <p className="text-sm mb-4" style={{ color: '#334155' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: '#1e2556' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!software) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center max-w-sm mx-auto p-5 rounded-lg shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <h1 className="text-lg font-bold mb-1" style={{ color: '#1e2556' }}>Software Not Found</h1>
          <p className="text-sm mb-4" style={{ color: '#334155' }}>The software you're looking for doesn't exist.</p>
          <a 
            href="/"
            className="inline-block px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: '#1e2556' }}
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'sources', label: 'Sources' }
  ];

  

  const displaySoftware = software;

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed left-4 top-20 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
        >
          <svg className="w-6 h-6" style={{ color: '#1e2556' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className="flex relative">
        {/* Compact Left Sidebar */}
        <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300' : 'w-80 fixed left-4 top-16 bottom-4'} bg-white rounded-xl shadow-xl overflow-hidden flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} ${isMobile ? 'w-80' : ''}`}>
          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-4 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <div className="p-4 flex-1 overflow-y-auto">
            {/* Logo and Basic Info - Compact */}
            <div className="text-center mb-3">
              <div className="w-24 h-24 mx-auto mb-2 relative rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={displaySoftware.logoUrl || '/placeholder-logo.png'}
                  alt={`${displaySoftware.productName} logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <h1 className="text-base font-bold mb-1" style={{ color: '#1e2556' }}>{displaySoftware.productName}</h1>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#7cc6ee' }}>
                {formatCategoryName(displaySoftware.category)}
              </span>
            </div>

            {/* Description with Show More */}
            <div className="mb-3 px-2">
              <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                {showFullDescription ? displaySoftware.description : truncateText(displaySoftware.description)}
              </p>
              {displaySoftware.description.length > 120 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-xs font-medium mt-1 hover:underline"
                  style={{ color: '#7cc6ee' }}
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            {/* Company Information - Compact */}
            <div className="mb-3">
              <h3 className="text-sm font-bold mb-2 px-2" style={{ color: '#1e2556' }}>Company Info</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center px-2">
                  <span className="font-medium w-20" style={{ color: '#334155' }}>Company:</span>
                  <span style={{ color: '#2d2d2d' }} className="truncate">{displaySoftware.companyName}</span>
                </div>
                <div className="flex items-center px-2">
                  <span className="font-medium w-20" style={{ color: '#334155' }}>HQ:</span>
                  <span style={{ color: '#2d2d2d' }}>{displaySoftware.headquarters}</span>
                </div>
                <div className="flex items-center px-2">
                  <span className="font-medium w-20" style={{ color: '#334155' }}>Founded:</span>
                  <span style={{ color: '#2d2d2d' }}>{displaySoftware.founded}</span>
                </div>
                {displaySoftware.founders && (
                  <div className="flex items-start px-2">
                    <span className="font-medium w-20" style={{ color: '#334155' }}>Founders:</span>
                    <span style={{ color: '#2d2d2d' }} className="break-words flex-1">{displaySoftware.founders}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information - Compact */}
            <div className="mb-3">
              <h3 className="text-sm font-bold mb-2 px-2" style={{ color: '#1e2556' }}>Contact</h3>
              <div className="space-y-1.5 text-xs">
                {displaySoftware.website && (
                  <div className="px-2">
                    <Link 
                      href={displaySoftware.website} 
                      target="_blank" 
                      className="flex items-center space-x-1 font-medium transition-colors duration-200 hover:underline"
                      style={{ color: '#7cc6ee' }}
                    >
                      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span>Visit Website</span>
                    </Link>
                  </div>
                )}
                {displaySoftware.phone && displaySoftware.phone !== '[Not Available]' && (
                  <div className="flex items-center space-x-1 px-2">
                    <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span style={{ color: '#2d2d2d' }}>{displaySoftware.phone}</span>
                  </div>
                )}
                {displaySoftware.email && displaySoftware.email !== '[Not Available]' && (
                  <div className="flex items-center space-x-1 px-2">
                    <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span style={{ color: '#2d2d2d' }} className="break-all">{displaySoftware.email}</span>
                  </div>
                )}
                {displaySoftware.socialMedia && (
                  <div className="flex items-center space-x-1 px-2">
                    <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span style={{ color: '#2d2d2d' }}>{displaySoftware.socialMedia}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Tier Badge */}
          <div className="p-3 border-t" style={{ backgroundColor: '#f5f7fa' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: '#334155' }}>Pricing Tier</span>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
                  {getPricingTierDisplay(displaySoftware.pricingTier).symbol}
                </span>
                <span className="text-xs font-medium" style={{ color: '#1e2556' }}>
                  {getPricingTierDisplay(displaySoftware.pricingTier).label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-[336px]'}`}>
          {/* Compact Sticky Navigation */}
          <div className="sticky top-16 bg-white shadow-md z-30 border-b border-gray-100">
            <div className={`flex ${isMobile ? 'overflow-x-auto scrollbar-hide' : 'space-x-1'} px-4 md:px-6 py-2`}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
                    activeSection === section.id
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ 
                    backgroundColor: activeSection === section.id ? '#1e2556' : 'transparent'
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections with proper spacing */}
          <div className="p-4 md:p-6 max-w-6xl">
            {/* Section 1: Overview */}
            <section id="overview" className="mb-8 scroll-mt-16">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Overview</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Description</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.briefDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Target Users</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.targetUsers}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Primary Purpose</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.primaryPurpose}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Technology Stack</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.technologyStack}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Deployment Options</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.deploymentOptions}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Features and Functionalities */}
            <section id="features" className="mb-8 scroll-mt-16">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Features & Functionalities</h2>
              
              <div className="space-y-4">
                {/* Core Functionalities */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Core Functionalities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {displaySoftware.coreFunctionalities.map((functionality, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded-md" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#7cc6ee' }}></div>
                        <span className="text-xs" style={{ color: '#2d2d2d' }}>{functionality}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displaySoftware.keyFeatures.map((feature, index) => (
                      <div key={index} className="group p-3 rounded-md border border-gray-200 transition-all duration-300 hover:border-[#7cc6ee] hover:shadow-sm">
                        <h4 className="font-semibold text-sm mb-1" style={{ color: '#1e2556' }}>{feature.heading}</h4>
                        <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact on Process Lifecycle */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Impact on Process Lifecycle</h3>
                  <div className="space-y-2">
                    {displaySoftware.lifecycleStages
                      .sort((a, b) => a.stage_number - b.stage_number)
                      .map((stage, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-md border border-gray-100 hover:shadow-sm transition-all duration-300">
                          <div className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#1e2556' }}>
                            {stage.stage_number}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold" style={{ color: '#1e2556' }}>{stage.stage_name}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactLevelColor(stage.impact_level)}`}>
                                {stage.impact_level}
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{stage.feature_impact_description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Pricing Plans */}
            <section id="pricing" className="mb-8 scroll-mt-16">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Pricing Plans</h2>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-md" style={{ backgroundColor: '#f5f7fa' }}>
                    <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Pricing Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-xl font-bold" style={{ color: '#7cc6ee' }}>
                          {getPricingTierDisplay(displaySoftware.pricingTier).symbol}
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: '#1e2556' }}>
                            {getPricingTierDisplay(displaySoftware.pricingTier).label}
                          </div>
                          <div className="text-xs" style={{ color: '#334155' }}>Pricing Tier</div>
                        </div>
                      </div>
                      
                      {displaySoftware.startingPrice && displaySoftware.startingPrice !== '[Not Available]' && (
                        <div className="text-xs">
                          <span className="font-medium" style={{ color: '#334155' }}>Starting: </span>
                          <span style={{ color: '#2d2d2d' }}>{displaySoftware.startingPrice}</span>
                        </div>
                      )}
                      
                      {displaySoftware.pricingModel && (
                        <div className="text-xs">
                          <span className="font-medium block" style={{ color: '#334155' }}>Model</span>
                          <span style={{ color: '#2d2d2d' }}>{displaySoftware.pricingModel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-md text-white" style={{ backgroundColor: '#1e2556' }}>
                    <h3 className="text-sm font-bold mb-3 text-white">Additional Options</h3>
                    <div className="space-y-2">
                      {displaySoftware.freeTrial && (
                        <div className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-[#7cc6ee] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-white text-xs">Free Trial</div>
                            <div className="text-gray-300 text-xs">{displaySoftware.freeTrial}</div>
                          </div>
                        </div>
                      )}
                      
                      {displaySoftware.customPricing && (
                        <div className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-[#7cc6ee] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-white text-xs">Custom Pricing</div>
                            <div className="text-gray-300 text-xs">{displaySoftware.customPricing}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Reviews */}
            <section id="reviews" className="mb-8 scroll-mt-16">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Reviews</h2>
              
              <div className="space-y-4">
                {/* User Satisfaction */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-green-800">User Satisfaction</h3>
                  </div>
                  <p className="text-xs text-green-700 leading-relaxed">{displaySoftware.userSatisfaction}</p>
                </div>

                {/* Top Use Cases */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Top Use Cases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {displaySoftware.topUseCases.map((useCase, index) => (
                      <div key={index} className="p-2 rounded-md border" style={{ backgroundColor: '#f0f9ff', borderColor: '#7cc6ee' }}>
                        <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Critical Opinions */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Areas for Improvement</h3>
                    <div className="space-y-2">
                      {displaySoftware.criticalOpinions.map((opinion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{opinion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Known For */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Best Known For</h3>
                    <div className="space-y-2">
                      {displaySoftware.bestKnownFor.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <p className="text-xs" style={{ color: '#2d2d2d' }}>{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Sources */}
            <section id="sources" className="mb-4 scroll-mt-16">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Sources</h2>
              
              <div className="space-y-3">
                {Object.entries(displaySoftware.sources).map(([category, links]) => (
                  <div key={category} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                      {category.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </h3>
                    <div className="space-y-1">
                      {links.map((link, index) => (
                        <Link 
                          key={index}
                          href={link}
                          target="_blank"
                          className="group flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                        >
                          <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <p className="text-xs font-medium break-all group-hover:text-[#1e2556] transition-colors duration-300" style={{ color: '#7cc6ee' }}>
                            {link}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SoftwareDetailPage;




