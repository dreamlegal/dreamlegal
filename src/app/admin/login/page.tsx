// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAdmin } from '../_components/AdminContext';
// import { AdminProvider } from '../_components/AdminContext';
// export default function AdminLoginPage() {
//   const router = useRouter();
//   const { adminLogin, isAdmin } = useAdmin();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Check if already logged in
//   useEffect(() => {
//     if (isAdmin) {
//       router.push('/admin');
//     }
//   }, [isAdmin, router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const result = await adminLogin(formData);

//       if (result.success) {
//         router.push('/admin');
//       } else {
//         setError(result.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminProvider>
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
          
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
          
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
//                 loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Log In'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </AdminProvider>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '../_components/AdminContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAdmin, isLoading } = useAdmin();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Direct API call as requested
      const response = await fetch('/api/adminn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success && data.admin) {
        // Store admin data in local storage for faster access
        localStorage.setItem('admin', JSON.stringify(data.admin));
        
        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If still checking authentication status, show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#1e2556]">Admin Login</h1>
            <p className="text-[#334155] mt-2">Access your admin dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-[#2d2d2d] text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm appearance-none border border-gray-200 rounded w-full py-3 px-4 text-[#2d2d2d] leading-tight focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-[#2d2d2d] text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm appearance-none border border-gray-200 rounded w-full py-3 px-4 text-[#2d2d2d] leading-tight focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-[#1e2556] hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e2556] transition duration-150 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-[#7cc6ee] hover:text-[#1e2556] transition duration-150"
              >
                Return to homepage
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Dashboard Preview */}
      <div className="hidden md:flex md:w-1/2 bg-[#f5f7fa] p-8 items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#1e2556] mb-6">Admin Dashboard</h2>
          
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-[#f5f7fa] rounded-lg">
              <div className="mr-4 bg-[#1e2556] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e2556]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e2556]">Manage Legal Cases</h3>
                <p className="text-[#334155] text-sm">Access case files and client information</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-[#f5f7fa] rounded-lg">
              <div className="mr-4 bg-[#1e2556] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e2556]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e2556]">Client Management</h3>
                <p className="text-[#334155] text-sm">View and manage client relationships</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-[#f5f7fa] rounded-lg">
              <div className="mr-4 bg-[#1e2556] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e2556]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e2556]">Analytics Dashboard</h3>
                <p className="text-[#334155] text-sm">Track case progress and performance</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-[#f5f7fa] rounded-lg">
              <div className="mr-4 bg-[#1e2556] bg-opacity-10 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1e2556]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e2556]">Document Library</h3>
                <p className="text-[#334155] text-sm">Manage legal documents and templates</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#334155]">
            <p>This admin portal is for authorized DreamLegal personnel only.</p>
            <p>If you're a client, please use the regular login.</p>
          </div>
        </div>
      </div>
    </div>
  );
}