
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Edit2, Eye, Bookmark, ArrowUpRight } from 'lucide-react';

export default function BlogCard({ blog, allBlogs, setBlogs }) {
  const router = useRouter();

  const handleView = (e) => {
    e.preventDefault();
    localStorage.setItem('currentBlogId', blog.id);
    router.push('/blog/blog-preview');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.setItem('currentBlogId', blog.id);
    router.push('/blog/blog-editor');
  };

  // Get a short excerpt from the content
  const getExcerpt = (content, maxLength = 120) => {
    if (!content) return '';
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Format date in a more readable way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteBlog = async (id: string) => {
    // /api/blogs/[id]
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Remove the blog from the UI
      setBlogs(allBlogs.filter(blog => blog.id !== id));
    }
  }

  return (
    <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
      {/* Blog Image with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>

        {/* Status Badge */}
        <div className="flex items-center justify-between w-full absolute top-4 px-6">
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer 
            ${blog.published
                ? 'bg-green-500/90 text-white'
                : 'bg-yellow-500/90 text-white'}`}
            >
              {blog.published ? 'Published' : 'Draft'}
            </span>
          </div>
          <div>
            <span
              onClick={() => handleDeleteBlog(blog.id)}
              className={"px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-red-500/90 text-white"}
            >
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {/* Excerpt */}
        {blog.content && (
          <p className="text-gray-600 text-sm mb-5 line-clamp-3">
            {getExcerpt(blog.content)}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            <Edit2 size={16} />
            <span>Edit</span>
          </button>

          <button
            onClick={handleView}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>

          {blog.published && (
            <Link
              href={`/blog/${blog.id}`}
              className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
              target="_blank"
            >
              <ArrowUpRight size={16} />
              <span>View</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}