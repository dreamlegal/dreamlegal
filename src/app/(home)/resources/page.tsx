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

  const allowedCategories = [
    "industry-report",
    "market-trends",
    "buyer-perspective-report",
    "inspiration-stories",
    "blog"
  ];

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
        // Filter blogs by allowed categories
        const filteredBlogs = data.blogs.filter(blog => 
          blog.category.some(cat => allowedCategories.includes(cat))
        );
        setBlogs(filteredBlogs);
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
      heading: "Industry Report",
      subheading: "Exploring advancements in legal tech solutions",
      link: "/resources/industry-report",
      icon: "⚖️"
    },
    {
      heading: "Market Trends",
      subheading: "Navigating complex regulatory frameworks",
      link: "/resources/market-trends",
      icon: "📋"
    },
    {
      heading: "Buyer Perspective Report",
      subheading: "Modernizing legal practice with digital tools",
      link: "/resources/buyer-perspective-report",
      icon: "💻"
    },
    {
      heading: "Inspiration Stories",
      subheading: "Expert analysis of legal industry trends",
      link: "/resources/inspiration-stories",
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
        <header className="py-8 px-4 text-center">
  <h1 className="font-bold mb-4">
    <span className="text-blue-600 text-4xl sm:text-5xl md:text-6xl">
      Discovering technology innovations
    </span>
  </h1>
  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    Industry inspirations of legal community
  </p>
</header>

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