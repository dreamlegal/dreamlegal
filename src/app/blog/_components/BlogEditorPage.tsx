
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Eye, Save, LinkIcon, Image as ImageIcon, Globe, Calendar, AlertTriangle, Edit, Check, X } from 'lucide-react';

// // Dynamically import TipTapEditor to avoid SSR issues
// const TipTapEditor = dynamic(() => import('./TipTapEditor'), { 
//   ssr: false,
//   loading: () => (
//     <div className="border rounded-xl shadow-md p-6 min-h-[500px] flex items-center justify-center">
//       <div className="flex flex-col items-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
//         <p className="mt-4 text-blue-600">Loading editor...</p>
//       </div>
//     </div>
//   )
// });

// const BlogEditorPage = () => {
//   const router = useRouter();
//   const [blogInfo, setBlogInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [extractedToc, setExtractedToc] = useState([]);
//   const [saving, setSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
  
//   // Add state for editing header
//   const [isEditingHeader, setIsEditingHeader] = useState(false);
//   const [editedBlogInfo, setEditedBlogInfo] = useState(null);
//   const [headerSaving, setHeaderSaving] = useState(false);

//   useEffect(() => {
//     async function loadBlog() {
//       const blogId = localStorage.getItem('currentBlogId');
      
//       if (!blogId) {
//         router.push('/blog/new-blog');
//         return;
//       }
      
//       try {
//         const response = await fetch(`/api/blogs/${blogId}`);
        
//         if (!response.ok) {
//           throw new Error('Failed to load blog data');
//         }
        
//         const blog = await response.json();
//         setBlogInfo(blog);
//         setEditedBlogInfo(blog); // Initialize editedBlogInfo with blog data
        
//         // Convert tocItems from DB to the format expected by our components
//         if (blog.tocItems && blog.tocItems.length > 0) {
//           setExtractedToc(blog.tocItems.map(item => ({
//             level: item.level,
//             content: item.content,
//             id: item.slug
//           })));
//         }
//       } catch (err) {
//         setError(err.message || 'An unexpected error occurred');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     loadBlog();
//   }, [router]);

//   const handleSave = async (content, tableOfContents) => {
//     setSaving(true);
//     setSaveSuccess(false);
//     const blogId = localStorage.getItem('currentBlogId');
    
//     if (!blogId) {
//       setError('No blog ID found. Please create a new blog.');
//       setSaving(false);
//       return;
//     }
    
//     try {
//       // Combine the metadata with the blog content
//       const updatedBlog = {
//         ...blogInfo,
//         content,
//         extractedToc: tableOfContents
//       };
      
//       const response = await fetch(`/api/blogs/${blogId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedBlog),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to save blog');
//       }
      
//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 3000);

//       // Update state with latest content
//       const updatedResponse = await fetch(`/api/blogs/${blogId}`);
//       if (updatedResponse.ok) {
//         const updatedBlog = await updatedResponse.json();
//         setBlogInfo(updatedBlog);
//         setEditedBlogInfo(updatedBlog);
//       }
//     } catch (err) {
//       setError(err.message || 'An unexpected error occurred');
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle saving header info
//   const handleSaveHeader = async () => {
//     setHeaderSaving(true);
//     setSaveSuccess(false);
//     const blogId = localStorage.getItem('currentBlogId');
    
//     if (!blogId) {
//       setError('No blog ID found. Please create a new blog.');
//       setHeaderSaving(false);
//       return;
//     }
    
//     try {
//       // Prepare the updated blog data
//       const updatedBlog = {
//         ...blogInfo,
//         ...editedBlogInfo
//       };
      
//       const response = await fetch(`/api/blogs/${blogId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedBlog),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to save blog header');
//       }
      
//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 3000);

//       // Update blog info state with the edited data
//       setBlogInfo(editedBlogInfo);
//       setIsEditingHeader(false);
      
//       // Refresh data from the server
//       const updatedResponse = await fetch(`/api/blogs/${blogId}`);
//       if (updatedResponse.ok) {
//         const updatedBlog = await updatedResponse.json();
//         setBlogInfo(updatedBlog);
//         setEditedBlogInfo(updatedBlog);
//       }
//     } catch (err) {
//       setError(err.message || 'An unexpected error occurred');
//       console.error(err);
//     } finally {
//       setHeaderSaving(false);
//     }
//   };

//   // Handle canceling header edit
//   const handleCancelHeaderEdit = () => {
//     setEditedBlogInfo(blogInfo);
//     setIsEditingHeader(false);
//   };

