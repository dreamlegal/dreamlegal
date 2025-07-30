
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, Calendar, Clock, List, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle, ChevronDown, Heart, ThumbsUp, Lightbulb, Star, ExternalLink } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import FinalSection from "@/app/(home)/category/_components/FinalSection"

// // Enhanced blog styles with brand colors and product widgets
// const blogStyles = `
//   .blog-content {
//     font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     color: #2d2d2d;
//     line-height: 1.8;
//   }

//   .blog-content h1 {
//     font-size: 2.25rem;
//     font-weight: 700;
//     margin-top: 2rem;
//     margin-bottom: 1rem;
//     color: #1e2556;
//     scroll-margin-top: 80px;
//   }

//   .blog-content h2 {
//     font-size: 1.75rem;
//     font-weight: 600;
//     margin-top: 1.5rem;
//     margin-bottom: 0.75rem;
//     color: #1e2556;
//     scroll-margin-top: 80px;
//   }

//   .blog-content h3 {
//     font-size: 1.375rem;
//     font-weight: 600;
//     margin-top: 1.25rem;
//     margin-bottom: 0.75rem;
//     color: #1e2556;
//     scroll-margin-top: 80px;
//   }

//   .blog-content h4,
//   .blog-content h5,
//   .blog-content h6 {
//     color: #334155;
//     font-weight: bold;
//     margin-top: 1rem;
//     margin-bottom: 0.5rem;
//   }

//   .blog-content p {
//     margin-bottom: 1.25rem;
//     color: #2d2d2d;
//   }

//   .blog-content ul, .blog-content ol {
//     margin-bottom: 1.25rem;
//     padding-left: 1.5rem;
//   }

//   .blog-content ul li {
//     list-style-type: disc;
//     margin-bottom: 0.5rem;
//     color: #2d2d2d;
//   }

//   .blog-content ol li {
//     list-style-type: decimal;
//     margin-bottom: 0.5rem;
//     color: #2d2d2d;
//   }

//   .blog-content ul[data-type="taskList"] {
//     list-style: none;
//     padding-left: 0;
//   }

//   .blog-content ul[data-type="taskList"] li {
//     display: flex;
//     align-items: flex-start;
//     color: #2d2d2d;
//   }

//   .blog-content ul[data-type="taskList"] li > label {
//     margin-right: 0.5rem;
//     user-select: none;
//   }

//   .blog-content ul[data-type="taskList"] li > div {
//     flex: 1;
//   }

//   .blog-content a {
//     color: #7cc6ee;
//     text-decoration: underline;
//     text-underline-offset: 2px;
//     transition: color 0.2s;
//   }
  
//   .blog-content a:hover {
//     color: #1e2556;
//   }

//   .blog-content blockquote {
//     border-left: 4px solid #7cc6ee;
//     padding-left: 1rem;
//     margin: 1.5rem 0;
//     font-style: italic;
//     color: #334155;
//     background-color: #f5f7fa;
//     padding: 1rem;
//     border-radius: 0.5rem;
//   }

//   .blog-content img {
//     border-radius: 0.5rem;
//     max-width: 100%;
//     height: auto;
//     margin: 1.5rem 0;
//     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//   }

//   /* Enhanced image alignment classes */
//   .blog-content img.img-align-left, 
//   .blog-content img.blog-image.img-align-left {
//     float: left;
//     margin-right: 1.5rem;
//     margin-bottom: 1rem;
//     clear: left;
//   }

//   .blog-content img.img-align-center,
//   .blog-content img.blog-image.img-align-center {
//     display: block !important;
//     margin-left: auto !important;
//     margin-right: auto !important;
//     float: none !important;
//     clear: both !important;
//   }

//   .blog-content img.img-align-right,
//   .blog-content img.blog-image.img-align-right {
//     float: right;
//     margin-left: 1.5rem;
//     margin-bottom: 1rem;
//     clear: right;
//   }

//   /* Clear fix for paragraphs after floating images */
//   .blog-content p:after {
//     content: "";
//     display: table;
//     clear: both;
//   }

//   .blog-content table {
//     border-collapse: collapse;
//     table-layout: fixed;
//     width: 100%;
//     margin: 1rem 0;
//     overflow: hidden;
//     background-color: #f5f7fa;
//     border-radius: 0.5rem;
//   }

//   .blog-content table td,
//   .blog-content table th {
//     border: 2px solid #7cc6ee;
//     padding: 0.75rem;
//     position: relative;
//     vertical-align: top;
//     color: #2d2d2d;
//   }

//   .blog-content table th {
//     background-color: #1e2556;
//     color: white;
//     font-weight: bold;
//     font-size: 1rem;
//   }

//   .blog-content table td {
//     background-color: #f5f7fa;
//   }

//   .blog-content table tr:nth-child(even) td {
//     background-color: #ffffff;
//   }
  
//   .blog-content code {
//     background-color: #f5f7fa;
//     color: #1e2556;
//     padding: 0.25rem 0.375rem;
//     border-radius: 0.25rem;
//     font-family: 'Courier New', monospace;
//     font-size: 0.875em;
//     border: 1px solid #7cc6ee;
//   }

//   .blog-content pre {
//     background: #1e2556;
//     color: #ffffff;
//     font-family: 'Courier New', monospace;
//     padding: 1rem;
//     border-radius: 0.5rem;
//     overflow-x: auto;
//     margin: 1rem 0;
//     border: 2px solid #7cc6ee;
//   }

//   .blog-content pre code {
//     background: none;
//     color: inherit;
//     padding: 0;
//     border-radius: 0;
//     font-size: inherit;
//     border: none;
//   }

//   .blog-content hr {
//     margin: 2rem 0;
//     border: none;
//     border-top: 2px solid #7cc6ee;
//   }

//   .blog-content mark {
//     background-color: #7cc6ee;
//     color: #1e2556;
//     padding: 0.125rem 0.25rem;
//     border-radius: 0.25rem;
//   }

//   /* Product Widget Styling */
//   .blog-content .product-widget {
//     cursor: pointer;
//     transition: all 0.3s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .blog-content .product-widget:hover {
//     transform: translateY(-1px);
//   }

//   /* Inline Product Widget - Truly Inline */
//   .blog-content .product-widget-inline {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.375rem;
//     margin: 0 0.25rem;
//     padding: 0.25rem 0.5rem;
//     border-radius: 1rem;
//     border: 1px solid #7cc6ee;
//     background-color: #f5f7fa;
//     vertical-align: middle;
//     white-space: nowrap;
//     max-width: 180px;
//     line-height: 1;
//     height: 1.5rem;
//   }

//   .blog-content .product-widget-inline:hover {
//     border-color: #1e2556;
//     box-shadow: 0 1px 4px rgba(30, 37, 86, 0.15);
//   }

//   .blog-content .product-widget-inline-logo {
//     width: 1.25rem;
//     height: 1.25rem;
//     object-fit: contain;
//     border-radius: 0.25rem;
//     background-color: white;
//     padding: 0.125rem;
//     flex-shrink: 0;
//   }

//   .blog-content .product-widget-inline-name {
//     font-size: 0.8rem;
//     font-weight: 600;
//     color: #1e2556;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     flex: 1;
//     min-width: 0;
//   }

//   .blog-content .product-widget-inline-action {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 1rem;
//     height: 1rem;
//     background-color: #1e2556;
//     color: white;
//     border-radius: 50%;
//     transition: all 0.3s ease;
//     flex-shrink: 0;
//   }

//   .blog-content .product-widget-inline:hover .product-widget-inline-action {
//     background-color: #7cc6ee;
//     transform: scale(1.1);
//   }

//   /* End Product Widget - Compact Left-Aligned */
//   .blog-content .product-widget-end {
//     display: inline-block;
//     margin: 1rem 0;
//     padding: 0.75rem 1rem;
//     border-radius: 0.5rem;
//     border: 2px solid #7cc6ee;
//     background-color: #f5f7fa;
//     max-width: 280px;
//     width: auto;
//     vertical-align: top;
//   }

//   .blog-content .product-widget-end:hover {
//     border-color: #1e2556;
//     background-color: #ffffff;
//     box-shadow: 0 4px 12px rgba(30, 37, 86, 0.15);
//   }

//   .blog-content .product-widget-end-content {
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     position: relative;
//   }

//   .blog-content .product-widget-end-logo {
//     width: 2.5rem;
//     height: 2.5rem;
//     object-fit: contain;
//     border-radius: 0.375rem;
//     background-color: white;
//     padding: 0.25rem;
//     border: 1px solid #7cc6ee;
//     flex-shrink: 0;
//   }

//   .blog-content .product-widget-end-info {
//     flex: 1;
//     min-width: 0;
//   }

//   .blog-content .product-widget-end-name {
//     font-size: 0.9rem;
//     font-weight: 700;
//     color: #1e2556;
//     margin: 0 0 0.125rem 0;
//     line-height: 1.3;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   .blog-content .product-widget-end-company {
//     font-size: 0.75rem;
//     color: #334155;
//     margin: 0;
//     line-height: 1.3;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   .blog-content .product-widget-end-action {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 1.75rem;
//     height: 1.75rem;
//     background-color: #1e2556;
//     color: white;
//     border-radius: 50%;
//     transition: all 0.3s ease;
//     flex-shrink: 0;
//   }

//   .blog-content .product-widget-end:hover .product-widget-end-action {
//     background-color: #7cc6ee;
//     transform: scale(1.1);
//   }

//   /* Mobile responsiveness */
//   @media (max-width: 768px) {
//     .blog-content {
//       font-size: 0.9rem;
//       line-height: 1.6;
//     }
    
//     .blog-content h1 {
//       font-size: 1.5rem;
//       margin-top: 1.5rem;
//       margin-bottom: 0.75rem;
//     }

//     .blog-content h2 {
//       font-size: 1.25rem;
//       margin-top: 1.25rem;
//       margin-bottom: 0.5rem;
//     }

//     .blog-content h3 {
//       font-size: 1.125rem;
//       margin-top: 1rem;
//       margin-bottom: 0.5rem;
//     }

//     .blog-content p {
//       margin-bottom: 1rem;
//     }

//     .blog-content ul, .blog-content ol {
//       margin-bottom: 1rem;
//       padding-left: 1.25rem;
//     }

//     .blog-content img {
//       margin: 1rem 0;
//       box-shadow: none;
//     }

//     .blog-content blockquote {
//       padding: 0.75rem;
//       margin: 1rem 0;
//     }

//     .blog-content table th,
//     .blog-content table td {
//       padding: 0.5rem;
//       font-size: 0.875rem;
//     }

//     .blog-content .product-widget-inline-name {
//       font-size: 0.75rem;
//     }
    
//     .blog-content .product-widget-end {
//       max-width: 240px;
//     }
    
//     .blog-content .product-widget-end-name {
//       font-size: 0.85rem;
//     }
//   }

//   /* For larger screens */
//   @media (min-width: 769px) {
//     .blog-content {
//       font-size: 1.125rem;
//     }
//   }

//   /* Responsive adjustments for product widgets */
//   @media (max-width: 640px) {
//     .blog-content .product-widget-inline-name {
//       font-size: 0.75rem;
//     }
    
//     .blog-content .product-widget-end {
//       max-width: 240px;
//     }
    
//     .blog-content .product-widget-end-name {
//       font-size: 0.85rem;
//     }
//   }
// `;

// export default function BlogPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { slug } = params;
  
//   // Properly use the auth context
//   const { userId, vendorId } = useAuth();
  
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [reactions, setReactions] = useState({
//     like: 0,
//     love: 0,
//     insightful: 0,
//     helpful: 0
//   });
//   const [userReactions, setUserReactions] = useState(new Set());
//   const [loadingReactions, setLoadingReactions] = useState(false);
//   const [randomProducts, setRandomProducts] = useState([]);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [showScrollButton, setShowScrollButton] = useState(false);
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const contentRef = useRef(null);

//   console.log(slug);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const response = await fetch(`/api/blogs/slug/${slug}`);
        
//         if (response.status === 404) {
//           router.push('/404');
//           return;
//         }
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch blog');
//         }
        
//         const data = await response.json();
//         setBlog(data);
        
//         // Fetch reactions and random products after blog is loaded
//         if (data.id) {
//           fetchReactions(data.id);
//           fetchRandomProducts();
//           fetchUserReactions(data.id);
//         }
//       } catch (err) {
//         setError(err.message || 'An unexpected error occurred');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchBlog();
//   }, [slug, router]);

//   // Fetch reactions
//   const fetchReactions = async (blogId) => {
//     try {
//       const response = await fetch(`/api/blogs/${blogId}/reactions`);
//       if (response.ok) {
//         const data = await response.json();
//         setReactions(data);
//       }
//     } catch (err) {
//       console.error('Error fetching reactions:', err);
//     }
//   };

//   // Fetch user's existing reactions
//   const fetchUserReactions = async (blogId) => {
//     console.log('fetchUserReactions called with:', { 
//       blogId, 
//       userId: userId || 'null', 
//       vendorId: vendorId || 'null'
//     });

//     if (!userId && !vendorId) {
//       console.log('No user/vendor ID, user not authenticated');
//       setUserReactions(new Set());
//       return;
//     }

//     try {
//       const params = new URLSearchParams();
//       if (userId) {
//         params.append('userId', userId);
//         console.log('Using userId:', userId);
//       }
//       if (vendorId) {
//         params.append('vendorId', vendorId);
//         console.log('Using vendorId:', vendorId);
//       }

//       const url = `/api/blogs/${blogId}/reactions/user?${params}`;
//       console.log('Fetching user reactions from:', url);

//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('User reactions response:', data);
//         setUserReactions(new Set(data.reactions || []));
//       } else {
//         console.error('Failed to fetch user reactions:', response.status, response.statusText);
//         setUserReactions(new Set());
//       }
//     } catch (err) {
//       console.error('Error fetching user reactions:', err);
//       setUserReactions(new Set());
//     }
//   };

//   // Fetch user reactions when auth state changes
//   useEffect(() => {
//     console.log('Auth state changed, checking if we should fetch user reactions:', { 
//       blogId: blog?.id, 
//       userId, 
//       vendorId
//     });
    
//     if (blog?.id) {
//       if (userId || vendorId) {
//         console.log('Fetching user reactions for authenticated user');
//         fetchUserReactions(blog.id);
//       } else {
//         console.log('No user authenticated, clearing user reactions');
//         setUserReactions(new Set());
//       }
//     }
//   }, [userId, vendorId, blog?.id]);

//   const fetchRandomProducts = async () => {
//     try {
//       const response = await fetch('/api/products/random?count=4');
//       if (response.ok) {
//         const data = await response.json();
//         setRandomProducts(data.products);
//       }
//     } catch (err) {
//       console.error('Error fetching random products:', err);
//     }
//   };

//   // Scroll progress tracking
//   useEffect(() => {
//     if (!blog) return; // Don't set up scroll tracking until blog is loaded

//     const handleScroll = () => {
//       if (!contentRef.current) return;

//       try {
//         const scrollTop = window.scrollY;
//         const docHeight = contentRef.current.offsetHeight;
//         const winHeight = window.innerHeight;
        
//         if (docHeight <= winHeight) {
//           setScrollProgress(0);
//           setShowScrollButton(false);
//           return;
//         }

//         const scrollPercent = scrollTop / (docHeight - winHeight);
//         const scrollProgressValue = Math.min(Math.max(scrollPercent * 100, 0), 100);

//         setScrollProgress(scrollProgressValue);
//         setShowScrollButton(scrollProgressValue > 40); // Show after 40% scrolled
//       } catch (error) {
//         console.error('Error calculating scroll progress:', error);
//       }
//     };

//     // Initial call
//     handleScroll();

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [blog]);

//   // Handle reactions
//   const handleReaction = async (reactionType) => {
//     console.log('handleReaction called:', { reactionType, blogId: blog?.id, userId, vendorId, loadingReactions });
    
//     if (!blog?.id || (!userId && !vendorId) || loadingReactions) {
//       console.log('Cannot handle reaction:', { 
//         noBlogId: !blog?.id, 
//         noAuth: !userId && !vendorId, 
//         loading: loadingReactions 
//       });
//       return;
//     }

//     setLoadingReactions(true);
//     try {
//       const requestBody = {
//         reaction: reactionType,
//         ...(userId ? { userId } : {}),
//         ...(vendorId ? { vendorId } : {})
//       };
      
//       console.log('Sending reaction request:', requestBody);

//       const response = await fetch(`/api/blogs/${blog.id}/reactions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Reaction response:', result);
        
//         // Update local state
//         setReactions(prev => ({
//           ...prev,
//           [reactionType]: result.action === 'added' 
//             ? prev[reactionType] + 1 
//             : prev[reactionType] - 1
//         }));

//         // Update user reactions
//         setUserReactions(prev => {
//           const newSet = new Set(prev);
//           if (result.action === 'added') {
//             newSet.add(reactionType);
//           } else {
//             newSet.delete(reactionType);
//           }
//           console.log('Updated user reactions:', Array.from(newSet));
//           return newSet;
//         });
//       } else {
//         console.error('Reaction request failed:', response.status, response.statusText);
//       }
//     } catch (err) {
//       console.error('Error managing reaction:', err);
//     } finally {
//       setLoadingReactions(false);
//     }
//   };

//   // Scroll to next section
//   const scrollToNextSection = () => {
//     try {
//       window.scrollBy({
//         top: window.innerHeight * 0.8,
//         behavior: 'smooth'
//       });
//     } catch (error) {
//       console.error('Error scrolling:', error);
//       // Fallback: simple scroll
//       window.scrollBy(0, window.innerHeight * 0.8);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getReadingTime = (content) => {
//     if (!content) return '1 min read';
//     // Remove HTML tags
//     const text = content.replace(/<[^>]+>/g, '');
//     // Average reading speed: 200 words per minute
//     const words = text.split(/\s+/).length;
//     const minutes = Math.max(1, Math.round(words / 200));
//     return `${minutes} min read`;
//   };

//   const copyToClipboard = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const shareOnSocial = (platform) => {
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(blog?.title || 'Blog Post');
    
//     let shareUrl = '';
//     switch (platform) {
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
//         break;
//       case 'facebook':
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case 'linkedin':
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//       default:
//         return;
//     }
    
//     window.open(shareUrl, '_blank');
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-blue-600 font-medium">Loading article...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white py-10">
//         <div className="max-w-4xl mx-auto p-6">
//           <div className="bg-red-50 p-6 rounded-xl text-red-800 border border-red-200 shadow-sm">
//             <h2 className="text-xl font-bold mb-2">Error Loading Blog</h2>
//             <p>{error}</p>
//             <Link 
//               href="/blog" 
//               className="mt-4 inline-flex items-center text-red-700 hover:text-red-900"
//             >
//               <ArrowLeft size={16} className="mr-2" />
//               Back to blogs
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // Redirect to unpublished warning if not published
//   if (blog && !blog.published) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center p-6">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-xl w-full bg-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-lg text-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//           <h2 className="text-2xl font-bold mb-4 text-yellow-800">This blog post is not published yet</h2>
//           <p className="text-yellow-700 mb-6">
//             This blog is still in draft mode and is not available to the public. 
//             Only authors and administrators can view drafts.
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Link 
//               href="/blog" 
//               className="px-5 py-2.5 bg-white text-yellow-700 rounded-lg hover:bg-yellow-100 transition border border-yellow-300 shadow-sm"
//             >
//               Back to Blogs
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
//       <style dangerouslySetInnerHTML={{ __html: blogStyles }} />
      
//       {/* Progress Bar - Only show when blog is loaded */}
//       {!loading && blog && (
//         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//           <div 
//             className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-150 ease-out"
//             style={{ width: `${scrollProgress || 0}%` }}
//           />
//         </div>
//       )}

//       {/* Scroll Down Button - Only show when blog is loaded */}
//       {!loading && blog && (
//         <AnimatePresence>
//           {showScrollButton && (
//             <motion.button
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               onClick={scrollToNextSection}
//               className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown size={24} />
//             </motion.button>
//           )}
//         </AnimatePresence>
//       )}
      
//       <div ref={contentRef} className="max-w-7xl mx-auto p-3 md:p-6 pt-16 md:pt-24 pb-8 md:pb-16">
//         {/* Navigation */}
//         <motion.div 
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-4 md:mb-8"
//         >
//           <button 
//             onClick={() => window.history.back()} 
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base"
//           >
//             <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
//             <span>Back to Blogs</span>
//           </button>
//         </motion.div>
        
//         <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
//           {/* Main Blog Content */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="w-full lg:w-3/4"
//           >
//             {blog && (
//               <>
//                 {/* Blog Header */}
//                 <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
//                   <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">{blog.title}</h1>
                  
//                   <div className="flex flex-wrap gap-3 md:gap-4 text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
//                     <div className="flex items-center gap-1">
//                       <Calendar size={14} className="md:w-4 md:h-4" />
//                       <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock size={14} className="md:w-4 md:h-4" />
//                       <span>{getReadingTime(blog.content)}</span>
//                     </div>
//                   </div>
                  
//                   {blog.bannerImage && (
//                     <div className="w-full overflow-hidden rounded-lg md:rounded-xl md:shadow-md">
//                       <div className="w-full aspect-[16/9]">
//                         <img
//                           src={blog.bannerImage}
//                           alt={blog.title}
//                           className="w-full aspect-[16/9] object-cover"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Share buttons (mobile - top) */}
//                 <div className="lg:hidden md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-6 mb-4 md:mb-8">
//                   <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
//                     <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
//                     Share this article
//                   </h3>
//                   <div className="flex gap-3 mb-6">
//                     <button
//                       onClick={() => shareOnSocial('facebook')}
//                       className="bg-[#1877f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
//                       aria-label="Share on Facebook"
//                     >
//                       <Facebook size={18} className="md:w-5 md:h-5" />
//                     </button>
//                     <button
//                       onClick={() => shareOnSocial('twitter')}
//                       className="bg-[#1da1f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
//                       aria-label="Share on Twitter"
//                     >
//                       <Twitter size={18} className="md:w-5 md:h-5" />
//                     </button>
//                     <button
//                       onClick={() => shareOnSocial('linkedin')}
//                       className="bg-[#0a66c2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
//                       aria-label="Share on LinkedIn"
//                     >
//                       <Linkedin size={18} className="md:w-5 md:h-5" />
//                     </button>
//                     <button
//                       onClick={copyToClipboard}
//                       className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors relative"
//                       aria-label="Copy link"
//                     >
//                       {copied ? <CheckCircle size={18} className="text-green-600 md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
//                       {copied && (
//                         <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
//                           Copied!
//                         </span>
//                       )}
//                     </button>
//                   </div>
                  
//                   {/* Table of Contents - Mobile */}
//                   {blog && blog.tocItems && blog.tocItems.length > 0 && (
//                     <div className="border-t pt-4">
//                       <div className="flex items-center gap-2 mb-3 text-gray-900 font-semibold text-sm">
//                         <List size={16} />
//                         <h3>Table of Contents</h3>
//                       </div>
                      
//                       <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin">
//                         <ul className="space-y-2">
//                           {blog.tocItems.map((item, index) => (
//                             <li 
//                               key={index}
//                               className={`
//                                 ${item.level === 1 ? 'font-medium text-sm border-l-3 border-blue-500 pl-3' : 
//                                   item.level === 2 ? 'ml-3 text-xs border-l-2 border-blue-300 pl-3' : 
//                                   'ml-6 text-xs text-gray-600 pl-3'}
//                                 transition-all duration-200 hover:border-opacity-100
//                                 ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
//                               `}
//                             >
//                               <a 
//                                 href={`#${item.slug}`} 
//                                 className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
//                               >
//                                 {item.content}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Blog Content */}
//                 <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
//                   <div 
//                     className="blog-content"
//                     dangerouslySetInnerHTML={{ __html: blog.content }}
//                   />
//                 </div>

//                 {/* Reactions Section */}
//                 <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
//                   <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">How was this article?</h3>
                  
//                   <div className="flex flex-wrap gap-3 md:gap-4">
//                     {[
//                       { type: 'like', icon: ThumbsUp, label: 'Helpful', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
//                       { type: 'love', icon: Heart, label: 'Love it', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
//                       { type: 'insightful', icon: Lightbulb, label: 'Insightful', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
//                       { type: 'helpful', icon: Star, label: 'Excellent', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' }
//                     ].map(({ type, icon: Icon, label, color, hoverColor }) => (
//                       <button
//                         key={type}
//                         onClick={() => handleReaction(type)}
//                         disabled={loadingReactions || (!userId && !vendorId)}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
//                           userReactions && userReactions.has(type)
//                             ? `${color} text-white border-transparent`
//                             : `bg-white text-gray-700 border-gray-300 ${hoverColor.replace('bg-', 'hover:border-')} hover:text-white`
//                         } ${loadingReactions || (!userId && !vendorId) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//                       >
//                         <Icon size={18} />
//                         <span className="text-sm font-medium">{label}</span>
//                         {reactions[type] > 0 && (
//                           <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
//                             {reactions[type] || 0}
//                           </span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
                  
//                   {(!userId && !vendorId) ? (
//                     <p className="text-sm text-gray-500 mt-3">
//                       <Link href="/login" className="text-blue-600 hover:underline">
//                         Sign in
//                       </Link> to react to this article
//                     </p>
//                   ) : (
//                     <p className="text-sm text-green-600 mt-3">
//                       ✓ You can react to this article
//                     </p>
//                   )}
//                 </div>
                
//                 {/* Reference Links */}
//                 {blog.refLinks && blog.refLinks.length > 0 && (
//                   <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
//                     <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">References</h3>
//                     <ul className="space-y-2 md:space-y-3">
//                       {blog.refLinks.map((link, index) => (
//                         <li key={index} className="flex items-start p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl hover:bg-gray-100 transition-colors">
//                           <span className="mr-2 md:mr-3 text-blue-500 mt-1">•</span>
//                           <div>
//                             <p className="font-medium text-gray-900 text-sm md:text-base">{link.title}</p>
//                             <a
//                               href={link.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:underline text-xs md:text-sm break-all"
//                             >
//                               {link.url}
//                             </a>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </>
//             )}
//           </motion.div>
          
//           {/* Sidebar */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="w-full lg:w-1/4"
//           >
//             <div className="sticky top-20 md:top-24 space-y-4 md:space-y-6">
//               {/* One-line sharing section */}
//               <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg relative">
//                 <div className="flex items-center justify-between">
//                   <button 
//                     onClick={() => setShowShareOptions(!showShareOptions)}
//                     className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
//                   >
//                     <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
//                     <span>Share </span>
//                   </button>
                  
//                   <div className="flex gap-1 md:gap-2">
//                     <button 
//                       onClick={() => shareOnSocial('facebook')} 
//                       className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
//                     >
//                       <Facebook size={13} className="md:w-[15px] md:h-[15px]" />
//                     </button>
//                     <button 
//                       onClick={() => shareOnSocial('twitter')} 
//                       className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
//                     >
//                       <Twitter size={13} className="md:w-[15px] md:h-[15px]" />
//                     </button>
//                     <button 
//                       onClick={() => shareOnSocial('linkedin')} 
//                       className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
//                     >
//                       <Linkedin size={13} className="md:w-[15px] md:h-[15px]" />
//                     </button>
//                     <button 
//                       onClick={copyToClipboard} 
//                       className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       {copied ? <CheckCircle size={13} className="text-green-600 md:w-[15px] md:h-[15px]" /> : <Copy size={13} className="md:w-[15px] md:h-[15px]" />}
//                     </button>
//                   </div>
//                 </div>
                
//                 {showShareOptions && (
//                   <div className="absolute top-full left-0 right-0 mt-2 bg-white p-3 md:p-4 rounded-xl shadow-lg z-10 space-y-2">
//                     <button
//                       onClick={() => shareOnSocial('facebook')}
//                       className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
//                     >
//                       <Facebook size={16} className="text-[#1877f2] md:w-[18px] md:h-[18px]" />
//                       <span>Share on Facebook</span>
//                     </button>
//                     <button
//                       onClick={() => shareOnSocial('twitter')}
//                       className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
//                     >
//                       <Twitter size={16} className="text-[#1da1f2] md:w-[18px] md:h-[18px]" />
//                       <span>Share on Twitter</span>
//                     </button>
//                     <button
//                       onClick={() => shareOnSocial('linkedin')}
//                       className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
//                     >
//                       <Linkedin size={16} className="text-[#0a66c2] md:w-[18px] md:h-[18px]" />
//                       <span>Share on LinkedIn</span>
//                     </button>
//                     <button
//                       onClick={copyToClipboard}
//                       className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
//                     >
//                       {copied ? <CheckCircle size={16} className="text-green-600 md:w-[18px] md:h-[18px]" /> : <Copy size={16} className="md:w-[18px] md:h-[18px]" />}
//                       <span>{copied ? 'Link copied!' : 'Copy link'}</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Beautiful scrollable table of contents - Desktop only */}
//               {blog && blog.tocItems && blog.tocItems.length > 0 && (
//                 <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
//                   <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
//                     <List size={18} className="md:w-5 md:h-5" />
//                     <h3>Table of Contents</h3>
//                   </div>
                  
//                   <div className="max-h-80 md:max-h-96 overflow-y-auto pr-2 scrollbar-thin">
//                     <ul className="space-y-2 md:space-y-3">
//                       {blog.tocItems.map((item, index) => (
//                         <li 
//                           key={index}
//                           className={`
//                             ${item.level === 1 ? 'font-medium text-sm md:text-base border-l-4 border-blue-500 pl-3' : 
//                               item.level === 2 ? 'ml-3 text-xs md:text-sm border-l-2 border-blue-300 pl-3' : 
//                               'ml-6 text-xs md:text-sm text-gray-600 pl-3'}
//                             transition-all duration-200 hover:border-opacity-100
//                             ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
//                           `}
//                         >
//                           <a 
//                             href={`#${item.slug}`} 
//                             className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
//                           >
//                             {item.content}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}

//               {/* Related Products Section */}
//               {randomProducts.length > 0 && (
//                 <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
//                   <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
//                     <ExternalLink size={18} className="md:w-5 md:h-5" />
//                     <h3>Related Products</h3>
//                   </div>
                  
//                   <div className="space-y-3">
//                     {randomProducts.map((product) => (
//                       <Link
//                         key={product.id}
//                         href={`/product/${product.slug}`}
//                         target="_blank"
//                         className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={product.logoUrl || '/default-product-logo.png'}
//                             alt={product.productName}
//                             className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-gray-200"
//                             onError={(e) => {
//                               e.target.src = '/default-product-logo.png';
//                             }}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
//                               {product.productName}
//                             </h4>
//                             <p className="text-xs text-gray-600 truncate">
//                               {product.companyName}
//                             </p>
//                             <div className="flex items-center gap-2 mt-1">
//                               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                                 {product.category}
//                               </span>
//                               {product.pricingTier && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
//                                   {product.pricingTier}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//         <FinalSection category={blog.category} />
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, List, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle, ChevronDown, Heart, ThumbsUp, Lightbulb, Star, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import FinalSection from "@/app/(home)/category/_components/FinalSection"

// Enhanced blog styles with brand colors and product widgets
const blogStyles = `
  .blog-content {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #2d2d2d;
    line-height: 1.8;
  }

  .blog-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1e2556;
    scroll-margin-top: 80px;
  }

  .blog-content h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #1e2556;
    scroll-margin-top: 80px;
  }

  .blog-content h3 {
    font-size: 1.375rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    color: #1e2556;
    scroll-margin-top: 80px;
  }

  .blog-content h4,
  .blog-content h5,
  .blog-content h6 {
    color: #334155;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .blog-content p {
    margin-bottom: 1.25rem;
    color: #2d2d2d;
  }

  .blog-content ul, .blog-content ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  .blog-content ul li {
    list-style-type: disc;
    margin-bottom: 0.5rem;
    color: #2d2d2d;
  }

  .blog-content ol li {
    list-style-type: decimal;
    margin-bottom: 0.5rem;
    color: #2d2d2d;
  }

  .blog-content ul[data-type="taskList"] {
    list-style: none;
    padding-left: 0;
  }

  .blog-content ul[data-type="taskList"] li {
    display: flex;
    align-items: flex-start;
    color: #2d2d2d;
  }

  .blog-content ul[data-type="taskList"] li > label {
    margin-right: 0.5rem;
    user-select: none;
  }

  .blog-content ul[data-type="taskList"] li > div {
    flex: 1;
  }

  .blog-content a {
    color: #7cc6ee;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }
  
  .blog-content a:hover {
    color: #1e2556;
  }

  .blog-content blockquote {
    border-left: 4px solid #7cc6ee;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #334155;
    background-color: #f5f7fa;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .blog-content img {
    border-radius: 0.5rem;
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* Enhanced image alignment classes */
  .blog-content img.img-align-left, 
  .blog-content img.blog-image.img-align-left {
    float: left;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
    clear: left;
  }

  .blog-content img.img-align-center,
  .blog-content img.blog-image.img-align-center {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
    float: none !important;
    clear: both !important;
  }

  .blog-content img.img-align-right,
  .blog-content img.blog-image.img-align-right {
    float: right;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    clear: right;
  }

  /* Clear fix for paragraphs after floating images */
  .blog-content p:after {
    content: "";
    display: table;
    clear: both;
  }

  .blog-content table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 1rem 0;
    overflow: hidden;
    background-color: #f5f7fa;
    border-radius: 0.5rem;
  }

  .blog-content table td,
  .blog-content table th {
    border: 2px solid #7cc6ee;
    padding: 0.75rem;
    position: relative;
    vertical-align: top;
    color: #2d2d2d;
  }

  .blog-content table th {
    background-color: #1e2556;
    color: white;
    font-weight: bold;
    font-size: 1rem;
  }

  .blog-content table td {
    background-color: #f5f7fa;
  }

  .blog-content table tr:nth-child(even) td {
    background-color: #ffffff;
  }
  
  .blog-content code {
    background-color: #f5f7fa;
    color: #1e2556;
    padding: 0.25rem 0.375rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
    border: 1px solid #7cc6ee;
  }

  .blog-content pre {
    background: #1e2556;
    color: #ffffff;
    font-family: 'Courier New', monospace;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
    border: 2px solid #7cc6ee;
  }

  .blog-content pre code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    border: none;
  }

  .blog-content hr {
    margin: 2rem 0;
    border: none;
    border-top: 2px solid #7cc6ee;
  }

  .blog-content mark {
    background-color: #7cc6ee;
    color: #1e2556;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }

  /* Product Widget Styling */
  .blog-content .product-widget {
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .blog-content .product-widget:hover {
    transform: translateY(-1px);
  }

  /* Inline Product Widget - Truly Inline */
  .blog-content .product-widget-inline {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    border: 1px solid #7cc6ee;
    background-color: #f5f7fa;
    vertical-align: middle;
    white-space: nowrap;
    max-width: 180px;
    line-height: 1;
    height: 1.5rem;
  }

  .blog-content .product-widget-inline:hover {
    border-color: #1e2556;
    box-shadow: 0 1px 4px rgba(30, 37, 86, 0.15);
  }

  .blog-content .product-widget-inline-logo {
    width: 1.25rem;
    height: 1.25rem;
    object-fit: contain;
    border-radius: 0.25rem;
    background-color: white;
    padding: 0.125rem;
    flex-shrink: 0;
  }

  .blog-content .product-widget-inline-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1e2556;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  .blog-content .product-widget-inline-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    background-color: #1e2556;
    color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .blog-content .product-widget-inline:hover .product-widget-inline-action {
    background-color: #7cc6ee;
    transform: scale(1.1);
  }

  /* End Product Widget - Compact Left-Aligned */
  .blog-content .product-widget-end {
    display: inline-block;
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid #7cc6ee;
    background-color: #f5f7fa;
    max-width: 280px;
    width: auto;
    vertical-align: top;
  }

  .blog-content .product-widget-end:hover {
    border-color: #1e2556;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(30, 37, 86, 0.15);
  }

  .blog-content .product-widget-end-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
  }

  .blog-content .product-widget-end-logo {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    border-radius: 0.375rem;
    background-color: white;
    padding: 0.25rem;
    border: 1px solid #7cc6ee;
    flex-shrink: 0;
  }

  .blog-content .product-widget-end-info {
    flex: 1;
    min-width: 0;
  }

  .blog-content .product-widget-end-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e2556;
    margin: 0 0 0.125rem 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .blog-content .product-widget-end-company {
    font-size: 0.75rem;
    color: #334155;
    margin: 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .blog-content .product-widget-end-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    background-color: #1e2556;
    color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .blog-content .product-widget-end:hover .product-widget-end-action {
    background-color: #7cc6ee;
    transform: scale(1.1);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .blog-content {
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .blog-content h1 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .blog-content h2 {
      font-size: 1.25rem;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .blog-content h3 {
      font-size: 1.125rem;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    .blog-content p {
      margin-bottom: 1rem;
    }

    .blog-content ul, .blog-content ol {
      margin-bottom: 1rem;
      padding-left: 1.25rem;
    }

    .blog-content img {
      margin: 1rem 0;
      box-shadow: none;
    }

    .blog-content blockquote {
      padding: 0.75rem;
      margin: 1rem 0;
    }

    .blog-content table th,
    .blog-content table td {
      padding: 0.5rem;
      font-size: 0.875rem;
    }

    .blog-content .product-widget-inline-name {
      font-size: 0.75rem;
    }
    
    .blog-content .product-widget-end {
      max-width: 240px;
    }
    
    .blog-content .product-widget-end-name {
      font-size: 0.85rem;
    }
  }

  /* For larger screens */
  @media (min-width: 769px) {
    .blog-content {
      font-size: 1.125rem;
    }
  }

  /* Responsive adjustments for product widgets */
  @media (max-width: 640px) {
    .blog-content .product-widget-inline-name {
      font-size: 0.75rem;
    }
    
    .blog-content .product-widget-end {
      max-width: 240px;
    }
    
    .blog-content .product-widget-end-name {
      font-size: 0.85rem;
    }
  }
`;

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  // Properly use the auth context
  const { userId, vendorId } = useAuth();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    insightful: 0,
    helpful: 0
  });
  const [userReactions, setUserReactions] = useState(new Set());
  const [loadingReactions, setLoadingReactions] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const contentRef = useRef(null);

  console.log(slug);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blogs/slug/${slug}`);
        
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        
        const data = await response.json();
        setBlog(data);
        
        // Fetch reactions and random products after blog is loaded
        if (data.id) {
          fetchReactions(data.id);
          fetchRandomProducts();
          fetchUserReactions(data.id);
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlog();
  }, [slug, router]);

  // Fetch reactions with better error handling
  const fetchReactions = async (blogId) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/reactions`);
      if (response.ok) {
        const data = await response.json();
        setReactions(data);
      } else {
        console.warn('Failed to fetch reactions, using defaults');
        setReactions({
          like: 0,
          love: 0,
          insightful: 0,
          helpful: 0
        });
      }
    } catch (err) {
      console.error('Error fetching reactions:', err);
      setReactions({
        like: 0,
        love: 0,
        insightful: 0,
        helpful: 0
      });
    }
  };

  // Fetch user's existing reactions with better error handling
  const fetchUserReactions = async (blogId) => {
    console.log('fetchUserReactions called with:', { 
      blogId, 
      userId: userId || 'null', 
      vendorId: vendorId || 'null'
    });

    if (!userId && !vendorId) {
      console.log('No user/vendor ID, user not authenticated');
      setUserReactions(new Set());
      return;
    }

    try {
      const params = new URLSearchParams();
      if (userId) {
        params.append('userId', userId);
        console.log('Using userId:', userId);
      }
      if (vendorId) {
        params.append('vendorId', vendorId);
        console.log('Using vendorId:', vendorId);
      }

      const url = `/api/blogs/${blogId}/reactions/user?${params}`;
      console.log('Fetching user reactions from:', url);

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('User reactions response:', data);
        setUserReactions(new Set(data.reactions || []));
      } else {
        console.error('Failed to fetch user reactions:', response.status, response.statusText);
        setUserReactions(new Set());
      }
    } catch (err) {
      console.error('Error fetching user reactions:', err);
      setUserReactions(new Set());
    }
  };

  // Fetch user reactions when auth state changes
  useEffect(() => {
    console.log('Auth state changed, checking if we should fetch user reactions:', { 
      blogId: blog?.id, 
      userId, 
      vendorId
    });
    
    if (blog?.id) {
      if (userId || vendorId) {
        console.log('Fetching user reactions for authenticated user');
        fetchUserReactions(blog.id);
      } else {
        console.log('No user authenticated, clearing user reactions');
        setUserReactions(new Set());
      }
    }
  }, [userId, vendorId, blog?.id]);

  const fetchRandomProducts = async () => {
    try {
      const response = await fetch('/api/products/random?count=4');
      if (response.ok) {
        const data = await response.json();
        setRandomProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching random products:', err);
    }
  };

  // Improved scroll progress tracking
  useEffect(() => {
    if (!blog) return; // Don't set up scroll tracking until blog is loaded

    const handleScroll = () => {
      if (!contentRef.current) return;

      try {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Ensure we have valid dimensions
        if (documentHeight <= windowHeight) {
          setScrollProgress(0);
          setShowScrollButton(false);
          return;
        }

        // Calculate scroll percentage
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        const clampedProgress = Math.min(Math.max(scrollPercent, 0), 100);

        setScrollProgress(clampedProgress);
        setShowScrollButton(clampedProgress > 20); // Show after 20% scrolled
      } catch (error) {
        console.error('Error calculating scroll progress:', error);
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog]);

  // Handle reactions with improved error handling
  const handleReaction = async (reactionType) => {
    console.log('handleReaction called:', { reactionType, blogId: blog?.id, userId, vendorId, loadingReactions });
    
    if (!blog?.id || (!userId && !vendorId) || loadingReactions) {
      console.log('Cannot handle reaction:', { 
        noBlogId: !blog?.id, 
        noAuth: !userId && !vendorId, 
        loading: loadingReactions 
      });
      return;
    }

    setLoadingReactions(true);
    try {
      const requestBody = {
        reaction: reactionType,
        ...(userId ? { userId } : {}),
        ...(vendorId ? { vendorId } : {})
      };
      
      console.log('Sending reaction request:', requestBody);

      const response = await fetch(`/api/blogs/${blog.id}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Reaction response:', result);
        
        // Update local state
        setReactions(prev => ({
          ...prev,
          [reactionType]: result.action === 'added' 
            ? prev[reactionType] + 1 
            : prev[reactionType] - 1
        }));

        // Update user reactions
        setUserReactions(prev => {
          const newSet = new Set(prev);
          if (result.action === 'added') {
            newSet.add(reactionType);
          } else {
            newSet.delete(reactionType);
          }
          console.log('Updated user reactions:', Array.from(newSet));
          return newSet;
        });
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Reaction request failed:', response.status, errorData);
      }
    } catch (err) {
      console.error('Error managing reaction:', err);
    } finally {
      setLoadingReactions(false);
    }
  };

  // Scroll to next section
  const scrollToNextSection = () => {
    try {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('Error scrolling:', error);
      // Fallback: simple scroll
      window.scrollBy(0, window.innerHeight * 0.8);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '1 min read';
    // Remove HTML tags
    const text = content.replace(/<[^>]+>/g, '');
    // Average reading speed: 200 words per minute
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || 'Blog Post');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white py-10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 p-6 rounded-xl text-red-800 border border-red-200 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Error Loading Blog</h2>
            <p>{error}</p>
            <Link 
              href="/blog" 
              className="mt-4 inline-flex items-center text-red-700 hover:text-red-900"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to unpublished warning if not published
  if (blog && !blog.published) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-lg text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">This blog post is not published yet</h2>
          <p className="text-yellow-700 mb-6">
            This blog is still in draft mode and is not available to the public. 
            Only authors and administrators can view drafts.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/blog" 
              className="px-5 py-2.5 bg-white text-yellow-700 rounded-lg hover:bg-yellow-100 transition border border-yellow-300 shadow-sm"
            >
              Back to Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />
      
      {/* Progress Bar - Fixed positioning and improved visibility */}
      {!loading && blog && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 ease-out"
            style={{ 
              width: `${Math.max(0, Math.min(scrollProgress || 0, 100))}%`,
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          />
        </div>
      )}

      {/* Scroll Down Button - Only show when blog is loaded */}
      {!loading && blog && (
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToNextSection}
              className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      )}
      
      <div ref={contentRef} className="max-w-7xl mx-auto p-3 md:p-6 pt-16 md:pt-24 pb-8 md:pb-16">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 md:mb-8"
        >
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
            <span>Back to Blogs</span>
          </button>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Main Blog Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/4"
          >
            {blog && (
              <>
                {/* Blog Header */}
                <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">{blog.title}</h1>
                  
                  <div className="flex flex-wrap gap-3 md:gap-4 text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="md:w-4 md:h-4" />
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="md:w-4 md:h-4" />
                      <span>{getReadingTime(blog.content)}</span>
                    </div>
                  </div>
                  
                  {blog.bannerImage && (
                    <div className="w-full overflow-hidden rounded-lg md:rounded-xl md:shadow-md">
                      <div className="w-full aspect-[16/9]">
                        <img
                          src={blog.bannerImage}
                          alt={blog.title}
                          className="w-full aspect-[16/9] object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Share buttons (mobile - top) */}
                <div className="lg:hidden md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-6 mb-4 md:mb-8">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                    Share this article
                  </h3>
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="bg-[#1877f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="bg-[#1da1f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="bg-[#0a66c2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors relative"
                      aria-label="Copy link"
                    >
                      {copied ? <CheckCircle size={18} className="text-green-600 md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
                      {copied && (
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {/* Table of Contents - Mobile */}
                  {blog && blog.tocItems && blog.tocItems.length > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-3 text-gray-900 font-semibold text-sm">
                        <List size={16} />
                        <h3>Table of Contents</h3>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                        <ul className="space-y-2">
                          {blog.tocItems.map((item, index) => (
                            <li 
                              key={index}
                              className={`
                                ${item.level === 1 ? 'font-medium text-sm border-l-3 border-blue-500 pl-3' : 
                                  item.level === 2 ? 'ml-3 text-xs border-l-2 border-blue-300 pl-3' : 
                                  'ml-6 text-xs text-gray-600 pl-3'}
                                transition-all duration-200 hover:border-opacity-100
                                ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
                              `}
                            >
                              <a 
                                href={`#${item.slug}`} 
                                className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
                              >
                                {item.content}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Blog Content */}
                <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* Reactions Section */}
                <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">How was this article?</h3>
                  
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {[
                      { type: 'like', icon: ThumbsUp, label: 'Helpful', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
                      { type: 'love', icon: Heart, label: 'Love it', color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
                      { type: 'insightful', icon: Lightbulb, label: 'Insightful', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
                      { type: 'helpful', icon: Star, label: 'Excellent', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' }
                    ].map(({ type, icon: Icon, label, color, hoverColor }) => (
                      <button
                        key={type}
                        onClick={() => handleReaction(type)}
                        disabled={loadingReactions || (!userId && !vendorId)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                          userReactions && userReactions.has(type)
                            ? `${color} text-white border-transparent`
                            : `bg-white text-gray-700 border-gray-300 ${hoverColor.replace('bg-', 'hover:border-')} hover:text-white`
                        } ${loadingReactions || (!userId && !vendorId) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{label}</span>
                        {reactions[type] > 0 && (
                          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                            {reactions[type] || 0}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {(!userId && !vendorId) ? (
                    <p className="text-sm text-gray-500 mt-3">
                      <Link href="/login" className="text-blue-600 hover:underline">
                        Sign in
                      </Link> to react to this article
                    </p>
                  ) : (
                    <p className="text-sm text-green-600 mt-3">
                      ✓ You can react to this article
                    </p>
                  )}
                </div>
                
                {/* Reference Links */}
                {blog.refLinks && blog.refLinks.length > 0 && (
                  <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">References</h3>
                    <ul className="space-y-2 md:space-y-3">
                      {blog.refLinks.map((link, index) => (
                        <li key={index} className="flex items-start p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl hover:bg-gray-100 transition-colors">
                          <span className="mr-2 md:mr-3 text-blue-500 mt-1">•</span>
                          <div>
                            <p className="font-medium text-gray-900 text-sm md:text-base">{link.title}</p>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs md:text-sm break-all"
                            >
                              {link.url}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4"
          >
            <div className="sticky top-20 md:top-24 space-y-4 md:space-y-6">
              {/* One-line sharing section */}
              <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg relative">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
                  >
                    <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                    <span>Share </span>
                  </button>
                  
                  <div className="flex gap-1 md:gap-2">
                    <button 
                      onClick={() => shareOnSocial('facebook')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Facebook size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={() => shareOnSocial('twitter')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Twitter size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={() => shareOnSocial('linkedin')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Linkedin size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={copyToClipboard} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      {copied ? <CheckCircle size={13} className="text-green-600 md:w-[15px] md:h-[15px]" /> : <Copy size={13} className="md:w-[15px] md:h-[15px]" />}
                    </button>
                  </div>
                </div>
                
                {showShareOptions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white p-3 md:p-4 rounded-xl shadow-lg z-10 space-y-2">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Facebook size={16} className="text-[#1877f2] md:w-[18px] md:h-[18px]" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Twitter size={16} className="text-[#1da1f2] md:w-[18px] md:h-[18px]" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Linkedin size={16} className="text-[#0a66c2] md:w-[18px] md:h-[18px]" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      {copied ? <CheckCircle size={16} className="text-green-600 md:w-[18px] md:h-[18px]" /> : <Copy size={16} className="md:w-[18px] md:h-[18px]" />}
                      <span>{copied ? 'Link copied!' : 'Copy link'}</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Beautiful scrollable table of contents - Desktop only */}
              {blog && blog.tocItems && blog.tocItems.length > 0 && (
                <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
                  <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
                    <List size={18} className="md:w-5 md:h-5" />
                    <h3>Table of Contents</h3>
                  </div>
                  
                  <div className="max-h-80 md:max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                    <ul className="space-y-2 md:space-y-3">
                      {blog.tocItems.map((item, index) => (
                        <li 
                          key={index}
                          className={`
                            ${item.level === 1 ? 'font-medium text-sm md:text-base border-l-4 border-blue-500 pl-3' : 
                              item.level === 2 ? 'ml-3 text-xs md:text-sm border-l-2 border-blue-300 pl-3' : 
                              'ml-6 text-xs md:text-sm text-gray-600 pl-3'}
                            transition-all duration-200 hover:border-opacity-100
                            ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
                          `}
                        >
                          <a 
                            href={`#${item.slug}`} 
                            className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
                          >
                            {item.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Related Products Section */}
              {randomProducts.length > 0 && (
                <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
                  <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
                    <ExternalLink size={18} className="md:w-5 md:h-5" />
                    <h3>Related Products</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {randomProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.logoUrl || '/default-product-logo.png'}
                            alt={product.productName}
                            className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-gray-200"
                            onError={(e) => {
                              e.target.src = '/default-product-logo.png';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                              {product.productName}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {product.companyName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {product.category}
                              </span>
                              {product.pricingTier && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  {product.pricingTier}
                                </span>
                              )}
                            </div>
                          </div>
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <FinalSection category={blog.category} />
      </div>
    </div>
  );
}