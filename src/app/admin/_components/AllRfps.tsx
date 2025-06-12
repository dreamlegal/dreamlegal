"use client"

import React, { useEffect, useState } from "react";
import { 
  RefreshCw, Box, AlertTriangle, Building2, Users, Clock, Wallet2, 
  ChevronDown, ChevronUp, FileText, BarChart, ListFilter, CheckSquare, 
  User, Calendar, DollarSign, MessageSquare, Eye, TrendingUp, Award,
  CheckCircle2, XCircle, AlertCircle, Target, Layers
} from "lucide-react";

// Utility function to safely render text values
const safeRenderText = (value, fallback = "N/A") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'boolean') return value.toString();
  if (typeof value === 'object') {
    if (value.value) return safeRenderText(value.value, fallback);
    if (value.text) return safeRenderText(value.text, fallback);
    if (value.responses) return safeRenderText(value.responses, fallback);
    if (value.label) return safeRenderText(value.label, fallback);
    return fallback;
  }
  return fallback;
};

// Format date utility
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Custom Card Component
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// Custom Select Component
const CustomSelect = ({ options, value, onChange, className = "", placeholder = "Select" }) => {
  return (
    <div className="relative">
      <select
        value={value || ""}
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

// Section Component with Collapsible functionality
const Section = ({ title, icon, children, defaultOpen = false, badge = null }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = icon;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-medium text-gray-900">{title}</h3>
          {badge && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? 
          <ChevronUp className="w-5 h-5 text-gray-500" /> : 
          <ChevronDown className="w-5 h-5 text-gray-500" />
        }
      </div>
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status, count = null }) => {
  const variants = {
    new: "bg-green-100 text-green-800 border-green-200",
    responded: "bg-blue-100 text-blue-800 border-blue-200",
    inProgress: "bg-yellow-100 text-yellow-800 border-yellow-200",
    closed: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const labels = {
    new: "New",
    responded: "Responded",
    inProgress: "In Progress", 
    closed: "Closed",
  };

  return (
    <span 
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[status] || variants.new} flex items-center gap-1`}
    >
      {labels[status] || "New"}
      {count !== null && <span className="ml-1">({count})</span>}
    </span>
  );
};

// Vendor Response Card
const VendorResponseCard = ({ response, fieldType = "general" }) => {
  const getResponseIcon = () => {
    if (fieldType === 'urgency' || fieldType === 'budget') {
      return response.meetable ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      );
    }
    
    if (fieldType === 'feature' || fieldType === 'lifecycle') {
      return response.available ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      );
    }
    
    return <MessageSquare className="w-4 h-4 text-blue-500" />;
  };

  const getResponseDetails = () => {
    if (fieldType === 'budget') {
      return (
        <div className="space-y-1">
          <p className="text-sm text-gray-800">
            <span className="font-medium">Meetable:</span> {response.meetable ? 'Yes' : 'No'}
          </p>
          {response.quotedAmount && (
            <p className="text-sm text-gray-800">
              <span className="font-medium">Quoted Amount:</span> ${response.quotedAmount}
            </p>
          )}
          {response.pricingDetails && (
            <p className="text-sm text-gray-600">{response.pricingDetails}</p>
          )}
        </div>
      );
    }
    
    if (fieldType === 'urgency') {
      return (
        <div className="space-y-1">
          <p className="text-sm text-gray-800">
            <span className="font-medium">Can Meet Timeline:</span> {response.meetable ? 'Yes' : 'No'}
          </p>
          {response.proposedTimeline && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Proposed Timeline:</span> {response.proposedTimeline}
            </p>
          )}
        </div>
      );
    }
    
    if (fieldType === 'feature' || fieldType === 'lifecycle') {
      return (
        <div className="space-y-1">
          <p className="text-sm text-gray-800">
            <span className="font-medium">Available:</span> {response.available ? 'Yes' : 'No'}
          </p>
          {response.details && (
            <p className="text-sm text-gray-600">{response.details}</p>
          )}
        </div>
      );
    }
    
    return (
      <p className="text-sm text-gray-600">{response.response || response.details || 'No details provided'}</p>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getResponseIcon()}
          <span className="text-xs font-medium text-gray-500">Vendor ID: {response.vendorId}</span>
        </div>
        <span className="text-xs text-gray-400">{formatDate(response.timestamp)}</span>
      </div>
      {getResponseDetails()}
    </div>
  );
};

// Field with Responses Component
const FieldWithResponses = ({ label, clientValue, responses = [], fieldType = "general" }) => {
  const hasResponses = responses && responses.length > 0;
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        {hasResponses && (
          <StatusBadge status="responded" count={responses.length} />
        )}
      </div>
      
      {/* Client Requirement */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-800">Client Requirement</span>
        </div>
        <p className="text-sm text-gray-700">{safeRenderText(clientValue, "Not specified")}</p>
      </div>
      
      {/* Vendor Responses */}
      {hasResponses && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-800">Vendor Responses ({responses.length})</span>
          </div>
          {responses.map((response, index) => (
            <VendorResponseCard 
              key={index} 
              response={response} 
              fieldType={fieldType}
            />
          ))}
        </div>
      )}
      
      {!hasResponses && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">No vendor responses yet</span>
          </div>
        </div>
      )}
    </div>
  );
};

function RfpMarketplacePage() {
  const [rfps, setRfps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orgTypeFilter, setOrgTypeFilter] = useState("");
  
  // Get all categories and org types from RFPs for the filters
  const allCategories = [...new Set(rfps.map(rfp => rfp.selectedCategory).filter(Boolean))];
  const allOrgTypes = [...new Set(rfps.map(rfp => {
    const orgType = rfp.userOrgType?.value || rfp.userOrgType;
    return typeof orgType === 'string' ? orgType : null;
  }).filter(Boolean))];
  
  // Filter RFPs by category and org type
  const filteredRfps = rfps.filter(rfp => {
    const matchesCategory = !categoryFilter || rfp.selectedCategory === categoryFilter;
    const orgType = rfp.userOrgType?.value || rfp.userOrgType;
    const orgTypeString = typeof orgType === 'string' ? orgType : '';
    const matchesOrgType = !orgTypeFilter || orgTypeString === orgTypeFilter;
    return matchesCategory && matchesOrgType;
  });

  // Count total responses for an RFP
  const countTotalResponses = (rfp) => {
    let total = 0;
    
    // Count responses in basic fields
    ['userOrgType', 'userTeamSize', 'keyProblems', 'keyGoals', 'customisation', 'urgency', 'budget'].forEach(field => {
      if (rfp[field]?.responses) {
        total += rfp[field].responses.length;
      }
    });
    
    // Count responses in processLifecycle
    if (rfp.processLifecycle) {
      Object.values(rfp.processLifecycle).forEach(stage => {
        if (stage.responses) {
          total += stage.responses.length;
        }
      });
    }
    
    // Count responses in features
    if (rfp.features) {
      Object.values(rfp.features).forEach(category => {
        Object.values(category).forEach(functionality => {
          Object.values(functionality).forEach(feature => {
            if (feature.responses) {
              total += feature.responses.length;
            }
          });
        });
      });
    }
    
    return total;
  };

  // Fetch all RFPs 
  const fetchAllRfps = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/get-all-rfps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (data.success) {
        setRfps(data.data);
        if (data.data.length > 0 && !selectedRfp) {
          setSelectedRfp(data.data[0].id);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch RFPs:", err);
      setError("Failed to fetch RFPs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllRfps();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="text-gray-600 font-medium">Loading RFP Marketplace...</p>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] bg-clip-text text-transparent">
            RFP Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Monitor client requests and vendor responses
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <div className="relative min-w-[180px]">
              <CustomSelect
                options={allCategories.map(category => ({ value: category, label: category }))}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                placeholder="Filter by category"
                className="bg-white shadow-sm"
              />
            </div>
            <div className="relative min-w-[180px]">
              <CustomSelect
                options={allOrgTypes.map(type => ({ value: type, label: type }))}
                value={orgTypeFilter}
                onChange={(e) => setOrgTypeFilter(e.target.value)}
                placeholder="Filter by org type"
                className="bg-white shadow-sm"
              />
            </div>
            {(categoryFilter || orgTypeFilter) && (
              <button
                onClick={() => {
                  setCategoryFilter("");
                  setOrgTypeFilter("");
                }}
                className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                title="Clear filters"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={fetchAllRfps}
            disabled={loading || refreshing}
            className="p-2 text-gray-600 hover:text-[#1e2556] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh RFPs"
          >
            <RefreshCw 
              className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFPs List */}
        <div className="lg:col-span-1">
          <CustomCard className="shadow-lg h-full">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ListFilter className="w-5 h-5 text-[#1e2556]" />
                  <h2 className="text-lg font-semibold text-gray-900">All RFPs</h2>
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {filteredRfps.length} of {rfps.length}
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredRfps.length === 0 ? (
                <div className="p-6 text-center">
                  <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs Found</h3>
                  <p className="text-gray-500 text-sm">
                    {categoryFilter || orgTypeFilter
                      ? "No RFPs match your current filters"
                      : "There are currently no RFPs available"}
                  </p>
                </div>
              ) : (
                filteredRfps.map((rfp, index) => {
                  const responseCount = countTotalResponses(rfp);
                  return (
                    <div 
                      key={rfp.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedRfp === rfp.id ? 'bg-[#f5f7fa] border-l-4 border-[#1e2556]' : ''
                      }`}
                      onClick={() => setSelectedRfp(rfp.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          RFP #{filteredRfps.length - index}
                        </h3>
                        <div className="flex gap-2">
                          <StatusBadge status={responseCount > 0 ? "responded" : "new"} />
                          {responseCount > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              {responseCount} responses
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-2">
                        {rfp.selectedCategory}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Building2 className="w-3 h-3 mr-1" />
                          {safeRenderText(rfp.userOrgType?.value || rfp.userOrgType, "Unknown")}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {safeRenderText(rfp.userTeamSize?.value || rfp.userTeamSize, "Unknown")}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(rfp.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CustomCard>
        </div>

        {/* RFP Details and Responses */}
        <div className="lg:col-span-2">
          {selectedRfp ? (
            (() => {
              const rfp = rfps.find(r => r.id === selectedRfp);
              if (!rfp) return null;
              
              const responseCount = countTotalResponses(rfp);
              
              return (
                <div className="space-y-6">
                  {/* Header Card */}
                  <CustomCard className="shadow-lg">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-[#1e2556] mb-1">
                            {rfp.selectedCategory}
                          </h2>
                          <p className="text-sm text-gray-500">Created {formatDate(rfp.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={responseCount > 0 ? "responded" : "new"} />
                          <p className="text-sm text-gray-500 mt-1">{responseCount} total responses</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Organization</p>
                          <p className="text-sm font-medium">{safeRenderText(rfp.userOrgType?.value, "Unknown")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Team Size</p>
                          <p className="text-sm font-medium">{safeRenderText(rfp.userTeamSize?.value, "Unknown")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Urgency</p>
                          <p className="text-sm font-medium">{safeRenderText(rfp.urgency?.value, "Unknown")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-medium">
                            {(() => {
                              const budget = rfp.budget?.value;
                              if (!budget) return 'N/A';
                              return `${budget.min} - ${budget.max} ${budget.currency}`;
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CustomCard>
                  
                  {/* Project Details Section */}
                  <Section 
                    title="Project Details" 
                    icon={FileText} 
                    defaultOpen={true}
                    badge={`${(rfp.keyProblems?.responses?.length || 0) + (rfp.keyGoals?.responses?.length || 0) + (rfp.customisation?.responses?.length || 0)} responses`}
                  >
                    <FieldWithResponses
                      label="Key Problems"
                      clientValue={rfp.keyProblems?.value}
                      responses={rfp.keyProblems?.responses}
                    />
                    
                    <FieldWithResponses
                      label="Key Goals"
                      clientValue={rfp.keyGoals?.value}
                      responses={rfp.keyGoals?.responses}
                    />
                    
                    <FieldWithResponses
                      label="Customization Requirements"
                      clientValue={rfp.customisation?.value}
                      responses={rfp.customisation?.responses}
                    />
                  </Section>
                  
                  {/* Budget & Timeline Section */}
                  <Section 
                    title="Budget & Timeline" 
                    icon={DollarSign} 
                    defaultOpen={true}
                    badge={`${(rfp.budget?.responses?.length || 0) + (rfp.urgency?.responses?.length || 0)} responses`}
                  >
                    <FieldWithResponses
                      label="Budget Requirements"
                      clientValue={(() => {
                        const budget = rfp.budget?.value;
                        if (!budget) return 'Not specified';
                        return `${budget.min} - ${budget.max} ${budget.currency}`;
                      })()}
                      responses={rfp.budget?.responses}
                      fieldType="budget"
                    />
                    
                    <FieldWithResponses
                      label="Urgency Requirements"
                      clientValue={rfp.urgency?.value}
                      responses={rfp.urgency?.responses}
                      fieldType="urgency"
                    />
                  </Section>
                  
                  {/* Process Lifecycle Section */}
                  {rfp.processLifecycle && Object.keys(rfp.processLifecycle).length > 0 && (
                    <Section 
                      title="Process Lifecycle" 
                      icon={BarChart} 
                      defaultOpen={true}
                      badge={`${Object.values(rfp.processLifecycle).reduce((acc, stage) => acc + (stage.responses?.length || 0), 0)} responses`}
                    >
                      {Object.entries(rfp.processLifecycle).map(([stage, details]) => (
                        <FieldWithResponses
                          key={stage}
                          label={stage}
                          clientValue="Required by client"
                          responses={details.responses}
                          fieldType="lifecycle"
                        />
                      ))}
                    </Section>
                  )}
                  
                  {/* Features Section */}
                  {rfp.features && Object.keys(rfp.features).length > 0 && (
                    <Section 
                      title="Features & Functionality" 
                      icon={CheckSquare} 
                      defaultOpen={true}
                      badge={`${(() => {
                        let count = 0;
                        Object.values(rfp.features).forEach(category => {
                          Object.values(category).forEach(functionality => {
                            Object.values(functionality).forEach(feature => {
                              if (feature.responses) count += feature.responses.length;
                            });
                          });
                        });
                        return count;
                      })()} responses`}
                    >
                      {Object.entries(rfp.features).map(([category, functionalities]) => (
                        <div key={category} className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            {category}
                          </h4>
                          
                          {Object.entries(functionalities).map(([functionality, features]) => (
                            <div key={functionality} className="mb-6">
                              <h5 className="text-base font-medium text-gray-800 mb-3">
                                {functionality}
                              </h5>
                              
                              {Object.entries(features).filter(([feature, details]) => 
                                feature !== 'selected' && typeof details === 'object'
                              ).map(([feature, details]) => (
                                <div key={feature} className="ml-4 mb-4">
                                  <FieldWithResponses
                                    label={feature}
                                    clientValue="Required by client"
                                    responses={details.responses}
                                    fieldType="feature"
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </Section>
                  )}
                </div>
              );
            })()
          ) : (
            <CustomCard className="shadow-lg h-full flex items-center justify-center">
              <div className="p-12 text-center">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select an RFP</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Choose an RFP from the list to view detailed requirements and vendor responses
                </p>
              </div>
            </CustomCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default RfpMarketplacePage;