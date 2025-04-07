"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, Calendar, ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';

// Custom hook for intersection observer - similar to the one in your shared code
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Format date in a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Blog Card Component
const BlogCard = ({ blog, index, isInView }) => {
  return (
    <div
      className={`relative group transition-all duration-700 transform bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-[#7cc6ee]/10
                  ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Banner Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.bannerImage ? (
          <img 
            src={blog.bannerImage} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#f5f7fa] flex items-center justify-center">
            <span className="text-[#1e2556]/30 text-lg font-medium">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#1e2556] text-white text-xs font-medium rounded-full">
            Legal
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="flex items-center text-xs text-[#334155]">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{blog.publishedAt ? formatDate(blog.publishedAt) : 'Unpublished'}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-[#1e2556] line-clamp-2 group-hover:text-[#7cc6ee] transition-colors">
          {blog.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-[#2d2d2d] line-clamp-3">
          {blog.metaDescription || "No description available for this blog post."}
        </p>
        
        {/* Read More Link */}
        <div className="pt-2">
          <Link 
            href={`/blog/${blog.slug || blog.id}`}
            className="inline-flex items-center text-[#7cc6ee] text-sm font-medium group/link"
          >
            Read more 
            <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7cc6ee]
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

// Main Legal Blogs Page Component
const LegalBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [headerRef, isHeaderInView] = useIntersectionObserver();
  const [blogsRef, isBlogsInView] = useIntersectionObserver();

  // Fetch blogs from the API
  const fetchBlogs = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/legal-blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          page,
          limit: 9, 
          search
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalPages(data.pagination.totalPages);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBlogs(currentPage, searchQuery);
  }, [currentPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 when searching
    fetchBlogs(1, searchQuery);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Hero Section */}
      <section 
        ref={headerRef}
        className="w-full relative bg-[#1e2556] py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#1e2556]" />
        <div className="absolute inset-0 opacity-30 bg-[#7cc6ee]/10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <span className={`text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-4 tracking-wider
                             transition-all duration-700 ${isHeaderInView ? 'opacity-100' : 'opacity-0'}`}>
              LEGAL INSIGHTS & EXPERTISE
            </span>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto mb-6 text-center
                             transition-all duration-700 delay-200 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Legal Blogs and <span className="text-[#7cc6ee]">Resources</span>
            </h1>

            <p className={`text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-12 text-center
                           transition-all duration-700 delay-400 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Explore our collection of expert legal insights, articles, and resources to stay informed on the latest trends and developments
            </p>

            {/* Search Bar */}
            <div className={`max-w-xl w-full mx-auto transition-all duration-700 delay-600
                           ${isHeaderInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search legal blogs..."
                  className="w-full px-6 py-4 pr-12 bg-white rounded-xl text-[#2d2d2d] placeholder-[#334155]/50
                           border-2 border-[#7cc6ee]/20 focus:border-[#7cc6ee] outline-none
                           shadow-sm hover:shadow-md focus:shadow-lg
                           transition-all duration-200"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2
                           text-[#1e2556] hover:text-[#7cc6ee] transition-colors"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section 
        ref={blogsRef}
        className="w-full py-16 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`mb-16 relative transition-all duration-700 transform
                        ${isBlogsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
                  BROWSE OUR COLLECTION
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e2556] mb-4 relative inline-block">
                  Latest Legal Articles
                  <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                                transform origin-left transition-transform duration-1000 
                                ${isBlogsInView ? 'scale-x-100' : 'scale-x-0'}`} />
                </h2>
              </div>
              
              {/* <div className="mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#1e2556]/20 rounded-lg
                                 text-[#1e2556] hover:bg-[#1e2556] hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div> */}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-[#7cc6ee]/20 border-t-[#7cc6ee] rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => fetchBlogs(1, searchQuery)}
                className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-[#161c44] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#2d2d2d] text-lg mb-4">No blogs found matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  fetchBlogs(1, '');
                }}
                className="px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-[#161c44] transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Blog Grid */}
          {!isLoading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog, index) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  index={index}
                  isInView={isBlogsInView}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !error && blogs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-1
                            ${currentPage === 1 
                              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'border-[#1e2556]/20 text-[#1e2556] hover:bg-[#1e2556] hover:text-white transition-colors'}`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> 
                  Previous
                </button>
                
                <div className="px-4 py-2 bg-[#f5f7fa] border border-[#1e2556]/10 rounded-lg">
                  <span className="text-[#1e2556] font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-1
                            ${currentPage === totalPages 
                              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'border-[#1e2556]/20 text-[#1e2556] hover:bg-[#1e2556] hover:text-white transition-colors'}`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LegalBlogsPage;