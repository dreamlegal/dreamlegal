// // // import React, { useState } from 'react';
// // // import { ChevronDown, ChevronUp, Upload, Save } from 'lucide-react';

// // // const NewProductAdmin = () => {
// // //   const [jsonInput, setJsonInput] = useState('');
// // //   const [formData, setFormData] = useState(null);
// // //   const [expandedSections, setExpandedSections] = useState({
// // //     section1: true,
// // //     section2: true,
// // //     section3: true,
// // //     section4: true,
// // //     section5: true,
// // //     section6: true
// // //   });
// // //   const [errors, setErrors] = useState({});

// // //   const parseJSON = () => {
// // //     try {
// // //       const parsed = JSON.parse(jsonInput);
// // //       setErrors({});
      
// // //       // Transform the JSON data to match our form structure
// // //       const transformedData = {
// // //         // Section 1: Product Overview
// // //         productName: parsed.section1_product_overview?.sidebar_information?.product_name || '',
// // //         category: parsed.section1_product_overview?.sidebar_information?.category?.toUpperCase().replace(/ /g, '_') || '',
// // //         description: parsed.section1_product_overview?.sidebar_information?.description || '',
        
// // //         companyName: parsed.section1_product_overview?.company_information?.company_name || '',
// // //         headquarters: parsed.section1_product_overview?.company_information?.headquarters || '',
// // //         founded: parsed.section1_product_overview?.company_information?.founded || '',
// // //         founders: parsed.section1_product_overview?.company_information?.founders || '',
        
// // //         phone: parsed.section1_product_overview?.contact_information?.phone || '',
// // //         website: parsed.section1_product_overview?.contact_information?.website || '',
// // //         email: parsed.section1_product_overview?.contact_information?.email || '',
// // //         socialMedia: parsed.section1_product_overview?.contact_information?.social_media || '',
        
// // //         // Section 2: Detailed Overview
// // //         briefDescription: parsed.section2_detailed_overview?.brief_description || '',
// // //         targetUsers: parsed.section2_detailed_overview?.target_users || '',
// // //         primaryPurpose: parsed.section2_detailed_overview?.primary_purpose || '',
// // //         technologyStack: parsed.section2_detailed_overview?.technology_stack || '',
// // //         deploymentOptions: parsed.section2_detailed_overview?.deployment_options || '',
        
// // //         // Section 3: Functionality and Features
// // //         coreFunctionalities: parsed.section3_functionality_and_features?.core_functionalities || [],
// // //         keyFeatures: parsed.section3_functionality_and_features?.key_features || [],
// // //         lifecycleStages: parsed.section3_functionality_and_features?.lifecycle_stages_supported || [],
        
// // //         // Section 4: Pricing
// // //         pricingTier: parsed.section4_pricing?.pricing_tier || '',
// // //         startingPrice: parsed.section4_pricing?.pricing_details?.starting_price || '',
// // //         pricingModel: parsed.section4_pricing?.pricing_details?.pricing_model || '',
// // //         freeTrial: parsed.section4_pricing?.pricing_details?.free_trial || '',
// // //         customPricing: parsed.section4_pricing?.pricing_details?.custom_pricing || '',
        
// // //         // Section 5: Market Perception
// // //         bestKnownFor: parsed.section5_market_perception?.best_known_for || [],
// // //         criticalOpinions: parsed.section5_market_perception?.critical_opinions || [],
// // //         topUseCases: parsed.section5_market_perception?.top_use_cases || [],
// // //         userSatisfaction: parsed.section5_market_perception?.user_satisfaction || '',
        
// // //         // Section 6: Sources
// // //         sources: parsed.section6_sources || {}
// // //       };
      
// // //       setFormData(transformedData);
// // //     } catch (error) {
// // //       setErrors({ json: 'Invalid JSON format. Please check your input.' });
// // //     }
// // //   };

// // //   const toggleSection = (section) => {
// // //     setExpandedSections(prev => ({
// // //       ...prev,
// // //       [section]: !prev[section]
// // //     }));
// // //   };

// // //   const handleInputChange = (field, value) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [field]: value
// // //     }));
// // //   };

// // //   const handleArrayItemChange = (field, index, value) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [field]: prev[field].map((item, i) => i === index ? value : item)
// // //     }));
// // //   };

// // //   const handleAddArrayItem = (field) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [field]: [...prev[field], '']
// // //     }));
// // //   };

// // //   const handleRemoveArrayItem = (field, index) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [field]: prev[field].filter((_, i) => i !== index)
// // //     }));
// // //   };

// // //   const handleKeyFeatureChange = (index, field, value) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       keyFeatures: prev.keyFeatures.map((feature, i) => 
// // //         i === index ? { ...feature, [field]: value } : feature
// // //       )
// // //     }));
// // //   };

// // //   const handleAddKeyFeature = () => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       keyFeatures: [...prev.keyFeatures, { heading: '', description: '' }]
// // //     }));
// // //   };

// // //   const handleRemoveKeyFeature = (index) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
// // //     }));
// // //   };

// // //   const handleLifecycleStageChange = (index, field, value) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       lifecycleStages: prev.lifecycleStages.map((stage, i) => 
// // //         i === index ? { ...stage, [field]: value } : stage
// // //       )
// // //     }));
// // //   };

// // //   const handleSubmit = () => {
// // //     console.log('Form Data to be saved:', formData);
// // //     // API call will be implemented later
// // //   };

// // //   const categoryOptions = [
// // //     'CONTRACT_LIFECYCLE_MANAGEMENT',
// // //     'LEGAL_AI',
// // //     'DOCUMENT_MANAGEMENT_SYSTEM',
// // //     'LITIGATION_MANAGEMENT_AND_ANALYTICS',
// // //     'IP_MANAGEMENT',
// // //     'LEGAL_RESEARCH',
// // //     'E_DISCOVERY'
// // //   ];

// // //   const pricingTierOptions = [
// // //     { value: 'BUDGET', label: '$' },
// // //     { value: 'MID_RANGE', label: '$$' },
// // //     { value: 'PREMIUM', label: '$$$' },
// // //     { value: 'ENTERPRISE', label: '$$$+' }
// // //   ];

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-6">
// // //       <div className="max-w-7xl mx-auto">
// // //         <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e2556' }}>
// // //           Add Legal Software Product
// // //         </h1>

// // //         {/* JSON Upload Section */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //           <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
// // //             Upload Product JSON
// // //           </h2>
// // //           <div className="space-y-4">
// // //             <textarea
// // //               value={jsonInput}
// // //               onChange={(e) => setJsonInput(e.target.value)}
// // //               placeholder="Paste your product JSON here..."
// // //               className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               style={{ color: '#2d2d2d' }}
// // //             />
// // //             {errors.json && (
// // //               <p className="text-red-500 text-sm">{errors.json}</p>
// // //             )}
// // //             <button
// // //               onClick={parseJSON}
// // //               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
// // //               style={{ backgroundColor: '#1e2556' }}
// // //             >
// // //               <Upload size={20} />
// // //               Parse JSON
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Form Sections */}
// // //         {formData && (
// // //           <div className="space-y-6">
// // //             {/* Section 1: Product Overview */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section1')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 1: Product Overview
// // //                 </h2>
// // //                 {expandedSections.section1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section1 && (
// // //                 <div className="p-6 pt-0 space-y-6">
// // //                   {/* Sidebar Information */}
// // //                   <div>
// // //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// // //                       Sidebar Information
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Product Name
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.productName}
// // //                           onChange={(e) => handleInputChange('productName', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Category
// // //                         </label>
// // //                         <select
// // //                           value={formData.category}
// // //                           onChange={(e) => handleInputChange('category', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         >
// // //                           <option value="">Select a category</option>
// // //                           {categoryOptions.map(cat => (
// // //                             <option key={cat} value={cat}>
// // //                               {cat.replace(/_/g, ' ')}
// // //                             </option>
// // //                           ))}
// // //                         </select>
// // //                       </div>
// // //                       <div className="md:col-span-2">
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Description (140 words max)
// // //                         </label>
// // //                         <textarea
// // //                           value={formData.description}
// // //                           onChange={(e) => handleInputChange('description', e.target.value)}
// // //                           rows={4}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Company Information */}
// // //                   <div>
// // //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// // //                       Company Information
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Company Name
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.companyName}
// // //                           onChange={(e) => handleInputChange('companyName', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Headquarters
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.headquarters}
// // //                           onChange={(e) => handleInputChange('headquarters', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Founded
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.founded}
// // //                           onChange={(e) => handleInputChange('founded', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Founders
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.founders}
// // //                           onChange={(e) => handleInputChange('founders', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Contact Information */}
// // //                   <div>
// // //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// // //                       Contact Information
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Phone
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.phone}
// // //                           onChange={(e) => handleInputChange('phone', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Website
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.website}
// // //                           onChange={(e) => handleInputChange('website', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Email
// // //                         </label>
// // //                         <input
// // //                           type="email"
// // //                           value={formData.email}
// // //                           onChange={(e) => handleInputChange('email', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                           Social Media
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={formData.socialMedia}
// // //                           onChange={(e) => handleInputChange('socialMedia', e.target.value)}
// // //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                           style={{ color: '#2d2d2d' }}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Section 2: Detailed Overview */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section2')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 2: Detailed Overview
// // //                 </h2>
// // //                 {expandedSections.section2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section2 && (
// // //                 <div className="p-6 pt-0 space-y-4">
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Brief Description (200 words max)
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.briefDescription}
// // //                       onChange={(e) => handleInputChange('briefDescription', e.target.value)}
// // //                       rows={5}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Target Users
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.targetUsers}
// // //                       onChange={(e) => handleInputChange('targetUsers', e.target.value)}
// // //                       rows={3}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Primary Purpose
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.primaryPurpose}
// // //                       onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
// // //                       rows={3}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Technology Stack
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.technologyStack}
// // //                       onChange={(e) => handleInputChange('technologyStack', e.target.value)}
// // //                       rows={3}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Deployment Options
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.deploymentOptions}
// // //                       onChange={(e) => handleInputChange('deploymentOptions', e.target.value)}
// // //                       rows={2}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Section 3: Functionality and Features */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section3')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 3: Functionality and Features
// // //                 </h2>
// // //                 {expandedSections.section3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section3 && (
// // //                 <div className="p-6 pt-0 space-y-6">
// // //                   {/* Core Functionalities */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Core Functionalities
// // //                     </label>
// // //                     <div className="space-y-2">
// // //                       {formData.coreFunctionalities.map((func, index) => (
// // //                         <div key={index} className="flex gap-2">
// // //                           <input
// // //                             type="text"
// // //                             value={func}
// // //                             onChange={(e) => handleArrayItemChange('coreFunctionalities', index, e.target.value)}
// // //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                             style={{ color: '#2d2d2d' }}
// // //                           />
// // //                           <button
// // //                             onClick={() => handleRemoveArrayItem('coreFunctionalities', index)}
// // //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                             style={{ backgroundColor: '#ef4444' }}
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                       <button
// // //                         onClick={() => handleAddArrayItem('coreFunctionalities')}
// // //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                         style={{ backgroundColor: '#7cc6ee' }}
// // //                       >
// // //                         Add Functionality
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Key Features */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Key Features
// // //                     </label>
// // //                     <div className="space-y-4">
// // //                       {formData.keyFeatures.map((feature, index) => (
// // //                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
// // //                           <div className="space-y-3">
// // //                             <input
// // //                               type="text"
// // //                               value={feature.heading}
// // //                               onChange={(e) => handleKeyFeatureChange(index, 'heading', e.target.value)}
// // //                               placeholder="Feature Heading"
// // //                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             />
// // //                             <textarea
// // //                               value={feature.description}
// // //                               onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
// // //                               placeholder="Feature Description"
// // //                               rows={3}
// // //                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             />
// // //                             <button
// // //                               onClick={() => handleRemoveKeyFeature(index)}
// // //                               className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                               style={{ backgroundColor: '#ef4444' }}
// // //                             >
// // //                               Remove Feature
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                       <button
// // //                         onClick={handleAddKeyFeature}
// // //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                         style={{ backgroundColor: '#7cc6ee' }}
// // //                       >
// // //                         Add Key Feature
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Lifecycle Stages */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Lifecycle Stages Supported
// // //                     </label>
// // //                     <div className="space-y-4">
// // //                       {formData.lifecycleStages.map((stage, index) => (
// // //                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
// // //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // //                             <input
// // //                               type="number"
// // //                               value={stage.stage_number}
// // //                               onChange={(e) => handleLifecycleStageChange(index, 'stage_number', parseInt(e.target.value))}
// // //                               placeholder="Stage Number"
// // //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             />
// // //                             <input
// // //                               type="text"
// // //                               value={stage.stage_name}
// // //                               onChange={(e) => handleLifecycleStageChange(index, 'stage_name', e.target.value)}
// // //                               placeholder="Stage Name"
// // //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             />
// // //                             <select
// // //                               value={stage.impact_level}
// // //                               onChange={(e) => handleLifecycleStageChange(index, 'impact_level', e.target.value)}
// // //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             >
// // //                               <option value="">Select Impact Level</option>
// // //                               <option value="Low">Low</option>
// // //                               <option value="Medium">Medium</option>
// // //                               <option value="High">High</option>
// // //                             </select>
// // //                             <textarea
// // //                               value={stage.feature_impact_description}
// // //                               onChange={(e) => handleLifecycleStageChange(index, 'feature_impact_description', e.target.value)}
// // //                               placeholder="Feature Impact Description"
// // //                               rows={2}
// // //                               className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                               style={{ color: '#2d2d2d' }}
// // //                             />
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Section 4: Pricing */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section4')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 4: Pricing
// // //                 </h2>
// // //                 {expandedSections.section4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section4 && (
// // //                 <div className="p-6 pt-0">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                         Pricing Tier
// // //                       </label>
// // //                       <select
// // //                         value={formData.pricingTier}
// // //                         onChange={(e) => handleInputChange('pricingTier', e.target.value)}
// // //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                         style={{ color: '#2d2d2d' }}
// // //                       >
// // //                         <option value="">Select Pricing Tier</option>
// // //                         {pricingTierOptions.map(option => (
// // //                           <option key={option.value} value={option.value}>
// // //                             {option.label}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                         Starting Price
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={formData.startingPrice}
// // //                         onChange={(e) => handleInputChange('startingPrice', e.target.value)}
// // //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                         style={{ color: '#2d2d2d' }}
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                         Pricing Model
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={formData.pricingModel}
// // //                         onChange={(e) => handleInputChange('pricingModel', e.target.value)}
// // //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                         style={{ color: '#2d2d2d' }}
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                         Free Trial
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={formData.freeTrial}
// // //                         onChange={(e) => handleInputChange('freeTrial', e.target.value)}
// // //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                         style={{ color: '#2d2d2d' }}
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                         Custom Pricing
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={formData.customPricing}
// // //                         onChange={(e) => handleInputChange('customPricing', e.target.value)}
// // //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                         style={{ color: '#2d2d2d' }}
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Section 5: Market Perception */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section5')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 5: Market Perception
// // //                 </h2>
// // //                 {expandedSections.section5 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section5 && (
// // //                 <div className="p-6 pt-0 space-y-6">
// // //                   {/* Best Known For */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Best Known For
// // //                     </label>
// // //                     <div className="space-y-2">
// // //                       {formData.bestKnownFor.map((item, index) => (
// // //                         <div key={index} className="flex gap-2">
// // //                           <input
// // //                             type="text"
// // //                             value={item}
// // //                             onChange={(e) => handleArrayItemChange('bestKnownFor', index, e.target.value)}
// // //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                             style={{ color: '#2d2d2d' }}
// // //                           />
// // //                           <button
// // //                             onClick={() => handleRemoveArrayItem('bestKnownFor', index)}
// // //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                             style={{ backgroundColor: '#ef4444' }}
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                       <button
// // //                         onClick={() => handleAddArrayItem('bestKnownFor')}
// // //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                         style={{ backgroundColor: '#7cc6ee' }}
// // //                       >
// // //                         Add Item
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Critical Opinions */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Critical Opinions
// // //                     </label>
// // //                     <div className="space-y-2">
// // //                       {formData.criticalOpinions.map((item, index) => (
// // //                         <div key={index} className="flex gap-2">
// // //                           <input
// // //                             type="text"
// // //                             value={item}
// // //                             onChange={(e) => handleArrayItemChange('criticalOpinions', index, e.target.value)}
// // //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                             style={{ color: '#2d2d2d' }}
// // //                           />
// // //                           <button
// // //                             onClick={() => handleRemoveArrayItem('criticalOpinions', index)}
// // //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                             style={{ backgroundColor: '#ef4444' }}
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                       <button
// // //                         onClick={() => handleAddArrayItem('criticalOpinions')}
// // //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                         style={{ backgroundColor: '#7cc6ee' }}
// // //                       >
// // //                         Add Opinion
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Top Use Cases */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       Top Use Cases
// // //                     </label>
// // //                     <div className="space-y-2">
// // //                       {formData.topUseCases.map((item, index) => (
// // //                         <div key={index} className="flex gap-2">
// // //                           <input
// // //                             type="text"
// // //                             value={item}
// // //                             onChange={(e) => handleArrayItemChange('topUseCases', index, e.target.value)}
// // //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                             style={{ color: '#2d2d2d' }}
// // //                           />
// // //                           <button
// // //                             onClick={() => handleRemoveArrayItem('topUseCases', index)}
// // //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                             style={{ backgroundColor: '#ef4444' }}
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                       <button
// // //                         onClick={() => handleAddArrayItem('topUseCases')}
// // //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// // //                         style={{ backgroundColor: '#7cc6ee' }}
// // //                       >
// // //                         Add Use Case
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* User Satisfaction */}
// // //                   <div>
// // //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// // //                       User Satisfaction
// // //                     </label>
// // //                     <textarea
// // //                       value={formData.userSatisfaction}
// // //                       onChange={(e) => handleInputChange('userSatisfaction', e.target.value)}
// // //                       rows={4}
// // //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                       style={{ color: '#2d2d2d' }}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Section 6: Sources */}
// // //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// // //               <button
// // //                 onClick={() => toggleSection('section6')}
// // //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// // //               >
// // //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// // //                   Section 6: Sources
// // //                 </h2>
// // //                 {expandedSections.section6 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// // //               </button>
              
// // //               {expandedSections.section6 && (
// // //                 <div className="p-6 pt-0">
// // //                   <div className="p-4 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
// // //                     <pre className="whitespace-pre-wrap text-sm" style={{ color: '#2d2d2d' }}>
// // //                       {JSON.stringify(formData.sources, null, 2)}
// // //                     </pre>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Submit Button */}
// // //             <div className="flex justify-end">
// // //               <button
// // //                 onClick={handleSubmit}
// // //                 className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
// // //                 style={{ backgroundColor: '#1e2556' }}
// // //               >
// // //                 <Save size={20} />
// // //                 Save Product
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NewProductAdmin;
// // import React, { useState } from 'react';
// // import { ChevronDown, ChevronUp, Upload, Save } from 'lucide-react';

// // const NewProductAdmin = () => {
// //   const [jsonInput, setJsonInput] = useState('');
// //   const [formData, setFormData] = useState(null);
// //   const [expandedSections, setExpandedSections] = useState({
// //     section1: true,
// //     section2: true,
// //     section3: true,
// //     section4: true,
// //     section5: true,
// //     section6: true
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');

// //   const parseJSON = () => {
// //     try {
// //       const parsed = JSON.parse(jsonInput);
// //       setErrors({});
      
// //       // Transform the JSON data to match our form structure
// //       const transformedData = {
// //         // Section 1: Product Overview
// //         productName: parsed.section1_product_overview?.sidebar_information?.product_name || '',
// //         category: parsed.section1_product_overview?.sidebar_information?.category?.toUpperCase().replace(/ /g, '_') || '',
// //         description: parsed.section1_product_overview?.sidebar_information?.description || '',
        
// //         companyName: parsed.section1_product_overview?.company_information?.company_name || '',
// //         headquarters: parsed.section1_product_overview?.company_information?.headquarters || '',
// //         founded: parsed.section1_product_overview?.company_information?.founded || '',
// //         founders: parsed.section1_product_overview?.company_information?.founders || '',
        
// //         phone: parsed.section1_product_overview?.contact_information?.phone || '',
// //         website: parsed.section1_product_overview?.contact_information?.website || '',
// //         email: parsed.section1_product_overview?.contact_information?.email || '',
// //         socialMedia: parsed.section1_product_overview?.contact_information?.social_media || '',
        
// //         // Section 2: Detailed Overview
// //         briefDescription: parsed.section2_detailed_overview?.brief_description || '',
// //         targetUsers: parsed.section2_detailed_overview?.target_users || '',
// //         primaryPurpose: parsed.section2_detailed_overview?.primary_purpose || '',
// //         technologyStack: parsed.section2_detailed_overview?.technology_stack || '',
// //         deploymentOptions: parsed.section2_detailed_overview?.deployment_options || '',
        
// //         // Section 3: Functionality and Features
// //         coreFunctionalities: parsed.section3_functionality_and_features?.core_functionalities || [],
// //         keyFeatures: parsed.section3_functionality_and_features?.key_features || [],
// //         lifecycleStages: parsed.section3_functionality_and_features?.lifecycle_stages_supported || [],
        
// //         // Section 4: Pricing
// //         pricingTier: parsed.section4_pricing?.pricing_tier || '',
// //         startingPrice: parsed.section4_pricing?.pricing_details?.starting_price || '',
// //         pricingModel: parsed.section4_pricing?.pricing_details?.pricing_model || '',
// //         freeTrial: parsed.section4_pricing?.pricing_details?.free_trial || '',
// //         customPricing: parsed.section4_pricing?.pricing_details?.custom_pricing || '',
        
// //         // Section 5: Market Perception
// //         bestKnownFor: parsed.section5_market_perception?.best_known_for || [],
// //         criticalOpinions: parsed.section5_market_perception?.critical_opinions || [],
// //         topUseCases: parsed.section5_market_perception?.top_use_cases || [],
// //         userSatisfaction: parsed.section5_market_perception?.user_satisfaction || '',
        
// //         // Section 6: Sources
// //         sources: parsed.section6_sources || {}
// //       };
      
// //       setFormData(transformedData);
// //     } catch (error) {
// //       setErrors({ json: 'Invalid JSON format. Please check your input.' });
// //     }
// //   };

// //   const toggleSection = (section) => {
// //     setExpandedSections(prev => ({
// //       ...prev,
// //       [section]: !prev[section]
// //     }));
// //   };

// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   const handleArrayItemChange = (field, index, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: prev[field].map((item, i) => i === index ? value : item)
// //     }));
// //   };

// //   const handleAddArrayItem = (field) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: [...prev[field], '']
// //     }));
// //   };

// //   const handleRemoveArrayItem = (field, index) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: prev[field].filter((_, i) => i !== index)
// //     }));
// //   };

// //   const handleKeyFeatureChange = (index, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       keyFeatures: prev.keyFeatures.map((feature, i) => 
// //         i === index ? { ...feature, [field]: value } : feature
// //       )
// //     }));
// //   };

// //   const handleAddKeyFeature = () => {
// //     setFormData(prev => ({
// //       ...prev,
// //       keyFeatures: [...prev.keyFeatures, { heading: '', description: '' }]
// //     }));
// //   };

// //   const handleRemoveKeyFeature = (index) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
// //     }));
// //   };

// //   const handleLifecycleStageChange = (index, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       lifecycleStages: prev.lifecycleStages.map((stage, i) => 
// //         i === index ? { ...stage, [field]: value } : stage
// //       )
// //     }));
// //   };

// //   const handleSourceCategoryChange = (oldCategory, newCategory) => {
// //     setFormData(prev => {
// //       const newSources = { ...prev.sources };
// //       if (oldCategory !== newCategory && newSources[oldCategory]) {
// //         newSources[newCategory] = newSources[oldCategory];
// //         delete newSources[oldCategory];
// //       }
// //       return { ...prev, sources: newSources };
// //     });
// //   };

// //   const handleSourceUrlChange = (category, index, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       sources: {
// //         ...prev.sources,
// //         [category]: prev.sources[category].map((url, i) => i === index ? value : url)
// //       }
// //     }));
// //   };

// //   const handleAddSourceUrl = (category) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       sources: {
// //         ...prev.sources,
// //         [category]: [...(prev.sources[category] || []), '']
// //       }
// //     }));
// //   };

// //   const handleRemoveSourceUrl = (category, index) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       sources: {
// //         ...prev.sources,
// //         [category]: prev.sources[category].filter((_, i) => i !== index)
// //       }
// //     }));
// //   };

// //   const handleAddSourceCategory = () => {
// //     const newCategory = 'new_category';
// //     setFormData(prev => ({
// //       ...prev,
// //       sources: {
// //         ...prev.sources,
// //         [newCategory]: []
// //       }
// //     }));
// //   };

// //   const handleRemoveSourceCategory = (category) => {
// //     setFormData(prev => {
// //       const newSources = { ...prev.sources };
// //       delete newSources[category];
// //       return { ...prev, sources: newSources };
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     setIsSubmitting(true);
// //     setErrors({});
// //     setSuccessMessage('');

// //     try {
// //       // Transform pricingTier if it's in symbol format
// //       const pricingTierMap = {
// //         '$': 'BUDGET',
// //         '$$': 'MID_RANGE',
// //         '$$$': 'PREMIUM',
// //         '$$$+': 'ENTERPRISE'
// //       };

// //       const transformedData = {
// //         ...formData,
// //         pricingTier: pricingTierMap[formData.pricingTier] || formData.pricingTier,
// //         socialMedia: formData.socialMedia || null,
// //         phone: formData.phone || null,
// //         website: formData.website || null,
// //         email: formData.email || null,
// //         founders: formData.founders || null,
// //         startingPrice: formData.startingPrice || null,
// //         pricingModel: formData.pricingModel || null,
// //         freeTrial: formData.freeTrial || null,
// //         customPricing: formData.customPricing || null,
// //         sources: JSON.stringify(formData.sources)
// //       };

// //       const response = await fetch('/api/add-legal-software', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(transformedData),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.error || 'Failed to save product');
// //       }

// //       setSuccessMessage('Product saved successfully!');
// //       // Reset form after successful submission
// //       setTimeout(() => {
// //         setFormData(null);
// //         setJsonInput('');
// //         setSuccessMessage('');
// //       }, 3000);
// //     } catch (error) {
// //       setErrors({ submit: error.message });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const categoryOptions = [
// //     'CONTRACT_LIFECYCLE_MANAGEMENT',
// //     'LEGAL_AI',
// //     'DOCUMENT_MANAGEMENT_SYSTEM',
// //     'LITIGATION_MANAGEMENT_AND_ANALYTICS',
// //     'IP_MANAGEMENT',
// //     'LEGAL_RESEARCH',
// //     'E_DISCOVERY'
// //   ];

// //   const pricingTierOptions = [
// //     { value: 'BUDGET', label: '$' },
// //     { value: 'MID_RANGE', label: '$$' },
// //     { value: 'PREMIUM', label: '$$$' },
// //     { value: 'ENTERPRISE', label: '$$$+' }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e2556' }}>
// //           Add Legal Software Product
// //         </h1>

// //         {/* JSON Upload Section */}
// //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //           <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
// //             Upload Product JSON
// //           </h2>
// //           <div className="space-y-4">
// //             <textarea
// //               value={jsonInput}
// //               onChange={(e) => setJsonInput(e.target.value)}
// //               placeholder="Paste your product JSON here..."
// //               className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               style={{ color: '#2d2d2d' }}
// //             />
// //             {errors.json && (
// //               <p className="text-red-500 text-sm">{errors.json}</p>
// //             )}
// //             <button
// //               onClick={parseJSON}
// //               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
// //               style={{ backgroundColor: '#1e2556' }}
// //             >
// //               <Upload size={20} />
// //               Parse JSON
// //             </button>
// //           </div>
// //         </div>

// //         {/* Form Sections */}
// //         {formData && (
// //           <div className="space-y-6">
// //             {/* Section 1: Product Overview */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section1')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 1: Product Overview
// //                 </h2>
// //                 {expandedSections.section1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section1 && (
// //                 <div className="p-6 pt-0 space-y-6">
// //                   {/* Sidebar Information */}
// //                   <div>
// //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// //                       Sidebar Information
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Product Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.productName}
// //                           onChange={(e) => handleInputChange('productName', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Category
// //                         </label>
// //                         <select
// //                           value={formData.category}
// //                           onChange={(e) => handleInputChange('category', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         >
// //                           <option value="">Select a category</option>
// //                           {categoryOptions.map(cat => (
// //                             <option key={cat} value={cat}>
// //                               {cat.replace(/_/g, ' ')}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                       <div className="md:col-span-2">
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Description (140 words max)
// //                         </label>
// //                         <textarea
// //                           value={formData.description}
// //                           onChange={(e) => handleInputChange('description', e.target.value)}
// //                           rows={4}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Company Information */}
// //                   <div>
// //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// //                       Company Information
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Company Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.companyName}
// //                           onChange={(e) => handleInputChange('companyName', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Headquarters
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.headquarters}
// //                           onChange={(e) => handleInputChange('headquarters', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Founded
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.founded}
// //                           onChange={(e) => handleInputChange('founded', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Founders
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.founders}
// //                           onChange={(e) => handleInputChange('founders', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Contact Information */}
// //                   <div>
// //                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
// //                       Contact Information
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Phone
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.phone}
// //                           onChange={(e) => handleInputChange('phone', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Website
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.website}
// //                           onChange={(e) => handleInputChange('website', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Email
// //                         </label>
// //                         <input
// //                           type="email"
// //                           value={formData.email}
// //                           onChange={(e) => handleInputChange('email', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                           Social Media
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={formData.socialMedia}
// //                           onChange={(e) => handleInputChange('socialMedia', e.target.value)}
// //                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                           style={{ color: '#2d2d2d' }}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Section 2: Detailed Overview */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section2')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 2: Detailed Overview
// //                 </h2>
// //                 {expandedSections.section2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section2 && (
// //                 <div className="p-6 pt-0 space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Brief Description (200 words max)
// //                     </label>
// //                     <textarea
// //                       value={formData.briefDescription}
// //                       onChange={(e) => handleInputChange('briefDescription', e.target.value)}
// //                       rows={5}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Target Users
// //                     </label>
// //                     <textarea
// //                       value={formData.targetUsers}
// //                       onChange={(e) => handleInputChange('targetUsers', e.target.value)}
// //                       rows={3}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Primary Purpose
// //                     </label>
// //                     <textarea
// //                       value={formData.primaryPurpose}
// //                       onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
// //                       rows={3}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Technology Stack
// //                     </label>
// //                     <textarea
// //                       value={formData.technologyStack}
// //                       onChange={(e) => handleInputChange('technologyStack', e.target.value)}
// //                       rows={3}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Deployment Options
// //                     </label>
// //                     <textarea
// //                       value={formData.deploymentOptions}
// //                       onChange={(e) => handleInputChange('deploymentOptions', e.target.value)}
// //                       rows={2}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Section 3: Functionality and Features */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section3')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 3: Functionality and Features
// //                 </h2>
// //                 {expandedSections.section3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section3 && (
// //                 <div className="p-6 pt-0 space-y-6">
// //                   {/* Core Functionalities */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Core Functionalities
// //                     </label>
// //                     <div className="space-y-2">
// //                       {formData.coreFunctionalities.map((func, index) => (
// //                         <div key={index} className="flex gap-2">
// //                           <input
// //                             type="text"
// //                             value={func}
// //                             onChange={(e) => handleArrayItemChange('coreFunctionalities', index, e.target.value)}
// //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                             style={{ color: '#2d2d2d' }}
// //                           />
// //                           <button
// //                             onClick={() => handleRemoveArrayItem('coreFunctionalities', index)}
// //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                             style={{ backgroundColor: '#ef4444' }}
// //                           >
// //                             Remove
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => handleAddArrayItem('coreFunctionalities')}
// //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                         style={{ backgroundColor: '#7cc6ee' }}
// //                       >
// //                         Add Functionality
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Key Features */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Key Features
// //                     </label>
// //                     <div className="space-y-4">
// //                       {formData.keyFeatures.map((feature, index) => (
// //                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
// //                           <div className="space-y-3">
// //                             <input
// //                               type="text"
// //                               value={feature.heading}
// //                               onChange={(e) => handleKeyFeatureChange(index, 'heading', e.target.value)}
// //                               placeholder="Feature Heading"
// //                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             />
// //                             <textarea
// //                               value={feature.description}
// //                               onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
// //                               placeholder="Feature Description"
// //                               rows={3}
// //                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             />
// //                             <button
// //                               onClick={() => handleRemoveKeyFeature(index)}
// //                               className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                               style={{ backgroundColor: '#ef4444' }}
// //                             >
// //                               Remove Feature
// //                             </button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={handleAddKeyFeature}
// //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                         style={{ backgroundColor: '#7cc6ee' }}
// //                       >
// //                         Add Key Feature
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Lifecycle Stages */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Lifecycle Stages Supported
// //                     </label>
// //                     <div className="space-y-4">
// //                       {formData.lifecycleStages.map((stage, index) => (
// //                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                             <input
// //                               type="number"
// //                               value={stage.stage_number}
// //                               onChange={(e) => handleLifecycleStageChange(index, 'stage_number', parseInt(e.target.value))}
// //                               placeholder="Stage Number"
// //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             />
// //                             <input
// //                               type="text"
// //                               value={stage.stage_name}
// //                               onChange={(e) => handleLifecycleStageChange(index, 'stage_name', e.target.value)}
// //                               placeholder="Stage Name"
// //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             />
// //                             <select
// //                               value={stage.impact_level}
// //                               onChange={(e) => handleLifecycleStageChange(index, 'impact_level', e.target.value)}
// //                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             >
// //                               <option value="">Select Impact Level</option>
// //                               <option value="Low">Low</option>
// //                               <option value="Medium">Medium</option>
// //                               <option value="High">High</option>
// //                             </select>
// //                             <textarea
// //                               value={stage.feature_impact_description}
// //                               onChange={(e) => handleLifecycleStageChange(index, 'feature_impact_description', e.target.value)}
// //                               placeholder="Feature Impact Description"
// //                               rows={2}
// //                               className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                               style={{ color: '#2d2d2d' }}
// //                             />
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Section 4: Pricing */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section4')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 4: Pricing
// //                 </h2>
// //                 {expandedSections.section4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section4 && (
// //                 <div className="p-6 pt-0">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                         Pricing Tier
// //                       </label>
// //                       <select
// //                         value={formData.pricingTier}
// //                         onChange={(e) => handleInputChange('pricingTier', e.target.value)}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                         style={{ color: '#2d2d2d' }}
// //                       >
// //                         <option value="">Select Pricing Tier</option>
// //                         {pricingTierOptions.map(option => (
// //                           <option key={option.value} value={option.value}>
// //                             {option.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                         Starting Price
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={formData.startingPrice}
// //                         onChange={(e) => handleInputChange('startingPrice', e.target.value)}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                         style={{ color: '#2d2d2d' }}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                         Pricing Model
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={formData.pricingModel}
// //                         onChange={(e) => handleInputChange('pricingModel', e.target.value)}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                         style={{ color: '#2d2d2d' }}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                         Free Trial
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={formData.freeTrial}
// //                         onChange={(e) => handleInputChange('freeTrial', e.target.value)}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                         style={{ color: '#2d2d2d' }}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                         Custom Pricing
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={formData.customPricing}
// //                         onChange={(e) => handleInputChange('customPricing', e.target.value)}
// //                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                         style={{ color: '#2d2d2d' }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Section 5: Market Perception */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section5')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 5: Market Perception
// //                 </h2>
// //                 {expandedSections.section5 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section5 && (
// //                 <div className="p-6 pt-0 space-y-6">
// //                   {/* Best Known For */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Best Known For
// //                     </label>
// //                     <div className="space-y-2">
// //                       {formData.bestKnownFor.map((item, index) => (
// //                         <div key={index} className="flex gap-2">
// //                           <input
// //                             type="text"
// //                             value={item}
// //                             onChange={(e) => handleArrayItemChange('bestKnownFor', index, e.target.value)}
// //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                             style={{ color: '#2d2d2d' }}
// //                           />
// //                           <button
// //                             onClick={() => handleRemoveArrayItem('bestKnownFor', index)}
// //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                             style={{ backgroundColor: '#ef4444' }}
// //                           >
// //                             Remove
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => handleAddArrayItem('bestKnownFor')}
// //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                         style={{ backgroundColor: '#7cc6ee' }}
// //                       >
// //                         Add Item
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Critical Opinions */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Critical Opinions
// //                     </label>
// //                     <div className="space-y-2">
// //                       {formData.criticalOpinions.map((item, index) => (
// //                         <div key={index} className="flex gap-2">
// //                           <input
// //                             type="text"
// //                             value={item}
// //                             onChange={(e) => handleArrayItemChange('criticalOpinions', index, e.target.value)}
// //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                             style={{ color: '#2d2d2d' }}
// //                           />
// //                           <button
// //                             onClick={() => handleRemoveArrayItem('criticalOpinions', index)}
// //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                             style={{ backgroundColor: '#ef4444' }}
// //                           >
// //                             Remove
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => handleAddArrayItem('criticalOpinions')}
// //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                         style={{ backgroundColor: '#7cc6ee' }}
// //                       >
// //                         Add Opinion
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Top Use Cases */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       Top Use Cases
// //                     </label>
// //                     <div className="space-y-2">
// //                       {formData.topUseCases.map((item, index) => (
// //                         <div key={index} className="flex gap-2">
// //                           <input
// //                             type="text"
// //                             value={item}
// //                             onChange={(e) => handleArrayItemChange('topUseCases', index, e.target.value)}
// //                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                             style={{ color: '#2d2d2d' }}
// //                           />
// //                           <button
// //                             onClick={() => handleRemoveArrayItem('topUseCases', index)}
// //                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                             style={{ backgroundColor: '#ef4444' }}
// //                           >
// //                             Remove
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => handleAddArrayItem('topUseCases')}
// //                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                         style={{ backgroundColor: '#7cc6ee' }}
// //                       >
// //                         Add Use Case
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* User Satisfaction */}
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
// //                       User Satisfaction
// //                     </label>
// //                     <textarea
// //                       value={formData.userSatisfaction}
// //                       onChange={(e) => handleInputChange('userSatisfaction', e.target.value)}
// //                       rows={4}
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                       style={{ color: '#2d2d2d' }}
// //                     />
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Section 6: Sources */}
// //             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
// //               <button
// //                 onClick={() => toggleSection('section6')}
// //                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
// //               >
// //                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
// //                   Section 6: Sources
// //                 </h2>
// //                 {expandedSections.section6 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
// //               </button>
              
// //               {expandedSections.section6 && (
// //                 <div className="p-6 pt-0">
// //                   <div className="space-y-4">
// //                     {Object.entries(formData.sources).map(([category, urls]) => (
// //                       <div key={category} className="p-4 border border-gray-200 rounded-lg">
// //                         <div className="mb-3">
// //                           <input
// //                             type="text"
// //                             value={category}
// //                             onChange={(e) => handleSourceCategoryChange(category, e.target.value)}
// //                             className="text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
// //                             style={{ color: '#334155' }}
// //                           />
// //                           <button
// //                             onClick={() => handleRemoveSourceCategory(category)}
// //                             className="ml-3 px-3 py-1 text-sm text-white rounded hover:opacity-90"
// //                             style={{ backgroundColor: '#ef4444' }}
// //                           >
// //                             Remove Category
// //                           </button>
// //                         </div>
// //                         <div className="space-y-2">
// //                           {Array.isArray(urls) && urls.map((url, index) => (
// //                             <div key={index} className="flex gap-2">
// //                               <input
// //                                 type="url"
// //                                 value={url}
// //                                 onChange={(e) => handleSourceUrlChange(category, index, e.target.value)}
// //                                 placeholder="Enter URL"
// //                                 className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// //                                 style={{ color: '#2d2d2d' }}
// //                               />
// //                               <button
// //                                 onClick={() => handleRemoveSourceUrl(category, index)}
// //                                 className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                                 style={{ backgroundColor: '#ef4444' }}
// //                               >
// //                                 Remove
// //                               </button>
// //                             </div>
// //                           ))}
// //                           <button
// //                             onClick={() => handleAddSourceUrl(category)}
// //                             className="px-4 py-2 text-sm text-white rounded hover:opacity-90"
// //                             style={{ backgroundColor: '#7cc6ee' }}
// //                           >
// //                             Add URL
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                     <button
// //                       onClick={handleAddSourceCategory}
// //                       className="px-4 py-2 text-white rounded-lg hover:opacity-90"
// //                       style={{ backgroundColor: '#7cc6ee' }}
// //                     >
// //                       Add Source Category
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Submit Button */}
// //             <div className="flex justify-end items-center gap-4">
// //               {successMessage && (
// //                 <p className="text-green-600 font-medium">{successMessage}</p>
// //               )}
// //               {errors.submit && (
// //                 <p className="text-red-600 font-medium">{errors.submit}</p>
// //               )}
// //               <button
// //                 onClick={handleSubmit}
// //                 disabled={isSubmitting}
// //                 className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
// //                 style={{ backgroundColor: '#1e2556' }}
// //               >
// //                 <Save size={20} />
// //                 {isSubmitting ? 'Saving...' : 'Save Product'}
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NewProductAdmin;
// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, Upload, Save, Image as ImageIcon, X } from 'lucide-react';

// const LegalSoftwareAdmin = () => {
//   const [jsonInput, setJsonInput] = useState('');
//   const [formData, setFormData] = useState(null);
//   const [expandedSections, setExpandedSections] = useState({
//     section1: true,
//     section2: true,
//     section3: true,
//     section4: true,
//     section5: true,
//     section6: true
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [isUploadingImage, setIsUploadingImage] = useState(false);

//   const parseJSON = () => {
//     try {
//       const parsed = JSON.parse(jsonInput);
//       setErrors({});
      
//       // Transform the JSON data to match our form structure
//       const transformedData = {
//         // Section 1: Product Overview
//         logoUrl: '', // Logo will be uploaded separately
//         productName: parsed.section1_product_overview?.sidebar_information?.product_name || '',
//         category: parsed.section1_product_overview?.sidebar_information?.category?.toUpperCase().replace(/ /g, '_') || '',
//         description: parsed.section1_product_overview?.sidebar_information?.description || '',
        
//         companyName: parsed.section1_product_overview?.company_information?.company_name || '',
//         headquarters: parsed.section1_product_overview?.company_information?.headquarters || '',
//         founded: parsed.section1_product_overview?.company_information?.founded || '',
//         founders: parsed.section1_product_overview?.company_information?.founders || '',
        
//         phone: parsed.section1_product_overview?.contact_information?.phone || '',
//         website: parsed.section1_product_overview?.contact_information?.website || '',
//         email: parsed.section1_product_overview?.contact_information?.email || '',
//         socialMedia: parsed.section1_product_overview?.contact_information?.social_media || '',
        
//         // Section 2: Detailed Overview
//         briefDescription: parsed.section2_detailed_overview?.brief_description || '',
//         targetUsers: parsed.section2_detailed_overview?.target_users || '',
//         primaryPurpose: parsed.section2_detailed_overview?.primary_purpose || '',
//         technologyStack: parsed.section2_detailed_overview?.technology_stack || '',
//         deploymentOptions: parsed.section2_detailed_overview?.deployment_options || '',
        
//         // Section 3: Functionality and Features
//         coreFunctionalities: parsed.section3_functionality_and_features?.core_functionalities || [],
//         keyFeatures: parsed.section3_functionality_and_features?.key_features || [],
//         lifecycleStages: parsed.section3_functionality_and_features?.lifecycle_stages_supported || [],
        
//         // Section 4: Pricing
//         pricingTier: parsed.section4_pricing?.pricing_tier || '',
//         startingPrice: parsed.section4_pricing?.pricing_details?.starting_price || '',
//         pricingModel: parsed.section4_pricing?.pricing_details?.pricing_model || '',
//         freeTrial: parsed.section4_pricing?.pricing_details?.free_trial || '',
//         customPricing: parsed.section4_pricing?.pricing_details?.custom_pricing || '',
        
//         // Section 5: Market Perception
//         bestKnownFor: parsed.section5_market_perception?.best_known_for || [],
//         criticalOpinions: parsed.section5_market_perception?.critical_opinions || [],
//         topUseCases: parsed.section5_market_perception?.top_use_cases || [],
//         userSatisfaction: parsed.section5_market_perception?.user_satisfaction || '',
        
//         // Section 6: Sources
//         sources: parsed.section6_sources || {}
//       };
      
//       setFormData(transformedData);
//     } catch (error) {
//       setErrors({ json: 'Invalid JSON format. Please check your input.' });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setErrors({ image: 'Image size must be less than 5MB' });
//         return;
//       }
      
//       if (!file.type.startsWith('image/')) {
//         setErrors({ image: 'Please select a valid image file' });
//         return;
//       }
      
//       setImageFile(file);
//       setErrors({ ...errors, image: null });
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadImage = async () => {
//     if (!imageFile) return null;
    
//     setIsUploadingImage(true);
//     const formData = new FormData();
//     formData.append('image', imageFile);
    
//     try {
//       const response = await fetch('/api/upload-image', {
//         method: 'POST',
//         body: formData,
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to upload image');
//       }
      
//       return data.url;
//     } catch (error) {
//       setErrors({ image: error.message });
//       return null;
//     } finally {
//       setIsUploadingImage(false);
//     }
//   };

//   const removeImage = () => {
//     setImageFile(null);
//     setImagePreview('');
//     if (formData) {
//       handleInputChange('logoUrl', '');
//     }
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleArrayItemChange = (field, index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const handleAddArrayItem = (field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   const handleRemoveArrayItem = (field, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const handleKeyFeatureChange = (index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       keyFeatures: prev.keyFeatures.map((feature, i) => 
//         i === index ? { ...feature, [field]: value } : feature
//       )
//     }));
//   };

//   const handleAddKeyFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       keyFeatures: [...prev.keyFeatures, { heading: '', description: '' }]
//     }));
//   };

//   const handleRemoveKeyFeature = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
//     }));
//   };

//   const handleLifecycleStageChange = (index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       lifecycleStages: prev.lifecycleStages.map((stage, i) => 
//         i === index ? { ...stage, [field]: value } : stage
//       )
//     }));
//   };

//   const handleSourceCategoryChange = (oldCategory, newCategory) => {
//     setFormData(prev => {
//       const newSources = { ...prev.sources };
//       if (oldCategory !== newCategory && newSources[oldCategory]) {
//         newSources[newCategory] = newSources[oldCategory];
//         delete newSources[oldCategory];
//       }
//       return { ...prev, sources: newSources };
//     });
//   };

//   const handleSourceUrlChange = (category, index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       sources: {
//         ...prev.sources,
//         [category]: prev.sources[category].map((url, i) => i === index ? value : url)
//       }
//     }));
//   };

//   const handleAddSourceUrl = (category) => {
//     setFormData(prev => ({
//       ...prev,
//       sources: {
//         ...prev.sources,
//         [category]: [...(prev.sources[category] || []), '']
//       }
//     }));
//   };

//   const handleRemoveSourceUrl = (category, index) => {
//     setFormData(prev => ({
//       ...prev,
//       sources: {
//         ...prev.sources,
//         [category]: prev.sources[category].filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const handleAddSourceCategory = () => {
//     const newCategory = 'new_category';
//     setFormData(prev => ({
//       ...prev,
//       sources: {
//         ...prev.sources,
//         [newCategory]: []
//       }
//     }));
//   };

//   const handleRemoveSourceCategory = (category) => {
//     setFormData(prev => {
//       const newSources = { ...prev.sources };
//       delete newSources[category];
//       return { ...prev, sources: newSources };
//     });
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setErrors({});
//     setSuccessMessage('');

//     try {
//       // Upload image first if present
//       let logoUrl = formData.logoUrl;
//       if (imageFile) {
//         const uploadedUrl = await uploadImage();
//         if (!uploadedUrl) {
//           throw new Error('Failed to upload image');
//         }
//         logoUrl = uploadedUrl;
//       }

//       // Transform pricingTier if it's in symbol format
//       const pricingTierMap = {
//         '$': 'BUDGET',
//         '$$': 'MID_RANGE',
//         '$$$': 'PREMIUM',
//         '$$$+': 'ENTERPRISE'
//       };

//       const transformedData = {
//         ...formData,
//         logoUrl: logoUrl,
//         pricingTier: pricingTierMap[formData.pricingTier] || formData.pricingTier,
//         socialMedia: formData.socialMedia || null,
//         phone: formData.phone || null,
//         website: formData.website || null,
//         email: formData.email || null,
//         founders: formData.founders || null,
//         startingPrice: formData.startingPrice || null,
//         pricingModel: formData.pricingModel || null,
//         freeTrial: formData.freeTrial || null,
//         customPricing: formData.customPricing || null,
//         sources: JSON.stringify(formData.sources)
//       };

//       const response = await fetch('/api/add-legal-software', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(transformedData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to save product');
//       }

//       setSuccessMessage('Product saved successfully!');
//       // Reset form after successful submission
//       setTimeout(() => {
//         setFormData(null);
//         setJsonInput('');
//         setSuccessMessage('');
//         setImageFile(null);
//         setImagePreview('');
//       }, 3000);
//     } catch (error) {
//       setErrors({ submit: error.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const categoryOptions = [
//     'CONTRACT_LIFECYCLE_MANAGEMENT',
//     'LEGAL_AI',
//     'DOCUMENT_MANAGEMENT_SYSTEM',
//     'LITIGATION_MANAGEMENT_AND_ANALYTICS',
//     'IP_MANAGEMENT',
//     'LEGAL_RESEARCH',
//     'E_DISCOVERY'
//   ];

//   const pricingTierOptions = [
//     { value: 'BUDGET', label: '$' },
//     { value: 'MID_RANGE', label: '$$' },
//     { value: 'PREMIUM', label: '$$$' },
//     { value: 'ENTERPRISE', label: '$$$+' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e2556' }}>
//           Add Legal Software Product
//         </h1>

//         {/* JSON Upload Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
//             Upload Product JSON
//           </h2>
//           <div className="space-y-4">
//             <textarea
//               value={jsonInput}
//               onChange={(e) => setJsonInput(e.target.value)}
//               placeholder="Paste your product JSON here..."
//               className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               style={{ color: '#2d2d2d' }}
//             />
//             {errors.json && (
//               <p className="text-red-500 text-sm">{errors.json}</p>
//             )}
//             <button
//               onClick={parseJSON}
//               className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#1e2556' }}
//             >
//               <Upload size={20} />
//               Parse JSON
//             </button>
//           </div>
//         </div>

//         {/* Form Sections */}
//         {formData && (
//           <div className="space-y-6">
//             {/* Section 1: Product Overview */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section1')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 1: Product Overview
//                 </h2>
//                 {expandedSections.section1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section1 && (
//                 <div className="p-6 pt-0 space-y-6">
//                   {/* Sidebar Information */}
//                   <div>
//                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
//                       Sidebar Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {/* Logo Upload */}
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Product Logo
//                         </label>
//                         <div className="space-y-4">
//                           {!imagePreview && (
//                             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
//                               <input
//                                 type="file"
//                                 id="logo-upload"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                               />
//                               <label
//                                 htmlFor="logo-upload"
//                                 className="flex flex-col items-center cursor-pointer"
//                               >
//                                 <ImageIcon size={48} className="text-gray-400 mb-2" />
//                                 <span className="text-sm text-gray-600">Click to upload logo</span>
//                                 <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
//                               </label>
//                             </div>
//                           )}
                          
//                           {imagePreview && (
//                             <div className="relative inline-block">
//                               <img
//                                 src={imagePreview}
//                                 alt="Logo preview"
//                                 className="h-32 w-auto rounded-lg border border-gray-300"
//                               />
//                               <button
//                                 onClick={removeImage}
//                                 className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           )}
                          
//                           {errors.image && (
//                             <p className="text-red-500 text-sm">{errors.image}</p>
//                           )}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Product Name
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.productName}
//                           onChange={(e) => handleInputChange('productName', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Category
//                         </label>
//                         <select
//                           value={formData.category}
//                           onChange={(e) => handleInputChange('category', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         >
//                           <option value="">Select a category</option>
//                           {categoryOptions.map(cat => (
//                             <option key={cat} value={cat}>
//                               {cat.replace(/_/g, ' ')}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Description (140 words max)
//                         </label>
//                         <textarea
//                           value={formData.description}
//                           onChange={(e) => handleInputChange('description', e.target.value)}
//                           rows={4}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Company Information */}
//                   <div>
//                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
//                       Company Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Company Name
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.companyName}
//                           onChange={(e) => handleInputChange('companyName', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Headquarters
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.headquarters}
//                           onChange={(e) => handleInputChange('headquarters', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Founded
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.founded}
//                           onChange={(e) => handleInputChange('founded', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Founders
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.founders}
//                           onChange={(e) => handleInputChange('founders', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div>
//                     <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
//                       Contact Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Phone
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Website
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.website}
//                           onChange={(e) => handleInputChange('website', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={formData.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                           Social Media
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.socialMedia}
//                           onChange={(e) => handleInputChange('socialMedia', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           style={{ color: '#2d2d2d' }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section 2: Detailed Overview */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section2')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 2: Detailed Overview
//                 </h2>
//                 {expandedSections.section2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section2 && (
//                 <div className="p-6 pt-0 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Brief Description (200 words max)
//                     </label>
//                     <textarea
//                       value={formData.briefDescription}
//                       onChange={(e) => handleInputChange('briefDescription', e.target.value)}
//                       rows={5}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Target Users
//                     </label>
//                     <textarea
//                       value={formData.targetUsers}
//                       onChange={(e) => handleInputChange('targetUsers', e.target.value)}
//                       rows={3}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Primary Purpose
//                     </label>
//                     <textarea
//                       value={formData.primaryPurpose}
//                       onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
//                       rows={3}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Technology Stack
//                     </label>
//                     <textarea
//                       value={formData.technologyStack}
//                       onChange={(e) => handleInputChange('technologyStack', e.target.value)}
//                       rows={3}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Deployment Options
//                     </label>
//                     <textarea
//                       value={formData.deploymentOptions}
//                       onChange={(e) => handleInputChange('deploymentOptions', e.target.value)}
//                       rows={2}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section 3: Functionality and Features */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section3')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 3: Functionality and Features
//                 </h2>
//                 {expandedSections.section3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section3 && (
//                 <div className="p-6 pt-0 space-y-6">
//                   {/* Core Functionalities */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Core Functionalities
//                     </label>
//                     <div className="space-y-2">
//                       {formData.coreFunctionalities.map((func, index) => (
//                         <div key={index} className="flex gap-2">
//                           <input
//                             type="text"
//                             value={func}
//                             onChange={(e) => handleArrayItemChange('coreFunctionalities', index, e.target.value)}
//                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             style={{ color: '#2d2d2d' }}
//                           />
//                           <button
//                             onClick={() => handleRemoveArrayItem('coreFunctionalities', index)}
//                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                             style={{ backgroundColor: '#ef4444' }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => handleAddArrayItem('coreFunctionalities')}
//                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         Add Functionality
//                       </button>
//                     </div>
//                   </div>

//                   {/* Key Features */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Key Features
//                     </label>
//                     <div className="space-y-4">
//                       {formData.keyFeatures.map((feature, index) => (
//                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
//                           <div className="space-y-3">
//                             <input
//                               type="text"
//                               value={feature.heading}
//                               onChange={(e) => handleKeyFeatureChange(index, 'heading', e.target.value)}
//                               placeholder="Feature Heading"
//                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             />
//                             <textarea
//                               value={feature.description}
//                               onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
//                               placeholder="Feature Description"
//                               rows={3}
//                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             />
//                             <button
//                               onClick={() => handleRemoveKeyFeature(index)}
//                               className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                               style={{ backgroundColor: '#ef4444' }}
//                             >
//                               Remove Feature
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         onClick={handleAddKeyFeature}
//                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         Add Key Feature
//                       </button>
//                     </div>
//                   </div>

//                   {/* Lifecycle Stages */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Lifecycle Stages Supported
//                     </label>
//                     <div className="space-y-4">
//                       {formData.lifecycleStages.map((stage, index) => (
//                         <div key={index} className="p-4 border border-gray-200 rounded-lg">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <input
//                               type="number"
//                               value={stage.stage_number}
//                               onChange={(e) => handleLifecycleStageChange(index, 'stage_number', parseInt(e.target.value))}
//                               placeholder="Stage Number"
//                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             />
//                             <input
//                               type="text"
//                               value={stage.stage_name}
//                               onChange={(e) => handleLifecycleStageChange(index, 'stage_name', e.target.value)}
//                               placeholder="Stage Name"
//                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             />
//                             <select
//                               value={stage.impact_level}
//                               onChange={(e) => handleLifecycleStageChange(index, 'impact_level', e.target.value)}
//                               className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             >
//                               <option value="">Select Impact Level</option>
//                               <option value="Low">Low</option>
//                               <option value="Medium">Medium</option>
//                               <option value="High">High</option>
//                             </select>
//                             <textarea
//                               value={stage.feature_impact_description}
//                               onChange={(e) => handleLifecycleStageChange(index, 'feature_impact_description', e.target.value)}
//                               placeholder="Feature Impact Description"
//                               rows={2}
//                               className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                               style={{ color: '#2d2d2d' }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section 4: Pricing */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section4')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 4: Pricing
//                 </h2>
//                 {expandedSections.section4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section4 && (
//                 <div className="p-6 pt-0">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                         Pricing Tier
//                       </label>
//                       <select
//                         value={formData.pricingTier}
//                         onChange={(e) => handleInputChange('pricingTier', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         style={{ color: '#2d2d2d' }}
//                       >
//                         <option value="">Select Pricing Tier</option>
//                         {pricingTierOptions.map(option => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                         Starting Price
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.startingPrice}
//                         onChange={(e) => handleInputChange('startingPrice', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         style={{ color: '#2d2d2d' }}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                         Pricing Model
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.pricingModel}
//                         onChange={(e) => handleInputChange('pricingModel', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         style={{ color: '#2d2d2d' }}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                         Free Trial
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.freeTrial}
//                         onChange={(e) => handleInputChange('freeTrial', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         style={{ color: '#2d2d2d' }}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                         Custom Pricing
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.customPricing}
//                         onChange={(e) => handleInputChange('customPricing', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         style={{ color: '#2d2d2d' }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section 5: Market Perception */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section5')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 5: Market Perception
//                 </h2>
//                 {expandedSections.section5 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section5 && (
//                 <div className="p-6 pt-0 space-y-6">
//                   {/* Best Known For */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Best Known For
//                     </label>
//                     <div className="space-y-2">
//                       {formData.bestKnownFor.map((item, index) => (
//                         <div key={index} className="flex gap-2">
//                           <input
//                             type="text"
//                             value={item}
//                             onChange={(e) => handleArrayItemChange('bestKnownFor', index, e.target.value)}
//                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             style={{ color: '#2d2d2d' }}
//                           />
//                           <button
//                             onClick={() => handleRemoveArrayItem('bestKnownFor', index)}
//                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                             style={{ backgroundColor: '#ef4444' }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => handleAddArrayItem('bestKnownFor')}
//                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         Add Item
//                       </button>
//                     </div>
//                   </div>

//                   {/* Critical Opinions */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Critical Opinions
//                     </label>
//                     <div className="space-y-2">
//                       {formData.criticalOpinions.map((item, index) => (
//                         <div key={index} className="flex gap-2">
//                           <input
//                             type="text"
//                             value={item}
//                             onChange={(e) => handleArrayItemChange('criticalOpinions', index, e.target.value)}
//                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             style={{ color: '#2d2d2d' }}
//                           />
//                           <button
//                             onClick={() => handleRemoveArrayItem('criticalOpinions', index)}
//                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                             style={{ backgroundColor: '#ef4444' }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => handleAddArrayItem('criticalOpinions')}
//                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         Add Opinion
//                       </button>
//                     </div>
//                   </div>

//                   {/* Top Use Cases */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       Top Use Cases
//                     </label>
//                     <div className="space-y-2">
//                       {formData.topUseCases.map((item, index) => (
//                         <div key={index} className="flex gap-2">
//                           <input
//                             type="text"
//                             value={item}
//                             onChange={(e) => handleArrayItemChange('topUseCases', index, e.target.value)}
//                             className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             style={{ color: '#2d2d2d' }}
//                           />
//                           <button
//                             onClick={() => handleRemoveArrayItem('topUseCases', index)}
//                             className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                             style={{ backgroundColor: '#ef4444' }}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => handleAddArrayItem('topUseCases')}
//                         className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       >
//                         Add Use Case
//                       </button>
//                     </div>
//                   </div>

