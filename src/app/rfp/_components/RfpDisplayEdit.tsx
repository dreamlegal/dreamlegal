
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Edit2, Save, Copy, Plus, Trash2, X, Check, Building, Calendar, MapPin, Mail, Target, FileText, HelpCircle, Share2, Users } from 'lucide-react';
// import Link from 'next/link';
// import { useAuth } from '@/context/authContext';

// // Import the same options from form
// const categoryData = [
//   { id: 'CONTRACT-LIFECYCLE-MANAGEMENT', shortName: 'Contracts' },
//   { id: 'LEGAL-AI', shortName: 'Legal AI' },
//   { id: 'DOCUMENT-MANAGEMENT-SYSTEM', shortName: 'Documents' },
//   { id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS', shortName: 'Litigation' },
//   { id: 'IP-MANAGEMENT', shortName: 'IP Management' },
//   { id: 'LEGAL-RESEARCH', shortName: 'Research' },
//   { id: 'E-DISCOVERY', shortName: 'E-Discovery' }
// ];

// const teamSizeOptions = [
//   { value: 1, label: "1 person" },
//   { value: 20, label: "2-20 people" },
//   { value: 50, label: "21-50 people" },
//   { value: 200, label: "51-200 people" },
//   { value: 500, label: "201-500 people" },
//   { value: 501, label: "500+ people" },
// ];

// const countries = [
//   'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Singapore', 'Netherlands'
// ];

// const teamTypeOptions = ['Law firm', 'Legal department'];

// const timelineOptions = [
//   'Immediately (0–3 months)',
//   'Near future (3–6 months)', 
//   'Exploring (6+ months)'
// ];

// const RfpDisplayEdit = ({ rfpId }) => {
//   const { userId } = useAuth();
//   const [rfpData, setRfpData] = useState(null);
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [editingField, setEditingField] = useState(null);
//   const [tempValue, setTempValue] = useState('');
//   const [tempArray, setTempArray] = useState([]);
//   const [isSaving, setIsSaving] = useState(false);
//   const [shareMessage, setShareMessage] = useState('');
//   const [isMatchingVendors, setIsMatchingVendors] = useState(false);

//   useEffect(() => {
//     fetchRfpData();
//     if (userId) {
//       fetchUserEmail();
//     }
//   }, [rfpId, userId]);

//   const fetchRfpData = async () => {
//     try {
//       const response = await fetch(`/api/rfp/${rfpId}`);
//       const data = await response.json();
//       if (data.success) {
//         setRfpData(data.data);
//       } else {
//         setRfpData(null);
//       }
//     } catch (error) {
//       console.error('Error fetching RFP:', error);
//       setRfpData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUserEmail = async () => {
//     try {
//       const response = await fetch(`/api/user/email/${userId}`);
//       const data = await response.json();
//       if (data.success) {
//         setUserEmail(data.email);
//         // Update RFP with real email if it's still placeholder
//         if (rfpData && rfpData.contactEmail.includes('user-') && data.email) {
//           handleSave('contactEmail', data.email);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user email:', error);
//     }
//   };

//   const handleEdit = (field, value) => {
//     setEditingField(field);
//     if (Array.isArray(value)) {
//       setTempArray([...value]);
//     } else {
//       setTempValue(value);
//     }
//   };

//   const handleSave = async (field, directValue = null) => {
//     setIsSaving(true);
//     try {
//       const updateData = {};
//       if (directValue !== null) {
//         updateData[field] = directValue;
//       } else if (Array.isArray(rfpData[field])) {
//         updateData[field] = tempArray;
//       } else {
//         updateData[field] = tempValue;
//       }

//       const response = await fetch(`/api/rfp/${rfpId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateData)
//       });

//       if (response.ok) {
//         const updatedData = await response.json();
//         if (updatedData.success) {
//           setRfpData(updatedData.data);
//           setEditingField(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error saving RFP:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setEditingField(null);
//     setTempValue('');
//     setTempArray([]);
//   };

//   const addArrayItem = () => {
//     setTempArray([...tempArray, '']);
//   };

//   const updateArrayItem = (index, value) => {
//     const newArray = [...tempArray];
//     newArray[index] = value;
//     setTempArray(newArray);
//   };

//   const removeArrayItem = (index) => {
//     setTempArray(tempArray.filter((_, i) => i !== index));
//   };

//   const addKeyRequirement = () => {
//     setTempArray([...tempArray, { head: '', description: '' }]);
//   };

//   const updateKeyRequirement = (index, field, value) => {
//     const newArray = [...tempArray];
//     newArray[index][field] = value;
//     setTempArray(newArray);
//   };

//   const copyToClipboard = () => {
//     const rfpText = generateRfpText();
//     navigator.clipboard.writeText(rfpText);
//     setShareMessage('RFP copied to clipboard!');
//     setTimeout(() => setShareMessage(''), 3000);
//   };

//   const shareLink = () => {
//     const currentUrl = window.location.href;
//     navigator.clipboard.writeText(currentUrl);
//     setShareMessage('Link copied to clipboard!');
//     setTimeout(() => setShareMessage(''), 3000);
//   };

//   const handleVendorMatching = async () => {
//     setIsMatchingVendors(true);
//     try {
//       const response = await fetch(`/api/rfp/${rfpId}/match-vendors`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         setShareMessage('Vendors matched successfully!');
//         setTimeout(() => setShareMessage(''), 3000);
//         // Redirect to vendors page
//         window.location.href = `/rfp/${rfpId}/vendors`;
//       } else {
//         setShareMessage(`Error: ${result.message}`);
//         setTimeout(() => setShareMessage(''), 5000);
//       }
//     } catch (error) {
//       console.error('Error matching vendors:', error);
//       setShareMessage('Failed to match vendors. Please try again.');
//       setTimeout(() => setShareMessage(''), 5000);
//     } finally {
//       setIsMatchingVendors(false);
//     }
//   };

//   const generateRfpText = () => {
//     if (!rfpData) return '';
    
//     return `
// REQUEST FOR PROPOSAL

// TABULAR INFORMATION
// Team Type: ${rfpData.teamType}
// Category: ${rfpData.category}
// Requirement Urgency: ${rfpData.requirementUrgency}
// Location Preference: ${rfpData.locationPreference}
// Contact Email: ${userEmail || rfpData.contactEmail}

// PROBLEM STATEMENT
// ${rfpData.problemStatement}

// OBJECTIVES
// ${rfpData.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

// KEY REQUIREMENTS
// ${rfpData.keyRequirements.map(req => `• ${req.head}: ${req.description}`).join('\n')}

// ADDITIONAL QUESTIONS
// ${rfpData.additionalQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
//     `.trim();
//   };

//   const renderEditField = (field, value, type = 'text') => {
//     const fieldConfig = {
//       teamType: { type: 'select', options: teamTypeOptions },
//       teamSize: { type: 'select', options: teamSizeOptions.map(opt => opt.label) },
//       category: { type: 'select', options: categoryData.map(cat => cat.shortName) },
//       locationPreference: { type: 'select', options: countries },
//       requirementUrgency: { type: 'select', options: timelineOptions }
//     };

//     const config = fieldConfig[field] || { type };

//     if (config.type === 'select') {
//       return (
//         <select
//           value={tempValue}
//           onChange={(e) => setTempValue(e.target.value)}
//           className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//         >
//           <option value="">Select an option</option>
//           {config.options.map((option) => (
//             <option key={option} value={option}>{option}</option>
//           ))}
//         </select>
//       );
//     }

