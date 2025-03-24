// "use client"

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';

// const EvaluationForm = () => {
//   const [currentStage, setCurrentStage] = useState(1);
//   const [formData, setFormData] = useState({
//     // Stage 1
//     category: '',
//     teamType: '',
//     teamSize: '',
    
//     // Stage 2
//     processStages: [],
//     keyFunctionalities: [],
//     specificFeatures: [],
    
//     // Stage 3
//     language: '',
//     deploymentModel: '',
//     region: '',
//     pricingModel: ''
//   });

//   const totalStages = 4;
//   const stageLabels = ["Start", "Features", "Vendor", "Results"];

  

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

//   // Team Types
 
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

//   // Process stages mapping based on category
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

//   // Functionalities mapping based on category 
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

//   // Features mapping based on functionalities
//   const functionalityFeaturesMap = {
//     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing'],
//     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
//     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
//     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates'],
//     'Contract Creation and Authoring': ['Contract Authoring', 'Text Editor', 'Contract Templatization', 'Format Customization', 'Version control'],
//     'Contract Repository': ['Document Storage', 'Multiple file formats', 'Categorization and Retrieval'],
//     'Contract Negotiation': ['Collaboration workspace', 'Comments and Annotations', 'Messaging and Emailing'],
//     'Lifecycle Management': ['Approval Management', 'Milestone tracking', 'Obligation tracking', 'Calendar Alerts'],
//     'Clause Library': ['Clause Library', 'Text editor', 'Clause review and approval', 'Version control for clauses'],
//     'Fields Creation': ['Signature fields', 'Multiple signature styles', 'Data fields', 'Customization and labelling'],
//     'Tracking and Validity': ['Legal validity', 'Audit trail', 'Document recording and retention'],
//     'Document Management and Templates': ['Document creation', 'Version control', 'Granular permission for collaborators'],
//     'Document Capturing': ['Document uploads', 'Multiple file supports', 'OCR'],
//     'Case Law Research': ['Comprehensive case law databases', 'Jurisdictional filters', 'Citation search and validation', 'Historical case law archives'],
//     'Statutory Research': ['Statutes and regulations databases', 'Annotations and historical versions', 'Legislative tracking and updates', 'Secondary Sources', 'Legal treatises and commentaries', 'Journals and law reviews', 'International treaties and conventions'],
//     'Advanced Search Capabilities': ['Search Functionality', 'Boolean and logical search', 'AI-powered search and chat', 'Document upload'],
//     'Filter and Sorting': ['Jurisdiction and court level', 'Date range and publication type', 'Relevance and citation frequency'],
//     'Document Creation and Templates': ['Document creation', 'Text editor', 'Document Templatization', 'Central repository', 'Co-authoring features'],
//     'Document Search and Navigation': ['Categorizing and tagging', 'Search capabilities', 'Filter and sorting'],
//     'Authentication': ['MFA (Multi factor Authentication)', 'Electronic signature capabilities.'],
//     'Task Allotment': ['Customizable workflows', 'Internal work delegation', 'Task tracking'],
//     'Budgeting, Expense and Time Tracking': ['Budget management', 'Time tracking', 'Multiple fee arrangements', 'Approval management'],
//     'Client Management': ['Central client repository', 'Client communications', 'Billing schedules', 'Payment processing'],
//     'Invoice Generation and Review': ['Customizable invoice templates', 'Automated invoice generation', 'Multiple currencies', 'Tax entries and calculations', 'Payment tracking and recording'],
//     'Data Identification and Collection': ['Data source identification', 'Remote Collection', 'Network-based collection', 'Forensic imaging', 'Custodian self-collection', 'Validation mechanisms'],
//     'Search, Processing and Analysis': ['Search functionality', 'Filter and sorting', 'Duplicity elimination', 'Data processing', 'Cluster similar documents'],
//     'Review and Production': ['Review and Analysis', 'Coding and annotations', 'Process control', 'Review workflow', 'Audit trail'],
//     'Legal Hold Management': ['Legal hold tracking', 'Legal hold notice management', 'Receipt Acknowledgement', 'Data custodian Management'],
//     'Ideation and Creation': ['Idea intake and management', 'Innovation workflow management'],
//     'Storage and Repository': ['Centralized repository', 'Categorization and tagging', 'Accessibility control', 'Access audit'],
//     'Matter Lifecycle Tracking': ['Task management', 'Document organisation'],
//     'Court and Case Search': ['Automated case alerts', 'Court docket systems', 'Real-time updates'],
//     'Litigation Docketing Features': ['Collaborative timeline tracking', 'Court Rule tracking', 'Court database integration', 'Customized docket entries'],
//     'Workflow Design and Configuration': ['Workflow designer', 'Branching', 'Task management', 'Data routing', 'Workflow templates'],
//     'Assignment Allotment and Tracking': ['Task creation', 'Task allotment', 'Task tracking'],
//     'Document Creation and Management': ['Document creation', 'Templatization', 'Indexing and tagging of documents', 'Document search and retrieval']
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
//     { id: 'EMEA (Europe, the Middle East and Africa)', name: 'EMEA (Europe, the Middle East and Africa)' },
//     { id: 'NA (North America)', name: 'NA (North America)' },
//     { id: 'LATAM (Latin America)', name: 'LATAM (Latin America)' },
//     { id: 'APAC (Asia-Pacific)', name: 'APAC (Asia-Pacific)' }
//   ];

//   const pricingModels = [
//     { id: 'Annual Fee', name: 'Annual Subscription fee' },
//     { id: 'Monthly subscription', name: 'Monthly subscription fee' },
//     { id: 'Perpetual', name: 'Perpetual' },
//     { id: 'Volume based', name: 'Volume based' },
//     { id: 'One time', name: 'One time' }
//   ];

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

//   const goToNextStage = () => {
//     if (currentStage < totalStages) {
//       setCurrentStage(currentStage + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const goToPreviousStage = () => {
//     if (currentStage > 1) {
//       setCurrentStage(currentStage - 1);
//       window.scrollTo(0, 0);
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

//   // Render the appropriate stage content
//   const renderStageContent = () => {
//     switch (currentStage) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">What category of legal tech software are you evaluating?</h3>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleOptionSelect('category', category.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center text-center h-24 justify-center ${
//                       formData.category === category.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="text-2xl mb-2">{category.icon}</div>
//                     <div className="font-medium text-sm">{category.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">What type of team will use this software?</h3>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
//                 {teamTypes.map((type) => (
//                   <button
//                     key={type.id}
//                     onClick={() => handleOptionSelect('teamType', type.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 ${
//                       formData.teamType === type.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{type.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">What is your team's size?</h3>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
//                 {teamSizes.map((size) => (
//                   <button
//                     key={size.id}
//                     onClick={() => handleOptionSelect('teamSize', size.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 ${
//                       formData.teamSize === size.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{size.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
      
//       case 2:
//         return (
//           <div className="space-y-6">
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">What stages of the process you want to cover by technology?</h3>
//               {formData.category ? (
//                 <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
//                   {getProcessStages().map((stage, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleOptionSelect('processStages', stage)}
//                       className={`p-3 rounded-lg transition-all duration-200 flex items-center ${
//                         formData.processStages.includes(stage)
//                           ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                       }`}
//                     >
//                       <div className="font-medium text-sm flex-1">{stage}</div>
//                       {formData.processStages.includes(stage) && (
//                         <Check className="ml-2 h-4 w-4" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-orange-600">Please select a category in Stage 1 first</p>
//               )}
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">What key functionalities do you need?</h3>
//               {formData.category ? (
//                 <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
//                   {getFunctionalities().map((func, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleOptionSelect('keyFunctionalities', func)}
//                       className={`p-3 rounded-lg transition-all duration-200 flex items-center ${
//                         formData.keyFunctionalities.includes(func)
//                           ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                       }`}
//                     >
//                       <div className="font-medium text-sm flex-1">{func}</div>
//                       {formData.keyFunctionalities.includes(func) && (
//                         <Check className="ml-2 h-4 w-4" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-orange-600">Please select a category in Stage 1 first</p>
//               )}
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Available specific features based on your selections:</h3>
//               {formData.keyFunctionalities.length > 0 ? (
//                 <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
//                   {getFeatures().map((feature, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleOptionSelect('specificFeatures', feature)}
//                       className={`p-3 rounded-lg transition-all duration-200 flex items-center ${
//                         formData.specificFeatures.includes(feature)
//                           ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                           : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                       }`}
//                     >
//                       <div className="font-medium text-sm flex-1">{feature}</div>
//                       {formData.specificFeatures.includes(feature) && (
//                         <Check className="ml-2 h-4 w-4" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-orange-600">Please select key functionalities first</p>
//               )}
//             </div>
//           </div>
//         );
      
//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Is there any specific language requirement?</h3>
//               <div className="relative">
//                 <select 
//                   className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-300 focus:outline-none appearance-none"
//                   value={formData.language}
//                   onChange={(e) => setFormData({...formData, language: e.target.value})}
//                 >
//                   <option value="">Select language</option>
//                   {languages.map((lang) => (
//                     <option key={lang.id} value={lang.id}>{lang.name}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Is there any specific deployment model preference?</h3>
//               <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
//                 {deploymentModels.map((model) => (
//                   <button
//                     key={model.id}
//                     onClick={() => handleOptionSelect('deploymentModel', model.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 ${
//                       formData.deploymentModel === model.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{model.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Which region you are based out of?</h3>
//               <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                 {regions.map((region) => (
//                   <button
//                     key={region.id}
//                     onClick={() => handleOptionSelect('region', region.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 ${
//                       formData.region === region.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{region.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Are you particular of any pricing model?</h3>
//               <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
//                 {pricingModels.map((pricing) => (
//                   <button
//                     key={pricing.id}
//                     onClick={() => handleOptionSelect('pricingModel', pricing.id)}
//                     className={`p-3 rounded-lg transition-all duration-200 ${
//                       formData.pricingModel === pricing.id
//                         ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
//                         : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{pricing.name}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
      
//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-100 mb-4">
//                 <span className="text-3xl">🎉</span>
//               </div>
//               <h2 className="text-xl font-bold text-gray-800 mb-3">Your Evaluation Results</h2>
//               <p className="text-base text-gray-600 mb-4 max-w-lg mx-auto">
//                 Based on your requirements, here are the details of your legal tech evaluation:
//               </p>
//             </div>
            
//             <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//               <h3 className="text-lg font-semibold mb-3">Form Data (JSON):</h3>
//               <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
//                 <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
//               </div>
//             </div>
            
//             <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//               <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg overflow-hidden">
//                 <div className="bg-gray-50 p-4 md:w-1/3">
//                   <div className="text-2xl mb-2">⚖️</div>
//                   <h4 className="text-base font-bold text-gray-800 mb-1">Legal Suite Pro</h4>
//                   <p className="text-sm text-gray-500 mb-2">Perfect match for your needs</p>
//                   <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">98% Match</div>
//                 </div>
                
//                 <div className="p-4 md:w-2/3">
//                   <p className="text-gray-700 mb-3 text-sm">This solution matches your specific criteria:</p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-start">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
//                       <div>
//                         <span className="block text-xs font-medium text-gray-800">Category</span>
//                         <span className="text-xs text-gray-600">{categories.find(c => c.id === formData.category)?.name || 'Not selected'}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
//                       <div>
//                         <span className="block text-xs font-medium text-gray-800">Team Type</span>
//                         <span className="text-xs text-gray-600">{teamTypes.find(t => t.id === formData.teamType)?.name || 'Not selected'}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
//                       <div>
//                         <span className="block text-xs font-medium text-gray-800">Team Size</span>
//                         <span className="text-xs text-gray-600">{teamSizes.find(s => s.id === formData.teamSize)?.name || 'Not selected'}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
//                       <div>
//                         <span className="block text-xs font-medium text-gray-800">Language</span>
//                         <span className="text-xs text-gray-600">{languages.find(l => l.id === formData.language)?.name || 'Not selected'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   }
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

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
//       setResults(data.results);
      
//       // Move to results stage
//       setCurrentStage(4);
//       window.scrollTo(0, 0);
//     } catch (err) {
//       console.error('Error during evaluation:', err);
//       setError(err.message || 'Something went wrong during evaluation');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="my-6">
//         {/* Progress indicators */}
//         <div className="relative mb-6">
//           {/* Main connector line */}
//           <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
          
//           {/* Progress bar overlay */}
//           <div 
//             className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out"
//             style={{ width: `calc(${((currentStage - 1) / (totalStages - 1)) * 100}% + ${currentStage === 1 ? 0 : (currentStage === totalStages ? 0 : 5)}px)` }}
//           ></div>
          
//           {/* Stage circles with positioning */}
//           <div className="flex justify-between relative" style={{ padding: '0 10px' }}>
//             {stageLabels.map((label, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div 
//                   className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
//                     currentStage === index + 1 
//                       ? 'bg-blue-50 border-blue-600 text-blue-600' 
//                       : currentStage > index + 1 
//                         ? 'bg-blue-600 border-blue-600 text-white' 
//                         : 'bg-white border-gray-200 text-gray-400'
//                   }`}
//                 >
//                   {currentStage > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
//                 </div>
//                 <span 
//                   className={`font-medium mt-2 transition-all duration-200 text-sm ${
//                     currentStage === index + 1 
//                       ? 'text-blue-600' 
//                       : currentStage > index + 1 
//                         ? 'text-blue-600' 
//                         : 'text-gray-400'
//                   }`}
//                 >
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-100">
//         <div className="max-w-3xl mx-auto">
//           {renderStageContent()}
//         </div>
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6 max-w-3xl mx-auto">
//         <button
//           onClick={goToPreviousStage}
//           className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
//             currentStage === 1
//               ? 'text-gray-300 cursor-not-allowed'
//               : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
//           }`}
//           disabled={currentStage === 1}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </button>
        
//         {currentStage < totalStages && (
//           <button
//             onClick={goToNextStage}
//             disabled={!canProceed()}
//             className={`px-6 py-2 rounded-lg flex items-center font-medium transition-all duration-200 ${
//               canProceed()
//                 ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             Next
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EvaluationForm;
"use client"
import React, { useState } from 'react';
import CompactEvaluationForm from './_components/CompactEvaluationForm';
import ProductDetailsView from './_components/ProductDetailsView';


const LegalTechSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto py-3 px-4">
          <h1 className="text-lg font-bold text-gray-800">Legal Tech Evaluator</h1>
          <p className="text-xs text-gray-500">Find the perfect legal technology solution for your team</p>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto py-4">
        {/* The form container with height limit */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <CompactEvaluationForm 
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </main>
      
      {/* Product details modal */}
      {selectedProduct && (
        <ProductDetailsView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};
export default   LegalTechSelector;