//                   {/* User Satisfaction */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
//                       User Satisfaction
//                     </label>
//                     <textarea
//                       value={formData.userSatisfaction}
//                       onChange={(e) => handleInputChange('userSatisfaction', e.target.value)}
//                       rows={4}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       style={{ color: '#2d2d2d' }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section 6: Sources */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <button
//                 onClick={() => toggleSection('section6')}
//                 className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//               >
//                 <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
//                   Section 6: Sources
//                 </h2>
//                 {expandedSections.section6 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//               </button>
              
//               {expandedSections.section6 && (
//                 <div className="p-6 pt-0">
//                   <div className="space-y-4">
//                     {Object.entries(formData.sources).map(([category, urls]) => (
//                       <div key={category} className="p-4 border border-gray-200 rounded-lg">
//                         <div className="mb-3">
//                           <input
//                             type="text"
//                             value={category}
//                             onChange={(e) => handleSourceCategoryChange(category, e.target.value)}
//                             className="text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                             style={{ color: '#334155' }}
//                           />
//                           <button
//                             onClick={() => handleRemoveSourceCategory(category)}
//                             className="ml-3 px-3 py-1 text-sm text-white rounded hover:opacity-90"
//                             style={{ backgroundColor: '#ef4444' }}
//                           >
//                             Remove Category
//                           </button>
//                         </div>
//                         <div className="space-y-2">
//                           {Array.isArray(urls) && urls.map((url, index) => (
//                             <div key={index} className="flex gap-2">
//                               <input
//                                 type="url"
//                                 value={url}
//                                 onChange={(e) => handleSourceUrlChange(category, index, e.target.value)}
//                                 placeholder="Enter URL"
//                                 className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 style={{ color: '#2d2d2d' }}
//                               />
//                               <button
//                                 onClick={() => handleRemoveSourceUrl(category, index)}
//                                 className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                                 style={{ backgroundColor: '#ef4444' }}
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           ))}
//                           <button
//                             onClick={() => handleAddSourceUrl(category)}
//                             className="px-4 py-2 text-sm text-white rounded hover:opacity-90"
//                             style={{ backgroundColor: '#7cc6ee' }}
//                           >
//                             Add URL
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                     <button
//                       onClick={handleAddSourceCategory}
//                       className="px-4 py-2 text-white rounded-lg hover:opacity-90"
//                       style={{ backgroundColor: '#7cc6ee' }}
//                     >
//                       Add Source Category
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end items-center gap-4">
//               {successMessage && (
//                 <p className="text-green-600 font-medium">{successMessage}</p>
//               )}
//               {errors.submit && (
//                 <p className="text-red-600 font-medium">{errors.submit}</p>
//               )}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting || isUploadingImage}
//                 className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
//                 style={{ backgroundColor: '#1e2556' }}
//               >
//                 <Save size={20} />
//                 {isSubmitting ? 'Saving...' : 'Save Product'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LegalSoftwareAdmin;
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Upload, Save, Image as ImageIcon, X } from 'lucide-react';

const NewProductAdmin = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formData, setFormData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: true,
    section3: true,
    section4: true,
    section5: true,
    section6: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);

  // Function to check if slug exists
  const checkSlugExists = async (slug) => {
    try {
      const response = await fetch(`/api/legal-software/check-slug?slug=${encodeURIComponent(slug)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking slug:', error);
      return false;
    }
  };

  // Function to generate unique slug from product name
  const generateUniqueSlug = async (name) => {
    setIsCheckingSlug(true);
    let slug = name.toLowerCase().replace(/ /g, "-");
    
    // Check if the slug already exists
    let exists = await checkSlugExists(slug);
    
    // If the slug exists, append a number to make it unique
    let counter = 1;
    while (exists) {
      slug = `${name.toLowerCase().replace(/ /g, "-")}-${counter}`;
      exists = await checkSlugExists(slug);
      counter++;
    }
    
    setIsCheckingSlug(false);
    return slug;
  };

  const parseJSON = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setErrors({});
      
      const productName = parsed.section1_product_overview?.sidebar_information?.product_name || '';
      const slug = await generateUniqueSlug(productName);
      
      // Transform the JSON data to match our form structure
      const transformedData = {
        // Section 1: Product Overview
        logoUrl: '', // Logo will be uploaded separately
        productName: productName,
        slug: slug, // Auto-generated unique slug
        category: parsed.section1_product_overview?.sidebar_information?.category?.toUpperCase().replace(/ /g, '_') || '',
        description: parsed.section1_product_overview?.sidebar_information?.description || '',
        
        companyName: parsed.section1_product_overview?.company_information?.company_name || '',
        headquarters: parsed.section1_product_overview?.company_information?.headquarters || '',
        founded: parsed.section1_product_overview?.company_information?.founded || '',
        founders: parsed.section1_product_overview?.company_information?.founders || '',
        
        phone: parsed.section1_product_overview?.contact_information?.phone || '',
        website: parsed.section1_product_overview?.contact_information?.website || '',
        email: parsed.section1_product_overview?.contact_information?.email || '',
        socialMedia: parsed.section1_product_overview?.contact_information?.social_media || '',
        
        // Section 2: Detailed Overview
        briefDescription: parsed.section2_detailed_overview?.brief_description || '',
        targetUsers: parsed.section2_detailed_overview?.target_users || '',
        primaryPurpose: parsed.section2_detailed_overview?.primary_purpose || '',
        technologyStack: parsed.section2_detailed_overview?.technology_stack || '',
        deploymentOptions: parsed.section2_detailed_overview?.deployment_options || '',
        
        // Section 3: Functionality and Features
        coreFunctionalities: parsed.section3_functionality_and_features?.core_functionalities || [],
        keyFeatures: parsed.section3_functionality_and_features?.key_features || [],
        lifecycleStages: parsed.section3_functionality_and_features?.lifecycle_stages_supported || [],
        
        // Section 4: Pricing
        pricingTier: parsed.section4_pricing?.pricing_tier || '',
        startingPrice: parsed.section4_pricing?.pricing_details?.starting_price || '',
        pricingModel: parsed.section4_pricing?.pricing_details?.pricing_model || '',
        freeTrial: parsed.section4_pricing?.pricing_details?.free_trial || '',
        customPricing: parsed.section4_pricing?.pricing_details?.custom_pricing || '',
        
        // Section 5: Market Perception
        bestKnownFor: parsed.section5_market_perception?.best_known_for || [],
        criticalOpinions: parsed.section5_market_perception?.critical_opinions || [],
        topUseCases: parsed.section5_market_perception?.top_use_cases || [],
        userSatisfaction: parsed.section5_market_perception?.user_satisfaction || '',
        
        // Section 6: Sources
        sources: parsed.section6_sources || {}
      };
      
      setFormData(transformedData);
    } catch (error) {
      setErrors({ json: 'Invalid JSON format. Please check your input.' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ image: 'Image size must be less than 5MB' });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors({ image: 'Please select a valid image file' });
        return;
      }
      
      setImageFile(file);
      setErrors({ ...errors, image: null });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }
      
      return data.url;
    } catch (error) {
      setErrors({ image: error.message });
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (formData) {
      handleInputChange('logoUrl', '');
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = async (field, value) => {
    // If product name changes, regenerate slug
    if (field === 'productName' && value !== formData.productName) {
      const newSlug = await generateUniqueSlug(value);
      setFormData(prev => ({
        ...prev,
        productName: value,
        slug: newSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSlugChange = async (value) => {
    // When user manually edits slug, check if it's unique
    const formattedSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({
      ...prev,
      slug: formattedSlug
    }));
    
    // Check if this slug already exists
    if (formattedSlug) {
      const exists = await checkSlugExists(formattedSlug);
      if (exists) {
        setErrors({ ...errors, slug: 'This slug already exists. Please choose a different one.' });
      } else {
        setErrors({ ...errors, slug: null });
      }
    }
  };

  const handleArrayItemChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleKeyFeatureChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleAddKeyFeature = () => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, { heading: '', description: '' }]
    }));
  };

  const handleRemoveKeyFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleLifecycleStageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lifecycleStages: prev.lifecycleStages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const handleSourceCategoryChange = (oldCategory, newCategory) => {
    setFormData(prev => {
      const newSources = { ...prev.sources };
      if (oldCategory !== newCategory && newSources[oldCategory]) {
        newSources[newCategory] = newSources[oldCategory];
        delete newSources[oldCategory];
      }
      return { ...prev, sources: newSources };
    });
  };

  const handleSourceUrlChange = (category, index, value) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: prev.sources[category].map((url, i) => i === index ? value : url)
      }
    }));
  };

  const handleAddSourceUrl = (category) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: [...(prev.sources[category] || []), '']
      }
    }));
  };

  const handleRemoveSourceUrl = (category, index) => {
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [category]: prev.sources[category].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddSourceCategory = () => {
    const newCategory = 'new_category';
    setFormData(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        [newCategory]: []
      }
    }));
  };

  const handleRemoveSourceCategory = (category) => {
    setFormData(prev => {
      const newSources = { ...prev.sources };
      delete newSources[category];
      return { ...prev, sources: newSources };
    });
  };

  const handleSubmit = async () => {
    // Check for slug error before submitting
    if (errors.slug) {
      setErrors({ ...errors, submit: 'Please fix the slug error before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Upload image first if present
      let logoUrl = formData.logoUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          throw new Error('Failed to upload image');
        }
        logoUrl = uploadedUrl;
      }

      // Transform pricingTier if it's in symbol format
      const pricingTierMap = {
        '$': 'BUDGET',
        '$$': 'MID_RANGE',
        '$$$': 'PREMIUM',
        '$$$+': 'ENTERPRISE'
      };

      const transformedData = {
        ...formData,
        logoUrl: logoUrl,
        pricingTier: pricingTierMap[formData.pricingTier] || formData.pricingTier,
        socialMedia: formData.socialMedia || null,
        phone: formData.phone || null,
        website: formData.website || null,
        email: formData.email || null,
        founders: formData.founders || null,
        startingPrice: formData.startingPrice || null,
        pricingModel: formData.pricingModel || null,
        freeTrial: formData.freeTrial || null,
        customPricing: formData.customPricing || null,
        sources: JSON.stringify(formData.sources)
      };

      const response = await fetch('/api/legal-software', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      setSuccessMessage('Product saved successfully!');
      // Reset form after successful submission
      setTimeout(() => {
        setFormData(null);
        setJsonInput('');
        setSuccessMessage('');
        setImageFile(null);
        setImagePreview('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    'CONTRACT_LIFECYCLE_MANAGEMENT',
    'LEGAL_AI',
    'DOCUMENT_MANAGEMENT_SYSTEM',
    'LITIGATION_MANAGEMENT_AND_ANALYTICS',
    'IP_MANAGEMENT',
    'LEGAL_RESEARCH',
    'E_DISCOVERY'
  ];

  const pricingTierOptions = [
    { value: 'BUDGET', label: '$' },
    { value: 'MID_RANGE', label: '$$' },
    { value: 'PREMIUM', label: '$$$' },
    { value: 'ENTERPRISE', label: '$$$+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e2556' }}>
          Add Legal Software Product
        </h1>

        {/* JSON Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
            Upload Product JSON
          </h2>
          <div className="space-y-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your product JSON here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ color: '#2d2d2d' }}
            />
            {errors.json && (
              <p className="text-red-500 text-sm">{errors.json}</p>
            )}
            <button
              onClick={parseJSON}
              disabled={isCheckingSlug}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#1e2556' }}
            >
              <Upload size={20} />
              {isCheckingSlug ? 'Generating unique slug...' : 'Parse JSON'}
            </button>
          </div>
        </div>

        {/* Form Sections */}
        {formData && (
          <div className="space-y-6">
            {/* Section 1: Product Overview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section1')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 1: Product Overview
                </h2>
                {expandedSections.section1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section1 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Sidebar Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Sidebar Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Logo Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Product Logo
                        </label>
                        <div className="space-y-4">
                          {!imagePreview && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                              <input
                                type="file"
                                id="logo-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="logo-upload"
                                className="flex flex-col items-center cursor-pointer"
                              >
                                <ImageIcon size={48} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload logo</span>
                                <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                              </label>
                            </div>
                          )}
                          
                          {imagePreview && (
                            <div className="relative inline-block">
                              <img
                                src={imagePreview}
                                alt="Logo preview"
                                className="h-32 w-auto rounded-lg border border-gray-300"
                              />
                              <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                          
                          {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => handleInputChange('productName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          URL Slug
                          {isCheckingSlug && <span className="ml-2 text-xs text-gray-500">(Checking...)</span>}
                        </label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                          placeholder="product-url-slug"
                        />
                        {errors.slug && (
                          <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          This will be used in the URL. Only lowercase letters, numbers, and hyphens allowed.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        >
                          <option value="">Select a category</option>
                          {categoryOptions.map(cat => (
                            <option key={cat} value={cat}>
                              {cat.replace(/_/g, ' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Description (140 words max)
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Headquarters
                        </label>
                        <input
                          type="text"
                          value={formData.headquarters}
                          onChange={(e) => handleInputChange('headquarters', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Founded
                        </label>
                        <input
                          type="text"
                          value={formData.founded}
                          onChange={(e) => handleInputChange('founded', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Founders
                        </label>
                        <input
                          type="text"
                          value={formData.founders}
                          onChange={(e) => handleInputChange('founders', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4" style={{ color: '#334155' }}>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Phone
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Website
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                          Social Media
                        </label>
                        <input
                          type="text"
                          value={formData.socialMedia}
                          onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          style={{ color: '#2d2d2d' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Detailed Overview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section2')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 2: Detailed Overview
                </h2>
                {expandedSections.section2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section2 && (
                <div className="p-6 pt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Brief Description (200 words max)
                    </label>
                    <textarea
                      value={formData.briefDescription}
                      onChange={(e) => handleInputChange('briefDescription', e.target.value)}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Target Users
                    </label>
                    <textarea
                      value={formData.targetUsers}
                      onChange={(e) => handleInputChange('targetUsers', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Primary Purpose
                    </label>
                    <textarea
                      value={formData.primaryPurpose}
                      onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Technology Stack
                    </label>
                    <textarea
                      value={formData.technologyStack}
                      onChange={(e) => handleInputChange('technologyStack', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Deployment Options
                    </label>
                    <textarea
                      value={formData.deploymentOptions}
                      onChange={(e) => handleInputChange('deploymentOptions', e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Functionality and Features */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section3')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 3: Functionality and Features
                </h2>
                {expandedSections.section3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section3 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Core Functionalities */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Core Functionalities
                    </label>
                    <div className="space-y-2">
                      {formData.coreFunctionalities.map((func, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={func}
                            onChange={(e) => handleArrayItemChange('coreFunctionalities', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('coreFunctionalities', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('coreFunctionalities')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Functionality
                      </button>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Key Features
                    </label>
                    <div className="space-y-4">
                      {formData.keyFeatures.map((feature, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={feature.heading}
                              onChange={(e) => handleKeyFeatureChange(index, 'heading', e.target.value)}
                              placeholder="Feature Heading"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <textarea
                              value={feature.description}
                              onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
                              placeholder="Feature Description"
                              rows={3}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <button
                              onClick={() => handleRemoveKeyFeature(index)}
                              className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                              style={{ backgroundColor: '#ef4444' }}
                            >
                              Remove Feature
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleAddKeyFeature}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Key Feature
                      </button>
                    </div>
                  </div>

                  {/* Lifecycle Stages */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Lifecycle Stages Supported
                    </label>
                    <div className="space-y-4">
                      {formData.lifecycleStages.map((stage, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="number"
                              value={stage.stage_number}
                              onChange={(e) => handleLifecycleStageChange(index, 'stage_number', parseInt(e.target.value))}
                              placeholder="Stage Number"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <input
                              type="text"
                              value={stage.stage_name}
                              onChange={(e) => handleLifecycleStageChange(index, 'stage_name', e.target.value)}
                              placeholder="Stage Name"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                            <select
                              value={stage.impact_level}
                              onChange={(e) => handleLifecycleStageChange(index, 'impact_level', e.target.value)}
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            >
                              <option value="">Select Impact Level</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                            <textarea
                              value={stage.feature_impact_description}
                              onChange={(e) => handleLifecycleStageChange(index, 'feature_impact_description', e.target.value)}
                              placeholder="Feature Impact Description"
                              rows={2}
                              className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              style={{ color: '#2d2d2d' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Pricing */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section4')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 4: Pricing
                </h2>
                {expandedSections.section4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section4 && (
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Pricing Tier
                      </label>
                      <select
                        value={formData.pricingTier}
                        onChange={(e) => handleInputChange('pricingTier', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      >
                        <option value="">Select Pricing Tier</option>
                        {pricingTierOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={formData.startingPrice}
                        onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Pricing Model
                      </label>
                      <input
                        type="text"
                        value={formData.pricingModel}
                        onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Free Trial
                      </label>
                      <input
                        type="text"
                        value={formData.freeTrial}
                        onChange={(e) => handleInputChange('freeTrial', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                        Custom Pricing
                      </label>
                      <input
                        type="text"
                        value={formData.customPricing}
                        onChange={(e) => handleInputChange('customPricing', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ color: '#2d2d2d' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Market Perception */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section5')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 5: Market Perception
                </h2>
                {expandedSections.section5 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section5 && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Best Known For */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Best Known For
                    </label>
                    <div className="space-y-2">
                      {formData.bestKnownFor.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('bestKnownFor', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('bestKnownFor', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('bestKnownFor')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Item
                      </button>
                    </div>
                  </div>

                  {/* Critical Opinions */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Critical Opinions
                    </label>
                    <div className="space-y-2">
                      {formData.criticalOpinions.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('criticalOpinions', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('criticalOpinions', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('criticalOpinions')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Opinion
                      </button>
                    </div>
                  </div>

                  {/* Top Use Cases */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      Top Use Cases
                    </label>
                    <div className="space-y-2">
                      {formData.topUseCases.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayItemChange('topUseCases', index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#2d2d2d' }}
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('topUseCases', index)}
                            className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('topUseCases')}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                        style={{ backgroundColor: '#7cc6ee' }}
                      >
                        Add Use Case
                      </button>
                    </div>
                  </div>

                  {/* User Satisfaction */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>
                      User Satisfaction
                    </label>
                    <textarea
                      value={formData.userSatisfaction}
                      onChange={(e) => handleInputChange('userSatisfaction', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ color: '#2d2d2d' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 6: Sources */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('section6')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
                  Section 6: Sources
                </h2>
                {expandedSections.section6 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {expandedSections.section6 && (
                <div className="p-6 pt-0">
                  <div className="space-y-4">
                    {Object.entries(formData.sources).map(([category, urls]) => (
                      <div key={category} className="p-4 border border-gray-200 rounded-lg">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => handleSourceCategoryChange(category, e.target.value)}
                            className="text-lg font-medium p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            style={{ color: '#334155' }}
                          />
                          <button
                            onClick={() => handleRemoveSourceCategory(category)}
                            className="ml-3 px-3 py-1 text-sm text-white rounded hover:opacity-90"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            Remove Category
                          </button>
                        </div>
                        <div className="space-y-2">
                          {Array.isArray(urls) && urls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => handleSourceUrlChange(category, index, e.target.value)}
                                placeholder="Enter URL"
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                style={{ color: '#2d2d2d' }}
                              />
                              <button
                                onClick={() => handleRemoveSourceUrl(category, index)}
                                className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                                style={{ backgroundColor: '#ef4444' }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => handleAddSourceUrl(category)}
                            className="px-4 py-2 text-sm text-white rounded hover:opacity-90"
                            style={{ backgroundColor: '#7cc6ee' }}
                          >
                            Add URL
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSourceCategory}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                      style={{ backgroundColor: '#7cc6ee' }}
                    >
                      Add Source Category
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center gap-4">
              {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
              )}
              {errors.submit && (
                <p className="text-red-600 font-medium">{errors.submit}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isUploadingImage || isCheckingSlug}
                className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: '#1e2556' }}
              >
                <Save size={20} />
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProductAdmin;