
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search,Calendar,Book, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Clock } from 'lucide-react';

// Custom hook for intersection observer
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

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Hero Section Component
const HeroSection = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver();

  return (
    <section ref={headerRef} className="bg-[#1e2556] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1e2556]" />
      <div className="absolute inset-0 opacity-30 bg-[#7cc6ee]/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 transition-all duration-700 
                        ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                       Learning Hub: Your Gateway to Legal Tech Mastery

          </h1>
          
          <p className={`text-base sm:text-lg text-white/90 mb-6 transition-all duration-700 delay-200
                       ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

Welcome to the Learning Hub — a curated collection of in-depth articles designed to guide you through the evolving world of legal technology. From decoding key features and product capabilities to understanding implementation strategies and guides, this space is your go-to resource for mastering every layer of legal tech. Whether you're just starting or scaling up, there's something here for every legal professional.
          </p>
          
          <h2 className={`text-xl sm:text-2xl font-semibold mb-2 transition-all duration-700 delay-300
                        ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expert Resources to Enhance Your Legal Practice
          </h2>
        </div>
      </div>
    </section>
  );
};

// Category Section Component
const CategorySection = ({ selectedCategory, setSelectedCategory, setCurrentPage }) => {
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const categories = [
    {
      id: "all",
      name: "All Resources"
    },
    {
      id: "Client Relationship Management",
      name: "Client Relationship Management"
    },
    {
      id: "Governance, Risk and Compliance",
      name: "Governance, Risk and Compliance"
    },
    {
      id: "Contract Lifecycle Management",
      name: "Contract Lifecycle Management"
    },
    {
      id: "E-Signature",
      name: "E-Signature"
    },
    {
      id: "Document Management System",
      name: "Document Management"
    },
    {
      id: "E-billing and Invoicing",
      name: "E-billing and Invoicing"
    },
    {
      id: "E-discovery",
      name: "E-discovery"
    },
    {
      id: "Intellectual Property Management",
      name: "Intellectual Property Management"
    },
    {
      id: "Litigation Management and Analytics",
      name: "Litigation Management"
    },
    {
      id: "Legal Workflow Automation",
      name: "Legal Workflow Automation"
    },
    {
      id: "Legal Research",
      name: "Legal Research"
    },
    // {
    //   id: "industry-report",
    //   name: "Industry Reports"
    // },
    // {
    //   id: "market-trends",
    //   name: "Market Trends"
    // },
    // {
    //   id: "buyer-perspective-report",
    //   name: "Buyer Perspectives"
    // },
    // {
    //   id: "inspiration-stories",
    //   name: "Inspiration Stories"
    // }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <section ref={sectionRef} className="py-10 bg-[#f5f7fa]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-2xl font-bold text-[#1e2556] mb-4">
              Browse Resources By Topic
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                py-2 px-4 rounded-full text-sm transition-all duration-300 transform
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${selectedCategory === category.id 
                  ? 'bg-[#1e2556] text-white' 
                  : 'bg-white text-[#334155] hover:bg-gray-100 border border-gray-200'}
              `}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection = ({ selectedCategory, searchQuery, setSearchQuery, currentPage, setCurrentPage, totalPages, setTotalPages }) => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 9; // Items per page

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/learning-hub', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: currentPage,
            limit,
            search: searchQuery,
            category: selectedCategory === 'all' ? null : selectedCategory
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, searchQuery, currentPage, setTotalPages]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: document.getElementById('blogs-section').offsetTop - 100, behavior: 'smooth' });
    }
  };

  // Topic badges mapping for categories
  const topicBadges = {
    "Client Relationship Management": { bg: "bg-blue-100", text: "text-blue-800" },
    "Governance, Risk and Compliance": { bg: "bg-green-100", text: "text-green-800" },
    "Contract Lifecycle Management": { bg: "bg-purple-100", text: "text-purple-800" },
    "E-Signature": { bg: "bg-yellow-100", text: "text-yellow-800" },
    "Document Management System": { bg: "bg-red-100", text: "text-red-800" },
    "E-billing and Invoicing": { bg: "bg-indigo-100", text: "text-indigo-800" },
    "E-discovery": { bg: "bg-pink-100", text: "text-pink-800" },
    "Intellectual Property Management": { bg: "bg-orange-100", text: "text-orange-800" },
    "Litigation Management and Analytics": { bg: "bg-teal-100", text: "text-teal-800" },
    "Legal Workflow Automation": { bg: "bg-cyan-100", text: "text-cyan-800" },
    "Legal Research": { bg: "bg-emerald-100", text: "text-emerald-800" },
    // "industry-report": { bg: "bg-gray-100", text: "text-gray-800" },
    // "market-trends": { bg: "bg-blue-100", text: "text-blue-800" },
    // "buyer-perspective-report": { bg: "bg-purple-100", text: "text-purple-800" },
    // "inspiration-stories": { bg: "bg-yellow-100", text: "text-yellow-800" }
  };
  
  // Calculate read time
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };
  const navigateToBlog = (blogSlug) => {
    window.location.href = `/blog/${blogSlug}`;
  };

  return (
    <section id="blogs-section" ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 transition-all duration-700 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1e2556] mb-2">
                {selectedCategory === 'all' ? 'All Resources' : blogs.length > 0 ? 
                  `${selectedCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}` : 
                  'Resources'
                }
              </h2>
              <p className="text-[#334155]">
                {blogs.length > 0 ? `Showing ${blogs.length} resources` : 'No resources found'}
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7cc6ee]"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#334155]">No resources found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              // <div
              //   key={blog.id}
              //   className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 transform
              //             ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              //   style={{ transitionDelay: `${index * 100}ms` }}
              // >
              //   <a href={`/blog/${blog.slug}`} className="block h-full">
              //     <div className="relative overflow-hidden rounded-t-xl">
              //       <div className="aspect-w-16 aspect-h-9">
              //         <img 
              //           src={blog.bannerImage || "/api/placeholder/600/340"} 
              //           alt={blog.title} 
              //           className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              //         />
              //       </div>
              //     </div>
                  
              //     <div className="p-6">
              //       <div className="flex flex-wrap gap-2 mb-3">
              //         {blog.category.filter(cat => cat !== 'blog').map((category) => {
              //           const badge = topicBadges[category] || { bg: "bg-gray-100", text: "text-gray-800" };
              //           return (
              //             <span key={category} className={`px-2.5 py-1 text-xs font-medium ${badge.bg} ${badge.text} rounded-full`}>
              //               {category.includes('-') 
              //                 ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              //                 : category}
              //             </span>
              //           );
              //         })}
              //       </div>
                    
              //       <h3 className="text-xl font-bold text-[#1e2556] mb-2 line-clamp-2 hover:text-[#7cc6ee] transition-colors">
              //         {blog.title}
              //       </h3>
                    
              //       <p className="text-[#334155] mb-4 line-clamp-3">
              //         {blog.metaDescription || 'No description available'}
              //       </p>
                    
              //       <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
              //         <span className="text-sm text-gray-500">
              //           {blog.publishedAt ? formatDate(blog.publishedAt) : 'No date'}
              //         </span>
              //         <span className="text-[#7cc6ee] font-medium flex items-center gap-1 group">
              //           Read more 
              //           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              //         </span>
              //       </div>
              //     </div>
              //   </a>
              // </div>
              <div
  key={blog.id}
  className={`group bg-[#f5f7fa] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
  style={{ transitionDelay: `${index * 100}ms` }}
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
        <span>{blog.publishedAt ? formatDate(blog.publishedAt) : formatDate(blog.createdAt)}</span>
      </div>
      {blog.content && (
        <div className="flex items-center gap-1 p-1 border-4 border-[#f5f7fa] rounded-full bg-[#7cc6ee]">
          <Clock className="w-4 h-4 text-white font-semibold" />
          <span className="text-white font-semibold">{calculateReadTime(blog.content)} min read</span>
        </div>
      )}
    </div>

    {/* Categories from second blog */}
    <div className="flex flex-wrap gap-2 mb-3">
      {blog.category.filter(cat => cat !== 'blog').map((category) => {
        const badge = topicBadges[category] || { bg: "bg-gray-100", text: "text-gray-800" };
        return (
          <span key={category} className={`px-2.5 py-1 text-xs font-medium ${badge.bg} ${badge.text} rounded-full`}>
            {category.includes('-') 
              ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              : category}
          </span>
        );
      })}
    </div>
    
    <h3 className="text-xl font-semibold text-[#1e2556] mb-3 line-clamp-2 hover:text-[#7cc6ee] transition-colors group-hover:text-[#7cc6ee]">
      {blog.title}
    </h3>

    {/* Meta description from second blog */}
    {/* <p className="text-[#334155] mb-4 line-clamp-3 flex-grow">
      {blog.metaDescription || 'No description available'}
    </p> */}
    
    <div className="mt-auto pt-4">
      <button 
        onClick={() => navigateToBlog(blog.slug)}
        className="flex items-center justify-between w-full px-4 py-2 border border-[#7cc6ee]/30 rounded-lg text-[#7cc6ee] font-medium transition-all hover:bg-[#7cc6ee]/10 group-hover:border-[#7cc6ee]"
      >
        <span>Read more</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center">
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#1e2556] hover:bg-[#f5f7fa]'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full ${currentPage === page ? 
                    'bg-[#7cc6ee] text-white' : 
                    'text-[#1e2556] hover:bg-[#f5f7fa]'}`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#1e2556] hover:bg-[#f5f7fa]'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

// Main Page Component
const LearningHubPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />
      <BlogSection 
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </div>
  );
};

export default LearningHubPage;