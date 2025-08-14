// // // import React, { useState, useEffect } from 'react';
// // // import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, ExternalLink } from 'lucide-react';

// // // const CompactEvaluationForm = ({ onSelectProduct, mockApiResponse }) => {
// // //   const [currentStage, setCurrentStage] = useState(1);
// // //   const [showResults, setShowResults] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     category: '',
// // //     teamType: '',
// // //     teamSize: '',
// // //     processStages: [],
// // //     keyFunctionalities: [],
// // //     specificFeatures: [],
// // //     language: '',
// // //     deploymentModel: '',
// // //     region: '',
// // //     pricingModel: ''
// // //   });
  
// // //   // Results handling
// // //   const [results, setResults] = useState(null);
// // //   const [loading, setLoading] = useState(false);
  
// // //   // Categories and options from original form
// // //   const categories = [
// // //     { id: 'Client Relationship Management', name: 'Client Relationship Management', icon: '👥' },
// // //     { id: 'Contract Lifecycle Management', name: 'Contract Lifecycle Management', icon: '📝' },
// // //     { id: 'E-Signature', name: 'E-Signature', icon: '✍️' },
// // //     { id: 'Document Management System', name: 'Document Management System', icon: '📄' },
// // //     { id: 'E-billing and Invoicing', name: 'E-billing and Invoicing', icon: '💰' },
// // //     { id: 'E-discovery', name: 'E-Discovery', icon: '🔍' },
// // //     { id: 'Governance, Risk and Compliance', name: 'Governance Risk & Compliance', icon: '⚖️' },
// // //     { id: 'Intellectual Property Management', name: 'Intellectual Property Management', icon: '💡' },
// // //     { id: 'Legal Research', name: 'Legal Research', icon: '📚' },
// // //     { id: 'Legal Workflow Automation', name: 'Legal Workflow Automation', icon: '⚙️' },
// // //     { id: 'Litigation Management and Analytics', name: 'Litigation Management & Analytics', icon: '📊' }
// // //   ];

// // //   const teamTypes = [
// // //     { id: 'Individual Practitioner', name: 'Individual Practitioner' },
// // //     { id: 'Law firms', name: 'Law Firm' },
// // //     { id: 'Government departments', name: 'Government Departments' },
// // //     { id: 'Startups', name: 'Startups' },
// // //     { id: 'Enterprises', name: 'Enterprises' },
// // //     { id: 'Judiciary', name: 'Judiciary' },
// // //     { id: 'In-House Counsels', name: 'In-house Counsels' }
// // //   ];

// // //   const teamSizes = [
// // //     { id: '1', name: '1 person' },
// // //     { id: '2-20', name: '2-20 people' },
// // //     { id: '21-50', name: '21-50 people' },
// // //     { id: '51-200', name: '51-200 people' },
// // //     { id: '201-500', name: '201-500 people' },
// // //     { id: '500+', name: '500+ people' }
// // //   ];
  
// // //   // Process stages mapping from original form
// // //   const categoryStagesMap = {
// // //     'Client Relationship Management': ['Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'],
// // //     'Governance, Risk and Compliance': ['Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'],
// // //     'Contract Lifecycle Management': ['Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'],
// // //     'E-Signature': ['Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'],
// // //     'Document Management System': ['Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'],
// // //     'E-billing and Invoicing': ['Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'],
// // //     'E-discovery': ['Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'],
// // //     'Intellectual Property Management': ['Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'],
// // //     'Litigation Management and Analytics': ['Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'],
// // //     'Legal Workflow Automation': ['Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'],
// // //     'Legal Research': ['Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval']
// // //   };

// // //   // Functionalities mapping from original form
// // //   const categoryFunctionalitiesMap = {
// // //     'Client Relationship Management': [
// // //       'Intake and Lead Management',
// // //       'Client Portal',
// // //       'Document Management',
// // //       'Case Alerts',
// // //       'Budget, Expense and Time Tracking',
// // //       'Client Billing and Invoicing'
// // //     ],
// // //     'Governance, Risk and Compliance': [
// // //       'Policy Management',
// // //       'Issue Management',
// // //       'Laws, Compliance and Regulatory Tracking'
// // //     ],
// // //     'Contract Lifecycle Management': [
// // //       'Contract Creation and Authoring',
// // //       'Contract Repository',
// // //       'Contract Negotiation',
// // //       'Lifecycle Management',
// // //       'Clause Library'
// // //     ],
// // //     'E-Signature': [
// // //       'Fields Creation',
// // //       'Tracking and Validity',
// // //       'Document Management and Templates',
// // //       'Document Capturing'
// // //     ],
// // //     'Legal Research': [
// // //       'Case Law Research',
// // //       'Statutory Research',
// // //       'Advanced Search Capabilities',
// // //       'Filter and Sorting'
// // //     ],
// // //     'Document Management System': [
// // //       'Document Creation and Templates',
// // //       'Document Search and Navigation',
// // //       'Authentication',
// // //       'Task Allotment'
// // //     ],
// // //     'E-billing and Invoicing': [
// // //       'Budgeting, Expense and Time Tracking',
// // //       'Client Management',
// // //       'Invoice Generation and Review'
// // //     ],
// // //     'E-discovery': [
// // //       'Data Identification and Collection',
// // //       'Search, Processing and Analysis',
// // //       'Review and Production',
// // //       'Legal Hold Management'
// // //     ],
// // //     'Intellectual Property Management': [
// // //       'Ideation and Creation',
// // //       'Lifecycle Management',
// // //       'Search and Discovery',
// // //       'Storage and Repository'
// // //     ],
// // //     'Litigation Management and Analytics': [
// // //       'Matter Lifecycle Tracking',
// // //       'Court and Case Search',
// // //       'Budget, Expense and Time Tracking',
// // //       'Litigation Docketing Features'
// // //     ],
// // //     'Legal Workflow Automation': [
// // //       'Workflow Design and Configuration',
// // //       'Assignment Allotment and Tracking',
// // //       'Document Creation and Management',
// // //       'Laws, Compliance and Regulatory Tracking'
// // //     ]
// // //   };

// // //   // Features mapping from original form - abbreviated for brevity
// // //   const functionalityFeaturesMap = {
// // //     'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
// // //     'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
// // //     'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
// // //     'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
// // //     'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses'],
// // //     // Additional mappings would be included here in a real implementation
// // //   };
  
// // //   const languages = [
// // //     { id: 'english', name: 'English' },
// // //     { id: 'spanish', name: 'Spanish' },
// // //     { id: 'french', name: 'French' },
// // //     { id: 'german', name: 'German' },
// // //     { id: 'chinese', name: 'Chinese' },
// // //     { id: 'japanese', name: 'Japanese' }
// // //   ];

// // //   const deploymentModels = [
// // //     { id: 'On-premise', name: 'On premise deployment' },
// // //     { id: 'Cloud', name: 'Cloud based deployment' },
// // //     { id: 'Hybrid', name: 'Hybrid deployment' },
// // //     { id: 'SaaS', name: 'Software as a Service' },
// // //     { id: 'mobile', name: 'Mobile accessibility' }
// // //   ];

// // //   const regions = [
// // //     { id: 'EMEA (Europe, the Middle East and Africa)', name: 'EMEA' },
// // //     { id: 'NA (North America)', name: 'NA' },
// // //     { id: 'LATAM (Latin America)', name: 'LATAM' },
// // //     { id: 'APAC (Asia-Pacific)', name: 'APAC' }
// // //   ];

// // //   const pricingModels = [
// // //     { id: 'Annual Fee', name: 'Annual Subscription' },
// // //     { id: 'Monthly subscription', name: 'Monthly subscription' },
// // //     { id: 'Perpetual', name: 'Perpetual' },
// // //     { id: 'Volume based', name: 'Volume based' },
// // //     { id: 'One time', name: 'One time' }
// // //   ];
  
// // //   // State for pagination and search
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const resultsPerPage = 5;

// // //   // Function to handle form stage navigation
// // // //   const goToNextStage = () => {
// // // //     if (currentStage < 4) {
// // // //       setCurrentStage(currentStage + 1);
// // // //     }
// // // //   };

// // //   const goToPreviousStage = () => {
// // //     if (currentStage > 1) {
// // //       setCurrentStage(currentStage - 1);
// // //     }
// // //   };

// // //   const handleOptionSelect = (field, value) => {
// // //     if (field === 'category') {
// // //       // Reset dependent fields when category changes
// // //       setFormData({
// // //         ...formData,
// // //         category: value,
// // //         processStages: [],
// // //         keyFunctionalities: [],
// // //         specificFeatures: []
// // //       });
// // //     } else if (Array.isArray(formData[field])) {
// // //       // Toggle selection for arrays (multi-select)
// // //       if (formData[field].includes(value)) {
// // //         setFormData({
// // //           ...formData, 
// // //           [field]: formData[field].filter(item => item !== value)
// // //         });
// // //       } else {
// // //         setFormData({
// // //           ...formData,
// // //           [field]: [...formData[field], value]
// // //         });
// // //       }
// // //     } else {
// // //       // Simple selection for strings (single-select)
// // //       setFormData({
// // //         ...formData,
// // //         [field]: value
// // //       });
// // //     }
// // //   };

// // //   // Function to check if the current stage has valid selections to proceed
// // //   const canProceed = () => {
// // //     switch (currentStage) {
// // //       case 1:
// // //         return formData.category && formData.teamType && formData.teamSize;
// // //       case 2:
// // //         return formData.processStages.length > 0 && formData.keyFunctionalities.length > 0;
// // //       case 3:
// // //         return formData.language && formData.deploymentModel && formData.region && formData.pricingModel;
// // //       default:
// // //         return true;
// // //     }
// // //   };

// // //   // Get process stages based on selected category
// // //   const getProcessStages = () => {
// // //     if (!formData.category) return [];
// // //     return categoryStagesMap[formData.category] || [];
// // //   };

// // //   // Get functionalities based on selected category
// // //   const getFunctionalities = () => {
// // //     if (!formData.category) return [];
// // //     return categoryFunctionalitiesMap[formData.category] || [];
// // //   };

// // //   // Get features based on selected functionalities
// // //   const getFeatures = () => {
// // //     if (formData.keyFunctionalities.length === 0) return [];
    
// // //     const allFeatures = new Set();
// // //     formData.keyFunctionalities.forEach(functionality => {
// // //       const features = functionalityFeaturesMap[functionality] || [];
// // //       features.forEach(feature => allFeatures.add(feature));
// // //     });
    
// // //     return Array.from(allFeatures);
// // //   };

// // //   const [error, setError] = useState(null)
// // //   // Submit form and get results
// // // //   const handleSubmit = async () => {
// // // //     setLoading(true);
// // // //     setError(null);
    
// // // //     try {
// // // //       const response = await fetch('/api/evaluate-legal-tech', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(formData),
// // // //       });
      
// // // //       if (!response.ok) {
// // // //         throw new Error('Failed to get evaluation results');
// // // //       }
      
// // // //       const data = await response.json();
// // // //       setResults(data);
// // // //       setShowResults(true);
      
// // // //       // Move to results stage if not already there
// // // //       if (currentStage !== 4) {
// // // //         setCurrentStage(4);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error during evaluation:', err);
// // // //       setError(err.message || 'Something went wrong during evaluation');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };
// // //   // Updated handleSubmit function to automatically trigger results display
// // // const handleSubmit = async () => {
// // //     setLoading(true);
// // //     setError(null);
    
// // //     try {
// // //       const response = await fetch('/api/evaluate-legal-tech', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(formData),
// // //       });
      
// // //       if (!response.ok) {
// // //         throw new Error('Failed to get evaluation results');
// // //       }
      
// // //       const data = await response.json();
// // //       setResults(data);
      
// // //       // Automatically move to results stage
// // //       setCurrentStage(4);
// // //       window.scrollTo(0, 0);
// // //     } catch (err) {
// // //       console.error('Error during evaluation:', err);
// // //       setError(err.message || 'Something went wrong during evaluation');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
  
// // //   // Update the goToNextStage function to automatically trigger the API call
// // //   // when moving to the results stage
// // //   const goToNextStage = () => {
// // //     if (currentStage < 4) {
// // //       const nextStage = currentStage + 1;
// // //       setCurrentStage(nextStage);
      
// // //       // Automatically submit when reaching the results stage
// // //       if (nextStage === 4) {
// // //         handleSubmit();
// // //       }
      
// // //       window.scrollTo(0, 0);
// // //     }
// // //   };
// // //   // Then in the same file, update the filteredResults definition:
  
// // //   const filteredResults = results?.results?.filter(product => 
// // //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     product.description.toLowerCase().includes(searchTerm.toLowerCase())
// // //   ) || [];
  
// // //   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
// // //   const paginatedResults = filteredResults.slice(
// // //     (currentPage - 1) * resultsPerPage,
// // //     currentPage * resultsPerPage
// // //   );

// // //   // Handle product selection
// // //   const handleProductSelect = (product) => {
// // //     if (onSelectProduct) {
// // //       onSelectProduct(product);
// // //     }
// // //   };

// // //   // Stage progress labels
// // //   const totalStages = 4;
// // //   const stageLabels = ["Start", "Features", "Vendor", "Results"];

