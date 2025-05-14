'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiClipboard, FiMail } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { useAdmin } from './AdminContext';
import Link from 'next/link';

const DashboardStats = () => {
  const { adminData, hasPermission } = useAdmin();
  const [stats, setStats] = useState({
    products: 0,
    vendors: 0,
    claims: 0,
    leads: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/adminn/dashboard/stats');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="border-b pb-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">Total Products</h2>
              <div className="text-3xl font-semibold text-gray-900">{stats.products}</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <FiPackage className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">Active Vendors</h2>
              <div className="text-3xl font-semibold text-gray-900">{stats.vendors}</div>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <FiUsers className="text-xl text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">Pending Claims</h2>
              <div className="text-3xl font-semibold text-gray-900">{stats.claims}</div>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg">
              <FiClipboard className="text-xl text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-gray-500 text-sm font-medium uppercase mb-2">New Leads</h2>
              <div className="text-3xl font-semibold text-gray-900">{stats.leads}</div>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <FiMail className="text-xl text-red-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="border-b pb-3">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      <BsClockHistory className="text-gray-400" />
                    </div>
                    <div>
                      <Link href={activity.link} className="text-sm text-gray-600 hover:text-blue-600">
                        <span>{activity.action}</span> <span className="font-medium">{activity.subject}</span>
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(activity.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity found.</p>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {hasPermission('AdminProductCreation') && (
              <Link href="/admin/products/new" className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium flex items-center justify-center">
                <FiPackage className="mr-2" />
                Add New Product
              </Link>
            )}
            
            {hasPermission('adminblog') && (
              <Link href="/admin/blog" className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-sm font-medium flex items-center justify-center">
                <BsClockHistory className="mr-2" />
                Create Blog Post
              </Link>
            )}
            
            {hasPermission('AdminProductClaimsPage') && (
              <Link href="/admin/products/claims" className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-3 rounded-lg text-sm font-medium flex items-center justify-center">
                <FiClipboard className="mr-2" />
                Review Claims
              </Link>
            )}
            
            {hasPermission('sendNotification') && (
              <Link href="/admin/notifications" className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium flex items-center justify-center">
                <FiMail className="mr-2" />
                Send Notification
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;