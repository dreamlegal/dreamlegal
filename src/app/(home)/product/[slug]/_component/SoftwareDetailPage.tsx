


// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import CreateRfps from '@/components/landingPage/CreateRfp';
// import { useAuth } from "@/context/authContext";

// const SoftwareDetailPage = ({ slug }) => {
//   const [software, setSoftware] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [showFullOverviewDesc, setShowFullOverviewDesc] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showInfoTooltip, setShowInfoTooltip] = useState(false);
//   const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  
//   // New states for user toggle feature
//   const [isUserUsing, setIsUserUsing] = useState(false);
//   const [userCount, setUserCount] = useState(0);
//   const [isTogglingUser, setIsTogglingUser] = useState(false);
  
//   const { userId, vendorId, userType, isLoading: authLoading } = useAuth();
//   const isAuthenticated = !!(userId || vendorId);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

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
//         setSoftware(data);
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

//   // Fetch user status when component mounts or auth changes
//   useEffect(() => {
//     const fetchUserStatus = async () => {
//       if (!slug) return;
      
//       try {
//         const queryParams = userId ? `?userId=${userId}` : '';
//         const response = await fetch(`/api/software/${slug}/user-status${queryParams}`);
//         if (response.ok) {
//           const data = await response.json();
//           setIsUserUsing(data.isUserUsing);
//           setUserCount(data.userCount);
//         }
//       } catch (error) {
//         console.error('Error fetching user status:', error);
//       }
//     };

//     fetchUserStatus();
//   }, [slug, userId]);

//   const handleUserToggle = async () => {
//     // Check if it's a vendor
//     if (vendorId && !userId) {
//       alert('Vendors cannot save products');
//       return;
//     }

//     if (!userId) {
//       // You might want to show a login modal or redirect to login
//       alert('Please login to mark yourself as a user');
//       return;
//     }

//     setIsTogglingUser(true);
    
//     try {
//       const response = await fetch(`/api/software/${slug}/user-status`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           isUsing: !isUserUsing,
//           userId: userId,
//           vendorId: vendorId 
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsUserUsing(data.isUserUsing);
//         setUserCount(data.userCount);
//       } else {
//         const error = await response.json();
//         alert(error.error || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error toggling user status:', error);
//       alert('Failed to update status');
//     } finally {
//       setIsTogglingUser(false);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['overview', 'features', 'pricing', 'reviews', 'sources'];
//       const scrollPosition = window.scrollY + 120;

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
//       const offset = isMobile ? 150 : 100;
//       const elementPosition = element.offsetTop - offset;
//       window.scrollTo({
//         top: elementPosition,
//         behavior: 'smooth'
//       });
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

//   const truncateText = (text, maxLength = 120) => {
//     if (text.length <= maxLength) return text;
//     return text.substr(0, maxLength).trim() + '...';
//   };

//   const truncateByLines = (text, lineCount = 3, charPerLine = 80) => {
//     const maxLength = lineCount * charPerLine;
//     if (text.length <= maxLength) return text;
//     return text.substr(0, maxLength).trim() + '...';
//   };

//   const parseSocialMedia = (socialMedia) => {
//     if (!socialMedia) return [];
    
//     const socialLinks = [];
//     const platforms = {
//       'LinkedIn': { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', color: '#0077B5' },
//       'Twitter': { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: '#1DA1F2' },
//       'Instagram': { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z', color: '#E4405F' }
//     };

//     const entries = socialMedia.split(',').map(entry => entry.trim());
    
//     entries.forEach(entry => {
//       for (const [platform, data] of Object.entries(platforms)) {
//         if (entry.includes(platform)) {
//           let url = '';
//           let handle = '';
          
//           if (entry.includes('http')) {
//             const urlMatch = entry.match(/https?:\/\/[^\s]+/);
//             if (urlMatch) {
//               url = urlMatch[0];
//             }
//           } else if (entry.includes('@')) {
//             const handleMatch = entry.match(/@[\w]+/);
//             if (handleMatch) {
//               handle = handleMatch[0];
//               if (platform === 'Twitter') {
//                 url = `https://twitter.com/${handle.substring(1)}`;
//               } else if (platform === 'Instagram') {
//                 url = `https://instagram.com/${handle.substring(1)}`;
//               }
//             }
//           }
          
//           if (url) {
//             socialLinks.push({
//               platform,
//               url,
//               icon: data.icon,
//               color: data.color
//             });
//           }
//         }
//       }
//     });
    
//     return socialLinks;
//   };

//   const BlurredContent = ({ children, isBlurred }) => {
//     if (!isBlurred) return children;
    
