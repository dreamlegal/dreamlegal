// "use client"
// import React, { useState, useEffect } from 'react';
// import { User, Building2, Mail, Phone, Calendar, Target, AlertCircle, Loader2 } from 'lucide-react';

// interface TechVendorLead {
//   id: string;
//   fullName: string;
//   organization: string;
//   email: string;
//   phone?: string;
//   interestAreas: string;
//   createdAt: string;
// }

// interface ApiResponse {
//   success: boolean;
//   data: TechVendorLead[];
//   count: number;
//   error?: string;
// }

// const TechVendorLeadsAdmin = () => {
//   const [leads, setLeads] = useState<TechVendorLead[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('/api/get-tech-vendor-leads');
//       const result: ApiResponse = await response.json();
      
//       if (result.success) {
//         setLeads(result.data);
//       } else {
//         setError(result.error || 'Failed to fetch leads');
//       }
//     } catch (err) {
//       setError('Network error occurred');
//       console.error('Error fetching leads:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseInterestAreas = (interestAreas: string): string[] => {
//     try {
//       // Try to parse as JSON first
//       const parsed = JSON.parse(interestAreas);
//       return Array.isArray(parsed) ? parsed : [parsed];
//     } catch {
//       // If JSON parsing fails, treat as comma-separated string
//       return interestAreas.split(',').map(area => area.trim()).filter(Boolean);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getInterestAreaColor = (area: string) => {
//     const colors = {
//       'Market Insights': 'bg-blue-100 text-blue-800',
//       'High Intent Leads': 'bg-green-100 text-green-800',
//       'Branding and Visibility': 'bg-purple-100 text-purple-800'
//     };
//     return colors[area as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#1e2556' }} />
//               <p style={{ color: '#334155' }}>Loading tech vendor leads...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={fetchLeads}
//                 className="px-4 py-2 rounded-lg text-white font-medium"
//                 style={{ backgroundColor: '#1e2556' }}
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>
//             Tech Vendor Leads
//           </h1>
//           <p style={{ color: '#334155' }}>
//             Manage and review all tech vendor lead submissions ({leads.length} total)
//           </p>
//         </div>

//         {/* Stats Card */}
//         <div className="mb-8">
//           <div 
//             className="rounded-xl p-6 text-white"
//             style={{ backgroundColor: '#1e2556' }}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center">
//                 <h3 className="text-2xl font-bold mb-1">{leads.length}</h3>
//                 <p className="opacity-90">Total Leads</p>
//               </div>
//               <div className="text-center">
//                 <h3 className="text-2xl font-bold mb-1">
//                   {leads.filter(lead => lead.phone).length}
//                 </h3>
//                 <p className="opacity-90">With Phone</p>
//               </div>
//               <div className="text-center">
//                 <h3 className="text-2xl font-bold mb-1">
//                   {leads.filter(lead => {
//                     const today = new Date();
//                     const leadDate = new Date(lead.createdAt);
//                     return leadDate.toDateString() === today.toDateString();
//                   }).length}
//                 </h3>
//                 <p className="opacity-90">Today</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Leads Grid */}
//         {leads.length === 0 ? (
//           <div className="text-center py-20">
//             <Target className="w-12 h-12 mx-auto mb-4" style={{ color: '#334155' }} />
//             <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e2556' }}>
//               No leads yet
//             </h3>
//             <p style={{ color: '#334155' }}>
//               Lead submissions will appear here once they start coming in.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {leads.map((lead) => (
//               <div
//                 key={lead.id}
//                 className="rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
//                 style={{ backgroundColor: '#f5f7fa' }}
//               >
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: '#1e2556' }}>
//                       {lead.fullName}
//                     </h3>
//                     <div className="flex items-center text-sm mb-2" style={{ color: '#334155' }}>
//                       <Building2 className="w-4 h-4 mr-2" />
//                       {lead.organization}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Info */}
//                 <div className="space-y-3 mb-4">
//                   <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
//                     <Mail className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
//                     <span className="truncate">{lead.email}</span>
//                   </div>
                  
//                   {lead.phone && (
//                     <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
//                       <Phone className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
//                       <span>{lead.phone}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
//                     <Calendar className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
//                     <span>{formatDate(lead.createdAt)}</span>
//                   </div>
//                 </div>

//                 {/* Interest Areas */}
//                 <div className="mb-4">
//                   <h4 className="text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                     Interest Areas:
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {parseInterestAreas(lead.interestAreas).map((area, index) => (
//                       <span
//                         key={index}
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getInterestAreaColor(area)}`}
//                       >
//                         {area}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 pt-4 border-t border-gray-200">
//                   <a
//                     href={`mailto:${lead.email}`}
//                     className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
//                     style={{ backgroundColor: '#1e2556' }}
//                   >
//                     Email
//                   </a>
//                   {lead.phone && (
//                     <a
//                       href={`tel:${lead.phone}`}
//                       className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
//                       style={{ backgroundColor: '#7cc6ee' }}
//                     >
//                       Call
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Refresh Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={fetchLeads}
//             className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
//             style={{ backgroundColor: '#7cc6ee' }}
//           >
//             Refresh Leads
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechVendorLeadsAdmin;
import React, { useState, useEffect } from 'react';
import {RefreshCw, User, Building2, Mail, Phone, Calendar, Target, AlertCircle, Loader2 } from 'lucide-react';

interface TechVendorLead {
  id: string;
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  interestAreas: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: TechVendorLead[];
  count: number;
  error?: string;
}

const TechVendorLeadsAdmin = () => {
  const [leads, setLeads] = useState<TechVendorLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/get-tech-vendor-leads');
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setLeads(result.data);
      } else {
        setError(result.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const parseInterestAreas = (interestAreas: string): string[] => {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(interestAreas);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // If JSON parsing fails, treat as comma-separated string
      return interestAreas.split(',').map(area => area.trim()).filter(Boolean);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInterestAreaColor = (area: string) => {
    const colors = {
      'Market Insights': 'bg-blue-100 text-blue-800',
      'High Intent Leads': 'bg-green-100 text-green-800',
      'Branding and Visibility': 'bg-purple-100 text-purple-800'
    };
    return colors[area as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#1e2556' }} />
              <p style={{ color: '#334155' }}>Loading tech vendor leads...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchLeads}
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: '#1e2556' }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Refresh Button */}
        <div className="absolute top-0 right-0 m-6">
          <button
            onClick={fetchLeads}
            className="p-3 rounded-lg text-white hover:opacity-90 transition-opacity shadow-sm"
            style={{ backgroundColor: '#7cc6ee' }}
            title="Refresh Leads"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

   

        {/* Leads Grid */}
        {leads.length === 0 ? (
          <div className="text-center py-20">
            <Target className="w-12 h-12 mx-auto mb-4" style={{ color: '#334155' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1e2556' }}>
              No leads yet
            </h3>
            <p style={{ color: '#334155' }}>
              Lead submissions will appear here once they start coming in.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: '#f5f7fa' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: '#1e2556' }}>
                      {lead.fullName}
                    </h3>
                    <div className="flex items-center text-sm mb-2" style={{ color: '#334155' }}>
                      <Building2 className="w-4 h-4 mr-2" />
                      {lead.organization}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  
                  {lead.phone && (
                    <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
                      <Phone className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
                      <span>{lead.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm" style={{ color: '#2d2d2d' }}>
                    <Calendar className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: '#7cc6ee' }} />
                    <span>{formatDate(lead.createdAt)}</span>
                  </div>
                </div>

                {/* Interest Areas */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2" style={{ color: '#334155' }}>
                    Interest Areas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {parseInterestAreas(lead.interestAreas).map((area, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getInterestAreaColor(area)}`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1e2556' }}
                  >
                    Email
                  </a>
                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#7cc6ee' }}
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechVendorLeadsAdmin;