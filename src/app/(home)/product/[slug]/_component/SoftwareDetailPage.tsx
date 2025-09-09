
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import CreateRfps from '@/components/landingPage/CreateRfp';
// import { useAuth } from "@/context/authContext";
// import FinalSection from "@/app/(home)/category/_components/FinalSection";
// import MentionedProductsSection from "@/components/MentionedProductsSection";

// import UserExperienceSection from '@/app/(home)/product/[slug]/_component/UserExperienceSection';
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
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [expandedFaq, setExpandedFaq] = useState(null);
//   const [copySuccess, setCopySuccess] = useState(false);
  
//   // New states for user toggle feature
//   const [isUserUsing, setIsUserUsing] = useState(false);
//   const [userCount, setUserCount] = useState(0);
//   const [isTogglingUser, setIsTogglingUser] = useState(false);
  
//   // New state for vendor comments tooltips
//   const [activeVendorComment, setActiveVendorComment] = useState(null);
  
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

//   // Handle browser back/forward navigation
//   useEffect(() => {
//     const handleHashChange = () => {
//       const hash = window.location.hash.slice(1);
//       if (hash) {
//         scrollToSection(hash);
//       }
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     window.addEventListener('popstate', handleHashChange);
    
//     return () => {
//       window.removeEventListener('hashchange', handleHashChange);
//       window.removeEventListener('popstate', handleHashChange);
//     };
//   }, [isMobile]);

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
        
//         // Fetch similar products
//         if (data.similarProducts) {
//           setSimilarProducts(data.similarProducts);
//         }
        
//         // Handle initial hash in URL after data is loaded
//         setTimeout(() => {
//           const hash = window.location.hash.slice(1);
//           if (hash) {
//             scrollToSection(hash);
//           }
//         }, 100);
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

//   // Review link generation functions
//   const generateReviewLink = () => {
//     const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
//     return `${baseUrl}/user-experiences?product=${slug}`;
//   };

//   const handleCopyReviewLink = async () => {
//     try {
//       const reviewLink = generateReviewLink();
//       await navigator.clipboard.writeText(reviewLink);
//       alert('Review link copied! Share this link to collect user experiences.');
//     } catch (err) {
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea');
//       textArea.value = generateReviewLink();
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//       alert('Review link copied! Share this link to collect user experiences.');
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = software?.isPremium 
//         ? ['value-metrics', 'overview','user-experiences', 'features', 'pricing', 'reviews',  'case-studies', 'media', 'faqs', 'sources', 'alternatives']
//         : ['overview', 'user-experiences','features', 'pricing', 'reviews', 'user-experiences', 'media', 'faqs', 'sources', 'alternatives'];
//       const scrollPosition = window.scrollY + 120;

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const offsetBottom = offsetTop + element.offsetHeight;
          
//           if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
//             setActiveSection(section);
            
//             // Update URL hash when scrolling naturally
//             const currentHash = window.location.hash.slice(1);
//             if (currentHash !== section) {
//               if (window.history.replaceState) {
//                 window.history.replaceState(null, null, `#${section}`);
//               }
//             }
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [software?.isPremium]);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offset = isMobile ? 220 : 100;
//       const elementPosition = element.offsetTop - offset;
//       window.scrollTo({
//         top: elementPosition,
//         behavior: 'smooth'
//       });
      
//       // Update the URL hash without triggering a page jump
//       if (window.history.pushState) {
//         window.history.pushState(null, null, `#${sectionId}`);
//       } else {
//         // Fallback for older browsers
//         window.location.hash = sectionId;
//       }
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

//   // Media Navigation
//   const allMedia = [...(software?.images || []), ...(software?.videos || [])];
//   const totalMedia = allMedia.length;

//   const nextMedia = () => {
//     setCurrentMediaIndex((prev) => (prev + 1) % totalMedia);
//   };

//   const prevMedia = () => {
//     setCurrentMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
//   };

//   const isVideo = (index) => {
//     return index >= (software?.images || []).length;
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

//   // Enhanced Vendor Comment Component with robust empty data checking
//   const VendorCommentTooltip = ({ section }) => {
//     // Early return if not premium
//     if (!software?.isPremium) return null;
    
//     // Get the vendor comments object
//     const vendorComments = software?.vendorComments;
    
//     // Check if vendorComments exists and is not empty
//     if (!vendorComments || Object.keys(vendorComments).length === 0) return null;
    
//     // Get the specific section comment
//     const comment = vendorComments[section];
    
//     // Check if comment exists
//     if (!comment) return null;
    
//     // Check if comment is an object
//     if (typeof comment !== 'object') return null;
    
//     // Robust check for actual content
//     const hasDescription = comment.description && 
//                           typeof comment.description === 'string' && 
//                           comment.description.trim().length > 0;
    
//     const hasPoints = comment.points && 
//                      Array.isArray(comment.points) && 
//                      comment.points.length > 0 &&
//                      comment.points.some(point => point && point.trim().length > 0);
    
//     // Only show if there's actual content
//     if (!hasDescription && !hasPoints) return null;

//     const handleClick = () => {
//       setActiveVendorComment(activeVendorComment === section ? null : section);
//     };

//     return (
//       <>
//         <div className="inline-flex items-center gap-2 mt-3">
//           <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1" style={{ minWidth: '40px' }}></div>
//           <button
//             onClick={handleClick}
//             className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors group flex items-center gap-1"
//           >
//             <svg className="w-3 h-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
//             </svg>
//            Click To View Vendor Insights
//           </button>
//           <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1" style={{ minWidth: '40px' }}></div>
//         </div>
//       </>
//     );
//   };

//   // Global Vendor Comment Modal
//   const VendorCommentModal = () => {
//     const comment = software?.vendorComments?.[activeVendorComment];
//     if (!activeVendorComment || !comment) return null;
  
//     return (
//       <>
//         {/* Backdrop */}
//         <div 
//           className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
//           onClick={() => setActiveVendorComment(null)}
//         />
        
