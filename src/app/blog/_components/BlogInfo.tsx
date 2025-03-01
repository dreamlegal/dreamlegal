
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Plus, X, Image, Link as LinkIcon, AlertTriangle } from 'lucide-react';

// const BlogInfo = () => {
//   const router = useRouter();
//   const [blogInfo, setBlogInfo] = useState({
//     title: '',
//     bannerImage: '',
//     refLinks: []
//   });
  
//   const [refLink, setRefLink] = useState({ title: '', url: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [imagePreviewError, setImagePreviewError] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogInfo((prev) => ({ ...prev, [name]: value }));
    
//     // Reset image preview error when changing the URL
//     if (name === 'bannerImage') {
//       setImagePreviewError(false);
//     }
//   };

//   const handleAddRefLink = () => {
//     if (refLink.title && refLink.url) {
//       setBlogInfo((prev) => ({
//         ...prev,
//         refLinks: [...prev.refLinks, refLink]
//       }));
//       setRefLink({ title: '', url: '' });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');
    
//     try {
//       const response = await fetch('/api/blogs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogInfo),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to create blog');
//       }
      
//       const blog = await response.json();
      
//       // Store blog ID in localStorage for navigation between pages
//       localStorage.setItem('currentBlogId', blog.id);
//       router.push('/blog/blog-editor');
//     } catch (err) {
//       setError(err.message || 'An unexpected error occurred');
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRemoveLink = (index) => {
//     setBlogInfo((prev) => ({
//       ...prev,
//       refLinks: prev.refLinks.filter((_, i) => i !== index)
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white pt-16 pb-16">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
//       >
//         <h1 className="text-3xl font-bold mb-2 text-gray-800">Create New Blog</h1>
//         <p className="text-gray-600 mb-8">Start your blog by filling in the basic information</p>
        
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start">
//             <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="font-medium">Error</p>
//               <p>{error}</p>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Title */}
//           <div className="space-y-2">
//             <label className="block text-gray-700 text-lg font-medium">Blog Title</label>
//             <input
//               type="text"
//               name="title"
//               value={blogInfo.title}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//               placeholder="Enter a captivating title..."
//               required
//             />
//           </div>
          
//           {/* Banner Image */}
//           <div className="space-y-2">
//             <label className="block text-gray-700 text-lg font-medium">Banner Image URL</label>
//             <div className="flex">
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Image className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="url"
//                   name="bannerImage"
//                   value={blogInfo.bannerImage}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//             </div>
            
//             {blogInfo.bannerImage && (
//               <div className="mt-4 relative">
//                 <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
//                   <img 
//                     src={blogInfo.bannerImage} 
//                     alt="Banner preview" 
//                     className="w-full h-64 object-cover"
//                     onError={() => setImagePreviewError(true)}
//                   />
//                   {imagePreviewError && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                       <div className="text-center text-gray-500 p-4">
//                         <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
//                         <p>Image cannot be loaded.<br />Please check the URL.</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Reference Links */}
//           <div className="space-y-3">
//             <label className="block text-gray-700 text-lg font-medium">Reference Links</label>
//             <p className="text-sm text-gray-600">Add links to sources, references, or related content</p>
            
//             <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
//               <div className="flex flex-col space-y-3 mb-4">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="text-gray-500">Title</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={refLink.title}
//                     onChange={(e) => setRefLink({...refLink, title: e.target.value})}
//                     className="w-full pl-16 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     placeholder="Resource or Article Title"
//                   />
//                 </div>
                
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <LinkIcon className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="url"
//                     value={refLink.url}
//                     onChange={(e) => setRefLink({...refLink, url: e.target.value})}
//                     className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     placeholder="https://example.com/resource"
//                   />
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={handleAddRefLink}
//                   className="self-start flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!refLink.title || !refLink.url}
//                 >
//                   <Plus className="h-4 w-4" />
//                   <span>Add Reference</span>
//                 </button>
//               </div>
              
//               {blogInfo.refLinks.length > 0 && (
//                 <div className="pt-4 mt-4 border-t border-gray-200">
//                   <h4 className="font-medium text-gray-700 mb-3">Added References:</h4>
//                   <ul className="space-y-2 max-h-56 overflow-y-auto pr-2">
//                     {blogInfo.refLinks.map((link, index) => (
//                       <li key={index} className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-200">
//                         <div className="flex-grow">
//                           <p className="font-medium text-gray-800">{link.title}</p>
//                           <a 
//                             href={link.url} 
//                             target="_blank" 
//                             rel="noopener noreferrer" 
//                             className="text-sm text-blue-600 hover:underline break-all"
//                           >
//                             {link.url}
//                           </a>
//                         </div>
//                         <button 
//                           type="button" 
//                           onClick={() => handleRemoveLink(index)}
//                           className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="pt-4 mt-4 border-t border-gray-200">
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition shadow-md font-medium disabled:opacity-70"
//               disabled={isSubmitting || !blogInfo.title}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   Continue to Blog Editor
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default BlogInfo;

'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, X, Image, Link as LinkIcon, AlertTriangle, Upload } from 'lucide-react';

const BlogInfo = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [blogInfo, setBlogInfo] = useState({
    title: '',
    bannerImage: '',
    refLinks: []
  });
  
  const [refLink, setRefLink] = useState({ title: '', url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogInfo((prev) => ({ ...prev, [name]: value }));
    
    // Reset image preview error when changing the URL
    if (name === 'bannerImage') {
      setImagePreviewError(false);
    }
  };

  const handleAddRefLink = () => {
    if (refLink.title && refLink.url) {
      setBlogInfo((prev) => ({
        ...prev,
        refLinks: [...prev.refLinks, refLink]
      }));
      setRefLink({ title: '', url: '' });
    }
  };

  const handleFileUpload = async (e) => {
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
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/blogs/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      setBlogInfo((prev) => ({ ...prev, bannerImage: data.url }));
      setImagePreviewError(false);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during upload');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogInfo),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      
      const blog = await response.json();
      
      // Store blog ID in localStorage for navigation between pages
      localStorage.setItem('currentBlogId', blog.id);
      router.push('/blog/blog-editor');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveLink = (index) => {
    setBlogInfo((prev) => ({
      ...prev,
      refLinks: prev.refLinks.filter((_, i) => i !== index)
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white pt-16 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Create New Blog</h1>
        <p className="text-gray-600 mb-8">Start your blog by filling in the basic information</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-lg font-medium">Blog Title</label>
            <input
              type="text"
              name="title"
              value={blogInfo.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter a captivating title..."
              required
            />
          </div>
          
          {/* Banner Image Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-lg font-medium">Banner Image</label>
            <div className="space-y-4">
              <div 
                onClick={triggerFileInput}
                className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-gray-50"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                />
                {isUploading ? (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Click to upload banner image</p>
                    <p className="text-gray-500 text-sm">JPG, PNG, GIF or WEBP (max. 5MB)</p>
                  </>
                )}
              </div>
  
              {/* Image preview */}
              {blogInfo.bannerImage && !isUploading && (
                <div className="mt-4 relative">
                  <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img 
                      src={blogInfo.bannerImage} 
                      alt="Banner preview" 
                      className="w-full h-64 object-cover"
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
                    onClick={() => setBlogInfo(prev => ({ ...prev, bannerImage: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-sm"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {/* Optional URL input as fallback */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Or enter an image URL directly:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="bannerImage"
                    value={blogInfo.bannerImage}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Reference Links */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-lg font-medium">Reference Links</label>
            <p className="text-sm text-gray-600">Add links to sources, references, or related content</p>
            
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex flex-col space-y-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">Title</span>
                  </div>
                  <input
                    type="text"
                    value={refLink.title}
                    onChange={(e) => setRefLink({...refLink, title: e.target.value})}
                    className="w-full pl-16 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Resource or Article Title"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={refLink.url}
                    onChange={(e) => setRefLink({...refLink, url: e.target.value})}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="https://example.com/resource"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={handleAddRefLink}
                  className="self-start flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!refLink.title || !refLink.url}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Reference</span>
                </button>
              </div>
              
              {blogInfo.refLinks.length > 0 && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Added References:</h4>
                  <ul className="space-y-2 max-h-56 overflow-y-auto pr-2">
                    {blogInfo.refLinks.map((link, index) => (
                      <li key={index} className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">{link.title}</p>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-blue-600 hover:underline break-all"
                          >
                            {link.url}
                          </a>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveLink(index)}
                          className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition shadow-md font-medium disabled:opacity-70"
              disabled={isSubmitting || !blogInfo.title}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  Continue to Blog Editor
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogInfo;