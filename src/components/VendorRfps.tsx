
"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw,RotateCw, Box, ClipboardCheck, AlertTriangle, Building2, Users, Settings, Clock, Wallet2, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { useAuth } from '@/context/authContext';
// Custom Card Component instead of shadcn
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Custom Select Component
const CustomSelect = ({ options, onChange, className = "", placeholder = "Select" }) => {
  return (
    <div className="relative">
      <select
        onChange={onChange}
        className={`w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

function VendorRfps() {
  
  const { vendorId, userType } = useAuth();
    const userId= vendorId
  const [rfpLeads, setRfpLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const searchParams = useSearchParams();
  const verify = searchParams.get("verified") ? true : false;

  const fetchRfpLeads = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/get-vendor-wise-rfp-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendorId: userId }),
      });

      const data = await response.json();

      if (data.success) {
        setRfpLeads(data.data);
        if (data.data.length > 0) {
          setSelectedLead(data.data[0].id);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch RFP leads:", err);
      setError("Failed to fetch RFP leads");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRfpLeads();
  }, [userId]);

  const handleInputChange = (leadId, field, value) => {
    setResponses((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (leadId, category, subCategory, feature, value) => {
    setResponses((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        features: {
          ...prev[leadId]?.features,
          [category]: {
            ...prev[leadId]?.features?.[category],
            [subCategory]: {
              ...prev[leadId]?.features?.[category]?.[subCategory],
              [feature]: value,
            },
          },
        },
      },
    }));
  };

  const handleSubmit = async (leadId) => {
    const leadResponses = responses[leadId];
    if (!leadResponses) {
      alert("Please provide responses before submitting.");
      return;
    }

    try {
      const { urgencyResponse, budgetResponse, features } = leadResponses;

      const response = await fetch("/api/add-vendor-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          vendorId: userId,
          urgencyResponse,
          budgetResponse,
          features,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Response submitted successfully!");
        setSelectedLead(null);
      } else {
        alert("Failed to submit response: " + data.message);
      }
    } catch (err) {
      console.error("Failed to submit response:", err);
      alert("Error submitting response");
    }
  };

  if (verify) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CustomCard className="max-w-lg w-full p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Verification Required
          </h1>
          <p className="text-gray-600">
            Please complete your profile by clicking on the profile link to access RFP features.
          </p>
        </CustomCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="text-gray-600 font-medium">Loading RFPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CustomCard className="max-w-lg w-full p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error Loading RFPs</h1>
          <p className="text-gray-600">{error}</p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Requests For Proposal
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Review and respond to incoming RFP requests
          </p>
        </div>
        {/* <button
          onClick={fetchRfpLeads}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow"
        >
          <RotateCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button> */}
         <button
            onClick={fetchRfpLeads}
            disabled={loading || refreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
            />
          </button>
      </div>

      {/* Proposals List Card */}
      <CustomCard className="mb-8 shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900">Available Proposals</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {rfpLeads.map((lead, index) => (
              <button
                key={lead.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow ${
                  selectedLead === lead.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-indigo-200 hover:bg-indigo-50"
                }`}
                onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
              >
                Proposal {rfpLeads.length - index}
              </button>
            ))}
          </div>
        </div>
      </CustomCard>

      {/* Selected Proposal Details */}
      {selectedLead && (
        <div className="space-y-6">
          {rfpLeads.map((lead, index) => {
            if (lead.id === selectedLead) {
              return (
                <div key={lead.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Card - Client Requirements */}
                  <CustomCard className="shadow-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <ClipboardCheck className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-lg font-semibold text-gray-900">Client Requirements</h3>
                      </div>

                      {/* Requirements Info */}
                      <div className="space-y-4">
                        {/* Organization Type */}
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                          <Building2 className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Organisation Type</p>
                            <p className="text-sm text-gray-600">{lead.userOrgType}</p>
                          </div>
                        </div>

                        {/* Team Size */}
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                          <Users className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Team Size</p>
                            <p className="text-sm text-gray-600">{lead.userTeamSize}</p>
                          </div>
                        </div>

                        {/* Customization */}
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                          <Settings className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Customisation</p>
                            <p className="text-sm text-gray-600">{lead.customisation}</p>
                          </div>
                        </div>

                        {/* Urgency */}
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                          <Clock className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Urgency</p>
                            <p className="text-sm text-gray-600">{lead.urgency.askedUrgency}</p>
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                          <Wallet2 className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Budget Range</p>
                            <p className="text-sm text-gray-600">
                              {lead.budget.askedMin} - {lead.budget.askedMax} {lead.budget.budgetUnit}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Response Fields */}
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Can you meet the urgency requirement?
                          </label>
                          <CustomSelect
                            options={[
                              { value: "custom", label: "Yes, with custom timeline" },
                              { value: "premium", label: "Yes, with premium service" },
                              { value: "no", label: "No, we need more time" }
                            ]}
                            onChange={(e) => handleInputChange(lead.id, "urgencyResponse", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Can you work within this budget?
                          </label>
                          <CustomSelect
                            options={[
                              { value: "custom", label: "Yes, with custom package" },
                              { value: "premium", label: "Yes, with premium features" },
                              { value: "no", label: "No, budget is too low" }
                            ]}
                            onChange={(e) => handleInputChange(lead.id, "budgetResponse", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CustomCard>

                  {/* Right Card - Feature Requirements */}
                  <CustomCard className="shadow-xl">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Settings className="w-5 h-5 text-indigo-500" />
                          <h3 className="text-lg font-semibold text-gray-900">Feature Requirements</h3>
                        </div>
                      </div>

                      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                        {Object.entries(lead.features).map(([category, subCategories]) => (
                          <div key={category} className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              <ChevronDown className="w-4 h-4" />
                              {category}
                            </h4>
                            
                            {Object.entries(subCategories).map(([subCategory, features]) => (
                              <div key={subCategory} className="ml-6 space-y-3">
                                <h5 className="text-sm font-medium text-gray-700">{subCategory}</h5>
                                <div className="space-y-2">
                                  {Object.entries(features).map(([feature]) => (
                                    <div key={feature} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                      <p className="text-sm text-gray-600">{feature}</p>
                                      <CustomSelect
                                        options={[
                                          { value: "custom", label: "Available (Custom)" },
                                          { value: "premium", label: "Available (Premium)" },
                                          { value: "configurable", label: "Configurable" },
                                          { value: "no", label: "Not Available" }
                                        ]}
                                        onChange={(e) => handleFeatureChange(lead.id, category, subCategory, feature, e.target.value)}
                                        className="w-48"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <button 
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl px-6 py-3 font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 active:scale-[0.98] flex items-center justify-center gap-2"
                          onClick={() => handleSubmit(lead.id)}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Submit Response
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-3">
                          Please review all responses before submitting
                        </p>
                      </div>
                    </div>
                  </CustomCard>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Empty States */}
      {!selectedLead && rfpLeads.length > 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Box className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Proposal</h3>
          <p className="text-gray-500 max-w-md">
            Click on one of the proposals above to view details and provide your response
          </p>
        </div>
      )}

      {rfpLeads.length === 0 && (
        <CustomCard className="shadow-lg">
          <div className="p-12 text-center">
            <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No RFPs Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no RFPs waiting for your response. New requests will appear here when available.
            </p>
          </div>
        </CustomCard>
      )}
    </div>
  );
}

export default VendorRfps;