// // //   // Render components
// // //   const renderStageContent = () => {
// // //     switch (currentStage) {
// // //       case 1:
// // //         return (
// // //           <div className="space-y-4">
// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Legal tech software category</h3>
// // //               <div className="grid grid-cols-3 gap-2">
// // //                 {categories.slice(0, 6).map((category) => (
// // //                   <button
// // //                     key={category.id}
// // //                     onClick={() => handleOptionSelect('category', category.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center text-center h-16 justify-center ${
// // //                       formData.category === category.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="text-lg mb-1">{category.icon}</div>
// // //                     <div className="font-medium text-xs">{category.name.length > 20 ? `${category.name.substring(0, 18)}...` : category.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //               {categories.length > 6 && (
// // //                 <div className="grid grid-cols-3 gap-2 mt-2">
// // //                   {categories.slice(6).map((category) => (
// // //                     <button
// // //                       key={category.id}
// // //                       onClick={() => handleOptionSelect('category', category.id)}
// // //                       className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center text-center h-16 justify-center ${
// // //                         formData.category === category.id
// // //                           ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                       }`}
// // //                     >
// // //                       <div className="text-lg mb-1">{category.icon}</div>
// // //                       <div className="font-medium text-xs">{category.name.length > 20 ? `${category.name.substring(0, 18)}...` : category.name}</div>
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Team type</h3>
// // //               <div className="grid grid-cols-3 gap-2">
// // //                 {teamTypes.map((type) => (
// // //                   <button
// // //                     key={type.id}
// // //                     onClick={() => handleOptionSelect('teamType', type.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 ${
// // //                       formData.teamType === type.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="font-medium text-xs">{type.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Team size</h3>
// // //               <div className="grid grid-cols-3 gap-2">
// // //                 {teamSizes.map((size) => (
// // //                   <button
// // //                     key={size.id}
// // //                     onClick={() => handleOptionSelect('teamSize', size.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 ${
// // //                       formData.teamSize === size.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="font-medium text-xs">{size.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         );
      
// // //       case 2:
// // //         return (
// // //           <div className="space-y-3 max-h-72 overflow-y-auto">
// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Process stages to cover</h3>
// // //               {formData.category ? (
// // //                 <div className="grid grid-cols-2 gap-2">
// // //                   {getProcessStages().map((stage, index) => (
// // //                     <button
// // //                       key={index}
// // //                       onClick={() => handleOptionSelect('processStages', stage)}
// // //                       className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
// // //                         formData.processStages.includes(stage)
// // //                           ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                       }`}
// // //                     >
// // //                       <div className="font-medium text-xs flex-1">{stage}</div>
// // //                       {formData.processStages.includes(stage) && (
// // //                         <Check className="ml-1 h-3 w-3" />
// // //                       )}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-xs text-orange-600">Please select a category in Step 1</p>
// // //               )}
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Key functionalities</h3>
// // //               {formData.category ? (
// // //                 <div className="grid grid-cols-1 gap-2">
// // //                   {getFunctionalities().map((func, index) => (
// // //                     <button
// // //                       key={index}
// // //                       onClick={() => handleOptionSelect('keyFunctionalities', func)}
// // //                       className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
// // //                         formData.keyFunctionalities.includes(func)
// // //                           ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                       }`}
// // //                     >
// // //                       <div className="font-medium text-xs flex-1">{func}</div>
// // //                       {formData.keyFunctionalities.includes(func) && (
// // //                         <Check className="ml-1 h-3 w-3" />
// // //                       )}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-xs text-orange-600">Please select a category in Step 1</p>
// // //               )}
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Specific features</h3>
// // //               {formData.keyFunctionalities.length > 0 ? (
// // //                 <div className="grid grid-cols-1 gap-2">
// // //                   {getFeatures().slice(0, 10).map((feature, index) => (
// // //                     <button
// // //                       key={index}
// // //                       onClick={() => handleOptionSelect('specificFeatures', feature)}
// // //                       className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
// // //                         formData.specificFeatures.includes(feature)
// // //                           ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                       }`}
// // //                     >
// // //                       <div className="font-medium text-xs flex-1">{feature}</div>
// // //                       {formData.specificFeatures.includes(feature) && (
// // //                         <Check className="ml-1 h-3 w-3" />
// // //                       )}
// // //                     </button>
// // //                   ))}
// // //                   {getFeatures().length > 10 && (
// // //                     <p className="text-xs text-gray-500 italic">And {getFeatures().length - 10} more features available...</p>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-xs text-orange-600">Please select key functionalities first</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         );
      
// // //       case 3:
// // //         return (
// // //           <div className="space-y-3 max-h-72 overflow-y-auto">
// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Language requirement</h3>
// // //               <div className="relative">
// // //                 <select 
// // //                   className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-300 focus:outline-none appearance-none text-xs"
// // //                   value={formData.language}
// // //                   onChange={(e) => setFormData({...formData, language: e.target.value})}
// // //                 >
// // //                   <option value="">Select language</option>
// // //                   {languages.map((lang) => (
// // //                     <option key={lang.id} value={lang.id}>{lang.name}</option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Deployment model</h3>
// // //               <div className="grid grid-cols-2 gap-2">
// // //                 {deploymentModels.map((model) => (
// // //                   <button
// // //                     key={model.id}
// // //                     onClick={() => handleOptionSelect('deploymentModel', model.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 ${
// // //                       formData.deploymentModel === model.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="font-medium text-xs">{model.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Region</h3>
// // //               <div className="grid grid-cols-2 gap-2">
// // //                 {regions.map((region) => (
// // //                   <button
// // //                     key={region.id}
// // //                     onClick={() => handleOptionSelect('region', region.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 ${
// // //                       formData.region === region.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="font-medium text-xs">{region.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <h3 className="text-sm font-semibold text-gray-800">Pricing model</h3>
// // //               <div className="grid grid-cols-2 gap-2">
// // //                 {pricingModels.map((pricing) => (
// // //                   <button
// // //                     key={pricing.id}
// // //                     onClick={() => handleOptionSelect('pricingModel', pricing.id)}
// // //                     className={`p-2 rounded-lg transition-all duration-200 ${
// // //                       formData.pricingModel === pricing.id
// // //                         ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
// // //                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
// // //                     }`}
// // //                   >
// // //                     <div className="font-medium text-xs">{pricing.name}</div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         );
      
// // //       case 4:
// // //         return (
// // //           <div className="space-y-4 max-h-72 overflow-y-auto">
// // //             {loading ? (
// // //               <div className="flex items-center justify-center h-32">
// // //                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
// // //                 <span className="ml-2 text-sm text-gray-600">Finding the best matches...</span>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 text-center">
// // //                   <p className="text-xs text-blue-800 font-medium">Found {filteredResults.length} products matching your criteria</p>
// // //                 </div>
                
// // //                 <div className="relative">
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Search products..."
// // //                     className="w-full p-2 pl-8 rounded-lg border-2 border-gray-200 focus:border-blue-300 focus:outline-none text-xs"
// // //                     value={searchTerm}
// // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // //                   />
// // //                   <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
// // //                 </div>
                
// // //                 {paginatedResults.length > 0 ? (
// // //                   <>
// // //                     {paginatedResults.map((product) => (
// // //                       <div 
// // //                         key={product.id} 
// // //                         className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
// // //                         onClick={() => handleProductSelect(product)}
// // //                       >
// // //                         <div className="flex items-center p-2 border-b border-gray-100">
// // //                           <div className={`w-10 h-10 rounded flex items-center justify-center mr-2 ${
// // //                             product.matchScore >= 90 ? 'bg-green-50 text-green-600' :
// // //                             product.matchScore >= 70 ? 'bg-blue-50 text-blue-600' :
// // //                             product.matchScore >= 50 ? 'bg-yellow-50 text-yellow-600' :
// // //                             'bg-gray-50 text-gray-600'
// // //                           }`}>
// // //                             <div className="text-xs font-bold">{product.matchScore}%</div>
// // //                           </div>
// // //                           <div>
// // //                             <h3 className="font-medium text-sm">{product.name}</h3>
// // //                             <div className="flex flex-wrap">
// // //                               {product.category.slice(0, 1).map((cat, idx) => (
// // //                               <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-1 rounded mr-1 mb-1">
// // //                               {cat.length > 15 ? `${cat.substring(0, 13)}...` : cat}
// // //                             </span>
// // //                           ))}
// // //                           {product.category.length > 1 && (
// // //                             <span className="text-xs bg-gray-50 text-gray-500 px-1 rounded">
// // //                               +{product.category.length - 1}
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="p-2 text-xs text-gray-600">
// // //                       {product.description.length > 100 
// // //                         ? `${product.description.substring(0, 100)}...` 
// // //                         : product.description}
// // //                     </div>
// // //                     <div className="px-2 pb-2">
// // //                       <div className="flex flex-wrap gap-1">
// // //                         {product.deployement.slice(0, 2).map((deploy, idx) => (
// // //                           <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-1 rounded">
// // //                             {deploy}
// // //                           </span>
// // //                         ))}
// // //                         {product.deployement.length > 2 && (
// // //                           <span className="text-xs bg-gray-50 text-gray-500 px-1 rounded">
// // //                             +{product.deployement.length - 2}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
                
// // //                 {totalPages > 1 && (
// // //                   <div className="flex justify-center space-x-1 mt-2">
// // //                     <button 
// // //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// // //                       className="px-2 py-1 text-xs rounded border border-gray-200 disabled:opacity-50"
// // //                       disabled={currentPage === 1}
// // //                     >
// // //                       &lt;
// // //                     </button>
// // //                     <span className="px-2 py-1 text-xs">
// // //                       Page {currentPage} of {totalPages}
// // //                     </span>
// // //                     <button 
// // //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// // //                       className="px-2 py-1 text-xs rounded border border-gray-200 disabled:opacity-50"
// // //                       disabled={currentPage === totalPages}
// // //                     >
// // //                       &gt;
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </>
// // //             ) : (
// // //               <div className="text-center p-4">
// // //                 <p className="text-gray-500 text-sm">No products found matching your search</p>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     );
  
// // //   default:
// // //     return null;
// // // }
// // // }

// // // return (
// // // <div className="max-w-xl mx-auto p-2">
// // //   <div className="my-2">
// // //     {/* Progress indicators - Simplified */}
// // //     <div className="relative mb-4">
// // //       {/* Main connector line */}
// // //       <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200"></div>
      
// // //       {/* Progress bar overlay */}
// // //       <div 
// // //         className="absolute top-3 left-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out"
// // //         style={{ width: `${((currentStage - 1) / (totalStages - 1)) * 100}%` }}
// // //       ></div>
      
// // //       {/* Stage circles with positioning */}
// // //       <div className="flex justify-between relative">
// // //         {stageLabels.map((label, index) => (
// // //           <div key={index} className="flex flex-col items-center">
// // //             <div 
// // //               className={`w-6 h-6 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 text-xs ${
// // //                 currentStage === index + 1 
// // //                   ? 'bg-blue-50 border-blue-600 text-blue-600' 
// // //                   : currentStage > index + 1 
// // //                     ? 'bg-blue-600 border-blue-600 text-white' 
// // //                     : 'bg-white border-gray-200 text-gray-400'
// // //               }`}
// // //             >
// // //               {currentStage > index + 1 ? <Check className="h-3 w-3" /> : index + 1}
// // //             </div>
// // //             <span 
// // //               className={`font-medium mt-1 transition-all duration-200 text-xs ${
// // //                 currentStage === index + 1 
// // //                   ? 'text-blue-600' 
// // //                   : currentStage > index + 1 
// // //                     ? 'text-blue-600' 
// // //                     : 'text-gray-400'
// // //               }`}
// // //             >
// // //               {label}
// // //             </span>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   </div>
  
// // //   {/* Form content */}
// // //   <div className="bg-white shadow-sm rounded-lg p-3 mb-3 border border-gray-100">
// // //     {renderStageContent()}
// // //   </div>
  
// // //   {/* Navigation buttons */}
// // //   {/* <div className="flex justify-between">
// // //     <button
// // //       onClick={goToPreviousStage}
// // //       className={`px-3 py-1 rounded-lg flex items-center transition-all duration-200 text-sm ${
// // //         currentStage === 1
// // //           ? 'text-gray-300 cursor-not-allowed'
// // //           : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
// // //       }`}
// // //       disabled={currentStage === 1}
// // //     >
// // //       <ArrowLeft className="mr-1 h-3 w-3" />
// // //       Back
// // //     </button>
    
// // //     {currentStage < 4 ? (
// // //       <button
// // //         onClick={goToNextStage}
// // //         disabled={!canProceed()}
// // //         className={`px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm ${
// // //           canProceed()
// // //             ? 'bg-blue-600 text-white hover:bg-blue-700'
// // //             : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // //         }`}
// // //       >
// // //         Next
// // //         <ArrowRight className="ml-1 h-3 w-3" />
// // //       </button>
// // //     ) : !results ? (
// // //       <button
// // //         onClick={handleSubmit}
// // //         className="px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm bg-blue-600 text-white hover:bg-blue-700"
// // //       >
// // //         Find Products
// // //         <Search className="ml-1 h-3 w-3" />
// // //       </button>
// // //     ) : (
// // //       <div></div>
// // //     )}
// // //   </div> */}
// // //   {/* Navigation buttons */}
// // // <div className="flex justify-between">
// // //   <button
// // //     onClick={goToPreviousStage}
// // //     className={`px-3 py-1 rounded-lg flex items-center transition-all duration-200 text-sm ${
// // //       currentStage === 1
// // //         ? 'text-gray-300 cursor-not-allowed'
// // //         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
// // //     }`}
// // //     disabled={currentStage === 1}
// // //   >
// // //     <ArrowLeft className="mr-1 h-3 w-3" />
// // //     Back
// // //   </button>
  
