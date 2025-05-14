'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create admin context
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is authenticated
  const checkAdminAuth = async () => {
    try {
      const response = await fetch('/api/adminn/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.success && data.admin) {
        setAdminData(data.admin);
      } else {
        setAdminData(null);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setAdminData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // On client side, check for admin auth from localStorage first for faster rendering
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdminData(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Error parsing stored admin data:', error);
      }
    }
    
    // Then verify with the server
    checkAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (credentials) => {
    try {
      const response = await fetch('/api/adminn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success && data.admin) {
        // Store admin data in local storage for faster access
        localStorage.setItem('admin', JSON.stringify(data.admin));
        setAdminData(data.admin);
        return { success: true };
      }
      
      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Admin logout function
  const adminLogout = async () => {
    try {
      await fetch('/api/adminn/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear localStorage
      localStorage.removeItem('admin');
      setAdminData(null);
      
      // Redirect to login
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  };

  // Check if admin has permission to access a component
  const hasPermission = (componentName) => {
    if (!adminData) return false;
    if (adminData.role === 'super_admin') return true;
    return adminData.permissions?.components?.[componentName] === true;
  };

  // Check if admin has access to a tab
  const hasTabAccess = (tabName) => {
    if (!adminData) return false;
    if (adminData.role === 'super_admin') return true;
    return adminData.permissions?.tabs?.[tabName] === true;
  };

  // Context value
  const value = {
    adminData,
    isLoading,
    isAdmin: !!adminData,
    hasPermission,
    hasTabAccess,
    adminLogin,
    adminLogout,
    checkAdminAuth
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook to use admin context
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}