//         {/* Modal */}
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//           <div 
//             className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden pointer-events-auto transform transition-all"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header - Updated with brand colors */}
//             <div className="p-6 relative overflow-hidden" style={{ backgroundColor: '#1e2556' }}>
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
//                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-white">Vendor Insights</h3>
//                       <p className="text-white/80 text-xs">Direct from {software.companyName}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setActiveVendorComment(null)}
//                     className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//                   >
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             {/* Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
//               {comment.description && (
//                 <div className="mb-4">
//                   <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{comment.description}</p>
//                 </div>
//               )}
              
//               {comment.points && comment.points.length > 0 && (
//                 <div className="space-y-3">
//                   <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#1e2556' }}>
//                     <svg className="w-4 h-4" style={{ color: '#7cc6ee' }} fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Key Points
//                   </h4>
//                   <div className="space-y-2">
//                     {comment.points.map((point, index) => (
//                       <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
//                         <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white" style={{ backgroundColor: '#7cc6ee' }}>
//                           <span className="text-xs font-bold">{index + 1}</span>
//                         </div>
//                         <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{point}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Footer */}
//             <div className="p-4 border-t border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
//               <p className="text-xs text-center" style={{ color: '#334155' }}>
//                 This information is provided directly by the vendor
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
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
//     ...(software.isPremium && software.valueMetrics?.length > 0 ? [{ id: 'value-metrics', label: 'Value Metrics' }] : []),
//     { id: 'overview', label: 'Overview' },
//     { id: 'user-experiences', label: 'User Experiences' },
//     { id: 'features', label: 'Features' },
//     { id: 'pricing', label: 'Pricing' },
//     { id: 'reviews', label: 'Reviews' },
  
//     ...(software.isPremium && software.caseStudies?.length > 0 ? [{ id: 'case-studies', label: 'Case Studies' }] : []),
//     ...(allMedia.length > 0 ? [{ id: 'media', label: 'Media' }] : []),
//     ...(software.faqs && software.faqs.length > 0 ? [{ id: 'faqs', label: 'FAQs' }] : []),
//     { id: 'sources', label: 'Sources' },
//     ...(similarProducts.length > 0 ? [{ id: 'alternatives', label: 'Alternatives' }] : [])
//   ];

  
//   const displaySoftware = software;
//   const socialMediaLinks = parseSocialMedia(displaySoftware.socialMedia);
//   const productTitle = displaySoftware.ogTitle || displaySoftware.productName;


//   const getMediaType = (url) => {
//     if (!url) return 'unknown';
    
//     const urlLower = url.toLowerCase();
    
//     // YouTube detection (various formats)
//     if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be') || urlLower.includes('youtube.com/embed/')) {
//       return 'youtube';
//     }
    
//     // Video file extensions
//     const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
//     if (videoExtensions.some(ext => urlLower.includes(ext))) {
//       return 'video';
//     }
    
//     // Image file extensions
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
//     if (imageExtensions.some(ext => urlLower.includes(ext))) {
//       return 'image';
//     }
    
//     // Default to image for unknown types (most cloud storage URLs)
//     return 'image';
//   };

//   // Convert YouTube URL to embed format
//   const getYouTubeEmbedUrl = (url) => {
//     if (!url) return '';
    
//     // Already an embed URL
//     if (url.includes('/embed/')) {
//       return url;
//     }
    
//     // Extract video ID from various YouTube URL formats
//     let videoId = '';
//     if (url.includes('youtube.com/watch?v=')) {
//       videoId = url.split('v=')[1]?.split('&')[0];
//     } else if (url.includes('youtu.be/')) {
//       videoId = url.split('youtu.be/')[1]?.split('?')[0];
//     }
    
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
//   };

//   // const totalMedia = allMedia.length;
//   const itemsPerPage = isMobile ? 1 : 2;

 

//   const renderMediaItem = (media, index) => {
//     const mediaType = getMediaType(media);
    
//     switch (mediaType) {
//       case 'youtube':
//         return (
//           <iframe
//             key={index}
//             src={getYouTubeEmbedUrl(media)}
//             className="w-full h-full rounded-lg"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title={`YouTube video ${index + 1}`}
//           />
//         );
      
//       case 'video':
//         return (
//           <video
//             key={index}
//             controls
//             className="w-full h-full object-contain rounded-lg"
//             src={media}
//             title={`Video ${index + 1}`}
//           >
//             Your browser does not support the video tag.
//           </video>
//         );
      
//       case 'image':
//       default:
//         return (
//           <img
//             key={index}
//             src={media}
//             alt={`${displaySoftware.productName} media ${index + 1}`}
//             className="w-full h-full object-contain rounded-lg"
//             loading="lazy"
//           />
//         );
//     }
//   };

//   const renderThumbnail = (media, index) => {
//     const mediaType = getMediaType(media);
    
//     switch (mediaType) {
//       case 'youtube':
//         return (
//           <div className="w-full h-full bg-red-500 flex items-center justify-center rounded">
//             <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//             </svg>
//           </div>
//         );
      
//       case 'video':
//         return (
//           <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded">
//             <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//         );
      
//       case 'image':
//       default:
//         return (
//           <img
//             src={media}
//             alt={`Thumbnail ${index + 1}`}
//             className="w-full h-full object-cover rounded"
//             loading="lazy"
//           />
//         );
//     }
//   };

//   const handleCopyUrl = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea');
//       textArea.value = window.location.href;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     }
//   };

//   // Special slugs configuration with their signup URLs
// const specialSlugsConfig = {
//   'zoho-contracts': 'https://store.zoho.in/ResellerCustomerSignUp.do?id=fa53a66d323346b43ea52de29f92eba1',
//   // Add more slugs and their signup URLs as needed
//   // 'another-slug': 'https://example.com/signup',
// };

// const isSpecialSlug = specialSlugsConfig.hasOwnProperty(slug);
// const signupUrl = specialSlugsConfig[slug];


//   return (
//     <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="flex relative">
//         {/* Compact Left Sidebar */}
//         <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300' : 'w-80 fixed left-4 top-16 bottom-4'} bg-white rounded-xl shadow-xl overflow-hidden flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} ${isMobile ? 'w-80' : ''}`}>
//           {/* Premium Tag */}
//           {displaySoftware.isPremium && displaySoftware.tag && (
//             <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-center">
//               <span className="text-white font-bold text-sm flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 {displaySoftware.tag}
//               </span>
//             </div>
//           )}
          
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
//               <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
//                     style={{ backgroundColor: '#f5f7fa', color: '#1e2556' }}>
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
//               {displaySoftware.isPremium && <VendorCommentTooltip section="sidebar" />}
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
          
//           {/* Desktop Navigation Header */}
// {!isMobile && (
//   <div className="sticky top-16 bg-white shadow-md z-9999 border-b border-gray-100">
//     <div className="flex items-center justify-between px-4 md:px-6 py-2">
//       <div className="flex space-x-1">
//         {sections.map((section, index) => (
//           <button
//             key={section.id}
//             onClick={() => scrollToSection(section.id)}
//             className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
//               activeSection === section.id
//                 ? 'text-white shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//             }`}
//             style={{
//               backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent'
//             }}
//           >
//             {section.label}
//           </button>
//         ))}
//       </div>
      
//       <div className="flex items-center gap-2">
//         <button
//           onClick={handleCopyUrl}
//           className="group whitespace-nowrap px-4 py-1.5 border border-[#1e2556]
//                      text-[#1e2556] rounded-md font-medium hover:bg-[#1e2556] hover:text-white
//                      transition-all duration-200 flex items-center
//                      justify-center gap-2 shadow-sm hover:shadow-md text-xs
//                      hover:scale-105 active:scale-95"
//         >
//           {copySuccess ? (
//             <>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               Copied!
//             </>
//           ) : (
//             <>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
//               </svg>
//               Share
//             </>
//           )}
//         </button>

       
        
//         {isSpecialSlug ? (
//           <a 
//             href={signupUrl}
//             target="_blank"
//             className="group whitespace-nowrap px-4 py-1.5 bg-[#1e2556]
//             text-white rounded-md font-medium hover:bg-[#0f1729]
//             transition-all duration-200 flex items-center
//             justify-center gap-2 shadow-sm hover:shadow-md text-xs
//             hover:scale-105 active:scale-95"
//           >
//            Get Started
//           </a>
//         ) : (
//           <button 
//             onClick={() => setIsRfpFormOpen(true)}
//             className="group whitespace-nowrap px-4 py-1.5 bg-[#1e2556]
//             text-white rounded-md font-medium hover:bg-[#0f1729]
//             transition-all duration-200 flex items-center
//             justify-center gap-2 shadow-sm hover:shadow-md text-xs
//             hover:scale-105 active:scale-95"
//           >
//             Share Requirements
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// )}

//           {/* Content Sections with proper spacing */}
//           <div className={`p-4 md:p-6 max-w-6xl ${isMobile ? 'pt-20' : ''}`}>
//             {/* Mobile Info Box */}
//             {isMobile && (
//               <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
//                 {displaySoftware.isPremium && displaySoftware.tag && (
//                   <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 mb-3">
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     {displaySoftware.tag}
//                   </div>
//                 )}
                
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
//                     <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
//                           style={{ backgroundColor: '#f5f7fa', color: '#1e2556' }}>
//                       {formatCategoryName(displaySoftware.category)}
//                     </span>
//                   </div>
//                 </div>
                
            

//                 {isSpecialSlug ? (
//                   <a 
//                     href={signupUrl}
//                     target="_blank"
//                     className="w-full mb-2 px-4 py-2 bg-[#1e2556] text-white rounded-md font-medium text-sm hover:bg-[#0f1729] transition-all duration-200 text-center block"
//                   >
//                     Get Started
//                   </a>
//                 ) : (
//                   <button 
//                     onClick={() => setIsRfpFormOpen(true)}
//                     className="w-full mb-2 px-4 py-2 bg-[#1e2556] text-white rounded-md font-medium text-sm hover:bg-[#0f1729] transition-all duration-200"
//                   >
//                     Share Requirements
//                   </button>
//                 )}
                
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
//                   style={{ color: '#1e2556' }}
//                 >
//                   View Company Details
//                 </button>

//                 <button
//                   onClick={handleCopyUrl}
//                   className="w-full mb-2 px-4 py-2 mt-2 border border-[#1e2556] text-[#1e2556] rounded-md font-medium text-sm hover:bg-[#1e2556] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
//                 >
//                   {copySuccess ? (
//                     <>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       Copied!
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
//                       </svg>
//                       Share Product
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}

//             {/* Product Title */}
//             <h1 className={`font-bold mb-4 ${isMobile ? 'text-lg' : 'text-2xl'}`} style={{ color: '#1e2556' }}>{productTitle}</h1>
            
//             {/* Mobile Navigation Header */}
//             {isMobile && (
//               <div className="fixed top-16 left-0 right-0 bg-white shadow-sm border-b border-gray-100 mb-6 z-50">
//                 <div className="px-4 py-3">
//                   <div className="relative">
//                     <div 
//                       className="overflow-x-auto"
//                       style={{ 
//                         width: '300px', // Fixed width to show ~3 headings
//                         maxWidth: 'calc(100vw - 32px)', // Never exceed screen width
//                         scrollbarWidth: 'none',
//                         msOverflowStyle: 'none'
//                       }}
//                     >
//                       <div className="flex gap-2" style={{ width: 'max-content' }}>
//                         {sections.map((section, index) => (
//                           <button
//                             key={section.id}
//                             onClick={() => scrollToSection(section.id)}
//                             className={`flex-shrink-0 px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
//                               activeSection === section.id
//                                 ? 'text-white shadow-sm'
//                                 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                             }`}
//                             style={{
//                               backgroundColor: activeSection === section.id ? '#7cc6ee' : 'transparent'
//                             }}
//                           >
//                             {section.label}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
                    
//                     {/* Scroll indicators */}
//                     <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white to-transparent pointer-events-none"></div>
                    
//                     {/* Scroll hint dots */}
//                     <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
//                       <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
//                       <div className="w-1 h-1 bg-gray-400 rounded-full opacity-40"></div>
//                       <div className="w-1 h-1 bg-gray-400 rounded-full opacity-20"></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Hide scrollbars */}
//                 <style jsx>{`
//                   div[style*="width: 300px"]::-webkit-scrollbar {
//                     display: none;
//                   }
//                 `}</style>
//               </div>
//             )}

//             {/* Premium Section: Value Metrics (Above Overview) */}
// {displaySoftware.isPremium && displaySoftware.valueMetrics?.length > 0 && (
//   <section id="value-metrics" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//     <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//       {displaySoftware.productName} Value Metrics
//     </h2>
    
//     {/* Simple metrics grid - no complex positioning */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {displaySoftware.valueMetrics.map((metric, index) => (
//         <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-bold" style={{ color: '#1e2556' }}>{metric.heading}</h3>
//             <div className="flex items-center gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 ${i < metric.rating ? 'text-[#7cc6ee]' : 'text-gray-300'}`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//           </div>
          
//           {/* Simple rating display */}
//           <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//             <div>
//               <p className="text-xs font-medium" style={{ color: '#334155' }}>Performance Score</p>
//               <div className="flex items-center gap-2 mt-1">
//                 <div className="text-2xl font-bold" style={{ color: '#7cc6ee' }}>{metric.rating}</div>
//                 <span className="text-sm" style={{ color: '#2d2d2d' }}>/ 5</span>
//               </div>
//             </div>
            
