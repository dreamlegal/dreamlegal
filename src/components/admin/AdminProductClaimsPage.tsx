"use client"
import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import Link from 'next/link';

const AdminProductClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info', 'success', 'error'

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/product-claims');
      const data = await response.json();
      
      if (data.success) {
        setClaims(data.claims);
        if (data.claims.length === 0) {
          showMessage('No product claim requests found', 'info');
        }
      } else {
        showMessage(data.message || 'Failed to load claim requests', 'error');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
      showMessage('An error occurred while loading claim requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleProcessClaim = async (claimId, status) => {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this claim?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/process-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, status })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the processed claim from the list
        setClaims(claims.filter(claim => claim.id !== claimId));
        showMessage(`Claim ${status.toLowerCase()} successfully`, 'success');
      } else {
        showMessage(data.message || `Failed to ${status.toLowerCase()} claim`, 'error');
      }
    } catch (error) {
      console.error('Error processing claim:', error);
      showMessage('An error occurred while processing the claim', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Claim Requests</h1>
          <p className="mt-2 text-gray-600">
            Review and process requests from vendors who want to claim ownership of products
          </p>
        </div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            messageType === 'success' ? 'bg-green-50 text-green-700' :
            messageType === 'error' ? 'bg-red-50 text-red-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            {messageType === 'error' && <FaExclamationCircle className="flex-shrink-0" />}
            {message}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 text-blue-500">
              <TbListDetails className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">No pending claim requests</p>
            <p className="text-gray-600">When vendors request to claim products, they'll appear here.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Requested
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            {claim.product.logoUrl ? (
                              <img 
                                className="h-10 w-10 object-contain rounded-md" 
                                src={claim.product.logoUrl} 
                                alt={claim.product.name} 
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                {claim.product.name.slice(0, 1).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {claim.product.name}
                            </div>
                            <div className="flex gap-2 mt-1">
                              {claim.product.category && claim.product.category.slice(0, 2).map((cat, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{claim.vendor.name || 'Unnamed Vendor'}</div>
                        <div className="text-sm text-gray-500">{claim.vendor.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(claim.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link 
                            href={`/product/${claim.product.slug}`} 
                            target="_blank"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View Product
                          </Link>
                          <button
                            onClick={() => handleProcessClaim(claim.id, 'ACCEPTED')}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700"
                          >
                            <FaCheck className="mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleProcessClaim(claim.id, 'REJECTED')}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700"
                          >
                            <FaTimes className="mr-1" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={fetchClaims}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Refresh List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductClaimsPage;