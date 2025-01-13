
"use client";
import React, { useEffect, useState } from "react";

import { RefreshCw, ClipboardList } from "lucide-react";
import LeadCard from "./LeadCard"; // Make sure LeadCard can handle all fields like bookingTime
const VendorLeads = ({ userId }: { userId: string }) => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);



  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/vendor-specific-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendorId: userId }),
      });

      const data = await response.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLeads();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLeads();
  };

 

  return (
    <div className="min-h-screen p-6 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Leads
              </h1>
            </div>
            <p className="text-gray-600">
              {leads.length} active leads available
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <ClipboardList className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Leads Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              When you receive new leads, they'll appear here. Check back soon!
            </p>
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default VendorLeads;