// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Calendar, Clock, Book } from 'lucide-react';

// const MentionedProductsSection = ({ productSlug, limit = 3, excludeBlogIds = [] }) => {
//   const [mentionedBlogs, setMentionedBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [error, setError] = useState(null);

//   // Fetch blogs that mention this product
//   const fetchMentionedBlogs = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Use POST endpoint for more advanced filtering
//       const response = await fetch('/api/mentioned-blogs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productSlug,
//           limit,
//           excludeBlogIds
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error fetching mentioned blogs: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data && data.blogs) {
//         setMentionedBlogs(data.blogs);
//       }
//     } catch (err) {
//       console.error('Failed to fetch mentioned blogs:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (productSlug) {
//       fetchMentionedBlogs();
//     }
//   }, [productSlug, limit]);

//   // Navigate to blog post
//   const navigateToBlog = (blogSlug) => {
//     window.location.href = `/blog/${blogSlug}`;
//   };

//   // Slider navigation for mobile
//   const nextSlide = () => {
//     const maxSlides = Math.ceil(mentionedBlogs.length / 1) - 1;
//     setCurrentSlide((prev) => (prev + 1) % (maxSlides + 1));
//   };

//   const prevSlide = () => {
//     const maxSlides = Math.ceil(mentionedBlogs.length / 1) - 1;
//     setCurrentSlide((prev) => (prev - 1 + maxSlides + 1) % (maxSlides + 1));
//   };

//   // Don't render if no product slug or no blogs found
//   if (!productSlug || (!loading && mentionedBlogs.length === 0)) {
//     return null;
//   }

//   return (
//     <div 
//       className="w-full py-12 px-4"
//       style={{ backgroundColor: '#f5f7fa' }}
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Heading */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
//               Articles Mentioning This Product
//             </h2>
//             <p className="text-gray-600 text-sm mt-1">
//               Discover insights and discussions about this product in our latest articles
//             </p>
//           </div>
          
//           {/* Navigation Arrows - Only show on mobile */}
//           {mentionedBlogs.length > 1 && (
//             <div className="flex gap-2 md:hidden">
//               <button
//                 onClick={prevSlide}
//                 className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
//                 style={{ color: '#1e2556' }}
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
//                 style={{ color: '#1e2556' }}
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Blog Cards Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#7cc6ee' }}></div>
//           </div>
//         ) : error ? (
//           <div className="text-center py-8">
//             <p className="text-red-500">Error loading articles: {error}</p>
//           </div>
//         ) : mentionedBlogs.length > 0 ? (
//           <div className="overflow-hidden">
//             {/* Desktop: Show 3 columns, Mobile: Show slider */}
//             <div className="hidden md:grid md:grid-cols-3 gap-6">
//               {mentionedBlogs.slice(0, 3).map((blog) => (
//                 <MentionedBlogCard 
//                   key={blog.id} 
//                   blog={blog} 
//                   onClick={() => navigateToBlog(blog.slug)} 
//                 />
//               ))}
//             </div>
            
//             {/* Mobile Slider */}
//             <div className="md:hidden">
//               <div className="grid grid-cols-1 gap-6">
//                 {mentionedBlogs.slice(currentSlide * 1, currentSlide * 1 + 1).map((blog) => (
//                   <MentionedBlogCard 
//                     key={blog.id} 
//                     blog={blog} 
//                     onClick={() => navigateToBlog(blog.slug)} 
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-gray-500">No articles mention this product yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Blog Card Component with Product Mention Indicator
// const MentionedBlogCard = ({ blog, onClick }) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     } catch (err) {
//       return '';
//     }
//   };

//   const calculateReadTime = (content) => {
//     if (!content) return 1;
//     const wordsPerMinute = 200;
//     const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return readTime < 1 ? 1 : readTime;
//   };

//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
//       style={{ aspectRatio: '1/1.1' }}
//     >
//       {/* Image Section */}
//       <div className="relative h-[65%] overflow-hidden">
//         {blog.bannerImage ? (
//           <img
//             src={blog.bannerImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7cc6ee]/10 to-[#7cc6ee]/20">
//             <Book className="w-10 h-10" style={{ color: '#7cc6ee' }} />
//           </div>
//         )}
        
//         {/* Product Mention Badge */}
//         {blog.mentionedProduct && (
//           <div className="absolute top-2 left-2">
//             <div className="bg-[#7cc6ee] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//               {blog.mentionedProduct.logoUrl && (
//                 <img 
//                   src={blog.mentionedProduct.logoUrl} 
//                   alt={blog.mentionedProduct.name}
//                   className="w-3 h-3 rounded-sm"
//                 />
//               )}
//               <span>Featured</span>
//             </div>
//           </div>
//         )}
        
//         {/* Overlay gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//       </div>

//       {/* Content Section */}
//       <div className="h-[35%] p-3 flex flex-col justify-between">
//         <div>
//           <h3 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-[#7cc6ee] transition-colors leading-tight" style={{ color: '#1e2556' }}>
//             {blog.title}
//           </h3>
          
//           {/* Product mentioned info */}
//           {blog.mentionedProduct && (
//             <p className="text-xs text-gray-500 mb-1 line-clamp-1">
//               Mentions {blog.mentionedProduct.name}
//             </p>
//           )}
//         </div>
        
//         <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
//           <div className="flex items-center gap-1">
//             <Calendar className="w-3 h-3" />
//             <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
//           </div>
//           {blog.content && (
//             <div className="flex items-center gap-1">
//               <Clock className="w-3 h-3" />
//               <span>{calculateReadTime(blog.content)} min</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentionedProductsSection;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Book } from 'lucide-react';

const MentionedProductsSection = ({ productSlug, limit = 3, excludeBlogIds = [] }) => {
  const [mentionedBlogs, setMentionedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);

  // Fetch blogs that mention this product
  const fetchMentionedBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use POST endpoint for more advanced filtering
      const response = await fetch('/api/mentioned-blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug,
          limit,
          excludeBlogIds
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching mentioned blogs: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.blogs) {
        setMentionedBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Failed to fetch mentioned blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productSlug) {
      fetchMentionedBlogs();
    }
  }, [productSlug, limit]);

  // Navigate to blog post
  const navigateToBlog = (blogSlug) => {
    window.location.href = `/blog/${blogSlug}`;
  };

  // Slider navigation for mobile
  const nextSlide = () => {
    const maxSlides = Math.ceil(mentionedBlogs.length / 1) - 1;
    setCurrentSlide((prev) => (prev + 1) % (maxSlides + 1));
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(mentionedBlogs.length / 1) - 1;
    setCurrentSlide((prev) => (prev - 1 + maxSlides + 1) % (maxSlides + 1));
  };

  // Don't render if no product slug or no blogs found
  if (!productSlug || (!loading && mentionedBlogs.length === 0)) {
    return null;
  }

  return (
    <div 
      className="w-full py-12 px-4"
      style={{ backgroundColor: '#f5f7fa' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
              Articles Mentioning This Product
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Discover insights and discussions about this product in our latest articles
            </p>
          </div>
          
          {/* Navigation Arrows - Only show on mobile */}
          {mentionedBlogs.length > 1 && (
            <div className="flex gap-2 md:hidden">
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

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: '#7cc6ee' }}></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading articles: {error}</p>
          </div>
        ) : mentionedBlogs.length > 0 ? (
          <div className="overflow-hidden">
            {/* Desktop: Show 3 columns, Mobile: Show slider */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {mentionedBlogs.slice(0, 3).map((blog) => (
                <MentionedBlogCard 
                  key={blog.id} 
                  blog={blog} 
                  onClick={() => navigateToBlog(blog.slug)} 
                />
              ))}
            </div>
            
            {/* Mobile Slider */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-6">
                {mentionedBlogs.slice(currentSlide * 1, currentSlide * 1 + 1).map((blog) => (
                  <MentionedBlogCard 
                    key={blog.id} 
                    blog={blog} 
                    onClick={() => navigateToBlog(blog.slug)} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No articles mention this product yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Blog Card Component with Product Mention Indicator
const MentionedBlogCard = ({ blog, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      return '';
    }
  };

  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer"
      style={{ aspectRatio: '1/1.1' }}
    >
      {/* Image Section */}
      <div className="relative h-[65%] overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7cc6ee]/10 to-[#7cc6ee]/20">
            <Book className="w-10 h-10" style={{ color: '#7cc6ee' }} />
          </div>
        )}
        
        {/* Product Mention Badge */}
        {blog.mentionedProduct && (
          <div className="absolute top-2 left-2">
            <div className="bg-[#7cc6ee] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              {blog.mentionedProduct.logoUrl && (
                <img 
                  src={blog.mentionedProduct.logoUrl} 
                  alt={blog.mentionedProduct.name}
                  className="w-3 h-3 rounded-sm"
                />
              )}
              <span>Featured</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="h-[35%] p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold line-clamp-2 mb-1 leading-tight" style={{ color: '#1e2556' }}>
            {blog.title}
          </h3>
          
          {/* Product mentioned info */}
          {blog.mentionedProduct && (
            <p className="text-xs text-gray-500 mb-1 line-clamp-1">
              Mentions {blog.mentionedProduct.name}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
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
  );
};

export default MentionedProductsSection;