// // //   {currentStage < 4 ? (
// // //     <button
// // //       onClick={goToNextStage}
// // //       disabled={!canProceed()}
// // //       className={`px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm ${
// // //         canProceed()
// // //           ? 'bg-blue-600 text-white hover:bg-blue-700'
// // //           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
// // //       }`}
// // //     >
// // //       {currentStage === 3 ? 'Show Results' : 'Next'}
// // //       <ArrowRight className="ml-1 h-3 w-3" />
// // //     </button>
// // //   ) : (
// // //     <div></div>
// // //   )}
// // // </div>
// // // </div>
// // // );
// // // };

// // // export default CompactEvaluationForm;
// // import React, { useState, useEffect } from 'react';
// // import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, ExternalLink } from 'lucide-react';

// // const CompactEvaluationForm = ({ onSelectProduct, mockApiResponse }) => {
// //   const [currentStage, setCurrentStage] = useState(1);
// //   const [showResults, setShowResults] = useState(false);
// //   const [formData, setFormData] = useState({
// //     category: '',
// //     teamType: '',
// //     teamSize: '',
// //     processStages: [],
// //     keyFunctionalities: [],
// //     specificFeatures: [],
// //     language: '',
// //     deploymentModel: '',
// //     region: '',
// //     pricingModel: ''
// //   });
  
// //   // Results handling
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);
  
// //   // Categories and options from original form
// //   const categories = [
// //     { id: 'Client Relationship Management', name: 'Client Relationship Management', icon: '👥' },
// //     { id: 'Contract Lifecycle Management', name: 'Contract Lifecycle Management', icon: '📝' },
// //     { id: 'E-Signature', name: 'E-Signature', icon: '✍️' },
// //     { id: 'Document Management System', name: 'Document Management System', icon: '📄' },
// //     { id: 'E-billing and Invoicing', name: 'E-billing and Invoicing', icon: '💰' },
// //     { id: 'E-discovery', name: 'E-Discovery', icon: '🔍' },
// //     { id: 'Governance, Risk and Compliance', name: 'Governance Risk & Compliance', icon: '⚖️' },
// //     { id: 'Intellectual Property Management', name: 'Intellectual Property Management', icon: '💡' },
// //     { id: 'Legal Research', name: 'Legal Research', icon: '📚' },
// //     { id: 'Legal Workflow Automation', name: 'Legal Workflow Automation', icon: '⚙️' },
// //     { id: 'Litigation Management and Analytics', name: 'Litigation Management & Analytics', icon: '📊' }
// //   ];

// //   const teamTypes = [
// //     { id: 'Individual Practitioner', name: 'Individual Practitioner' },
// //     { id: 'Law firms', name: 'Law Firm' },
// //     { id: 'Government departments', name: 'Government Departments' },
// //     { id: 'Startups', name: 'Startups' },
// //     { id: 'Enterprises', name: 'Enterprises' },
// //     { id: 'Judiciary', name: 'Judiciary' },
// //     { id: 'In-House Counsels', name: 'In-house Counsels' }
// //   ];

// //   const teamSizes = [
// //     { id: '1', name: '1 person' },
// //     { id: '2-20', name: '2-20 people' },
// //     { id: '21-50', name: '21-50 people' },
// //     { id: '51-200', name: '51-200 people' },
// //     { id: '201-500', name: '201-500 people' },
// //     { id: '500+', name: '500+ people' }
// //   ];
  
// //   // Process stages mapping from original form
// //   const categoryStagesMap = {
// //     'Client Relationship Management': ['Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'],
// //     'Governance, Risk and Compliance': ['Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'],
// //     'Contract Lifecycle Management': ['Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'],
// //     'E-Signature': ['Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'],
// //     'Document Management System': ['Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'],
// //     'E-billing and Invoicing': ['Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'],
// //     'E-discovery': ['Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'],
// //     'Intellectual Property Management': ['Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'],
// //     'Litigation Management and Analytics': ['Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'],
// //     'Legal Workflow Automation': ['Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'],
// //     'Legal Research': ['Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval']
// //   };

// //   // Functionalities mapping from original form
// //   const categoryFunctionalitiesMap = {
// //     'Client Relationship Management': [
// //       'Intake and Lead Management',
// //       'Client Portal',
// //       'Document Management',
// //       'Case Alerts',
// //       'Budget, Expense and Time Tracking',
// //       'Client Billing and Invoicing'
// //     ],
// //     'Governance, Risk and Compliance': [
// //       'Policy Management',
// //       'Issue Management',
// //       'Laws, Compliance and Regulatory Tracking'
// //     ],
// //     'Contract Lifecycle Management': [
// //       'Contract Creation and Authoring',
// //       'Contract Repository',
// //       'Contract Negotiation',
// //       'Lifecycle Management',
// //       'Clause Library'
// //     ],
// //     'E-Signature': [
// //       'Fields Creation',
// //       'Tracking and Validity',
// //       'Document Management and Templates',
// //       'Document Capturing'
// //     ],
// //     'Legal Research': [
// //       'Case Law Research',
// //       'Statutory Research',
// //       'Advanced Search Capabilities',
// //       'Filter and Sorting'
// //     ],
// //     'Document Management System': [
// //       'Document Creation and Templates',
// //       'Document Search and Navigation',
// //       'Authentication',
// //       'Task Allotment'
// //     ],
// //     'E-billing and Invoicing': [
// //       'Budgeting, Expense and Time Tracking',
// //       'Client Management',
// //       'Invoice Generation and Review'
// //     ],
// //     'E-discovery': [
// //       'Data Identification and Collection',
// //       'Search, Processing and Analysis',
// //       'Review and Production',
// //       'Legal Hold Management'
// //     ],
// //     'Intellectual Property Management': [
// //       'Ideation and Creation',
// //       'Lifecycle Management',
// //       'Search and Discovery',
// //       'Storage and Repository'
// //     ],
// //     'Litigation Management and Analytics': [
// //       'Matter Lifecycle Tracking',
// //       'Court and Case Search',
// //       'Budget, Expense and Time Tracking',
// //       'Litigation Docketing Features'
// //     ],
// //     'Legal Workflow Automation': [
// //       'Workflow Design and Configuration',
// //       'Assignment Allotment and Tracking',
// //       'Document Creation and Management',
// //       'Laws, Compliance and Regulatory Tracking'
// //     ]
// //   };

// //   // Features mapping from original form - abbreviated for brevity
// //   const functionalityFeaturesMap = {
// //     'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
// //     'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
// //     'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
// //     'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
// //     'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses'],
// //     // Additional mappings would be included here in a real implementation
// //   };
  
// //   const languages = [
// //     { id: 'english', name: 'English' },
// //     { id: 'spanish', name: 'Spanish' },
// //     { id: 'french', name: 'French' },
// //     { id: 'german', name: 'German' },
// //     { id: 'chinese', name: 'Chinese' },
// //     { id: 'japanese', name: 'Japanese' }
// //   ];

// //   const deploymentModels = [
// //     { id: 'On-premise', name: 'On premise deployment' },
// //     { id: 'Cloud', name: 'Cloud based deployment' },
// //     { id: 'Hybrid', name: 'Hybrid deployment' },
// //     { id: 'SaaS', name: 'Software as a Service' },
// //     { id: 'mobile', name: 'Mobile accessibility' }
// //   ];

// //   const regions = [
// //     { id: 'EMEA (Europe, the Middle East and Africa)', name: 'EMEA' },
// //     { id: 'NA (North America)', name: 'NA' },
// //     { id: 'LATAM (Latin America)', name: 'LATAM' },
// //     { id: 'APAC (Asia-Pacific)', name: 'APAC' }
// //   ];

// //   const pricingModels = [
// //     { id: 'Annual Fee', name: 'Annual Subscription' },
// //     { id: 'Monthly subscription', name: 'Monthly subscription' },
// //     { id: 'Perpetual', name: 'Perpetual' },
// //     { id: 'Volume based', name: 'Volume based' },
// //     { id: 'One time', name: 'One time' }
// //   ];
  
// //   // State for pagination and search
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const resultsPerPage = 5;

// //   const goToPreviousStage = () => {
// //     if (currentStage > 1) {
// //       setCurrentStage(currentStage - 1);
// //     }
// //   };

// //   const handleOptionSelect = (field, value) => {
// //     if (field === 'category') {
// //       // Reset dependent fields when category changes
// //       setFormData({
// //         ...formData,
// //         category: value,
// //         processStages: [],
// //         keyFunctionalities: [],
// //         specificFeatures: []
// //       });
// //     } else if (Array.isArray(formData[field])) {
// //       // Toggle selection for arrays (multi-select)
// //       if (formData[field].includes(value)) {
// //         setFormData({
// //           ...formData, 
// //           [field]: formData[field].filter(item => item !== value)
// //         });
// //       } else {
// //         setFormData({
// //           ...formData,
// //           [field]: [...formData[field], value]
// //         });
// //       }
// //     } else {
// //       // Simple selection for strings (single-select)
// //       setFormData({
// //         ...formData,
// //         [field]: value
// //       });
// //     }
// //   };

// //   // Function to check if the current stage has valid selections to proceed
// //   const canProceed = () => {
// //     switch (currentStage) {
// //       case 1:
// //         return formData.category && formData.teamType && formData.teamSize;
// //       case 2:
// //         return formData.processStages.length > 0 && formData.keyFunctionalities.length > 0;
// //       case 3:
// //         return formData.language && formData.deploymentModel && formData.region && formData.pricingModel;
// //       default:
// //         return true;
// //     }
// //   };

// //   // Get process stages based on selected category
// //   const getProcessStages = () => {
// //     if (!formData.category) return [];
// //     return categoryStagesMap[formData.category] || [];
// //   };

// //   // Get functionalities based on selected category
// //   const getFunctionalities = () => {
// //     if (!formData.category) return [];
// //     return categoryFunctionalitiesMap[formData.category] || [];
// //   };

// //   // Get features based on selected functionalities
// //   const getFeatures = () => {
// //     if (formData.keyFunctionalities.length === 0) return [];
    
// //     const allFeatures = new Set();
// //     formData.keyFunctionalities.forEach(functionality => {
// //       const features = functionalityFeaturesMap[functionality] || [];
// //       features.forEach(feature => allFeatures.add(feature));
// //     });
    
// //     return Array.from(allFeatures);
// //   };

// //   const [error, setError] = useState(null)
  
// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await fetch('/api/evaluate-legal-tech', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to get evaluation results');
// //       }
      
// //       const data = await response.json();
// //       setResults(data);
      
// //       // Automatically move to results stage
// //       setCurrentStage(4);
// //       window.scrollTo(0, 0);
// //     } catch (err) {
// //       console.error('Error during evaluation:', err);
// //       setError(err.message || 'Something went wrong during evaluation');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
// //   const goToNextStage = () => {
// //     if (currentStage < 4) {
// //       const nextStage = currentStage + 1;
// //       setCurrentStage(nextStage);
      
// //       // Automatically submit when reaching the results stage
// //       if (nextStage === 4) {
// //         handleSubmit();
// //       }
      
// //       window.scrollTo(0, 0);
// //     }
// //   };
  
// //   const filteredResults = results?.results?.filter(product => 
// //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     product.description.toLowerCase().includes(searchTerm.toLowerCase())
// //   ) || [];
  
// //   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
// //   const paginatedResults = filteredResults.slice(
// //     (currentPage - 1) * resultsPerPage,
// //     currentPage * resultsPerPage
// //   );

// //   // Handle product selection
// //   const handleProductSelect = (product) => {
// //     if (onSelectProduct) {
// //       onSelectProduct(product);
// //     }
// //   };

// //   // Stage progress labels
// //   const totalStages = 4;
// //   const stageLabels = ["Start", "Features", "Vendor", "Results"];

// //   // Render components
// //   const renderStageContent = () => {
// //     switch (currentStage) {
// //       case 1:
// //         return (
// //           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>Legal Tech Software Evaluation</h2>
// //                 <p className="text-lg" style={{ color: '#334155' }}>Let's find the perfect legal technology solution for your needs.</p>
// //               </div>
              
// //               <div className="space-y-4">
// //                 <h3 className="text-xl font-semibold" style={{ color: '#1e2556' }}>Getting Started</h3>
// //                 <p style={{ color: '#2d2d2d' }}>First, tell us about your organization and what type of legal software you're looking for. This helps us understand your specific requirements and match you with the most suitable solutions.</p>
// //                 <ul className="space-y-2" style={{ color: '#2d2d2d' }}>
// //                   <li className="flex items-start">
// //                     <span className="mr-2">•</span>
// //                     <span>Choose your primary software category</span>
// //                   </li>
// //                   <li className="flex items-start">
// //                     <span className="mr-2">•</span>
// //                     <span>Select your organization type</span>
// //                   </li>
// //                   <li className="flex items-start">
// //                     <span className="mr-2">•</span>
// //                     <span>Indicate your team size</span>
// //                   </li>
// //                 </ul>
// //               </div>
// //             </div>

// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h4 className="text-lg font-semibold mb-4" style={{ color: '#334155' }}>Select Software Category</h4>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {categories.map((category) => (
// //                     <button
// //                       key={category.id}
// //                       onClick={() => handleOptionSelect('category', category.id)}
// //                       className={`p-4 rounded-lg transition-all duration-200 flex items-center space-x-3 border ${
// //                         formData.category === category.id
// //                           ? "border-transparent shadow-md"
// //                           : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
// //                       }`}
// //                       style={{
// //                         backgroundColor: formData.category === category.id ? '#1e2556' : '#f5f7fa',
// //                         color: formData.category === category.id ? 'white' : '#2d2d2d'
// //                       }}
// //                     >
// //                       <div className="text-2xl">{category.icon}</div>
// //                       <div className="text-left flex-1">
// //                         <div className="font-medium text-sm">{category.name}</div>
// //                       </div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 gap-6">
// //                 <div>
// //                   <h4 className="text-lg font-semibold mb-3" style={{ color: '#334155' }}>Team Type</h4>
// //                   <div className="space-y-2">
// //                     {teamTypes.map((type) => (
// //                       <button
// //                         key={type.id}
// //                         onClick={() => handleOptionSelect('teamType', type.id)}
// //                         className={`w-full p-3 rounded-lg transition-all duration-200 text-left text-sm ${
// //                           formData.teamType === type.id
// //                             ? "shadow-sm"
// //                             : "hover:shadow-sm"
// //                         }`}
// //                         style={{
// //                           backgroundColor: formData.teamType === type.id ? '#7cc6ee' : '#f5f7fa',
// //                           color: formData.teamType === type.id ? 'white' : '#2d2d2d'
// //                         }}
// //                       >
// //                         {type.name}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <h4 className="text-lg font-semibold mb-3" style={{ color: '#334155' }}>Team Size</h4>
// //                   <div className="space-y-2">
// //                     {teamSizes.map((size) => (
// //                       <button
// //                         key={size.id}
// //                         onClick={() => handleOptionSelect('teamSize', size.id)}
// //                         className={`w-full p-3 rounded-lg transition-all duration-200 text-left text-sm ${
// //                           formData.teamSize === size.id
// //                             ? "shadow-sm"
// //                             : "hover:shadow-sm"
// //                         }`}
// //                         style={{
// //                           backgroundColor: formData.teamSize === size.id ? '#7cc6ee' : '#f5f7fa',
// //                           color: formData.teamSize === size.id ? 'white' : '#2d2d2d'
// //                         }}
// //                       >
// //                         {size.name}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         );
      
// //       case 2:
// //         return (
// //           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>Define Your Requirements</h2>
// //                 <p className="text-lg" style={{ color: '#334155' }}>Select the processes, functionalities, and features that matter most to your team.</p>
// //               </div>
              
// //               <div className="space-y-4">
// //                 <h3 className="text-xl font-semibold" style={{ color: '#1e2556' }}>Process Stages</h3>
// //                 {formData.category ? (
// //                   <div className="space-y-2">
// //                     {getProcessStages().map((stage, index) => (
// //                       <button
// //                         key={index}
// //                         onClick={() => handleOptionSelect('processStages', stage)}
// //                         className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between ${
// //                           formData.processStages.includes(stage)
// //                             ? "shadow-md"
// //                             : "hover:shadow-sm"
// //                         }`}
// //                         style={{
// //                           backgroundColor: formData.processStages.includes(stage) ? '#1e2556' : '#f5f7fa',
// //                           color: formData.processStages.includes(stage) ? 'white' : '#2d2d2d'
// //                         }}
// //                       >
// //                         <span className="font-medium">{stage}</span>
// //                         {formData.processStages.includes(stage) && (
// //                           <Check className="h-5 w-5" />
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p className="text-orange-600">Please select a category in Step 1</p>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Key Functionalities</h3>
// //                 {formData.category ? (
// //                   <div className="space-y-2">
// //                     {getFunctionalities().map((func, index) => (
// //                       <button
// //                         key={index}
// //                         onClick={() => handleOptionSelect('keyFunctionalities', func)}
// //                         className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between ${
// //                           formData.keyFunctionalities.includes(func)
// //                             ? "shadow-md"
// //                             : "hover:shadow-sm"
// //                         }`}
// //                         style={{
// //                           backgroundColor: formData.keyFunctionalities.includes(func) ? '#7cc6ee' : '#f5f7fa',
// //                           color: formData.keyFunctionalities.includes(func) ? 'white' : '#2d2d2d'
// //                         }}
// //                       >
// //                         <span className="font-medium">{func}</span>
// //                         {formData.keyFunctionalities.includes(func) && (
// //                           <Check className="h-5 w-5" />
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p className="text-orange-600">Please select a category in Step 1</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Specific Features</h3>
// //                 {formData.keyFunctionalities.length > 0 ? (
// //                   <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
// //                     {getFeatures().map((feature, index) => (
// //                       <button
// //                         key={index}
// //                         onClick={() => handleOptionSelect('specificFeatures', feature)}
// //                         className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center justify-between text-sm ${
// //                           formData.specificFeatures.includes(feature)
// //                             ? "shadow-sm"
// //                             : "hover:shadow-sm"
// //                         }`}
// //                         style={{
// //                           backgroundColor: formData.specificFeatures.includes(feature) ? '#7cc6ee' : '#f5f7fa',
// //                           color: formData.specificFeatures.includes(feature) ? 'white' : '#2d2d2d'
// //                         }}
// //                       >
// //                         <span>{feature}</span>
// //                         {formData.specificFeatures.includes(feature) && (
// //                           <Check className="h-4 w-4" />
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p className="text-orange-600">Please select key functionalities first</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         );
      
// //       case 3:
// //         return (
// //           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>Vendor Preferences</h2>
// //                 <p className="text-lg" style={{ color: '#334155' }}>Specify your technical and business requirements for the ideal solution.</p>
// //               </div>
              
// //               <div className="space-y-6">
// //                 <div>
// //                   <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Language & Region</h3>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>Language Requirement</label>
// //                       <div className="relative">
// //                         <select 
// //                           className="w-full p-4 rounded-lg appearance-none focus:outline-none focus:ring-2"
// //                           style={{ 
// //                             backgroundColor: '#f5f7fa',
// //                             color: '#2d2d2d',
// //                             borderColor: formData.language ? '#7cc6ee' : 'transparent',
// //                             borderWidth: '2px',
// //                             outlineColor: '#7cc6ee'
// //                           }}
// //                           value={formData.language}
// //                           onChange={(e) => setFormData({...formData, language: e.target.value})}
// //                         >
// //                           <option value="">Select language</option>
// //                           {languages.map((lang) => (
// //                             <option key={lang.id} value={lang.id}>{lang.name}</option>
// //                           ))}
// //                         </select>
// //                         <ChevronDown className="absolute right-4 top-5 h-5 w-5 pointer-events-none" style={{ color: '#334155' }} />
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>Region</label>
// //                       <div className="grid grid-cols-2 gap-2">
// //                         {regions.map((region) => (
// //                           <button
// //                             key={region.id}
// //                             onClick={() => handleOptionSelect('region', region.id)}
// //                             className={`p-3 rounded-lg transition-all duration-200 ${
// //                               formData.region === region.id
// //                                 ? "shadow-md"
// //                                 : "hover:shadow-sm"
// //                             }`}
// //                             style={{
// //                               backgroundColor: formData.region === region.id ? '#1e2556' : '#f5f7fa',
// //                               color: formData.region === region.id ? 'white' : '#2d2d2d'
// //                             }}
// //                           >
// //                             <div className="font-medium">{region.name}</div>
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Deployment & Pricing</h3>
// //                 <div className="space-y-6">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>Deployment Model</label>
// //                     <div className="space-y-2">
// //                       {deploymentModels.map((model) => (
// //                         <button
// //                           key={model.id}
// //                           onClick={() => handleOptionSelect('deploymentModel', model.id)}
// //                           className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
// //                             formData.deploymentModel === model.id
// //                               ? "shadow-md"
// //                               : "hover:shadow-sm"
// //                           }`}
// //                           style={{
// //                             backgroundColor: formData.deploymentModel === model.id ? '#7cc6ee' : '#f5f7fa',
// //                             color: formData.deploymentModel === model.id ? 'white' : '#2d2d2d'
// //                           }}
// //                         >
// //                           <div className="font-medium">{model.name}</div>
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium mb-2" style={{ color: '#334155' }}>Pricing Model</label>
// //                     <div className="space-y-2">
// //                       {pricingModels.map((pricing) => (
// //                         <button
// //                           key={pricing.id}
// //                           onClick={() => handleOptionSelect('pricingModel', pricing.id)}
// //                           className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
// //                             formData.pricingModel === pricing.id
// //                               ? "shadow-md"
// //                               : "hover:shadow-sm"
// //                           }`}
// //                           style={{
// //                             backgroundColor: formData.pricingModel === pricing.id ? '#7cc6ee' : '#f5f7fa',
// //                             color: formData.pricingModel === pricing.id ? 'white' : '#2d2d2d'
// //                           }}
// //                         >
// //                           <div className="font-medium">{pricing.name}</div>
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         );
      
// //       case 4:
// //         return (
// //           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
// //             <div className="lg:w-1/2 space-y-6">
// //               <div>
// //                 <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>Your Matched Solutions</h2>
// //                 <p className="text-lg" style={{ color: '#334155' }}>
// //                   {loading ? "Analyzing your requirements..." : `Found ${filteredResults.length} products that match your criteria`}
// //                 </p>
// //               </div>

// //               {!loading && (
// //                 <div>
// //                   <div className="relative mb-6">
// //                     <input
// //                       type="text"
// //                       placeholder="Search products..."
// //                       className="w-full p-4 pl-12 rounded-lg focus:outline-none focus:ring-2"
// //                       style={{ 
// //                         backgroundColor: '#f5f7fa',
// //                         color: '#2d2d2d',
// //                         outlineColor: '#7cc6ee'
// //                       }}
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                     />
// //                     <Search className="absolute left-4 top-5 h-5 w-5" style={{ color: '#334155' }} />
// //                   </div>

// //                   <div className="p-6 rounded-lg" style={{ backgroundColor: '#1e2556' }}>
// //                     <h3 className="text-xl font-semibold mb-4 text-white">How to Choose</h3>
// //                     <ul className="space-y-2 text-white">
// //                       <li className="flex items-start">
// //                         <span className="mr-2">•</span>
// //                         <span>Products are ranked by match percentage</span>
// //                       </li>
// //                       <li className="flex items-start">
// //                         <span className="mr-2">•</span>
// //                         <span>Click on any product for detailed information</span>
// //                       </li>
// //                       <li className="flex items-start">
// //                         <span className="mr-2">•</span>
// //                         <span>Compare features and pricing models</span>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="lg:w-1/2">
// //               {loading ? (
// //                 <div className="flex items-center justify-center h-64">
// //                   <div className="text-center">
// //                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e2556' }}></div>
// //                     <span className="text-lg" style={{ color: '#334155' }}>Finding the best matches...</span>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {paginatedResults.length > 0 ? (
// //                     <>
// //                       {paginatedResults.map((product) => (
// //                         <div 
// //                           key={product.id} 
// //                           className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
// //                           style={{ backgroundColor: '#f5f7fa' }}
// //                           onClick={() => handleProductSelect(product)}
// //                         >
// //                           <div className="p-6">
// //                             <div className="flex items-start justify-between mb-3">
// //                               <div className="flex-1">
// //                                 <h3 className="font-semibold text-lg mb-1" style={{ color: '#1e2556' }}>{product.name}</h3>
// //                                 <div className="flex flex-wrap gap-2 mb-2">
// //                                   {product.category.slice(0, 2).map((cat, idx) => (
// //                                     <span key={idx} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#7cc6ee', color: 'white' }}>
// //                                       {cat}
// //                                     </span>
// //                                   ))}
// //                                   {product.category.length > 2 && (
// //                                     <span className="text-xs px-2 py-1 rounded-full bg-gray-200" style={{ color: '#334155' }}>
// //                                       +{product.category.length - 2}
// //                                     </span>
// //                                   )}
// //                                 </div>
// //                               </div>
// //                               <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
// //                                 product.matchScore >= 90 ? 'bg-green-100' :
// //                                 product.matchScore >= 70 ? 'bg-blue-100' :
// //                                 product.matchScore >= 50 ? 'bg-yellow-100' :
// //                                 'bg-gray-100'
// //                               }`}>
// //                                 <div className="text-center">
// //                                   <div className="font-bold text-lg" style={{ color: '#1e2556' }}>{product.matchScore}%</div>
// //                                   <div className="text-xs" style={{ color: '#334155' }}>match</div>
// //                                 </div>
// //                               </div>
// //                             </div>
                            
