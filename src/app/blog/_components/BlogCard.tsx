
// // 'use client';

// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { Calendar, Edit2, Eye, Bookmark, ArrowUpRight } from 'lucide-react';

// // export default function BlogCard({ blog, allBlogs, setBlogs }) {
// //   const router = useRouter();

// //   const handleView = (e) => {
// //     e.preventDefault();
// //     localStorage.setItem('currentBlogId', blog.id);
// //     router.push('/blog/blog-preview');
// //   };

// //   const handleEdit = (e) => {
// //     e.preventDefault();
// //     localStorage.setItem('currentBlogId', blog.id);
// //     router.push('/blog/blog-editor');
// //   };

// //   // Get a short excerpt from the content
// //   const getExcerpt = (content, maxLength = 120) => {
// //     if (!content) return '';
// //     // Remove HTML tags and get plain text
// //     const plainText = content.replace(/<[^>]+>/g, '');
// //     return plainText.length > maxLength
// //       ? plainText.substring(0, maxLength) + '...'
// //       : plainText;
// //   };

// //   // Format date in a more readable way
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   const handleDeleteBlog = async (id: string) => {
// //     // /api/blogs/[id]
// //     if (!confirm('Are you sure you want to delete this blog?')) return;
// //     const response = await fetch(`/api/blogs/${id}`, {
// //       method: 'DELETE'
// //     });
// //     if (response.ok) {
// //       // Remove the blog from the UI
// //       setBlogs(allBlogs.filter(blog => blog.id !== id));
// //     }
// //   }

// //   return (
// //     <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
// //       {/* Blog Image with Gradient Overlay */}
// //       <div className="relative h-48 overflow-hidden">
// //         {blog.bannerImage ? (
// //           <img
// //             src={blog.bannerImage}
// //             alt={blog.title}
// //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
// //           />
// //         ) : (
// //           <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
// //         )}
// //         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>

// //         {/* Status Badge */}
// //         <div className="flex items-center justify-between w-full absolute top-4 px-6">
// //           <div>
// //             <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer 
// //             ${blog.published
// //                 ? 'bg-green-500/90 text-white'
// //                 : 'bg-yellow-500/90 text-white'}`}
// //             >
// //               {blog.published ? 'Published' : 'Draft'}
// //             </span>
// //           </div>
// //           <div>
// //             <span
// //               onClick={() => handleDeleteBlog(blog.id)}
// //               className={"px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-red-500/90 text-white"}
// //             >
// //               Delete
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="p-6">
// //         <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
// //           {blog.title}
// //         </h2>

// //         {/* Date */}
// //         <div className="flex items-center text-sm text-gray-500 mb-3">
// //           <Calendar size={14} className="mr-1" />
// //           <span>{formatDate(blog.createdAt)}</span>
// //         </div>

// //         {/* Excerpt */}
// //         {blog.content && (
// //           <p className="text-gray-600 text-sm mb-5 line-clamp-3">
// //             {getExcerpt(blog.content)}
// //           </p>
// //         )}

// //         {/* Action Buttons */}
// //         <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
// //           <button
// //             onClick={handleEdit}
// //             className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
// //           >
// //             <Edit2 size={16} />
// //             <span>Edit</span>
// //           </button>

// //           <button
// //             onClick={handleView}
// //             className="flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
// //           >
// //             <Eye size={16} />
// //             <span>Preview</span>
// //           </button>

// //           {blog.published && (
// //             <Link
// //               href={`/blog/${blog.slug}`}
// //               className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
// //               target="_blank"
// //             >
// //               <ArrowUpRight size={16} />
// //               <span>View</span>
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Calendar, Edit2, Eye, ArrowUpRight, Tag, X, Plus, MapPin } from 'lucide-react';

// const LOCATION_OPTIONS = [
//   { value: 'hero', label: '🎯 Hero Section' },
//   { value: 'below-hero', label: '📰 Below Hero' },
//   { value: 'second-collage', label: '🖼️ Second Collage' },
//   { value: 'one-line-section', label: '➡️ One Line Section' },
//   { value: 'before-latest', label: '⬆️ Before Latest' },
//   { value: 'latest', label: '🕒 Latest Articles' },
//   { value: 'sidebar-first-mini', label: '📌 Sidebar - First Mini' },
//   { value: 'sidebar-middle-big', label: '📌 Sidebar - Middle Big' },
//   { value: 'sidebar-second-mini', label: '📌 Sidebar - Second Mini' },
// ];

