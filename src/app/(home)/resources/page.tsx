
"use client"
import React, { useState, useEffect } from 'react';
import { Book, Clock, Calendar, ChevronRight, Scale, TrendingUp, Monitor, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const ResourcesPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // The 4 categories with their display info
  const categories = [
    { id: 'all', label: 'All Resources', icon: null },
    { id: 'Industry Report', label: 'Industry Report', icon: Scale },
    { id: 'Market Trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'Buyer Perspective Report', label: 'Buyer Perspective Report', icon: Monitor },
    { id: 'Inspiration Stories', label: 'Inspiration Stories', icon: Lightbulb }
  ];

  // Fetch all resource blogs once
  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-resources?limit=200');
      
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.blogs) {
        setAllBlogs(data.blogs);
        setFilteredBlogs(data.blogs); // Initially show all
        setError(null);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on selected tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    
    if (tabId === 'all') {
      setFilteredBlogs(allBlogs);
    } else {
      const filtered = allBlogs.filter(blog => 
        blog.category.includes(tabId)
      );
      setFilteredBlogs(filtered);
    }
  };

  // Get count for each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return allBlogs.length;
    return allBlogs.filter(blog => blog.category.includes(categoryId)).length;
  };

  useEffect(() => {
    fetchAllBlogs();
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
       
        {/* Browse Resources By Topic Section */}
        <div className="mb-12 mt-8">
        <h2 className="text-3xl font-bold text-[#1e2556] mb-8">Browse Resources By Topic</h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-8 p-2 bg-gray-50 rounded-xl">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = getCategoryCount(category.id);
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleTabClick(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === category.id
                      ? 'bg-[#1e2556] text-white shadow-lg'
                      : 'text-[#334155] hover:bg-white hover:text-[#1e2556] hover:shadow-md'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category.label}
                  {count > 0 && (
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      activeTab === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-[#334155]'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
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
              <h3 className="text-xl font-semibold text-[#1e2556]">Error loading resources</h3>
              <p className="text-[#334155] mt-2">{error}</p>
              <button 
                onClick={fetchAllBlogs}
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
                  Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'resource' : 'resources'}
                  {activeTab !== 'all' && (
                    <span> in <span className="font-semibold text-[#1e2556]">
                      {categories.find(cat => cat.id === activeTab)?.label}
                    </span></span>
                  )}
                </p>
              </div>

              {filteredBlogs.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-[#1e2556]">No resources found</h3>
                  <p className="text-[#334155] mt-2">
                    {activeTab === 'all' 
                      ? 'No resources available.' 
                      : 'No resources found in this category.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="group bg-[#f5f7fa] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
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
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#7cc6ee]/10 to-[#7cc6ee]/20">
                            <Book className="w-16 h-16 text-[#7cc6ee]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                        
                        <div className="mt-auto pt-4">
                          <button 
                            onClick={() => navigateToBlog(blog.slug)}
                            className="flex items-center justify-between w-full px-4 py-2 border border-[#7cc6ee]/30 rounded-lg text-[#7cc6ee] font-medium transition-all hover:bg-[#7cc6ee]/10 group-hover:border-[#7cc6ee]"
                          >
                            <span>Read</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;