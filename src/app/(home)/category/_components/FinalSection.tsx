
// import React, { useState } from 'react';
// import { Menu, Grid3X3 } from 'lucide-react';
// import PremiumRfpForm from './CreateRfp';

// const FinalSection = ({ category }) => {
//   const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);

//   // URL mapping for different categories
//   const categoryUrls = {
//     'CONTRACT_LIFECYCLE_MANAGEMENT': 'https://dreamlegal.in/blog/guide-to-find-best-contract-lifecycle-management-tools-for-lawyers',
//     'IP_MANAGEMENT': 'https://dreamlegal.in/blog/guide-to-find-best-intellectual-property-management-tools-for-lawyers',
//     'E_DISCOVERY': 'https://dreamlegal.in/blog/guide-to-find-best-e-discovery-tools-for-lawyers',
//     'DOCUMENT_MANAGEMENT_SYSTEM': 'https://dreamlegal.in/blog/guide-to-find-best-document-management-system-dms-for-lawyers-1',
//     'LEGAL_RESEARCH': 'https://dreamlegal.in/blog/guide-to-find-best-legal-research-tools',
//     'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'https://dreamlegal.in/blog/guide-to-find-best-litigation-management-analytics-tools-for-lawyers',
//     'LEGAL_AI': 'https://dreamlegal.in/blog/ai-in-legal-practice-a-strategic-guide-for-modern-law-firms'
//   };

//   // Display name mapping for categories
//   const categoryDisplayNames = {
//     'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
//     'IP_MANAGEMENT': 'IP Management',
//     'E_DISCOVERY': 'E-Discovery',
//     'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
//     'LEGAL_RESEARCH': 'Legal Research',
//     'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management and Analytics',
//     'LEGAL_AI': 'Legal AI'
//   };

//   const handleBlogClick = () => {
//     const blogUrl = categoryUrls[category];
//     if (blogUrl) {
//       window.open(blogUrl, '_blank');
//     }
//   };

//   const handleRfpClick = () => {
//     setIsRfpFormOpen(true);
//   };

//   // Get the display name for the category
//   const categoryDisplayName = categoryDisplayNames[category] || 'Legal Tools';

//   return (
//     <div className="w-full">
//       {/* Full width dark container */}
//       <div 
//         className="w-full py-8 px-4"
//         style={{ backgroundColor: '#f5f7fa' }}
//       >
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           {/* Left Box - Blog Link */}
//           <div 
//             onClick={handleBlogClick}
//             className="bg-white p-6 rounded cursor-pointer hover:shadow-md transition-shadow flex items-center gap-4"
//           >
//             <Menu className="w-6 h-6" style={{ color: '#1e2556' }} />
//             <span 
//               className="text-lg font-medium"
//               style={{ color: '#1e2556' }}
//             >
//               Read our guide on {categoryDisplayName}
//             </span>
//           </div>

//           {/* Right Box - RFP Form */}
//           <div 
//             onClick={handleRfpClick}
//             className="bg-white p-6 rounded cursor-pointer hover:shadow-md transition-shadow flex items-center gap-4"
//           >
//             <Grid3X3 className="w-6 h-6" style={{ color: '#1e2556' }} />
//             <span 
//               className="text-lg font-medium"
//               style={{ color: '#1e2556' }}
//             >
//               Talk to an Expert
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* RFP Form Modal */}
//       {isRfpFormOpen && (
//         <PremiumRfpForm 
//           isOpen={isRfpFormOpen} 
//           onClose={() => setIsRfpFormOpen(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default FinalSection;
import React, { useState, useEffect } from 'react';
import { Menu, Grid3X3, ChevronLeft, ChevronRight, Calendar, Clock, Book } from 'lucide-react';
import Image from 'next/image';
import PremiumRfpForm from './CreateRfp';

const FinalSection = ({ category }) => {
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // URL mapping for different categories
  const categoryUrls = {
    'CONTRACT_LIFECYCLE_MANAGEMENT': 'https://dreamlegal.in/blog/guide-to-find-best-contract-lifecycle-management-tools-for-lawyers',
    'IP_MANAGEMENT': 'https://dreamlegal.in/blog/guide-to-find-best-intellectual-property-management-tools-for-lawyers',
    'E_DISCOVERY': 'https://dreamlegal.in/blog/guide-to-find-best-e-discovery-tools-for-lawyers',
    'DOCUMENT_MANAGEMENT_SYSTEM': 'https://dreamlegal.in/blog/guide-to-find-best-document-management-system-dms-for-lawyers-1',
    'LEGAL_RESEARCH': 'https://dreamlegal.in/blog/guide-to-find-best-legal-research-tools',
    'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'https://dreamlegal.in/blog/guide-to-find-best-litigation-management-analytics-tools-for-lawyers',
    'LEGAL_AI': 'https://dreamlegal.in/blog/ai-in-legal-practice-a-strategic-guide-for-modern-law-firms'
  };

  // Display name mapping for categories
  const categoryDisplayNames = {
    'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
    'IP_MANAGEMENT': 'IP Management',
    'E_DISCOVERY': 'E-Discovery',
    'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
    'LEGAL_RESEARCH': 'Legal Research',
    'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management and Analytics',
    'LEGAL_AI': 'Legal AI'
  };

  // Fetch latest blogs
  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/latest-blogs?limit=5');
      
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.blogs) {
        setLatestBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to fetch latest blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const handleBlogClick = () => {
    const blogUrl = categoryUrls[category];
    if (blogUrl) {
      window.open(blogUrl, '_blank');
    }
  };

  const handleRfpClick = () => {
    setIsRfpFormOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      return '';
    }
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  // Navigate to blog post
  const navigateToBlog = (blogSlug) => {
    window.location.href = `/blog/${blogSlug}`;
  };

  // Slider navigation
  const nextSlide = () => {
    const maxSlides = Math.ceil(latestBlogs.length / 2) - 1;
    setCurrentSlide((prev) => (prev + 1) % (maxSlides + 1));
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(latestBlogs.length / 2) - 1;
    setCurrentSlide((prev) => (prev - 1 + maxSlides + 1) % (maxSlides + 1));
  };

  // Get the display name for the category
  const categoryDisplayName = categoryDisplayNames[category] || 'Legal Tools';

  return (
    <div className="w-full">
      {/* Full width dark container */}
      <div 
        className="w-full py-8 px-4"
        style={{ backgroundColor: '#f5f7fa' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Box - Blog Link */}
          <div 
            onClick={handleBlogClick}
            className="bg-white p-6 rounded cursor-pointer hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <Menu className="w-6 h-6" style={{ color: '#1e2556' }} />
            <span 
              className="text-lg font-medium"
              style={{ color: '#1e2556' }}
            >
              Read our guide on {categoryDisplayName}
            </span>
          </div>

          {/* Right Box - RFP Form */}
          <div 
            onClick={handleRfpClick}
            className="bg-white p-6 rounded cursor-pointer hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <Grid3X3 className="w-6 h-6" style={{ color: '#1e2556' }} />
            <span 
              className="text-lg font-medium"
              style={{ color: '#1e2556' }}
            >
              Talk to an Expert
            </span>
          </div>
        </div>
      </div>

      {/* Latest Insights Slider Section */}
      <div 
        className="w-full py-12 px-4"
        style={{ backgroundColor: '#f5f7fa' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
              Latest Insights from Us
            </h2>
            
            {/* Navigation Arrows */}
            {latestBlogs.length > 2 && (
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ color: '#1e2556' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ color: '#1e2556' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Slider Content */}
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#7cc6ee' }}></div>
            </div>
          ) : latestBlogs.length > 0 ? (
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestBlogs.slice(currentSlide * 2, currentSlide * 2 + 2).map((blog) => (
                  <div key={blog.id}>
                    {/* Compact Horizontal Card */}
                    <div 
                      onClick={() => navigateToBlog(blog.slug)}
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group h-32"
                    >
                      <div className="flex h-full">
                        {/* Left - Image */}
                        <div className="relative w-32 h-full flex-shrink-0">
                          {blog.bannerImage ? (
                            <Image
                              src={blog.bannerImage}
                              alt={blog.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#7cc6ee]/10 to-[#7cc6ee]/20">
                              <Book className="w-8 h-8" style={{ color: '#7cc6ee' }} />
                            </div>
                          )}
                        </div>

                        {/* Right - Content */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-semibold line-clamp-2 mb-2 group-hover:text-[#7cc6ee] transition-colors" style={{ color: '#1e2556' }}>
                              {blog.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                            {blog.content && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{calculateReadTime(blog.content)} min</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No latest insights available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* RFP Form Modal */}
      {isRfpFormOpen && (
        <PremiumRfpForm 
          isOpen={isRfpFormOpen} 
          onClose={() => setIsRfpFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default FinalSection;