//   // Handle header field changes
//   const handleHeaderChange = (field, value) => {
//     setEditedBlogInfo(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleTocUpdate = (headings) => {
//     setExtractedToc(headings);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not published yet';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-blue-600 font-medium">Loading editor...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!blogInfo) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex flex-col items-center justify-center p-4">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//         </svg>
//         <div className="text-2xl text-gray-700 mb-4 font-bold">No blog data found</div>
//         <p className="text-gray-600 mb-8 text-center max-w-md">
//           We couldn't find any blog to edit. This might happen if you haven't created a blog yet.
//         </p>
//         <Link href="/blog/new-blog" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
//           Create a New Blog
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
//       {/* Success message */}
//       {saveSuccess && (
//         <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
//           <Save className="mr-2" size={20} />
//           Blog saved successfully!
//         </div>
//       )}
      
//       {/* Error message display */}
//       {error && (
//         <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
//           <AlertTriangle className="mr-2" size={20} />
//           {error}
//           <button 
//             className="ml-3 bg-red-600 rounded-full p-1 hover:bg-red-700"
//             onClick={() => setError('')}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       )}
      
//       <div className="max-w-7xl mx-auto p-6 pt-24">
//         {/* Navigation bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex justify-between mb-8"
//         >
//           <Link href="/blog/new-blog" className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-blue-600 hover:text-blue-800">
//             <ArrowLeft size={18} />
//             <span>Back to Blog Info</span>
//           </Link>
//           <Link href="/blog/blog-preview" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transition-all">
//             <Eye size={18} />
//             <span>Preview</span>
//           </Link>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Blog header info */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
//             {!isEditingHeader ? (
//               <>
//                 <div className="flex justify-between items-start mb-4">
//                   <h1 className="text-3xl font-bold text-gray-800">{blogInfo.title}</h1>
//                   <button 
//                     onClick={() => setIsEditingHeader(true)}
//                     className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600"
//                     title="Edit blog info"
//                   >
//                     <Edit size={18} />
//                   </button>
//                 </div>
//                 <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
//                   {blogInfo.bannerImage && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <ImageIcon size={16} className="text-blue-500" />
//                       <span className="truncate max-w-xs">Banner image added</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar size={16} className="text-blue-500" />
//                     <span>Created: {formatDate(blogInfo.createdAt)}</span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Globe size={16} className={blogInfo.published ? "text-green-500" : "text-yellow-500"} />
//                     <span className={blogInfo.published ? "text-green-600 font-medium" : "text-yellow-600"}>
//                       {blogInfo.published ? "Published" : "Draft"}
//                     </span>
//                   </div>
                  
//                   {blogInfo.refLinks && blogInfo.refLinks.length > 0 && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <LinkIcon size={16} className="text-blue-500" />
//                       <span>{blogInfo.refLinks.length} reference{blogInfo.refLinks.length !== 1 ? 's' : ''}</span>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-700">Edit Blog Information</h2>
//                   <div className="flex gap-2">
//                     <button 
//                       onClick={handleCancelHeaderEdit}
//                       className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 flex items-center gap-1"
//                       disabled={headerSaving}
//                     >
//                       <X size={18} />
//                       <span className="hidden sm:inline">Cancel</span>
//                     </button>
//                     <button 
//                       onClick={handleSaveHeader}
//                       className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white flex items-center gap-1"
//                       disabled={headerSaving}
//                     >
//                       {headerSaving ? (
//                         <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
//                       ) : (
//                         <Check size={18} />
//                       )}
//                       <span className="hidden sm:inline">Save</span>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   {/* Title input */}
//                   <div>
//                     <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-1">
//                       Blog Title
//                     </label>
//                     <input
//                       id="blog-title"
//                       type="text"
//                       value={editedBlogInfo.title || ''}
//                       onChange={(e) => handleHeaderChange('title', e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                       placeholder="Enter blog title"
//                     />
//                   </div>
                  
//                   {/* Banner image URL input */}
//                   <div>
//                     <label htmlFor="banner-image" className="block text-sm font-medium text-gray-700 mb-1">
//                       Banner Image URL
//                     </label>
//                     <input
//                       id="banner-image"
//                       type="text"
//                       value={editedBlogInfo.bannerImage || ''}
//                       onChange={(e) => handleHeaderChange('bannerImage', e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                       placeholder="Enter banner image URL"
//                     />
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     {/* Publication status */}
//                     <div className="flex-1">
//                       <label htmlFor="publish-status" className="block text-sm font-medium text-gray-700 mb-1">
//                         Publication Status
//                       </label>
//                       <select
//                         id="publish-status"
//                         value={editedBlogInfo.published ? 'published' : 'draft'}
//                         onChange={(e) => handleHeaderChange('published', e.target.value === 'published')}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                       >
//                         <option value="draft">Draft</option>
//                         <option value="published">Published</option>
//                       </select>
//                     </div>
                    
