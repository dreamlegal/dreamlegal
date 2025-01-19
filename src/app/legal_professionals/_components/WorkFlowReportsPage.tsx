import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw } from 'lucide-react';
// import WorkflowCards from './WorkflowCards';
import WorkflowCards from './WorkflowCards';


const WorkFlowReportsPage = ({ userId }) => {
  const [workflowData, setWorkflowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchWorkflowData = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get-workFlowResponse-by-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const result = await response.json();
      
      if (result.success) {
        setWorkflowData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch workflow data');
      }
    } catch (err) {
      console.error('Failed to fetch workflow data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && userId) {
      fetchWorkflowData();
    }
  }, [userId, mounted]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchWorkflowData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-indigo-50/20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Workflows</h1>
              <p className="text-sm text-gray-600">
                Manage and track your workflow responses
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-200 rounded-xl"></div>
                    <div className="h-24 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <FileText className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-500 mb-6">
              {error}
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl
                       shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300
                       transition-all duration-300 hover:from-violet-600 hover:to-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : workflowData.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Workflows Available
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't created any workflows yet
            </p>
          </div>
        ) : (
          // Success State - Render WorkflowCards
          <WorkflowCards data={workflowData} />
        )}
      </div>
    </div>
  );
};

export default WorkFlowReportsPage;