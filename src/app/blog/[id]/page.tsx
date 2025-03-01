
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, List, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';

// Blog styles (same as in preview)
const blogStyles = `
  .blog-content {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #374151;
    line-height: 1.8;
  }

  .blog-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #111827;
    scroll-margin-top: 80px;
  }

  .blog-content h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #1f2937;
    scroll-margin-top: 80px;
  }

  .blog-content h3 {
    font-size: 1.375rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    color: #374151;
    scroll-margin-top: 80px;
  }

  .blog-content p {
    margin-bottom: 1.25rem;
  }

  .blog-content ul, .blog-content ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  .blog-content ul li {
    list-style-type: disc;
    margin-bottom: 0.5rem;
  }

  .blog-content ol li {
    list-style-type: decimal;
    margin-bottom: 0.5rem;
  }

  .blog-content a {
    color: #2563eb;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }
  
  .blog-content a:hover {
    color: #1e40af;
  }

  .blog-content blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: #6b7280;
    background-color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .blog-content img {
    border-radius: 0.5rem;
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* Enhanced image alignment classes */
  .blog-content img.img-align-left, 
  .blog-content img.blog-image.img-align-left {
    float: left;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
    clear: left;
  }

  .blog-content img.img-align-center,
  .blog-content img.blog-image.img-align-center {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
    float: none !important;
    clear: both !important;
  }

  .blog-content img.img-align-right,
  .blog-content img.blog-image.img-align-right {
    float: right;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    clear: right;
  }

  /* Clear fix for paragraphs after floating images */
  .blog-content p:after {
    content: "";
    display: table;
    clear: both;
  }

  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    overflow-x: auto;
    display: block;
  }

  .blog-content table th,
  .blog-content table td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
  }

  .blog-content table th {
    background-color: #f9fafb;
    font-weight: 600;
    text-align: left;
  }

  .blog-content table tr:nth-child(even) {
    background-color: #f9fafb;
  }
  
  .blog-content code {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.875em;
  }

  /* For larger screens */
  @media (min-width: 768px) {
    .blog-content {
      font-size: 1.125rem;
    }
  }
`;

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlog();
  }, [id, router]);

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
    // Remove HTML tags
    const text = content.replace(/<[^>]+>/g, '');
    // Average reading speed: 200 words per minute
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
  const [showShareOptions, setShowShareOptions] = useState(false);

  
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
      
      <div className="max-w-7xl mx-auto p-6 pt-24 pb-16">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Blogs</span>
          </Link>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
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
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>
                  
                  <div className="flex flex-wrap gap-4 text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{getReadingTime(blog.content)}</span>
                    </div>
                  </div>
                  
                  {blog.bannerImage && (
                    <img
                      src={blog.bannerImage}
                      alt={blog.title}
                      className="w-full h-80 object-cover rounded-xl shadow-md"
                    />
                  )}
                </div>
                
                {/* Share buttons (mobile - top) */}
                <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Share2 size={18} />
                    Share this article
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="bg-[#1877f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={20} />
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="bg-[#1da1f2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={20} />
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="bg-[#0a66c2] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={20} />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors relative"
                      aria-label="Copy link"
                    >
                      {copied ? <CheckCircle size={20} className="text-green-600" /> : <Copy size={20} />}
                      {copied && (
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Blog Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
                
                {/* Reference Links */}
                {blog.refLinks && blog.refLinks.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">References</h3>
                    <ul className="space-y-3">
                      {blog.refLinks.map((link, index) => (
                        <li key={index} className="flex items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <span className="mr-3 text-blue-500 mt-1">•</span>
                          <div>
                            <p className="font-medium text-gray-900">{link.title}</p>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm break-all"
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
           <div className="sticky top-24 space-y-6">
      {/* One-line sharing section */}
      <div className="bg-white p-3 rounded-2xl shadow-lg relative">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Share2 size={18} />
            <span>Share </span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => shareOnSocial('facebook')} 
              className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
            >
              <Facebook size={15} />
            </button>
            <button 
              onClick={() => shareOnSocial('twitter')} 
              className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
            >
              <Twitter size={15} />
            </button>
            <button 
              onClick={() => shareOnSocial('linkedin')} 
              className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
            >
              <Linkedin size={15} />
            </button>
            <button 
              onClick={copyToClipboard} 
              className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              {copied ? <CheckCircle size={15} className="text-green-600" /> : <Copy size={15} />}
            </button>
          </div>
        </div>
        
        {showShareOptions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white p-4 rounded-xl shadow-lg z-10 space-y-2">
            <button
              onClick={() => shareOnSocial('facebook')}
              className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Facebook size={18} className="text-[#1877f2]" />
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={() => shareOnSocial('twitter')}
              className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Twitter size={18} className="text-[#1da1f2]" />
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Linkedin size={18} className="text-[#0a66c2]" />
              <span>Share on LinkedIn</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2 text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {copied ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
              <span>{copied ? 'Link copied!' : 'Copy link'}</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Beautiful scrollable table of contents */}
      {blog && blog.tocItems && blog.tocItems.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-xl">
            <List size={20} />
            <h3>Table of Contents</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin">
            <ul className="space-y-3">
              {blog.tocItems.map((item, index) => (
                <li 
                  key={index}
                  className={`
                    ${item.level === 1 ? 'font-medium text-base border-l-4 border-blue-500 pl-3' : 
                      item.level === 2 ? 'ml-3 text-sm border-l-2 border-blue-300 pl-3' : 
                      'ml-6 text-sm text-gray-600 pl-3'}
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
          </motion.div>
        </div>
      </div>
    </div>
  )};