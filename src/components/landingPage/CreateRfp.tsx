// 'use client'

// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
// import { useAuth } from "@/context/authContext";
// import { useRouter } from "next/navigation";

// // Categories filtered by organization type
// const getCategoriesByOrgType = (orgType) => {
//   const inHouseLegalCategories = [
//     "Contract Lifecycle Management",
//     "Document Management System", 
//     "Governance, Risk and Compliance",
//     "Intellectual Property Management",
//     "Litigation Management and Analytics"
//   ];
  
//   const lawFirmCategories = [
//     "Client Relationship Management",
//     "Contract Lifecycle Management",
//     "Document Management System",
//     "E-billing and Invoicing", 
//     "Intellectual Property Management",
//     "Legal Research",
//     "Litigation Management and Analytics"
//   ];
  
//   const allCategories = [
//     "Client Relationship Management",
//     "Governance, Risk and Compliance", 
//     "Contract Lifecycle Management",
//     "E-Signature",
//     "Legal Research",
//     "Document Management System",
//     "E-billing and Invoicing",
//     "E-discovery",
//     "Intellectual Property Management", 
//     "Litigation Management and Analytics",
//     "Legal Workflow Automation"
//   ];

//   if (orgType === "In-House Counsels") return inHouseLegalCategories;
//   if (orgType === "Law firms") return lawFirmCategories;
//   return allCategories;
// };

// const urgencyOptions = [
//   "Critical (Address Immediately)",
//   "High (Address in three months)", 
//   "Moderate (Address in six to twelve months)",
//   "Low (Can be considered next year)",
// ];

// const categoryOptions = {
//   'Client Relationship Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
//   },
//   'Governance, Risk and Compliance': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
//     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
//     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
//   },
//   'Contract Lifecycle Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Contract Creation and Authoring': [
//       'Contract Authoring',
//       'Text Editor',
//       'Contract Templatization',
//       'Format Customization',
//       'Version control',
//     ],
//     'Contract Repository': [
//       'Document Storage',
//       'Multiple file formats',
//       'Categorization and Retrieval',
//     ],
//     'Contract Negotiation': [
//       'Collaboration workspace',
//       'Comments and Annotations',
//       'Messaging and Emailing',
//     ],
//     'Lifecycle Management': [
//       'Approval Management',
//       'Milestone tracking',
//       'Obligation tracking',
//       'Calendar Alerts',
//     ],
//     'Clause Library': [
//       'Clause Library',
//       'Text editor',
//       'Clause review and approval',
//       'Version control for clauses',
//     ],
//   },
//   'E-Signature': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Fields Creation': [
//       'Signature fields',
//       'Multiple signature styles',
//       'Data fields',
//       'Customization and labelling',
//     ],
//     'Tracking and Validity': [
//       'Legal validity',
//       'Audit trail',
//       'Document recording and retention',
//     ],
//     'Document Management and Templates': [
//       'Document creation',
//       'Version control',
//       'Granular permission for collaborators',
//     ],
//     'Document Capturing': [
//       'Document uploads',
//       'Multiple file supports',
//       'OCR',
//     ],
//   },
//   'Legal Research': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Case Law Research': [
//       'Comprehensive case law databases',
//       'Jurisdictional filters',
//       'Citation search and validation',
//       'Historical case law archives',
//     ],
//     'Statutory Research': [
//       'Statutes and regulations databases',
//       'Annotations and historical versions',
//       'Legislative tracking and updates',
//       'Secondary Sources',
//       'Legal treatises and commentaries',
//       'Journals and law reviews',
//       'International treaties and conventions',
//     ],
//     'Advanced Search Capabilities': [
//       'Search Functionality',
//       'Boolean and logical search',
//       'AI-powered search and chat',
//       'Document upload',
//     ],
//     'Filter and Sorting': [
//       'Jurisdiction and court level',
//       'Date range and publication type',
//       'Relevance and citation frequency',
//     ],
//   },
//   'Document Management System': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Document Creation and Templates': [
//       'Document creation',
//       'Text editor',
//       'Document Templatization',
//       'Central repository',
//       'Co-authoring features',
//     ],
//     'Document Search and Navigation': [
//       'Categorizing and tagging',
//       'Search capabilities',
//       'Filter and sorting',
//     ],
//     'Authentication': [
//       'MFA (Multi factor Authentication)',
//       'Electronic signature capabilities.',
//     ],
//     'Task Allotment': [
//       'Customizable workflows',
//       'Internal work delegation',
//       'Task tracking',
//     ],
//   },
//   'E-billing and Invoicing': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Budgeting, Expense and Time Tracking': [
//       'Budget management',
//       'Time tracking',
//       'Multiple fee arrangements',
//       'Approval management',
//     ],
//     'Client Management': [
//       'Central client repository',
//       'Client communications',
//       'Billing schedules',
//       'Payment processing',
//     ],
//     'Invoice Generation and Review': [
//       'Customizable invoice templates',
//       'Automated invoice generation',
//       'Multiple currencies',
//       'Tax entries and calculations',
//       'Payment tracking and recording',
//     ],
//   },
//   'E-discovery': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Data Identification and Collection': [
//       'Data source identification',
//       'Remote Collection',
//       'Network-based collection',
//       'Forensic imaging',
//       'Custodian self-collection',
//       'Validation mechanisms',
//     ],
//     'Search, Processing and Analysis': [
//       'Search functionality',
//       'Filter and sorting',
//       'Duplicity elimination',
//       'Data processing',
//       'Cluster similar documents',
//     ],
//     'Review and Production': [
//       'Review and Analysis',
//       'Coding and annotations',
//       'Process control',
//       'Review workflow',
//       'Audit trail',
//     ],
//     'Legal Hold Management': [
//       'Legal hold tracking',
//       'Legal hold notice management',
//       'Receipt Acknowledgement',
//       'Data custodian Management',
//     ],
//   },
//   'Intellectual Property Management': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Ideation and Creation': [
//       'Idea intake and management',
//       'Innovation workflow management',
//     ],
//     'Lifecycle Management': [
//       'Workflow management system (IP lifecycle)',
//       'Renewal management',
//       'Management of licensing agreements, contracts',
//     ],
//     'Search and Discovery': [
//       'Database integration',
//       'Advanced search capabilities',
//       'Filter and sorting',
//     ],
//     'Storage and Repository': [
//       'Centralized repository',
//       'Categorization and tagging',
//       'Accessibility control',
//       'Access audit',
//     ],
//   },
//   'Litigation Management and Analytics': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Matter Lifecycle Tracking': [
//       'Task management',
//       'Document organisation',
//     ],
//     'Court and Case Search': [
//       'Automated case alerts',
//       'Court docket systems',
//       'Real-time updates',
//     ],
//     'Budget, Expense and Time Tracking': [
//       'Budget Management',
//       'Time tracking',
//       'Approval Management',
//       'Client invoicing',
//       'Payment processing',
//     ],
//     'Litigation Docketing Features': [
//       'Collaborative timeline tracking',
//       'Court Rule tracking',
//       'Court database integration',
//       'Customized docket entries',
//     ],
//   },
//   'Legal Workflow Automation': {
//     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
//     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
//     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
//     'Workflow Design and Configuration': [
//       'Workflow designer',
//       'Branching',
//       'Task management',
//       'Data routing',
//       'Workflow templates',
//     ],
//     'Assignment Allotment and Tracking': [
//       'Task creation',
//       'Task allotment',
//       'Task tracking',
//     ],
//     'Document Creation and Management': [
//       'Document creation',
//       'Templatization',
//       'Indexing and tagging of documents',
//       'Document search and retrieval',
//     ],
//     'Laws, Compliance and Regulatory Tracking': [
//       'Sectoral differentiation',
//       'Compliance applicability',
//       'Law and compliance updates',
//     ],
//   },
// };

