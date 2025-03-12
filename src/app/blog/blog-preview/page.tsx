
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import { ArrowLeft, Edit, Check, Calendar, Clock, List, ExternalLink, AlertTriangle } from 'lucide-react';
import { ArrowLeft, Edit, Check, Calendar, Clock, List, ExternalLink, AlertTriangle, Plus } from 'lucide-react';

// Enhanced blog styles for the preview page with improved image alignment
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

  /* Enhanced image alignment classes that respect the alignment attribute */
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

export default function BlogPreviewPage() {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  useEffect(() => {
    async function loadBlog() {
      const blogId = localStorage.getItem('currentBlogId');
      
      if (!blogId) {
        router.push('/blog/new-blog');
        return;
      }
      
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        
        if (!response.ok) {
          throw new Error('Failed to load blog preview');
        }
        
        const blog = await response.json();
        setBlog(blog);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadBlog();
  }, [router]);

  const handlePublish = async () => {
    setPublishing(true);
    const blogId = localStorage.getItem('currentBlogId');
    
    try {
      const response = await fetch(`/api/blogs/${blogId}/publish`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish blog');
      }
      
      const updatedBlog = await response.json();
      setBlog(updatedBlog);
      setPublishSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setPublishSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error(err);
    } finally {
      setPublishing(false);
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
    // Remove HTML tags
    const text = content.replace(/<[^>]+>/g, '');
    // Average reading speed: 200 words per minute
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex flex-col items-center justify-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-2xl text-gray-700 mb-4 font-bold">No blog data found</div>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          We couldn't find any blog content to preview. This might happen if you haven't created a blog yet.
        </p>
        <Link href="/blog/new-blog" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
          <Plus size={18} />
          Create a New Blog
        </Link>
      </div>
    );
  }

  // Use extracted ToC from the editor
  const tocItems = blog.tocItems || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white pb-16">
      <style>{blogStyles}</style>
      
      {/* Success message */}
      {publishSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
          <Check className="mr-2" size={20} />
          Blog published successfully!
        </div>
      )}
      
      {/* Error message display */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          {error}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between mb-8 sticky top-4 z-20"
        >
          <Link href="/blog/blog-editor" className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} />
            <span>Back to Editor</span>
          </Link>
          
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/blog/blog-editor')}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-gray-900"
            >
              <Edit size={18} />
              <span>Edit</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing || blog.published}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all ${
                blog.published 
                  ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {publishing ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Publishing...
                </>
              ) : blog.published ? (
                <>
                  <Check size={18} />
                  Published
                </>
              ) : (
                <>
                  <Check size={18} />
                  Publish
                </>
              )}
            </button>
            {blog.published && (
              <Link 
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-green-700 transition-all"
              >
                <ExternalLink size={18} />
                <span>View Live</span>
              </Link>
            )}
          </div>
        </motion.div>
      
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Blog Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-3/4"
          >
            {/* Blog Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{getReadingTime(blog.content)}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  blog.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.published ? 'Published' : 'Draft'}
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
            
            {/* Blog Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
            
            {/* Reference Links */}
            {blog.refLinks && blog.refLinks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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
          </motion.div>
          
          {/* Table of Contents Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4"
          >
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-xl">
                  <List size={20} />
                  <h3>Table of Contents</h3>
                </div>
                
                {tocItems && tocItems.length > 0 ? (
                  <ul className="space-y-3">
                    {tocItems.map((item, index) => (
                      <li 
                        key={index}
                        className={`
                          ${item.level === 1 ? 'ml-0 font-medium text-base' :
                          item.level === 2 ? 'ml-3 text-sm' :
                          'ml-6 text-sm text-gray-600'}
                        `}
                      >
                        <a 
                          href={`#${item.slug}`} 
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
                        >
                          {item.level === 1 && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block"></span>}
                          {item.content}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic bg-gray-50 p-3 rounded-xl text-sm">
                    No table of contents available. Add headings (H1, H2, H3) to your content to generate a table of contents.
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-2xl shadow-lg space-y-3">
                <button
                  onClick={() => router.push('/blog/blog-editor')}
                  className="w-full bg-white text-blue-600 border border-blue-200 px-4 py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  Edit Blog
                </button>
                <button
                  onClick={handlePublish}
                  disabled={publishing || blog.published}
                  className={`w-full px-4 py-3 rounded-xl transition flex items-center justify-center gap-2 ${
                    blog.published 
                      ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Check size={18} />
                  {publishing ? 'Publishing...' : blog.published ? 'Published' : 'Publish'}
                </button>
                {blog.published && (
                  <Link 
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    View Published Blog
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}