// export default function BlogCard({ blog, allBlogs, setBlogs }) {
//   const router = useRouter();
//   const [showTagModal, setShowTagModal] = useState(false);
//   const [tags, setTags] = useState(Array.isArray(blog.tags) ? blog.tags : []);
//   const [newTag, setNewTag] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleView = (e) => {
//     e.preventDefault();
//     localStorage.setItem('currentBlogId', blog.id);
//     router.push('/blog/blog-preview');
//   };

//   const handleEdit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('currentBlogId', blog.id);
//     router.push('/blog/blog-editor');
//   };

//   const getExcerpt = (content, maxLength = 120) => {
//     if (!content) return '';
//     const plainText = content.replace(/<[^>]+>/g, '');
//     return plainText.length > maxLength
//       ? plainText.substring(0, maxLength) + '...'
//       : plainText;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const handleDeleteBlog = async (id) => {
//     if (!confirm('Are you sure you want to delete this blog?')) return;
//     const response = await fetch(`/api/blogs/${id}`, {
//       method: 'DELETE'
//     });
//     if (response.ok) {
//       setBlogs(allBlogs.filter(b => b.id !== id));
//     }
//   };

//   // Tag management functions
//   const handleAddTag = async () => {
//     if (!newTag.trim() || !selectedLocation) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`/api/blogs/${blog.id}/tags`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tag: newTag.trim(), location: selectedLocation })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTags(data.blog.tags);
        
//         // Update parent state
//         const updatedBlogs = allBlogs.map(b => 
//           b.id === blog.id ? { ...b, tags: data.blog.tags } : b
//         );
//         setBlogs(updatedBlogs);
        
//         setNewTag('');
//         setSelectedLocation('');
//       }
//     } catch (err) {
//       console.error('Failed to add tag:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveTag = async (tag, location) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `/api/blogs/${blog.id}/tags?tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`,
//         { method: 'DELETE' }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setTags(data.blog.tags);
        
//         // Update parent state
//         const updatedBlogs = allBlogs.map(b => 
//           b.id === blog.id ? { ...b, tags: data.blog.tags } : b
//         );
//         setBlogs(updatedBlogs);
//       }
//     } catch (err) {
//       console.error('Failed to remove tag:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
//         {/* Blog Image with Gradient Overlay */}
//         <div className="relative h-48 overflow-hidden">
//           {blog.bannerImage ? (
//             <img
//               src={blog.bannerImage}
//               alt={blog.title}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>

//           {/* Status Badge */}
//           <div className="flex items-center justify-between w-full absolute top-4 px-6">
//             <div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer 
//               ${blog.published
//                   ? 'bg-green-500/90 text-white'
//                   : 'bg-yellow-500/90 text-white'}`}
//               >
//                 {blog.published ? 'Published' : 'Draft'}
//               </span>
//             </div>
//             <div>
//               <span
//                 onClick={() => handleDeleteBlog(blog.id)}
//                 className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-red-500/90 text-white hover:bg-red-600/90"
//               >
//                 Delete
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {blog.title}
//           </h2>

//           {/* Date */}
//           <div className="flex items-center text-sm text-gray-500 mb-3">
//             <Calendar size={14} className="mr-1" />
//             <span>{formatDate(blog.createdAt)}</span>
//           </div>

//           {/* Tags Display */}
//           {tags.length > 0 ? (
//             <div className="mb-4">
//               <div className="flex flex-wrap gap-1">
//                 {tags.slice(0, 2).map((tag, idx) => (
//                   <span
//                     key={`${tag.tag}-${tag.location}-${idx}`}
//                     className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
//                   >
//                     <Tag size={10} />
//                     {tag.tag}
//                   </span>
//                 ))}
//                 {tags.length > 2 && (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                     +{tags.length - 2}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
//               ⚠️ No tags - won't appear on site
//             </div>
//           )}

//           {/* Excerpt */}
//           {blog.content && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//               {getExcerpt(blog.content)}
//             </p>
//           )}

//           {/* Action Buttons */}
//           <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto gap-2">
//             <button
//               onClick={() => setShowTagModal(true)}
//               className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
//             >
//               <Tag size={16} />
//               <span>Tags</span>
//             </button>

//             <button
//               onClick={handleEdit}
//               className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
//             >
//               <Edit2 size={16} />
//               <span>Edit</span>
//             </button>

//             <button
//               onClick={handleView}
//               className="flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
//             >
//               <Eye size={16} />
//               <span>Preview</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tag Management Modal */}
//       {showTagModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">Manage Tags</h3>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-1">{blog.title}</p>
//               </div>
//               <button
//                 onClick={() => setShowTagModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 space-y-6">
//               {/* Add Tag Form */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tag Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     placeholder="e.g., Architecture, Travel"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     disabled={loading}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location
//                   </label>
//                   <select
//                     value={selectedLocation}
//                     onChange={(e) => setSelectedLocation(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     disabled={loading}
//                   >
//                     <option value="">Select location...</option>
//                     {LOCATION_OPTIONS.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   onClick={handleAddTag}
//                   disabled={loading || !newTag.trim() || !selectedLocation}
//                   className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
//                 >
//                   <Plus size={18} />
//                   {loading ? 'Adding...' : 'Add Tag'}
//                 </button>
//               </div>

//               {/* Current Tags */}
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3">
//                   Current Tags ({tags.length})
//                 </h4>
                
//                 {tags.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
//                     <Tag size={40} className="mx-auto mb-2 opacity-20" />
//                     <p className="text-sm">No tags yet</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     {tags.map((tag, index) => (
//                       <div
//                         key={`${tag.tag}-${tag.location}-${index}`}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <Tag size={16} className="text-blue-600" />
//                           <span className="font-medium text-gray-900">{tag.tag}</span>
//                           <span className="text-xs text-gray-500 flex items-center gap-1">
//                             <MapPin size={12} />
//                             {LOCATION_OPTIONS.find(opt => opt.value === tag.location)?.label || tag.location}
//                           </span>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveTag(tag.tag, tag.location)}
//                           disabled={loading}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
//               <button
//                 onClick={() => setShowTagModal(false)}
//                 className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Edit2, Eye, ArrowUpRight, Tag, X, Plus, MapPin, Search, Sparkles } from 'lucide-react';

const LOCATION_OPTIONS = [
  { value: 'hero', label: '🎯 Hero Section' },
  { value: 'below-hero', label: '📰 Below Hero' },
  { value: 'second-collage', label: '🖼️ Second Collage' },
  { value: 'one-line-section', label: '➡️ One Line Section' },
  { value: 'before-latest', label: '⬆️ Before Latest' },
  { value: 'latest', label: '🕒 Latest Articles' },
  { value: 'sidebar-first-mini', label: '📌 Sidebar - First Mini' },
  { value: 'sidebar-middle-big', label: '📌 Sidebar - Middle Big' },
  { value: 'sidebar-second-mini', label: '📌 Sidebar - Second Mini' },
];

export default function BlogCard({ blog, allBlogs, setBlogs }) {
  const router = useRouter();
  const [showTagModal, setShowTagModal] = useState(false);
  const [tags, setTags] = useState(Array.isArray(blog.tags) ? blog.tags : []);
  const [newTag, setNewTag] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Autocomplete state
  const [existingTags, setExistingTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const inputRef = useRef(null);

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

  const getExcerpt = (content, maxLength = 120) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setBlogs(allBlogs.filter(b => b.id !== id));
    }
  };

  // Load existing tags when modal opens
  useEffect(() => {
    if (showTagModal) {
      loadExistingTags();
    }
  }, [showTagModal]);

  const loadExistingTags = async () => {
    setLoadingTags(true);
    try {
      const response = await fetch('/api/blogs/tags/all');
      if (response.ok) {
        const data = await response.json();
        setExistingTags(data.allTags || []);
      }
    } catch (err) {
      console.error('Failed to load existing tags:', err);
    } finally {
      setLoadingTags(false);
    }
  };

  // Filter tags based on input
  useEffect(() => {
    if (newTag.trim()) {
      const filtered = existingTags.filter(tag =>
        tag.toLowerCase().includes(newTag.toLowerCase())
      );
      setFilteredTags(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredTags([]);
      setShowDropdown(false);
    }
  }, [newTag, existingTags]);

  // Handle tag selection from dropdown
  const selectExistingTag = (tag) => {
    setNewTag(tag);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Tag management functions
  const handleAddTag = async () => {
    if (!newTag.trim() || !selectedLocation) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blog.id}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: newTag.trim(), location: selectedLocation })
      });

      if (response.ok) {
        const data = await response.json();
        setTags(data.blog.tags);
        
        // Update parent state
        const updatedBlogs = allBlogs.map(b => 
          b.id === blog.id ? { ...b, tags: data.blog.tags } : b
        );
        setBlogs(updatedBlogs);
        
        setNewTag('');
        setSelectedLocation('');
        
        // Refresh existing tags list
        loadExistingTags();
      }
    } catch (err) {
      console.error('Failed to add tag:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (tag, location) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blogs/${blog.id}/tags?tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        const data = await response.json();
        setTags(data.blog.tags);
        
        // Update parent state
        const updatedBlogs = allBlogs.map(b => 
          b.id === blog.id ? { ...b, tags: data.blog.tags } : b
        );
        setBlogs(updatedBlogs);
      }
    } catch (err) {
      console.error('Failed to remove tag:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check if tag is new or existing
  const isNewTag = newTag.trim() && !existingTags.some(t => t.toLowerCase() === newTag.toLowerCase());

  return (
    <>
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
                className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-red-500/90 text-white hover:bg-red-600/90"
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

          {/* Tags Display */}
          {tags.length > 0 ? (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={`${tag.tag}-${tag.location}-${idx}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                  >
                    <Tag size={10} />
                    {tag.tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
              ⚠️ No tags - won't appear on site
            </div>
          )}

          {/* Excerpt */}
          {blog.content && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {getExcerpt(blog.content)}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto gap-2">
            <button
              onClick={() => setShowTagModal(true)}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
            >
              <Tag size={16} />
              <span>Tags</span>
            </button>

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
          </div>
        </div>
      </div>

      {/* Tag Management Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Manage Tags</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{blog.title}</p>
              </div>
              <button
                onClick={() => setShowTagModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Add Tag Form */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag Name
                    {existingTags.length > 0 && (
                      <span className="ml-2 text-xs text-gray-500">
                        ({existingTags.length} existing tags available)
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      ref={inputRef}
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Search existing tags or type new..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                      onFocus={() => {
                        if (newTag.trim() && filteredTags.length > 0) {
                          setShowDropdown(true);
                        }
                      }}
                    />
                    {isNewTag && newTag.trim() && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-green-600">
                        <Sparkles size={14} />
                        <span>New tag</span>
                      </div>
                    )}
                  </div>

                  {/* Autocomplete Dropdown */}
                  {showDropdown && filteredTags.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectExistingTag(tag)}
                          className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                          <Tag size={14} className="text-blue-600" />
                          <span className="text-sm text-gray-900">{tag}</span>
                          <span className="ml-auto text-xs text-gray-500">Existing</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Show all existing tags button */}
                  {existingTags.length > 0 && !newTag && (
                    <div className="mt-2">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Search size={12} />
                        {showDropdown ? 'Hide' : 'Show'} all existing tags
                      </button>
                    </div>
                  )}
                  
                  {/* All existing tags dropdown */}
                  {showDropdown && !newTag && existingTags.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {existingTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectExistingTag(tag)}
                          className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                          <Tag size={14} className="text-blue-600" />
                          <span className="text-sm text-gray-900">{tag}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
                  >
                    <option value="">Select location...</option>
                    {LOCATION_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddTag}
                  disabled={loading || !newTag.trim() || !selectedLocation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Plus size={18} />
                  {loading ? 'Adding...' : isNewTag ? 'Create & Add Tag' : 'Add Existing Tag'}
                </button>
              </div>

              {/* Current Tags */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Current Tags ({tags.length})
                </h4>
                
                {tags.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    <Tag size={40} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No tags yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tags.map((tag, index) => (
                      <div
                        key={`${tag.tag}-${tag.location}-${index}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Tag size={16} className="text-blue-600" />
                          <span className="font-medium text-gray-900">{tag.tag}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {LOCATION_OPTIONS.find(opt => opt.value === tag.location)?.label || tag.location}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveTag(tag.tag, tag.location)}
                          disabled={loading}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
              <button
                onClick={() => setShowTagModal(false)}
                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}