//     return (
//       <input
//         type={type}
//         value={tempValue}
//         onChange={(e) => setTempValue(e.target.value)}
//         className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//       />
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
//           <p className="text-[#334155]">Loading your RFP...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!rfpData) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
//         <div className="text-center px-4">
//           <h2 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Not Found</h2>
//           <p className="text-[#334155] mb-6">The RFP you're looking for doesn't exist or has been removed.</p>
//           <Link 
//             href="/rfp"
//             className="inline-flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
//           >
//             Create New RFP
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-16 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
//           <div className="w-full lg:w-auto">
//             <h1 className="text-2xl lg:text-3xl font-bold text-[#1e2556] mb-2">Request for Proposal</h1>
//             <p className="text-[#334155]">Generated on {new Date(rfpData.createdAt).toLocaleDateString()}</p>
//             {shareMessage && (
//               <p className="text-green-600 text-sm mt-1">{shareMessage}</p>
//             )}
//           </div>
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
//             <button
//               onClick={handleVendorMatching}
//               disabled={isMatchingVendors}
//               className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//                 isMatchingVendors 
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-[#1e2556] text-white hover:bg-opacity-90'
//               }`}
//             >
//               {isMatchingVendors ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Finding Vendors...
//                 </>
//               ) : (
//                 <>
//                   <Target className="w-5 h-5 mr-2" />
//                   Find Vendors
//                 </>
//               )}
//             </button>
//             <button
//               onClick={shareLink}
//               className="flex items-center justify-center px-4 py-2 bg-gray-100 text-[#334155] rounded-lg hover:bg-gray-200 transition-all duration-200"
//             >
//               <Share2 className="w-4 h-4 mr-2" />
//               Share Link
//             </button>
//             <button
//               onClick={copyToClipboard}
//               className="flex items-center justify-center px-6 py-3 bg-[#7cc6ee] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
//             >
//               <Copy className="w-5 h-5 mr-2" />
//               Copy RFP
//             </button>
//             <Link
//               href="/rfp"
//               className="flex items-center justify-center px-4 py-2 bg-gray-200 text-[#334155] rounded-lg hover:bg-gray-300 transition-all duration-200"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New RFP
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="xl:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
//               <h3 className="text-lg font-semibold text-[#1e2556] mb-4">Sections</h3>
//               <nav className="space-y-2">
//                 {[
//                   { id: 'info', label: 'Key Information', icon: Building },
//                   { id: 'problem', label: 'Problem Statement', icon: FileText },
//                   { id: 'objectives', label: 'Objectives', icon: Target },
//                   { id: 'requirements', label: 'Key Requirements', icon: FileText },
//                   { id: 'questions', label: 'Additional Questions', icon: HelpCircle }
//                 ].map(({ id, label, icon: Icon }) => (
//                   <a
//                     key={id}
//                     href={`#${id}`}
//                     className="flex items-center px-3 py-2 text-[#334155] hover:text-[#1e2556] hover:bg-gray-50 rounded-lg transition-all duration-200"
//                   >
//                     <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
//                     <span className="text-sm">{label}</span>
//                   </a>
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="xl:col-span-3 space-y-8">
//             {/* Key Information */}
//             <section id="info" className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556] mb-6">Key Information</h2>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 {[
//                   { icon: Building, label: 'Team Type', field: 'teamType' },
//                   { icon: FileText, label: 'Category', field: 'category' },
//                   { icon: Calendar, label: 'Requirement Urgency', field: 'requirementUrgency' },
//                   { icon: MapPin, label: 'Location Preference', field: 'locationPreference' },
//                   { icon: Mail, label: 'Contact Email', field: 'contactEmail' }
//                 ].map(({ icon: Icon, label, field }) => (
//                   <div key={field} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div className="flex items-center flex-1 min-w-0">
//                       <Icon className="w-5 h-5 text-[#7cc6ee] mr-3 flex-shrink-0" />
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm text-[#334155] font-medium">{label}</p>
//                         {editingField === field ? (
//                           field === 'contactEmail' ? (
//                             <input
//                               type="email"
//                               value={tempValue}
//                               onChange={(e) => setTempValue(e.target.value)}
//                               className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                             />
//                           ) : (
//                             renderEditField(field, rfpData[field])
//                           )
//                         ) : (
//                           <p className="text-[#2d2d2d] truncate" title={field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field]}>
//                             {field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field]}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
//                       {editingField === field ? (
//                         <>
//                           <button
//                             onClick={() => handleSave(field)}
//                             disabled={isSaving}
//                             className="p-1 text-green-600 hover:bg-green-50 rounded"
//                           >
//                             <Check className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={handleCancel}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(field, field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field])}
//                           className="p-1 text-[#7cc6ee] hover:bg-blue-50 rounded"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Problem Statement */}
//             <section id="problem" className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
//                 <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Problem Statement</h2>
//                 {editingField === 'problemStatement' ? (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleSave('problemStatement')}
//                       disabled={isSaving}
//                       className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
//                     >
//                       <Save className="w-4 h-4 mr-1" />
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
//                     >
//                       <X className="w-4 h-4 mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit('problemStatement', rfpData.problemStatement)}
//                     className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Edit2 className="w-4 h-4 mr-1" />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editingField === 'problemStatement' ? (
//                 <textarea
//                   value={tempValue}
//                   onChange={(e) => setTempValue(e.target.value)}
//                   rows={6}
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                 />
//               ) : (
//                 <p className="text-[#2d2d2d] leading-relaxed">{rfpData.problemStatement}</p>
//               )}
//             </section>

//             {/* Objectives */}
//             <section id="objectives" className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
//                 <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Objectives</h2>
//                 {editingField === 'objectives' ? (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleSave('objectives')}
//                       disabled={isSaving}
//                       className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
//                     >
//                       <Save className="w-4 h-4 mr-1" />
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
//                     >
//                       <X className="w-4 h-4 mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit('objectives', rfpData.objectives)}
//                     className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Edit2 className="w-4 h-4 mr-1" />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editingField === 'objectives' ? (
//                 <div className="space-y-3">
//                   {tempArray.map((objective, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <span className="text-[#7cc6ee] font-medium flex-shrink-0">{index + 1}.</span>
//                       <input
//                         type="text"
//                         value={objective}
//                         onChange={(e) => updateArrayItem(index, e.target.value)}
//                         className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                       />
//                       <button
//                         onClick={() => removeArrayItem(index)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={addArrayItem}
//                     className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Plus className="w-4 h-4 mr-1" />
//                     Add Objective
//                   </button>
//                 </div>
//               ) : (
//                 <ul className="space-y-3">
//                   {rfpData.objectives.map((objective, index) => (
//                     <li key={index} className="flex items-start">
//                       <span className="text-[#7cc6ee] font-medium mr-3 flex-shrink-0 mt-0.5">{index + 1}.</span>
//                       <span className="text-[#2d2d2d]">{objective}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </section>

//             {/* Key Requirements */}
//             <section id="requirements" className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
//                 <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Key Requirements</h2>
//                 {editingField === 'keyRequirements' ? (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleSave('keyRequirements')}
//                       disabled={isSaving}
//                       className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
//                     >
//                       <Save className="w-4 h-4 mr-1" />
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
//                     >
//                       <X className="w-4 h-4 mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit('keyRequirements', rfpData.keyRequirements)}
//                     className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Edit2 className="w-4 h-4 mr-1" />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editingField === 'keyRequirements' ? (
//                 <div className="space-y-4">
//                   {tempArray.map((requirement, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <input
//                           type="text"
//                           value={requirement.head}
//                           onChange={(e) => updateKeyRequirement(index, 'head', e.target.value)}
//                           placeholder="Requirement heading"
//                           className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent mr-2"
//                         />
//                         <button
//                           onClick={() => removeArrayItem(index)}
//                           className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                       <textarea
//                         value={requirement.description}
//                         onChange={(e) => updateKeyRequirement(index, 'description', e.target.value)}
//                         placeholder="Requirement description"
//                         rows={3}
//                         className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                       />
//                     </div>
//                   ))}
//                   <button
//                     onClick={addKeyRequirement}
//                     className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Plus className="w-4 h-4 mr-1" />
//                     Add Requirement
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {rfpData.keyRequirements.map((requirement, index) => (
//                     <div key={index} className="border-l-4 border-[#7cc6ee] pl-4">
//                       <h4 className="font-semibold text-[#1e2556] mb-2">{requirement.head}</h4>
//                       <p className="text-[#2d2d2d]">{requirement.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Additional Questions */}
//             <section id="questions" className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
//                 <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Additional Questions</h2>
//                 {editingField === 'additionalQuestions' ? (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleSave('additionalQuestions')}
//                       disabled={isSaving}
//                       className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
//                     >
//                       <Save className="w-4 h-4 mr-1" />
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
//                     >
//                       <X className="w-4 h-4 mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit('additionalQuestions', rfpData.additionalQuestions)}
//                     className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Edit2 className="w-4 h-4 mr-1" />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editingField === 'additionalQuestions' ? (
//                 <div className="space-y-3">
//                   {tempArray.map((question, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <span className="text-[#7cc6ee] font-medium flex-shrink-0">{index + 1}.</span>
//                       <input
//                         type="text"
//                         value={question}
//                         onChange={(e) => updateArrayItem(index, e.target.value)}
//                         className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                       />
//                       <button
//                         onClick={() => removeArrayItem(index)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={addArrayItem}
//                     className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
//                   >
//                     <Plus className="w-4 h-4 mr-1" />
//                     Add Question
//                   </button>
//                 </div>
//               ) : (
//                 <ol className="space-y-2">
//                   {rfpData.additionalQuestions.map((question, index) => (
//                     <li key={index} className="flex items-start">
//                       <span className="text-[#7cc6ee] font-medium mr-3 flex-shrink-0 mt-0.5">{index + 1}.</span>
//                       <span className="text-[#2d2d2d]">{question}</span>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpDisplayEdit;
'use client'
import React, { useState, useEffect } from 'react';
import { Edit2, Save, Copy, Plus, Trash2, X, Check, Building, Calendar, MapPin, Mail, Target, FileText, Share2, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

// Import the same options from form
const categoryData = [
  { id: 'CONTRACT-LIFECYCLE-MANAGEMENT', shortName: 'Contracts' },
  { id: 'LEGAL-AI', shortName: 'Legal AI' },
  { id: 'DOCUMENT-MANAGEMENT-SYSTEM', shortName: 'Documents' },
  { id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS', shortName: 'Litigation' },
  { id: 'IP-MANAGEMENT', shortName: 'IP Management' },
  { id: 'LEGAL-RESEARCH', shortName: 'Research' },
  { id: 'E-DISCOVERY', shortName: 'E-Discovery' }
];

const teamSizeOptions = [
  { value: 1, label: "1 person" },
  { value: 20, label: "2-20 people" },
  { value: 50, label: "21-50 people" },
  { value: 200, label: "51-200 people" },
  { value: 500, label: "201-500 people" },
  { value: 501, label: "500+ people" },
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Singapore', 'Netherlands'
];

const teamTypeOptions = ['Law firm', 'Legal department'];

const timelineOptions = [
  'Immediately (0–3 months)',
  'Near future (3–6 months)', 
  'Exploring (6+ months)'
];

const RfpDisplayEdit = ({ rfpId }) => {
  const { userId } = useAuth();
  const [rfpData, setRfpData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [tempArray, setTempArray] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [isMatchingVendors, setIsMatchingVendors] = useState(false);

  useEffect(() => {
    fetchRfpData();
    if (userId) {
      fetchUserEmail();
    }
  }, [rfpId, userId]);

  const fetchRfpData = async () => {
    try {
      const response = await fetch(`/api/rfp/${rfpId}`);
      const data = await response.json();
      if (data.success) {
        setRfpData(data.data);
      } else {
        setRfpData(null);
      }
    } catch (error) {
      console.error('Error fetching RFP:', error);
      setRfpData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserEmail = async () => {
    try {
      const response = await fetch(`/api/user/email/${userId}`);
      const data = await response.json();
      if (data.success) {
        setUserEmail(data.email);
        // Update RFP with real email if it's still placeholder
        if (rfpData && rfpData.contactEmail.includes('user-') && data.email) {
          handleSave('contactEmail', data.email);
        }
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const handleEdit = (field, value) => {
    setEditingField(field);
    if (Array.isArray(value)) {
      setTempArray([...value]);
    } else {
      setTempValue(value);
    }
  };

  const handleSave = async (field, directValue = null) => {
    setIsSaving(true);
    try {
      const updateData = {};
      if (directValue !== null) {
        updateData[field] = directValue;
      } else if (Array.isArray(rfpData[field])) {
        updateData[field] = tempArray;
      } else {
        updateData[field] = tempValue;
      }

      const response = await fetch(`/api/rfp/${rfpId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const updatedData = await response.json();
        if (updatedData.success) {
          setRfpData(updatedData.data);
          setEditingField(null);
        }
      }
    } catch (error) {
      console.error('Error saving RFP:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setTempArray([]);
  };

  const addArrayItem = () => {
    setTempArray([...tempArray, '']);
  };

  const updateArrayItem = (index, value) => {
    const newArray = [...tempArray];
    newArray[index] = value;
    setTempArray(newArray);
  };

  const removeArrayItem = (index) => {
    setTempArray(tempArray.filter((_, i) => i !== index));
  };

  const addKeyRequirement = (type) => {
    if (type === 'keyFeatures') {
      setTempArray([...tempArray, { name: '', description: '' }]);
    } else {
      setTempArray([...tempArray, { name: '', description: '' }]);
    }
  };

  const updateKeyRequirement = (index, field, value) => {
    const newArray = [...tempArray];
    newArray[index][field] = value;
    setTempArray(newArray);
  };

  const copyToClipboard = () => {
    const rfpText = generateRfpText();
    navigator.clipboard.writeText(rfpText);
    setShareMessage('RFP copied to clipboard!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const shareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setShareMessage('Link copied to clipboard!');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const handleVendorMatching = async () => {
    setIsMatchingVendors(true);
    try {
      const response = await fetch(`/api/rfp/${rfpId}/match-vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setShareMessage('Vendors matched successfully!');
        setTimeout(() => setShareMessage(''), 3000);
        // Redirect to vendors page
        window.location.href = `/rfp/${rfpId}/vendors`;
      } else {
        setShareMessage(`Error: ${result.message}`);
        setTimeout(() => setShareMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error matching vendors:', error);
      setShareMessage('Failed to match vendors. Please try again.');
      setTimeout(() => setShareMessage(''), 5000);
    } finally {
      setIsMatchingVendors(false);
    }
  };

  const generateRfpText = () => {
    if (!rfpData) return '';
    
    return `
REQUEST FOR PROPOSAL

TABULAR INFORMATION
Team Type: ${rfpData.teamType}
Team Size: ${rfpData.teamSize}
Category: ${rfpData.category}
Requirement Urgency: ${rfpData.requirementUrgency}
Location Preference: ${rfpData.locationPreference}
Contact Email: ${userEmail || rfpData.contactEmail}

PROBLEM STATEMENT
${rfpData.problemStatement}

OBJECTIVES
${rfpData.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

KEY FEATURES
${rfpData.keyFeatures ? rfpData.keyFeatures.map(feature => `• ${feature.name}: ${feature.description}`).join('\n') : ''}

KEY FUNCTIONALITIES
${rfpData.keyFunctionalities ? rfpData.keyFunctionalities.map(func => `• ${func.name}: ${func.description}`).join('\n') : ''}
    `.trim();
  };

  const renderEditField = (field, value, type = 'text') => {
    const fieldConfig = {
      teamType: { type: 'select', options: teamTypeOptions },
      teamSize: { type: 'select', options: teamSizeOptions.map(opt => opt.label) },
      category: { type: 'select', options: categoryData.map(cat => cat.shortName) },
      locationPreference: { type: 'select', options: countries },
      requirementUrgency: { type: 'select', options: timelineOptions }
    };

    const config = fieldConfig[field] || { type };

    if (config.type === 'select') {
      return (
        <select
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
        >
          <option value="">Select an option</option>
          {config.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
      />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
          <p className="text-[#334155]">Loading your RFP...</p>
        </div>
      </div>
    );
  }

  if (!rfpData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Not Found</h2>
          <p className="text-[#334155] mb-6">The RFP you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/rfp"
            className="inline-flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
          >
            Create New RFP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1e2556] mb-2">Request for Proposal</h1>
            <p className="text-[#334155]">Generated on {new Date(rfpData.createdAt).toLocaleDateString()}</p>
            {shareMessage && (
              <p className="text-green-600 text-sm mt-1">{shareMessage}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
            <button
              onClick={handleVendorMatching}
              disabled={isMatchingVendors}
              className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isMatchingVendors 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#1e2556] text-white hover:bg-opacity-90'
              }`}
            >
              {isMatchingVendors ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Finding Vendors...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Find Vendors
                </>
              )}
            </button>
            <button
              onClick={shareLink}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-[#334155] rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-6 py-3 bg-[#7cc6ee] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              <Copy className="w-5 h-5 mr-2" />
              Copy RFP
            </button>
            <Link
              href="/rfp"
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-[#334155] rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              New RFP
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#1e2556] mb-4">Sections</h3>
              <nav className="space-y-2">
                {[
                  { id: 'info', label: 'Key Information', icon: Building },
                  { id: 'problem', label: 'Problem Statement', icon: FileText },
                  { id: 'objectives', label: 'Objectives', icon: Target },
                  { id: 'features', label: 'Key Features', icon: FileText },
                  { id: 'functionalities', label: 'Key Functionalities', icon: FileText }
                ].map(({ id, label, icon: Icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center px-3 py-2 text-[#334155] hover:text-[#1e2556] hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Key Information */}
            <section id="info" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556] mb-6">Key Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { icon: Building, label: 'Team Type', field: 'teamType' },
                  { icon: Users, label: 'Team Size', field: 'teamSize' },
                  { icon: FileText, label: 'Category', field: 'category' },
                  { icon: Calendar, label: 'Requirement Urgency', field: 'requirementUrgency' },
                  { icon: MapPin, label: 'Location Preference', field: 'locationPreference' },
                  { icon: Mail, label: 'Contact Email', field: 'contactEmail' }
                ].map(({ icon: Icon, label, field }) => (
                  <div key={field} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center flex-1 min-w-0">
                      <Icon className="w-5 h-5 text-[#7cc6ee] mr-3 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#334155] font-medium">{label}</p>
                        {editingField === field ? (
                          field === 'contactEmail' ? (
                            <input
                              type="email"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                            />
                          ) : (
                            renderEditField(field, rfpData[field])
                          )
                        ) : (
                          <p className="text-[#2d2d2d] truncate" title={field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field]}>
                            {field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                      {editingField === field ? (
                        <>
                          <button
                            onClick={() => handleSave(field)}
                            disabled={isSaving}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(field, field === 'contactEmail' ? (userEmail || rfpData[field]) : rfpData[field])}
                          className="p-1 text-[#7cc6ee] hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Problem Statement */}
            <section id="problem" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Problem Statement</h2>
                {editingField === 'problemStatement' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave('problemStatement')}
                      disabled={isSaving}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('problemStatement', rfpData.problemStatement)}
                    className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              {editingField === 'problemStatement' ? (
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                />
              ) : (
                <p className="text-[#2d2d2d] leading-relaxed">{rfpData.problemStatement}</p>
              )}
            </section>

            {/* Objectives */}
            <section id="objectives" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Objectives</h2>
                {editingField === 'objectives' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave('objectives')}
                      disabled={isSaving}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('objectives', rfpData.objectives)}
                    className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              {editingField === 'objectives' ? (
                <div className="space-y-3">
                  {tempArray.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-[#7cc6ee] font-medium flex-shrink-0">{index + 1}.</span>
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateArrayItem(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                      />
                      <button
                        onClick={() => removeArrayItem(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addArrayItem}
                    className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Objective
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {rfpData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#7cc6ee] font-medium mr-3 flex-shrink-0 mt-0.5">{index + 1}.</span>
                      <span className="text-[#2d2d2d]">{objective}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Key Features */}
            <section id="features" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Key Features</h2>
                {editingField === 'keyFeatures' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave('keyFeatures')}
                      disabled={isSaving}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('keyFeatures', rfpData.keyFeatures || [])}
                    className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              {editingField === 'keyFeatures' ? (
                <div className="space-y-4">
                  {tempArray.map((feature, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="text"
                          value={feature.name || ''}
                          onChange={(e) => updateKeyRequirement(index, 'name', e.target.value)}
                          placeholder="Feature name"
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent mr-2"
                        />
                        <button
                          onClick={() => removeArrayItem(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={feature.description || ''}
                        onChange={(e) => updateKeyRequirement(index, 'description', e.target.value)}
                        placeholder="Feature description"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addKeyRequirement('keyFeatures')}
                    className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(rfpData.keyFeatures || []).map((feature, index) => (
                    <div key={index} className="border-l-4 border-[#7cc6ee] pl-4">
                      <h4 className="font-semibold text-[#1e2556] mb-2">{feature.name}</h4>
                      <p className="text-[#2d2d2d]">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Key Functionalities */}
            <section id="functionalities" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-[#1e2556]">Key Functionalities</h2>
                {editingField === 'keyFunctionalities' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave('keyFunctionalities')}
                      disabled={isSaving}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('keyFunctionalities', rfpData.keyFunctionalities || [])}
                    className="flex items-center px-3 py-1 bg-[#7cc6ee] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              {editingField === 'keyFunctionalities' ? (
                <div className="space-y-4">
                  {tempArray.map((functionality, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="text"
                          value={functionality.name || ''}
                          onChange={(e) => updateKeyRequirement(index, 'name', e.target.value)}
                          placeholder="Functionality name"
                          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent mr-2"
                        />
                        <button
                          onClick={() => removeArrayItem(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={functionality.description || ''}
                        onChange={(e) => updateKeyRequirement(index, 'description', e.target.value)}
                        placeholder="Functionality description"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addKeyRequirement('keyFunctionalities')}
                    className="flex items-center px-3 py-1 bg-[#1e2556] text-white rounded text-sm hover:bg-opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Functionality
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(rfpData.keyFunctionalities || []).map((functionality, index) => (
                    <div key={index} className="border-l-4 border-[#00d4aa] pl-4">
                      <h4 className="font-semibold text-[#1e2556] mb-2">{functionality.name}</h4>
                      <p className="text-[#2d2d2d]">{functionality.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfpDisplayEdit;