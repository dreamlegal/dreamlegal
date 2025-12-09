// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
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

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const response = await fetch('/api/blogs/public');
//       if (response.ok) {
//         const data = await response.json();
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
//       {/* Top Banner */}
//       {/* <div className="w-full bg-[#f5f7fa] py-4">
//         <div className="max-w-[1200px] mx-auto px-4">
//           <div className="h-[100px] bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] flex items-center justify-center text-white text-2xl font-bold">
//             Your Banner Here
//           </div>
//         </div>
//       </div> */}

//       <div className="max-w-[1200px] mx-auto px-4 py-8 mt-16">

//           <a href="https://www.zoho.com/contracts/ebooks/state-of-contract-management.html" target="_blank" rel="noopener noreferrer">
//   <img
//     src="/images/banner.jpg"
//     alt="Resources Banner"
//     className="w-full h-full object-cover cursor-pointer"
//   />
// </a>

//         {/* SECTION 1: HERO - 1 left + 3 right (1 top, 2 bottom) */}
//         {blogsData.hero?.blogs && blogsData.hero.blogs.length >= 4 && (
//           <section className="mb-12">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="bg-[#1e2556] text-white px-6 py-2 font-bold text-sm uppercase">TRENDING NOW</div>
//               <div className="flex-1 text-[#2d2d2d] text-sm">{blogsData.hero.blogs[0]?.title}</div>
//               <button className="p-2 border border-[#f5f7fa]"><ChevronLeft size={16} /></button>
//               <button className="p-2 border border-[#f5f7fa]"><ChevronRight size={16} /></button>
//             </div>

//             <div className="grid grid-cols-2 gap-6 h-[650px]">
//               {/* Left: 1 Large */}
//               <HeroLarge blog={blogsData.hero.blogs[0]} formatDate={formatDate} />
              
//               {/* Right: 1 top + 2 bottom */}
//               <div className="flex flex-col gap-6">
//                 <HeroMedium blog={blogsData.hero.blogs[1]} formatDate={formatDate} />
//                 <div className="grid grid-cols-2 gap-6 flex-1">
//                   <HeroSmall blog={blogsData.hero.blogs[2]} formatDate={formatDate} />
//                   <HeroSmall blog={blogsData.hero.blogs[3]} formatDate={formatDate} />
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         <div className="flex gap-8">
//           {/* MAIN CONTENT */}
//           <div className="flex-1">
//             {/* SECTION 2: DON'T MISS - 1 large left + list right */}
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
//               />
//             )}

//             {/* SECTION 3: LIFESTYLE NEWS - 2 large + 4 small grid */}
//             {blogsData.sections?.find((s: any) => s.id === 'second-collage')?.blogs.length > 0 && (
//               <LifestyleNewsSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'second-collage')}
//                 formatDate={formatDate}
//               />
//             )}

//             {/* SECTION 4: HOUSE DESIGN - 3 in one row */}
//             {blogsData.sections?.find((s: any) => s.id === 'one-line-section')?.blogs.length > 0 && (
//               <HouseDesignSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'one-line-section')}
//                 formatDate={formatDate}
//               />
//             )}

//             {/* SECTION 5: PERFORMANCE - Full width list */}
//             {blogsData.sections?.find((s: any) => s.id === 'before-latest')?.blogs.length > 0 && (
//               <PerformanceSection 
//                 section={blogsData.sections.find((s: any) => s.id === 'before-latest')}
//                 formatDate={formatDate}
//               />
//             )}

//             {/* SECTION 6: LATEST ARTICLES - 2 per row */}
//             {blogsData.latest?.blogs.length > 0 && (
//               <LatestSection 
//                 blogs={blogsData.latest.blogs}
//                 formatDate={formatDate}
//                 currentPage={sectionPages['latest']}
//                 onPageChange={(page) => setSectionPages(prev => ({ ...prev, latest: page }))}
//               />
//             )}
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <aside className="hidden lg:block w-[300px] space-y-8 sticky top-8 self-start">
//             {/* Stay Connected */}
//             <div className="bg-[#1e2556] text-white p-6">
//               <h3 className="font-bold text-sm uppercase mb-4">STAY CONNECTED</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-3 border-b border-white/20">
//                   <span className="text-sm">24,856 Fans</span>
//                   <button className="text-[#7cc6ee] text-sm font-bold hover:underline">LIKE</button>
//                 </div>
//                 <div className="flex items-center justify-between py-3 border-b border-white/20">
//                   <span className="text-sm">3,913 Followers</span>
//                   <button className="text-[#7cc6ee] text-sm font-bold hover:underline">FOLLOW</button>
//                 </div>
//                 <div className="flex items-center justify-between py-3">
//                   <span className="text-sm">22,800 Subscribers</span>
//                   <button className="text-[#7cc6ee] text-sm font-bold hover:underline">SUBSCRIBE</button>
//                 </div>
//               </div>
//             </div>

//             {/* Prompts Card */}
//             <Link href="/prompts" className="block bg-gradient-to-br from-purple-500 to-pink-500 p-6 hover:shadow-lg transition-shadow">
//               <h3 className="text-white text-lg font-bold mb-2">AI Prompts</h3>
//               <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
//               <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">Explore Now →</span>
//             </Link>

//             {/* Ad Space */}
//             <div className="bg-[#f5f7fa] p-4">
//               <div className="h-[250px] bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg font-bold">
//                 300 x 250 Ad
//               </div>
//             </div>

//             {/* Make It Modern - 2x2 Grid */}
//             {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
//               <div>
//                 <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
//                   MAKE IT MODERN
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
//                     <SmallGridCard key={blog.id} blog={blog} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Legal Tech Map Card */}
//             <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:shadow-lg transition-shadow">
//               <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
//               <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
//               <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">View Map →</span>
//             </Link>

//             {/* Holiday Recipes / Most Popular */}
//             {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
//               <div>
//                 <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4">
//                   HOLIDAY RECIPES
//                 </div>
//                 <div className="space-y-4">
//                   {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
//                     <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Most Popular */}
//             <div>
//               <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
//                 MOST POPULAR
//               </div>
//               <div className="space-y-4">
//                 {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
//                   <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
//                 ))}
//               </div>
//             </div>

//             {/* Recent Comments */}
//             <div>
//               <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
//                 RECENT COMMENTS
//               </div>
//               <div className="space-y-3 text-sm">
//                 <p className="text-[#334155]">
//                   <span className="font-semibold text-[#1e2556]">Mary Dill</span> on{' '}
//                   <span className="italic">Another Big Apartment Project</span>
//                 </p>
//                 <p className="text-[#334155]">
//                   <span className="font-semibold text-[#1e2556]">Georgia Summer</span> on{' '}
//                   <span className="italic">Patricia Urquiola Coats</span>
//                 </p>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

// // HERO COMPONENTS
// function HeroLarge({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group relative h-full overflow-hidden block">
//       {blog.bannerImage ? (
//         <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//       ) : (
//         <div className="w-full h-full bg-[#f5f7fa]"></div>
//       )}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//         {blog.currentTag && (
//           <span className="inline-block bg-[#7cc6ee] px-3 py-1 text-xs font-bold uppercase mb-3">{blog.currentTag}</span>
//         )}
//         <h2 className="text-3xl font-bold mb-3 group-hover:text-[#7cc6ee] transition-colors">{blog.title}</h2>
//         <div className="text-sm">
//           <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
//         </div>
//       </div>
//     </Link>
//   );
// }

// function HeroMedium({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group relative h-[310px] overflow-hidden block">
//       {blog.bannerImage ? (
//         <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//       ) : (
//         <div className="w-full h-full bg-[#f5f7fa]"></div>
//       )}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//         {blog.currentTag && (
//           <span className="inline-block bg-[#7cc6ee] px-3 py-1 text-xs font-bold uppercase mb-2">{blog.currentTag}</span>
//         )}
//         <h3 className="text-xl font-bold group-hover:text-[#7cc6ee] transition-colors">{blog.title}</h3>
//       </div>
//     </Link>
//   );
// }

// function HeroSmall({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group relative h-full overflow-hidden block">
//       {blog.bannerImage ? (
//         <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//       ) : (
//         <div className="w-full h-full bg-[#f5f7fa]"></div>
//       )}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//         {blog.currentTag && (
//           <span className="inline-block bg-[#7cc6ee] px-2 py-1 text-xs font-bold uppercase mb-2">{blog.currentTag}</span>
//         )}
//         <h4 className="text-sm font-bold line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">{blog.title}</h4>
//       </div>
//     </Link>
//   );
// }

// // DON'T MISS SECTION
// function DontMissSection({ section, formatDate, currentPage, onPageChange, selectedCategory, onCategoryChange }: any) {
//   const itemsPerPage = 1;
//   const listItemsPerPage = 4;
  
//   const filteredBlogs = selectedCategory === 'All' 
//     ? section.blogs 
//     : section.blogs.filter((b: any) => (b.tags as any[])?.some(t => t.tag === selectedCategory));
    
//   const featuredBlog = filteredBlogs[(currentPage - 1) * itemsPerPage];
//   const listBlogs = filteredBlogs.slice(0, listItemsPerPage);
//   const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

//   return (
//     <section className="mb-12">
//       <div className="mb-6">
//         <div className="bg-yellow-500 text-[#1e2556] px-6 py-3 font-bold text-sm uppercase inline-block mb-4">
//           {section.title}
//         </div>
        
//         {section.hasCategories && section.categories.length > 1 && (
//           <div className="flex gap-6 border-b border-[#f5f7fa]">
//             {section.categories.map((cat: string) => (
//               <button
//                 key={cat}
//                 onClick={() => onCategoryChange(cat)}
//                 className={`pb-2 text-sm font-medium ${
//                   selectedCategory === cat ? 'text-[#1e2556] border-b-2 border-[#1e2556]' : 'text-[#334155] hover:text-[#7cc6ee]'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-8">
//         {/* Left: Featured */}
//         {featuredBlog && (
//           <div>
//             <Link href={`/blog/${featuredBlog.slug}`} className="group block">
//               <div className="relative h-[280px] overflow-hidden mb-4">
//                 {featuredBlog.bannerImage ? (
//                   <img src={featuredBlog.bannerImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 ) : (
//                   <div className="w-full h-full bg-[#f5f7fa]"></div>
//                 )}
//                 {featuredBlog.currentTag && (
//                   <span className="absolute top-3 left-3 bg-[#1e2556] text-white px-3 py-1 text-xs font-bold uppercase">
//                     {featuredBlog.currentTag}
//                   </span>
//                 )}
//               </div>
//               <h3 className="text-2xl font-bold text-[#1e2556] mb-2 group-hover:text-[#7cc6ee] transition-colors">
//                 {featuredBlog.title}
//               </h3>
//               <div className="text-sm text-[#334155] mb-3">
//                 <span className="font-semibold">Armin Vans</span> - {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
//               </div>
//               {featuredBlog.content && (
//                 <p className="text-[#2d2d2d] text-sm line-clamp-3">
//                   {featuredBlog.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
//                 </p>
//               )}
//             </Link>
            
//             {totalPages > 1 && (
//               <div className="flex gap-2 mt-6">
//                 <button 
//                   onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-[#f5f7fa] disabled:opacity-30"
//                 >
//                   <ChevronLeft size={16} />
//                 </button>
//                 <button 
//                   onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 border border-[#f5f7fa] disabled:opacity-30"
//                 >
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Right: List */}
//         <div className="space-y-6">
//           {listBlogs.map((blog: any) => (
//             <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex gap-4">
//               <div className="relative w-[120px] h-[90px] flex-shrink-0 overflow-hidden">
//                 {blog.bannerImage ? (
//                   <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                 ) : (
//                   <div className="w-full h-full bg-[#f5f7fa]"></div>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-[#1e2556] mb-1 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//                   {blog.title}
//                 </h4>
//                 <div className="text-xs text-[#334155]">
//                   {formatDate(blog.publishedAt || blog.createdAt)}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // LIFESTYLE NEWS SECTION
// function LifestyleNewsSection({ section, formatDate }: any) {
//   return (
//     <section className="mb-12">
//       <div className="bg-green-700 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       {/* 2 Large Cards */}
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         {section.blogs.slice(0, 2).map((blog: any) => (
//           <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>

//       {/* 4 Small Cards */}
//       <div className="grid grid-cols-2 gap-6">
//         {section.blogs.slice(2, 6).map((blog: any) => (
//           <SmallCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // HOUSE DESIGN SECTION
// function HouseDesignSection({ section, formatDate }: any) {
//   return (
//     <section className="mb-12">
//       <div className="bg-gray-600 text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {section.blogs.slice(0, 3).map((blog: any) => (
//           <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // PERFORMANCE SECTION
// function PerformanceSection({ section, formatDate }: any) {
//   return (
//     <section className="mb-12">
//       <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         {section.title}
//       </div>

//       <div className="space-y-6">
//         {section.blogs.slice(0, 4).map((blog: any) => (
//           <FullWidthCard key={blog.id} blog={blog} formatDate={formatDate} />
//         ))}
//       </div>
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
//     <section className="mb-12">
//       <div className="bg-[#1e2556] text-white px-6 py-3 font-bold text-sm uppercase inline-block mb-6">
//         LATEST ARTICLES
//       </div>

//       <div className="grid grid-cols-2 gap-6 mb-8">
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

// // CARD COMPONENTS
// function StandardCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative h-[200px] overflow-hidden mb-3">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//         {blog.currentTag && (
//           <span className="absolute top-3 left-3 bg-[#1e2556] text-white px-3 py-1 text-xs font-bold uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//       </div>
//       <h3 className="text-lg font-bold text-[#1e2556] mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h3>
//       <div className="text-sm text-[#334155]">
//         <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
//       </div>
//     </Link>
//   );
// }

// function SmallCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex gap-4">
//       <div className="relative w-[150px] h-[110px] flex-shrink-0 overflow-hidden">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//       </div>
//       <div className="flex-1">
//         <h4 className="font-bold text-[#1e2556] mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h4>
//         <div className="text-xs text-[#334155]">
//           {formatDate(blog.publishedAt || blog.createdAt)}
//         </div>
//       </div>
//     </Link>
//   );
// }

// function FullWidthCard({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex gap-6 pb-6 border-b border-[#f5f7fa]">
//       <div className="relative w-[200px] h-[150px] flex-shrink-0 overflow-hidden">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//       </div>
//       <div className="flex-1">
//         <h3 className="text-xl font-bold text-[#1e2556] mb-2 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h3>
//         <div className="text-sm text-[#334155] mb-3">
//           <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
//         </div>
//         {blog.content && (
//           <p className="text-[#2d2d2d] text-sm line-clamp-2">
//             {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// }

// function SmallGridCard({ blog }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative h-[90px] overflow-hidden mb-2">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//         <span className="absolute bottom-2 left-2 bg-[#1e2556] text-white px-2 py-1 text-xs font-bold">
//           Make it Modern
//         </span>
//       </div>
//       <h5 className="text-xs font-bold text-[#1e2556] line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h5>
//     </Link>
//   );
// }

// function SidebarListItem({ blog, formatDate }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group block">
//       <div className="relative h-[120px] overflow-hidden mb-2">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//         <span className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-bold">
//           Recipes
//         </span>
//       </div>
//       <h5 className="text-sm font-bold text-[#1e2556] line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
//         {blog.title}
//       </h5>
//       <div className="text-xs text-[#334155]">{formatDate(blog.publishedAt || blog.createdAt)}</div>
//     </Link>
//   );
// }

// function PopularItem({ blog, formatDate, number }: any) {
//   return (
//     <Link href={`/blog/${blog.slug}`} className="group flex gap-3">
//       <div className="relative w-[80px] h-[60px] flex-shrink-0 overflow-hidden">
//         {blog.bannerImage ? (
//           <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         ) : (
//           <div className="w-full h-full bg-[#f5f7fa]"></div>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h5 className="text-sm font-bold text-[#1e2556] line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
//           {blog.title}
//         </h5>
//         <div className="text-xs text-[#334155]">{formatDate(blog.publishedAt || blog.createdAt)}</div>
//       </div>
//     </Link>
//   );
// }

// // PAGINATION
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
//     <div className="flex items-center justify-center gap-2">
//       {currentPage > 1 && (
//         <button onClick={() => onPageChange(currentPage - 1)} className="w-10 h-10 flex items-center justify-center border border-[#f5f7fa] hover:bg-[#f5f7fa]">
//           &lt;
//         </button>
//       )}
//       {getPages().map((page, idx) => (
//         page === '...' ? (
//           <span key={`ellipsis-${idx}`} className="px-2">...</span>
//         ) : (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`w-10 h-10 flex items-center justify-center font-medium ${
//               page === currentPage ? 'bg-[#7cc6ee] text-white' : 'border border-[#f5f7fa] hover:bg-[#f5f7fa]'
//             }`}
//           >
//             {page}
//           </button>
//         )
//       ))}
//       {currentPage < totalPages && (
//         <button onClick={() => onPageChange(currentPage + 1)} className="w-10 h-10 flex items-center justify-center border border-[#f5f7fa] hover:bg-[#f5f7fa]">
//           &gt;
//         </button>
//       )}
//       <span className="ml-4 text-sm text-[#334155]">Page {currentPage} of {totalPages}</span>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs/public');
      if (response.ok) {
        const data = await response.json();
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

        {/* Banner - Responsive */}
        <a href="https://www.zoho.com/contracts/ebooks/state-of-contract-management.html" target="_blank" rel="noopener noreferrer" className="block mb-6 sm:mb-8 lg:mb-0">
          <img
            src="/images/banner.jpg"
            alt="Resources Banner"
            className="w-full h-auto object-cover cursor-pointer"
          />
        </a>

        {/* SECTION 1: HERO - Responsive Layout */}
        {blogsData.hero?.blogs && blogsData.hero.blogs.length >= 4 && (
          <section className="mb-8 sm:mb-10 lg:mb-12">
            {/* Header - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-[#1e2556] text-white px-4 sm:px-6 py-2 font-bold text-xs sm:text-sm uppercase">TRENDING NOW</div>
              <div className="flex-1 text-[#2d2d2d] text-xs sm:text-sm line-clamp-1">{blogsData.hero.blogs[0]?.title}</div>
              <div className="flex gap-2 sm:gap-0">
                <button className="p-2 border border-[#f5f7fa]"><ChevronLeft size={16} /></button>
                <button className="p-2 border border-[#f5f7fa]"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Hero Grid - Responsive: stacks on mobile, 2-col on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:h-[650px]">
              {/* Left: 1 Large */}
              <HeroLarge blog={blogsData.hero.blogs[0]} formatDate={formatDate} />
              
              {/* Right: 1 top + 2 bottom - Responsive */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <HeroMedium blog={blogsData.hero.blogs[1]} formatDate={formatDate} />
                <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
                  <HeroSmall blog={blogsData.hero.blogs[2]} formatDate={formatDate} />
                  <HeroSmall blog={blogsData.hero.blogs[3]} formatDate={formatDate} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Layout: Content + Sidebar - Responsive */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            {/* SECTION 2: DON'T MISS */}
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
              />
            )}

            {/* MOBILE: Stay Connected (shown only on mobile) */}
            <div className="lg:hidden mb-8 sm:mb-10">
              <StayConnected />
            </div>

            {/* SECTION 3: LIFESTYLE NEWS */}
            {blogsData.sections?.find((s: any) => s.id === 'second-collage')?.blogs.length > 0 && (
              <LifestyleNewsSection 
                section={blogsData.sections.find((s: any) => s.id === 'second-collage')}
                formatDate={formatDate}
              />
            )}

            {/* MOBILE: AI Prompts Card (shown only on mobile) */}
            <div className="lg:hidden mb-8 sm:mb-10">
              <Link href="/prompts" className="block bg-gradient-to-br from-purple-500 to-pink-500 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-white text-lg font-bold mb-2">AI Prompts</h3>
                <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
                <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">Explore Now →</span>
              </Link>
            </div>

            {/* SECTION 4: HOUSE DESIGN */}
            {blogsData.sections?.find((s: any) => s.id === 'one-line-section')?.blogs.length > 0 && (
              <HouseDesignSection 
                section={blogsData.sections.find((s: any) => s.id === 'one-line-section')}
                formatDate={formatDate}
              />
            )}

            {/* MOBILE: Make It Modern Grid (shown only on mobile) */}
            {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
              <div className="lg:hidden mb-8 sm:mb-10">
                <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                  MAKE IT MODERN
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
                    <SmallGridCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: PERFORMANCE */}
            {blogsData.sections?.find((s: any) => s.id === 'before-latest')?.blogs.length > 0 && (
              <PerformanceSection 
                section={blogsData.sections.find((s: any) => s.id === 'before-latest')}
                formatDate={formatDate}
              />
            )}

            {/* MOBILE: Legal Tech Map Card (shown only on mobile) */}
            <div className="lg:hidden mb-8 sm:mb-10">
              <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
                <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
                <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">View Map →</span>
              </Link>
            </div>

            {/* SECTION 6: LATEST ARTICLES */}
            {blogsData.latest?.blogs.length > 0 && (
              <LatestSection 
                blogs={blogsData.latest.blogs}
                formatDate={formatDate}
                currentPage={sectionPages['latest']}
                onPageChange={(page) => setSectionPages(prev => ({ ...prev, latest: page }))}
              />
            )}

            {/* MOBILE: Most Popular (shown only on mobile) */}
            <div className="lg:hidden mb-8 sm:mb-10">
              <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
                  <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
                ))}
              </div>
            </div>

            {/* MOBILE: Holiday Recipes (shown only on mobile) */}
            {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
              <div className="lg:hidden mb-8 sm:mb-10">
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                  HOLIDAY RECIPES
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - Visible only on desktop */}
          <aside className="hidden lg:block w-[300px] space-y-8 sticky top-8 self-start">
            {/* Stay Connected */}
            <StayConnected />

            {/* Prompts Card */}
            <Link href="/prompts" className="block bg-gradient-to-br from-purple-500 to-pink-500 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-white text-lg font-bold mb-2">AI Prompts</h3>
              <p className="text-white/90 text-sm mb-4">Discover powerful prompts for legal work</p>
              <span className="inline-block px-4 py-2 bg-white text-purple-600 font-medium text-sm">Explore Now →</span>
            </Link>

            {/* Ad Space */}
            <div className="bg-[#f5f7fa] p-4">
              <div className="h-[250px] bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg font-bold">
                300 x 250 Ad
              </div>
            </div>

            {/* Make It Modern - 2x2 Grid */}
            {blogsData.sidebar?.firstMini?.blogs.length > 0 && (
              <div>
                <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                  MAKE IT MODERN
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {blogsData.sidebar.firstMini.blogs.slice(0, 4).map((blog: any) => (
                    <SmallGridCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            )}

            {/* Legal Tech Map Card */}
            <Link href="/legal-tech-map" className="block bg-[#1e2556] text-white p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold mb-2">Legal Tech Map</h3>
              <p className="text-white/90 text-sm mb-4">Explore the legal technology landscape</p>
              <span className="inline-block px-4 py-2 bg-[#7cc6ee] text-white font-medium text-sm">View Map →</span>
            </Link>

            {/* Holiday Recipes / Most Popular */}
            {blogsData.sidebar?.secondMini?.blogs.length > 0 && (
              <div>
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                  HOLIDAY RECIPES
                </div>
                <div className="space-y-4">
                  {blogsData.sidebar.secondMini.blogs.slice(0, 3).map((blog: any) => (
                    <SidebarListItem key={blog.id} blog={blog} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}

            {/* Most Popular */}
            <div>
              <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                {blogsData.latest?.blogs.slice(0, 3).map((blog: any, idx: number) => (
                  <PopularItem key={blog.id} blog={blog} formatDate={formatDate} number={idx + 1} />
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div>
              <div className="bg-[#1e2556] text-white px-4 py-2 font-bold text-xs uppercase mb-4">
                RECENT COMMENTS
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-[#334155]">
                  <span className="font-semibold text-[#1e2556]">Mary Dill</span> on{' '}
                  <span className="italic">Another Big Apartment Project</span>
                </p>
                <p className="text-[#334155]">
                  <span className="font-semibold text-[#1e2556]">Georgia Summer</span> on{' '}
                  <span className="italic">Patricia Urquiola Coats</span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// STAY CONNECTED COMPONENT (reusable for mobile and desktop)
function StayConnected() {
  return (
    <div className="bg-[#1e2556] text-white p-6">
      <h3 className="font-bold text-sm uppercase mb-4">STAY CONNECTED</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-3 border-b border-white/20">
          <span className="text-sm">24,856 Fans</span>
          <button className="text-[#7cc6ee] text-sm font-bold hover:underline">LIKE</button>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-white/20">
          <span className="text-sm">3,913 Followers</span>
          <button className="text-[#7cc6ee] text-sm font-bold hover:underline">FOLLOW</button>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm">22,800 Subscribers</span>
          <button className="text-[#7cc6ee] text-sm font-bold hover:underline">SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
}

// HERO COMPONENTS - Responsive
function HeroLarge({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group relative h-[300px] sm:h-[400px] lg:h-full overflow-hidden block">
      {blog.bannerImage ? (
        <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-[#f5f7fa]"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
        {blog.currentTag && (
          <span className="inline-block bg-[#7cc6ee] px-2 sm:px-3 py-1 text-xs font-bold uppercase mb-2 sm:mb-3">{blog.currentTag}</span>
        )}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-[#7cc6ee] transition-colors line-clamp-3">{blog.title}</h2>
        <div className="text-xs sm:text-sm">
          <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
        </div>
      </div>
    </Link>
  );
}

function HeroMedium({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group relative h-[200px] sm:h-[250px] lg:h-[310px] overflow-hidden block">
      {blog.bannerImage ? (
        <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-[#f5f7fa]"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        {blog.currentTag && (
          <span className="inline-block bg-[#7cc6ee] px-2 sm:px-3 py-1 text-xs font-bold uppercase mb-2">{blog.currentTag}</span>
        )}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold group-hover:text-[#7cc6ee] transition-colors line-clamp-2">{blog.title}</h3>
      </div>
    </Link>
  );
}

function HeroSmall({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group relative h-full min-h-[150px] sm:min-h-[180px] overflow-hidden block">
      {blog.bannerImage ? (
        <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-[#f5f7fa]"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
        {blog.currentTag && (
          <span className="inline-block bg-[#7cc6ee] px-2 py-1 text-xs font-bold uppercase mb-1 sm:mb-2">{blog.currentTag}</span>
        )}
        <h4 className="text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">{blog.title}</h4>
      </div>
    </Link>
  );
}

// DON'T MISS SECTION - Responsive
function DontMissSection({ section, formatDate, currentPage, onPageChange, selectedCategory, onCategoryChange }: any) {
  const itemsPerPage = 1;
  const listItemsPerPage = 4;
  
  const filteredBlogs = selectedCategory === 'All' 
    ? section.blogs 
    : section.blogs.filter((b: any) => (b.tags as any[])?.some(t => t.tag === selectedCategory));
    
  const featuredBlog = filteredBlogs[(currentPage - 1) * itemsPerPage];
  const listBlogs = filteredBlogs.slice(0, listItemsPerPage);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  return (
    <section className="mb-8 sm:mb-10 lg:mb-12">
      <div className="mb-4 sm:mb-6">
        <div className="bg-yellow-500 text-[#1e2556] px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase inline-block mb-3 sm:mb-4">
          {section.title}
        </div>
        
        {section.hasCategories && section.categories.length > 1 && (
          <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-[#f5f7fa] overflow-x-auto">
            {section.categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat ? 'text-[#1e2556] border-b-2 border-[#1e2556]' : 'text-[#334155] hover:text-[#7cc6ee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Stacks on mobile, 2-col on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Featured */}
        {featuredBlog && (
          <div>
            <Link href={`/blog/${featuredBlog.slug}`} className="group block">
              <div className="relative h-[200px] sm:h-[250px] lg:h-[280px] overflow-hidden mb-3 sm:mb-4">
                {featuredBlog.bannerImage ? (
                  <img src={featuredBlog.bannerImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-[#f5f7fa]"></div>
                )}
                {featuredBlog.currentTag && (
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#1e2556] text-white px-2 sm:px-3 py-1 text-xs font-bold uppercase">
                    {featuredBlog.currentTag}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e2556] mb-2 group-hover:text-[#7cc6ee] transition-colors line-clamp-3">
                {featuredBlog.title}
              </h3>
              <div className="text-xs sm:text-sm text-[#334155] mb-2 sm:mb-3">
                <span className="font-semibold">Armin Vans</span> - {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
              </div>
              {featuredBlog.content && (
                <p className="text-[#2d2d2d] text-xs sm:text-sm line-clamp-3">
                  {featuredBlog.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
                </p>
              )}
            </Link>
            
            {totalPages > 1 && (
              <div className="flex gap-2 mt-4 sm:mt-6">
                <button 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#f5f7fa] disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#f5f7fa] disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Right: List */}
        <div className="space-y-4 sm:space-y-6">
          {listBlogs.map((blog: any) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex gap-3 sm:gap-4">
              <div className="relative w-[100px] sm:w-[120px] h-[75px] sm:h-[90px] flex-shrink-0 overflow-hidden">
                {blog.bannerImage ? (
                  <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-[#f5f7fa]"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-[#1e2556] mb-1 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
                  {blog.title}
                </h4>
                <div className="text-xs text-[#334155]">
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// LIFESTYLE NEWS SECTION - Responsive
function LifestyleNewsSection({ section, formatDate }: any) {
  return (
    <section className="mb-8 sm:mb-10 lg:mb-12">
      <div className="bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase inline-block mb-4 sm:mb-6">
        {section.title}
      </div>

      {/* 2 Large Cards - Responsive: 1 col on mobile, 2 on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {section.blogs.slice(0, 2).map((blog: any) => (
          <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>

      {/* 4 Small Cards - Responsive: 1 col on mobile, 2 on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {section.blogs.slice(2, 6).map((blog: any) => (
          <SmallCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>
    </section>
  );
}

// HOUSE DESIGN SECTION - Responsive
function HouseDesignSection({ section, formatDate }: any) {
  return (
    <section className="mb-8 sm:mb-10 lg:mb-12">
      <div className="bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase inline-block mb-4 sm:mb-6">
        {section.title}
      </div>

      {/* 3 columns: 1 on mobile, 2 on sm, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {section.blogs.slice(0, 3).map((blog: any) => (
          <StandardCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>
    </section>
  );
}

// PERFORMANCE SECTION - Responsive
function PerformanceSection({ section, formatDate }: any) {
  return (
    <section className="mb-8 sm:mb-10 lg:mb-12">
      <div className="bg-[#1e2556] text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase inline-block mb-4 sm:mb-6">
        {section.title}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {section.blogs.slice(0, 4).map((blog: any) => (
          <FullWidthCard key={blog.id} blog={blog} formatDate={formatDate} />
        ))}
      </div>
    </section>
  );
}

// LATEST SECTION - Responsive
function LatestSection({ blogs, formatDate, currentPage, onPageChange }: any) {
  const itemsPerPage = 6;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogs.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <section className="mb-8 sm:mb-10 lg:mb-12">
      <div className="bg-[#1e2556] text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase inline-block mb-4 sm:mb-6">
        LATEST ARTICLES
      </div>

      {/* Grid: 1 col on mobile, 2 on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

// CARD COMPONENTS - Responsive
function StandardCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative h-[180px] sm:h-[200px] overflow-hidden mb-2 sm:mb-3">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
        {blog.currentTag && (
          <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#1e2556] text-white px-2 sm:px-3 py-1 text-xs font-bold uppercase">
            {blog.currentTag}
          </span>
        )}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#1e2556] mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h3>
      <div className="text-xs sm:text-sm text-[#334155]">
        <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
      </div>
    </Link>
  );
}

function SmallCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex gap-3 sm:gap-4">
      <div className="relative w-[120px] sm:w-[150px] h-[90px] sm:h-[110px] flex-shrink-0 overflow-hidden">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm sm:text-base text-[#1e2556] mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h4>
        <div className="text-xs text-[#334155]">
          {formatDate(blog.publishedAt || blog.createdAt)}
        </div>
      </div>
    </Link>
  );
}

function FullWidthCard({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[#f5f7fa]">
      <div className="relative w-full sm:w-[200px] h-[180px] sm:h-[150px] flex-shrink-0 overflow-hidden">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-[#1e2556] mb-1 sm:mb-2 group-hover:text-[#7cc6ee] transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <div className="text-xs sm:text-sm text-[#334155] mb-2 sm:mb-3">
          <span className="font-semibold">Armin Vans</span> - {formatDate(blog.publishedAt || blog.createdAt)}
        </div>
        {blog.content && (
          <p className="text-[#2d2d2d] text-xs sm:text-sm line-clamp-2">
            {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
          </p>
        )}
      </div>
    </Link>
  );
}

function SmallGridCard({ blog }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative h-[90px] overflow-hidden mb-2">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
        <span className="absolute bottom-2 left-2 bg-[#1e2556] text-white px-2 py-1 text-xs font-bold">
          Make it Modern
        </span>
      </div>
      <h5 className="text-xs font-bold text-[#1e2556] line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h5>
    </Link>
  );
}

function SidebarListItem({ blog, formatDate }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative h-[120px] overflow-hidden mb-2">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
        <span className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-bold">
          Recipes
        </span>
      </div>
      <h5 className="text-sm font-bold text-[#1e2556] line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
        {blog.title}
      </h5>
      <div className="text-xs text-[#334155]">{formatDate(blog.publishedAt || blog.createdAt)}</div>
    </Link>
  );
}

function PopularItem({ blog, formatDate, number }: any) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex gap-3">
      <div className="relative w-[80px] h-[60px] flex-shrink-0 overflow-hidden">
        {blog.bannerImage ? (
          <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa]"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-bold text-[#1e2556] line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h5>
        <div className="text-xs text-[#334155]">{formatDate(blog.publishedAt || blog.createdAt)}</div>
      </div>
    </Link>
  );
}

// PAGINATION - Responsive
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
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#f5f7fa] hover:bg-[#f5f7fa] text-sm sm:text-base"
          >
            &lt;
          </button>
        )}
        {getPages().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-1 sm:px-2 text-sm sm:text-base">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-medium text-sm sm:text-base ${
                page === currentPage ? 'bg-[#7cc6ee] text-white' : 'border border-[#f5f7fa] hover:bg-[#f5f7fa]'
              }`}
            >
              {page}
            </button>
          )
        ))}
        {currentPage < totalPages && (
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#f5f7fa] hover:bg-[#f5f7fa] text-sm sm:text-base"
          >
            &gt;
          </button>
        )}
      </div>
      <span className="text-xs sm:text-sm text-[#334155]">Page {currentPage} of {totalPages}</span>
    </div>
  );
}