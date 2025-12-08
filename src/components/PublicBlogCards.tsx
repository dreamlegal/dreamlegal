// 'use client';

// import Link from 'next/link';
// import { Calendar, Clock, Eye } from 'lucide-react';

// // Format date helper
// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Large Hero Card (for featured section)
// export function HeroBlogCard({ blog, size = 'large' }: { blog: any; size?: 'large' | 'small' }) {
//   const isLarge = size === 'large';
  
//   return (
//     <Link
//       href={`/blog/${blog.slug}`}
//       className="group block relative overflow-hidden rounded-xl"
//     >
//       {/* Image */}
//       <div className={`relative ${isLarge ? 'h-[400px]' : 'h-[250px]'} overflow-hidden`}>
//         {blog.bannerImage ? (
//           <img
//             src={blog.bannerImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
//         {/* Content Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           {/* Category Badge */}
//           {blog.currentTag && (
//             <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded mb-3 uppercase tracking-wide">
//               {blog.currentTag}
//             </span>
//           )}
          
//           {/* Title */}
//           <h2 className={`font-bold mb-2 group-hover:text-blue-300 transition-colors ${isLarge ? 'text-3xl' : 'text-xl'}`}>
//             {blog.title}
//           </h2>
          
//           {/* Meta */}
//           <div className="flex items-center gap-4 text-sm text-gray-300">
//             <span className="flex items-center gap-1">
//               <Calendar size={14} />
//               {formatDate(blog.publishedAt || blog.createdAt)}
//             </span>
//             <span className="flex items-center gap-1">
//               <Eye size={14} />
//               {blog.views || 0} views
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Regular Blog Card (for main sections)
// export function BlogCard({ blog }: { blog: any }) {
//   return (
//     <Link
//       href={`/blog/${blog.slug}`}
//       className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//     >
//       {/* Image */}
//       <div className="relative h-48 overflow-hidden">
//         {blog.bannerImage ? (
//           <img
//             src={blog.bannerImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
//         )}
        
//         {/* Category Badge */}
//         {blog.currentTag && (
//           <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//       </div>
      
//       {/* Content */}
//       <div className="p-5">
//         <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {blog.title}
//         </h3>
        
//         {/* Excerpt */}
//         {blog.excerpt && (
//           <p className="text-sm text-gray-600 mb-3 line-clamp-3">
//             {blog.excerpt}
//           </p>
//         )}
        
//         {/* Meta */}
//         <div className="flex items-center gap-3 text-xs text-gray-500">
//           <span className="flex items-center gap-1">
//             <Calendar size={12} />
//             {formatDate(blog.publishedAt || blog.createdAt)}
//           </span>
//           {blog.authorName && (
//             <span>By {blog.authorName}</span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Mini Sidebar Card
// export function MiniCard({ blog }: { blog: any }) {
//   return (
//     <Link
//       href={`/blog/${blog.slug}`}
//       className="group flex gap-4 pb-4 mb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-2 rounded transition-colors"
//     >
//       {/* Thumbnail */}
//       <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
//         {blog.bannerImage ? (
//           <img
//             src={blog.bannerImage}
//             alt={blog.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
//         )}
//       </div>
      
//       {/* Content */}
//       <div className="flex-1 min-w-0">
//         {blog.currentTag && (
//           <span className="inline-block text-xs font-semibold text-blue-600 mb-1 uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//         <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
//           {blog.title}
//         </h4>
//         <div className="flex items-center gap-1 text-xs text-gray-500">
//           <Clock size={10} />
//           <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Large Sidebar Card
// export function LargeSidebarCard({ blog }: { blog: any }) {
//   return (
//     <Link
//       href={`/blog/${blog.slug}`}
//       className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//     >
//       {/* Image */}
//       <div className="relative h-64 overflow-hidden">
//         {blog.bannerImage ? (
//           <img
//             src={blog.bannerImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
//         )}
        
//         {/* Category Badge */}
//         {blog.currentTag && (
//           <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded uppercase">
//             {blog.currentTag}
//           </span>
//         )}
//       </div>
      
//       {/* Content */}
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {blog.title}
//         </h3>
        
//         {/* Excerpt */}
// {blog.content && (
//   <p className="text-sm text-gray-600 mb-3 line-clamp-3">
//     {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
//   </p>
// )}
        
//         <div className="flex items-center gap-3 text-xs text-gray-500">
//           <span className="flex items-center gap-1">
//             <Calendar size={12} />
//             {formatDate(blog.publishedAt || blog.createdAt)}
//           </span>
//           {/* <span className="flex items-center gap-1">
//             <Eye size={12} />
//             {blog.views || 0} views */}
//           {/* </span> */}
//         </div>
//       </div>
//     </Link>
//   );
// }
'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export function HeroBlogCard({ blog, size = 'large' }: { blog: any; size?: 'large' | 'small' }) {
  const isLarge = size === 'large';
  
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block relative overflow-hidden rounded-xl"
    >
      <div className={`relative ${isLarge ? 'h-[400px]' : 'h-[250px]'} overflow-hidden`}>
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {blog.currentTag && (
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded mb-3 uppercase tracking-wide">
              {blog.currentTag}
            </span>
          )}
          
          <h2 className={`font-bold mb-2 group-hover:text-blue-300 transition-colors ${isLarge ? 'text-3xl' : 'text-xl'}`}>
            {blog.title}
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(blog.publishedAt || blog.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        )}
        
        {blog.currentTag && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded uppercase">
            {blog.currentTag}
          </span>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        
        {blog.content && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function MiniCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex gap-4 pb-4 mb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-2 rounded transition-colors"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        {blog.currentTag && (
          <span className="inline-block text-xs font-semibold text-blue-600 mb-1 uppercase">
            {blog.currentTag}
          </span>
        )}
        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
          {blog.title}
        </h4>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={10} />
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function LargeSidebarCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        )}
        
        {blog.currentTag && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded uppercase">
            {blog.currentTag}
          </span>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        
        {blog.content && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}