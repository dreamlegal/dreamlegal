// 'use client';

// import { ChevronLeft, ChevronRight } from 'lucide-react';

// // Arrow Pagination (for most sections)
// export function ArrowPagination({ 
//   currentPage, 
//   totalPages, 
//   onPageChange 
// }: { 
//   currentPage: number; 
//   totalPages: number; 
//   onPageChange: (page: number) => void;
// }) {
//   if (totalPages <= 1) return null;
  
//   return (
//     <div className="flex items-center justify-center gap-2 mt-8">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         aria-label="Previous page"
//       >
//         <ChevronLeft size={20} />
//       </button>
      
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         aria-label="Next page"
//       >
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// }

// // Number Pagination (for latest section)
// export function NumberPagination({ 
//   currentPage, 
//   totalPages, 
//   onPageChange 
// }: { 
//   currentPage: number; 
//   totalPages: number; 
//   onPageChange: (page: number) => void;
// }) {
//   if (totalPages <= 1) return null;
  
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const showPages = 5; // Number of page buttons to show
    
//     if (totalPages <= showPages + 2) {
//       // Show all pages if total is small
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);
      
//       if (currentPage > 3) {
//         pages.push('...');
//       }
      
//       // Show pages around current page
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
      
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
      
//       if (currentPage < totalPages - 2) {
//         pages.push('...');
//       }
      
//       // Always show last page
//       pages.push(totalPages);
//     }
    
//     return pages;
//   };
  
//   const pages = getPageNumbers();
  
//   return (
//     <div className="flex items-center justify-center gap-2 mt-8">
//       {/* Previous Button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         aria-label="Previous page"
//       >
//         <ChevronLeft size={20} />
//       </button>
      
//       {/* Page Numbers */}
//       {pages.map((page, index) => {
//         if (page === '...') {
//           return (
//             <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
//               ...
//             </span>
//           );
//         }
        
//         const pageNum = page as number;
//         const isActive = pageNum === currentPage;
        
//         return (
//           <button
//             key={pageNum}
//             onClick={() => onPageChange(pageNum)}
//             className={`min-w-[40px] px-3 py-2 border rounded transition-colors ${
//               isActive
//                 ? 'bg-blue-600 text-white border-blue-600'
//                 : 'border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             {pageNum}
//           </button>
//         );
//       })}
      
//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         aria-label="Next page"
//       >
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// }
// PaginationComponents.tsx - Update NumberPagination

export function NumberPagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pages = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center gap-1">
      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#334155]">...</span>;
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[40px] px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#7cc6ee] text-white'
                : 'bg-white text-[#2d2d2d] hover:bg-[#f5f7fa] border border-[#f5f7fa]'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="ml-2 px-3 py-2 bg-white text-[#2d2d2d] hover:bg-[#f5f7fa] border border-[#f5f7fa] text-sm"
        >
          →
        </button>
      )}
    </div>
  );
}