// const categoryLifecycleOptions = {
//   'Client Relationship Management': [
//     'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
//   ],
//   'Governance, Risk and Compliance': [
//     'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
//   ],
//   'Contract Lifecycle Management': [
//     'Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'
//   ],
//   'E-Signature': [
//     'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
//   ],
//   'Document Management System': [
//     'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
//   ],
//   'E-billing and Invoicing': [
//     'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Faciliation', 'Tracking', 'Analysis'
//   ],
//   'E-discovery': [
//     'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
//   ],
//   'Intellectual Property Management': [
//     'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
//   ],
//   'Litigation Management and Analytics': [
//     'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
//   ],
//   'Legal Workflow Automation': [
//     'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
//   ],
//   'Legal Research': [
//     'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
//   ]
// };

// const ProgressBar = ({ currentStep, totalSteps }) => {
//   return (
//     <div className="w-full mb-6">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm font-medium text-[#334155]">Step {currentStep} of {totalSteps}</span>
//         <span className="text-sm text-[#2d2d2d]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div 
//           className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] h-2 rounded-full transition-all duration-500 ease-out"
//           style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const PremiumRfpForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   const { userId, userType, isLoading } = useAuth();
//   const router = useRouter();
  
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 8;
  
//   // User data from API
//   const [userOrgType, setUserOrgType] = useState("");
//   const [userTeamSize, setUserTeamSize] = useState("");
  
//   // Form data
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [keyProblems, setKeyProblems] = useState("");
//   const [keyGoals, setKeyGoals] = useState("");
//   const [selectedLifecycleStages, setSelectedLifecycleStages] = useState([]);
//   const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState({});
//   const [urgency, setUrgency] = useState("");
//   const [budgetMin, setBudgetMin] = useState("");
//   const [budgetMax, setBudgetMax] = useState("");
//   const [customisation, setCustomisation] = useState("");
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   if (!isOpen) return null;

//   // Fetch user data on component mount
//   useEffect(() => {
//     if (!isLoading && userId && userType === "user") {
//       fetchUserData();
//     }
//   }, [isLoading, userId, userType]);

//   const fetchUserData = async () => {
//     if (!userId) return;
    
//     setLoading(true);
//     try {
//       // Real API call to get user data
//       const response = await fetch(`/api/get-user?userId=${userId}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
      
//       const userData = await response.json();
      
//       if (userData.success) {
//         const { profile } = userData;
//         setUserOrgType(profile.CompanyType || "");
//         setUserTeamSize(profile.TeamSize || "");
//       } else {
//         throw new Error("Failed to fetch user data");
//       }
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (validateCurrentStep()) {
//       setCurrentStep(prev => Math.min(prev + 1, totalSteps));
//       setErrors({});
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//     setErrors({});
//   };

//   const validateCurrentStep = () => {
//     const newErrors = {};
    
//     switch (currentStep) {
//       case 1:
//         if (!selectedCategory) newErrors.selectedCategory = "Please select a category";
//         break;
//       case 3:
//         if (selectedLifecycleStages.length === 0) newErrors.lifecycleStages = "Please select at least one lifecycle stage";
//         break;
//       case 4:
//         if (selectedFunctionalities.length === 0) newErrors.functionalities = "Please select at least one functionality";
//         break;
//       case 5:
//         const hasFeatures = selectedFunctionalities.every(func => {
//           return Object.values(selectedFeatures[func] || {}).some(feature => feature.selected);
//         });
//         if (!hasFeatures && selectedFunctionalities.length > 0) {
//           newErrors.features = "Please select at least one feature for each functionality";
//         }
//         break;
//       case 6:
//         if (!urgency) newErrors.urgency = "Please select urgency level";
//         break;
//       case 7:
//         if (!budgetMin) newErrors.budgetMin = "Please enter minimum budget";
//         if (!budgetMax) newErrors.budgetMax = "Please enter maximum budget";
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFunctionalityChange = (functionality) => {
//     setSelectedFunctionalities(prev => {
//       if (prev.includes(functionality)) {
//         const updatedFeatures = { ...selectedFeatures };
//         delete updatedFeatures[functionality];
//         setSelectedFeatures(updatedFeatures);
//         return prev.filter(f => f !== functionality);
//       } else {
//         return [...prev, functionality];
//       }
//     });
//   };

//   const handleFeatureChange = (functionality, feature) => {
//     setSelectedFeatures(prev => {
//       const functionalityFeatures = prev[functionality] || {};
//       return {
//         ...prev,
//         [functionality]: {
//           ...functionalityFeatures,
//           [feature]: {
//             selected: !functionalityFeatures[feature]?.selected,
//             responses: [],
//           }
//         }
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!validateCurrentStep()) return;
    
//     setLoading(true);
//     setSubmitError("");
    
//     try {
//       // Format data for submission
//       const formattedLifecycle = {};
//       selectedLifecycleStages.forEach(stage => {
//         formattedLifecycle[stage] = {
//           selected: true,
//           responses: []
//         };
//       });
      
//       const formattedFeatures = {};
//       if (selectedCategory) {
//         formattedFeatures[selectedCategory] = {};
        
//         selectedFunctionalities.forEach(functionality => {
//           formattedFeatures[selectedCategory][functionality] = {
//             selected: true
//           };
          
//           const functionalityFeatures = selectedFeatures[functionality] || {};
//           Object.entries(functionalityFeatures).forEach(([feature, details]) => {
//             if (details.selected) {
//               formattedFeatures[selectedCategory][functionality][feature] = {
//                 selected: true,
//                 responses: []
//               };
//             }
//           });
//         });
//       }
      
//       const formData = {
//         userId,
//         userOrgType: { value: userOrgType, responses: [] },
//         userTeamSize: { value: userTeamSize, responses: [] },
//         keyProblems: { value: keyProblems, responses: [] },
//         keyGoals: { value: keyGoals, responses: [] },
//         customisation: { value: customisation, responses: [] },
//         selectedCategory,
//         processLifecycle: formattedLifecycle,
//         features: formattedFeatures,
//         urgency: { value: urgency, responses: [] },
//         budget: {
//           value: {
//             min: budgetMin,
//             max: budgetMax,
//             currency: "USD"
//           },
//           responses: []
//         }
//       };
      
//       console.log("Submitting RFP data:", formData);
      
//       // Real API call to submit RFP
//       const response = await fetch('/api/submit-rfp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setIsSubmitted(true);
//       } else {
//         throw new Error(result.msg || "Failed to submit RFP.");
//       }
//     } catch (err) {
//       console.error("Error submitting RFP:", err);
//       setSubmitError(err.message || "An error occurred while submitting. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div 
//           className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
//           onClick={onClose}
//         />
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
//             <div className="w-12 h-12 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-[#2d2d2d] text-lg">Loading...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!userId || userType !== "user" || !userOrgType) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
//             aria-label="Close popup"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
          
//           <div className="w-16 h-16 bg-[#1e2556] bg-opacity-10 text-[#1e2556] rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">Login Required</h1>
//           <p className="text-[#2d2d2d] mb-6">Please login as a legal professional to create an RFP</p>
//           <button 
//             className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
//             onClick={() => router.push("/")}
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isSubmitted) {
//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div 
//           className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
//           onClick={onClose}
//         />
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
//             {/* Close button */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
//               aria-label="Close popup"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
            
//             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Check className="w-8 h-8" />
//             </div>
//             <h1 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Submitted Successfully!</h1>
//             <p className="text-[#2d2d2d] mb-6">Your request has been submitted. Vendors will contact you with proposals.</p>
//             <button 
//               className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
//               onClick={() => router.push("/legal_professionals/dashboard/rfps")}
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const availableCategories = getCategoriesByOrgType(userOrgType);

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">For which area do you want to implement legal tech?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Tell us what part of your legal work needs tech support</p>
//             </div>
            
//             {errors.selectedCategory && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {errors.selectedCategory}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
//               {availableCategories.map((category) => (
//                 <div
//                   key={category}
//                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     selectedCategory === category
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                       selectedCategory === category ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <h3 className="font-semibold text-[#1e2556] text-sm">{category}</h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">What challenges are you facing?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Help us understand your specific needs</p>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-2 text-sm">
//                   What is the key problem you are trying to address?
//                 </label>
//                 <textarea
//                   value={keyProblems}
//                   onChange={(e) => setKeyProblems(e.target.value)}
//                   placeholder="Describe the main challenges you're facing..."
//                   className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[100px] bg-[#f5f7fa] text-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-2 text-sm">
//                   What are the key goals you are trying to achieve?
//                 </label>
//                 <textarea
//                   value={keyGoals}
//                   onChange={(e) => setKeyGoals(e.target.value)}
//                   placeholder="Tell us what success looks like..."
//                   className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[100px] bg-[#f5f7fa] text-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">Which part of your process needs help first?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Pick one or more that you want to streamline</p>
//             </div>
            
//             {errors.lifecycleStages && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {errors.lifecycleStages}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
//               {categoryLifecycleOptions[selectedCategory]?.map((stage) => (
//                 <div
//                   key={stage}
//                   className={`p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     selectedLifecycleStages.includes(stage)
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => {
//                     setSelectedLifecycleStages(prev => 
//                       prev.includes(stage) 
//                         ? prev.filter(s => s !== stage)
//                         : [...prev, stage]
//                     );
//                   }}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
//                       selectedLifecycleStages.includes(stage) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedLifecycleStages.includes(stage) && <Check className="w-2 h-2 text-white" />}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d] text-sm">{stage}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">What do you want the tool to help you with?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Pick the specific functionalities you need</p>
//             </div>
            
//             {errors.functionalities && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {errors.functionalities}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
//               {Object.keys(categoryOptions[selectedCategory] || {}).map((functionality) => (
//                 <div
//                   key={functionality}
//                   className={`p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     selectedFunctionalities.includes(functionality)
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => handleFunctionalityChange(functionality)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
//                       selectedFunctionalities.includes(functionality) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedFunctionalities.includes(functionality) && <Check className="w-2 h-2 text-white" />}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d] text-sm">{functionality}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">What features are you looking for?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Choose the things you'd like the software to do</p>
//             </div>
            
//             {errors.features && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {errors.features}
//               </div>
//             )}
            
//             <div className="space-y-4 max-h-96 overflow-y-auto">
//               {selectedFunctionalities.map((functionality) => (
//                 <div key={functionality} className="p-4 border-2 border-gray-200 rounded-xl bg-white">
//                   <h4 className="font-semibold text-[#1e2556] mb-3 text-sm">{functionality}</h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {categoryOptions[selectedCategory][functionality].map((feature) => (
//                       <div key={feature} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`feature-${functionality}-${feature}`}
//                           checked={selectedFeatures[functionality]?.[feature]?.selected || false}
//                           onChange={() => handleFeatureChange(functionality, feature)}
//                           className="w-3 h-3 text-[#7cc6ee] border-gray-300 rounded focus:ring-[#7cc6ee]"
//                         />
//                         <label 
//                           htmlFor={`feature-${functionality}-${feature}`}
//                           className="ml-2 text-xs text-[#2d2d2d] cursor-pointer"
//                         >
//                           {feature}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">How soon do you want to solve this?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">This helps us prioritize your request</p>
//             </div>
            
//             {errors.urgency && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {errors.urgency}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 gap-3">
//               {urgencyOptions.map((option) => (
//                 <div
//                   key={option}
//                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     urgency === option
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => setUrgency(option)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                       urgency === option ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {urgency === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d] text-sm">{option}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">What's your budget range (in USD)?</h2>
//               <p className="text-[#334155] text-sm sm:text-base">We'll match you with tools within range</p>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-2 text-sm">Minimum: $</label>
//                 <input
//                   type="text"
//                   value={budgetMin}
//                   onChange={(e) => setBudgetMin(e.target.value)}
//                   placeholder="10,000"
//                   className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] text-sm ${
//                     errors.budgetMin ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
//                   }`}
//                 />
//                 {errors.budgetMin && (
//                   <p className="text-red-500 text-xs mt-1">{errors.budgetMin}</p>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-2 text-sm">Maximum: $</label>
//                 <input
//                   type="text"
//                   value={budgetMax}
//                   onChange={(e) => setBudgetMax(e.target.value)}
//                   placeholder="50,000"
//                   className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] text-sm ${
//                     errors.budgetMax ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
//                   }`}
//                 />
//                 {errors.budgetMax && (
//                   <p className="text-red-500 text-xs mt-1">{errors.budgetMax}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-[#1e2556] mb-3">Share anything else on your mind</h2>
//               <p className="text-[#334155] text-sm sm:text-base">Goals, challenges, or special needs we didn't ask about</p>
//             </div>
            
//             {submitError && (
//               <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
//                 {submitError}
//               </div>
//             )}
            
//             <div>
//               <textarea
//                 value={customisation}
//                 onChange={(e) => setCustomisation(e.target.value)}
//                 placeholder="Tell us about any specific requirements, integrations, or concerns you have..."
//                 className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa] text-sm"
//               />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div 
//         className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
//         onClick={onClose}
//       />
      
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl w-full max-w-4xl max-h-[90vh] 
//                      shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
//                      border border-[#7cc6ee]/20 flex flex-col">
          
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#7cc6ee]/10 
//                      transition-all duration-300 group z-10"
//           >
//             <X className="w-5 h-5 text-gray-400 group-hover:text-[#7cc6ee] 
//                       transition-colors duration-300" />
//           </button>
          
//           {/* Header with progress */}
//           <div className="p-6 pb-4 border-b border-gray-200">
//             <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//           </div>
          
//           {/* Content area */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {renderStep()}
//           </div>
          
//           {/* Footer with navigation */}
//           <div className="flex justify-between items-center p-6 pt-4 border-t border-gray-200">
//             <button
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 text-sm ${
//                 currentStep === 1 
//                   ? 'text-gray-400 cursor-not-allowed' 
//                   : 'text-[#1e2556] hover:bg-[#1e2556] hover:bg-opacity-10'
//               }`}
//             >
//               <ChevronLeft className="w-4 h-4 mr-1" />
//               Previous
//             </button>
            
//             {currentStep < totalSteps ? (
//               <button
//                 onClick={nextStep}
//                 className="flex items-center px-4 py-2 bg-[#1e2556] text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
//               >
//                 Next
//                 <ChevronRight className="w-4 h-4 ml-1" />
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="flex items-center px-6 py-2 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 text-sm"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     Submit RFP
//                     <Check className="w-4 h-4 ml-1" />
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumRfpForm;
'use client'

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

// Categories filtered by organization type
const getCategoriesByOrgType = (orgType) => {
  const inHouseLegalCategories = [
    "Contract Lifecycle Management",
    "Document Management System", 
    "Governance, Risk and Compliance",
    "Intellectual Property Management",
    "Litigation Management and Analytics"
  ];
  
  const lawFirmCategories = [
    "Client Relationship Management",
    "Contract Lifecycle Management",
    "Document Management System",
    "E-billing and Invoicing", 
    "Intellectual Property Management",
    "Legal Research",
    "Litigation Management and Analytics"
  ];
  
  const allCategories = [
    "Client Relationship Management",
    "Governance, Risk and Compliance", 
    "Contract Lifecycle Management",
    "E-Signature",
    "Legal Research",
    "Document Management System",
    "E-billing and Invoicing",
    "E-discovery",
    "Intellectual Property Management", 
    "Litigation Management and Analytics",
    "Legal Workflow Automation"
  ];

  if (orgType === "In-House Counsels") return inHouseLegalCategories;
  if (orgType === "Law firms") return lawFirmCategories;
  return allCategories;
};

const urgencyOptions = [
  "Critical (Address Immediately)",
  "High (Address in three months)", 
  "Moderate (Address in six to twelve months)",
  "Low (Can be considered next year)",
];

const categoryOptions = {
  'Client Relationship Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
    'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
    'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
    'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
    'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
    'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
  },
  'Governance, Risk and Compliance': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
    'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
    'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
  },
  'Contract Lifecycle Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Contract Creation and Authoring': [
      'Contract Authoring',
      'Text Editor',
      'Contract Templatization',
      'Format Customization',
      'Version control',
    ],
    'Contract Repository': [
      'Document Storage',
      'Multiple file formats',
      'Categorization and Retrieval',
    ],
    'Contract Negotiation': [
      'Collaboration workspace',
      'Comments and Annotations',
      'Messaging and Emailing',
    ],
    'Lifecycle Management': [
      'Approval Management',
      'Milestone tracking',
      'Obligation tracking',
      'Calendar Alerts',
    ],
    'Clause Library': [
      'Clause Library',
      'Text editor',
      'Clause review and approval',
      'Version control for clauses',
    ],
  },
  'E-Signature': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Fields Creation': [
      'Signature fields',
      'Multiple signature styles',
      'Data fields',
      'Customization and labelling',
    ],
    'Tracking and Validity': [
      'Legal validity',
      'Audit trail',
      'Document recording and retention',
    ],
    'Document Management and Templates': [
      'Document creation',
      'Version control',
      'Granular permission for collaborators',
    ],
    'Document Capturing': [
      'Document uploads',
      'Multiple file supports',
      'OCR',
    ],
  },
  'Legal Research': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Case Law Research': [
      'Comprehensive case law databases',
      'Jurisdictional filters',
      'Citation search and validation',
      'Historical case law archives',
    ],
    'Statutory Research': [
      'Statutes and regulations databases',
      'Annotations and historical versions',
      'Legislative tracking and updates',
      'Secondary Sources',
      'Legal treatises and commentaries',
      'Journals and law reviews',
      'International treaties and conventions',
    ],
    'Advanced Search Capabilities': [
      'Search Functionality',
      'Boolean and logical search',
      'AI-powered search and chat',
      'Document upload',
    ],
    'Filter and Sorting': [
      'Jurisdiction and court level',
      'Date range and publication type',
      'Relevance and citation frequency',
    ],
  },
  'Document Management System': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Document Creation and Templates': [
      'Document creation',
      'Text editor',
      'Document Templatization',
      'Central repository',
      'Co-authoring features',
    ],
    'Document Search and Navigation': [
      'Categorizing and tagging',
      'Search capabilities',
      'Filter and sorting',
    ],
    'Authentication': [
      'MFA (Multi factor Authentication)',
      'Electronic signature capabilities.',
    ],
    'Task Allotment': [
      'Customizable workflows',
      'Internal work delegation',
      'Task tracking',
    ],
  },
  'E-billing and Invoicing': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Budgeting, Expense and Time Tracking': [
      'Budget management',
      'Time tracking',
      'Multiple fee arrangements',
      'Approval management',
    ],
    'Client Management': [
      'Central client repository',
      'Client communications',
      'Billing schedules',
      'Payment processing',
    ],
    'Invoice Generation and Review': [
      'Customizable invoice templates',
      'Automated invoice generation',
      'Multiple currencies',
      'Tax entries and calculations',
      'Payment tracking and recording',
    ],
  },
  'E-discovery': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Data Identification and Collection': [
      'Data source identification',
      'Remote Collection',
      'Network-based collection',
      'Forensic imaging',
      'Custodian self-collection',
      'Validation mechanisms',
    ],
    'Search, Processing and Analysis': [
      'Search functionality',
      'Filter and sorting',
      'Duplicity elimination',
      'Data processing',
      'Cluster similar documents',
    ],
    'Review and Production': [
      'Review and Analysis',
      'Coding and annotations',
      'Process control',
      'Review workflow',
      'Audit trail',
    ],
    'Legal Hold Management': [
      'Legal hold tracking',
      'Legal hold notice management',
      'Receipt Acknowledgement',
      'Data custodian Management',
    ],
  },
  'Intellectual Property Management': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Ideation and Creation': [
      'Idea intake and management',
      'Innovation workflow management',
    ],
    'Lifecycle Management': [
      'Workflow management system (IP lifecycle)',
      'Renewal management',
      'Management of licensing agreements, contracts',
    ],
    'Search and Discovery': [
      'Database integration',
      'Advanced search capabilities',
      'Filter and sorting',
    ],
    'Storage and Repository': [
      'Centralized repository',
      'Categorization and tagging',
      'Accessibility control',
      'Access audit',
    ],
  },
  'Litigation Management and Analytics': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Matter Lifecycle Tracking': [
      'Task management',
      'Document organisation',
    ],
    'Court and Case Search': [
      'Automated case alerts',
      'Court docket systems',
      'Real-time updates',
    ],
    'Budget, Expense and Time Tracking': [
      'Budget Management',
      'Time tracking',
      'Approval Management',
      'Client invoicing',
      'Payment processing',
    ],
    'Litigation Docketing Features': [
      'Collaborative timeline tracking',
      'Court Rule tracking',
      'Court database integration',
      'Customized docket entries',
    ],
  },
  'Legal Workflow Automation': {
    'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
    'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
    'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
    'Workflow Design and Configuration': [
      'Workflow designer',
      'Branching',
      'Task management',
      'Data routing',
      'Workflow templates',
    ],
    'Assignment Allotment and Tracking': [
      'Task creation',
      'Task allotment',
      'Task tracking',
    ],
    'Document Creation and Management': [
      'Document creation',
      'Templatization',
      'Indexing and tagging of documents',
      'Document search and retrieval',
    ],
    'Laws, Compliance and Regulatory Tracking': [
      'Sectoral differentiation',
      'Compliance applicability',
      'Law and compliance updates',
    ],
  },
};

const categoryLifecycleOptions = {
  'Client Relationship Management': [
    'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
  ],
  'Governance, Risk and Compliance': [
    'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
  ],
  'Contract Lifecycle Management': [
    'Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'
  ],
  'E-Signature': [
    'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
  ],
  'Document Management System': [
    'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
  ],
  'E-billing and Invoicing': [
    'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Faciliation', 'Tracking', 'Analysis'
  ],
  'E-discovery': [
    'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
  ],
  'Intellectual Property Management': [
    'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
  ],
  'Litigation Management and Analytics': [
    'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
  ],
  'Legal Workflow Automation': [
    'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
  ],
  'Legal Research': [
    'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
  ]
};

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#334155]">Step {currentStep} of {totalSteps}</span>
        <span className="text-xs text-[#2d2d2d]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

const PremiumRfpForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { userId, userType, isLoading } = useAuth();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  
  // User data from API
  const [userOrgType, setUserOrgType] = useState("");
  const [userTeamSize, setUserTeamSize] = useState("");
  
  // Form data
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyProblems, setKeyProblems] = useState("");
  const [keyGoals, setKeyGoals] = useState("");
  const [selectedLifecycleStages, setSelectedLifecycleStages] = useState([]);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [urgency, setUrgency] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [customisation, setCustomisation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  // Fetch user data on component mount
  useEffect(() => {
    if (!isLoading && userId && userType === "user") {
      fetchUserData();
    }
  }, [isLoading, userId, userType]);

  const fetchUserData = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/get-user?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const userData = await response.json();
      
      if (userData.success) {
        const { profile } = userData;
        setUserOrgType(profile.CompanyType || "");
        setUserTeamSize(profile.TeamSize || "");
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1:
        if (!selectedCategory) newErrors.selectedCategory = "Please select a category";
        break;
      case 3:
        if (selectedLifecycleStages.length === 0) newErrors.lifecycleStages = "Please select at least one lifecycle stage";
        break;
      case 4:
        if (selectedFunctionalities.length === 0) newErrors.functionalities = "Please select at least one functionality";
        break;
      case 5:
        const hasFeatures = selectedFunctionalities.every(func => {
          return Object.values(selectedFeatures[func] || {}).some(feature => feature.selected);
        });
        if (!hasFeatures && selectedFunctionalities.length > 0) {
          newErrors.features = "Please select at least one feature for each functionality";
        }
        break;
      case 6:
        if (!urgency) newErrors.urgency = "Please select urgency level";
        break;
      case 7:
        if (!budgetMin) newErrors.budgetMin = "Please enter minimum budget";
        if (!budgetMax) newErrors.budgetMax = "Please enter maximum budget";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFunctionalityChange = (functionality) => {
    setSelectedFunctionalities(prev => {
      if (prev.includes(functionality)) {
        const updatedFeatures = { ...selectedFeatures };
        delete updatedFeatures[functionality];
        setSelectedFeatures(updatedFeatures);
        return prev.filter(f => f !== functionality);
      } else {
        return [...prev, functionality];
      }
    });
  };

  const handleFeatureChange = (functionality, feature) => {
    setSelectedFeatures(prev => {
      const functionalityFeatures = prev[functionality] || {};
      return {
        ...prev,
        [functionality]: {
          ...functionalityFeatures,
          [feature]: {
            selected: !functionalityFeatures[feature]?.selected,
            responses: [],
          }
        }
      };
    });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setLoading(true);
    setSubmitError("");
    
    try {
      const formattedLifecycle = {};
      selectedLifecycleStages.forEach(stage => {
        formattedLifecycle[stage] = {
          selected: true,
          responses: []
        };
      });
      
      const formattedFeatures = {};
      if (selectedCategory) {
        formattedFeatures[selectedCategory] = {};
        
        selectedFunctionalities.forEach(functionality => {
          formattedFeatures[selectedCategory][functionality] = {
            selected: true
          };
          
          const functionalityFeatures = selectedFeatures[functionality] || {};
          Object.entries(functionalityFeatures).forEach(([feature, details]) => {
            if (details.selected) {
              formattedFeatures[selectedCategory][functionality][feature] = {
                selected: true,
                responses: []
              };
            }
          });
        });
      }
      
      const formData = {
        userId,
        userOrgType: { value: userOrgType, responses: [] },
        userTeamSize: { value: userTeamSize, responses: [] },
        keyProblems: { value: keyProblems, responses: [] },
        keyGoals: { value: keyGoals, responses: [] },
        customisation: { value: customisation, responses: [] },
        selectedCategory,
        processLifecycle: formattedLifecycle,
        features: formattedFeatures,
        urgency: { value: urgency, responses: [] },
        budget: {
          value: {
            min: budgetMin,
            max: budgetMax,
            currency: "USD"
          },
          responses: []
        }
      };
      
      const response = await fetch('/api/submit-rfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.msg || "Failed to submit RFP.");
      }
    } catch (err) {
      console.error("Error submitting RFP:", err);
      setSubmitError(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
          onClick={onClose}
        />
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-10 h-10 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-[#2d2d2d] text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userId || userType !== "user" || !userOrgType) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
          onClick={onClose}
        />
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="w-12 h-12 bg-[#1e2556] bg-opacity-10 text-[#1e2556] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-[#1e2556] mb-3">Login Required</h1>
            <p className="text-[#2d2d2d] mb-4 text-sm">Please login as a legal professional to create an RFP</p>
            <button 
              className="bg-[#1e2556] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-sm"
              onClick={() => router.push("/auth/user/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
          onClick={onClose}
        />
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-[#1e2556] mb-3">RFP Submitted Successfully!</h1>
            <p className="text-[#2d2d2d] mb-4 text-sm">Your request has been submitted. Vendors will contact you with proposals.</p>
            <button 
              className="bg-[#1e2556] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-sm"
              onClick={() => router.push("/legal_professionals/dashboard/rfps")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const availableCategories = getCategoriesByOrgType(userOrgType);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">For which area do you want to implement legal tech?</h2>
              <p className="text-[#334155] text-sm">Tell us what part of your legal work needs tech support</p>
            </div>
            
            {errors.selectedCategory && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {errors.selectedCategory}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {availableCategories.map((category) => (
                <div
                  key={category}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-md'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedCategory === category ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedCategory === category && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <h3 className="font-semibold text-[#1e2556] text-sm">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">What challenges are you facing?</h2>
              <p className="text-[#334155] text-sm">Help us understand your specific needs</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#1e2556] font-semibold mb-2 text-sm">
                  What is the key problem you are trying to address?
                </label>
                <textarea
                  value={keyProblems}
                  onChange={(e) => setKeyProblems(e.target.value)}
                  placeholder="Describe the main challenges you're facing with your current process..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[80px] bg-[#f5f7fa] text-sm"
                />
              </div>
              
              <div>
                <label className="block text-[#1e2556] font-semibold mb-2 text-sm">
                  What are the key goals you are trying to achieve?
                </label>
                <textarea
                  value={keyGoals}
                  onChange={(e) => setKeyGoals(e.target.value)}
                  placeholder="Tell us what success looks like for your organization..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[80px] bg-[#f5f7fa] text-sm"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">Which part of your process needs help first?</h2>
              <p className="text-[#334155] text-sm">Pick one or more that you want to streamline</p>
            </div>
            
            {errors.lifecycleStages && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {errors.lifecycleStages}
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {categoryLifecycleOptions[selectedCategory]?.map((stage) => (
                <div
                  key={stage}
                  className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedLifecycleStages.includes(stage)
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-sm'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-sm'
                  }`}
                  onClick={() => {
                    setSelectedLifecycleStages(prev => 
                      prev.includes(stage) 
                        ? prev.filter(s => s !== stage)
                        : [...prev, stage]
                    );
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 border-2 rounded mr-2 flex items-center justify-center ${
                      selectedLifecycleStages.includes(stage) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedLifecycleStages.includes(stage) && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span className="font-medium text-[#2d2d2d] text-xs">{stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">What do you want the tool to help you with?</h2>
              <p className="text-[#334155] text-sm">Pick the specific functionalities you need</p>
            </div>
            
            {errors.functionalities && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {errors.functionalities}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {Object.keys(categoryOptions[selectedCategory] || {}).map((functionality) => (
                <div
                  key={functionality}
                  className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedFunctionalities.includes(functionality)
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-sm'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-sm'
                  }`}
                  onClick={() => handleFunctionalityChange(functionality)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 border-2 rounded mr-2 flex items-center justify-center ${
                      selectedFunctionalities.includes(functionality) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedFunctionalities.includes(functionality) && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span className="font-medium text-[#2d2d2d] text-xs">{functionality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">What features are you looking for?</h2>
              <p className="text-[#334155] text-sm">Choose the things you'd like the software to do</p>
            </div>
            
            {errors.features && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {errors.features}
              </div>
            )}
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {selectedFunctionalities.map((functionality) => (
                <div key={functionality} className="p-3 border-2 border-gray-200 rounded-lg bg-white">
                  <h4 className="font-semibold text-[#1e2556] mb-2 text-sm">{functionality}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categoryOptions[selectedCategory][functionality].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-${functionality}-${feature}`}
                          checked={selectedFeatures[functionality]?.[feature]?.selected || false}
                          onChange={() => handleFeatureChange(functionality, feature)}
                          className="w-3 h-3 text-[#7cc6ee] border-gray-300 rounded focus:ring-[#7cc6ee]"
                        />
                        <label 
                          htmlFor={`feature-${functionality}-${feature}`}
                          className="ml-1 text-xs text-[#2d2d2d] cursor-pointer"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">How soon do you want to solve this?</h2>
              <p className="text-[#334155] text-sm">This helps us prioritize your request</p>
            </div>
            
            {errors.urgency && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {errors.urgency}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {urgencyOptions.map((option) => (
                <div
                  key={option}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    urgency === option
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-sm'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-sm'
                  }`}
                  onClick={() => setUrgency(option)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full border-2 mr-3 flex items-center justify-center ${
                      urgency === option ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {urgency === option && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium text-[#2d2d2d] text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">What's your budget range (in USD)?</h2>
              <p className="text-[#334155] text-sm">We'll match you with tools within range</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div>
                <label className="block text-[#1e2556] font-semibold mb-2 text-sm">Minimum: $</label>
                <input
                  type="text"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="10,000"
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors bg-[#f5f7fa] text-sm ${
                    errors.budgetMin ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
                  }`}
                />
                {errors.budgetMin && (
                  <p className="text-red-500 text-xs mt-1">{errors.budgetMin}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1e2556] font-semibold mb-2 text-sm">Maximum: $</label>
                <input
                  type="text"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="50,000"
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors bg-[#f5f7fa] text-sm ${
                    errors.budgetMax ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
                  }`}
                />
                {errors.budgetMax && (
                  <p className="text-red-500 text-xs mt-1">{errors.budgetMax}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-[#1e2556] mb-2">Share anything else on your mind</h2>
              <p className="text-[#334155] text-sm">Goals, challenges, or special needs we didn't ask about</p>
            </div>
            
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
                {submitError}
              </div>
            )}
            
            <div>
              <textarea
                value={customisation}
                onChange={(e) => setCustomisation(e.target.value)}
                placeholder="Tell us about any specific requirements, integrations, or concerns you have..."
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[100px] bg-[#f5f7fa] text-sm"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-3xl max-h-[85vh] 
                     shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
                     border border-[#7cc6ee]/20 flex flex-col">
          
          {/* Close button */}
          {/* <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#7cc6ee]/10 
                     transition-all duration-300 group z-10"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-[#7cc6ee] 
                      transition-colors duration-300" /> */}
          {/* </button> */}
          
          {/* Header with progress */}
          <div className="p-4 pb-3 border-b border-gray-200">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-4">
            {renderStep()}
          </div>
          
          {/* Footer with navigation */}
          <div className="flex justify-between items-center p-4 pt-3 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-[#1e2556] hover:bg-[#1e2556] hover:bg-opacity-10'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>



<div className="flex items-center gap-2">
            <button
            onClick={onClose}
            className="flex items-center px-3 py-2 bg-[#7cc6ee] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
          >
            Close
          </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center px-3 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit RFP
                    <Check className="w-3 h-3 ml-1" />
                  </>
                )}
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumRfpForm;