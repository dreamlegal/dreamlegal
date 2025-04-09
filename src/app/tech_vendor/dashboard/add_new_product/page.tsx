
// "use client";
// import React from 'react'
// import ProductForm from '@/components/ProductForm'
// import { useAuth } from '@/context/authContext';

// const Page = () => {
//   const { isLoading } = useAuth();
  
//   if (isLoading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }
  
//   return (
//     <ProductForm editing={false}/>
//   )
// }

// export default Page
"use client";
import React, { useState } from 'react';
import ProductForm from '@/components/ProductForm';
import { useAuth } from '@/context/authContext';
import { ProductInfo } from '@/store/useStore';
import { useRouter } from "next/navigation";
import { RefreshCw } from 'lucide-react';
import Alert from '@/components/Alert';

const Page = () => {
  const { isLoading: authLoading } = useAuth();
  const router = useRouter();
  const reset = ProductInfo((state) => state.reset);
  
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [formKey, setFormKey] = useState(0); // For forcing re-render
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleRefresh = () => {
    setIsResetting(true);
    
    // Reset the store
    reset();
    
    // Force router refresh
    router.refresh();
    
    // Force complete re-render of form
    setFormKey(prev => prev + 1);
    
    // Show success indicator
    showAlert("Form has been reset successfully!", "success");
    
    // Finish loading
    setIsResetting(false);
  };
  
  // Show loading during auth check
  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <>
      {/* Alert Component */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          
          <button 
            onClick={handleRefresh}
            disabled={isResetting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg 
                     border border-indigo-100 hover:bg-indigo-100 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Resetting...' : 'Reset Form'}
          </button>
        </div>
        
        {/* Use key prop to force complete re-render when reset */}
        <ProductForm key={formKey} editing={false} />
      </div>
    </>
  );
};

export default Page;