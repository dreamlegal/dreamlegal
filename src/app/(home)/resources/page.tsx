
"use client"
import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Clock, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch blogs with retry logic
  const fetchBlogs = async (retryCount = 0, maxRetries = 3) => {
    try {
      setLoading(true);
      console.log('Fetching blogs...');
      const response = await fetch(`/api/get-published-blogs?page=${page}&limit=12`);
      
      if (!response.ok) {
        // If we still have retries left and it's a 500 error (likely DB connection issue)
        if (retryCount < maxRetries && response.status === 500) {
          console.log(`Retry attempt ${retryCount + 1} of ${maxRetries}...`);
          // Wait a bit before retrying (exponential backoff)
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          // Set timeout for retry
          setTimeout(() => fetchBlogs(retryCount + 1, maxRetries), delay);
          return;
        }
        throw new Error(`Error fetching blogs: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received blog data:', data);
      
      if (data && data.blogs) {
        setBlogs(data.blogs);
        setTotalPages(data.pagination?.pages || 1);
        setError(null); // Clear any previous errors if successful
      } else {
        console.error('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      // If we still have retries left, try again
      if (retryCount < maxRetries) {
        console.log(`Retry attempt ${retryCount + 1} of ${maxRetries}...`);
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        setTimeout(() => fetchBlogs(retryCount + 1, maxRetries), delay);
        return;
      }
      setError(err.message);
    } finally {
      // Only set loading to false if we're not going to retry
      if (retryCount >= maxRetries) {
        console.log('Setting loading to false after all retries');
        setLoading(false);
      } else if (retryCount === 0) {
        // Also set loading to false on successful first attempt
        console.log('Setting loading to false after successful fetch');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Call fetchBlogs whenever page changes
    console.log('Page changed, fetching blogs...');
    fetchBlogs();
  }, [page]);

  // Use mock data when there are API issues in development
  useEffect(() => {
    // If we have no blogs after loading and have an error, use mock data as fallback
    if (!loading && error && (!blogs || blogs.length === 0)) {
      console.log('Using mock data as fallback due to API error');
      setBlogs([
        {
          id: 'mock-1',
          title: 'Understanding Legal Tech Innovations',
          publishedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 'mock-2',
          title: 'Digital Transformation in the Legal Industry',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 'mock-3',
          title: 'AI and Machine Learning in Legal Research',
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        // Add more mock blogs to fill the grid
        {
          id: 'mock-4',
          title: 'Legal Document Automation Solutions',
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          createdAt: new Date(Date.now() - 259200000).toISOString(), 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 'mock-5',
          title: 'Cybersecurity for Law Firms',
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          createdAt: new Date(Date.now() - 345600000).toISOString(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 'mock-6',
          title: 'Remote Work Best Practices for Legal Teams',
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          createdAt: new Date(Date.now() - 432000000).toISOString(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ]);
      // Set a reasonable total pages count for mock data
      setTotalPages(2);
    }
  }, [loading, error, blogs]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return '';
    }
  };

  // Calculate read time (simplified version)
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  // Navigate to blog post
  const navigateToBlog = (blogId) => {
    window.location.href = `/blog/${blogId}`;
  };

  // Feature categories with headings and descriptions
  const featureCategories = [
    {
      heading: "Legal Technology",
      subheading: "Exploring advancements in legal tech solutions",
      link: "/category/legal-tech",
      icon: "⚖️"
    },
    {
      heading: "Compliance",
      subheading: "Navigating complex regulatory frameworks",
      link: "/category/compliance",
      icon: "📋"
    },
    {
      heading: "Digital Transformation",
      subheading: "Modernizing legal practice with digital tools",
      link: "/category/digital",
      icon: "💻"
    },
    {
      heading: "Industry Insights",
      subheading: "Expert analysis of legal industry trends",
      link: "/category/insights",
      icon: "🔍"
    }
  ];

  return (
    <div className="relative bg-white min-h-screen py-4 sm:py-4 md:py-4">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb08_1px,transparent_1px),linear-gradient(to_bottom,#2563eb08_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header Section with Gradient Text */}
        <div className="text-center mb-16">
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-blue-500 inline-block text-transparent bg-clip-text">
            Discovering technology innovations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Industry inspirations of legal community
          </p>
        </div>

        {/* Feature Categories - 4 boxes at the top with glass effect */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {featureCategories.map((category, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-xl border border-blue-100 bg-white bg-opacity-80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900">{category.heading}</h2>
                </div>
                <p className="text-gray-600 mb-6">{category.subheading}</p>
                <div className="mt-auto flex justify-end">
                  <Link href={category.link}>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110 shadow-md">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Releases Heading with Underline */}
        <div className="mb-10 relative">
          <h2 className="text-2xl font-bold text-gray-900 inline-block">Latest releases</h2>
          <div className="absolute bottom-0 left-0 h-1 w-16 bg-blue-500 rounded-full"></div>
        </div>

        {/* Blog Listing */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800">Error loading blogs</h3>
              <p className="text-gray-600 mt-2">{error}</p>
              <p className="text-gray-500 mt-1 text-sm">Using fallback content</p>
              <button 
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  fetchBlogs();
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {!blogs || blogs.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-800">No blogs found</h3>
                  <p className="text-gray-600 mt-2">Check back later for new content.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                      <div
                        key={blog.id}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                      >
                        <div className="relative h-56 w-full overflow-hidden">
                          {blog.bannerImage ? (
                            <Image
                              src={blog.bannerImage}
                              alt={blog.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
                              <Book className="w-16 h-16 text-blue-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                            {blog.content && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span>{calculateReadTime(blog.content)} min read</span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors group-hover:text-blue-600">
                            {blog.title}
                          </h3>
                          
                          <div className="mt-auto pt-4">
                            <button 
                              onClick={() => navigateToBlog(blog.slug)}
                              className="flex items-center justify-between w-full px-4 py-2 border border-blue-200 rounded-lg text-blue-600 font-medium transition-all hover:bg-blue-50 group-hover:border-blue-300"
                            >
                              <span>Read</span>
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Premium Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 space-x-2">
                      <button 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-5 py-2 rounded-lg border border-gray-200 disabled:opacity-50 
                               hover:bg-blue-50 transition-colors text-blue-600 font-medium"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                                     ${page === i + 1 
                                       ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                                       : 'hover:bg-blue-50 text-blue-600'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-5 py-2 rounded-lg border border-gray-200 disabled:opacity-50 
                               hover:bg-blue-50 transition-colors text-blue-600 font-medium"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Book, ArrowRight, Clock, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// const BlogListing = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Function to fetch blogs with retry logic
//   const fetchBlogs = async (retryCount = 0, maxRetries = 3) => {
//     try {
//       setLoading(true);
//       console.log('Fetching blogs...');
//       const response = await fetch(`/api/get-published-blogs?page=${page}&limit=12`);
      
//       if (!response.ok) {
//         // If we still have retries left and it's a 500 error (likely DB connection issue)
//         if (retryCount < maxRetries && response.status === 500) {
//           console.log(`Retry attempt ${retryCount + 1} of ${maxRetries}...`);
//           // Wait a bit before retrying (exponential backoff)
//           const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
//           // Set timeout for retry
//           setTimeout(() => fetchBlogs(retryCount + 1, maxRetries), delay);
//           return;
//         }
//         throw new Error(`Error fetching blogs: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Received blog data:', data);
      
//       if (data && data.blogs) {
//         setBlogs(data.blogs);
//         setTotalPages(data.pagination?.pages || 1);
//         setError(null); // Clear any previous errors if successful
//       } else {
//         console.error('Unexpected API response format:', data);
//         throw new Error('Unexpected API response format');
//       }
//     } catch (err) {
//       console.error('Failed to fetch blogs:', err);
//       // If we still have retries left, try again
//       if (retryCount < maxRetries) {
//         console.log(`Retry attempt ${retryCount + 1} of ${maxRetries}...`);
//         const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
//         setTimeout(() => fetchBlogs(retryCount + 1, maxRetries), delay);
//         return;
//       }
//       setError(err.message);
//     } finally {
//       // Only set loading to false if we're not going to retry
//       if (retryCount >= maxRetries) {
//         console.log('Setting loading to false after all retries');
//         setLoading(false);
//       } else if (retryCount === 0) {
//         // Also set loading to false on successful first attempt
//         console.log('Setting loading to false after successful fetch');
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     // Call fetchBlogs whenever page changes
//     console.log('Page changed, fetching blogs...');
//     fetchBlogs();
//   }, [page]);

//   // Use mock data when there are API issues in development
//   useEffect(() => {
//     // If we have no blogs after loading and have an error, use mock data as fallback
//     if (!loading && error && (!blogs || blogs.length === 0)) {
//       console.log('Using mock data as fallback due to API error');
//       setBlogs([
//         {
//           id: 'mock-1',
//           title: 'Understanding Legal Tech Innovations',
//           publishedAt: new Date().toISOString(),
//           createdAt: new Date().toISOString(),
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//           id: 'mock-2',
//           title: 'Digital Transformation in the Legal Industry',
//           publishedAt: new Date(Date.now() - 86400000).toISOString(),
//           createdAt: new Date(Date.now() - 86400000).toISOString(),
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//           id: 'mock-3',
//           title: 'AI and Machine Learning in Legal Research',
//           publishedAt: new Date(Date.now() - 172800000).toISOString(),
//           createdAt: new Date(Date.now() - 172800000).toISOString(),
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//           id: 'mock-4',
//           title: 'Legal Document Automation Solutions',
//           publishedAt: new Date(Date.now() - 259200000).toISOString(),
//           createdAt: new Date(Date.now() - 259200000).toISOString(), 
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//           id: 'mock-5',
//           title: 'Cybersecurity for Law Firms',
//           publishedAt: new Date(Date.now() - 345600000).toISOString(),
//           createdAt: new Date(Date.now() - 345600000).toISOString(),
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//           id: 'mock-6',
//           title: 'Remote Work Best Practices for Legal Teams',
//           publishedAt: new Date(Date.now() - 432000000).toISOString(),
//           createdAt: new Date(Date.now() - 432000000).toISOString(),
//           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         }
//       ]);
//       // Set a reasonable total pages count for mock data
//       setTotalPages(2);
//     }
//   }, [loading, error, blogs]);

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//       });
//     } catch (err) {
//       console.error('Error formatting date:', err);
//       return '';
//     }
//   };

//   // Calculate read time (simplified version)
//   const calculateReadTime = (content) => {
//     if (!content) return 1;
//     const wordsPerMinute = 200;
//     const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return readTime < 1 ? 1 : readTime;
//   };

//   // Extract and trim description from content
//   const extractDescription = (content, maxLength = 120) => {
//     if (!content) return '';
//     const plainText = content.replace(/<[^>]*>/g, '').trim();
//     return plainText.length > maxLength 
//       ? plainText.substring(0, maxLength) + '...' 
//       : plainText;
//   };

//   // Navigate to blog post
//   const navigateToBlog = (blogId) => {
//     window.location.href = `/blog/${blogId}`;
//   };

//   // Feature categories with headings and descriptions
//   const featureCategories = [
//     {
//       heading: "Legal Technology",
//       subheading: "Exploring advancements in legal tech solutions",
//       link: "/category/legal-tech",
//       color: "from-blue-600 to-indigo-600"
//     },
//     {
//       heading: "Compliance",
//       subheading: "Navigating complex regulatory frameworks",
//       link: "/category/compliance",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       heading: "Digital Transformation",
//       subheading: "Modernizing legal practice with digital tools",
//       link: "/category/digital",
//       color: "from-indigo-600 to-purple-600"
//     },
//     {
//       heading: "Industry Insights",
//       subheading: "Expert analysis of legal industry trends",
//       link: "/category/insights",
//       color: "from-blue-600 to-teal-500"
//     }
//   ];

//   return (
//     <div className="relative bg-white min-h-screen py-8">
//       {/* Premium Background Pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb05_1px,transparent_1px),linear-gradient(to_bottom,#2563eb05_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-white/20" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
//         {/* Header Section with Animated Gradient Text */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-blue-500/10 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
//             INSIGHTS & RESOURCES
//           </div>
//           <h1 className="text-4xl sm:text-6xl font-bold mb-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 inline-block text-transparent bg-clip-text leading-tight">
//             Discovering technology innovations
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Industry inspirations of legal community
//           </p>
//         </div>

//         {/* Feature Categories - 4 boxes with premium glass morphism effect */}
//         <div className="grid md:grid-cols-2 gap-8 mb-24">
//           {featureCategories.map((category, index) => (
//             <div 
//               key={index} 
//               className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50 p-0.5 shadow-xl hover:shadow-2xl transition-all duration-500 group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 transform scale-[0.98] rounded-2xl"></div>
//               <div className="absolute -bottom-1 -right-1 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-300/20 blur-2xl"></div>
//               <div className="absolute -top-1 -left-1 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-300/20 blur-xl"></div>
              
//               <div className="relative overflow-hidden rounded-xl p-6 border border-blue-50 h-full bg-white bg-opacity-60 backdrop-blur-sm flex flex-col z-10">
//                 <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-300/10 blur-2xl"></div>
//                 <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
                
//                 <div className="flex flex-col h-full z-10">
//                   <div className="mb-3">
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{category.heading}</h2>
//                     <p className="text-gray-600">{category.subheading}</p>
//                   </div>
                  
//                   <div className="mt-auto self-end">
//                     <Link href={category.link} className="block">
//                       <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-white transform transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-xl`}>
//                         <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Latest Releases Heading with Premium Styling */}
//         <div className="mb-12 relative flex items-center">
//           <h2 className="text-3xl font-bold text-gray-900 inline-block mr-4">Latest releases</h2>
//           <div className="flex-grow h-px bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
//         </div>

//         {/* Blog Listing with Premium Cards */}
//         <div className="max-w-7xl mx-auto">
//           {loading ? (
//             <div className="flex flex-col justify-center items-center min-h-[300px]">
//               <div className="animate-spin rounded-full h-14 w-14 border-2 border-blue-600 border-t-transparent mb-4"></div>
//               <p className="text-blue-600">Loading latest articles...</p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-16 bg-blue-50/50 rounded-2xl border border-blue-100 backdrop-blur-sm">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Error loading blogs</h3>
//               <p className="text-gray-600 mb-4">{error}</p>
//               <p className="text-gray-500 text-sm mb-6">Using fallback content</p>
//               <button 
//                 onClick={() => {
//                   setLoading(true);
//                   setError(null);
//                   fetchBlogs();
//                 }}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {!blogs || blogs.length === 0 ? (
//                 <div className="text-center py-16 bg-blue-50/50 rounded-2xl">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-3">No blogs found</h3>
//                   <p className="text-gray-600">Check back later for new content.</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid md:grid-cols-3 gap-8">
//                     {blogs.map((blog, index) => (
//                       <div
//                         key={blog.id}
//                         className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-50 flex flex-col h-full transform hover:-translate-y-1"
//                       >
//                         {/* Blog Image Section with Gradient Overlay */}
//                         <div className="relative h-60 w-full overflow-hidden">
//                           {blog.bannerImage ? (
//                             <>
//                               <Image
//                                 src={blog.bannerImage}
//                                 alt={blog.title}
//                                 fill
//                                 className="object-cover transition-transform duration-700 group-hover:scale-110"
//                               />
//                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
//                             </>
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
//                               <Book className="w-16 h-16 text-blue-300" />
//                             </div>
//                           )}
                          
//                           {/* Reading Time Badge */}
//                           {blog.content && (
//                             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-medium text-blue-600 shadow-sm">
//                               <Clock className="w-3 h-3 mr-1" />
//                               {calculateReadTime(blog.content)} min read
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Date Badge */}
//                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-medium text-gray-700 shadow-sm">
//                           <Calendar className="w-3 h-3 mr-1 text-blue-500" />
//                           {formatDate(blog.publishedAt || blog.createdAt)}
//                         </div>
                        
//                         {/* Content Section */}
//                         <div className="p-6 flex-grow flex flex-col">
//                           <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                             {blog.title}
//                           </h3>
                          
//                           {blog.content && (
//                             <p className="text-gray-600 text-sm line-clamp-3 mb-5">
//                               {extractDescription(blog.content)}
//                             </p>
//                           )}
                          
//                           <div className="mt-auto pt-4">
//                             <button 
//                               onClick={() => navigateToBlog(blog.id)}
//                               className="w-full relative inline-flex items-center justify-center overflow-hidden rounded-xl p-0.5 shadow-sm transition-all duration-300 ease-out group-hover:shadow-md group-hover:shadow-blue-500/20"
//                             >
//                               <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></span>
//                               <span className="relative w-full bg-white py-2.5 px-4 rounded-[10px] flex items-center justify-between">
//                                 <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">View Article</span>
//                                 <ExternalLink className="w-4 h-4 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 transition-transform" />
//                               </span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Premium Pagination Controls */}
//                   {totalPages > 1 && (
//                     <div className="flex justify-center items-center mt-20 space-x-3">
//                       <button 
//                         onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//                         disabled={page === 1}
//                         className="px-6 py-2.5 rounded-xl border border-blue-100 disabled:opacity-50 
//                                hover:bg-blue-50 transition-colors text-blue-600 font-medium shadow-sm hover:shadow-md disabled:shadow-none"
//                       >
//                         Previous
//                       </button>
                      
//                       <div className="flex space-x-2">
//                         {[...Array(totalPages)].map((_, i) => (
//                           <button
//                             key={i}
//                             onClick={() => setPage(i + 1)}
//                             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
//                                      ${page === i + 1 
//                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
//                                        : 'hover:bg-blue-50 text-blue-600 border border-blue-100'}`}
//                           >
//                             {i + 1}
//                           </button>
//                         ))}
//                       </div>
                      
//                       <button
//                         onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={page === totalPages}
//                         className="px-6 py-2.5 rounded-xl border border-blue-100 disabled:opacity-50 
//                                hover:bg-blue-50 transition-colors text-blue-600 font-medium shadow-sm hover:shadow-md disabled:shadow-none"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogListing;