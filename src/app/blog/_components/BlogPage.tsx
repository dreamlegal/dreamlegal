
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, List, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle, ChevronDown, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import FinalSection from "@/app/(home)/category/_components/FinalSection"

// Import the voting hook we created
import { useVoting } from '@/hooks/useVoting.js';

// Vote Buttons Component
const VoteButtons = ({ articleId }) => {
  const { votes, userVote, isLoading, vote } = useVoting(articleId);

  if (isLoading) {
    return <div className="flex gap-2">Loading votes...</div>;
  }

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => vote('LIKE')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
          userVote === 'LIKE'
            ? 'bg-green-100 border-green-300 text-green-700'
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
        } hover:scale-105`}
      >
        👍 
        <span className="font-medium">{votes.likes}</span>
      </button>

      <button
        onClick={() => vote('DISLIKE')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
          userVote === 'DISLIKE'
            ? 'bg-red-100 border-red-300 text-red-700'
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
        } hover:scale-105`}
      >
        👎 
        <span className="font-medium">{votes.dislikes}</span>
      </button>
    </div>
  );
};

const blogStyles = `
  .blog-content {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #2d2d2d;
    line-height: 1.7;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Responsive Typography */
  .blog-content h1 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    margin-top: clamp(1rem, 3vw, 2rem);
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
    color: #1e2556;
    scroll-margin-top: 80px;
    line-height: 1.2;
  }

  .blog-content h2 {
    font-size: clamp(1.25rem, 3.5vw, 1.75rem);
    font-weight: 600;
    margin-top: clamp(1rem, 2.5vw, 1.5rem);
    margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
    color: #1e2556;
    scroll-margin-top: 80px;
    line-height: 1.3;
  }

  .blog-content h3 {
    font-size: clamp(1.125rem, 3vw, 1.375rem);
    font-weight: 600;
    margin-top: clamp(0.75rem, 2vw, 1.25rem);
    margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
    color: #1e2556;
    scroll-margin-top: 80px;
    line-height: 1.3;
  }

  .blog-content h4,
  .blog-content h5,
  .blog-content h6 {
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    color: #334155;
    font-weight: bold;
    margin-top: clamp(0.75rem, 2vw, 1rem);
    margin-bottom: clamp(0.25rem, 1vw, 0.5rem);
    line-height: 1.4;
  }

  .blog-content p {
    font-size: clamp(0.9rem, 2.5vw, 1.125rem);
    margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
    color: #2d2d2d;
    line-height: 1.7;
  }

  /* Responsive Lists */
  .blog-content ul, .blog-content ol {
    margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
    padding-left: clamp(1rem, 3vw, 1.5rem);
  }

  .blog-content ul li, .blog-content ol li {
    font-size: clamp(0.9rem, 2.5vw, 1.125rem);
    margin-bottom: clamp(0.25rem, 1vw, 0.5rem);
    color: #2d2d2d;
    line-height: 1.6;
  }

  .blog-content ul li {
    list-style-type: disc;
  }

  .blog-content ol li {
    list-style-type: decimal;
  }

  /* Task Lists */
  .blog-content ul[data-type="taskList"] {
    list-style: none;
    padding-left: 0;
  }

  .blog-content ul[data-type="taskList"] li {
    display: flex;
    align-items: flex-start;
    color: #2d2d2d;
    gap: 0.5rem;
  }

  .blog-content ul[data-type="taskList"] li > label {
    margin-right: 0.5rem;
    user-select: none;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .blog-content ul[data-type="taskList"] li > div {
    flex: 1;
  }

  /* Responsive Links */
  .blog-content a {
    color: #7cc6ee;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
    word-break: break-word;
  }
  
  .blog-content a:hover {
    color: #1e2556;
  }

  /* Responsive Blockquotes */
  .blog-content blockquote {
    border-left: clamp(3px, 1vw, 4px) solid #7cc6ee;
    padding: clamp(0.75rem, 3vw, 1rem);
    padding-left: clamp(0.75rem, 3vw, 1rem);
    margin: clamp(1rem, 3vw, 1.5rem) 0;
    font-style: italic;
    color: #334155;
    background-color: #f5f7fa;
    border-radius: clamp(0.375rem, 1vw, 0.5rem);
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    line-height: 1.6;
  }

  /* Responsive Images */
  .blog-content img {
    border-radius: clamp(0.375rem, 1vw, 0.5rem);
    max-width: 100%;
    height: auto;
    margin: clamp(1rem, 3vw, 1.5rem) 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: block;
  }

  /* Image alignment - mobile friendly */
  .blog-content img.img-align-left, 
  .blog-content img.blog-image.img-align-left {
    float: none;
    margin: clamp(1rem, 3vw, 1.5rem) auto;
    display: block;
  }

  .blog-content img.img-align-center,
  .blog-content img.blog-image.img-align-center {
    display: block !important;
    margin: clamp(1rem, 3vw, 1.5rem) auto !important;
    float: none !important;
    clear: both !important;
  }

  .blog-content img.img-align-right,
  .blog-content img.blog-image.img-align-right {
    float: none;
    margin: clamp(1rem, 3vw, 1.5rem) auto;
    display: block;
  }

  /* Desktop image alignment */
  @media (min-width: 768px) {
    .blog-content img.img-align-left, 
    .blog-content img.blog-image.img-align-left {
      float: left;
      margin-right: 1.5rem;
      margin-bottom: 1rem;
      margin-left: 0;
      margin-top: 0.5rem;
      clear: left;
      display: block;
    }

    .blog-content img.img-align-right,
    .blog-content img.blog-image.img-align-right {
      float: right;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
      margin-right: 0;
      margin-top: 0.5rem;
      clear: right;
      display: block;
    }
  }

  /* Clear fix for paragraphs after floating images */
  .blog-content p:after {
    content: "";
    display: table;
    clear: both;
  }

  /* Responsive Tables */
  .blog-content table {
    border-collapse: collapse;
    width: 100%;
    margin: clamp(1rem, 3vw, 1rem) 0;
    background-color: #f5f7fa;
    border-radius: clamp(0.375rem, 1vw, 0.5rem);
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    overflow: hidden;
  }

  .blog-content table td,
  .blog-content table th {
    border: 1px solid #7cc6ee;
    padding: clamp(0.375rem, 2vw, 0.75rem);
    position: relative;
    vertical-align: top;
    color: #2d2d2d;
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .blog-content table th {
    background-color: #1e2556;
    color: white;
    font-weight: bold;
    font-size: clamp(0.75rem, 2vw, 1rem);
  }

  .blog-content table td {
    background-color: #f5f7fa;
  }

  .blog-content table tr:nth-child(even) td {
    background-color: #ffffff;
  }

  /* Mobile table handling */
  @media (max-width: 767px) {
    .blog-content table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      border: 2px solid #7cc6ee;
      -webkit-overflow-scrolling: touch;
      position: relative;
    }
    
    .blog-content table td,
    .blog-content table th {
      min-width: 100px;
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      white-space: normal;
      vertical-align: top;
    }
    
    .blog-content table::after {
      content: "← Scroll to see more →";
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      color: #666;
      font-style: italic;
      white-space: nowrap;
    }
  }

  /* Desktop table display */
  @media (min-width: 768px) {
    .blog-content table {
      display: table;
      min-width: 100%;
    }
    
    .blog-content table td,
    .blog-content table th {
      min-width: 120px;
      white-space: normal;
    }
  }
  
  /* Responsive Code */
  .blog-content code {
    background-color: #f5f7fa;
    color: #1e2556;
    padding: clamp(0.125rem, 0.5vw, 0.25rem) clamp(0.25rem, 1vw, 0.375rem);
    border-radius: clamp(0.125rem, 0.5vw, 0.25rem);
    font-family: 'Courier New', monospace;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    border: 1px solid #7cc6ee;
    word-break: break-word;
  }

  .blog-content pre {
    background: #1e2556;
    color: #ffffff;
    font-family: 'Courier New', monospace;
    padding: clamp(0.75rem, 3vw, 1rem);
    border-radius: clamp(0.375rem, 1vw, 0.5rem);
    overflow-x: auto;
    margin: clamp(1rem, 3vw, 1rem) 0;
    border: 2px solid #7cc6ee;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    line-height: 1.5;
  }

  .blog-content pre code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    border: none;
    word-break: normal;
  }

  /* Responsive Horizontal Rules */
  .blog-content hr {
    margin: clamp(1.5rem, 4vw, 2rem) 0;
    border: none;
    border-top: 2px solid #7cc6ee;
  }

  /* Responsive Highlights */
  .blog-content mark {
    background-color: #7cc6ee;
    color: #1e2556;
    padding: clamp(0.0625rem, 0.25vw, 0.125rem) clamp(0.125rem, 0.5vw, 0.25rem);
    border-radius: clamp(0.125rem, 0.25vw, 0.25rem);
  }

  /* Product Widget Styling - Responsive */
  .blog-content .product-widget {
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .blog-content .product-widget:hover {
    transform: translateY(-1px);
  }

  /* Mobile specific adjustments */
  @media (max-width: 640px) {
    .blog-content {
      font-size: 1rem;
      line-height: 1.6;
    }

    .blog-content * {
      max-width: 100%;
      box-sizing: border-box;
    }

    .blog-content img {
      margin: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .blog-content blockquote {
      padding: 0.75rem;
      margin: 1rem 0;
      font-size: 0.9rem;
    }
  }

  /* Tablet adjustments */
  @media (min-width: 641px) and (max-width: 1023px) {
    .blog-content {
      font-size: 1.05rem;
      line-height: 1.65;
    }
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .blog-content {
      font-size: 1.125rem;
      line-height: 1.7;
    }
  }
`;

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const contentRef = useRef(null);
  const blogContentRef = useRef(null);

  console.log(slug);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Check if blog is Legal Tech Academy category
  const isLegalTechAcademy = (category) => {
    return Array.isArray(category) && category.includes("Legal Tech Academy");
  };

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blogs/slug/${slug}`);
        
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        
        const data = await response.json();
        setBlog(data);
        
        // Fetch random products after blog is loaded
        if (data.id) {
          fetchRandomProducts();
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlog();
  }, [slug, router]);

  const fetchRandomProducts = async () => {
    try {
      const response = await fetch('/api/products/random?count=4');
      if (response.ok) {
        const data = await response.json();
        setRandomProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching random products:', err);
    }
  };

  // IMPROVED SCROLL PROGRESS TRACKING - Only for blog content
  useEffect(() => {
    const updateScrollProgress = () => {
      try {
        if (!blogContentRef.current) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const blogContentElement = blogContentRef.current;
        
        // Get the blog content's position and dimensions
        const contentTop = blogContentElement.offsetTop;
        const contentHeight = blogContentElement.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate when user starts reading the content
        const contentStart = contentTop - windowHeight * 0.3;
        const contentEnd = contentTop + contentHeight - windowHeight * 0.7;
        
        if (scrollTop < contentStart) {
          setScrollProgress(0);
        } else if (scrollTop > contentEnd) {
          setScrollProgress(100);
        } else {
          const readableDistance = contentEnd - contentStart;
          const currentProgress = ((scrollTop - contentStart) / readableDistance) * 100;
          const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);
          setScrollProgress(clampedProgress);
        }
        
        setShowScrollButton(scrollTop > 300);
        
      } catch (error) {
        console.error('Error calculating scroll progress:', error);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    
    setTimeout(updateScrollProgress, 100);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [blog]);

  // Scroll to next section
  const scrollToNextSection = () => {
    try {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('Error scrolling:', error);
      window.scrollBy(0, window.innerHeight * 0.8);
    }
  };
 

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '1 min read';
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || 'Blog Post');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white py-10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 p-6 rounded-xl text-red-800 border border-red-200 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Error Loading Blog</h2>
            <p>{error}</p>
            <Link 
              href="/blog" 
              className="mt-4 inline-flex items-center text-red-700 hover:text-red-900"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to unpublished warning if not published
  if (blog && !blog.published) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-lg text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">This blog post is not published yet</h2>
          <p className="text-yellow-700 mb-6">
            This blog is still in draft mode and is not available to the public. 
            Only authors and administrators can view drafts.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/blog" 
              className="px-5 py-2.5 bg-white text-yellow-700 rounded-lg hover:bg-yellow-100 transition border border-yellow-300 shadow-sm"
            >
              Back to Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />
      
      {/* ENHANCED PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-[9999] shadow-sm">
        <div 
          className={`h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-300 ease-out shadow-sm ${
            scrollProgress === 100 ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700' : ''
          }`}
          style={{ 
            width: `${scrollProgress}%`
          }}
        />
        
        {scrollProgress > 0 && (
          <div 
            className={`absolute top-0 right-2 text-xs font-medium px-2 py-1 rounded-b-md shadow-sm transition-colors duration-300 ${
              scrollProgress === 100 
                ? 'text-green-600 bg-green-50' 
                : 'text-blue-600 bg-white'
            }`}
            style={{ fontSize: '10px' }}
          >
            {scrollProgress === 100 ? '✓ Read' : `${Math.round(scrollProgress)}%`}
          </div>
        )}
      </div>
      



      {/* Scroll Down Button */}
      {!loading && blog && (
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToNextSection}
              className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      )}
      
      <div ref={contentRef} className="max-w-7xl mx-auto p-3 md:p-6 pt-16 md:pt-24 pb-8 md:pb-16">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 md:mb-8"
        >
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
            <span>Back to Blogs</span>
          </button>
        </motion.div>
        <a href="https://techsommet.com/legal-automation-india/" target="_blank" rel="noopener noreferrer">
  <img
    src="/images/campaign.jpg"
    alt="Resources Banner"
    className="w-full h-full object-cover cursor-pointer"
  />
</a>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          
          {/* Main Blog Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/4"
          >
            {blog && (
              <>
              
                {/* Blog Header */}
                <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">{blog.title}</h1>
                  
                  <div className="flex flex-wrap gap-3 md:gap-4 text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="md:w-4 md:h-4" />
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="md:w-4 md:h-4" />
                      <span>{getReadingTime(blog.content)}</span>
                    </div>
                  </div>
                  
                  {/* DYNAMIC BANNER */}
                  {blog.bannerImage && (
                    <div className="w-full overflow-hidden rounded-lg md:rounded-xl md:shadow-md">
                      {isLegalTechAcademy(blog.category) ? (
                        (() => {
                          const videoId = getYouTubeVideoId(blog.bannerImage);
                          return videoId ? (
                            <div className="w-full aspect-[16/9]">
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={blog.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/9]">
                              <img
                                src={blog.bannerImage}
                                alt={blog.title}
                                className="w-full aspect-[16/9] object-cover"
                              />
                            </div>
                          );
                        })()
                      ) : (
                        <div className="w-full aspect-[16/9]">
                          <img
                            src={blog.bannerImage}
                            alt={blog.title}
                            className="w-full aspect-[16/9] object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Share buttons (mobile - top) */}
                <div className="lg:hidden md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-6 mb-4 md:mb-8">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                    Share this article
                  </h3>
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="bg-[#1877f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="bg-[#1da1f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="bg-[#0a66c2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors relative"
                      aria-label="Copy link"
                    >
                      {copied ? <CheckCircle size={18} className="text-green-600 md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
                      {copied && (
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {/* Table of Contents - Mobile */}
                  {blog && blog.tocItems && blog.tocItems.length > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-3 text-gray-900 font-semibold text-sm">
                        <List size={16} />
                        <h3>Table of Contents</h3>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                        <ul className="space-y-2">
                          {blog.tocItems.map((item, index) => (
                            <li 
                              key={index}
                              className={`
                                ${item.level === 1 ? 'font-medium text-sm border-l-3 border-blue-500 pl-3' : 
                                  item.level === 2 ? 'ml-3 text-xs border-l-2 border-blue-300 pl-3' : 
                                  'ml-6 text-xs text-gray-600 pl-3'}
                                transition-all duration-200 hover:border-opacity-100
                                ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
                              `}
                            >
                              <a 
                                href={`#${item.slug}`} 
                                className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
                              >
                                {item.content}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Blog Content */}
                <div ref={blogContentRef} className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* REPLACED: Like/Dislike Section */}
                <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Was this article helpful?</h3>
                  
                  <VoteButtons articleId={blog?.id} />
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Your feedback helps us improve our content
                  </p>
                </div>
                
                {/* Reference Links */}
                {blog.refLinks && blog.refLinks.length > 0 && (
                  <div className="md:bg-white md:rounded-2xl md:shadow-lg p-4 md:p-8 mb-4 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">References</h3>
                    <ul className="space-y-2 md:space-y-3">
                      {blog.refLinks.map((link, index) => (
                        <li key={index} className="flex items-start p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl hover:bg-gray-100 transition-colors">
                          <span className="mr-2 md:mr-3 text-blue-500 mt-1">•</span>
                          <div>
                            <p className="font-medium text-gray-900 text-sm md:text-base">{link.title}</p>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs md:text-sm break-all"
                            >
                              {link.url}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4"
          >
            <div className="sticky top-20 md:top-24 space-y-4 md:space-y-6">
              {/* One-line sharing section */}
              <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg relative">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
                  >
                    <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                    <span>Share </span>
                  </button>
                  
                  <div className="flex gap-1 md:gap-2">
                    <button 
                      onClick={() => shareOnSocial('facebook')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Facebook size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={() => shareOnSocial('twitter')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Twitter size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={() => shareOnSocial('linkedin')} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      <Linkedin size={13} className="md:w-[15px] md:h-[15px]" />
                    </button>
                    <button 
                      onClick={copyToClipboard} 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      {copied ? <CheckCircle size={13} className="text-green-600 md:w-[15px] md:h-[15px]" /> : <Copy size={13} className="md:w-[15px] md:h-[15px]" />}
                    </button>
                  </div>
                </div>
                
                {showShareOptions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white p-3 md:p-4 rounded-xl shadow-lg z-10 space-y-2">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Facebook size={16} className="text-[#1877f2] md:w-[18px] md:h-[18px]" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Twitter size={16} className="text-[#1da1f2] md:w-[18px] md:h-[18px]" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      <Linkedin size={16} className="text-[#0a66c2] md:w-[18px] md:h-[18px]" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                    >
                      {copied ? <CheckCircle size={16} className="text-green-600 md:w-[18px] md:h-[18px]" /> : <Copy size={16} className="md:w-[18px] md:h-[18px]" />}
                      <span>{copied ? 'Link copied!' : 'Copy link'}</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Table of contents - Desktop only */}
              {blog && blog.tocItems && blog.tocItems.length > 0 && (
                <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
                  <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
                    <List size={18} className="md:w-5 md:h-5" />
                    <h3>Table of Contents</h3>
                  </div>
                  
                  <div className="max-h-80 md:max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                    <ul className="space-y-2 md:space-y-3">
                      {blog.tocItems.map((item, index) => (
                        <li 
                          key={index}
                          className={`
                            ${item.level === 1 ? 'font-medium text-sm md:text-base border-l-4 border-blue-500 pl-3' : 
                              item.level === 2 ? 'ml-3 text-xs md:text-sm border-l-2 border-blue-300 pl-3' : 
                              'ml-6 text-xs md:text-sm text-gray-600 pl-3'}
                            transition-all duration-200 hover:border-opacity-100
                            ${item.level === 1 ? 'border-opacity-75' : 'border-opacity-50'}
                          `}
                        >
                          <a 
                            href={`#${item.slug}`} 
                            className="block py-1 text-gray-700 hover:text-blue-700 transition-colors"
                          >
                            {item.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Related Products Section */}
              {randomProducts.length > 0 && (
                <div className="hidden lg:block bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg">
                  <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-900 font-bold text-lg md:text-xl">
                    <ExternalLink size={18} className="md:w-5 md:h-5" />
                    <h3>Related Products</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {randomProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.logoUrl || '/default-product-logo.png'}
                            alt={product.productName}
                            className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-gray-200"
                            onError={(e) => {
                              e.target.src = '/default-product-logo.png';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                              {product.productName}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {product.companyName}
                            </p>
                          </div>
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <FinalSection category={blog.category} />
      </div>
    </div>
  );
}