// //                             <p className="mb-3" style={{ color: '#2d2d2d' }}>
// //                               {product.description.length > 150 
// //                                 ? `${product.description.substring(0, 150)}...` 
// //                                 : product.description}
// //                             </p>
                            
// //                             <div className="flex items-center justify-between">
// //                               <div className="flex flex-wrap gap-2">
// //                                 {product.deployement.slice(0, 2).map((deploy, idx) => (
// //                                   <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-100" style={{ color: '#334155' }}>
// //                                     {deploy}
// //                                   </span>
// //                                 ))}
// //                               </div>
// //                               <span className="text-sm font-medium flex items-center" style={{ color: '#7cc6ee' }}>
// //                                 View Details <ArrowRight className="ml-1 h-4 w-4" />
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))}
                      
// //                       {totalPages > 1 && (
// //                         <div className="flex justify-center items-center space-x-2 mt-6">
// //                           <button 
// //                             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                             className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
// //                             style={{ 
// //                               backgroundColor: currentPage === 1 ? '#f5f7fa' : '#7cc6ee',
// //                               color: currentPage === 1 ? '#334155' : 'white'
// //                             }}
// //                             disabled={currentPage === 1}
// //                           >
// //                             Previous
// //                           </button>
// //                           <span className="px-4 py-2" style={{ color: '#334155' }}>
// //                             Page {currentPage} of {totalPages}
// //                           </span>
// //                           <button 
// //                             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                             className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
// //                             style={{ 
// //                               backgroundColor: currentPage === totalPages ? '#f5f7fa' : '#7cc6ee',
// //                               color: currentPage === totalPages ? '#334155' : 'white'
// //                             }}
// //                             disabled={currentPage === totalPages}
// //                           >
// //                             Next
// //                           </button>
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     <div className="text-center p-8 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
// //                       <p className="text-lg" style={{ color: '#334155' }}>No products found matching your search</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         );
      
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="w-full mx-auto p-6">
// //       <div className="mb-8">
// //         {/* Progress indicators */}
// //         <div className="relative mb-8">
// //           {/* Main connector line */}
// //           <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>
          
// //           {/* Progress bar overlay */}
// //           <div 
// //             className="absolute top-4 left-0 h-1 transition-all duration-300 ease-in-out"
// //             style={{ 
// //               width: `${((currentStage - 1) / (totalStages - 1)) * 100}%`,
// //               backgroundColor: '#1e2556'
// //             }}
// //           ></div>
          
// //           {/* Stage circles with positioning */}
// //           <div className="flex justify-between relative">
// //             {stageLabels.map((label, index) => (
// //               <div key={index} className="flex flex-col items-center">
// //                 <div 
// //                   className={`w-8 h-8 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
// //                     currentStage === index + 1 
// //                       ? 'border-current' 
// //                       : currentStage > index + 1 
// //                         ? 'border-transparent' 
// //                         : 'bg-white border-gray-300'
// //                   }`}
// //                   style={{
// //                     backgroundColor: currentStage >= index + 1 ? '#1e2556' : 'white',
// //                     borderColor: currentStage === index + 1 ? '#1e2556' : currentStage > index + 1 ? 'transparent' : '#e5e7eb',
// //                     color: currentStage >= index + 1 ? 'white' : '#9ca3af'
// //                   }}
// //                 >
// //                   {currentStage > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
// //                 </div>
// //                 <span 
// //                   className={`font-medium mt-2 transition-all duration-200 text-sm ${
// //                     currentStage >= index + 1 ? 'font-semibold' : ''
// //                   }`}
// //                   style={{
// //                     color: currentStage >= index + 1 ? '#1e2556' : '#9ca3af'
// //                   }}
// //                 >
// //                   {label}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Form content */}
// //       <div className="mb-8">
// //         {renderStageContent()}
// //       </div>
      
// //       {/* Navigation buttons */}
// //       <div className="flex justify-between items-center">
// //         <button
// //           onClick={goToPreviousStage}
// //           className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 font-medium ${
// //             currentStage === 1
// //               ? 'opacity-50 cursor-not-allowed'
// //               : 'hover:shadow-md'
// //           }`}
// //           style={{
// //             backgroundColor: currentStage === 1 ? '#f5f7fa' : 'white',
// //             color: currentStage === 1 ? '#9ca3af' : '#1e2556',
// //             border: currentStage === 1 ? 'none' : '2px solid #1e2556'
// //           }}
// //           disabled={currentStage === 1}
// //         >
// //           <ArrowLeft className="mr-2 h-4 w-4" />
// //           Back
// //         </button>
        
// //         {currentStage < 4 ? (
// //           <button
// //             onClick={goToNextStage}
// //             disabled={!canProceed()}
// //             className={`px-6 py-3 rounded-lg flex items-center font-medium transition-all duration-200 ${
// //               canProceed()
// //                 ? 'hover:shadow-md'
// //                 : 'opacity-50 cursor-not-allowed'
// //             }`}
// //             style={{
// //               backgroundColor: canProceed() ? '#1e2556' : '#f5f7fa',
// //               color: canProceed() ? 'white' : '#9ca3af'
// //             }}
// //           >
// //             {currentStage === 3 ? 'Show Results' : 'Next'}
// //             <ArrowRight className="ml-2 h-4 w-4" />
// //           </button>
// //         ) : (
// //           <div></div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CompactEvaluationForm;
// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, ExternalLink, RefreshCw } from 'lucide-react';

// const CompactEvaluationForm = ({ onSelectProduct, mockApiResponse }) => {
//   const [currentStage, setCurrentStage] = useState(1);
//   const [showResults, setShowResults] = useState(false);
//   const [formData, setFormData] = useState({
//     category: '',
//     teamType: '',
//     teamSize: '',
//     processStages: [],
//     keyFunctionalities: [],
//     specificFeatures: [],
//     language: '',
//     deploymentModel: '',
//     region: '',
//     pricingModel: ''
//   });
  
//   // Results handling
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   // Categories and options from original form
//   const categories = [
//     { id: 'Client Relationship Management', name: 'Client Relationship Management', icon: '👥' },
//     { id: 'Contract Lifecycle Management', name: 'Contract Lifecycle Management', icon: '📝' },
//     { id: 'E-Signature', name: 'E-Signature', icon: '✍️' },
//     { id: 'Document Management System', name: 'Document Management System', icon: '📄' },
//     { id: 'E-billing and Invoicing', name: 'E-billing and Invoicing', icon: '💰' },
//     { id: 'E-discovery', name: 'E-Discovery', icon: '🔍' },
//     { id: 'Governance, Risk and Compliance', name: 'Governance Risk & Compliance', icon: '⚖️' },
//     { id: 'Intellectual Property Management', name: 'Intellectual Property Management', icon: '💡' },
//     { id: 'Legal Research', name: 'Legal Research', icon: '📚' },
//     { id: 'Legal Workflow Automation', name: 'Legal Workflow Automation', icon: '⚙️' },
//     { id: 'Litigation Management and Analytics', name: 'Litigation Management & Analytics', icon: '📊' }
//   ];

//   const teamTypes = [
//     { id: 'Individual Practitioner', name: 'Individual Practitioner' },
//     { id: 'Law firms', name: 'Law Firm' },
//     { id: 'Government departments', name: 'Government Departments' },
//     { id: 'Startups', name: 'Startups' },
//     { id: 'Enterprises', name: 'Enterprises' },
//     { id: 'Judiciary', name: 'Judiciary' },
//     { id: 'In-House Counsels', name: 'In-house Counsels' }
//   ];

//   const teamSizes = [
//     { id: '1', name: '1 person' },
//     { id: '2-20', name: '2-20 people' },
//     { id: '21-50', name: '21-50 people' },
//     { id: '51-200', name: '51-200 people' },
//     { id: '201-500', name: '201-500 people' },
//     { id: '500+', name: '500+ people' }
//   ];
  
//   // Process stages mapping from original form
//   const categoryStagesMap = {
//     'Client Relationship Management': ['Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'],
//     'Governance, Risk and Compliance': ['Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'],
//     'Contract Lifecycle Management': ['Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'],
//     'E-Signature': ['Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'],
//     'Document Management System': ['Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'],
//     'E-billing and Invoicing': ['Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'],
//     'E-discovery': ['Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'],
//     'Intellectual Property Management': ['Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'],
//     'Litigation Management and Analytics': ['Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'],
//     'Legal Workflow Automation': ['Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'],
//     'Legal Research': ['Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval']
//   };

//   // Functionalities mapping from original form
//   const categoryFunctionalitiesMap = {
//     'Client Relationship Management': [
//       'Intake and Lead Management',
//       'Client Portal',
//       'Document Management',
//       'Case Alerts',
//       'Budget, Expense and Time Tracking',
//       'Client Billing and Invoicing'
//     ],
//     'Governance, Risk and Compliance': [
//       'Policy Management',
//       'Issue Management',
//       'Laws, Compliance and Regulatory Tracking'
//     ],
//     'Contract Lifecycle Management': [
//       'Contract Creation and Authoring',
//       'Contract Repository',
//       'Contract Negotiation',
//       'Lifecycle Management',
//       'Clause Library'
//     ],
//     'E-Signature': [
//       'Fields Creation',
//       'Tracking and Validity',
//       'Document Management and Templates',
//       'Document Capturing'
//     ],
//     'Legal Research': [
//       'Case Law Research',
//       'Statutory Research',
//       'Advanced Search Capabilities',
//       'Filter and Sorting'
//     ],
//     'Document Management System': [
//       'Document Creation and Templates',
//       'Document Search and Navigation',
//       'Authentication',
//       'Task Allotment'
//     ],
//     'E-billing and Invoicing': [
//       'Budgeting, Expense and Time Tracking',
//       'Client Management',
//       'Invoice Generation and Review'
//     ],
//     'E-discovery': [
//       'Data Identification and Collection',
//       'Search, Processing and Analysis',
//       'Review and Production',
//       'Legal Hold Management'
//     ],
//     'Intellectual Property Management': [
//       'Ideation and Creation',
//       'Lifecycle Management',
//       'Search and Discovery',
//       'Storage and Repository'
//     ],
//     'Litigation Management and Analytics': [
//       'Matter Lifecycle Tracking',
//       'Court and Case Search',
//       'Budget, Expense and Time Tracking',
//       'Litigation Docketing Features'
//     ],
//     'Legal Workflow Automation': [
//       'Workflow Design and Configuration',
//       'Assignment Allotment and Tracking',
//       'Document Creation and Management',
//       'Laws, Compliance and Regulatory Tracking'
//     ]
//   };

//   // Features mapping from original form - abbreviated for brevity
//   const functionalityFeaturesMap = {
//     'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
//     'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
//     'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
//     'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
//     'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses'],
//     // Additional mappings would be included here in a real implementation
//   };
  
//   const languages = [
//     { id: 'english', name: 'English' },
//     { id: 'spanish', name: 'Spanish' },
//     { id: 'french', name: 'French' },
//     { id: 'german', name: 'German' },
//     { id: 'chinese', name: 'Chinese' },
//     { id: 'japanese', name: 'Japanese' }
//   ];

//   const deploymentModels = [
//     { id: 'On-premise', name: 'On premise deployment' },
//     { id: 'Cloud', name: 'Cloud based deployment' },
//     { id: 'Hybrid', name: 'Hybrid deployment' },
//     { id: 'SaaS', name: 'Software as a Service' },
//     { id: 'mobile', name: 'Mobile accessibility' }
//   ];

//   const regions = [
//     { id: 'EMEA (Europe, the Middle East and Africa)', name: 'EMEA' },
//     { id: 'NA (North America)', name: 'NA' },
//     { id: 'LATAM (Latin America)', name: 'LATAM' },
//     { id: 'APAC (Asia-Pacific)', name: 'APAC' }
//   ];

//   const pricingModels = [
//     { id: 'Annual Fee', name: 'Annual Subscription' },
//     { id: 'Monthly subscription', name: 'Monthly subscription' },
//     { id: 'Perpetual', name: 'Perpetual' },
//     { id: 'Volume based', name: 'Volume based' },
//     { id: 'One time', name: 'One time' }
//   ];
  
//   // State for pagination and search
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const resultsPerPage = 5;

//   const goToPreviousStage = () => {
//     if (currentStage > 1) {
//       setCurrentStage(currentStage - 1);
//     }
//   };

//   const handleOptionSelect = (field, value) => {
//     if (field === 'category') {
//       // Reset dependent fields when category changes
//       setFormData({
//         ...formData,
//         category: value,
//         processStages: [],
//         keyFunctionalities: [],
//         specificFeatures: []
//       });
//     } else if (Array.isArray(formData[field])) {
//       // Toggle selection for arrays (multi-select)
//       if (formData[field].includes(value)) {
//         setFormData({
//           ...formData, 
//           [field]: formData[field].filter(item => item !== value)
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [field]: [...formData[field], value]
//         });
//       }
//     } else {
//       // Simple selection for strings (single-select)
//       setFormData({
//         ...formData,
//         [field]: value
//       });
//     }
//   };

//   // Function to check if the current stage has valid selections to proceed
//   const canProceed = () => {
//     switch (currentStage) {
//       case 1:
//         return formData.category && formData.teamType && formData.teamSize;
//       case 2:
//         return formData.processStages.length > 0 && formData.keyFunctionalities.length > 0;
//       case 3:
//         return formData.language && formData.deploymentModel && formData.region && formData.pricingModel;
//       default:
//         return true;
//     }
//   };

//   // Reset form and go to first stage
//   const resetForm = () => {
//     setFormData({
//       category: '',
//       teamType: '',
//       teamSize: '',
//       processStages: [],
//       keyFunctionalities: [],
//       specificFeatures: [],
//       language: '',
//       deploymentModel: '',
//       region: '',
//       pricingModel: ''
//     });
//     setResults(null);
//     setCurrentStage(1);
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   // Get process stages based on selected category
//   const getProcessStages = () => {
//     if (!formData.category) return [];
//     return categoryStagesMap[formData.category] || [];
//   };

//   // Get functionalities based on selected category
//   const getFunctionalities = () => {
//     if (!formData.category) return [];
//     return categoryFunctionalitiesMap[formData.category] || [];
//   };

//   // Get features based on selected functionalities
//   const getFeatures = () => {
//     if (formData.keyFunctionalities.length === 0) return [];
    
//     const allFeatures = new Set();
//     formData.keyFunctionalities.forEach(functionality => {
//       const features = functionalityFeaturesMap[functionality] || [];
//       features.forEach(feature => allFeatures.add(feature));
//     });
    
//     return Array.from(allFeatures);
//   };

//   const [error, setError] = useState(null)
  
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/evaluate-legal-tech', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to get evaluation results');
//       }
      
//       const data = await response.json();
//       setResults(data);
      
//       // Automatically move to results stage
//       setCurrentStage(4);
//       window.scrollTo(0, 0);
//     } catch (err) {
//       console.error('Error during evaluation:', err);
//       setError(err.message || 'Something went wrong during evaluation');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const goToNextStage = () => {
//     if (currentStage < 4) {
//       const nextStage = currentStage + 1;
//       setCurrentStage(nextStage);
      
//       // Automatically submit when reaching the results stage
//       if (nextStage === 4) {
//         handleSubmit();
//       }
      
//       window.scrollTo(0, 0);
//     }
//   };
  
//   const filteredResults = results?.results?.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.description.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];
  
//   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
//   const paginatedResults = filteredResults.slice(
//     (currentPage - 1) * resultsPerPage,
//     currentPage * resultsPerPage
//   );

//   // Handle product selection
//   const handleProductSelect = (product) => {
//     if (onSelectProduct) {
//       onSelectProduct(product);
//     }
//   };

//   // Stage progress labels
//   const totalStages = 4;
//   const stageLabels = ["Start", "Features", "Vendor", "Results"];

//   // Render components
//   const renderStageContent = () => {
//     switch (currentStage) {
//       case 1:
//         return (
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
//             <div className="lg:w-1/2">
//               <h4 className="text-lg font-semibold mb-4" style={{ color: '#334155' }}>Select Software Category</h4>
//               <div className="grid grid-cols-2 gap-3">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleOptionSelect('category', category.id)}
//                     className={`p-4 rounded-lg transition-all duration-200 flex items-center space-x-3 border ${
//                       formData.category === category.id
//                         ? "border-transparent shadow-md"
//                         : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                     }`}
//                     style={{
//                       backgroundColor: formData.category === category.id ? '#1e2556' : '#f5f7fa',
//                       color: formData.category === category.id ? 'white' : '#2d2d2d'
//                     }}
//                   >
//                     <div className="text-2xl">{category.icon}</div>
//                     <div className="text-left flex-1">
//                       <div className="font-medium text-sm">{category.name}</div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="lg:w-1/2 space-y-6">
//               <div>
//                 <h4 className="text-lg font-semibold mb-3" style={{ color: '#334155' }}>Team Type</h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {teamTypes.map((type) => (
//                     <button
//                       key={type.id}
//                       onClick={() => handleOptionSelect('teamType', type.id)}
//                       className={`p-3 rounded-lg transition-all duration-200 text-left text-sm ${
//                         formData.teamType === type.id
//                           ? "shadow-sm"
//                           : "hover:shadow-sm"
//                       }`}
//                       style={{
//                         backgroundColor: formData.teamType === type.id ? '#7cc6ee' : '#f5f7fa',
//                         color: formData.teamType === type.id ? 'white' : '#2d2d2d'
//                       }}
//                     >
//                       {type.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-lg font-semibold mb-3" style={{ color: '#334155' }}>Team Size</h4>
//                 <div className="grid grid-cols-3 gap-2">
//                   {teamSizes.map((size) => (
//                     <button
//                       key={size.id}
//                       onClick={() => handleOptionSelect('teamSize', size.id)}
//                       className={`p-3 rounded-lg transition-all duration-200 text-center text-sm ${
//                         formData.teamSize === size.id
//                           ? "shadow-sm"
//                           : "hover:shadow-sm"
//                       }`}
//                       style={{
//                         backgroundColor: formData.teamSize === size.id ? '#7cc6ee' : '#f5f7fa',
//                         color: formData.teamSize === size.id ? 'white' : '#2d2d2d'
//                       }}
//                     >
//                       {size.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
      
//       case 2:
//         return (
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
//             <div className="lg:w-1/2 space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Process Stages</h3>
//                 {formData.category ? (
//                   <div className="space-y-2">
//                     {getProcessStages().map((stage, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleOptionSelect('processStages', stage)}
//                         className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between ${
//                           formData.processStages.includes(stage)
//                             ? "shadow-md"
//                             : "hover:shadow-sm"
//                         }`}
//                         style={{
//                           backgroundColor: formData.processStages.includes(stage) ? '#1e2556' : '#f5f7fa',
//                           color: formData.processStages.includes(stage) ? 'white' : '#2d2d2d'
//                         }}
//                       >
//                         <span className="font-medium">{stage}</span>
//                         {formData.processStages.includes(stage) && (
//                           <Check className="h-5 w-5" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-orange-600">Please select a category in Step 1</p>
//                 )}
//               </div>
//             </div>

//             <div className="lg:w-1/2 space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Key Functionalities</h3>
//                 {formData.category ? (
//                   <div className="space-y-2">
//                     {getFunctionalities().map((func, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleOptionSelect('keyFunctionalities', func)}
//                         className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between ${
//                           formData.keyFunctionalities.includes(func)
//                             ? "shadow-md"
//                             : "hover:shadow-sm"
//                         }`}
//                         style={{
//                           backgroundColor: formData.keyFunctionalities.includes(func) ? '#7cc6ee' : '#f5f7fa',
//                           color: formData.keyFunctionalities.includes(func) ? 'white' : '#2d2d2d'
//                         }}
//                       >
//                         <span className="font-medium">{func}</span>
//                         {formData.keyFunctionalities.includes(func) && (
//                           <Check className="h-5 w-5" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-orange-600">Please select a category in Step 1</p>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Specific Features</h3>
//                 {formData.keyFunctionalities.length > 0 ? (
//                   <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
//                     {getFeatures().map((feature, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleOptionSelect('specificFeatures', feature)}
//                         className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center justify-between text-sm ${
//                           formData.specificFeatures.includes(feature)
//                             ? "shadow-sm"
//                             : "hover:shadow-sm"
//                         }`}
//                         style={{
//                           backgroundColor: formData.specificFeatures.includes(feature) ? '#7cc6ee' : '#f5f7fa',
//                           color: formData.specificFeatures.includes(feature) ? 'white' : '#2d2d2d'
//                         }}
//                       >
//                         <span>{feature}</span>
//                         {formData.specificFeatures.includes(feature) && (
//                           <Check className="h-4 w-4" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-orange-600">Please select key functionalities first</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
      
//       case 3:
//         return (
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
//             <div className="lg:w-1/2 space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Deployment Model</h3>
//                 <div className="space-y-2">
//                   {deploymentModels.map((model) => (
//                     <button
//                       key={model.id}
//                       onClick={() => handleOptionSelect('deploymentModel', model.id)}
//                       className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
//                         formData.deploymentModel === model.id
//                           ? "shadow-md"
//                           : "hover:shadow-sm"
//                       }`}
//                       style={{
//                         backgroundColor: formData.deploymentModel === model.id ? '#1e2556' : '#f5f7fa',
//                         color: formData.deploymentModel === model.id ? 'white' : '#2d2d2d'
//                       }}
//                     >
//                       <div className="font-medium">{model.name}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-lg font-semibold mb-3" style={{ color: '#1e2556' }}>Language Requirement</label>
//                 <div className="relative">
//                   <select 
//                     className="w-full p-4 rounded-lg appearance-none focus:outline-none focus:ring-2"
//                     style={{ 
//                       backgroundColor: '#f5f7fa',
//                       color: '#2d2d2d',
//                       borderColor: formData.language ? '#7cc6ee' : 'transparent',
//                       borderWidth: '2px',
//                       outlineColor: '#7cc6ee'
//                     }}
//                     value={formData.language}
//                     onChange={(e) => setFormData({...formData, language: e.target.value})}
//                   >
//                     <option value="">Select language</option>
//                     {languages.map((lang) => (
//                       <option key={lang.id} value={lang.id}>{lang.name}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-4 top-5 h-5 w-5 pointer-events-none" style={{ color: '#334155' }} />
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-1/2 space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Region</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {regions.map((region) => (
//                     <button
//                       key={region.id}
//                       onClick={() => handleOptionSelect('region', region.id)}
//                       className={`p-4 rounded-lg transition-all duration-200 ${
//                         formData.region === region.id
//                           ? "shadow-md"
//                           : "hover:shadow-sm"
//                       }`}
//                       style={{
//                         backgroundColor: formData.region === region.id ? '#7cc6ee' : '#f5f7fa',
//                         color: formData.region === region.id ? 'white' : '#2d2d2d'
//                       }}
//                     >
//                       <div className="font-medium">{region.name}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e2556' }}>Pricing Model</h3>
//                 <div className="space-y-2">
//                   {pricingModels.map((pricing) => (
//                     <button
//                       key={pricing.id}
//                       onClick={() => handleOptionSelect('pricingModel', pricing.id)}
//                       className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
//                         formData.pricingModel === pricing.id
//                           ? "shadow-md"
//                           : "hover:shadow-sm"
//                       }`}
//                       style={{
//                         backgroundColor: formData.pricingModel === pricing.id ? '#7cc6ee' : '#f5f7fa',
//                         color: formData.pricingModel === pricing.id ? 'white' : '#2d2d2d'
//                       }}
//                     >
//                       <div className="font-medium">{pricing.name}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
      
//       case 4:
//         return (
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[400px]">
//             <div className="lg:w-1/3 space-y-6">
//               <div>
//                 <h2 className="text-3xl font-bold mb-2" style={{ color: '#1e2556' }}>Your Matched Solutions</h2>
//                 <p className="text-lg" style={{ color: '#334155' }}>
//                   {loading ? "Analyzing your requirements..." : `Found ${filteredResults.length} products that match your criteria`}
//                 </p>
//               </div>

//               {!loading && (
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="w-full p-4 pl-12 rounded-lg focus:outline-none focus:ring-2"
//                     style={{ 
//                       backgroundColor: '#f5f7fa',
//                       color: '#2d2d2d',
//                       outlineColor: '#7cc6ee'
//                     }}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <Search className="absolute left-4 top-5 h-5 w-5" style={{ color: '#334155' }} />
//                 </div>
//               )}

//               <div className="p-6 rounded-lg" style={{ backgroundColor: '#1e2556' }}>
//                 <h3 className="text-xl font-semibold mb-4 text-white">How to Choose</h3>
//                 <ul className="space-y-2 text-white">
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>Products are ranked by match percentage</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>Click on any product for detailed information</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>Compare features and pricing models</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="lg:w-2/3">
//               {loading ? (
//                 <div className="flex items-center justify-center h-64">
//                   <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#1e2556' }}></div>
//                     <span className="text-lg" style={{ color: '#334155' }}>Finding the best matches...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {paginatedResults.length > 0 ? (
//                     <>
//                       {paginatedResults.map((product) => (
//                         <div 
//                           key={product.id} 
//                           className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//                           style={{ backgroundColor: '#f5f7fa' }}
//                           onClick={() => handleProductSelect(product)}
//                         >
//                           <div className="p-6">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1">
//                                 <h3 className="font-semibold text-lg mb-1" style={{ color: '#1e2556' }}>{product.name}</h3>
//                                 <div className="flex flex-wrap gap-2 mb-2">
//                                   {product.category.slice(0, 2).map((cat, idx) => (
//                                     <span key={idx} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#7cc6ee', color: 'white' }}>
//                                       {cat}
//                                     </span>
//                                   ))}
//                                   {product.category.length > 2 && (
//                                     <span className="text-xs px-2 py-1 rounded-full bg-gray-200" style={{ color: '#334155' }}>
//                                       +{product.category.length - 2}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                                 product.matchScore >= 90 ? 'bg-green-100' :
//                                 product.matchScore >= 70 ? 'bg-blue-100' :
//                                 product.matchScore >= 50 ? 'bg-yellow-100' :
//                                 'bg-gray-100'
//                               }`}>
//                                 <div className="text-center">
//                                   <div className="font-bold text-lg" style={{ color: '#1e2556' }}>{product.matchScore}%</div>
//                                   <div className="text-xs" style={{ color: '#334155' }}>match</div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <p className="mb-3" style={{ color: '#2d2d2d' }}>
//                               {product.description.length > 150 
//                                 ? `${product.description.substring(0, 150)}...` 
//                                 : product.description}
//                             </p>
                            
//                             <div className="flex items-center justify-between">
//                               <div className="flex flex-wrap gap-2">
//                                 {product.deployement.slice(0, 2).map((deploy, idx) => (
//                                   <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-100" style={{ color: '#334155' }}>
//                                     {deploy}
//                                   </span>
//                                 ))}
//                               </div>
//                               <span className="text-sm font-medium flex items-center" style={{ color: '#7cc6ee' }}>
//                                 View Details <ArrowRight className="ml-1 h-4 w-4" />
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
                      
//                       {totalPages > 1 && (
//                         <div className="flex justify-center items-center space-x-2 mt-6">
//                           <button 
//                             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                             className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
//                             style={{ 
//                               backgroundColor: currentPage === 1 ? '#f5f7fa' : '#7cc6ee',
//                               color: currentPage === 1 ? '#334155' : 'white'
//                             }}
//                             disabled={currentPage === 1}
//                           >
//                             Previous
//                           </button>
//                           <span className="px-4 py-2" style={{ color: '#334155' }}>
//                             Page {currentPage} of {totalPages}
//                           </span>
//                           <button 
//                             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                             className="px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
//                             style={{ 
//                               backgroundColor: currentPage === totalPages ? '#f5f7fa' : '#7cc6ee',
//                               color: currentPage === totalPages ? '#334155' : 'white'
//                             }}
//                             disabled={currentPage === totalPages}
//                           >
//                             Next
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="text-center p-8 rounded-lg" style={{ backgroundColor: '#f5f7fa' }}>
//                       <p className="text-lg" style={{ color: '#334155' }}>No products found matching your search</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       <div className="mb-8">
//         {/* Progress indicators */}
//         <div className="relative mb-8">
//           {/* Main connector line */}
//           <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>
          
//           {/* Progress bar overlay */}
//           <div 
//             className="absolute top-4 left-0 h-1 transition-all duration-300 ease-in-out"
//             style={{ 
//               width: `${((currentStage - 1) / (totalStages - 1)) * 100}%`,
//               backgroundColor: '#1e2556'
//             }}
//           ></div>
          
//           {/* Stage circles with positioning */}
//           <div className="flex justify-between relative">
//             {stageLabels.map((label, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div 
//                   className={`w-8 h-8 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
//                     currentStage === index + 1 
//                       ? 'border-current' 
//                       : currentStage > index + 1 
//                         ? 'border-transparent' 
//                         : 'bg-white border-gray-300'
//                   }`}
//                   style={{
//                     backgroundColor: currentStage >= index + 1 ? '#1e2556' : 'white',
//                     borderColor: currentStage === index + 1 ? '#1e2556' : currentStage > index + 1 ? 'transparent' : '#e5e7eb',
//                     color: currentStage >= index + 1 ? 'white' : '#9ca3af'
//                   }}
//                 >
//                   {currentStage > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
//                 </div>
//                 <span 
//                   className={`font-medium mt-2 transition-all duration-200 text-sm ${
//                     currentStage >= index + 1 ? 'font-semibold' : ''
//                   }`}
//                   style={{
//                     color: currentStage >= index + 1 ? '#1e2556' : '#9ca3af'
//                   }}
//                 >
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Form content */}
//       <div className="mb-8">
//         {renderStageContent()}
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between items-center">
//         <button
//           onClick={goToPreviousStage}
//           className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 font-medium ${
//             currentStage === 1
//               ? 'opacity-50 cursor-not-allowed'
//               : 'hover:shadow-md'
//           }`}
//           style={{
//             backgroundColor: currentStage === 1 ? '#f5f7fa' : 'white',
//             color: currentStage === 1 ? '#9ca3af' : '#1e2556',
//             border: currentStage === 1 ? 'none' : '2px solid #1e2556'
//           }}
//           disabled={currentStage === 1}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </button>
        
//         {currentStage < 4 ? (
//           <button
//             onClick={goToNextStage}
//             disabled={!canProceed()}
//             className={`px-6 py-3 rounded-lg flex items-center font-medium transition-all duration-200 ${
//               canProceed()
//                 ? 'hover:shadow-md'
//                 : 'opacity-50 cursor-not-allowed'
//             }`}
//             style={{
//               backgroundColor: canProceed() ? '#1e2556' : '#f5f7fa',
//               color: canProceed() ? 'white' : '#9ca3af'
//             }}
//           >
//             {currentStage === 3 ? 'Show Results' : 'Next'}
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </button>
//         ) : (
//           <button
//             onClick={resetForm}
//             className="px-6 py-3 rounded-lg flex items-center font-medium transition-all duration-200 hover:shadow-md"
//             style={{
//               backgroundColor: '#7cc6ee',
//               color: 'white'
//             }}
//           >
//             <RefreshCw className="mr-2 h-4 w-4" />
//             Start New Evaluation
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompactEvaluationForm;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, ExternalLink, RotateCcw } from 'lucide-react';

const CompactEvaluationForm = ({ onSelectProduct, mockApiResponse }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    teamType: '',
    teamSize: '',
    processStages: [],
    keyFunctionalities: [],
    specificFeatures: [],
    language: '',
    deploymentModel: '',
    region: '',
    pricingModel: ''
  });
  
  // Results handling
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Categories with improved organization
  const categories = [
    { id: 'Client Relationship Management', name: 'Client Relationship Management', icon: '👥' },
    { id: 'Contract Lifecycle Management', name: 'Contract Lifecycle Management', icon: '📝' },
    { id: 'E-Signature', name: 'E-Signature', icon: '✍️' },
    { id: 'Document Management System', name: 'Document Management System', icon: '📄' },
    { id: 'E-billing and Invoicing', name: 'E-billing and Invoicing', icon: '💰' },
    { id: 'E-discovery', name: 'E-Discovery', icon: '🔍' },
    { id: 'Governance, Risk and Compliance', name: 'Governance Risk & Compliance', icon: '⚖️' },
    { id: 'Intellectual Property Management', name: 'Intellectual Property Management', icon: '💡' },
    { id: 'Legal Research', name: 'Legal Research', icon: '📚' },
    { id: 'Legal Workflow Automation', name: 'Legal Workflow Automation', icon: '⚙️' },
    { id: 'Litigation Management and Analytics', name: 'Litigation Management & Analytics', icon: '📊' }
  ];

  const teamTypes = [
    { id: 'Individual Practitioner', name: 'Individual Practitioner' },
    { id: 'Law firms', name: 'Law Firm' },
    { id: 'Government departments', name: 'Government Departments' },
    { id: 'Startups', name: 'Startups' },
    { id: 'Enterprises', name: 'Enterprises' },
    { id: 'Judiciary', name: 'Judiciary' },
    { id: 'In-House Counsels', name: 'In-house Counsels' }
  ];

  const teamSizes = [
    { id: '1', name: '1 person' },
    { id: '2-20', name: '2-20 people' },
    { id: '21-50', name: '21-50 people' },
    { id: '51-200', name: '51-200 people' },
    { id: '201-500', name: '201-500 people' },
    { id: '500+', name: '500+ people' }
  ];
  
  // Process stages mapping from original form
  const categoryStagesMap = {
    'Client Relationship Management': ['Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'],
    'Governance, Risk and Compliance': ['Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'],
    'Contract Lifecycle Management': ['Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'],
    'E-Signature': ['Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'],
    'Document Management System': ['Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'],
    'E-billing and Invoicing': ['Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Facilitation', 'Tracking', 'Analysis'],
    'E-discovery': ['Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'],
    'Intellectual Property Management': ['Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'],
    'Litigation Management and Analytics': ['Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'],
    'Legal Workflow Automation': ['Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'],
    'Legal Research': ['Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval']
  };

  // Functionalities mapping from original form
  const categoryFunctionalitiesMap = {
    'Client Relationship Management': [
      'Intake and Lead Management',
      'Client Portal',
      'Document Management',
      'Case Alerts',
      'Budget, Expense and Time Tracking',
      'Client Billing and Invoicing'
    ],
    'Governance, Risk and Compliance': [
      'Policy Management',
      'Issue Management',
      'Laws, Compliance and Regulatory Tracking'
    ],
    'Contract Lifecycle Management': [
      'Contract Creation and Authoring',
      'Contract Repository',
      'Contract Negotiation',
      'Lifecycle Management',
      'Clause Library'
    ],
    'E-Signature': [
      'Fields Creation',
      'Tracking and Validity',
      'Document Management and Templates',
      'Document Capturing'
    ],
    'Legal Research': [
      'Case Law Research',
      'Statutory Research',
      'Advanced Search Capabilities',
      'Filter and Sorting'
    ],
    'Document Management System': [
      'Document Creation and Templates',
      'Document Search and Navigation',
      'Authentication',
      'Task Allotment'
    ],
    'E-billing and Invoicing': [
      'Budgeting, Expense and Time Tracking',
      'Client Management',
      'Invoice Generation and Review'
    ],
    'E-discovery': [
      'Data Identification and Collection',
      'Search, Processing and Analysis',
      'Review and Production',
      'Legal Hold Management'
    ],
    'Intellectual Property Management': [
      'Ideation and Creation',
      'Lifecycle Management',
      'Search and Discovery',
      'Storage and Repository'
    ],
    'Litigation Management and Analytics': [
      'Matter Lifecycle Tracking',
      'Court and Case Search',
      'Budget, Expense and Time Tracking',
      'Litigation Docketing Features'
    ],
    'Legal Workflow Automation': [
      'Workflow Design and Configuration',
      'Assignment Allotment and Tracking',
      'Document Creation and Management',
      'Laws, Compliance and Regulatory Tracking'
    ]
  };

  // Features mapping from original form - abbreviated for brevity
  const functionalityFeaturesMap = {
    'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
    'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
    'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
    'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
    'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses'],
    // Additional mappings would be included here in a real implementation
  };
  
  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'japanese', name: 'Japanese' }
  ];

  const deploymentModels = [
    { id: 'On-premise', name: 'On premise deployment' },
    { id: 'Cloud', name: 'Cloud based deployment' },
    { id: 'Hybrid', name: 'Hybrid deployment' },
    { id: 'SaaS', name: 'Software as a Service' },
    { id: 'mobile', name: 'Mobile accessibility' }
  ];

  const regions = [
    { id: 'EMEA (Europe, the Middle East and Africa)', name: 'EMEA' },
    { id: 'NA (North America)', name: 'NA' },
    { id: 'LATAM (Latin America)', name: 'LATAM' },
    { id: 'APAC (Asia-Pacific)', name: 'APAC' }
  ];

  const pricingModels = [
    { id: 'Annual Fee', name: 'Annual Subscription' },
    { id: 'Monthly subscription', name: 'Monthly subscription' },
    { id: 'Perpetual', name: 'Perpetual' },
    { id: 'Volume based', name: 'Volume based' },
    { id: 'One time', name: 'One time' }
  ];
  
  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const resultsPerPage = 5;

  const goToPreviousStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const restartForm = () => {
    setFormData({
      category: '',
      teamType: '',
      teamSize: '',
      processStages: [],
      keyFunctionalities: [],
      specificFeatures: [],
      language: '',
      deploymentModel: '',
      region: '',
      pricingModel: ''
    });
    setResults(null);
    setCurrentStage(1);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleOptionSelect = (field, value) => {
    if (field === 'category') {
      // Reset dependent fields when category changes
      setFormData({
        ...formData,
        category: value,
        processStages: [],
        keyFunctionalities: [],
        specificFeatures: []
      });
    } else if (Array.isArray(formData[field])) {
      // Toggle selection for arrays (multi-select)
      if (formData[field].includes(value)) {
        setFormData({
          ...formData, 
          [field]: formData[field].filter(item => item !== value)
        });
      } else {
        setFormData({
          ...formData,
          [field]: [...formData[field], value]
        });
      }
    } else {
      // Simple selection for strings (single-select)
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  // Function to check if the current stage has valid selections to proceed
  const canProceed = () => {
    switch (currentStage) {
      case 1:
        return formData.category && formData.teamType && formData.teamSize;
      case 2:
        return formData.processStages.length > 0 && formData.keyFunctionalities.length > 0;
      case 3:
        return formData.language && formData.deploymentModel && formData.region && formData.pricingModel;
      default:
        return true;
    }
  };

  // Get process stages based on selected category
  const getProcessStages = () => {
    if (!formData.category) return [];
    return categoryStagesMap[formData.category] || [];
  };

  // Get functionalities based on selected category
  const getFunctionalities = () => {
    if (!formData.category) return [];
    return categoryFunctionalitiesMap[formData.category] || [];
  };

  // Get features based on selected functionalities
  const getFeatures = () => {
    if (formData.keyFunctionalities.length === 0) return [];
    
    const allFeatures = new Set();
    formData.keyFunctionalities.forEach(functionality => {
      const features = functionalityFeaturesMap[functionality] || [];
      features.forEach(feature => allFeatures.add(feature));
    });
    
    return Array.from(allFeatures);
  };

  const [error, setError] = useState(null)

  // Updated handleSubmit function to automatically trigger results display
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API response for demo purposes
      const mockData = {
        results: [
          {
            id: 1,
            name: "LegalFlow Pro",
            description: "Comprehensive legal workflow automation platform designed for modern law firms and legal departments.",
            category: ["Legal Workflow Automation", "Document Management"],
            matchScore: 92,
            rawScore: 85,
            totalPossible: 100,
            logoUrl: "https://via.placeholder.com/32",
            deployement: ["Cloud", "SaaS"],
            languages: ["English", "Spanish"],
            pricingModel: ["Monthly subscription", "Annual Fee"],
            usp: "AI-powered workflow optimization with built-in compliance tracking"
          },
          {
            id: 2,
            name: "ContractMaster Suite",
            description: "End-to-end contract lifecycle management solution with advanced analytics and reporting capabilities.",
            category: ["Contract Lifecycle Management"],
            matchScore: 88,
            rawScore: 78,
            totalPossible: 100,
            logoUrl: "https://via.placeholder.com/32",
            deployement: ["Cloud", "On-premise"],
            languages: ["English"],
            pricingModel: ["Annual Fee"],
            usp: "Industry-leading contract analytics with risk assessment"
          },
          {
            id: 3,
            name: "DocuSign CLM",
            description: "Complete contract lifecycle management with seamless e-signature integration.",
            category: ["Contract Lifecycle Management", "E-Signature"],
            matchScore: 85,
            rawScore: 75,
            totalPossible: 100,
            logoUrl: "https://via.placeholder.com/32",
            deployement: ["Cloud", "SaaS"],
            languages: ["English", "French"],
            pricingModel: ["Monthly subscription"],
            usp: "Seamless integration between contracts and e-signatures"
          }
        ]
      };
      
      setResults(mockData);
      
      // Automatically move to results stage
      setCurrentStage(4);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error during evaluation:', err);
      setError(err.message || 'Something went wrong during evaluation');
    } finally {
      setLoading(false);
    }
  };
  
  // Update the goToNextStage function to automatically trigger the API call
  // when moving to the results stage
  const goToNextStage = () => {
    if (currentStage < 4) {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      
      // Automatically submit when reaching the results stage
      if (nextStage === 4) {
        handleSubmit();
      }
      
      window.scrollTo(0, 0);
    }
  };
  
  const filteredResults = results?.results?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Handle product selection
  const handleProductSelect = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  // Stage progress labels
  const totalStages = 4;
  const stageLabels = ["Start", "Features", "Vendor", "Results"];

  // Render components
  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Side - Legal tech software category */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1e2556]">Legal tech software category</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleOptionSelect('category', category.id)}
                    className={`p-3 rounded-lg transition-all duration-300 flex flex-col items-center text-center h-20 justify-center group hover:shadow-md border-2 ${
                      formData.category === category.id
                        ? "bg-[#1e2556] text-white shadow-md border-[#1e2556] transform scale-105"
                        : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                    }`}
                  >
                    <div className="text-xl mb-1">{category.icon}</div>
                    <div className="font-medium text-xs leading-tight">{category.name.length > 25 ? `${category.name.substring(0, 23)}...` : category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Team type and Team size */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Team type</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {teamTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleOptionSelect('teamType', type.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                        formData.teamType === type.id
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Team size</h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                  {teamSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleOptionSelect('teamSize', size.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                        formData.teamSize === size.id
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs">{size.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Side - Process stages */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1e2556]">Process stages to cover</h3>
              {formData.category ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {getProcessStages().map((stage, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect('processStages', stage)}
                      className={`p-2.5 rounded-lg transition-all duration-300 flex items-center border-2 ${
                        formData.processStages.includes(stage)
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs flex-1">{stage}</div>
                      {formData.processStages.includes(stage) && (
                        <Check className="ml-2 h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-xs text-orange-600">Please select a category in Step 1</p>
                </div>
              )}
            </div>

            {/* Right Side - Key functionalities and Specific features */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Key functionalities</h3>
                {formData.category ? (
                  <div className="grid grid-cols-1 gap-2">
                    {getFunctionalities().map((func, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect('keyFunctionalities', func)}
                        className={`p-2.5 rounded-lg transition-all duration-300 flex items-center border-2 ${
                          formData.keyFunctionalities.includes(func)
                            ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                            : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                        }`}
                      >
                        <div className="font-medium text-xs flex-1 text-left">{func}</div>
                        {formData.keyFunctionalities.includes(func) && (
                          <Check className="ml-2 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-xs text-orange-600">Please select a category in Step 1</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Specific features</h3>
                {formData.keyFunctionalities.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                    {getFeatures().map((feature, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect('specificFeatures', feature)}
                        className={`p-2.5 rounded-lg transition-all duration-300 flex items-center border-2 ${
                          formData.specificFeatures.includes(feature)
                            ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                            : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                        }`}
                      >
                        <div className="font-medium text-xs flex-1 text-left">{feature}</div>
                        {formData.specificFeatures.includes(feature) && (
                          <Check className="ml-2 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-xs text-orange-600">Please select key functionalities first</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Side - Language and Deployment */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Language requirement</h3>
                <div className="relative">
                  <select 
                    className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#7cc6ee] focus:outline-none appearance-none text-xs bg-[#f5f7fa] text-[#2d2d2d]"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                  >
                    <option value="">Select language</option>
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-[#334155]" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Deployment model</h3>
                <div className="grid grid-cols-1 gap-2">
                  {deploymentModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleOptionSelect('deploymentModel', model.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                        formData.deploymentModel === model.id
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs">{model.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Region and Pricing */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Region</h3>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => handleOptionSelect('region', region.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                        formData.region === region.id
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs">{region.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1e2556]">Pricing model</h3>
                <div className="grid grid-cols-1 gap-2">
                  {pricingModels.map((pricing) => (
                    <button
                      key={pricing.id}
                      onClick={() => handleOptionSelect('pricingModel', pricing.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                        formData.pricingModel === pricing.id
                          ? "bg-[#1e2556] text-white shadow-md border-[#1e2556]"
                          : "bg-[#f5f7fa] border-gray-200 hover:border-[#7cc6ee] hover:bg-white text-[#2d2d2d]"
                      }`}
                    >
                      <div className="font-medium text-xs">{pricing.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Side - Instructions and Restart (1/3 width) */}
            <div className="space-y-4">
              <div className="bg-[#1e2556] p-4 rounded-xl text-white">
                <h3 className="text-base font-bold mb-3">How to Choose</h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Products are ranked by match percentage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Click on any product for detailed information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Compare features and pricing models</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f5f7fa] p-4 rounded-xl border-2 border-gray-200">
                <h3 className="text-base font-bold text-[#1e2556] mb-3">Try Different Criteria?</h3>
                <p className="text-xs text-[#334155] mb-4">Start a new comparison with different requirements.</p>
                <button
                  onClick={restartForm}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center justify-center font-medium transition-all duration-300 text-xs bg-[#7cc6ee] text-white hover:bg-[#6bb3db] shadow-md"
                >
                  <RotateCcw className="mr-2 h-3 w-3" />
                  Start New Comparison
                </button>
              </div>

              <div className="bg-[#f5f7fa] p-4 rounded-xl border-2 border-gray-200">
                <h4 className="text-sm font-bold mb-2 text-[#1e2556]">Your Selection</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-[#334155]">Category:</span>
                    <p className="text-[#2d2d2d]">{formData.category || 'Not selected'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-[#334155]">Team:</span>
                    <p className="text-[#2d2d2d]">{formData.teamType} ({formData.teamSize})</p>
                  </div>
                  <div>
                    <span className="font-medium text-[#334155]">Deployment:</span>
                    <p className="text-[#2d2d2d]">{formData.deploymentModel || 'Not selected'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Results (2/3 width) */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1e2556]"></div>
                  <span className="ml-3 text-sm text-[#334155]">Finding the best matches...</span>
                </div>
              ) : (
                <>
                  <div className="bg-[#f5f7fa] p-3 rounded-lg border border-gray-200 text-center">
                    <p className="text-xs text-[#1e2556] font-medium">Found {filteredResults.length} products matching your criteria</p>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full p-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-[#7cc6ee] focus:outline-none text-xs bg-[#f5f7fa] text-[#2d2d2d]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#334155]" />
                  </div>
                  
                  {paginatedResults.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {paginatedResults.map((product) => (
                          <div 
                            key={product.id} 
                            className="border border-gray-200 rounded-lg overflow-hidden bg-[#f5f7fa] hover:shadow-md transition-all duration-300 cursor-pointer hover:border-[#7cc6ee]"
                            onClick={() => handleProductSelect(product)}
                          >
                            <div className="flex items-center p-3 border-b border-gray-100">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 text-white font-bold ${
                                product.matchScore >= 90 ? 'bg-green-500' :
                                product.matchScore >= 70 ? 'bg-[#7cc6ee]' :
                                product.matchScore >= 50 ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }`}>
                                <div className="text-xs">{product.matchScore}%</div>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-[#1e2556] text-sm">{product.name}</h3>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.category.slice(0, 2).map((cat, idx) => (
                                    <span key={idx} className="text-xs bg-[#7cc6ee] text-white px-1.5 py-0.5 rounded">
                                      {cat.length > 15 ? `${cat.substring(0, 13)}...` : cat}
                                    </span>
                                  ))}
                                  {product.category.length > 2 && (
                                    <span className="text-xs bg-gray-200 text-[#2d2d2d] px-1.5 py-0.5 rounded">
                                      +{product.category.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="p-3 text-xs text-[#334155]">
                              {product.description.length > 100 
                                ? `${product.description.substring(0, 100)}...` 
                                : product.description}
                            </div>
                            <div className="px-3 pb-3 flex justify-between items-center">
                              <div className="flex flex-wrap gap-1">
                                {product.deployement.slice(0, 3).map((deploy: string, idx: number) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-[#2d2d2d] px-1.5 py-0.5 rounded">
                                    {deploy}
                                  </span>
                                ))}
                                {product.deployement.length > 3 && (
                                  <span className="text-xs bg-gray-100 text-[#334155] px-1.5 py-0.5 rounded">
                                    +{product.deployement.length - 3}
                                  </span>
                                )}
                              </div>
                              <button className="text-xs bg-[#1e2556] text-white px-2 py-1 rounded hover:bg-[#334155] transition duration-300">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {totalPages > 1 && (
                        <div className="flex justify-center space-x-2 mt-4">
                          <button 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-50 bg-[#f5f7fa] text-[#2d2d2d] hover:bg-white"
                            disabled={currentPage === 1}
                          >
                            &lt;
                          </button>
                          <span className="px-3 py-1.5 text-xs text-[#334155]">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-50 bg-[#f5f7fa] text-[#2d2d2d] hover:bg-white"
                            disabled={currentPage === totalPages}
                          >
                            &gt;
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-[#334155] text-sm">No products found matching your search</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-full mx-auto p-4">
      <div className="my-4">
        {/* Progress indicators - Premium design */}
        <div className="relative mb-6">
          {/* Main connector line */}
          <div className="absolute top-3 left-0 right-0 h-1.5 bg-gray-200 rounded-full"></div>
          
          {/* Progress bar overlay */}
          <div 
            className="absolute top-3 left-0 h-1.5 bg-[#7cc6ee] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStage - 1) / (totalStages - 1)) * 100}%` }}
          ></div>
          
          {/* Stage circles with positioning */}
          <div className="flex justify-between relative">
            {stageLabels.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-6 h-6 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-300 text-xs font-bold ${
                    currentStage === index + 1 
                      ? 'bg-white border-[#1e2556] text-[#1e2556] shadow-md' 
                      : currentStage > index + 1 
                        ? 'bg-[#1e2556] border-[#1e2556] text-white shadow-md' 
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStage > index + 1 ? <Check className="h-3 w-3" /> : index + 1}
                </div>
                <span 
                  className={`font-semibold mt-1.5 transition-all duration-300 text-xs ${
                    currentStage === index + 1 
                      ? 'text-[#1e2556]' 
                      : currentStage > index + 1 
                        ? 'text-[#1e2556]' 
                        : 'text-[#334155]'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Form content - Full width */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-4 border border-gray-100 min-h-[400px]">
        {renderStageContent()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousStage}
          className={`px-4 py-2.5 rounded-lg flex items-center transition-all duration-300 text-xs font-medium ${
            currentStage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-[#1e2556] hover:bg-[#f5f7fa] border-2 border-[#1e2556]'
          }`}
          disabled={currentStage === 1}
        >
          <ArrowLeft className="mr-2 h-3 w-3" />
          Back
        </button>
        
        {currentStage < 4 ? (
          <button
            onClick={goToNextStage}
            disabled={!canProceed()}
            className={`px-4 py-2.5 rounded-lg flex items-center font-medium transition-all duration-300 text-xs ${
              canProceed()
                ? 'bg-[#1e2556] text-white hover:bg-[#2a3568] shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStage === 3 ? 'Show Results' : 'Next'}
            <ArrowRight className="ml-2 h-3 w-3" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CompactEvaluationForm;