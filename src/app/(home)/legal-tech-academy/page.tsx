"use client"
import React, { useState, useEffect } from 'react';
import { Book, Clock, Calendar, ChevronRight, Youtube, Play } from 'lucide-react';

const LegalTechAcademyPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch legal tech blogs
  const fetchLegalTechBlogs = async () => {
    try {
      setLoading(true);
      // You'll need to modify your API to accept legal tech category
      const response = await fetch('/api/get-legal-tech-academy?limit=200');
      
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.blogs) {
        setBlogs(data.blogs);
        setError(null);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      console.error('Failed to fetch legal tech blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegalTechBlogs();
  }, []);

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

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Navigate to blog post
  const navigateToBlog = (blogSlug) => {
    window.location.href = `/blog/${blogSlug}`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7cc6ee]/[0.03] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
       
        {/* Header Section */}
        <div className="mb-12 mt-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#1e2556] mb-4">Legal Tech Academy</h1>
            <p className="text-xl text-[#334155] max-w-3xl mx-auto">
              Explore cutting-edge insights, tutorials, and industry knowledge through our comprehensive video library covering the latest in legal technology.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#7cc6ee]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-[#1e2556]">Error loading academy content</h3>
              <p className="text-[#334155] mt-2">{error}</p>
              <button 
                onClick={fetchLegalTechBlogs}
                className="mt-4 px-6 py-2 bg-[#1e2556] text-white rounded-full hover:shadow-lg transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="mb-8">
                <p className="text-[#334155]">
                  {blogs.length} {blogs.length === 1 ? 'video lesson' : 'video lessons'} available
                </p>
              </div>

              {blogs.length === 0 ? (
                <div className="text-center py-16">
                  <Youtube className="w-16 h-16 text-[#7cc6ee] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#1e2556]">No video lessons found</h3>
                  <p className="text-[#334155] mt-2">
                    Check back soon for new legal tech video lessons and tutorials.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {blogs.map((blog) => {
                    const videoId = getYouTubeVideoId(blog.bannerImage);
                    const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null;
                    
                    return (
                      <div
                        key={blog.id}
                        onClick={() => navigateToBlog(blog.slug)}
                        className="group bg-[#f5f7fa] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
                      >
                        <div className="relative h-64 w-full overflow-hidden">
                          {thumbnailUrl ? (
                            <>
                              <img
                                src={thumbnailUrl}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              {/* YouTube Play Button Overlay */}
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="bg-red-600 text-white rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                                </div>
                              </div>
                              {/* YouTube Badge */}
                              <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                                <Youtube className="w-3 h-3" />
                                <span>VIDEO</span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#7cc6ee]/10 to-[#7cc6ee]/20">
                              <Book className="w-16 h-16 text-[#7cc6ee]" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center gap-4 text-sm text-[#334155] mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-[#7cc6ee]" />
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                            {blog.content && (
                              <div className="flex items-center gap-1 p-1 border-4 border-[#f5f7fa] rounded-full bg-[#7cc6ee]">
                                <Clock className="w-4 h-4 text-white font-semibold" />
                                <span className="text-white font-semibold">{calculateReadTime(blog.content)} min read</span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-semibold text-[#1e2556] mb-3 line-clamp-2 hover:text-[#7cc6ee] transition-colors group-hover:text-[#7cc6ee]">
                            {blog.title}
                          </h3>
                          
                          {blog.excerpt && (
                            <p className="text-[#334155] text-sm mb-4 line-clamp-2 flex-grow">
                              {blog.excerpt}
                            </p>
                          )}
                          
                          <div className="mt-auto pt-4">
                            {/* Watch Video Article Button */}
                            <div className="flex items-center justify-between w-full px-4 py-2 border border-[#7cc6ee]/30 rounded-lg text-[#7cc6ee] font-medium transition-all group-hover:bg-[#7cc6ee]/10 group-hover:border-[#7cc6ee]">
                              <span>Watch Video</span>
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalTechAcademyPage;