

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

// const ProfilePage = ({ data, userId }) => {
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(data?.profile || {});
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Your existing options arrays
//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];
//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//     "In-House Counsels"
//   ];
//   const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

//   const handleSave = async () => {
//     try {
//       setIsSubmitting(true);
//       console.log("Sending profile update request with data:", profile);
      
//       const response = await fetch("/api/edit-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           editing: true,
//           // Map all profile fields to API expected fields
//           Contact: profile.Contact,
//           Location: profile.Location,
//           Address: profile.Address,
//           TeamSize: profile.TeamSize,
//           Designation: profile.Designation,
//           CompanyType: profile.OrgType,
//           CompanyAddress: profile.CompanyAddress,
//           CompanyEmail: profile.CompanyEmail,
//           primaryLanguages: profile.PrimaryLanguage,
//           industries: profile.Industry,
//           practiceAreas: profile.PracticeArea,
//           workTypes: profile.WorkType,
//           goals: profile.Goals,
//           existingTools: profile.ExistingTools,
//         }),
//       });

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: "Profile updated successfully",
//           variant: "default",
//         });
//         setIsEditing(false);
//       } else {
//         throw new Error(result.msg || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to update profile",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     console.log(`Updating field: ${field} with value:`, value);
//     setProfile((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

  
//   const CustomInput = ({ label, value, onChange, disabled = false }) => (
//     <div className="relative group">
//       <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
//         {label}
//       </label>
//       <input
//         type="text"
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         disabled={disabled}
//         className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm transition-all duration-200 
//                  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:outline-none 
//                  disabled:bg-gray-50 group-hover:border-indigo-200"
//       />
//     </div>
//   );

//   const CustomSelect = ({ label, field, options }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValue = profile?.[field] || "";

//     return (
//       <div className="relative group">
//         <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
//           {label}
//         </label>
//         <div
//           onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
//           className={`relative w-full rounded-xl border bg-white px-4 py-3.5 cursor-pointer transition-all duration-200
//             ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
//             ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
//         >
//           <div className="flex items-center justify-between">
//             <span className={`text-sm ${selectedValue ? "text-gray-900" : "text-gray-400"}`}>
//               {selectedValue || "Select option..."}
//             </span>
//             {isEditing && (
//               <ChevronDown
//                 size={16}
//                 className={`text-indigo-400 transition-transform duration-200 ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//               />
//             )}
//           </div>
//         </div>
//         {isOpen && (
//           <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
//                          ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={() => {
//                   handleInputChange(field, option);
//                   setActiveDropdown(null);
//                 }}
//                 className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
//               >
//                 <div
//                   className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
//                     ${
//                       selectedValue === option
//                         ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                         : "border-gray-300"
//                     }`}
//                 >
//                   {selectedValue === option && (
//                     <Check size={12} className="text-white" />
//                   )}
//                 </div>
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const CustomMultiSelect = ({ label, field, options }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     const removeOption = (option, e) => {
//       e.stopPropagation();
//       handleInputChange(
//         field,
//         selectedValues.filter((v) => v !== option)
//       );
//     };

//     return (
//       <div className="relative group">
//         <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
//           {label}
//         </label>
//         <div
//           onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
//           className={`min-h-[52px] w-full rounded-xl border bg-white px-3 py-2.5 cursor-pointer transition-all duration-200
//             ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
//             ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
//         >
//           <div className="flex flex-wrap gap-2">
//             {selectedValues.map((value) => (
//               <span
//                 key={value}
//                 className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
//                          px-2.5 py-1.5 text-xs font-medium text-indigo-600"
//               >
//                 {value}
//                 {isEditing && (
//                   <X
//                     size={14}
//                     className="cursor-pointer hover:text-indigo-800 transition-colors"
//                     onClick={(e) => removeOption(value, e)}
//                   />
//                 )}
//               </span>
//             ))}
//             {selectedValues.length === 0 && (
//               <span className="text-sm text-gray-400">Select options...</span>
//             )}
//           </div>
//           {isEditing && (
//             <ChevronDown
//               size={16}
//               className={`absolute right-3 top-4 text-indigo-400 transition-transform duration-200 ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           )}
//         </div>
//         {isOpen && (
//           <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
//                          ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
//               >
//                 <div
//                   className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
//                     ${
//                       selectedValues.includes(option)
//                         ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                         : "border-gray-300"
//                     }`}
//                 >
//                   {selectedValues.includes(option) && (
//                     <Check size={12} className="text-white" />
//                   )}
//                 </div>
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const TileSelect = ({ label, field, options }) => {
//     const selectedValues = profile?.[field] || [];

//     if (!isEditing) {
//       return (
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-indigo-400">{label}</label>
//           <div className="flex flex-wrap gap-2">
//             {selectedValues.map((value) => (
//               <span
//                 key={value}
//                 className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
//                          px-3 py-2 text-sm font-medium text-indigo-600"
//               >
//                 {value}
//               </span>
//             ))}
//             {selectedValues.length === 0 && (
//               <span className="text-sm text-gray-400">None selected</span>
//             )}
//           </div>
//         </div>
//       );
//     }

//     const toggleOption = (option) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     return (
//       <div className="space-y-3">
//         <label className="text-sm font-medium text-indigo-400">{label}</label>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//           {options.map((option) => {
//             const isSelected = selectedValues.includes(option);
//             return (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 p-2.5
//                           transition-all duration-300 hover:border-indigo-300
//                           ${
//                             isSelected
//                               ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
//                               : "border-gray-100 hover:shadow-sm"
//                           }`}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
//                               transition-transform duration-300 group-hover:translate-y-0 
//                               ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
//                 />
                
//                 <div className="relative flex items-center justify-between gap-2">
//                   <span className={`text-xs font-medium transition-colors
//                                 ${isSelected ? "text-indigo-600" : "text-gray-600"}
//                                 group-hover:text-indigo-500`}>
//                     {option}
//                   </span>
                  
//                   <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md 
//                                 border transition-colors duration-300
//                                 ${
//                                   isSelected
//                                     ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                                     : "border-gray-200 group-hover:border-indigo-200"
//                                 }`}>
//                     {isSelected && <Check size={10} className="text-white" />}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };


//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
//       <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Profile Details
//           </h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             disabled={isSubmitting}
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
//           {/* Keep your existing form layout */}
//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomInput
//               label="Designation"
//               value={profile?.Designation}
//               onChange={(value) => handleInputChange("Designation", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Company Name"
//               value={profile?.CompanyAddress}
//               onChange={(value) => handleInputChange("CompanyAddress", value)}
//               disabled={!isEditing}
//             />
//           </div>
          
//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomSelect
//               label="Organisation Type"
//               field="OrgType"
//               options={organizationTypes}
//             />
//             <CustomSelect
//               label="Team Size"
//               field="TeamSize"
//               options={teamSizes}
//             />
//           </div>

//           <CustomInput
//             label="Country"
//             value={profile?.Location}
//             onChange={(value) => handleInputChange("Location", value)}
//             disabled={!isEditing}
//           />

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Existing Tools"
//               field="ExistingTools"
//               options={toolOptions}
//             />
//             <CustomMultiSelect
//               label="Industry"
//               field="Industry"
//               options={industryOptions}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Practice Areas"
//               field="PracticeArea"
//               options={practiceAreaOptions}
//             />
//             <CustomMultiSelect
//               label="Primary Languages"
//               field="PrimaryLanguage"
//               options={languageOptions}
//             />
//           </div>

//           <div className="space-y-8 pt-4 border-t border-gray-100">
//             <TileSelect
//               label="Goals"
//               field="Goals"
//               options={goalOptions}
//             />
            
//             <TileSelect
//               label="Work Types"
//               field="WorkType"
//               options={workTypeOptions}
//             />
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-10 flex justify-end gap-4">
//             <button
//               onClick={() => setIsEditing(false)}
//               disabled={isSubmitting}
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={isSubmitting}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95
//                        disabled:opacity-50 disabled:cursor-not-allowed
//                        flex items-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="animate-spin">⌛</span>
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { ChevronDown, X, Check, Pencil, Save } from "lucide-react";

// Mock toast hook - replace with your actual implementation
const useToast = () => ({
  toast: ({ title, description, variant }) => {
    console.log(`Toast: ${title} - ${description} (${variant})`);
  }
});

const ProfilePage = ({ data, userId }) => {
  const { toast } = useToast();

  // Options arrays
  const toolOptions = ["Dashboard Customization", "Analytics Dashboard", "Document Management", "Time Tracking"];
  const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
  const languageOptions = ["English", "Spanish", "French", "German", "Italian", "Portuguese"];
  const industryOptions = ["Agriculture", "Banking", "Healthcare", "Technology", "Manufacturing", "Real Estate"];
  const practiceAreaOptions = ["Appellate Law", "Corporate Law", "Criminal Law", "Family Law", "Immigration Law"];
  const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation", "Research", "Compliance"];
  const organizationTypes = [
    "Law firms",
    "Enterprises", 
    "Individual Practitioners",
    "Startups",
    "Government Departments",
    "Judiciary",
    "In-House Counsels"
  ];
  const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

  // Simple state management like freelancer component
  const [userData, setUserData] = useState({
    Contact: '',
    Location: '',
    Address: '',
    TeamSize: '',
    Designation: '',
    CompanyType: '',
    CompanyAddress: '',
    CompanyEmail: '',
    PrimaryLanguage: [],
    Industry: [],
    PracticeArea: [],
    WorkType: [],
    Goals: [],
    ExistingTools: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load initial data
  useEffect(() => {
    if (data?.profile) {
      const profileData = {
        Contact: data.profile.Contact || '',
        Location: data.profile.Location || '',
        Address: data.profile.Address || '',
        TeamSize: data.profile.TeamSize || '',
        Designation: data.profile.Designation || '',
        CompanyType: data.profile.CompanyType || '',
        CompanyAddress: data.profile.CompanyAddress || '',
        CompanyEmail: data.profile.CompanyEmail || '',
        PrimaryLanguage: data.profile.PrimaryLanguage || [],
        Industry: data.profile.Industry || [],
        PracticeArea: data.profile.PracticeArea || [],
        WorkType: data.profile.WorkType || [],
        Goals: data.profile.Goals || [],
        ExistingTools: data.profile.ExistingTools || []
      };
      setUserData(profileData);
      setEditedData(profileData);
    }
  }, [data]);

  // Simple field change handler like freelancer component
  const handleFieldChange = (key, value) => {
    setEditedData(prev => ({
      ...prev,
      [key]: value
    }));
    if (error) setError('');
  };

  // Handle edit/save like freelancer component
  const handleEdit = async () => {
    if (isEditing) {
      // Save changes
      setIsSubmitting(true);
      try {
        const dataToUpdate = {
          userId,
          editing: true,
          Contact: editedData.Contact,
          Location: editedData.Location,
          Address: editedData.Address,
          TeamSize: editedData.TeamSize,
          Designation: editedData.Designation,
          CompanyType: editedData.CompanyType,
          CompanyAddress: editedData.CompanyAddress,
          CompanyEmail: editedData.CompanyEmail,
          primaryLanguages: editedData.PrimaryLanguage,
          industries: editedData.Industry,
          practiceAreas: editedData.PracticeArea,
          workTypes: editedData.WorkType,
          goals: editedData.Goals,
          existingTools: editedData.ExistingTools,
        };

        const response = await fetch('/api/edit-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToUpdate)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.msg || 'Failed to update profile');
        }

        // Update userData with response
        const updatedData = {
          Contact: result.profile.Contact || '',
          Location: result.profile.Location || '',
          Address: result.profile.Address || '',
          TeamSize: result.profile.TeamSize || '',
          Designation: result.profile.Designation || '',
          CompanyType: result.profile.CompanyType || '',
          CompanyAddress: result.profile.CompanyAddress || '',
          CompanyEmail: result.profile.CompanyEmail || '',
          PrimaryLanguage: result.profile.PrimaryLanguage || [],
          Industry: result.profile.Industry || [],
          PracticeArea: result.profile.PracticeArea || [],
          WorkType: result.profile.WorkType || [],
          Goals: result.profile.Goals || [],
          ExistingTools: result.profile.ExistingTools || []
        };

        setUserData(updatedData);
        setEditedData(updatedData);
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setActiveDropdown(null);
        
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Error updating profile');
        toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          setError('');
          setSuccess('');
        }, 3000);
      }
    } else {
      // Start editing
      setEditedData(userData);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
    setError('');
    setActiveDropdown(null);
  };

  // Close dropdown when clicking anywhere - matching original pattern
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  // Simple input component
  const renderInput = (label, key, type = "text") => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#7cc6ee]">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={editedData[key] || ''}
          onChange={(e) => handleFieldChange(key, e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee] focus:ring-opacity-20 focus:outline-none transition-colors bg-white text-[#2d2d2d]"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <p className="text-[#2d2d2d] py-3 px-4 bg-[#f5f7fa] rounded-xl border border-gray-200">{userData[key] || '-'}</p>
      )}
    </div>
  );

  // Update single select to match original pattern with brand colors
  const renderSelect = (label, key, options) => {
    const isOpen = activeDropdown === key;
    const selectedValue = isEditing ? editedData[key] : userData[key];

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#7cc6ee]">{label}</label>
        {isEditing ? (
          <div className="relative group">
            <div
              onClick={() => setActiveDropdown(isOpen ? null : key)}
              className={`relative w-full rounded-xl border bg-white px-4 py-3.5 cursor-pointer transition-all duration-200
                ${isOpen ? "border-[#7cc6ee] ring-2 ring-[#7cc6ee] ring-opacity-20" : "border-gray-200 group-hover:border-[#7cc6ee]"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm ${selectedValue ? "text-[#2d2d2d]" : "text-gray-400"}`}>
                  {selectedValue || "Select option..."}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#7cc6ee] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            {isOpen && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                             ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      handleFieldChange(key, option);
                      setActiveDropdown(null);
                    }}
                    className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-[#7cc6ee] hover:bg-opacity-10"
                  >
                    <div
                      className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                        ${
                          selectedValue === option
                            ? "border-[#7cc6ee] bg-[#7cc6ee]"
                            : "border-gray-300"
                        }`}
                    >
                      {selectedValue === option && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-[#2d2d2d]">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-[#2d2d2d] py-3 px-4 bg-[#f5f7fa] rounded-xl border border-gray-200">{selectedValue || '-'}</p>
        )}
      </div>
    );
  };

  // Working multi-select based on your original pattern with brand colors
  const renderMultiSelect = (label, key, options) => {
    const isOpen = activeDropdown === key;
    const selectedValues = isEditing ? editedData[key] || [] : userData[key] || [];

    const toggleOption = (option) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      handleFieldChange(key, newValues);
    };

    const removeOption = (option, e) => {
      e.stopPropagation();
      handleFieldChange(key, selectedValues.filter((v) => v !== option));
    };

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#7cc6ee]">{label}</label>
        {isEditing ? (
          <div className="relative group">
            <div
              onClick={() => setActiveDropdown(isOpen ? null : key)}
              className={`min-h-[52px] w-full rounded-xl border bg-white px-3 py-2.5 cursor-pointer transition-all duration-200
                ${isOpen ? "border-[#7cc6ee] ring-2 ring-[#7cc6ee] ring-opacity-20" : "border-gray-200 group-hover:border-[#7cc6ee]"}`}
            >
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#7cc6ee] bg-opacity-10 
                             px-2.5 py-1.5 text-xs font-medium text-[#1e2556]"
                  >
                    {value}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-[#1e2556] transition-colors"
                      onClick={(e) => removeOption(value, e)}
                    />
                  </span>
                ))}
                {selectedValues.length === 0 && (
                  <span className="text-sm text-gray-400">Select options...</span>
                )}
              </div>
              <ChevronDown
                size={16}
                className={`absolute right-3 top-4 text-[#7cc6ee] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isOpen && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                             ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleOption(option)}
                    className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-[#7cc6ee] hover:bg-opacity-10"
                  >
                    <div
                      className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                        ${
                          selectedValues.includes(option)
                            ? "border-[#7cc6ee] bg-[#7cc6ee]"
                            : "border-gray-300"
                        }`}
                    >
                      {selectedValues.includes(option) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-[#2d2d2d]">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-3 px-4 bg-[#f5f7fa] rounded-xl border border-gray-200">
            {selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => (
                  <span key={value} className="px-2 py-1 bg-[#7cc6ee] bg-opacity-10 text-[#1e2556] text-sm rounded-lg">
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[#2d2d2d]">-</span>
            )}
          </div>
        )}
      </div>
    );
  };

  // Fixed tile select component
  const renderTileSelect = (label, key, options) => {
    const currentValues = isEditing ? editedData[key] || [] : userData[key] || [];

    const toggleOption = (option) => {
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      handleFieldChange(key, newValues);
    };

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-[#7cc6ee]">{label}</label>
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {options.map((option) => {
              const isSelected = currentValues.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm
                    ${isSelected 
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10' 
                      : 'border-gray-200 hover:border-[#7cc6ee] hover:bg-[#7cc6ee] hover:bg-opacity-5'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isSelected ? 'text-[#1e2556]' : 'text-[#2d2d2d]'}`}>
                      {option}
                    </span>
                    <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-[#7cc6ee] border-[#7cc6ee]' : 'border-gray-300'}`}>
                      {isSelected && <Check size={10} className="text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-3 px-4 bg-[#f5f7fa] rounded-xl border border-gray-200">
            {currentValues.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentValues.map((value) => (
                  <span key={value} className="px-3 py-2 bg-[#7cc6ee] bg-opacity-10 text-[#1e2556] text-sm rounded-lg font-medium">
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[#2d2d2d]">None selected</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Success/Error Messages */}
      {(success || error) && (
        <div className={`mx-6 mt-6 p-4 rounded-lg text-sm ${success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {success || error}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#f5f7fa] px-6 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1e2556]">Profile Details</h3>
          <div className="flex gap-3">
            {isEditing && (
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-[#2d2d2d] bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>
            )}
            <button
              onClick={handleEdit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors disabled:opacity-50"
              style={{
                backgroundColor: isEditing ? '#1e2556' : '#7cc6ee'
              }}
            >
              {isEditing ? (
                <>
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </>
              ) : (
                <>
                  <Pencil size={16} />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Designation", "Designation")}
            {renderInput("Company Name", "CompanyAddress")}
          </div>
          
          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSelect("Organisation Type", "CompanyType", organizationTypes)}
            {renderSelect("Team Size", "TeamSize", teamSizes)}
          </div>

          {/* Location & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Country", "Location")}
            {renderInput("Contact", "Contact")}
          </div>

          {/* Multi-select Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderMultiSelect("Existing Tools", "ExistingTools", toolOptions)}
            {renderMultiSelect("Industry", "Industry", industryOptions)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderMultiSelect("Practice Areas", "PracticeArea", practiceAreaOptions)}
            {renderMultiSelect("Primary Languages", "PrimaryLanguage", languageOptions)}
          </div>

          {/* Tile Selections */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            {renderTileSelect("Goals", "Goals", goalOptions)}
            {renderTileSelect("Work Types", "WorkType", workTypeOptions)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;