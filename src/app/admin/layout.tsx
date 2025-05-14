
// 'use client';

// import { AdminProvider } from './_components/AdminContext';
// import AdminSidebar from './_components/AdminSidebar';
// import { usePathname } from 'next/navigation';

// export default function AdminLayout({ children }) {
//   const pathname = usePathname();
  
//   // Always wrap in AdminProvider, but conditionally render the sidebar
//   return (
//     <AdminProvider>
//       {pathname === '/admin/login' ? (
//         // For login page, just render the children without layout
//         children
//       ) : (
//         // For all other admin pages, render with full layout
//         <div className="flex h-screen bg-gray-100">
//           {/* Sidebar */}
//           <div className="w-64 flex-shrink-0 bg-gray-900">
//             <AdminSidebar />
//           </div>
          
//           {/* Main content */}
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <header className="bg-white shadow-sm z-10">
//               <div className="px-6 py-4">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1)}
//                 </h2>
//               </div>
//             </header>
            
//             <main className="flex-1 overflow-y-auto bg-gray-50">
//               {children}
//             </main>
//           </div>
//         </div>
//       )}
//     </AdminProvider>
//   );
// }
'use client';

import { AdminProvider } from './_components/AdminContext';
import AdminSidebar from './_components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Always wrap in AdminProvider, but conditionally render the sidebar
  return (
    <AdminProvider>
      {pathname === '/admin/login' ? (
        // For login page, just render the children without layout
        children
      ) : (
        // For all other admin pages, render with full layout
        <div className="flex h-screen bg-[#f5f7fa]">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 shadow-lg relative z-10">
            <AdminSidebar />
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm">
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-[#1e2556]">
                  {pathname === '/admin' 
                    ? 'Dashboard' 
                    : pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1)}
                </h2>
                <p className="text-sm text-[#334155]">
                  {pathname === '/admin' 
                    ? 'Welcome to your admin console' 
                    : `Manage your ${pathname.split('/').pop() || 'content'}`}
                </p>
              </div>
            </header>
            
            <main className="flex-1 overflow-y-auto bg-[#f5f7fa] p-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}
    </AdminProvider>
  );
}