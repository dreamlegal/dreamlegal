
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

// export default function PublicBlogsPage() {
//   const [blogsData, setBlogsData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
  
//   const [sectionPages, setSectionPages] = useState<{ [key: string]: number }>({
//     'below-hero': 1,
//     'second-collage': 1,
//     'one-line-section': 1,
//     'before-latest': 1,
//     'latest': 1
//   });
  
//   const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string }>({});
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const response = await fetch('/api/blogs/public');
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         console.log('Hero blogs:', data.hero?.blogs);
//         console.log('Featured count:', data.meta?.featuredCount);
//         setBlogsData(data);
        
//         const initialCategories: { [key: string]: string } = {};
//         data.sections?.forEach((section: any) => {
//           initialCategories[section.id] = 'All';
//         });
//         setSelectedCategories(initialCategories);
//       }
//     } catch (error) {
//       console.error('Failed to fetch blogs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const handleScroll = (e: any) => {
//     const element = e.target;
//     setShowLeftArrow(element.scrollLeft > 0);
//     setShowRightArrow(element.scrollLeft < element.scrollWidth - element.clientWidth - 10);
//   };

//   const scrollCategories = (direction: 'left' | 'right') => {
//     const container = document.getElementById('categories-scroll');
//     if (container) {
//       const scrollAmount = 200;
//       container.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="animate-spin h-12 w-12 border-4 border-[#7cc6ee] border-t-[#1e2556]"></div>
//       </div>
//     );
//   }

//   if (!blogsData) return null;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-6 lg:py-8 mt-12 sm:mt-14 lg:mt-16">

//         {/* Banner */}
//         <a href="https://www.zoho.com/contracts/ebooks/state-of-contract-management.html" target="_blank" rel="noopener noreferrer" className="block mb-6 sm:mb-8">
//           <img
//             src="/images/banner.jpg"
//             alt="Resources Banner"
//             className="w-full h-auto object-cover cursor-pointer"
//           />
//         </a>

//         {/* HERO SECTION - 2x2 Grid */}
//         {blogsData.hero?.blogs && blogsData.hero.blogs.length > 0 && (
//           <section className="mb-8 sm:mb-10 lg:mb-12 border border-gray-200 p-4 sm:p-6">
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <div className="bg-[#1e2556] text-white px-4 sm:px-6 py-2 font-bold text-xs sm:text-sm uppercase">
//                 FEATURED
//               </div>
//               <div className="flex gap-2">
//                 <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
//                   <ChevronLeft size={16} />
//                 </button>
//                 <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>

//             {/* 2x2 Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//               {blogsData.hero.blogs.slice(0, 4).map((blog: any, idx: number) => (
//                 <HeroCard key={blog.id || idx} blog={blog} formatDate={formatDate} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Main Layout: Content + Sidebar */}
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           {/* MAIN CONTENT */}
//           <div className="flex-1 min-w-0 space-y-8">
//             {/* DON'T MISS SECTION */}
//             {blogsData.sections?.find((s: any) => s.id === 'below-hero')?.blogs.length > 0 && (
//               <DontMissSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'below-hero')} 
//                 formatDate={formatDate}
//                 currentPage={sectionPages['below-hero']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'below-hero': page }))}
//                 selectedCategory={selectedCategories['below-hero']}
//                 onCategoryChange={(cat) => {
//                   setSelectedCategories(prev => ({ ...prev, 'below-hero': cat }));
//                   setSectionPages(prev => ({ ...prev, 'below-hero': 1 }));
//                 }}
//                 handleScroll={handleScroll}
//                 showLeftArrow={showLeftArrow}
//                 showRightArrow={showRightArrow}
//                 scrollCategories={scrollCategories}
//               />
//             )}

//             {/* MOBILE: LinkedIn Button */}
//             <div className="lg:hidden">
//               <LinkedInButton />
//             </div>

//             {/* CLIENT ANNOUNCEMENTS */}
//             {blogsData.sections?.find((s: any) => s.id === 'second-collage')?.blogs.length > 0 && (
//               <LifestyleNewsSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'second-collage')}
//                 formatDate={formatDate}
//                 currentPage={sectionPages['second-collage']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'second-collage': page }))}
//               />
//             )}

//             {/* MOBILE: AI Prompts Card */}
//             <div className="lg:hidden">
//               <Link href="/prompts" className="block bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors">
//                 <h3 className="text-lg font-bold mb-2">AI Prompts</h3>
//                 <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
//                 <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">
//                   Explore Now →
//                 </span>
//               </Link>
//             </div>

//             {/* FEATURE LAUNCH */}
//             {blogsData.sections?.find((s: any) => s.id === 'one-line-section')?.blogs.length > 0 && (
//               <HouseDesignSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'one-line-section')}
//                 formatDate={formatDate}
//                 currentPage={sectionPages['one-line-section']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'one-line-section': page }))}
//               />
//             )}

//             {/* MOBILE: Analysis Grid */}
//             {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
//               <div className="lg:hidden border border-gray-200 p-4">
//                 <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.firstMini.title}
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
//                     <SmallGridCard key={blog.id} blog={blog} label={blogsData.sidebar.firstMini.title} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* FOR LEGAL TECH VENDORS */}
//             {blogsData.sections?.find((s: any) => s.id === 'before-latest')?.blogs.length > 0 && (
//               <PerformanceSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'before-latest')}
//                 formatDate={formatDate}
//                 currentPage={sectionPages['before-latest']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'before-latest': page }))}
//               />
//             )}

//             {/* MOBILE: Legal Tech Map Card */}
//             <div className="lg:hidden">
//               <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:bg-[#0f1635] transition-colors">
//                 <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
//                 <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
//                 <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">
//                   View Map →
//                 </span>
//               </Link>
//             </div>

//             {/* LATEST ARTICLES */}
//             {blogsData.latest?.blogs.length > 0 && (
//               <LatestSection 
//                 blogs={blogsData.latest.blogs}
//                 formatDate={formatDate}
//                 currentPage={sectionPages['latest']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, latest: page }))}
//               />
//             )}

//             {/* MOBILE: Most Popular */}
//             <div className="lg:hidden border border-gray-200 p-4">
//               <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                 MOST POPULAR
//               </div>
//               <div className="space-y-4">
//                 {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
//                   <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
//                 ))}
//               </div>
//             </div>

//             {/* MOBILE: Awards & Recognition */}
//             {blogsData.sidebar?.middleBig?.blogs.length > 0 && (
//               <div className="lg:hidden border border-gray-200 p-4">
//                 <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.middleBig.title}
//                 </div>
//                 <div className="space-y-4">
//                   {blogsData.sidebar.middleBig.blogs.slice(0, 3).map((blog: any) => (
//                     <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* MOBILE: Funding */}
//             {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
//               <div className="lg:hidden border border-gray-200 p-4">
//                 <div className="bg-green-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.secondMini.title}
//                 </div>
//                 <div className="space-y-4">
//                   {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
//                     <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* RIGHT SIDEBAR - Desktop only */}
//           <aside className="hidden lg:block w-[300px] space-y-6 sticky top-8 self-start">
//             {/* Follow on LinkedIn */}
//             <LinkedInButton />

//             {/* Prompts Card */}
//             <Link href="/prompts" className="block bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors">
//               <h3 className="text-lg font-bold mb-2">AI Prompts</h3>
//               <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
//               <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">
//                 Explore Now →
//               </span>
//             </Link>

//             {/* Analysis - 2x2 Grid */}
//             {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
//               <div className="border border-gray-200 p-4">
//                 <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.firstMini.title}
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
//                     <SmallGridCard key={blog.id} blog={blog} label={blogsData.sidebar.firstMini.title} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Legal Tech Map Card */}
//             <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:bg-[#0f1635] transition-colors">
//               <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
//               <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
//               <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">
//                 View Map →
//               </span>
//             </Link>

//             {/* Awards & Recognition */}
//             {blogsData.sidebar?.middleBig?.blogs.length > 0 && (
//               <div className="border border-gray-200 p-4">
//                 <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.middleBig.title}
//                 </div>
//                 <div className="space-y-4">
//                   {blogsData.sidebar.middleBig.blogs.slice(0, 3).map((blog: any) => (
//                     <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Funding */}
//             {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
//               <div className="border border-gray-200 p-4">
//                 <div className="bg-green-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                   {blogsData.sidebar.secondMini.title}
//                 </div>
//                 <div className="space-y-4">
//                   {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
//                     <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Most Popular */}
//             <div className="border border-gray-200 p-4">
//               <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
//                 MOST POPULAR
//               </div>
//               <div className="space-y-4">
//                 {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
//                   <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
//                 ))}
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

// // LINKEDIN BUTTON COMPONENT
// function LinkedInButton() {
//   return (
//     <a 
//       href="https://www.linkedin.com/company/dreamlegal" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="block bg-[#0077b5] text-white p-6 hover:bg-[#006399] transition-colors"
//     >
//       <div className="flex items-center gap-3 mb-3">
//         <Linkedin size={32} fill="white" />
//         <div>
//           <h3 className="font-bold text-lg">Follow Us</h3>
//           <p className="text-sm text-white/90">on LinkedIn</p>
//         </div>
//       </div>
//       <p className="text-sm text-white/90 mb-4">
//         Stay updated with the latest legal tech insights and industry news
//       </p>
//       <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0077b5] font-medium text-sm">
//         Follow Now
//         <ChevronRight size={16} />
//       </span>
//     </a>
//   );
// }

// // HERO CARD - 2x2 Grid Card with 16:9 images, small tag in corner
// function HeroCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block h-full">
//       <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img 
//             src={blog.bannerImage} 
//             alt={blog.title} 
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
//         {blog.currentTag && (
//           <span className="absolute top-2 left-2 bg-[#7cc6ee] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//         <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//           <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//             {blog.title}
//           </h3>
//         </div>
//       </div>
//       <div className="text-xs text-gray-600">
//         {formatDate(blog.publishedAt || blog.createdAt)}
//       </div>
//     </Link>
//   );
// }

// // DON'T MISS SECTION with arrow navigation for categories
// function DontMissSection({ section, formatDate, currentPage, onPageChange, selectedCategory, onCategoryChange, handleScroll, showLeftArrow, showRightArrow, scrollCategories }: any) {
//   const itemsPerPage = 1;
//   const listItemsPerPage = 4;
  
//   const filteredBlogs = selectedCategory === 'All' 
//     ? section.blogs 
//     : section.blogs.filter((b: any) => {
//         const tagsList = b.allTagsList || [];
//         return tagsList.includes(selectedCategory);
//       });
    
//   const featuredBlog = filteredBlogs[(currentPage - 1) * itemsPerPage];
//   const listBlogs = filteredBlogs.slice(0, listItemsPerPage);
//   const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

//   return (
//     <section className="border border-gray-200 p-4 sm:p-6">
//       <div className="mb-6">
//         <div className="bg-[#f59e0b] text-[#1e2556] px-6 py-3 font-bold text-sm uppercase inline-block mb-4">
//           {section.title}
//         </div>
        
//         {section.hasCategories && section.categories.length > 1 && (
//           <div className="relative">
//             {/* Left Arrow */}
//             {showLeftArrow && (
//               <button
//                 onClick={() => scrollCategories('left')}
//                 className="absolute left-0 top-0 bottom-0 z-10 bg-white border-r border-gray-200 px-2 hover:bg-gray-50 transition-colors"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//             )}
            
//             {/* Scrollable categories */}
//             <div 
//               id="categories-scroll"
//               className="overflow-x-auto scrollbar-hide px-8"
//               onScroll={handleScroll}
//             >
//               <div className="flex gap-3 min-w-max pb-2">
//                 {section.categories.map((cat: string) => (
//                   <button
//                     key={cat}
//                     onClick={() => onCategoryChange(cat)}
//                     className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
//                       selectedCategory === cat 
//                         ? 'bg-[#1e2556] text-white' 
//                         : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                     }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Right Arrow */}
//             {showRightArrow && (
//               <button
//                 onClick={() => scrollCategories('right')}
//                 className="absolute right-0 top-0 bottom-0 z-10 bg-white border-l border-gray-200 px-2 hover:bg-gray-50 transition-colors"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {filteredBlogs.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           <p>No blogs found for "{selectedCategory}"</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Featured */}
//           {featuredBlog && (
//             <div>
//               <Link href={`/blog/${featuredBlog.slug}`} className="group block">
//                 <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
//                   {featuredBlog.bannerImage ? (
//                     <img src={featuredBlog.bannerImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200"></div>
//                   )}
//                   {featuredBlog.currentTag && (
//                     <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
//                       {featuredBlog.currentTag}
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//                   {featuredBlog.title}
//                 </h3>
//                 <div className="text-sm text-gray-600 mb-3">
//                   {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
//                 </div>
//                 {featuredBlog.content && (
//                   <p className="text-gray-700 text-sm line-clamp-3">
//                     {featuredBlog.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
//                   </p>
//                 )}
//               </Link>
              
//               {totalPages > 1 && (
//                 <div className="flex gap-2 mt-6">
//                   <button 
//                     onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button 
//                     onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* List */}
//           <div className="space-y-4">
//             {listBlogs.map((blog: any) => (
//               <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex gap-4">
//                 <div className="relative w-32 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                   {blog.bannerImage ? (
//                     <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//                     {blog.title}
//                   </h4>
//                   <div className="text-xs text-gray-600">
//                     {formatDate(blog.publishedAt || blog.createdAt)}
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// // LIFESTYLE NEWS SECTION - 2 large + 4 small
// function LifestyleNewsSection({ section, formatDate, currentPage, onPageChange }: any) {
//   const itemsPerPage = 6;
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
//   const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

//   return (
//     <section className="border border-gray-200 p-4 sm:p-6">
//       <div className="bg-green-700 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       {/* 2 Large Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {paginatedBlogs.slice(0, 2).map((blog: any) => (
//           <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {/* 4 Small Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         {paginatedBlogs.slice(2, 6).map((blog: any) => (
//           <SmallCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
//       )}
//     </section>
//   );
// }

// // HOUSE DESIGN SECTION - 3 columns
// function HouseDesignSection({ section, formatDate, currentPage, onPageChange }: any) {
//   const itemsPerPage = 3;
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
//   const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

//   return (
//     <section className="border border-gray-200 p-4 sm:p-6">
//       <div className="bg-gray-600 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         {paginatedBlogs.map((blog: any) => (
//           <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
//       )}
//     </section>
//   );
// }

// // PERFORMANCE SECTION - full-width cards
// function PerformanceSection({ section, formatDate, currentPage, onPageChange }: any) {
//   const itemsPerPage = 4;
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
//   const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

//   return (
//     <section className="border border-gray-200 p-4 sm:p-6">
//       <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       <div className="space-y-6 mb-6">
//         {paginatedBlogs.map((blog: any) => (
//           <FullWidthCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
//       )}
//     </section>
//   );
// }

// // LATEST SECTION
// function LatestSection({ blogs, formatDate, currentPage, onPageChange }: any) {
//   const itemsPerPage = 6;
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedBlogs = blogs.slice(startIdx, startIdx + itemsPerPage);
//   const totalPages = Math.ceil(blogs.length / itemsPerPage);

//   return (
//     <section className="border border-gray-200 p-4 sm:p-6">
//       <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         LATEST ARTICLES
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {paginatedBlogs.map((blog: any) => (
//           <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
//       )}
//     </section>
//   );
// }

// // CARD COMPONENTS - NO ROUNDED, SMALL TAGS, NO AUTHOR
// function StandardCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//         {blog.currentTag && (
//           <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//       </div>
//       <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h3>
//       <div className="text-sm text-gray-600">
//         {formatDate(blog.publishedAt || blog.createdAt)}
//       </div>
//     </Link>
//   );
// }

// function SmallCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex gap-4">
//       <div className="relative w-32 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h4>
//         <div className="text-xs text-gray-600">
//           {formatDate(blog.publishedAt || blog.createdAt)}
//         </div>
//       </div>
//     </Link>
//   );
// }

// function FullWidthCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200 last:border-0">
//       <div className="relative w-full sm:w-48 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//         {blog.currentTag && (
//           <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h3>
//         <div className="text-sm text-gray-600 mb-3">
//           {formatDate(blog.publishedAt || blog.createdAt)}
//         </div>
//         {blog.content && (
//           <p className="text-gray-700 text-sm line-clamp-2">
//             {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// }

// function SmallGridCard({ blog, label }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative w-full overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//         <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
//           {label}
//         </span>
//       </div>
//       <h5 className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h5>
//     </Link>
//   );
// }

// function SidebarListItem({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative w-full overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//       </div>
//       <h5 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h5>
//       <div className="text-xs text-gray-600">{formatDate(blog.publishedAt || blog.createdAt)}</div>
//     </Link>
//   );
// }

// function PopularItem({ blog, formatDate, number }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex gap-3">
//       <div className="relative w-20 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h5 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h5>
//         <div className="text-xs text-gray-600">{formatDate(blog.publishedAt || blog.createdAt)}</div>
//       </div>
//     </Link>
//   );
// }

// // PAGINATION - NO ROUNDED
// function NumberPagination({ currentPage, totalPages, onPageChange }: any) {
//   const getPages = () => {
//     const pages: (number | string)[] = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       if (currentPage > 3) pages.push('...');
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
//       for (let i = start; i <= end; i++) pages.push(i);
//       if (currentPage < totalPages - 2) pages.push('...');
//       pages.push(totalPages);
//     }
//     return pages;
//   };

//   return (
//     <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
//       <div className="flex items-center gap-2">
//         {currentPage > 1 && (
//           <button 
//             onClick={() => onPageChange(currentPage - 1)} 
//             className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
//           >
//             &lt;
//           </button>
//         )}
//         {getPages().map((page, idx) => (
//           page === '...' ? (
//             <span key={`ellipsis-${idx}`} className="px-2">...</span>
//           ) : (
//             <button
//               key={page}
//               onClick={() => onPageChange(page)}
//               className={`w-10 h-10 flex items-center justify-center font-medium transition-colors ${
//                 page === currentPage 
//                   ? 'bg-[#1e2556] text-white' 
//                   : 'border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               {page}
//             </button>
//           )
//         ))}
//         {currentPage < totalPages && (
//           <button 
//             onClick={() => onPageChange(currentPage + 1)} 
//             className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
//           >
//             &gt;
//           </button>
//         )}
//       </div>
//       <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
//     </div>
//   );
// }

// // Hide scrollbar CSS
// if (typeof document !== 'undefined') {
//   const style = document.createElement('style');
//   style.textContent = `
//     .scrollbar-hide::-webkit-scrollbar {
//       display: none;
//     }
//     .scrollbar-hide {
//       -ms-overflow-style: none;
//       scrollbar-width: none;
//     }
//   `;
//   document.head.appendChild(style);
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

export default function PublicBlogsPage() {
  const [blogsData, setBlogsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [sectionPages, setSectionPages] = useState<{ [key: string]: number }>({
    'below-hero': 1,
    'second-collage': 1,
    'one-line-section': 1,
    'before-latest': 1,
    'latest': 1
  });
  
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string }>({});
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Check scroll state for arrows whenever categories or selected category changes
  useEffect(() => {
    const checkScrollState = () => {
      const container = document.getElementById('categories-scroll');
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
      }
    };
    
    // Check immediately
    checkScrollState();
    
    // Check after a short delay to ensure DOM is fully rendered
    setTimeout(checkScrollState, 100);
    
    // Add resize listener to recheck on window resize
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [selectedCategories, blogsData]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs/public');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('Hero blogs:', data.hero?.blogs);
        console.log('Featured count:', data.meta?.featuredCount);
        setBlogsData(data);
        
        const initialCategories: { [key: string]: string } = {};
        data.sections?.forEach((section: any) => {
          initialCategories[section.id] = 'All';
        });
        setSelectedCategories(initialCategories);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleScroll = (e: any) => {
    const element = e.target;
    setShowLeftArrow(element.scrollLeft > 0);
    setShowRightArrow(element.scrollLeft < element.scrollWidth - element.clientWidth - 10);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-scroll');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-[#7cc6ee] border-t-[#1e2556]"></div>
      </div>
    );
  }

  if (!blogsData) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-6 lg:py-8 mt-12 sm:mt-14 lg:mt-16">

        {/* Banner */}
        <a href="https://www.zoho.com/contracts/ebooks/state-of-contract-management.html" target="_blank" rel="noopener noreferrer" className="block mb-6 sm:mb-8">
          <img
            src="/images/banner.jpg"
            alt="Resources Banner"
            className="w-full h-auto object-cover cursor-pointer"
          />
        </a>

        {/* HERO SECTION - 2x2 Grid */}
        {blogsData.hero?.blogs && blogsData.hero.blogs.length > 0 && (
          <section className="mb-8 sm:mb-10 lg:mb-12 border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="bg-[#1e2556] text-white px-4 sm:px-6 py-2 font-bold text-xs sm:text-sm uppercase">
                FEATURED
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {blogsData.hero.blogs.slice(0, 4).map((blog: any, idx: number) => (
                <HeroCard key={blog.id || idx} blog={blog} formatDate={formatDate} />
              ))}
            </div>
          </section>
        )}

        {/* Main Layout: Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* DON'T MISS SECTION */}
            {blogsData.sections?.find((s: any) => s.id === 'below-hero')?.blogs.length > 0 && (
              <DontMissSection 
                section={blogsData.sections.find((s: any) => s.id === 'below-hero')} 
                formatDate={formatDate}
                currentPage={sectionPages['below-hero']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'below-hero': page }))}
                selectedCategory={selectedCategories['below-hero']}
                onCategoryChange={(cat) => {
                  setSelectedCategories(prev => ({ ...prev, 'below-hero': cat }));
                  setSectionPages(prev => ({ ...prev, 'below-hero': 1 }));
                }}
                handleScroll={handleScroll}
                showLeftArrow={showLeftArrow}
                showRightArrow={showRightArrow}
                scrollCategories={scrollCategories}
              />
            )}

            {/* MOBILE: LinkedIn Button */}
            <div className="lg:hidden">
              <LinkedInButton />
            </div>

            {/* CLIENT ANNOUNCEMENTS */}
            {blogsData.sections?.find((s: any) => s.id === 'second-collage')?.blogs.length > 0 && (
              <LifestyleNewsSection 
                section={blogsData.sections.find((s: any) => s.id === 'second-collage')}
                formatDate={formatDate}
                currentPage={sectionPages['second-collage']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'second-collage': page }))}
              />
            )}

            {/* MOBILE: AI Prompts Card */}
            <div className="lg:hidden">
              <Link href="/prompts" className="block bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors">
                <h3 className="text-lg font-bold mb-2">AI Prompts</h3>
                <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
                <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">
                  Explore Now →
                </span>
              </Link>
            </div>

            {/* FEATURE LAUNCH */}
            {blogsData.sections?.find((s: any) => s.id === 'one-line-section')?.blogs.length > 0 && (
              <HouseDesignSection 
                section={blogsData.sections.find((s: any) => s.id === 'one-line-section')}
                formatDate={formatDate}
                currentPage={sectionPages['one-line-section']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'one-line-section': page }))}
              />
            )}

            {/* MOBILE: Analysis Grid */}
            {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
              <div className="lg:hidden border border-gray-200 p-4">
                <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.firstMini.title}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
                    <SmallGridCard key={blog.id} blog={blog} label={blogsData.sidebar.firstMini.title} />
                  ))}
                </div>
              </div>
            )}

            {/* FOR LEGAL TECH VENDORS */}
            {blogsData.sections?.find((s: any) => s.id === 'before-latest')?.blogs.length > 0 && (
              <PerformanceSection 
                section={blogsData.sections.find((s: any) => s.id === 'before-latest')}
                formatDate={formatDate}
                currentPage={sectionPages['before-latest']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, 'before-latest': page }))}
              />
            )}

            {/* MOBILE: Legal Tech Map Card */}
            <div className="lg:hidden">
              <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:bg-[#0f1635] transition-colors">
                <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
                <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
                <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">
                  View Map →
                </span>
              </Link>
            </div>

            {/* LATEST ARTICLES */}
            {blogsData.latest?.blogs.length > 0 && (
              <LatestSection 
                blogs={blogsData.latest.blogs}
                formatDate={formatDate}
                currentPage={sectionPages['latest']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, latest: page }))}
              />
            )}

            {/* MOBILE: Most Popular */}
            <div className="lg:hidden border border-gray-200 p-4">
              <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
                  <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
                ))}
              </div>
            </div>

            {/* MOBILE: Awards & Recognition */}
            {blogsData.sidebar?.middleBig?.blogs.length > 0 && (
              <div className="lg:hidden border border-gray-200 p-4">
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.middleBig.title}
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.middleBig.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}

            {/* MOBILE: Funding */}
            {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
              <div className="lg:hidden border border-gray-200 p-4">
                <div className="bg-green-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.secondMini.title}
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - Desktop only */}
          <aside className="hidden lg:block w-[300px] space-y-6 sticky top-8 self-start">
            {/* Follow on LinkedIn */}
            <LinkedInButton />

            {/* Prompts Card */}
            <Link href="/prompts" className="block bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors">
              <h3 className="text-lg font-bold mb-2">AI Prompts</h3>
              <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
              <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">
                Explore Now →
              </span>
            </Link>

            {/* Analysis - 2x2 Grid */}
            {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
              <div className="border border-gray-200 p-4">
                <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.firstMini.title}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
                    <SmallGridCard key={blog.id} blog={blog} label={blogsData.sidebar.firstMini.title} />
                  ))}
                </div>
              </div>
            )}

            {/* Legal Tech Map Card */}
            <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:bg-[#0f1635] transition-colors">
              <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
              <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
              <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">
                View Map →
              </span>
            </Link>

            {/* Awards & Recognition */}
            {blogsData.sidebar?.middleBig?.blogs.length > 0 && (
              <div className="border border-gray-200 p-4">
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.middleBig.title}
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.middleBig.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}

            {/* Funding */}
            {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
              <div className="border border-gray-200 p-4">
                <div className="bg-green-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                  {blogsData.sidebar.secondMini.title}
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}

            {/* Most Popular */}
            <div className="border border-gray-200 p-4">
              <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4 inline-block">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
                  <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// LINKEDIN BUTTON COMPONENT
function LinkedInButton() {
  return (
    <a 
      href="https://www.linkedin.com/company/dreamlegal" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-[#0077b5] text-white p-6 hover:bg-[#006399] transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <Linkedin size={32} fill="white" />
        <div>
          <h3 className="font-bold text-lg">Follow Us</h3>
          <p className="text-sm text-white/90">on LinkedIn</p>
        </div>
      </div>
      <p className="text-sm text-white/90 mb-4">
        Stay updated with the latest legal tech insights and industry news
      </p>
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0077b5] font-medium text-sm">
        Follow Now
        <ChevronRight size={16} />
      </span>
    </a>
  );
}

// HERO CARD - 2x2 Grid Card with 16:9 images, small tag in corner
function HeroCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img 
            src={blog.bannerImage} 
            alt={blog.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        {blog.currentTag && (
          <span className="absolute top-2 left-2 bg-[#7cc6ee] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
            {blog.currentTag}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
            {blog.title}
          </h3>
        </div>
      </div>
      <div className="text-xs text-gray-600">
        {formatDate(blog.publishedAt || blog.createdAt)}
      </div>
    </Link>
  );
}

// DON'T MISS SECTION with arrow navigation for categories
function DontMissSection({ section, formatDate, currentPage, onPageChange, selectedCategory, onCategoryChange, handleScroll, showLeftArrow, showRightArrow, scrollCategories }: any) {
  const itemsPerPage = 1;
  const listItemsPerPage = 4;
  
  const filteredBlogs = selectedCategory === 'All' 
    ? section.blogs 
    : section.blogs.filter((b: any) => {
        const tagsList = b.allTagsList || [];
        return tagsList.includes(selectedCategory);
      });
    
  const featuredBlog = filteredBlogs[(currentPage - 1) * itemsPerPage];
  const listBlogs = filteredBlogs.slice(0, listItemsPerPage);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  return (
    <section className="border border-gray-200 p-4 sm:p-6">
      <div className="mb-6">
        <div className="bg-[#f59e0b] text-[#1e2556] px-6 py-3 font-bold text-sm uppercase inline-block mb-4">
          {section.title}
        </div>
        
        {section.hasCategories && section.categories.length > 1 && (
          <div className="relative">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-0 bottom-0 z-10 bg-white border-r border-gray-200 px-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {/* Scrollable categories */}
            <div 
              id="categories-scroll"
              className="overflow-x-auto scrollbar-hide px-8"
              onScroll={handleScroll}
            >
              <div className="flex gap-3 min-w-max pb-2">
                {section.categories.map((cat: string) => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#1e2556] text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-0 bottom-0 z-10 bg-white border-l border-gray-200 px-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No blogs found for "{selectedCategory}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured */}
          {featuredBlog && (
            <div>
              <Link href={`/blog/${featuredBlog.slug}`} className="group block">
                <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
                  {featuredBlog.bannerImage ? (
                    <img src={featuredBlog.bannerImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                  {featuredBlog.currentTag && (
                    <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                      {featuredBlog.currentTag}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
                  {featuredBlog.title}
                </h3>
                <div className="text-sm text-gray-600 mb-3">
                  {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
                </div>
                {featuredBlog.content && (
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {featuredBlog.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
                  </p>
                )}
              </Link>
              
              {totalPages > 1 && (
                <div className="flex gap-2 mt-6">
                  <button 
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* List */}
          <div className="space-y-4">
            {listBlogs.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex gap-4">
                <div className="relative w-32 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {blog.bannerImage ? (
                    <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
                    {blog.title}
                  </h4>
                  <div className="text-xs text-gray-600">
                    {formatDate(blog.publishedAt || blog.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// LIFESTYLE NEWS SECTION - 2 large + 4 small
function LifestyleNewsSection({ section, formatDate, currentPage, onPageChange }: any) {
  const itemsPerPage = 6;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

  return (
    <section className="border border-gray-200 p-4 sm:p-6">
      <div className="bg-green-700 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
        {section.title}
      </div>

      {/* 2 Large Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {paginatedBlogs.slice(0, 2).map((blog: any) => (
          <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {/* 4 Small Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {paginatedBlogs.slice(2, 6).map((blog: any) => (
          <SmallCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {totalPages > 1 && (
        <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
}

// HOUSE DESIGN SECTION - 3 columns
function HouseDesignSection({ section, formatDate, currentPage, onPageChange }: any) {
  const itemsPerPage = 3;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

  return (
    <section className="border border-gray-200 p-4 sm:p-6">
      <div className="bg-gray-600 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
        {section.title}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedBlogs.map((blog: any) => (
          <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {totalPages > 1 && (
        <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
}

// PERFORMANCE SECTION - full-width cards
function PerformanceSection({ section, formatDate, currentPage, onPageChange }: any) {
  const itemsPerPage = 4;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = section.blogs.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(section.blogs.length / itemsPerPage);

  return (
    <section className="border border-gray-200 p-4 sm:p-6">
      <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
        {section.title}
      </div>

      <div className="space-y-6 mb-6">
        {paginatedBlogs.map((blog: any) => (
          <FullWidthCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {totalPages > 1 && (
        <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
}

// LATEST SECTION
function LatestSection({ blogs, formatDate, currentPage, onPageChange }: any) {
  const itemsPerPage = 6;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogs.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <section className="border border-gray-200 p-4 sm:p-6">
      <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
        LATEST ARTICLES
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {paginatedBlogs.map((blog: any) => (
          <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {totalPages > 1 && (
        <NumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
}

// CARD COMPONENTS - NO ROUNDED, SMALL TAGS, NO AUTHOR
function StandardCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {blog.currentTag && (
          <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
            {blog.currentTag}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h3>
      <div className="text-sm text-gray-600">
        {formatDate(blog.publishedAt || blog.createdAt)}
      </div>
    </Link>
  );
}

function SmallCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex gap-4">
      <div className="relative w-32 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h4>
        <div className="text-xs text-gray-600">
          {formatDate(blog.publishedAt || blog.createdAt)}
        </div>
      </div>
    </Link>
  );
}

function FullWidthCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200 last:border-0">
      <div className="relative w-full sm:w-48 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {blog.currentTag && (
          <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
            {blog.currentTag}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h3>
        <div className="text-sm text-gray-600 mb-3">
          {formatDate(blog.publishedAt || blog.createdAt)}
        </div>
        {blog.content && (
          <p className="text-gray-700 text-sm line-clamp-2">
            {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
          </p>
        )}
      </div>
    </Link>
  );
}

function SmallGridCard({ blog, label }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative w-full overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        <span className="absolute top-2 left-2 bg-[#1e2556] text-white px-2 py-0.5 text-[10px] font-bold uppercase">
          {label}
        </span>
      </div>
      <h5 className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h5>
    </Link>
  );
}

function SidebarListItem({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative w-full overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <h5 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h5>
      <div className="text-xs text-gray-600">{formatDate(blog.publishedAt || blog.createdAt)}</div>
    </Link>
  );
}

function PopularItem({ blog, formatDate, number }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex gap-3">
      <div className="relative w-20 flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h5>
        <div className="text-xs text-gray-600">{formatDate(blog.publishedAt || blog.createdAt)}</div>
      </div>
    </Link>
  );
}

// PAGINATION - NO ROUNDED
function NumberPagination({ currentPage, totalPages, onPageChange }: any) {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            &lt;
          </button>
        )}
        {getPages().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center font-medium transition-colors ${
                page === currentPage 
                  ? 'bg-[#1e2556] text-white' 
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        ))}
        {currentPage < totalPages && (
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            &gt;
          </button>
        )}
      </div>
      <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
    </div>
  );
}

// Hide scrollbar CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  document.head.appendChild(style);
}