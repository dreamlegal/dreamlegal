
// "use client";

// import { useState } from "react";
// import { HiOutlinePencil } from "react-icons/hi";

// function ProfilePage({ data }: any) {
//   interface Profile {
//     Designation: string | null;
//     CompanyAddress: string | null; // Maps to Company Name
//     OrgType: string | null; // Maps to Organisation Type
//     TeamSize: string | null;
//     Location: string | null;
//     ExistingTools: string[];
//     Goals: string[];
//     Industry: string[];
//     PracticeArea: string[];
//     PrimaryLanguage: string[];
//     WorkType: string[];
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<Profile | null>(data.profile);

//   // Options for multi-select fields
//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof Profile, value: any) => {
//     setProfile((prev) => ({
//       ...prev!,
//       [field]: value,
//     }));
//   };

//   const renderInputField = (label: string, field: keyof Profile) => (
//     <li className="grid grid-cols-1 pr-5">
//       <p className="text-sm text-slate-500">{label}</p>
//       {isEditing ? (
//         <input
//           type="text"
//           value={profile?.[field] || ""}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className="mt-1 w-full rounded-md border-gray-300 bg-white text-sm"
//         />
//       ) : (
//         <p className="text-sm text-gray-900">{profile?.[field] || "N/A"}</p>
//       )}
//     </li>
//   );

//   const renderArrayField = (
//     label: string,
//     field: keyof Profile,
//     options: string[]
//   ) => (
//     <li className="grid grid-cols-1 pr-5">
//       <p className="text-sm text-slate-500">{label}</p>
//       {isEditing ? (
//         <select
//           multiple
//           value={profile?.[field] || []}
//           onChange={(e) =>
//             handleInputChange(
//               field,
//               Array.from(e.target.selectedOptions, (option) => option.value)
//             )
//           }
//           className="mt-1 w-full rounded-md border-gray-300 bg-white text-sm"
//         >
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <p className="text-sm text-gray-900">
//           {profile?.[field]?.join(", ") || "N/A"}
//         </p>
//       )}
//     </li>
//   );

//   return (
//     <div className="font-clarity border rounded-md shadow">
//       <div className="p-4">
//         <div className="flex justify-between pb-3 items-center">
//           <h3 className="text-sm font-bold text-gray-900 flex gap-1 pr-5 items-center hover:cursor-pointer">
//             Profile Details
//           </h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="text-primary1 text-sm grid grid-cols-2 pr-5"
//           >
//             <HiOutlinePencil />
//           </button>
//         </div>
//         <ul className="mt-2 pb-2 space-y-2">
//           {/* Render all fields */}
//           {renderInputField("Designation", "Designation")}
//           {renderInputField("Company Name", "CompanyAddress")}
//           {renderInputField("Organisation Type", "OrgType")}
//           {renderInputField("Team Size", "TeamSize")}
//           {renderInputField("Country", "Location")}

//           {renderArrayField("Existing Tools", "ExistingTools", toolOptions)}
//           {renderArrayField("Goals", "Goals", goalOptions)}
//           {renderArrayField("Industry", "Industry", industryOptions)}
//           {renderArrayField("Practice Areas", "PracticeArea", practiceAreaOptions)}
//           {renderArrayField(
//             "Primary Languages",
//             "PrimaryLanguage",
//             languageOptions
//           )}
//           {renderArrayField("Work Types", "WorkType", workTypeOptions)}
//         </ul>
//         {isEditing && (
//           <div className="mt-4 flex justify-end gap-4">
//             <button
//               onClick={() => setIsEditing(false)}
//               className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 rounded-md bg-blue-500 text-white"
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;
// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// const ProfilePage = ({ data }) => {
//   interface Profile {
//     Designation: string | null;
//     CompanyAddress: string | null;
//     OrgType: string | null;
//     TeamSize: string | null;
//     Location: string | null;
//     ExistingTools: string[];
//     Goals: string[];
//     Industry: string[];
//     PracticeArea: string[];
//     PrimaryLanguage: string[];
//     WorkType: string[];
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<Profile | null>(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   // Options for multi-select fields
//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof Profile, value: any) => {
//     setProfile((prev) => ({
//       ...prev!,
//       [field]: value,
//     }));
//   };

//   const CustomInput = ({ label, value, onChange, disabled = false }) => (
//     <div className="relative">
//       <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
//         {label}
//       </label>
//       <input
//         type="text"
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         disabled={disabled}
//         className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
//       />
//     </div>
//   );

//   const CustomMultiSelect = ({ label, field, options }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     const removeOption = (option: string, e: React.MouseEvent) => {
//       e.stopPropagation();
//       handleInputChange(
//         field,
//         selectedValues.filter((v) => v !== option)
//       );
//     };

//     return (
//       <div className="relative">
//         <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 z-10">
//           {label}
//         </label>
//         <div
//           onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
//           className={`min-h-[48px] w-full rounded-lg border ${
//             isOpen ? "border-blue-500" : "border-gray-200"
//           } bg-white px-2 py-2 cursor-pointer ${
//             isEditing ? "" : "pointer-events-none bg-gray-50"
//           }`}
//         >
//           <div className="flex flex-wrap gap-2">
//             {selectedValues.map((value) => (
//               <span
//                 key={value}
//                 className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
//               >
//                 {value}
//                 {isEditing && (
//                   <X
//                     size={14}
//                     className="cursor-pointer hover:text-blue-800"
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
//               className={`absolute right-2 top-4 transition-transform ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           )}
//         </div>
//         {isOpen && (
//           <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className="flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-gray-50"
//               >
//                 <div
//                   className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
//                     selectedValues.includes(option)
//                       ? "border-blue-500 bg-blue-500"
//                       : "border-gray-300"
//                   }`}
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

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
//       <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-base font-medium text-gray-900">Profile Details</h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-6">
//         <div className="grid gap-6">
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
//             <CustomInput
//               label="Organisation Type"
//               value={profile?.OrgType}
//               onChange={(value) => handleInputChange("OrgType", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
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
//               label="Goals"
//               field="Goals"
//               options={goalOptions}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Industry"
//               field="Industry"
//               options={industryOptions}
//             />
//             <CustomMultiSelect
//               label="Practice Areas"
//               field="PracticeArea"
//               options={practiceAreaOptions}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Primary Languages"
//               field="PrimaryLanguage"
//               options={languageOptions}
//             />
//             <CustomMultiSelect
//               label="Work Types"
//               field="WorkType"
//               options={workTypeOptions}
//             />
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-8 flex justify-end gap-3">
//             <button
//               onClick={() => setIsEditing(false)}
//               className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// const ProfilePage = ({ data }) => {
//   interface Profile {
//     Designation: string | null;
//     CompanyAddress: string | null;
//     OrgType: string | null;
//     TeamSize: string | null;
//     Location: string | null;
//     ExistingTools: string[];
//     Goals: string[];
//     Industry: string[];
//     PracticeArea: string[];
//     PrimaryLanguage: string[];
//     WorkType: string[];
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<Profile | null>(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   // Options for multi-select fields
//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof Profile, value: any) => {
//     setProfile((prev) => ({
//       ...prev!,
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

//   const CustomMultiSelect = ({ label, field, options }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     const removeOption = (option: string, e: React.MouseEvent) => {
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

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
//       <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Profile Details
//           </h3>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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
//             <CustomInput
//               label="Organisation Type"
//               value={profile?.OrgType}
//               onChange={(value) => handleInputChange("OrgType", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
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
//               label="Goals"
//               field="Goals"
//               options={goalOptions}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Industry"
//               field="Industry"
//               options={industryOptions}
//             />
//             <CustomMultiSelect
//               label="Practice Areas"
//               field="PracticeArea"
//               options={practiceAreaOptions}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomMultiSelect
//               label="Primary Languages"
//               field="PrimaryLanguage"
//               options={languageOptions}
//             />
//             <CustomMultiSelect
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
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


// "use client";

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// interface Profile {
//   Designation: string | null;
//   CompanyAddress: string | null;
//   OrgType: string | null;
//   TeamSize: string | null;
//   Location: string | null;
//   ExistingTools: string[];
//   Goals: string[];
//   Industry: string[];
//   PracticeArea: string[];
//   PrimaryLanguage: string[];
//   WorkType: string[];
// }

// interface ProfilePageProps {
//   data: {
//     profile: Profile;
//   };
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<Profile | null>(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   // Options for multi-select fields
//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof Profile, value: any) => {
//     setProfile((prev) => ({
//       ...prev!,
//       [field]: value,
//     }));
//   };

//   const CustomInput = ({ 
//     label, 
//     value, 
//     onChange, 
//     disabled = false 
//   }: {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     disabled?: boolean;
//   }) => (
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

//   const CustomMultiSelect = ({ 
//     label, 
//     field, 
//     options 
//   }: {
//     label: string;
//     field: keyof Profile;
//     options: string[];
//   }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     const removeOption = (option: string, e: React.MouseEvent) => {
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

//   const TileSelect = ({ 
//     label, 
//     field, 
//     options 
//   }: {
//     label: string;
//     field: keyof Profile;
//     options: string[];
//   }) => {
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       if (!isEditing) return;
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     return (
//       <div className="relative space-y-3">
//         <label className="text-sm font-medium text-indigo-400">
//           {label}
//         </label>
//         <div className="grid grid-cols-2 gap-3">
//           {options.map((option) => {
//             const isSelected = selectedValues.includes(option);
//             return (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className={`relative group cursor-pointer overflow-hidden rounded-xl border-2 p-4
//                           transition-all duration-300 ${
//                             isEditing ? "hover:border-indigo-300" : ""
//                           }
//                           ${
//                             isSelected
//                               ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
//                               : "border-gray-100 hover:shadow-md"
//                           }
//                           ${!isEditing && "pointer-events-none"}
//                           `}
//               >
//                 {/* Animated background on hover */}
//                 <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
//                               transition-transform duration-300 
//                               ${isEditing ? "group-hover:translate-y-0" : ""} 
//                               ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
//                 />
                
//                 {/* Content */}
//                 <div className="relative flex items-center justify-between">
//                   <span className={`text-sm font-medium transition-colors
//                                 ${isSelected ? "text-indigo-600" : "text-gray-600"}
//                                 ${isEditing && !isSelected ? "group-hover:text-indigo-500" : ""}`}>
//                     {option}
//                   </span>
                  
//                   {/* Checkbox */}
//                   {isEditing && (
//                     <div className={`flex h-5 w-5 items-center justify-center rounded-md 
//                                   border transition-colors duration-300
//                                   ${
//                                     isSelected
//                                       ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                                       : "border-gray-200 group-hover:border-indigo-200"
//                                   }`}>
//                       {isSelected && <Check size={12} className="text-white" />}
//                     </div>
//                   )}
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
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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
//             <CustomInput
//               label="Organisation Type"
//               value={profile?.OrgType}
//               onChange={(value) => handleInputChange("OrgType", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
//             />
//           </div>

//           <CustomInput
//             label="Country"
//             value={profile?.Location}
//             onChange={(value) => handleInputChange("Location", value)}
//             disabled={!isEditing}
//           />

//           <TileSelect
//             label="Goals"
//             field="Goals"
//             options={goalOptions}
//           />
          
//           <TileSelect
//             label="Work Types"
//             field="WorkType"
//             options={workTypeOptions}
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
//         </div>

//         {isEditing && (
//           <div className="mt-10 flex justify-end gap-4">
//             <button
//               onClick={() => setIsEditing(false)}
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// interface Profile {
//   Designation: string | null;
//   CompanyAddress: string | null;
//   OrgType: string | null;
//   TeamSize: string | null;
//   Location: string | null;
//   ExistingTools: string[];
//   Goals: string[];
//   Industry: string[];
//   PracticeArea: string[];
//   PrimaryLanguage: string[];
//   WorkType: string[];
// }

// interface ProfilePageProps {
//   data: {
//     profile: Profile;
//   };
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<Profile | null>(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof Profile, value: any) => {
//     setProfile((prev) => ({
//       ...prev!,
//       [field]: value,
//     }));
//   };

//   const CustomInput = ({ 
//     label, 
//     value, 
//     onChange, 
//     disabled = false 
//   }: {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     disabled?: boolean;
//   }) => (
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

//   const CustomMultiSelect = ({ 
//     label, 
//     field, 
//     options 
//   }: {
//     label: string;
//     field: keyof Profile;
//     options: string[];
//   }) => {
//     const isOpen = activeDropdown === field;
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     const removeOption = (option: string, e: React.MouseEvent) => {
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

//   const EnhancedSelect = ({ 
//     label, 
//     field, 
//     options 
//   }: {
//     label: string;
//     field: keyof Profile;
//     options: string[];
//   }) => {
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

//     const toggleOption = (option: string) => {
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     return (
//       <div className="space-y-3">
//         <label className="text-sm font-medium text-indigo-400">{label}</label>
//         <div className="grid grid-cols-2 gap-3">
//           {options.map((option) => {
//             const isSelected = selectedValues.includes(option);
//             return (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-4
//                           transition-all duration-300 hover:border-indigo-300
//                           ${
//                             isSelected
//                               ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
//                               : "border-gray-100 hover:shadow-md"
//                           }`}
//               >
//                 {/* Animated background */}
//                 <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
//                               transition-transform duration-300 group-hover:translate-y-0 
//                               ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
//                 />
                
//                 {/* Content */}
//                 <div className="relative flex items-center justify-between">
//                   <span className={`text-sm font-medium transition-colors
//                                 ${isSelected ? "text-indigo-600" : "text-gray-600"}
//                                 group-hover:text-indigo-500`}>
//                     {option}
//                   </span>
                  
//                   <div className={`flex h-5 w-5 items-center justify-center rounded-md 
//                                 border transition-colors duration-300
//                                 ${
//                                   isSelected
//                                     ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                                     : "border-gray-200 group-hover:border-indigo-200"
//                                 }`}>
//                     {isSelected && <Check size={12} className="text-white" />}
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
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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
//             <CustomInput
//               label="Organisation Type"
//               value={profile?.OrgType}
//               onChange={(value) => handleInputChange("OrgType", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
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

//           {/* Goals and Work Types moved to bottom with enhanced selection UI */}
//           <div className="space-y-8 pt-4 border-t border-gray-100">
//             <EnhancedSelect
//               label="Goals"
//               field="Goals"
//               options={goalOptions}
//             />
            
//             <EnhancedSelect
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
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// // ... (keep all interfaces and other imports the same)

// const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
//   // ... (keep all the useState and handler functions the same)

//   const EnhancedMultiSelect = ({ 
//     label, 
//     field, 
//     options 
//   }: {
//     label: string;
//     field: keyof Profile;
//     options: string[];
//   }) => {
//     const selectedValues = profile?.[field] || [];

//     const toggleOption = (option: string) => {
//       if (!isEditing) return;
//       const newValues = selectedValues.includes(option)
//         ? selectedValues.filter((v) => v !== option)
//         : [...selectedValues, option];
//       handleInputChange(field, newValues);
//     };

//     return (
//       <div className="space-y-3">
//         {/* View/Edit Field (similar to other fields) */}
//         <div className="relative group">
//           <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
//             {label}
//           </label>
//           <div className={`min-h-[52px] w-full rounded-xl border bg-white px-3 py-2.5 transition-all duration-200
//             ${isEditing ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
//             ${!isEditing && "bg-gray-50"}`}
//           >
//             <div className="flex flex-wrap gap-2">
//               {selectedValues.map((value) => (
//                 <span
//                   key={value}
//                   className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
//                            px-2.5 py-1.5 text-xs font-medium text-indigo-600"
//                 >
//                   {value}
//                   {isEditing && (
//                     <X
//                       size={14}
//                       className="cursor-pointer hover:text-indigo-800 transition-colors"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleOption(value);
//                       }}
//                     />
//                   )}
//                 </span>
//               ))}
//               {selectedValues.length === 0 && (
//                 <span className="text-sm text-gray-400">Select options...</span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Options Box (only visible in edit mode) */}
//         {isEditing && (
//           <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
//             {options.map((option) => {
//               const isSelected = selectedValues.includes(option);
//               return (
//                 <div
//                   key={option}
//                   onClick={() => toggleOption(option)}
//                   className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-4
//                             transition-all duration-300 hover:border-indigo-300
//                             ${
//                               isSelected
//                                 ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
//                                 : "border-gray-100 hover:shadow-md"
//                             }`}
//                 >
//                   {/* Animated background */}
//                   <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
//                                 transition-transform duration-300 group-hover:translate-y-0 
//                                 ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
//                   />
                  
//                   {/* Content */}
//                   <div className="relative flex items-center justify-between">
//                     <span className={`text-sm font-medium transition-colors
//                                   ${isSelected ? "text-indigo-600" : "text-gray-600"}
//                                   group-hover:text-indigo-500`}>
//                       {option}
//                     </span>
                    
//                     <div className={`flex h-5 w-5 items-center justify-center rounded-md 
//                                   border transition-colors duration-300
//                                   ${
//                                     isSelected
//                                       ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                                       : "border-gray-200 group-hover:border-indigo-200"
//                                   }`}>
//                       {isSelected && <Check size={12} className="text-white" />}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
//       {/* ... (keep header section the same) */}
//       <div className="p-8">
//         <div className="grid gap-8">
//           {/* ... (keep all other fields the same until the last section) */}

//           {/* Replace the last section with: */}
//           <div className="space-y-8 pt-4 border-t border-gray-100">
//             <EnhancedMultiSelect
//               label="Goals"
//               field="Goals"
//               options={goalOptions}
//             />
            
//             <EnhancedMultiSelect
//               label="Work Types"
//               field="WorkType"
//               options={workTypeOptions}
//             />
//           </div>
//         </div>

//         {/* ... (keep the save/cancel buttons section the same) */}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// const ProfilePage = ({ data }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];
//   const orgTypeOptions = ["Law Firm", "Corporate Legal", "Solo Practice", "Government"];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field, value) => {
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

//   const TileSelect = ({ label, field, options, singleSelect = false }) => {
//     const value = profile?.[field];
//     const selectedValues = singleSelect ? [value] : (value || []);

//     if (!isEditing) {
//       return (
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-indigo-400">{label}</label>
//           <div className="flex flex-wrap gap-2">
//             {selectedValues.map((val) => (
//               <span
//                 key={val}
//                 className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
//                          px-3 py-2 text-sm font-medium text-indigo-600"
//               >
//                 {val}
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
//       if (singleSelect) {
//         handleInputChange(field, option);
//       } else {
//         const newValues = selectedValues.includes(option)
//           ? selectedValues.filter((v) => v !== option)
//           : [...selectedValues, option];
//         handleInputChange(field, newValues);
//       }
//     };

//     return (
//       <div className="space-y-3">
//         <label className="text-sm font-medium text-indigo-400">{label}</label>
//         <div className="grid grid-cols-2 gap-3">
//           {options.map((option) => {
//             const isSelected = singleSelect 
//               ? value === option 
//               : selectedValues.includes(option);
//             return (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-4
//                           transition-all duration-300 hover:border-indigo-300
//                           ${
//                             isSelected
//                               ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
//                               : "border-gray-100 hover:shadow-md"
//                           }`}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
//                               transition-transform duration-300 group-hover:translate-y-0 
//                               ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
//                 />
                
//                 <div className="relative flex items-center justify-between">
//                   <span className={`text-sm font-medium transition-colors
//                                 ${isSelected ? "text-indigo-600" : "text-gray-600"}
//                                 group-hover:text-indigo-500`}>
//                     {option}
//                   </span>
                  
//                   <div className={`flex h-5 w-5 items-center justify-center rounded-md 
//                                 border transition-colors duration-300
//                                 ${
//                                   isSelected
//                                     ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
//                                     : "border-gray-200 group-hover:border-indigo-200"
//                                 }`}>
//                     {isSelected && <Check size={12} className="text-white" />}
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
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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

//           {/* Organization Type with tile selection */}
//           <TileSelect
//             label="Organisation Type"
//             field="OrgType"
//             options={orgTypeOptions}
//             singleSelect={true}
//           />
          
//           <div className="grid gap-6 md:grid-cols-2">
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Country"
//               value={profile?.Location}
//               onChange={(value) => handleInputChange("Location", value)}
//               disabled={!isEditing}
//             />
//           </div>

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
            
//             {/* Work Types with tile selection */}
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
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// const ProfilePage = ({ data }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];


//   // Original organization types
//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//     "In-House Counsels"
//   ];

//   const teamSizes = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+",
//   ];


//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field, value) => {
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
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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
//             <CustomInput
//               label="Organisation Type"
//               value={profile?.OrgType}
//               onChange={(value) => handleInputChange("OrgType", value)}
//               disabled={!isEditing}
//             />
//             <CustomInput
//               label="Team Size"
//               value={profile?.TeamSize}
//               onChange={(value) => handleInputChange("TeamSize", value)}
//               disabled={!isEditing}
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
//               className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                        text-gray-600 transition-all duration-200 hover:border-gray-300 
//                        hover:bg-gray-50 hover:shadow-md active:scale-95"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                        text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                        transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                        hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



// final code   without edit save functionality  //

// import React, { useState } from "react";
// import { ChevronDown, X, Check, Pencil } from "lucide-react";

// const ProfilePage = ({ data }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(data.profile);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
//   const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
//   const languageOptions = ["English", "Spanish", "French"];
//   const industryOptions = ["Agriculture", "Banking", "Healthcare"];
//   const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
//   const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];


  
 

//   // Organization types
//   const organizationTypes = [
//     "Law firms",
//     "Enterprises",
//     "Individual Practitioners",
//     "Startups",
//     "Government Departments",
//     "Judiciary",
//     "In-House Counsels"
//   ];

//   const teamSizes = [
//     "1",
//     "2-20",
//     "21-50",
//     "51- 200",
//     "201-500",
//     "500+"
//   ];

//   const handleSave = () => {
//     console.log("Updated profile:", profile);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field, value) => {
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
//             className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
//                      text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
//                      hover:shadow-md active:scale-95"
//           >
//             <Pencil size={14} />
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-8">
//         <div className="grid gap-8">
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
//               />
//             </div>
//           </div>
  
//           {isEditing && (
//             <div className="mt-10 flex justify-end gap-4">
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
//                          text-gray-600 transition-all duration-200 hover:border-gray-300 
//                          hover:bg-gray-50 hover:shadow-md active:scale-95"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
//                          text-sm font-medium text-white shadow-lg shadow-indigo-200 
//                          transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
//                          hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   export default ProfilePage;

//   the final code will be here 


import React, { useState } from "react";
import { ChevronDown, X, Check, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = ({ data, userId }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(data.profile);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your existing options arrays
  const toolOptions = ["Dashboard Customization", "Analytics Dashboard"];
  const goalOptions = ["Time management", "Improving client services", "Client Satisfaction", "Process Optimization"];
  const languageOptions = ["English", "Spanish", "French"];
  const industryOptions = ["Agriculture", "Banking", "Healthcare"];
  const practiceAreaOptions = ["Appellate Law", "Corporate Law"];
  const workTypeOptions = ["Drafting", "Consulting", "Advisory", "Litigation"];
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

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      console.log("Sending profile update request with data:", profile);
      
      const response = await fetch("/api/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          editing: true,
          // Map all profile fields to API expected fields
          Contact: profile.Contact,
          Location: profile.Location,
          Address: profile.Address,
          TeamSize: profile.TeamSize,
          Designation: profile.Designation,
          CompanyType: profile.OrgType,
          CompanyAddress: profile.CompanyAddress,
          CompanyEmail: profile.CompanyEmail,
          primaryLanguages: profile.PrimaryLanguage,
          industries: profile.Industry,
          practiceAreas: profile.PracticeArea,
          workTypes: profile.WorkType,
          goals: profile.Goals,
          existingTools: profile.ExistingTools,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
        setIsEditing(false);
      } else {
        throw new Error(result.msg || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const CustomInput = ({ label, value, onChange, disabled = false }) => (
    <div className="relative group">
      <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm transition-all duration-200 
                 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 focus:outline-none 
                 disabled:bg-gray-50 group-hover:border-indigo-200"
      />
    </div>
  );

  const CustomSelect = ({ label, field, options }) => {
    const isOpen = activeDropdown === field;
    const selectedValue = profile?.[field] || "";

    return (
      <div className="relative group">
        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
          {label}
        </label>
        <div
          onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
          className={`relative w-full rounded-xl border bg-white px-4 py-3.5 cursor-pointer transition-all duration-200
            ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
            ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${selectedValue ? "text-gray-900" : "text-gray-400"}`}>
              {selectedValue || "Select option..."}
            </span>
            {isEditing && (
              <ChevronDown
                size={16}
                className={`text-indigo-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                         ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  handleInputChange(field, option);
                  setActiveDropdown(null);
                }}
                className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
              >
                <div
                  className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                    ${
                      selectedValue === option
                        ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "border-gray-300"
                    }`}
                >
                  {selectedValue === option && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CustomMultiSelect = ({ label, field, options }) => {
    const isOpen = activeDropdown === field;
    const selectedValues = profile?.[field] || [];

    const toggleOption = (option) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      handleInputChange(field, newValues);
    };

    const removeOption = (option, e) => {
      e.stopPropagation();
      handleInputChange(
        field,
        selectedValues.filter((v) => v !== option)
      );
    };

    return (
      <div className="relative group">
        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-indigo-400 z-10">
          {label}
        </label>
        <div
          onClick={() => isEditing && setActiveDropdown(isOpen ? null : field)}
          className={`min-h-[52px] w-full rounded-xl border bg-white px-3 py-2.5 cursor-pointer transition-all duration-200
            ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50" : "border-gray-200"}
            ${isEditing ? "group-hover:border-indigo-200" : "pointer-events-none bg-gray-50"}`}
        >
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
                         px-2.5 py-1.5 text-xs font-medium text-indigo-600"
              >
                {value}
                {isEditing && (
                  <X
                    size={14}
                    className="cursor-pointer hover:text-indigo-800 transition-colors"
                    onClick={(e) => removeOption(value, e)}
                  />
                )}
              </span>
            ))}
            {selectedValues.length === 0 && (
              <span className="text-sm text-gray-400">Select options...</span>
            )}
          </div>
          {isEditing && (
            <ChevronDown
              size={16}
              className={`absolute right-3 top-4 text-indigo-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg 
                         ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className="flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors hover:bg-indigo-50"
              >
                <div
                  className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                    ${
                      selectedValues.includes(option)
                        ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "border-gray-300"
                    }`}
                >
                  {selectedValues.includes(option) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TileSelect = ({ label, field, options }) => {
    const selectedValues = profile?.[field] || [];

    if (!isEditing) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-indigo-400">{label}</label>
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 
                         px-3 py-2 text-sm font-medium text-indigo-600"
              >
                {value}
              </span>
            ))}
            {selectedValues.length === 0 && (
              <span className="text-sm text-gray-400">None selected</span>
            )}
          </div>
        </div>
      );
    }

    const toggleOption = (option) => {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      handleInputChange(field, newValues);
    };

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-indigo-400">{label}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 p-2.5
                          transition-all duration-300 hover:border-indigo-300
                          ${
                            isSelected
                              ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50"
                              : "border-gray-100 hover:shadow-sm"
                          }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 
                              transition-transform duration-300 group-hover:translate-y-0 
                              ${isSelected ? "translate-y-0" : "translate-y-full"}`} 
                />
                
                <div className="relative flex items-center justify-between gap-2">
                  <span className={`text-xs font-medium transition-colors
                                ${isSelected ? "text-indigo-600" : "text-gray-600"}
                                group-hover:text-indigo-500`}>
                    {option}
                  </span>
                  
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md 
                                border transition-colors duration-300
                                ${
                                  isSelected
                                    ? "border-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400"
                                    : "border-gray-200 group-hover:border-indigo-200"
                                }`}>
                    {isSelected && <Check size={10} className="text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  // Your existing input components (CustomInput, CustomSelect, CustomMultiSelect, TileSelect)
  // ... [Keep all your existing component definitions here]

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Profile Details
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
                     text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
                     hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pencil size={14} />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="grid gap-8">
          {/* Keep your existing form layout */}
          <div className="grid gap-6 md:grid-cols-2">
            <CustomInput
              label="Designation"
              value={profile?.Designation}
              onChange={(value) => handleInputChange("Designation", value)}
              disabled={!isEditing}
            />
            <CustomInput
              label="Company Name"
              value={profile?.CompanyAddress}
              onChange={(value) => handleInputChange("CompanyAddress", value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <CustomSelect
              label="Organisation Type"
              field="OrgType"
              options={organizationTypes}
            />
            <CustomSelect
              label="Team Size"
              field="TeamSize"
              options={teamSizes}
            />
          </div>

          <CustomInput
            label="Country"
            value={profile?.Location}
            onChange={(value) => handleInputChange("Location", value)}
            disabled={!isEditing}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <CustomMultiSelect
              label="Existing Tools"
              field="ExistingTools"
              options={toolOptions}
            />
            <CustomMultiSelect
              label="Industry"
              field="Industry"
              options={industryOptions}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <CustomMultiSelect
              label="Practice Areas"
              field="PracticeArea"
              options={practiceAreaOptions}
            />
            <CustomMultiSelect
              label="Primary Languages"
              field="PrimaryLanguage"
              options={languageOptions}
            />
          </div>

          <div className="space-y-8 pt-4 border-t border-gray-100">
            <TileSelect
              label="Goals"
              field="Goals"
              options={goalOptions}
            />
            
            <TileSelect
              label="Work Types"
              field="WorkType"
              options={workTypeOptions}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-10 flex justify-end gap-4">
            <button
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium
                       text-gray-600 transition-all duration-200 hover:border-gray-300 
                       hover:bg-gray-50 hover:shadow-md active:scale-95 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 
                       text-sm font-medium text-white shadow-lg shadow-indigo-200 
                       transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 
                       hover:shadow-xl hover:shadow-indigo-300 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;