//     return (
//       <div className="relative">
//         <div className="blur-sm select-none pointer-events-none">
//           {children}
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
//           <div className="text-center">
//             <svg className="w-8 h-8 mx-auto mb-2" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <p className="text-sm font-medium" style={{ color: '#1e2556' }}>Login to view this content</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // User Toggle Component
//   const UserToggleButton = () => {
//     // If it's a vendor, show a different UI
//     if (vendorId && !userId) {
//       return (
//         <div className="bg-gray-50 rounded-lg p-3">
//           <div className="text-center p-2 bg-gray-100 rounded-md">
//             <svg className="w-5 h-5 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <p className="text-xs text-gray-600">Vendors cannot save products</p>
//           </div>
//           <div className="mt-2 text-center">
//             <p className="text-xs text-gray-600">
//               <span className="font-semibold text-sm" style={{ color: '#1e2556' }}>{userCount}</span> {userCount === 1 ? 'person is' : 'people are'} using this product
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-gray-50 rounded-lg p-3">
//         <button
//           onClick={handleUserToggle}
//           disabled={isTogglingUser}
//           className={`w-full flex items-center justify-between p-2 rounded-md transition-all duration-200 ${
//             isUserUsing 
//               ? 'bg-green-100 hover:bg-green-200 border border-green-300' 
//               : 'bg-white hover:bg-gray-100 border border-gray-300'
//           } ${isTogglingUser ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           <span className="flex items-center space-x-2">
//             {isUserUsing ? (
//               <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             ) : (
//               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             )}
//             <span className={`text-sm font-medium ${isUserUsing ? 'text-green-700' : 'text-gray-700'}`}>
//               {isUserUsing ? "I'm using this" : "I am a user"}
//             </span>
//           </span>
//           <div className={`text-xs px-2 py-1 rounded-full ${
//             isUserUsing ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
//           }`}>
//             {isUserUsing ? 'Yes' : 'No'}
//           </div>
//         </button>
        
//         <div className="mt-2 text-center">
//           <p className="text-xs text-gray-600">
//             <span className="font-semibold text-sm" style={{ color: '#1e2556' }}>{userCount}</span> {userCount === 1 ? 'person is' : 'people are'} using this product
//           </p>
//         </div>
//       </div>
//     );
//   };

//   if (loading || authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#7cc6ee] mx-auto mb-3"></div>
//           <p style={{ color: '#334155' }} className="text-sm font-medium">Loading software details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center max-w-sm mx-auto p-5 rounded-lg shadow-sm" style={{ backgroundColor: '#ffffff' }}>
//           <div className="mb-3">
//             <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
//               <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
//           </div>
//           <h1 className="text-lg font-bold mb-1" style={{ color: '#1e2556' }}>Oops!</h1>
//           <p className="text-sm mb-4" style={{ color: '#334155' }}>{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
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
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
//         <div className="text-center max-w-sm mx-auto p-5 rounded-lg shadow-sm" style={{ backgroundColor: '#ffffff' }}>
//           <h1 className="text-lg font-bold mb-1" style={{ color: '#1e2556' }}>Software Not Found</h1>
//           <p className="text-sm mb-4" style={{ color: '#334155' }}>The software you're looking for doesn't exist.</p>
//           <a 
//             href="/"
//             className="inline-block px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
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
//     { id: 'features', label: 'Features' },
//     { id: 'pricing', label: 'Pricing' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'sources', label: 'Sources' }
//   ];

//   const displaySoftware = software;
//   const socialMediaLinks = parseSocialMedia(displaySoftware.socialMedia);

//   return (
//     <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex relative">
//         {/* Compact Left Sidebar */}
//         <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300' : 'w-80 fixed left-4 top-16 bottom-4'} bg-white rounded-xl shadow-xl overflow-hidden flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} ${isMobile ? 'w-80' : ''}`}>
//           {/* Mobile Close Button */}
//           {isMobile && (
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="absolute right-4 top-4 p-2"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}

//           <div className="p-4 flex-1 overflow-y-auto">
//             {/* Logo and Basic Info - Compact */}
//             <div className="text-center mb-3">
//               <div className="w-24 h-24 mx-auto mb-2 relative rounded-lg overflow-hidden shadow-sm">
//                 <Image
//                   src={displaySoftware.logoUrl || '/placeholder-logo.png'}
//                   alt={`${displaySoftware.productName} logo`}
//                   fill
//                   className="object-contain p-1"
//                 />
//               </div>
//               <h1 className="text-base font-bold mb-1" style={{ color: '#1e2556' }}>{displaySoftware.productName}</h1>
//               <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white"
//                     style={{ backgroundColor: '#7cc6ee' }}>
//                 {formatCategoryName(displaySoftware.category)}
//               </span>
//             </div>

//             {/* User Toggle Button - Below Category */}
//             <div className="mb-3">
//               <UserToggleButton />
//             </div>

//             {/* Description with Show More */}
//             <div className="mb-3 px-2">
//               <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
//                 {showFullDescription ? displaySoftware.description : truncateText(displaySoftware.description)}
//               </p>
//               {displaySoftware.description.length > 120 && (
//                 <button
//                   onClick={() => setShowFullDescription(!showFullDescription)}
//                   className="text-xs font-medium mt-1 hover:underline"
//                   style={{ color: '#7cc6ee' }}
//                 >
//                   {showFullDescription ? 'Show less' : 'Show more'}
//                 </button>
//               )}
//             </div>

//             {/* Company Information - Compact */}
//             <div className="mb-3">
//               <h3 className="text-sm font-bold mb-2 px-2" style={{ color: '#1e2556' }}>Company Info</h3>
//               <div className="space-y-1.5 text-xs">
//                 <div className="flex items-center px-2">
//                   <span className="font-medium w-20" style={{ color: '#334155' }}>Company:</span>
//                   <span style={{ color: '#2d2d2d' }} className="truncate">{displaySoftware.companyName}</span>
//                 </div>
//                 <div className="flex items-center px-2">
//                   <span className="font-medium w-20" style={{ color: '#334155' }}>HQ:</span>
//                   <span style={{ color: '#2d2d2d' }}>{displaySoftware.headquarters}</span>
//                 </div>
//                 <div className="flex items-center px-2">
//                   <span className="font-medium w-20" style={{ color: '#334155' }}>Founded:</span>
//                   <span style={{ color: '#2d2d2d' }}>{displaySoftware.founded}</span>
//                 </div>
//                 {displaySoftware.founders && (
//                   <div className="flex items-start px-2">
//                     <span className="font-medium w-20" style={{ color: '#334155' }}>Founders:</span>
//                     <span style={{ color: '#2d2d2d' }} className="break-words flex-1">{displaySoftware.founders}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Contact Information - Compact */}
//             <div className="mb-3">
//               <h3 className="text-sm font-bold mb-2 px-2" style={{ color: '#1e2556' }}>Contact</h3>
//               <div className="space-y-1.5 text-xs">
//                 {displaySoftware.website && (
//                   <div className="px-2">
//                     <Link 
//                       href={displaySoftware.website} 
//                       target="_blank" 
//                       className="flex items-center space-x-1 font-medium transition-colors duration-200 hover:underline"
//                       style={{ color: '#7cc6ee' }}
//                     >
//                       <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
//                       </svg>
//                       <span>Visit Website</span>
//                     </Link>
//                   </div>
//                 )}
//                 {displaySoftware.phone && displaySoftware.phone !== '[Not Available]' && (
//                   <div className="flex items-center space-x-1 px-2">
//                     <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                     </svg>
//                     <span style={{ color: '#2d2d2d' }}>{displaySoftware.phone}</span>
//                   </div>
//                 )}
//                 {displaySoftware.email && displaySoftware.email !== '[Not Available]' && (
//                   <div className="flex items-center space-x-1 px-2">
//                     <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                     <span style={{ color: '#2d2d2d' }} className="break-all">{displaySoftware.email}</span>
//                   </div>
//                 )}
//                 {socialMediaLinks.length > 0 && (
//                   <div className="flex items-center space-x-2 px-2">
//                     <span className="font-medium" style={{ color: '#334155' }}>Social:</span>
//                     <div className="flex space-x-2">
//                       {socialMediaLinks.map((social, index) => (
//                         <Link
//                           key={index}
//                           href={social.url}
//                           target="_blank"
//                           className="hover:opacity-80 transition-opacity"
//                         >
//                           <svg className="w-4 h-4" fill={social.color} viewBox="0 0 24 24">
//                             <path d={social.icon} />
//                           </svg>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing Tier Badge */}
//           <div className="p-3 border-t" style={{ backgroundColor: '#f5f7fa' }}>
//             <div className="flex items-center justify-between">
//               <span className="text-xs font-medium" style={{ color: '#334155' }}>Pricing Tier</span>
//               <div className="flex items-center space-x-1">
//                 <span className="text-lg font-bold" style={{ color: '#7cc6ee' }}>
//                   {getPricingTierDisplay(displaySoftware.pricingTier).symbol}
//                 </span>
//                 <span className="text-xs font-medium" style={{ color: '#1e2556' }}>
//                   {getPricingTierDisplay(displaySoftware.pricingTier).label}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Main Content */}
//         <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-[336px]'}`}>
//           {/* Compact Sticky Navigation */}
//           <div className={`sticky ${isMobile ? 'top-0' : 'top-16'} bg-white shadow-md z-30 border-b border-gray-100`}>
//             <div className="flex items-center justify-between px-4 md:px-6 py-2">
//               <div className={`flex ${isMobile ? 'overflow-x-auto scrollbar-hide' : 'space-x-1'}`}>
//                 {sections.map((section) => (
//                   <button
//                     key={section.id}
//                     onClick={() => scrollToSection(section.id)}
//                     className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
//                       activeSection === section.id
//                         ? 'text-white shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                     }`}
//                     style={{ 
//                       backgroundColor: activeSection === section.id ? '#1e2556' : 'transparent'
//                     }}
//                   >
//                     {section.label}
//                   </button>
//                 ))}
//               </div>
              
//               {/* Action Button */}
//               {!isMobile && (
//                 <button 
//                   onClick={() => setIsRfpFormOpen(true)}
//                   className="group whitespace-nowrap px-4 py-1.5 bg-[#7cc6ee] 
//                           text-white rounded-md font-medium hover:bg-[#5eb6e0] 
//                           transition-all duration-200 flex items-center 
//                           justify-center gap-2 shadow-sm hover:shadow-md text-xs
//                           hover:scale-105 active:scale-95"
//                 >
//                   Share Requirements
//                   <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Content Sections with proper spacing */}
//           <div className="p-4 md:p-6 max-w-6xl">
//             {/* Mobile Info Box */}
//             {isMobile && (
//               <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow-sm">
//                     <Image
//                       src={displaySoftware.logoUrl || '/placeholder-logo.png'}
//                       alt={`${displaySoftware.productName} logo`}
//                       fill
//                       className="object-contain p-1"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <h1 className="text-sm font-bold" style={{ color: '#1e2556' }}>{displaySoftware.productName}</h1>
//                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white mt-1"
//                           style={{ backgroundColor: '#7cc6ee' }}>
//                       {formatCategoryName(displaySoftware.category)}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* User Toggle Button in Mobile View */}
//                 <UserToggleButton />
                
//                 <button 
//                   onClick={() => setIsRfpFormOpen(true)}
//                   className="w-full mt-3 mb-2 px-4 py-2 bg-[#7cc6ee] text-white rounded-md font-medium text-sm hover:bg-[#5eb6e0] transition-all duration-200"
//                 >
//                   Share Requirements
//                 </button>
                
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
//                   style={{ color: '#1e2556' }}
//                 >
//                   View All Details
//                 </button>
//               </div>
//             )}

//             {/* Section 1: Overview */}
//             <section id="overview" className="mb-8 scroll-mt-24">
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Overview</h2>
              
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Description</h3>
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
//                     {showFullOverviewDesc ? displaySoftware.briefDescription : truncateByLines(displaySoftware.briefDescription, 3)}
//                   </p>
//                   {displaySoftware.briefDescription.length > 240 && (
//                     <button
//                       onClick={() => setShowFullOverviewDesc(!showFullOverviewDesc)}
//                       className="text-xs font-medium mt-2 hover:underline"
//                       style={{ color: '#7cc6ee' }}
//                     >
//                       {showFullOverviewDesc ? 'Show less' : 'Show more'}
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Target Users</h3>
//                     <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.targetUsers}</p>
//                   </div>

//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Primary Purpose</h3>
//                     <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.primaryPurpose}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Technology Stack</h3>
//                     <BlurredContent isBlurred={!isAuthenticated}>
//                       <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.technologyStack}</p>
//                     </BlurredContent>
//                   </div>

//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Deployment Options</h3>
//                     <BlurredContent isBlurred={!isAuthenticated}>
//                       <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.deploymentOptions}</p>
//                     </BlurredContent>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 2: Features and Functionalities */}
//             <section id="features" className="mb-8 scroll-mt-24">
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Features & Functionalities</h2>
              
//               <div className="space-y-4">
//                 {/* Core Functionalities */}
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Core Functionalities</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//                     {displaySoftware.coreFunctionalities.map((functionality, index) => (
//                       <div key={index} className="flex items-center space-x-2 p-2 rounded-md" style={{ backgroundColor: '#f5f7fa' }}>
//                         <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#7cc6ee' }}></div>
//                         <span className="text-xs" style={{ color: '#2d2d2d' }}>{functionality}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Key Features */}
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Key Features</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {displaySoftware.keyFeatures.map((feature, index) => (
//                       <div key={index} className="group p-3 rounded-md border border-gray-200 transition-all duration-300 hover:border-[#7cc6ee] hover:shadow-sm">
//                         <h4 className="font-semibold text-sm mb-1" style={{ color: '#1e2556' }}>{feature.heading}</h4>
//                         <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{feature.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Impact on Process Lifecycle */}
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Impact on Process Lifecycle</h3>
//                   <BlurredContent isBlurred={!isAuthenticated}>
//                     <div className="space-y-2">
//                       {displaySoftware.lifecycleStages
//                         .sort((a, b) => a.stage_number - b.stage_number)
//                         .map((stage, index) => (
//                           <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-md border border-gray-100 hover:shadow-sm transition-all duration-300">
//                             <div className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#1e2556' }}>
//                               {stage.stage_number}
//                             </div>
//                             <div className="flex-grow">
//                               <div className="flex items-center space-x-2 mb-1">
//                                 <h4 className="text-sm font-semibold" style={{ color: '#1e2556' }}>{stage.stage_name}</h4>
//                                 <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactLevelColor(stage.impact_level)}`}>
//                                   {stage.impact_level}
//                                 </span>
//                               </div>
//                               <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{stage.feature_impact_description}</p>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </BlurredContent>
//                 </div>
//               </div>
//             </section>

//             {/* Section 3: Pricing Plans */}
//             <section id="pricing" className="mb-8 scroll-mt-24">
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Pricing Plans</h2>
              
//               <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-3 rounded-md" style={{ backgroundColor: '#f5f7fa' }}>
//                     <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Pricing Information</h3>
//                     <div className="space-y-2">
//                       <div className="flex items-center space-x-2">
//                         <div className="text-xl font-bold" style={{ color: '#7cc6ee' }}>
//                           {getPricingTierDisplay(displaySoftware.pricingTier).symbol}
//                         </div>
//                         <div>
//                           <div className="text-sm font-semibold" style={{ color: '#1e2556' }}>
//                             {getPricingTierDisplay(displaySoftware.pricingTier).label}
//                           </div>
//                           <div className="text-xs" style={{ color: '#334155' }}>Pricing Tier</div>
//                         </div>
//                       </div>
                      
//                       {displaySoftware.startingPrice && displaySoftware.startingPrice !== '[Not Available]' && (
//                         <div className="text-xs">
//                           <span className="font-medium" style={{ color: '#334155' }}>Starting: </span>
//                           <span style={{ color: '#2d2d2d' }}>{displaySoftware.startingPrice}</span>
//                         </div>
//                       )}
                      
//                       {displaySoftware.pricingModel && (
//                         <div className="text-xs">
//                           <span className="font-medium block" style={{ color: '#334155' }}>Model</span>
//                           <span style={{ color: '#2d2d2d' }}>{displaySoftware.pricingModel}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="p-3 rounded-md text-white" style={{ backgroundColor: '#1e2556' }}>
//                     <h3 className="text-sm font-bold mb-3 text-white">Additional Information</h3>
//                     <div className="space-y-2">
//                       {displaySoftware.freeTrial && (
//                         <div className="flex items-start space-x-2">
//                           <svg className="w-4 h-4 text-[#7cc6ee] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           <div>
//                             <div className="font-medium text-white text-xs">Free Trial</div>
//                             <div className="text-gray-300 text-xs">{displaySoftware.freeTrial}</div>
//                           </div>
//                         </div>
//                       )}
                      
//                       {displaySoftware.customPricing && (
//                         <div className="flex items-start space-x-2">
//                           <svg className="w-4 h-4 text-[#7cc6ee] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           <div>
//                             <div className="font-medium text-white text-xs">Custom Pricing</div>
//                             <div className="text-gray-300 text-xs">{displaySoftware.customPricing}</div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 4: Reviews */}
//             <section id="reviews" className="mb-8 scroll-mt-24">
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>Reviews</h2>
              
//               <div className="space-y-4">
//                 {/* User Satisfaction */}
//                 <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <h3 className="text-sm font-bold text-green-800">User Satisfaction</h3>
//                   </div>
//                   <p className="text-xs text-green-700 leading-relaxed">{displaySoftware.userSatisfaction}</p>
//                 </div>

//                 {/* Top Use Cases */}
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Top Use Cases</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     {displaySoftware.topUseCases.map((useCase, index) => (
//                       <div key={index} className="p-2 rounded-md border" style={{ backgroundColor: '#f0f9ff', borderColor: '#7cc6ee' }}>
//                         <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{useCase}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Critical Opinions */}
//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>User Feedback</h3>
//                     <BlurredContent isBlurred={!isAuthenticated}>
//                       <div className="space-y-2">
//                         {displaySoftware.criticalOpinions.map((opinion, index) => (
//                           <div key={index} className="flex items-start space-x-2">
//                             <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                             </div>
//                             <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{opinion}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </BlurredContent>
//                   </div>

//                   {/* Best Known For */}
//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Best Known For</h3>
//                     <BlurredContent isBlurred={!isAuthenticated}>
//                       <div className="space-y-2">
//                         {displaySoftware.bestKnownFor.map((feature, index) => (
//                           <div key={index} className="flex items-start space-x-2">
//                             <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                             <p className="text-xs" style={{ color: '#2d2d2d' }}>{feature}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </BlurredContent>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Section 5: Sources */}
//             <section id="sources" className="mb-4 scroll-mt-24">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold" style={{ color: '#1e2556' }}>Sources</h2>
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowInfoTooltip(!showInfoTooltip)}
//                     className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <svg className="w-5 h-5" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                   </button>
                  
//                   {showInfoTooltip && (
//                     <div className="absolute right-0 top-8 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                       <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e2556' }}>Where did DreamLegal get this information?</h4>
//                       <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>
//                         This vendor profile was compiled by DreamLegal from information the vendor has made publicly available and the use of generative AI. DreamLegal neither endorses the information contained herein nor makes any warranties about its accuracy or completeness.
//                       </p>
//                       <button
//                         onClick={() => setShowInfoTooltip(false)}
//                         className="mt-3 text-xs font-medium hover:underline"
//                         style={{ color: '#7cc6ee' }}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                 {Object.entries(displaySoftware.sources).map(([category, links]) => (
//                   <div key={category} className="">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
//                       {category.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
//                         word.charAt(0).toUpperCase() + word.slice(1)
//                       ).join(' ')}
//                     </h3>
//                     <div className="space-y-1">
//                       {links.map((link, index) => (
//                         <Link 
//                           key={index}
//                           href={link}
//                           target="_blank"
//                           className="group flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-all duration-300"
//                         >
//                           <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                           </svg>
//                           <p className="text-xs font-medium break-all group-hover:text-[#1e2556] transition-colors duration-300" style={{ color: '#7cc6ee' }}>
//                             {link}
//                           </p>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Mobile Action Button - Removed, replaced with info box at top */}
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isMobile && sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* RFP Form Modal */}
//       {isRfpFormOpen && (
//         <CreateRfps 
//           isOpen={isRfpFormOpen} 
//           onClose={() => setIsRfpFormOpen(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default SoftwareDetailPage;
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateRfps from '@/components/landingPage/CreateRfp';
import { useAuth } from "@/context/authContext";

const SoftwareDetailPage = ({ slug }) => {
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullOverviewDesc, setShowFullOverviewDesc] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // New states for user toggle feature
  const [isUserUsing, setIsUserUsing] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [isTogglingUser, setIsTogglingUser] = useState(false);
  
  const { userId, vendorId, userType, isLoading: authLoading } = useAuth();
  const isAuthenticated = !!(userId || vendorId);

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
        
        // Fetch similar products
        if (data.similarProducts) {
          setSimilarProducts(data.similarProducts);
        }
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

  // Fetch user status when component mounts or auth changes
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!slug) return;
      
      try {
        const queryParams = userId ? `?userId=${userId}` : '';
        const response = await fetch(`/api/software/${slug}/user-status${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          setIsUserUsing(data.isUserUsing);
          setUserCount(data.userCount);
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    };

    fetchUserStatus();
  }, [slug, userId]);

  const handleUserToggle = async () => {
    // Check if it's a vendor
    if (vendorId && !userId) {
      alert('Vendors cannot save products');
      return;
    }

    if (!userId) {
      // You might want to show a login modal or redirect to login
      alert('Please login to mark yourself as a user');
      return;
    }

    setIsTogglingUser(true);
    
    try {
      const response = await fetch(`/api/software/${slug}/user-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          isUsing: !isUserUsing,
          userId: userId,
          vendorId: vendorId 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsUserUsing(data.isUserUsing);
        setUserCount(data.userCount);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to update status');
    } finally {
      setIsTogglingUser(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'features', 'pricing', 'reviews', 'media', 'faqs', 'sources', 'alternatives'];
      const scrollPosition = window.scrollY + 120;

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
      const offset = isMobile ? 150 : 100;
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

  const truncateByLines = (text, lineCount = 3, charPerLine = 80) => {
    const maxLength = lineCount * charPerLine;
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  const parseSocialMedia = (socialMedia) => {
    if (!socialMedia) return [];
    
    const socialLinks = [];
    const platforms = {
      'LinkedIn': { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', color: '#0077B5' },
      'Twitter': { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: '#1DA1F2' },
      'Instagram': { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z', color: '#E4405F' }
    };

    const entries = socialMedia.split(',').map(entry => entry.trim());
    
    entries.forEach(entry => {
      for (const [platform, data] of Object.entries(platforms)) {
        if (entry.includes(platform)) {
          let url = '';
          let handle = '';
          
          if (entry.includes('http')) {
            const urlMatch = entry.match(/https?:\/\/[^\s]+/);
            if (urlMatch) {
              url = urlMatch[0];
            }
          } else if (entry.includes('@')) {
            const handleMatch = entry.match(/@[\w]+/);
            if (handleMatch) {
              handle = handleMatch[0];
              if (platform === 'Twitter') {
                url = `https://twitter.com/${handle.substring(1)}`;
              } else if (platform === 'Instagram') {
                url = `https://instagram.com/${handle.substring(1)}`;
              }
            }
          }
          
          if (url) {
            socialLinks.push({
              platform,
              url,
              icon: data.icon,
              color: data.color
            });
          }
        }
      }
    });
    
    return socialLinks;
  };

  // Media Navigation
  const allMedia = [...(software?.images || []), ...(software?.videos || [])];
  const totalMedia = allMedia.length;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % totalMedia);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  const isVideo = (index) => {
    return index >= (software?.images || []).length;
  };

  // User Toggle Component
  const UserToggleButton = () => {
    // If it's a vendor, show a different UI
    if (vendorId && !userId) {
      return (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-center p-2 bg-gray-100 rounded-md">
            <svg className="w-5 h-5 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs text-gray-600">Vendors cannot save products</p>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-sm" style={{ color: '#1e2556' }}>{userCount}</span> {userCount === 1 ? 'person is' : 'people are'} using this product
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg p-3">
        <button
          onClick={handleUserToggle}
          disabled={isTogglingUser}
          className={`w-full flex items-center justify-between p-2 rounded-md transition-all duration-200 ${
            isUserUsing 
              ? 'bg-green-100 hover:bg-green-200 border border-green-300' 
              : 'bg-white hover:bg-gray-100 border border-gray-300'
          } ${isTogglingUser ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="flex items-center space-x-2">
            {isUserUsing ? (
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className={`text-sm font-medium ${isUserUsing ? 'text-green-700' : 'text-gray-700'}`}>
              {isUserUsing ? "I'm using this" : "I am a user"}
            </span>
          </span>
          <div className={`text-xs px-2 py-1 rounded-full ${
            isUserUsing ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {isUserUsing ? 'Yes' : 'No'}
          </div>
        </button>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-sm" style={{ color: '#1e2556' }}>{userCount}</span> {userCount === 1 ? 'person is' : 'people are'} using this product
          </p>
        </div>
      </div>
    );
  };

  if (loading || authLoading) {
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
    ...(allMedia.length > 0 ? [{ id: 'media', label: 'Media' }] : []),
    ...(software.faqs && software.faqs.length > 0 ? [{ id: 'faqs', label: 'FAQs' }] : []),
    { id: 'sources', label: 'Sources' },
    ...(similarProducts.length > 0 ? [{ id: 'alternatives', label: 'Alternatives' }] : [])
  ];

  const displaySoftware = software;
  const socialMediaLinks = parseSocialMedia(displaySoftware.socialMedia);
  const productTitle = displaySoftware.ogTitle || displaySoftware.productName;

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
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
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#f5f7fa', color: '#1e2556' }}>
                {formatCategoryName(displaySoftware.category)}
              </span>
            </div>

            {/* User Toggle Button - Below Category */}
            <div className="mb-3">
              <UserToggleButton />
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
                {socialMediaLinks.length > 0 && (
                  <div className="flex items-center space-x-2 px-2">
                    <span className="font-medium" style={{ color: '#334155' }}>Social:</span>
                    <div className="flex space-x-2">
                      {socialMediaLinks.map((social, index) => (
                        <Link
                          key={index}
                          href={social.url}
                          target="_blank"
                          className="hover:opacity-80 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill={social.color} viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </Link>
                      ))}
                    </div>
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
          <div className={`sticky ${isMobile ? 'top-0' : 'top-16'} bg-white shadow-md z-30 border-b border-gray-100`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-2">
              <div className={`flex ${isMobile ? 'overflow-x-auto scrollbar-hide' : 'space-x-1'}`}>
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
                      backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent'
                    }}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
              
              {/* Action Button */}
              {!isMobile && (
                <button 
                  onClick={() => setIsRfpFormOpen(true)}
                  className="group whitespace-nowrap px-4 py-1.5 bg-[#1e2556] 
                          text-white rounded-md font-medium hover:bg-[#0f1729] 
                          transition-all duration-200 flex items-center 
                          justify-center gap-2 shadow-sm hover:shadow-md text-xs
                          hover:scale-105 active:scale-95"
                >
                  Share Requirements
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content Sections with proper spacing */}
          <div className="p-4 md:p-6 max-w-6xl">
            {/* Mobile Info Box */}
            {isMobile && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={displaySoftware.logoUrl || '/placeholder-logo.png'}
                      alt={`${displaySoftware.productName} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm font-bold" style={{ color: '#1e2556' }}>{displaySoftware.productName}</h1>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                          style={{ backgroundColor: '#f5f7fa', color: '#1e2556' }}>
                      {formatCategoryName(displaySoftware.category)}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsRfpFormOpen(true)}
                  className="w-full mb-2 px-4 py-2 bg-[#1e2556] text-white rounded-md font-medium text-sm hover:bg-[#0f1729] transition-all duration-200"
                >
                  Share Requirements
                </button>
                
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
                  style={{ color: '#1e2556' }}
                >
                  View Company Details
                </button>
              </div>
            )}

            {/* Product Title */}
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>{productTitle}</h1>

            {/* Section 1: Overview */}
            <section id="overview" className="mb-8 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Overview</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Description</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                    {showFullOverviewDesc ? displaySoftware.briefDescription : truncateByLines(displaySoftware.briefDescription, 3)}
                  </p>
                  {displaySoftware.briefDescription.length > 240 && (
                    <button
                      onClick={() => setShowFullOverviewDesc(!showFullOverviewDesc)}
                      className="text-xs font-medium mt-2 hover:underline"
                      style={{ color: '#7cc6ee' }}
                    >
                      {showFullOverviewDesc ? 'Show less' : 'Show more'}
                    </button>
                  )}
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
            <section id="features" className="mb-8 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Features & Functionalities</h2>
              
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
            <section id="pricing" className="mb-8 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Pricing Plans</h2>
              
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
                    <h3 className="text-sm font-bold mb-3 text-white">Additional Information</h3>
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
            <section id="reviews" className="mb-8 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Reviews</h2>
              
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
                    <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>User Feedback</h3>
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

            {/* Section 5: Images and Videos */}
            {allMedia.length > 0 && (
  <section id="media" className="mb-8 scroll-mt-24">
    <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Media</h2>
    
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="relative">
        {/* Responsive grid: 1 column on mobile, 2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {allMedia.slice(currentMediaIndex, currentMediaIndex + (window.innerWidth >= 768 ? 2 : 1)).map((media, index) => (
            <div key={currentMediaIndex + index} className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
              {isVideo(currentMediaIndex + index) ? (
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={media}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={media}
                    alt={`${displaySoftware.productName} screenshot ${currentMediaIndex + index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows - show only if needed */}
        {totalMedia > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-md transition-all"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-md transition-all"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Compact Thumbnail Navigation - responsive */}
      {totalMedia > 1 && (
        <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setCurrentMediaIndex(index)}
              className={`relative flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-md overflow-hidden border-2 transition-all ${
                currentMediaIndex === index || (window.innerWidth >= 768 && Math.floor(currentMediaIndex / 2) === Math.floor(index / 2)) ? 'border-[#7cc6ee]' : 'border-gray-200'
              }`}
            >
              {isVideo(index) ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={media}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  </section>
)}
            {/* Section 6: FAQs */}
            {software.faqs && software.faqs.length > 0 && (
  <section id="faqs" className="mb-8 scroll-mt-24">
    <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} FAQs</h2>
    
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="space-y-2">
        {software.faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
          >
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-semibold pr-3" style={{ color: '#1e2556' }}>
                {faq.heading}
              </h3>
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  expandedFaq === index ? 'bg-[#7cc6ee] rotate-180' : 'bg-gray-200 hover:bg-[#7cc6ee]'
                }`}>
                  <svg
                    className={`w-3 h-3 transition-colors ${
                      expandedFaq === index ? 'text-white' : 'text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>
            
            {expandedFaq === index && (
              <div className="px-3 pb-3">
                <div className="border-t border-gray-100 pt-2">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}

            {/* Section 7: Sources */}
            <section id="sources" className="mb-8 scroll-mt-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: '#1e2556' }}>{displaySoftware.productName} Sources</h2>
                <div className="relative">
                  <button
                    onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" style={{ color: '#334155' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {showInfoTooltip && (
                    <div className="absolute right-0 top-8 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <h4 className="font-semibold text-sm mb-2" style={{ color: '#1e2556' }}>Where did DreamLegal get this information?</h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>
                        This vendor profile was compiled by DreamLegal from information the vendor has made publicly available and the use of generative AI. DreamLegal neither endorses the information contained herein nor makes any warranties about its accuracy or completeness.
                      </p>
                      <button
                        onClick={() => setShowInfoTooltip(false)}
                        className="mt-3 text-xs font-medium hover:underline"
                        style={{ color: '#7cc6ee' }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                {Object.entries(displaySoftware.sources).map(([category, links]) => (
                  <div key={category} className="">
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

            {/* Section 8: Similar Products */}
            {similarProducts.length > 0 && (
              <section id="alternatives" className="mb-4 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Alternatives</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                          <Image
                            src={product.logoUrl || '/placeholder-logo.png'}
                            alt={`${product.productName} logo`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold" style={{ color: '#1e2556' }}>{product.productName}</h3>
                          <p className="text-xs" style={{ color: '#334155' }}>{product.companyName}</p>
                        </div>
                      </div>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: '#2d2d2d' }}>
                        {product.description}
                      </p>
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-medium hover:underline"
                        style={{ color: '#7cc6ee' }}
                      >
                        <span>View Product</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
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

      {/* RFP Form Modal */}
      {isRfpFormOpen && (
        <CreateRfps 
          isOpen={isRfpFormOpen} 
          onClose={() => setIsRfpFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default SoftwareDetailPage;