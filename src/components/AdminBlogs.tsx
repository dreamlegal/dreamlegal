

'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ChevronRight, Clock, Plus, Search } from 'lucide-react';
import BlogCard from '../app/blog/_components/BlogCard';

// export default function BlogsListPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all'); // 'all', 'published', 'draft'

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const response = await fetch('/api/blogs');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch blogs');
//         }
        
//         const data = await response.json();
//         setBlogs(data);
//       } catch (err) {
//         setError(err.message || 'An unexpected error occurred');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchBlogs();
//   }, []);
  
//   // Filter blogs based on search term and filter
//   const filteredBlogs = blogs.filter(blog => {
//     const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = 
//       filter === 'all' ? true :
//       filter === 'published' ? blog.published :
//       filter === 'draft' ? !blog.published : true;
    
//     return matchesSearch && matchesFilter;
//   });
  
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 mt-20">
//         <div className="flex flex-col items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-blue-600 font-medium">Loading your blogs...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 mt-20">
//         <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 shadow-sm">
//           <h3 className="text-lg font-semibold mb-2">Error Loading Blogs</h3>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
//       <div className="max-w-7xl mx-auto p-6 pt-24">
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-12"
//         >
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Blog Articles</h1>
//               <p className="text-gray-600">Write, manage, and publish your blog content</p>
//             </div>
//             <Link 
//               href="/blog/new-blog" 
//               className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <Plus size={18} />
//               <span>Create New Blog</span>
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </Link>
//           </div>
//         </motion.div>
        
//         {/* Search and Filter Controls */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search blogs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               />
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-4 py-3 rounded-xl font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilter('published')}
//                 className={`px-4 py-3 rounded-xl font-medium ${filter === 'published' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
//               >
//                 Published
//               </button>
//               <button
//                 onClick={() => setFilter('draft')}
//                 className={`px-4 py-3 rounded-xl font-medium ${filter === 'draft' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
//               >
//                 Drafts
//               </button>
//             </div>
//           </div>
//         </motion.div>
        
//         {/* Blog Cards */}
//         {filteredBlogs.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100"
//           >
//             {searchTerm || filter !== 'all' ? (
//               <>
//                 <div className="mb-4 text-gray-400">
//                   <Search size={48} className="mx-auto" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching blogs found</h3>
//                 <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
//                 <button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setFilter('all');
//                   }}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="mb-4 text-blue-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Blogging Journey</h3>
//                 <p className="text-gray-600 max-w-lg mx-auto mb-8">
//                   Share your expertise, insights, and stories with the world through your first blog post.
//                 </p>
//                 <Link 
//                   href="/blog/new-blog" 
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   <span>Create Your First Blog</span>
//                   <ChevronRight size={16} />
//                 </Link>
//               </>
//             )}
//           </motion.div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredBlogs.map((blog, index) => (
//               <motion.div
//                 key={blog.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
//               >
//                 <BlogCard blog={blog} />
//               </motion.div>
//             ))}
//           </div>
//         )}
        
//         {/* Footer / Stats */}
//         {blogs.length > 0 && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-12 pt-6 border-t border-gray-200 text-gray-500 flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center"
//           >
//             <div className="flex items-center gap-2">
//               <Clock size={16} />
//               <span>Last updated: {new Date(Math.max(...blogs.map(b => new Date(b.updatedAt || b.createdAt)))).toLocaleDateString()}</span>
//             </div>
//             <div className="flex gap-8">
//               <div className="text-center">
//                 <span className="block text-2xl font-bold text-gray-700">{blogs.length}</span>
//                 <span className="text-sm">Total Blogs</span>
//               </div>
//               <div className="text-center">
//                 <span className="block text-2xl font-bold text-blue-600">{blogs.filter(b => b.published).length}</span>
//                 <span className="text-sm">Published</span>
//               </div>
//               <div className="text-center">
//                 <span className="block text-2xl font-bold text-yellow-500">{blogs.filter(b => !b.published).length}</span>
//                 <span className="text-sm">Drafts</span>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
// 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Plus, Search } from 'lucide-react';
// import BlogCard from './_components/BlogCard'; // Adjust path as needed
// 
export default function BlogsListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'draft'

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogs();
  }, []);
  
  // Filter blogs based on search term and filter
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'published' ? blog.published :
      filter === 'draft' ? !blog.published : true;
    
    return matchesSearch && matchesFilter;
  });
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-blue-600 font-medium">Loading your blogs...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Error Loading Blogs</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Blog Articles</h1>
              <p className="text-gray-600">Write, manage, and publish your blog content</p>
            </div>
            <Link 
              href="/blog/new-blog" 
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Plus size={18} />
              <span>Create New Blog</span>
            </Link>
          </div>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-3 rounded-xl font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-3 rounded-xl font-medium ${filter === 'published' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
              >
                Published
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-3 rounded-xl font-medium ${filter === 'draft' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'} border border-gray-200 transition-all`}
              >
                Drafts
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Blog Cards */}
        {filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100"
          >
            {searchTerm || filter !== 'all' ? (
              <>
                <div className="mb-4 text-gray-400">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching blogs found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Blogging Journey</h3>
                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                  Share your expertise, insights, and stories with the world through your first blog post.
                </p>
                <Link 
                  href="/blog/new-blog" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <span>Create Your First Blog</span>
                  <ChevronRight size={16} />
                </Link>
              </>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <BlogCard 
                  blog={blog} 
                  allBlogs={blogs}
                  setBlogs={setBlogs}
                />
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Footer / Stats */}
        {blogs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-6 border-t border-gray-200 text-gray-500 flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Last updated: {new Date(Math.max(...blogs.map(b => new Date(b.updatedAt || b.createdAt)))).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-700">{blogs.length}</span>
                <span className="text-sm">Total Blogs</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-blue-600">{blogs.filter(b => b.published).length}</span>
                <span className="text-sm">Published</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-yellow-500">{blogs.filter(b => !b.published).length}</span>
                <span className="text-sm">Drafts</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}