//             {/* Simple progress bar */}
//             <div className="flex-1 mx-4">
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="h-2 rounded-full transition-all duration-500" 
//                   style={{ 
//                     backgroundColor: '#7cc6ee', 
//                     width: `${(metric.rating / 5) * 100}%` 
//                   }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="text-sm font-bold" style={{ color: '#1e2556' }}>
//               {Math.round((metric.rating / 5) * 100)}%
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
    
//     {displaySoftware.isPremium && <VendorCommentTooltip section="value-metrics" />}
//   </section>
// )}

//             {/* Section 1: Overview */}
//             <section id="overview" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                 {displaySoftware.productName} Overview
//               </h2>
              
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
//                     <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.technologyStack}</p>
//                   </div>

//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-2" style={{ color: '#1e2556' }}>Deployment Options</h3>
//                     <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{displaySoftware.deploymentOptions}</p>
//                   </div>
//                 </div>
//               </div>
              
//               {displaySoftware.isPremium && <VendorCommentTooltip section="overview" />}
//             </section>
//             {/* Section 5: User Experiences */}
//             <UserExperienceSection
//               productId={displaySoftware.id}
//               productName={displaySoftware.productName}
//               slug={displaySoftware.slug}
//               isMobile={isMobile}
//             />


//             {/* Section 2: Features and Functionalities */}
//             <section id="features" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                 {displaySoftware.productName} Features & Functionalities
//               </h2>
              
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
//                   {displaySoftware.isPremium && <VendorCommentTooltip section="featuresandfunctionalities" />}
//                 </div>

//                 {/* Impact on Process Lifecycle */}
//                 <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                   <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>
//                     Impact on Process Lifecycle
//                   </h3>
//                   <div className="space-y-2">
//                     {displaySoftware.lifecycleStages
//                       .sort((a, b) => a.stage_number - b.stage_number)
//                       .map((stage, index) => (
//                         <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-md border border-gray-100 hover:shadow-sm transition-all duration-300">
//                           <div className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#1e2556' }}>
//                             {stage.stage_number}
//                           </div>
//                           <div className="flex-grow">
//                             <div className="flex items-center space-x-2 mb-1">
//                               <h4 className="text-sm font-semibold" style={{ color: '#1e2556' }}>{stage.stage_name}</h4>
//                               <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactLevelColor(stage.impact_level)}`}>
//                                 {stage.impact_level}
//                               </span>
//                             </div>
//                             <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{stage.feature_impact_description}</p>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                   {displaySoftware.isPremium && <VendorCommentTooltip section="impactonlifecycle" />}
//                 </div>
//               </div>
              
              
//             </section>

//             {/* Section 3: Pricing Plans */}
//             <section id="pricing" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                 {displaySoftware.productName} Pricing Plans
//               </h2>
              
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
              
//               {displaySoftware.isPremium && <VendorCommentTooltip section="pricing" />}
//             </section>

//             {/* Section 4: Reviews */}
//             <section id="reviews" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//               <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//                 {displaySoftware.productName} Reviews
//               </h2>
              
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
//                     <div className="space-y-2">
//                       {displaySoftware.criticalOpinions.map((opinion, index) => (
//                         <div key={index} className="flex items-start space-x-2">
//                           <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                           </div>
//                           <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>{opinion}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Best Known For */}
//                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                     <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>Best Known For</h3>
//                     <div className="space-y-2">
//                       {displaySoftware.bestKnownFor.map((feature, index) => (
//                         <div key={index} className="flex items-start space-x-2">
//                           <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           <p className="text-xs" style={{ color: '#2d2d2d' }}>{feature}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {displaySoftware.isPremium && <VendorCommentTooltip section="reviews" />}
//             </section>

            
//             {/* Premium Section: Case Studies (Below User Experiences) */}
//             {displaySoftware.isPremium && displaySoftware.caseStudies?.length > 0 && (
//   <section id="case-studies" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//     <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//       {displaySoftware.productName} Case Studies
//     </h2>
    
//     {/* Simple header card like other sections */}
//     <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1e2556' }}>
//           <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//         </div>
//         <div>
//           <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Customer Success Stories</h3>
//           <p className="text-xs" style={{ color: '#334155' }}>Real experiences from users</p>
//         </div>
//       </div>
//     </div>
    
//     {/* Simple case studies grid - no complex positioning */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {displaySoftware.caseStudies.map((study, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          
//           <div className="p-4">
//             {/* Simple user profile header */}
//             <div className="flex items-start gap-4 mb-4">
//               {study.photo ? (
//                 <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2" style={{ ringColor: '#7cc6ee' }}>
//                   <img
//                     src={study.photo}
//                     alt={study.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ring-2 text-white" style={{ backgroundColor: '#1e2556', ringColor: '#7cc6ee' }}>
//                   <span className="font-bold text-sm">
//                     {study.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               )}
//               <div className="flex-1">
//                 <h3 className="font-bold text-sm" style={{ color: '#1e2556' }}>{study.name}</h3>
//                 <p className="text-xs" style={{ color: '#334155' }}>{study.designation}</p>
//                 <p className="text-xs font-semibold" style={{ color: '#7cc6ee' }}>{study.companyName}</p>
//               </div>
//             </div>
            
//             {/* Simple testimonial */}
//             <div className="p-3 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//               <div className="flex items-start gap-2">
//                 <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#7cc6ee' }} fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                 </svg>
//                 <p className="text-xs leading-relaxed italic" style={{ color: '#2d2d2d' }}>
//                   "{study.comment}"
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
    
//     {displaySoftware.isPremium && <VendorCommentTooltip section="case-studies" />}
//   </section>
// )}

//             {/* Section 6: Images and Videos */}
//             {allMedia.length > 0 && (
//   <section id="media" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
//   <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
//     {displaySoftware.productName} Media
//   </h2>
  
//   <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//     <div className="relative">
//       {/* Responsive grid: 1 column on mobile, 2 on desktop */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
//         {allMedia.slice(currentMediaIndex, currentMediaIndex + itemsPerPage).map((media, index) => (
//           <div key={currentMediaIndex + index} className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
//             {renderMediaItem(media, currentMediaIndex + index)}
//           </div>
//         ))}
//       </div>
      
//       {/* Navigation Arrows - show only if needed */}
//       {totalMedia > itemsPerPage && (
//         <>
//           <button
//             onClick={prevMedia}
//             className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10"
//             aria-label="Previous media"
//           >
//             <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={nextMedia}
//             className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10"
//             aria-label="Next media"
//           >
//             <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </>
//       )}
//     </div>
    
//     {/* Compact Thumbnail Navigation - responsive */}
//     {totalMedia > 1 && (
//       <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
//         {allMedia.map((media, index) => {
//           const isActive = isMobile 
//             ? currentMediaIndex === index 
//             : Math.floor(currentMediaIndex / 2) === Math.floor(index / 2);
          
//           return (
//             <button
//               key={index}
//               onClick={() => setCurrentMediaIndex(isMobile ? index : Math.floor(index / 2) * 2)}
//               className={`relative flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
//                 isActive ? 'border-[#7cc6ee] shadow-md' : 'border-gray-200 hover:border-gray-300'
//               }`}
//               aria-label={`Go to media ${index + 1}`}
//             >
//               {renderThumbnail(media, index)}
//             </button>
//           );
//         })}
//       </div>
//     )}
    
//     {/* Media counter */}
//     <div className="text-center mt-2">
//       <span className="text-sm text-gray-500">
//         {isMobile ? currentMediaIndex + 1 : Math.floor(currentMediaIndex / 2) + 1} of {isMobile ? totalMedia : Math.ceil(totalMedia / 2)}
//       </span>
//     </div>
//   </div>
// </section>
//  )} 

// {/* Special Signup Section for certain slugs */}
// {isSpecialSlug && (
//   <section className="mb-8">
//     <div className="bg-gradient-to-r from-[#1e2556] to-[#0f1729] rounded-xl p-8 text-center text-white">
//       <div className="max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
//         <p className="text-lg mb-4 opacity-90">
//           Join thousands of professionals who trust {displaySoftware.productName} for their business needs.
//         </p>
//         <p className="text-sm mb-6 opacity-75 font-medium">
//           ✨ No credit card required
//         </p>
//         <a
//           href={signupUrl}
//           target="_blank"
//           className="inline-flex items-center gap-3 bg-white text-[#1e2556] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//           </svg>
//           Start Your Journey
//         </a>
//       </div>
//     </div>
//   </section>
// )}

//             {/* Section 7: FAQs */}
//              {software.faqs && software.faqs.length > 0 && ( 
//   <section id="faqs" className={`mb-8 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
//     <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} FAQs</h2>
    
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
//       <div className="space-y-2">
//         {software.faqs.map((faq, index) => (
//           <div 
//             key={index} 
//             className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
//           >
//             <button
//               onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
//               className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
//             >
//               <h3 className="text-sm font-semibold pr-3" style={{ color: '#1e2556' }}>
//                 {faq.heading}
//               </h3>
//               <div className="flex-shrink-0">
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
//                   expandedFaq === index ? 'bg-[#7cc6ee] rotate-180' : 'bg-gray-200 hover:bg-[#7cc6ee]'
//                 }`}>
//                   <svg
//                     className={`w-3 h-3 transition-colors ${
//                       expandedFaq === index ? 'text-white' : 'text-gray-600'
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </button>
            
//             {expandedFaq === index && (
//               <div className="px-3 pb-3">
//                 <div className="border-t border-gray-100 pt-2">
//                   <p className="text-sm leading-relaxed text-gray-700">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// )}

//             {/* Section 8: Sources */}
//             <section id="sources" className={`mb-8 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold" style={{ color: '#1e2556' }}>{displaySoftware.productName} Sources</h2>
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

//             {/* Section 9: Similar Products */}
//             {similarProducts.length > 0 && (
//               <section id="alternatives" className={`mb-4 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
//                 <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>{displaySoftware.productName} Alternatives</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {similarProducts.map((product, index) => (
//                     <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                       <div className="flex items-center space-x-3 mb-3">
//                         <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow-sm flex-shrink-0">
//                           <Image
//                             src={product.logoUrl || '/placeholder-logo.png'}
//                             alt={`${product.productName} logo`}
//                             fill
//                             className="object-contain p-1"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="text-sm font-semibold" style={{ color: '#1e2556' }}>{product.productName}</h3>
//                           <p className="text-xs" style={{ color: '#334155' }}>{product.companyName}</p>
//                         </div>
//                       </div>
//                       <p className="text-xs mb-3 line-clamp-2" style={{ color: '#2d2d2d' }}>
//                         {product.description}
//                       </p>
//                       <Link
//                         href={`/product/${product.slug}`}
//                         className="inline-flex items-center space-x-2 text-xs font-medium hover:underline"
//                         style={{ color: '#7cc6ee' }}
//                       >
//                         <span>View Product</span>
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}
//             <MentionedProductsSection productSlug={displaySoftware.slug} />
//             <FinalSection category={displaySoftware.category} />
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
      
//       {/* Vendor Comment Modal */}
//       <VendorCommentModal />
//     </div>
//   );
// };

// export default SoftwareDetailPage;
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateRfps from '@/components/landingPage/CreateRfp';
import { useAuth } from "@/context/authContext";
import FinalSection from "@/app/(home)/category/_components/FinalSection";
import MentionedProductsSection from "@/components/MentionedProductsSection";

import UserExperienceSection from '@/app/(home)/product/[slug]/_component/UserExperienceSection';

// ShareDropdown Component
interface ShareDropdownProps {
  productName: string;
  slug: string;
  onCopySuccess: () => void;
}

const ShareDropdown = ({ productName, slug, onCopySuccess }: ShareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/product/${slug}`;
  };

  const shareText = `Check out ${productName} - a comprehensive software solution`;
  const shareUrl = generateShareableLink();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onCopySuccess();
      setIsOpen(false);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onCopySuccess();
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: handleCopyLink,
      color: '#64748b'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        setIsOpen(false);
      },
      color: '#25D366'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#0A66C2'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        setIsOpen(false);
      },
      color: '#6B7280'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group whitespace-nowrap px-4 py-1.5 border border-[#1e2556]
                   text-[#1e2556] rounded-md font-medium hover:bg-[#1e2556] hover:text-white
                   transition-all duration-200 flex items-center
                   justify-center gap-2 shadow-sm hover:shadow-md text-xs
                   hover:scale-105 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        Share
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {shareOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <div style={{ color: option.color }}>
                  {option.icon}
                </div>
                <span className="text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile ShareDropdown (full width version)
const MobileShareDropdown = ({ productName, slug, onCopySuccess }: ShareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/product/${slug}`;
  };

  const shareText = `Check out ${productName} - a comprehensive software solution`;
  const shareUrl = generateShareableLink();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onCopySuccess();
      setIsOpen(false);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onCopySuccess();
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: handleCopyLink,
      color: '#64748b'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        setIsOpen(false);
      },
      color: '#25D366'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#0A66C2'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        setIsOpen(false);
      },
      color: '#6B7280'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2 px-4 py-2 mt-2 border border-[#1e2556] text-[#1e2556] rounded-md font-medium text-sm hover:bg-[#1e2556] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        Share Product
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {shareOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <div style={{ color: option.color }}>
                  {option.icon}
                </div>
                <span className="text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [copySuccess, setCopySuccess] = useState(false);
  
  // New states for user toggle feature
  const [isUserUsing, setIsUserUsing] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [isTogglingUser, setIsTogglingUser] = useState(false);
  
  // New state for vendor comments tooltips
  const [activeVendorComment, setActiveVendorComment] = useState(null);
  
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

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [isMobile]);

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
        
        // Handle initial hash in URL after data is loaded
        setTimeout(() => {
          const hash = window.location.hash.slice(1);
          if (hash) {
            scrollToSection(hash);
          }
        }, 100);
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

  const handleCopySuccess = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Review link generation functions
  const generateReviewLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/user-experiences?product=${slug}`;
  };

  const handleCopyReviewLink = async () => {
    try {
      const reviewLink = generateReviewLink();
      await navigator.clipboard.writeText(reviewLink);
      alert('Review link copied! Share this link to collect user experiences.');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateReviewLink();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Review link copied! Share this link to collect user experiences.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = software?.isPremium 
        ? ['value-metrics', 'overview','user-experiences', 'features', 'pricing', 'reviews',  'case-studies', 'media', 'faqs', 'sources', 'alternatives']
        : ['overview', 'user-experiences','features', 'pricing', 'reviews', 'user-experiences', 'media', 'faqs', 'sources', 'alternatives'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            
            // Update URL hash when scrolling naturally
            const currentHash = window.location.hash.slice(1);
            if (currentHash !== section) {
              if (window.history.replaceState) {
                window.history.replaceState(null, null, `#${section}`);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [software?.isPremium]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 220 : 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update the URL hash without triggering a page jump
      if (window.history.pushState) {
        window.history.pushState(null, null, `#${sectionId}`);
      } else {
        // Fallback for older browsers
        window.location.hash = sectionId;
      }
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

  // Enhanced Vendor Comment Component with robust empty data checking
  const VendorCommentTooltip = ({ section }) => {
    // Early return if not premium
    if (!software?.isPremium) return null;
    
    // Get the vendor comments object
    const vendorComments = software?.vendorComments;
    
    // Check if vendorComments exists and is not empty
    if (!vendorComments || Object.keys(vendorComments).length === 0) return null;
    
    // Get the specific section comment
    const comment = vendorComments[section];
    
    // Check if comment exists
    if (!comment) return null;
    
    // Check if comment is an object
    if (typeof comment !== 'object') return null;
    
    // Robust check for actual content
    const hasDescription = comment.description && 
                          typeof comment.description === 'string' && 
                          comment.description.trim().length > 0;
    
    const hasPoints = comment.points && 
                     Array.isArray(comment.points) && 
                     comment.points.length > 0 &&
                     comment.points.some(point => point && point.trim().length > 0);
    
    // Only show if there's actual content
    if (!hasDescription && !hasPoints) return null;

    const handleClick = () => {
      setActiveVendorComment(activeVendorComment === section ? null : section);
    };

    return (
      <>
        <div className="inline-flex items-center gap-2 mt-3">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1" style={{ minWidth: '40px' }}></div>
          <button
            onClick={handleClick}
            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors group flex items-center gap-1"
          >
            <svg className="w-3 h-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
           Click To View Vendor Insights
          </button>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1" style={{ minWidth: '40px' }}></div>
        </div>
      </>
    );
  };

  // Global Vendor Comment Modal
  const VendorCommentModal = () => {
    const comment = software?.vendorComments?.[activeVendorComment];
    if (!activeVendorComment || !comment) return null;
  
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveVendorComment(null)}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden pointer-events-auto transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Updated with brand colors */}
            <div className="p-6 relative overflow-hidden" style={{ backgroundColor: '#1e2556' }}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Vendor Insights</h3>
                      <p className="text-white/80 text-xs">Direct from {software.companyName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveVendorComment(null)}
                    className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              {comment.description && (
                <div className="mb-4">
                  <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{comment.description}</p>
                </div>
              )}
              
              {comment.points && comment.points.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#1e2556' }}>
                    <svg className="w-4 h-4" style={{ color: '#7cc6ee' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    Key Points
                  </h4>
                  <div className="space-y-2">
                    {comment.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white" style={{ backgroundColor: '#7cc6ee' }}>
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200" style={{ backgroundColor: '#f5f7fa' }}>
              <p className="text-xs text-center" style={{ color: '#334155' }}>
                This information is provided directly by the vendor
              </p>
            </div>
          </div>
        </div>
      </>
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
    ...(software.isPremium && software.valueMetrics?.length > 0 ? [{ id: 'value-metrics', label: 'Value Metrics' }] : []),
    { id: 'overview', label: 'Overview' },
    { id: 'user-experiences', label: 'User Experiences' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' },
  
    ...(software.isPremium && software.caseStudies?.length > 0 ? [{ id: 'case-studies', label: 'Case Studies' }] : []),
    ...(allMedia.length > 0 ? [{ id: 'media', label: 'Media' }] : []),
    ...(software.faqs && software.faqs.length > 0 ? [{ id: 'faqs', label: 'FAQs' }] : []),
    { id: 'sources', label: 'Sources' },
    ...(similarProducts.length > 0 ? [{ id: 'alternatives', label: 'Alternatives' }] : [])
  ];

  
  const displaySoftware = software;
  const socialMediaLinks = parseSocialMedia(displaySoftware.socialMedia);
  const productTitle = displaySoftware.ogTitle || displaySoftware.productName;


  const getMediaType = (url) => {
    if (!url) return 'unknown';
    
    const urlLower = url.toLowerCase();
    
    // YouTube detection (various formats)
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be') || urlLower.includes('youtube.com/embed/')) {
      return 'youtube';
    }
    
    // Video file extensions
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    if (videoExtensions.some(ext => urlLower.includes(ext))) {
      return 'video';
    }
    
    // Image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    if (imageExtensions.some(ext => urlLower.includes(ext))) {
      return 'image';
    }
    
    // Default to image for unknown types (most cloud storage URLs)
    return 'image';
  };

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // Already an embed URL
    if (url.includes('/embed/')) {
      return url;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // const totalMedia = allMedia.length;
  const itemsPerPage = isMobile ? 1 : 2;

 

  const renderMediaItem = (media, index) => {
    const mediaType = getMediaType(media);
    
    switch (mediaType) {
      case 'youtube':
        return (
          <iframe
            key={index}
            src={getYouTubeEmbedUrl(media)}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`YouTube video ${index + 1}`}
          />
        );
      
      case 'video':
        return (
          <video
            key={index}
            controls
            className="w-full h-full object-contain rounded-lg"
            src={media}
            title={`Video ${index + 1}`}
          >
            Your browser does not support the video tag.
          </video>
        );
      
      case 'image':
      default:
        return (
          <img
            key={index}
            src={media}
            alt={`${displaySoftware.productName} media ${index + 1}`}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
          />
        );
    }
  };

  const renderThumbnail = (media, index) => {
    const mediaType = getMediaType(media);
    
    switch (mediaType) {
      case 'youtube':
        return (
          <div className="w-full h-full bg-red-500 flex items-center justify-center rounded">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        );
      
      case 'video':
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      
      case 'image':
      default:
        return (
          <img
            src={media}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
        );
    }
  };

// Special slugs configuration with their signup URLs
const specialSlugsConfig = {
  'zoho-contracts': 'https://store.zoho.in/ResellerCustomerSignUp.do?id=fa53a66d323346b43ea52de29f92eba1',
  // Add more slugs and their signup URLs as needed
  // 'another-slug': 'https://example.com/signup',
};

const isSpecialSlug = specialSlugsConfig.hasOwnProperty(slug);
const signupUrl = specialSlugsConfig[slug];


  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="flex relative">
        {/* Compact Left Sidebar */}
        <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300' : 'w-80 fixed left-4 top-16 bottom-4'} bg-white rounded-xl shadow-xl overflow-hidden flex flex-col ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} ${isMobile ? 'w-80' : ''}`}>
          {/* Premium Tag */}
          {displaySoftware.isPremium && displaySoftware.tag && (
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-center">
              <span className="text-white font-bold text-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {displaySoftware.tag}
              </span>
            </div>
          )}
          
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
              {displaySoftware.isPremium && <VendorCommentTooltip section="sidebar" />}
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
          
          {/* Desktop Navigation Header */}
{!isMobile && (
  <div className="sticky top-16 bg-white shadow-md z-9999 border-b border-gray-100">
    <div className="flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex space-x-1">
        {sections.map((section, index) => (
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
      
      <div className="flex items-center gap-2">
        {copySuccess && (
          <span className="text-xs text-green-600 font-medium">Copied!</span>
        )}
        
        <ShareDropdown 
          productName={displaySoftware.productName}
          slug={displaySoftware.slug}
          onCopySuccess={handleCopySuccess}
        />
        
        {isSpecialSlug ? (
          <a 
            href={signupUrl}
            target="_blank"
            className="group whitespace-nowrap px-4 py-1.5 bg-[#1e2556]
            text-white rounded-md font-medium hover:bg-[#0f1729]
            transition-all duration-200 flex items-center
            justify-center gap-2 shadow-sm hover:shadow-md text-xs
            hover:scale-105 active:scale-95"
          >
           Get Started
          </a>
        ) : (
          <button 
            onClick={() => setIsRfpFormOpen(true)}
            className="group whitespace-nowrap px-4 py-1.5 bg-[#1e2556]
            text-white rounded-md font-medium hover:bg-[#0f1729]
            transition-all duration-200 flex items-center
            justify-center gap-2 shadow-sm hover:shadow-md text-xs
            hover:scale-105 active:scale-95"
          >
            Share Requirements
          </button>
        )}
      </div>
    </div>
  </div>
)}

          {/* Content Sections with proper spacing */}
          <div className={`p-4 md:p-6 max-w-6xl ${isMobile ? 'pt-20' : ''}`}>
            {/* Mobile Info Box */}
            {isMobile && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
                {displaySoftware.isPremium && displaySoftware.tag && (
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 mb-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {displaySoftware.tag}
                  </div>
                )}
                
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
                
                {isSpecialSlug ? (
                  <a 
                    href={signupUrl}
                    target="_blank"
                    className="w-full mb-2 px-4 py-2 bg-[#1e2556] text-white rounded-md font-medium text-sm hover:bg-[#0f1729] transition-all duration-200 text-center block"
                  >
                    Get Started
                  </a>
                ) : (
                  <button 
                    onClick={() => setIsRfpFormOpen(true)}
                    className="w-full mb-2 px-4 py-2 bg-[#1e2556] text-white rounded-md font-medium text-sm hover:bg-[#0f1729] transition-all duration-200"
                  >
                    Share Requirements
                  </button>
                )}
                
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
                  style={{ color: '#1e2556' }}
                >
                  View Company Details
                </button>

                <MobileShareDropdown 
                  productName={displaySoftware.productName}
                  slug={displaySoftware.slug}
                  onCopySuccess={handleCopySuccess}
                />
                
                {copySuccess && (
                  <div className="text-center mt-2">
                    <span className="text-xs text-green-600 font-medium">Copied!</span>
                  </div>
                )}
              </div>
            )}

            {/* Product Title */}
            <h1 className={`font-bold mb-4 ${isMobile ? 'text-lg' : 'text-2xl'}`} style={{ color: '#1e2556' }}>{productTitle}</h1>
            
            {/* Mobile Navigation Header */}
            {isMobile && (
              <div className="fixed top-16 left-0 right-0 bg-white shadow-sm border-b border-gray-100 mb-6 z-50">
                <div className="px-4 py-3">
                  <div className="relative">
                    <div 
                      className="overflow-x-auto"
                      style={{ 
                        width: '300px', // Fixed width to show ~3 headings
                        maxWidth: 'calc(100vw - 32px)', // Never exceed screen width
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      <div className="flex gap-2" style={{ width: 'max-content' }}>
                        {sections.map((section, index) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
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
                    </div>
                    
                    {/* Scroll indicators */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white to-transparent pointer-events-none"></div>
                    
                    {/* Scroll hint dots */}
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full opacity-40"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full opacity-20"></div>
                    </div>
                  </div>
                </div>
                
                {/* Hide scrollbars */}
                <style jsx>{`
                  div[style*="width: 300px"]::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              </div>
            )}

            {/* Premium Section: Value Metrics (Above Overview) */}
{displaySoftware.isPremium && displaySoftware.valueMetrics?.length > 0 && (
  <section id="value-metrics" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
    <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
      {displaySoftware.productName} Value Metrics
    </h2>
    
    {/* Simple metrics grid - no complex positioning */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displaySoftware.valueMetrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold" style={{ color: '#1e2556' }}>{metric.heading}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < metric.rating ? 'text-[#7cc6ee]' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          {/* Simple rating display */}
          <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
            <div>
              <p className="text-xs font-medium" style={{ color: '#334155' }}>Performance Score</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-2xl font-bold" style={{ color: '#7cc6ee' }}>{metric.rating}</div>
                <span className="text-sm" style={{ color: '#2d2d2d' }}>/ 5</span>
              </div>
            </div>
            
            {/* Simple progress bar */}
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ 
                    backgroundColor: '#7cc6ee', 
                    width: `${(metric.rating / 5) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="text-sm font-bold" style={{ color: '#1e2556' }}>
              {Math.round((metric.rating / 5) * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {displaySoftware.isPremium && <VendorCommentTooltip section="value-metrics" />}
  </section>
)}

            {/* Section 1: Overview */}
            <section id="overview" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                {displaySoftware.productName} Overview
              </h2>
              
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
              
              {displaySoftware.isPremium && <VendorCommentTooltip section="overview" />}
            </section>
            
            {/* Section 5: User Experiences */}
            <UserExperienceSection
              productId={displaySoftware.id}
              productName={displaySoftware.productName}
              slug={displaySoftware.slug}
              isMobile={isMobile}
            />

            {/* Section 2: Features and Functionalities */}
            <section id="features" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                {displaySoftware.productName} Features & Functionalities
              </h2>
              
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
                  {displaySoftware.isPremium && <VendorCommentTooltip section="featuresandfunctionalities" />}
                </div>

                {/* Impact on Process Lifecycle */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#1e2556' }}>
                    Impact on Process Lifecycle
                  </h3>
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
                  {displaySoftware.isPremium && <VendorCommentTooltip section="impactonlifecycle" />}
                </div>
              </div>
            </section>

            {/* Section 3: Pricing Plans */}
            <section id="pricing" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                {displaySoftware.productName} Pricing Plans
              </h2>
              
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
              
              {displaySoftware.isPremium && <VendorCommentTooltip section="pricing" />}
            </section>

            {/* Section 4: Reviews */}
            <section id="reviews" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                {displaySoftware.productName} Reviews
              </h2>
              
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
              
              {displaySoftware.isPremium && <VendorCommentTooltip section="reviews" />}
            </section>

            {/* Premium Section: Case Studies (Below User Experiences) */}
            {displaySoftware.isPremium && displaySoftware.caseStudies?.length > 0 && (
              <section id="case-studies" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                  {displaySoftware.productName} Case Studies
                </h2>
                
                {/* Simple header card like other sections */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1e2556' }}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: '#1e2556' }}>Customer Success Stories</h3>
                      <p className="text-xs" style={{ color: '#334155' }}>Real experiences from users</p>
                    </div>
                  </div>
                </div>
                
                {/* Simple case studies grid - no complex positioning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displaySoftware.caseStudies.map((study, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      
                      <div className="p-4">
                        {/* Simple user profile header */}
                        <div className="flex items-start gap-4 mb-4">
                          {study.photo ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2" style={{ ringColor: '#7cc6ee' }}>
                              <img
                                src={study.photo}
                                alt={study.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ring-2 text-white" style={{ backgroundColor: '#1e2556', ringColor: '#7cc6ee' }}>
                              <span className="font-bold text-sm">
                                {study.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-sm" style={{ color: '#1e2556' }}>{study.name}</h3>
                            <p className="text-xs" style={{ color: '#334155' }}>{study.designation}</p>
                            <p className="text-xs font-semibold" style={{ color: '#7cc6ee' }}>{study.companyName}</p>
                          </div>
                        </div>
                        
                        {/* Simple testimonial */}
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#7cc6ee' }} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-xs leading-relaxed italic" style={{ color: '#2d2d2d' }}>
                              "{study.comment}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {displaySoftware.isPremium && <VendorCommentTooltip section="case-studies" />}
              </section>
            )}

            {/* Section 6: Images and Videos */}
            {allMedia.length > 0 && (
              <section id="media" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1e2556' }}>
                  {displaySoftware.productName} Media
                </h2>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <div className="relative">
                    {/* Responsive grid: 1 column on mobile, 2 on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {allMedia.slice(currentMediaIndex, currentMediaIndex + itemsPerPage).map((media, index) => (
                        <div key={currentMediaIndex + index} className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                          {renderMediaItem(media, currentMediaIndex + index)}
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation Arrows - show only if needed */}
                    {totalMedia > itemsPerPage && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10"
                          aria-label="Previous media"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10"
                          aria-label="Next media"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Compact Thumbnail Navigation - responsive */}
                  {totalMedia > 1 && (
                    <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
                      {allMedia.map((media, index) => {
                        const isActive = isMobile 
                          ? currentMediaIndex === index 
                          : Math.floor(currentMediaIndex / 2) === Math.floor(index / 2);
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentMediaIndex(isMobile ? index : Math.floor(index / 2) * 2)}
                            className={`relative flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                              isActive ? 'border-[#7cc6ee] shadow-md' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            aria-label={`Go to media ${index + 1}`}
                          >
                            {renderThumbnail(media, index)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Media counter */}
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-500">
                      {isMobile ? currentMediaIndex + 1 : Math.floor(currentMediaIndex / 2) + 1} of {isMobile ? totalMedia : Math.ceil(totalMedia / 2)}
                    </span>
                  </div>
                </div>
              </section>
            )} 

            {/* Special Signup Section for certain slugs */}
            {isSpecialSlug && (
              <section className="mb-8">
                <div className="bg-gradient-to-r from-[#1e2556] to-[#0f1729] rounded-xl p-8 text-center text-white">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-4 opacity-90">
                      Join thousands of professionals who trust {displaySoftware.productName} for their business needs.
                    </p>
                    <p className="text-sm mb-6 opacity-75 font-medium">
                      ✨ No credit card required
                    </p>
                    <a
                      href={signupUrl}
                      target="_blank"
                      className="inline-flex items-center gap-3 bg-white text-[#1e2556] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Start Your Journey
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Section 7: FAQs */}
            {software.faqs && software.faqs.length > 0 && ( 
              <section id="faqs" className={`mb-8 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
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

            {/* Section 8: Sources */}
            <section id="sources" className={`mb-8 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
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

            {/* Section 9: Similar Products */}
            {similarProducts.length > 0 && (
              <section id="alternatives" className={`mb-4 ${isMobile ? 'scroll-mt-32' : 'scroll-mt-24'}`}>
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
            
            <MentionedProductsSection productSlug={displaySoftware.slug} />
            <FinalSection category={displaySoftware.category} />
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
      
      {/* Vendor Comment Modal */}
      <VendorCommentModal />
    </div>
  );
};

export default SoftwareDetailPage;