//                     {/* Category selection (if applicable) */}
//                     {blogInfo.category !== undefined && (
//                       <div className="flex-1">
//                         <label htmlFor="blog-category" className="block text-sm font-medium text-gray-700 mb-1">
//                           Category
//                         </label>
//                         <input
//                           id="blog-category"
//                           type="text"
//                           value={editedBlogInfo.category || ''}
//                           onChange={(e) => handleHeaderChange('category', e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                           placeholder="Enter blog category"
//                         />
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Tags/Keywords input (if applicable) */}
//                   {blogInfo.tags !== undefined && (
//                     <div>
//                       <label htmlFor="blog-tags" className="block text-sm font-medium text-gray-700 mb-1">
//                         Tags (comma separated)
//                       </label>
//                       <input
//                         id="blog-tags"
//                         type="text"
//                         value={Array.isArray(editedBlogInfo.tags) ? editedBlogInfo.tags.join(', ') : ''}
//                         onChange={(e) => handleHeaderChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                         placeholder="Enter tags separated by commas"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>
        
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Main Editor */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="w-full lg:w-3/4"
//           >
//             <TipTapEditor 
//               onSave={handleSave} 
//               onTocUpdate={handleTocUpdate} 
//               initialContent={blogInfo.content || '<p>Start writing your blog post...</p>'}
//               isSaving={saving}
//             />
//           </motion.div>
          
//           {/* Sidebar */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="w-full lg:w-1/4 mt-6 lg:mt-0"
//           >
//             {/* Table of Contents */}
//             <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
//               <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
//                 </svg>
//                 Table of Contents
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Create H1, H2, or H3 headings in your content to automatically generate a table of contents.
//               </p>
              
//               {extractedToc.length > 0 ? (
//                 <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
//                   {extractedToc.map((item, index) => (
//                     <div 
//                       key={index} 
//                       className={`
//                         ${item.level === 1 ? 'ml-0 font-medium' : 
//                           item.level === 2 ? 'ml-3 text-sm' : 
//                           'ml-6 text-sm text-gray-600'}
//                         p-2 hover:bg-blue-50 rounded-lg transition-colors
//                       `}
//                     >
//                       <div className="hover:text-blue-600 cursor-pointer truncate flex items-start gap-1.5">
//                         {item.level === 1 && (
//                           <span className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block mt-2"></span>
//                         )}
//                         <span>{item.content}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
//                   No headings found yet. Add H1, H2, or H3 headings to your content.
//                 </div>
//               )}
              
//               {/* Reference Links */}
//               {blogInfo.refLinks && blogInfo.refLinks.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-gray-200">
//                   <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
//                     <LinkIcon size={16} className="text-blue-600" />
//                     Reference Links
//                   </h4>
//                   <ul className="space-y-2">
//                     {blogInfo.refLinks.map((link, index) => (
//                       <li key={index} className="bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                         <a
//                           href={link.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline text-sm truncate block"
//                           title={link.title}
//                         >
//                           {link.title}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogEditorPage;
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Save, LinkIcon, Image as ImageIcon, Globe, Calendar, AlertTriangle, Edit, Check, X, Upload } from 'lucide-react';

// Dynamically import TipTapEditor to avoid SSR issues
const TipTapEditor = dynamic(() => import('./TipTapEditor'), { 
  ssr: false,
  loading: () => (
    <div className="border rounded-xl shadow-md p-6 min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-blue-600">Loading editor...</p>
      </div>
    </div>
  )
});

const BlogEditorPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [blogInfo, setBlogInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [extractedToc, setExtractedToc] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Add state for editing header
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [editedBlogInfo, setEditedBlogInfo] = useState(null);
  const [headerSaving, setHeaderSaving] = useState(false);
  
  // Image upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreviewError, setImagePreviewError] = useState(false);

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
          throw new Error('Failed to load blog data');
        }
        
        const blog = await response.json();
        setBlogInfo(blog);
        setEditedBlogInfo(blog); // Initialize editedBlogInfo with blog data
        
        // Convert tocItems from DB to the format expected by our components
        if (blog.tocItems && blog.tocItems.length > 0) {
          setExtractedToc(blog.tocItems.map(item => ({
            level: item.level,
            content: item.content,
            id: item.slug
          })));
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadBlog();
  }, [router]);

  const handleSave = async (content, tableOfContents) => {
    setSaving(true);
    setSaveSuccess(false);
    const blogId = localStorage.getItem('currentBlogId');
    
    if (!blogId) {
      setError('No blog ID found. Please create a new blog.');
      setSaving(false);
      return;
    }
    
    try {
      // Combine the metadata with the blog content
      const updatedBlog = {
        ...blogInfo,
        content,
        extractedToc: tableOfContents
      };
      
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save blog');
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // Update state with latest content
      const updatedResponse = await fetch(`/api/blogs/${blogId}`);
      if (updatedResponse.ok) {
        const updatedBlog = await updatedResponse.json();
        setBlogInfo(updatedBlog);
        setEditedBlogInfo(updatedBlog);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Handle saving header info
  const handleSaveHeader = async () => {
    setHeaderSaving(true);
    setSaveSuccess(false);
    const blogId = localStorage.getItem('currentBlogId');
    
    if (!blogId) {
      setError('No blog ID found. Please create a new blog.');
      setHeaderSaving(false);
      return;
    }
    
    try {
      // Prepare the updated blog data
      const updatedBlog = {
        ...blogInfo,
        ...editedBlogInfo
      };
      
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save blog header');
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // Update blog info state with the edited data
      setBlogInfo(editedBlogInfo);
      setIsEditingHeader(false);
      
      // Refresh data from the server
      const updatedResponse = await fetch(`/api/blogs/${blogId}`);
      if (updatedResponse.ok) {
        const updatedBlog = await updatedResponse.json();
        setBlogInfo(updatedBlog);
        setEditedBlogInfo(updatedBlog);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error(err);
    } finally {
      setHeaderSaving(false);
    }
  };

  // Handle canceling header edit
  const handleCancelHeaderEdit = () => {
    setEditedBlogInfo(blogInfo);
    setIsEditingHeader(false);
  };

  // Handle header field changes
  const handleHeaderChange = (field, value) => {
    setEditedBlogInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file upload for banner image
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Setup XHR for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      
      // Handle response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            handleHeaderChange('bannerImage', response.url);
            setImagePreviewError(false);
          } catch (error) {
            setError('Error parsing server response');
          }
        } else {
          setError('Failed to upload image');
        }
        setIsUploading(false);
      };
      
      // Handle errors
      xhr.onerror = () => {
        setError('Network error occurred during upload');
        setIsUploading(false);
      };
      
      // Send the upload request
      xhr.open('POST', '/api/blogs/upload');
      xhr.send(formData);
      
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during upload');
      console.error(err);
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleTocUpdate = (headings) => {
    setExtractedToc(headings);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published yet';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!blogInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white flex flex-col items-center justify-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-2xl text-gray-700 mb-4 font-bold">No blog data found</div>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          We couldn't find any blog to edit. This might happen if you haven't created a blog yet.
        </p>
        <Link href="/blog/new-blog" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
          Create a New Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      {/* Success message */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
          <Save className="mr-2" size={20} />
          Blog saved successfully!
        </div>
      )}
      
      {/* Error message display */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          {error}
          <button 
            className="ml-3 bg-red-600 rounded-full p-1 hover:bg-red-700"
            onClick={() => setError('')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Navigation bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between mb-8"
        >
          <Link href="/blog/new-blog" className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} />
            <span>Back to Blog Info</span>
          </Link>
          <Link href="/blog/blog-preview" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transition-all">
            <Eye size={18} />
            <span>Preview</span>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blog header info */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
            {!isEditingHeader ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{blogInfo.title}</h1>
                  <button 
                    onClick={() => setIsEditingHeader(true)}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600"
                    title="Edit blog info"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {blogInfo.bannerImage && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <ImageIcon size={16} className="text-blue-500" />
                      <span className="truncate max-w-xs">Banner image added</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} className="text-blue-500" />
                    <span>Created: {formatDate(blogInfo.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe size={16} className={blogInfo.published ? "text-green-500" : "text-yellow-500"} />
                    <span className={blogInfo.published ? "text-green-600 font-medium" : "text-yellow-600"}>
                      {blogInfo.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  
                  {blogInfo.refLinks && blogInfo.refLinks.length > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <LinkIcon size={16} className="text-blue-500" />
                      <span>{blogInfo.refLinks.length} reference{blogInfo.refLinks.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Edit Blog Information</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCancelHeaderEdit}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 flex items-center gap-1"
                      disabled={headerSaving}
                    >
                      <X size={18} />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                    <button 
                      onClick={handleSaveHeader}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white flex items-center gap-1"
                      disabled={headerSaving}
                    >
                      {headerSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
                      ) : (
                        <Check size={18} />
                      )}
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Title input */}
                  <div>
                    <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Blog Title
                    </label>
                    <input
                      id="blog-title"
                      type="text"
                      value={editedBlogInfo.title || ''}
                      onChange={(e) => handleHeaderChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter blog title"
                    />
                  </div>
                  
                  {/* Banner image upload */}
                  <div>
                    <label htmlFor="banner-image" className="block text-sm font-medium text-gray-700 mb-1">
                      Banner Image
                    </label>
                    
                    {/* Current banner image preview */}
                    {editedBlogInfo.bannerImage && !isUploading && (
                      <div className="mb-3 relative">
                        <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img 
                            src={editedBlogInfo.bannerImage} 
                            alt="Banner preview" 
                            className="w-full h-48 object-cover"
                            onError={() => setImagePreviewError(true)}
                          />
                          {imagePreviewError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center text-gray-500 p-4">
                                <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
                                <p>Image cannot be loaded.<br />Please try uploading again.</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => handleHeaderChange('bannerImage', '')}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-sm"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Image upload UI */}
                    <div 
                      onClick={triggerFileInput}
                      className={`w-full ${editedBlogInfo.bannerImage ? 'h-16' : 'h-32'} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="hidden"
                      />
                      
                      {isUploading ? (
                        <div className="w-full px-8">
                          <div className="text-center mb-2">
                            <p className="text-gray-600">Uploading... {uploadProgress}%</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-400 mb-1" />
                          <p className="text-gray-600 text-sm">
                            {editedBlogInfo.bannerImage ? 'Change banner image' : 'Upload a banner image'}
                          </p>
                          {!editedBlogInfo.bannerImage && (
                            <p className="text-gray-500 text-xs mt-1">JPG, PNG, GIF or WEBP (max. 5MB)</p>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Optional URL input as fallback */}
                    <div className="mt-3">
                      <label htmlFor="banner-url" className="block text-xs font-medium text-gray-500 mb-1">
                        Or enter an image URL directly:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ImageIcon size={16} className="text-gray-400" />
                        </div>
                        <input
                          id="banner-url"
                          type="url"
                          value={editedBlogInfo.bannerImage || ''}
                          onChange={(e) => handleHeaderChange('bannerImage', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Publication status */}
                    <div className="flex-1">
                      <label htmlFor="publish-status" className="block text-sm font-medium text-gray-700 mb-1">
                        Publication Status
                      </label>
                      <select
                        id="publish-status"
                        value={editedBlogInfo.published ? 'published' : 'draft'}
                        onChange={(e) => handleHeaderChange('published', e.target.value === 'published')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    
                    {/* Category selection (if applicable) */}
                    {blogInfo.category !== undefined && (
                      <div className="flex-1">
                        <label htmlFor="blog-category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <input
                          id="blog-category"
                          type="text"
                          value={editedBlogInfo.category || ''}
                          onChange={(e) => handleHeaderChange('category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="Enter blog category"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Tags/Keywords input (if applicable) */}
                  {blogInfo.tags !== undefined && (
                    <div>
                      <label htmlFor="blog-tags" className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        id="blog-tags"
                        type="text"
                        value={Array.isArray(editedBlogInfo.tags) ? editedBlogInfo.tags.join(', ') : ''}
                        onChange={(e) => handleHeaderChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter tags separated by commas"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Editor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-3/4"
          >
            <TipTapEditor 
              onSave={handleSave} 
              onTocUpdate={handleTocUpdate} 
              initialContent={blogInfo.content || '<p>Start writing your blog post...</p>'}
              isSaving={saving}
            />
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4 mt-6 lg:mt-0"
          >
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Table of Contents
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create H1, H2, or H3 headings in your content to automatically generate a table of contents.
              </p>
              
              {extractedToc.length > 0 ? (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {extractedToc.map((item, index) => (
                    <div 
                      key={index} 
                      className={`
                        ${item.level === 1 ? 'ml-0 font-medium' : 
                          item.level === 2 ? 'ml-3 text-sm' : 
                          'ml-6 text-sm text-gray-600'}
                        p-2 hover:bg-blue-50 rounded-lg transition-colors
                      `}
                    >
                      <div className="hover:text-blue-600 cursor-pointer truncate flex items-start gap-1.5">
                        {item.level === 1 && (
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block mt-2"></span>
                        )}
                        <span>{item.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
                  No headings found yet. Add H1, H2, or H3 headings to your content.
                </div>
              )}
              
              {/* Reference Links */}
              {blogInfo.refLinks && blogInfo.refLinks.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-600" />
                    Reference Links
                  </h4>
                  <ul className="space-y-2">
                    {blogInfo.refLinks.map((link, index) => (
                      <li key={index} className="bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm truncate block"
                          title={link.title}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorPage;