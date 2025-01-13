
// import React, { useState, useEffect } from 'react';
// import { useRouter } from "next/navigation";
// import { useAuth } from '@/context/AuthContext';
// import { Building2, Users, Star, Calendar, RefreshCw, Globe, Mail, Phone, MapPin, Award } from 'lucide-react';

// const VendorProfile = ({ verified, getProfile }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(getProfile);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const router = useRouter();
//   const { vendorId, userType } = useAuth();

//   useEffect(() => {
//     if (vendorId) {
//       fetchProfile();
//     }
//   }, [vendorId]);

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch(`/api/company-info?id=${vendorId}`);
//       const data = await response.json();
//       setProfile(data.profile);
//       setFormData({
//         companyName: data.profile?.companyName || "",
//         website: data.profile?.website || "",
//         yearFounded: data.profile?.yearFounded || "",
//         headQuaters: data.profile?.headQuaters || "",
//         NameOfFounders: data.profile?.NameOfFounders || "",
//         contact: data.profile?.contact || "",
//         TeamSize: data.profile?.TeamSize || "",
//         Awards: data.profile?.Awards || "",
//         PointOfContactName: data.profile?.PointOfContactName || "",
//         PointOfContactPhone: data.profile?.PointOfContactPhone || "",
//         PointOfContactDesignation: data.profile?.PointOfContactDesignation || "",
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       setLoading(false);
//     }
//   };

//   const [formData, setFormData] = useState({
//     companyName: profile?.companyName || "",
//     website: profile?.website || "",
//     yearFounded: profile?.yearFounded || "",
//     headQuaters: profile?.headQuaters || "",
//     NameOfFounders: profile?.NameOfFounders || "",
//     contact: profile?.contact || "",
//     TeamSize: profile?.TeamSize || "",
//     Awards: profile?.Awards || "",
//     PointOfContactName: profile?.PointOfContactName || "",
//     PointOfContactPhone: profile?.PointOfContactPhone || "",
//     PointOfContactDesignation: profile?.PointOfContactDesignation || "",
//   });

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchProfile();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!vendorId) return;

//     try {
//       const response = await fetch("/api/edit-company", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, vendorId }),
//       });
      
//       const result = await response.json();
//       if (result.success) {
//         setProfile(result.profile);
//         setFormData(result.profile);
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };
//   const InfoCard = ({ icon: Icon, label, value }) => (
//     <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 
//                   hover:shadow-md transition-all duration-200 group">
//       <div className="flex items-center gap-3">
//         <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 
//                       group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-200">
//           <Icon className="w-4 h-4 text-blue-600" />
//         </div>
//         <div>
//           <p className="text-xs text-gray-500">{label}</p>
//           <p className="text-sm font-medium text-gray-900 mt-1">{value || "Not specified"}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const InputField = ({ label, id, type = "text", value, onChange }) => (
//     <div className="relative group">
//       <label 
//         className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-500 z-10" 
//         htmlFor={id}
//       >
//         {label}
//       </label>
//       <input
//         id={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm transition-all duration-200
//                  focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none
//                  group-hover:border-blue-200"
//       />
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="rounded-xl bg-white p-6 shadow-sm space-y-4 animate-pulse">
//         <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//         <div className="grid grid-cols-2 gap-4">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full rounded-xl bg-white shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="px-6 py-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-gray-100">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
//                           flex items-center justify-center text-white shadow-lg">
//               {profile?.companyName?.[0] || <Building2 className="w-6 h-6" />}
//             </div>
//             <div>
//               <h1 className="text-lg font-semibold text-gray-900">{profile?.companyName}</h1>
//               <div className="flex items-center gap-2 mt-1">
//                 <Globe className="w-4 h-4 text-gray-400" />
//                 <a href={profile?.website} 
//                    className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
//                 >
//                   {profile?.website || "Website not specified"}
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleRefresh}
//               disabled={loading || isRefreshing}
//               className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-white/80 
//                        transition-all duration-200 disabled:opacity-50"
//             >
//               <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
//             </button>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
//                        bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600
//                        hover:shadow-md hover:shadow-blue-100 active:scale-98"
//             >
//               {isEditing ? 'Cancel' : 'Edit Profile'}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="p-6">
//         {!isEditing ? (
//           <div className="grid grid-cols-2 gap-8">
//             {/* Company Information */}
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
//                   <Building2 className="w-4 h-4 text-blue-500" />
//                   Company Information
//                 </h3>
//                 <div className="grid gap-3">
//                   {[
//                     { icon: Building2, label: "Company Name", value: profile?.companyName },
//                     { icon: Globe, label: "Website", value: profile?.website },
//                     { icon: Calendar, label: "Founded", value: profile?.yearFounded },
//                     { icon: MapPin, label: "Location", value: profile?.headQuaters },
//                     { icon: Phone, label: "Contact", value: profile?.contact },
//                     { icon: Users, label: "Founders", value: profile?.NameOfFounders },
//                   ].map((item, index) => (
//                     <InfoCard key={index} {...item} />
//                   ))}
//                 </div>
//               </div>

            
//             </div>

//             {/* Point of Contact */}
//             <div>
//             <div>
//                 <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
//                   <Award className="w-4 h-4 text-blue-500" />
//                   Company Achievements
//                 </h3>
//                 <div className="grid gap-3">
//                   <InfoCard 
//                     icon={Users} 
//                     label="Team Size" 
//                     value={profile?.TeamSize} 
//                   />
//                   <InfoCard 
//                     icon={Star} 
//                     label="Awards & Recognition" 
//                     value={profile?.Awards} 
//                   />
//                 </div>
//               </div>
//               <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
//                 <Users className="w-4 h-4 text-blue-500" />
//                 Point of Contact
//               </h3>
//               <div className="space-y-3">
//                 <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
//                                   flex items-center justify-center text-white font-medium">
//                       {profile?.PointOfContactName?.[0] || "C"}
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-900">
//                         {profile?.PointOfContactName || "Contact Name"}
//                       </h4>
//                       <p className="text-sm text-gray-500 mt-0.5">
//                         {profile?.PointOfContactDesignation || "Designation"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-4 pt-4 border-t border-blue-200">
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-4 h-4 text-blue-500" />
//                       <span className="text-sm text-gray-600">
//                         {profile?.PointOfContactPhone || "Phone Number"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">
//             {/* Company Details Form */}
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                   <Building2 className="w-4 h-4 text-blue-500" />
//                   Company Details
//                 </h3>
//                 <div className="space-y-4">
//                   {[
//                     { label: "Company Name", id: "companyName" },
//                     { label: "Website", id: "website", type: "url" },
//                     { label: "Year Founded", id: "yearFounded" },
//                     { label: "Location", id: "headQuaters" },
//                     { label: "Contact", id: "contact" },
//                     { label: "Founders", id: "NameOfFounders" },
//                   ].map((field) => (
//                     <InputField
//                       key={field.id}
//                       {...field}
//                       value={formData[field.id]}
//                       onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                   <Award className="w-4 h-4 text-blue-500" />
//                   Achievements
//                 </h3>
//                 <div className="space-y-4">
//                   <InputField
//                     label="Team Size"
//                     id="TeamSize"
//                     value={formData.TeamSize}
//                     onChange={(e) => setFormData({ ...formData, TeamSize: e.target.value })}
//                   />
//                   <InputField
//                     label="Awards"
//                     id="Awards"
//                     value={formData.Awards}
//                     onChange={(e) => setFormData({ ...formData, Awards: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Point of Contact Form */}
//             <div className="space-y-6">
//               <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                 <Users className="w-4 h-4 text-blue-500" />
//                 Point of Contact
//               </h3>
//               <div className="space-y-4">
//                 <InputField
//                   label="Contact Person"
//                   id="PointOfContactName"
//                   value={formData.PointOfContactName}
//                   onChange={(e) => setFormData({ ...formData, PointOfContactName: e.target.value })}
//                 />
//                 <InputField
//                   label="Phone Number"
//                   id="PointOfContactPhone"
//                   type="tel"
//                   value={formData.PointOfContactPhone}
//                   onChange={(e) => setFormData({ ...formData, PointOfContactPhone: e.target.value })}
//                 />
//                 <InputField
//                   label="Designation"
//                   id="PointOfContactDesignation"
//                   value={formData.PointOfContactDesignation}
//                   onChange={(e) => setFormData({ ...formData, PointOfContactDesignation: e.target.value })}
//                 />
//               </div>

//               <div className="flex justify-end gap-3 mt-8">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 
//                            rounded-lg hover:bg-gray-50 transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 text-sm font-medium text-white rounded-lg
//                          bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 
//                          hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;


import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import { Building2, Users, Star, Calendar, RefreshCw, Globe, Mail, Phone, MapPin, Award } from 'lucide-react';

const VendorProfile = ({ verified, getProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(getProfile);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const { vendorId, userType } = useAuth();

  useEffect(() => {
    if (vendorId) {
      fetchProfile();
    }
  }, [vendorId]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/company-info?id=${vendorId}`);
      const data = await response.json();
      setProfile(data.profile);
      setFormData({
        companyName: data.profile?.companyName || "",
        website: data.profile?.website || "",
        yearFounded: data.profile?.yearFounded || "",
        headQuaters: data.profile?.headQuaters || "",
        NameOfFounders: data.profile?.NameOfFounders || "",
        contact: data.profile?.contact || "",
        TeamSize: data.profile?.TeamSize || "",
        Awards: data.profile?.Awards || "",
        PointOfContactName: data.profile?.PointOfContactName || "",
        PointOfContactPhone: data.profile?.PointOfContactPhone || "",
        PointOfContactDesignation: data.profile?.PointOfContactDesignation || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    companyName: profile?.companyName || "",
    website: profile?.website || "",
    yearFounded: profile?.yearFounded || "",
    headQuaters: profile?.headQuaters || "",
    NameOfFounders: profile?.NameOfFounders || "",
    contact: profile?.contact || "",
    TeamSize: profile?.TeamSize || "",
    Awards: profile?.Awards || "",
    PointOfContactName: profile?.PointOfContactName || "",
    PointOfContactPhone: profile?.PointOfContactPhone || "",
    PointOfContactDesignation: profile?.PointOfContactDesignation || "",
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProfile();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) return;

    try {
      const response = await fetch("/api/edit-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, vendorId }),
      });
      
      const result = await response.json();
      if (result.success) {
        setProfile(result.profile);
        setFormData(result.profile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  // ... (keep all the existing state management and data fetching logic)

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 
                  hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 
                      group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-200">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{value || "Not specified"}</p>
        </div>
      </div>
    </div>
  );

  const InputField = ({ label, id, type = "text", value, onChange }) => (
    <div className="relative group">
      <label 
        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-blue-500 z-10" 
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 text-sm transition-all duration-200
                 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none
                 group-hover:border-blue-200"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
                          flex items-center justify-center text-white shadow-lg">
              {profile?.companyName?.[0] || <Building2 className="w-6 h-6" />}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{profile?.companyName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={profile?.website} 
                   className="text-sm text-gray-500 hover:text-blue-500 transition-colors truncate max-w-[200px] sm:max-w-none"
                >
                  {profile?.website || "Website not specified"}
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-white/80 
                       transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                       bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600
                       hover:shadow-md hover:shadow-blue-100 active:scale-98"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Company Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  Company Information
                </h3>
                <div className="grid gap-3">
                  {[
                    { icon: Building2, label: "Company Name", value: profile?.companyName },
                    { icon: Globe, label: "Website", value: profile?.website },
                    { icon: Calendar, label: "Founded", value: profile?.yearFounded },
                    { icon: MapPin, label: "Location", value: profile?.headQuaters },
                    { icon: Phone, label: "Contact", value: profile?.contact },
                    { icon: Users, label: "Founders", value: profile?.NameOfFounders },
                  ].map((item, index) => (
                    <InfoCard key={index} {...item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Point of Contact */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-blue-500" />
                  Company Achievements
                </h3>
                <div className="grid gap-3">
                  <InfoCard 
                    icon={Users} 
                    label="Team Size" 
                    value={profile?.TeamSize} 
                  />
                  <InfoCard 
                    icon={Star} 
                    label="Awards & Recognition" 
                    value={profile?.Awards} 
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-blue-500" />
                  Point of Contact
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
                                    flex items-center justify-center text-white font-medium">
                        {profile?.PointOfContactName?.[0] || "C"}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {profile?.PointOfContactName || "Contact Name"}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {profile?.PointOfContactDesignation || "Designation"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {profile?.PointOfContactPhone || "Phone Number"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Company Details Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  Company Details
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Company Name", id: "companyName" },
                    { label: "Website", id: "website", type: "url" },
                    { label: "Year Founded", id: "yearFounded" },
                    { label: "Location", id: "headQuaters" },
                    { label: "Contact", id: "contact" },
                    { label: "Founders", id: "NameOfFounders" },
                  ].map((field) => (
                    <InputField
                      key={field.id}
                      {...field}
                      value={formData[field.id]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  Achievements
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Team Size"
                    id="TeamSize"
                    value={formData.TeamSize}
                    onChange={(e) => setFormData({ ...formData, TeamSize: e.target.value })}
                  />
                  <InputField
                    label="Awards"
                    id="Awards"
                    value={formData.Awards}
                    onChange={(e) => setFormData({ ...formData, Awards: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Point of Contact Form */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Point of Contact
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Contact Person"
                  id="PointOfContactName"
                  value={formData.PointOfContactName}
                  onChange={(e) => setFormData({ ...formData, PointOfContactName: e.target.value })}
                />
                <InputField
                  label="Phone Number"
                  id="PointOfContactPhone"
                  type="tel"
                  value={formData.PointOfContactPhone}
                  onChange={(e) => setFormData({ ...formData, PointOfContactPhone: e.target.value })}
                />
                <InputField
                  label="Designation"
                  id="PointOfContactDesignation"
                  value={formData.PointOfContactDesignation}
                  onChange={(e) => setFormData({ ...formData, PointOfContactDesignation: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 
                           rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white rounded-lg
                         bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 
                         hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;