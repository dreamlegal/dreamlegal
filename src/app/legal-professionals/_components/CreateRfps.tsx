
// // 'use client'

// // import React, { useState, useEffect } from "react";
// // import { X } from "lucide-react";
// // import { useNewAuth } from '@/context/NewAuthContext'; // Adjust path as needed
// // import { useRouter } from "next/navigation";

// // // Categories and options from your original code
// // const organizationTypes = [
// //   "Law firms",
// //   "Enterprises",
// //   "Individual Practitioners",
// //   "Startups",
// //   "Government Departments",
// //   "Judiciary",
// //   "In-House Counsels",
// // ];

// // const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

// // const urgencyOptions = [
// //   "Critical (Address Immediately)",
// //   "High (Address in three months)",
// //   "Moderate (Address in six to twelve months)",
// //   "Low (Can be considered next year)",
// // ];

// // const currencies = ["USD", "EUR", "GBP", "INR"];

// // const categoryOptions = {
// //   'Client Relationship Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
// //     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
// //     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
// //     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
// //     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
// //     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
// //   },
// //   'Governance, Risk and Compliance': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
// //     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
// //     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
// //   },
// //   'Contract Lifecycle Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Contract Creation and Authoring': [
// //       'Contract Authoring',
// //       'Text Editor',
// //       'Contract Templatization',
// //       'Format Customization',
// //       'Version control',
// //     ],
// //     'Contract Repository': [
// //       'Document Storage',
// //       'Multiple file formats',
// //       'Categorization and Retrieval',
// //     ],
// //     'Contract Negotiation': [
// //       'Collaboration workspace',
// //       'Comments and Annotations',
// //       'Messaging and Emailing',
// //     ],
// //     'Lifecycle Management': [
// //       'Approval Management',
// //       'Milestone tracking',
// //       'Obligation tracking',
// //       'Calendar Alerts',
// //     ],
// //     'Clause Library': [
// //       'Clause Library',
// //       'Text editor',
// //       'Clause review and approval',
// //       'Version control for clauses',
// //     ],
// //   },
// //   'E-Signature': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Fields Creation': [
// //       'Signature fields',
// //       'Multiple signature styles',
// //       'Data fields',
// //       'Customization and labelling',
// //     ],
// //     'Tracking and Validity': [
// //       'Legal validity',
// //       'Audit trail',
// //       'Document recording and retention',
// //     ],
// //     'Document Management and Templates': [
// //       'Document creation',
// //       'Version control',
// //       'Granular permission for collaborators',
// //     ],
// //     'Document Capturing': [
// //       'Document uploads',
// //       'Multiple file supports',
// //       'OCR',
// //     ],
// //   },
// //   'Legal Research': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Case Law Research': [
// //       'Comprehensive case law databases',
// //       'Jurisdictional filters',
// //       'Citation search and validation',
// //       'Historical case law archives',
// //     ],
// //     'Statutory Research': [
// //       'Statutes and regulations databases',
// //       'Annotations and historical versions',
// //       'Legislative tracking and updates',
// //       'Secondary Sources',
// //       'Legal treatises and commentaries',
// //       'Journals and law reviews',
// //       'International treaties and conventions',
// //     ],
// //     'Advanced Search Capabilities': [
// //       'Search Functionality',
// //       'Boolean and logical search',
// //       'AI-powered search and chat',
// //       'Document upload',
// //     ],
// //     'Filter and Sorting': [
// //       'Jurisdiction and court level',
// //       'Date range and publication type',
// //       'Relevance and citation frequency',
// //     ],
// //   },
// //   'Document Management System': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Document Creation and Templates': [
// //       'Document creation',
// //       'Text editor',
// //       'Document Templatization',
// //       'Central repository',
// //       'Co-authoring features',
// //     ],
// //     'Document Search and Navigation': [
// //       'Categorizing and tagging',
// //       'Search capabilities',
// //       'Filter and sorting',
// //     ],
// //     'Authentication': [
// //       'MFA (Multi factor Authentication)',
// //       'Electronic signature capabilities.',
// //     ],
// //     'Task Allotment': [
// //       'Customizable workflows',
// //       'Internal work delegation',
// //       'Task tracking',
// //     ],
// //   },
// //   'E-billing and Invoicing': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Budgeting, Expense and Time Tracking': [
// //       'Budget management',
// //       'Time tracking',
// //       'Multiple fee arrangements',
// //       'Approval management',
// //     ],
// //     'Client Management': [
// //       'Central client repository',
// //       'Client communications',
// //       'Billing schedules',
// //       'Payment processing',
// //     ],
// //     'Invoice Generation and Review': [
// //       'Customizable invoice templates',
// //       'Automated invoice generation',
// //       'Multiple currencies',
// //       'Tax entries and calculations',
// //       'Payment tracking and recording',
// //     ],
// //   },
// //   'E-discovery': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Data Identification and Collection': [
// //       'Data source identification',
// //       'Remote Collection',
// //       'Network-based collection',
// //       'Forensic imaging',
// //       'Custodian self-collection',
// //       'Validation mechanisms',
// //     ],
// //     'Search, Processing and Analysis': [
// //       'Search functionality',
// //       'Filter and sorting',
// //       'Duplicity elimination',
// //       'Data processing',
// //       'Cluster similar documents',
// //     ],
// //     'Review and Production': [
// //       'Review and Analysis',
// //       'Coding and annotations',
// //       'Process control',
// //       'Review workflow',
// //       'Audit trail',
// //     ],
// //     'Legal Hold Management': [
// //       'Legal hold tracking',
// //       'Legal hold notice management',
// //       'Receipt Acknowledgement',
// //       'Data custodian Management',
// //     ],
// //   },
// //   'Intellectual Property Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Ideation and Creation': [
// //       'Idea intake and management',
// //       'Innovation workflow management',
// //     ],
// //     'Lifecycle Management': [
// //       'Workflow management system (IP lifecycle)',
// //       'Renewal management',
// //       'Management of licensing agreements, contracts',
// //     ],
// //     'Search and Discovery': [
// //       'Database integration',
// //       'Advanced search capabilities',
// //       'Filter and sorting',
// //     ],
// //     'Storage and Repository': [
// //       'Centralized repository',
// //       'Categorization and tagging',
// //       'Accessibility control',
// //       'Access audit',
// //     ],
// //   },
// //   'Litigation Management and Analytics': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Matter Lifecycle Tracking': [
// //       'Task management',
// //       'Document organisation',
// //     ],
// //     'Court and Case Search': [
// //       'Automated case alerts',
// //       'Court docket systems',
// //       'Real-time updates',
// //     ],
// //     'Budget, Expense and Time Tracking': [
// //       'Budget Management',
// //       'Time tracking',
// //       'Approval Management',
// //       'Client invoicing',
// //       'Payment processing',
// //     ],
// //     'Litigation Docketing Features': [
// //       'Collaborative timeline tracking',
// //       'Court Rule tracking',
// //       'Court database integration',
// //       'Customized docket entries',
// //     ],
// //   },
// //   'Legal Workflow Automation': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Workflow Design and Configuration': [
// //       'Workflow designer',
// //       'Branching',
// //       'Task management',
// //       'Data routing',
// //       'Workflow templates',
// //     ],
// //     'Assignment Allotment and Tracking': [
// //       'Task creation',
// //       'Task allotment',
// //       'Task tracking',
// //     ],
// //     'Document Creation and Management': [
// //       'Document creation',
// //       'Templatization',
// //       'Indexing and tagging of documents',
// //       'Document search and retrieval',
// //     ],
// //     'Laws, Compliance and Regulatory Tracking': [
// //       'Sectoral differentiation',
// //       'Compliance applicability',
// //       'Law and compliance updates',
// //     ],
// //   },
// // };

// // // Process lifecycle options based on category
// // const categoryLifecycleOptions = {
// //   'Client Relationship Management': [
// //     'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
// //   ],
// //   'Governance, Risk and Compliance': [
// //     'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
// //   ],
// //   'Contract Lifecycle Management': [
// //     'Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'
// //   ],
// //   'E-Signature': [
// //     'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
// //   ],
// //   'Document Management System': [
// //     'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
// //   ],
// //   'E-billing and Invoicing': [
// //     'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Faciliation', 'Tracking', 'Analysis'
// //   ],
// //   'E-discovery': [
// //     'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
// //   ],
// //   'Intellectual Property Management': [
// //     'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
// //   ],
// //   'Litigation Management and Analytics': [
// //     'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
// //   ],
// //   'Legal Workflow Automation': [
// //     'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
// //   ],
// //   'Legal Research': [
// //     'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
// //   ]
// // };

// // const categoryNames = Object.keys(categoryOptions);

// // // Extract all features for validation (not needed in final form, but keeping structure)
// // const allFeatures = Object.values(categoryOptions)
// //   .flatMap(subcategories => Object.values(subcategories).flatMap(features => features));

// // const RfpFormPage = () => {
// //   const { userId, userType, isLoading } = useNewAuth();
// //   console.log(`User Type: ${userType}, User ID: ${userId}`);
// //   const router = useRouter();

// //   // Organization details
// //   const [userOrgType, setUserOrgType] = useState("");
// //   const [userTeamSize, setUserTeamSize] = useState("");
  
// //   // Project details
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [keyProblems, setKeyProblems] = useState("");
// //   const [keyGoals, setKeyGoals] = useState("");
  
// //   // Process lifecycle and features
// //   const [selectedLifecycleStages, setSelectedLifecycleStages] = useState([]);
// //   const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
// //   const [selectedFeatures, setSelectedFeatures] = useState({});
  
// //   // Budget and timeline
// //   const [urgency, setUrgency] = useState("");
// //   const [budgetMin, setBudgetMin] = useState("");
// //   const [budgetMax, setBudgetMax] = useState("");
// //   const [budgetUnit, setBudgetUnit] = useState("");
  
// //   // Customization
// //   const [customisation, setCustomisation] = useState("");
  
// //   // Form state
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [errors, setErrors] = useState({});
  
// //   // Submission success state
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [redirectSeconds, setRedirectSeconds] = useState(8);

// //   // Fetch user data on component mount
// //   useEffect(() => {
// //     if (!isLoading && userId && userType === "user") {
// //       fetchUserData();
// //     }
// //   }, [isLoading, userId, userType]);

// //   // Handle redirect countdown after successful submission
// //   useEffect(() => {
// //     if (isSubmitted && redirectSeconds > 0) {
// //       const timer = setTimeout(() => {
// //         setRedirectSeconds(redirectSeconds - 1);
// //       }, 1000);
      
// //       return () => clearTimeout(timer);
// //     } else if (isSubmitted && redirectSeconds === 0) {
// //       router.push("/legal_professionals/dashboard/rfps");
// //     }
// //   }, [isSubmitted, redirectSeconds, router]);
  
// //   const fetchUserData = async () => {
// //     if (!userId) return;

// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `/api/get-user?userId=${userId}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch user data");
// //       }
// //       const userData = await response.json();

// //       if (userData.success) {
// //         const { profile } = userData;
// //         setUserOrgType(profile.CompanyType || "");
// //         setUserTeamSize(profile.TeamSize || "");
// //       } else {
// //         throw new Error("Failed to fetch user data");
// //       }
// //     } catch (err) {
// //       setError(err.message || "An error occurred while fetching user data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle functionality selection
// //   const handleFunctionalityChange = (functionality) => {
// //     setSelectedFunctionalities(prev => {
// //       if (prev.includes(functionality)) {
// //         // If removing a functionality, also remove its features
// //         const updatedFeatures = { ...selectedFeatures };
// //         delete updatedFeatures[functionality];
// //         setSelectedFeatures(updatedFeatures);
// //         return prev.filter(f => f !== functionality);
// //       } else {
// //         return [...prev, functionality];
// //       }
// //     });
// //   };

// //   // Handle feature selection
// //   const handleFeatureChange = (functionality, feature) => {
// //     setSelectedFeatures(prev => {
// //       const functionalityFeatures = prev[functionality] || {};
// //       return {
// //         ...prev,
// //         [functionality]: {
// //           ...functionalityFeatures,
// //           [feature]: {
// //             selected: !functionalityFeatures[feature]?.selected,
// //             responses: [],
// //           }
// //         }
// //       };
// //     });
// //   };

// //   // Handle "Select All" features for a functionality
// //   const handleSelectAllFeatures = (functionality) => {
// //     const features = categoryOptions[selectedCategory][functionality];
// //     const allSelected = features.every(
// //       feature => selectedFeatures[functionality]?.[feature]?.selected
// //     );
    
// //     // Toggle selection: if all are selected, unselect all; otherwise select all
// //     const updatedFeatures = { ...selectedFeatures };
// //     updatedFeatures[functionality] = {};
    
// //     features.forEach(feature => {
// //       updatedFeatures[functionality][feature] = {
// //         selected: !allSelected,
// //         responses: []
// //       };
// //     });
    
// //     setSelectedFeatures(updatedFeatures);
// //   };

// //   // Validate form
// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!userOrgType) newErrors.userOrgType = "Organization type is required";
// //     if (!userTeamSize) newErrors.userTeamSize = "Team size is required";
// //     if (!selectedCategory) newErrors.selectedCategory = "Category is required";
// //     if (!urgency) newErrors.urgency = "Urgency level is required";
// //     if (!budgetUnit) newErrors.budgetUnit = "Currency is required";
// //     if (!budgetMin) newErrors.budgetMin = "Minimum budget is required";
// //     if (!budgetMax) newErrors.budgetMax = "Maximum budget is required";
    
// //     // Check if at least one lifecycle stage is selected
// //     if (selectedLifecycleStages.length === 0) {
// //       newErrors.lifecycleStages = "At least one process lifecycle stage must be selected";
// //     }
    
// //     // Check if at least one functionality is selected
// //     if (selectedFunctionalities.length === 0) {
// //       newErrors.functionalities = "At least one functionality must be selected";
// //     }
    
// //     // Check if at least one feature is selected for each functionality
// //     const hasFeatures = selectedFunctionalities.every(func => {
// //       return Object.values(selectedFeatures[func] || {}).some(feature => feature.selected);
// //     });
    
// //     if (!hasFeatures && selectedFunctionalities.length > 0) {
// //       newErrors.features = "Please select at least one feature for each functionality";
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

  
// // const handleSubmit = async (e) => {
// //   e.preventDefault();
  
// //   if (!validateForm()) {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //     return;
// //   }
  
// //   setLoading(true);
  
// //   try {
// //     // Format lifecycle stages into the correct structure
// //     const formattedLifecycle = {};
// //     selectedLifecycleStages.forEach(stage => {
// //       formattedLifecycle[stage] = {
// //         selected: true,
// //         responses: []
// //       };
// //     });
    
// //     // Format features into the correct structure
// //     const formattedFeatures = {};
// //     if (selectedCategory) {
// //       formattedFeatures[selectedCategory] = {};
      
// //       // Add selected functionalities with "selected: true"
// //       selectedFunctionalities.forEach(functionality => {
// //         formattedFeatures[selectedCategory][functionality] = {
// //           selected: true
// //         };
        
// //         // Add the features for each functionality
// //         const functionalityFeatures = selectedFeatures[functionality] || {};
// //         Object.entries(functionalityFeatures).forEach(([feature, details]) => {
// //           if (details.selected) {
// //             formattedFeatures[selectedCategory][functionality][feature] = {
// //               selected: true,
// //               responses: []
// //             };
// //           }
// //         });
// //       });
// //     }
    
// //     // Format the data in the structure expected by the backend
// //     const formData = {
// //       userId,
// //       userOrgType: {
// //         value: userOrgType,
// //         responses: []
// //       },
// //       userTeamSize: {
// //         value: userTeamSize,
// //         responses: []
// //       },
// //       keyProblems: {
// //         value: keyProblems,
// //         responses: []
// //       },
// //       keyGoals: {
// //         value: keyGoals,
// //         responses: []
// //       },
// //       customisation: {
// //         value: customisation,
// //         responses: []
// //       },
// //       selectedCategory,
// //       processLifecycle: formattedLifecycle,
// //       features: formattedFeatures,
// //       urgency: {
// //         value: urgency,
// //         responses: []
// //       },
// //       budget: {
// //         value: {
// //           min: budgetMin,
// //           max: budgetMax,
// //           currency: budgetUnit
// //         },
// //         responses: []
// //       }
// //     };
    
// //     console.log("Submitting RFP data:", JSON.stringify(formData, null, 2));
    
// //     const response = await fetch('/api/submit-rfp', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(formData),
// //     });

// //     const result = await response.json();

// //     if (result.success) {
// //       setIsSubmitted(true);
// //     } else {
// //       setError(result.msg || "Failed to submit RFP.");
// //     }
// //   } catch (err) {
// //     console.error("Error submitting RFP:", err);
// //     setError("An error occurred while submitting. Please try again.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   // Show loading state
// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-[#2d2d2d] text-lg">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Show unauthorized message if not a legal professional
// //   if (!userId || userType !== "user") {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center p-8 max-w-md">
// //           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">Unauthorized Access</h1>
// //           <p className="text-[#2d2d2d] mb-6">You must be a legal professional to access this page.</p>
// //           <button 
// //             className="bg-[#7cc6ee] text-white px-4 py-2 rounded hover:bg-[#6ab5dd] transition-colors"
// //             onClick={() => router.push("/")}
// //           >
// //             Return to Home
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Show success message if form was submitted successfully
// //   if (isSubmitted) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
// //           <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //             </svg>
// //           </div>
// //           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Submitted Successfully!</h1>
// //           <p className="text-[#2d2d2d] mb-6">Your request for proposal has been submitted. You will be redirected to your dashboard in {redirectSeconds} seconds.</p>
// //           <button 
// //             className="bg-[#1e2556] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
// //             onClick={() => router.push("/legal_professionals/dashboard/rfps")}
// //           >
// //             Go to Dashboard Now
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-white">
// //       {/* Hero Section */}
// //       <div className="bg-[#1e2556] text-white py-16 px-4">
// //         <div className="container mx-auto max-w-5xl">
// //           <h1 className="text-3xl md:text-4xl font-bold mb-4">Request for Proposal (RFP)</h1>
// //           <p className="text-lg md:text-xl">Find the perfect legal technology solution for your organization's needs</p>
// //         </div>
// //       </div>
      
// //       {/* Description Section */}
// //       <div className="bg-[#f5f7fa] py-10 px-4">
// //         <div className="container mx-auto max-w-5xl">
// //           <h2 className="text-2xl font-bold text-[#1e2556] mb-4">How It Works</h2>
// //           <p className="text-[#2d2d2d] mb-4">
// //             Complete this form to submit your requirements for legal technology solutions.
// //             Vendors that match your needs will respond with proposals tailored to your specific requirements.
// //           </p>
// //           <p className="text-[#2d2d2d]">
// //             Your RFP will be visible to relevant vendors in our marketplace, connecting you with
// //             the right solutions for your organization.
// //           </p>
// //         </div>
// //       </div>
      
// //       {/* Form Section */}
// //       <div className="py-10 px-4">
// //         <div className="container mx-auto max-w-5xl">
// //           <div className="bg-white rounded-lg shadow p-6 md:p-8">
// //             <h2 className="text-2xl font-bold text-[#1e2556] mb-6">Create Your RFP</h2>
            
// //             {/* Error Display */}
// //             {error && (
// //               <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
// //                 {error}
// //               </div>
// //             )}
            
// //             {/* Form */}
// //             <form onSubmit={handleSubmit}>
// //               {/* Organization Details */}
// //               <div className="mb-8">
// //                 <h3 className="text-xl font-semibold text-[#334155] mb-4">Organization Details</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {/* Organization Type */}
// //                   <div>
// //                     <label className="block text-[#2d2d2d] mb-2" htmlFor="userOrgType">
// //                       Organization Type*
// //                     </label>
// //                     <select
// //                       id="userOrgType"
// //                       value={userOrgType}
// //                       onChange={(e) => setUserOrgType(e.target.value)}
// //                       className={`w-full p-2 border ${errors.userOrgType ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     >
// //                       <option value="">Select organization type</option>
// //                       {organizationTypes.map((type) => (
// //                         <option key={type} value={type}>{type}</option>
// //                       ))}
// //                     </select>
// //                     {errors.userOrgType && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.userOrgType}</p>
// //                     )}
// //                   </div>
                  
// //                   {/* Team Size */}
// //                   <div>

// //                   <label className="block text-[#2d2d2d] mb-2" htmlFor="userTeamSize">
// //                       Team Size*
// //                     </label>
// //                     <select
// //                       id="userTeamSize"
// //                       value={userTeamSize}
// //                       onChange={(e) => setUserTeamSize(e.target.value)}
// //                       className={`w-full p-2 border ${errors.userTeamSize ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     >
// //                       <option value="">Select team size</option>
// //                       {teamSizes.map((size) => (
// //                         <option key={size} value={size}>{size}</option>
// //                       ))}
// //                     </select>
// //                     {errors.userTeamSize && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.userTeamSize}</p>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
              
// //               {/* Category Selection */}
// //               <div className="mb-8">
// //                 <h3 className="text-xl font-semibold text-[#334155] mb-4">Category</h3>
// //                 <div>
// //                   <label className="block text-[#2d2d2d] mb-2" htmlFor="category">
// //                     Select Category*
// //                   </label>
// //                   <select
// //                     id="category"
// //                     value={selectedCategory}
// //                     onChange={(e) => {
// //                       setSelectedCategory(e.target.value);
// //                       setSelectedLifecycleStages([]);
// //                       setSelectedFunctionalities([]);
// //                       setSelectedFeatures({});
// //                     }}
// //                     className={`w-full p-2 border ${errors.selectedCategory ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                   >
// //                     <option value="">Select a category</option>
// //                     {categoryNames.map((category) => (
// //                       <option key={category} value={category}>{category}</option>
// //                     ))}
// //                   </select>
// //                   {errors.selectedCategory && (
// //                     <p className="text-red-500 text-sm mt-1">{errors.selectedCategory}</p>
// //                   )}
// //                 </div>
// //               </div>
              
// //               {/* Key Problems and Goals */}
// //               {selectedCategory && (
// //                 <div className="mb-8">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {/* Key Problems */}
// //                     <div>
// //                       <label className="block text-[#2d2d2d] mb-2" htmlFor="keyProblems">
// //                         Key Problems
// //                       </label>
// //                       <textarea
// //                         id="keyProblems"
// //                         value={keyProblems}
// //                         onChange={(e) => setKeyProblems(e.target.value)}
// //                         placeholder="Describe the key problems you're trying to solve"
// //                         className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
// //                       />
// //                     </div>
                    
// //                     {/* Key Goals */}
// //                     <div>
// //                       <label className="block text-[#2d2d2d] mb-2" htmlFor="keyGoals">
// //                         Key Goals
// //                       </label>
// //                       <textarea
// //                         id="keyGoals"
// //                         value={keyGoals}
// //                         onChange={(e) => setKeyGoals(e.target.value)}
// //                         placeholder="Describe your key goals for this project"
// //                         className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
              
// //               {/* Process Lifecycle */}
// //               {selectedCategory && categoryLifecycleOptions[selectedCategory] && (
// //                 <div className="mb-8">
// //                   <h3 className="text-xl font-semibold text-[#334155] mb-4">Process Lifecycle</h3>
// //                   <p className="text-[#2d2d2d] mb-4">Select the stages that are important for your solution</p>
                  
// //                   {errors.lifecycleStages && (
// //                     <p className="text-red-500 text-sm mb-3">{errors.lifecycleStages}</p>
// //                   )}
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {categoryLifecycleOptions[selectedCategory].map((stage) => (
// //                       <div 
// //                         key={stage} 
// //                         className={`border rounded p-3 cursor-pointer transition-colors ${
// //                           selectedLifecycleStages.includes(stage) 
// //                             ? 'bg-[#7cc6ee] bg-opacity-10 border-[#7cc6ee] text-[#1e2556]' 
// //                             : 'bg-[#f5f7fa] hover:border-[#7cc6ee]'
// //                         }`}
// //                         onClick={() => {
// //                           setSelectedLifecycleStages(prev => 
// //                             prev.includes(stage) 
// //                               ? prev.filter(s => s !== stage)
// //                               : [...prev, stage]
// //                           );
// //                         }}
// //                       >
// //                         <div className="flex items-center">
// //                           <input
// //                             type="checkbox"
// //                             id={`lifecycle-${stage}`}
// //                             checked={selectedLifecycleStages.includes(stage)}
// //                             onChange={() => {}}
// //                             className="mr-2"
// //                           />
// //                           <label 
// //                             htmlFor={`lifecycle-${stage}`}
// //                             className="cursor-pointer text-[#2d2d2d] font-medium"
// //                           >
// //                             {stage}
// //                           </label>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
              
// //               {/* Functionality Selection */}
// //               {selectedCategory && (
// //                 <div className="mb-8">
// //                   <h3 className="text-xl font-semibold text-[#334155] mb-4">Functionality</h3>
// //                   <p className="text-[#2d2d2d] mb-4">Select the functionalities you need for your solution</p>
                  
// //                   {errors.functionalities && (
// //                     <p className="text-red-500 text-sm mb-3">{errors.functionalities}</p>
// //                   )}
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {Object.keys(categoryOptions[selectedCategory]).map((functionality) => (
// //                       <div 
// //                         key={functionality}
// //                         className="border rounded p-3 bg-[#f5f7fa] cursor-pointer hover:border-[#7cc6ee] transition-colors"
// //                         onClick={() => handleFunctionalityChange(functionality)}
// //                       >
// //                         <div className="flex items-start">
// //                           <input
// //                             type="checkbox"
// //                             id={`func-${functionality}`}
// //                             checked={selectedFunctionalities.includes(functionality)}
// //                             onChange={() => {}}
// //                             className="mt-1 mr-2"
// //                           />
// //                           <label 
// //                             htmlFor={`func-${functionality}`} 
// //                             className="cursor-pointer text-[#2d2d2d] font-medium"
// //                           >
// //                             {functionality}
// //                           </label>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
              
// //               {/* Features Selection */}
// //               {selectedFunctionalities.length > 0 && (
// //                 <div className="mb-8">
// //                   <h3 className="text-xl font-semibold text-[#334155] mb-4">Features</h3>
// //                   <p className="text-[#2d2d2d] mb-4">Select specific features for each functionality</p>
                  
// //                   {errors.features && (
// //                     <p className="text-red-500 text-sm mb-3">{errors.features}</p>
// //                   )}
                  
// //                   {selectedFunctionalities.map((functionality) => (
// //                     <div key={functionality} className="mb-6 p-4 border rounded bg-white">
// //                       <div className="flex justify-between items-center mb-3">
// //                         <h4 className="font-medium text-[#1e2556]">{functionality}</h4>
// //                         <button
// //                           type="button"
// //                           onClick={() => handleSelectAllFeatures(functionality)}
// //                           className="px-3 py-1 bg-[#7cc6ee] text-white text-sm rounded hover:bg-[#6ab5dd] transition-colors"
// //                         >
// //                           Select All
// //                         </button>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// //                         {categoryOptions[selectedCategory][functionality].map((feature) => (
// //                           <div key={feature} className="flex items-center">
// //                             <input
// //                               type="checkbox"
// //                               id={`feature-${functionality}-${feature}`}
// //                               checked={selectedFeatures[functionality]?.[feature]?.selected || false}
// //                               onChange={() => handleFeatureChange(functionality, feature)}
// //                               className="mr-2"
// //                             />
// //                             <label 
// //                               htmlFor={`feature-${functionality}-${feature}`}
// //                               className="text-sm text-[#2d2d2d]"
// //                             >
// //                               {feature}
// //                             </label>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
              
// //               {/* Budget & Timeline */}
// //               <div className="mb-8">
// //                 <h3 className="text-xl font-semibold text-[#334155] mb-4">Budget & Timeline</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
// //                   {/* Urgency */}
// //                   <div>
// //                     <label className="block text-[#2d2d2d] mb-2" htmlFor="urgency">
// //                       Urgency Level*
// //                     </label>
// //                     <select
// //                       id="urgency"
// //                       value={urgency}
// //                       onChange={(e) => setUrgency(e.target.value)}
// //                       className={`w-full p-2 border ${errors.urgency ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     >
// //                       <option value="">Select urgency</option>
// //                       {urgencyOptions.map((option) => (
// //                         <option key={option} value={option}>{option}</option>
// //                       ))}
// //                     </select>
// //                     {errors.urgency && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
// //                     )}
// //                   </div>
                  
// //                   {/* Budget Unit */}
// //                   <div>
// //                     <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetUnit">
// //                       Currency*
// //                     </label>
// //                     <select
// //                       id="budgetUnit"
// //                       value={budgetUnit}
// //                       onChange={(e) => setBudgetUnit(e.target.value)}
// //                       className={`w-full p-2 border ${errors.budgetUnit ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     >
// //                       <option value="">Select currency</option>
// //                       {currencies.map((currency) => (
// //                         <option key={currency} value={currency}>{currency}</option>
// //                       ))}
// //                     </select>
// //                     {errors.budgetUnit && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.budgetUnit}</p>
// //                     )}
// //                   </div>
                  
// //                   {/* Budget Min */}
// //                   <div>
// //                     <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetMin">
// //                       Minimum Budget*
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="budgetMin"
// //                       value={budgetMin}
// //                       onChange={(e) => setBudgetMin(e.target.value)}
// //                       placeholder="Enter minimum budget"
// //                       className={`w-full p-2 border ${errors.budgetMin ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     />
// //                     {errors.budgetMin && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
// //                     )}
// //                   </div>
                  
// //                   {/* Budget Max */}
// //                   <div>
// //                     <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetMax">
// //                       Maximum Budget*
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="budgetMax"
// //                       value={budgetMax}
// //                       onChange={(e) => setBudgetMax(e.target.value)}
// //                       placeholder="Enter maximum budget"
// //                       className={`w-full p-2 border ${errors.budgetMax ? 'border-red-500' : 'border-gray-300'} rounded`}
// //                     />
// //                     {errors.budgetMax && (
// //                       <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
              
// //               {/* Customization Requirements */}
// //               <div className="mb-8">
// //                 <label className="block text-[#2d2d2d] mb-2" htmlFor="customisation">
// //                   Specific Customisation Requirements
// //                 </label>
// //                 <textarea
// //                   id="customisation"
// //                   value={customisation}
// //                   onChange={(e) => setCustomisation(e.target.value)}
// //                   placeholder="Describe any specific customization requirements you have"
// //                   className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
// //                 />
// //               </div>
              
// //               {/* Submit Button */}
// //               <button 
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full bg-[#1e2556] text-white py-3 rounded hover:bg-opacity-90 transition-colors"
// //               >
// //                 {loading ? "Submitting..." : "Submit RFP"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RfpFormPage;
// // 'use client'

// // import React, { useState, useEffect } from "react";
// // import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// // // Mock auth context - replace with your actual auth context
// // const useNewAuth = () => ({
// //   userId: "user123",
// //   userType: "user",
// //   isLoading: false
// // });

// // const useRouter = () => ({
// //   push: (path) => console.log(`Navigating to: ${path}`)
// // });

// // // Categories filtered by organization type
// // const getCategoriesByOrgType = (orgType) => {
// //   const inHouseLegalCategories = [
// //     "Contract Lifecycle Management",
// //     "Document Management System", 
// //     "Governance, Risk and Compliance",
// //     "Intellectual Property Management",
// //     "Litigation Management and Analytics"
// //   ];
  
// //   const lawFirmCategories = [
// //     "Client Relationship Management",
// //     "Contract Lifecycle Management",
// //     "Document Management System",
// //     "E-billing and Invoicing", 
// //     "Intellectual Property Management",
// //     "Legal Research",
// //     "Litigation Management and Analytics"
// //   ];
  
// //   const allCategories = [
// //     "Client Relationship Management",
// //     "Governance, Risk and Compliance", 
// //     "Contract Lifecycle Management",
// //     "E-Signature",
// //     "Legal Research",
// //     "Document Management System",
// //     "E-billing and Invoicing",
// //     "E-discovery",
// //     "Intellectual Property Management", 
// //     "Litigation Management and Analytics",
// //     "Legal Workflow Automation"
// //   ];

// //   if (orgType === "In-House Counsels") return inHouseLegalCategories;
// //   if (orgType === "Law firms") return lawFirmCategories;
// //   return allCategories;
// // };

// // const urgencyOptions = [
// //   "Critical (Address Immediately)",
// //   "High (Address in three months)", 
// //   "Moderate (Address in six to twelve months)",
// //   "Low (Can be considered next year)",
// // ];

// // const categoryOptions = {
// //   'Client Relationship Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
// //     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
// //     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
// //     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
// //     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
// //     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
// //   },
// //   'Governance, Risk and Compliance': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
// //     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
// //     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
// //   },
// //   'Contract Lifecycle Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Contract Creation and Authoring': [
// //       'Contract Authoring',
// //       'Text Editor',
// //       'Contract Templatization',
// //       'Format Customization',
// //       'Version control',
// //     ],
// //     'Contract Repository': [
// //       'Document Storage',
// //       'Multiple file formats',
// //       'Categorization and Retrieval',
// //     ],
// //     'Contract Negotiation': [
// //       'Collaboration workspace',
// //       'Comments and Annotations',
// //       'Messaging and Emailing',
// //     ],
// //     'Lifecycle Management': [
// //       'Approval Management',
// //       'Milestone tracking',
// //       'Obligation tracking',
// //       'Calendar Alerts',
// //     ],
// //     'Clause Library': [
// //       'Clause Library',
// //       'Text editor',
// //       'Clause review and approval',
// //       'Version control for clauses',
// //     ],
// //   },
// //   'E-Signature': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Fields Creation': [
// //       'Signature fields',
// //       'Multiple signature styles',
// //       'Data fields',
// //       'Customization and labelling',
// //     ],
// //     'Tracking and Validity': [
// //       'Legal validity',
// //       'Audit trail',
// //       'Document recording and retention',
// //     ],
// //     'Document Management and Templates': [
// //       'Document creation',
// //       'Version control',
// //       'Granular permission for collaborators',
// //     ],
// //     'Document Capturing': [
// //       'Document uploads',
// //       'Multiple file supports',
// //       'OCR',
// //     ],
// //   },
// //   'Legal Research': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Case Law Research': [
// //       'Comprehensive case law databases',
// //       'Jurisdictional filters',
// //       'Citation search and validation',
// //       'Historical case law archives',
// //     ],
// //     'Statutory Research': [
// //       'Statutes and regulations databases',
// //       'Annotations and historical versions',
// //       'Legislative tracking and updates',
// //       'Secondary Sources',
// //       'Legal treatises and commentaries',
// //       'Journals and law reviews',
// //       'International treaties and conventions',
// //     ],
// //     'Advanced Search Capabilities': [
// //       'Search Functionality',
// //       'Boolean and logical search',
// //       'AI-powered search and chat',
// //       'Document upload',
// //     ],
// //     'Filter and Sorting': [
// //       'Jurisdiction and court level',
// //       'Date range and publication type',
// //       'Relevance and citation frequency',
// //     ],
// //   },
// //   'Document Management System': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Document Creation and Templates': [
// //       'Document creation',
// //       'Text editor',
// //       'Document Templatization',
// //       'Central repository',
// //       'Co-authoring features',
// //     ],
// //     'Document Search and Navigation': [
// //       'Categorizing and tagging',
// //       'Search capabilities',
// //       'Filter and sorting',
// //     ],
// //     'Authentication': [
// //       'MFA (Multi factor Authentication)',
// //       'Electronic signature capabilities.',
// //     ],
// //     'Task Allotment': [
// //       'Customizable workflows',
// //       'Internal work delegation',
// //       'Task tracking',
// //     ],
// //   },
// //   'E-billing and Invoicing': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Budgeting, Expense and Time Tracking': [
// //       'Budget management',
// //       'Time tracking',
// //       'Multiple fee arrangements',
// //       'Approval management',
// //     ],
// //     'Client Management': [
// //       'Central client repository',
// //       'Client communications',
// //       'Billing schedules',
// //       'Payment processing',
// //     ],
// //     'Invoice Generation and Review': [
// //       'Customizable invoice templates',
// //       'Automated invoice generation',
// //       'Multiple currencies',
// //       'Tax entries and calculations',
// //       'Payment tracking and recording',
// //     ],
// //   },
// //   'E-discovery': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Data Identification and Collection': [
// //       'Data source identification',
// //       'Remote Collection',
// //       'Network-based collection',
// //       'Forensic imaging',
// //       'Custodian self-collection',
// //       'Validation mechanisms',
// //     ],
// //     'Search, Processing and Analysis': [
// //       'Search functionality',
// //       'Filter and sorting',
// //       'Duplicity elimination',
// //       'Data processing',
// //       'Cluster similar documents',
// //     ],
// //     'Review and Production': [
// //       'Review and Analysis',
// //       'Coding and annotations',
// //       'Process control',
// //       'Review workflow',
// //       'Audit trail',
// //     ],
// //     'Legal Hold Management': [
// //       'Legal hold tracking',
// //       'Legal hold notice management',
// //       'Receipt Acknowledgement',
// //       'Data custodian Management',
// //     ],
// //   },
// //   'Intellectual Property Management': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Ideation and Creation': [
// //       'Idea intake and management',
// //       'Innovation workflow management',
// //     ],
// //     'Lifecycle Management': [
// //       'Workflow management system (IP lifecycle)',
// //       'Renewal management',
// //       'Management of licensing agreements, contracts',
// //     ],
// //     'Search and Discovery': [
// //       'Database integration',
// //       'Advanced search capabilities',
// //       'Filter and sorting',
// //     ],
// //     'Storage and Repository': [
// //       'Centralized repository',
// //       'Categorization and tagging',
// //       'Accessibility control',
// //       'Access audit',
// //     ],
// //   },
// //   'Litigation Management and Analytics': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Matter Lifecycle Tracking': [
// //       'Task management',
// //       'Document organisation',
// //     ],
// //     'Court and Case Search': [
// //       'Automated case alerts',
// //       'Court docket systems',
// //       'Real-time updates',
// //     ],
// //     'Budget, Expense and Time Tracking': [
// //       'Budget Management',
// //       'Time tracking',
// //       'Approval Management',
// //       'Client invoicing',
// //       'Payment processing',
// //     ],
// //     'Litigation Docketing Features': [
// //       'Collaborative timeline tracking',
// //       'Court Rule tracking',
// //       'Court database integration',
// //       'Customized docket entries',
// //     ],
// //   },
// //   'Legal Workflow Automation': {
// //     'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
// //     'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
// //     'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control'],
// //     'Workflow Design and Configuration': [
// //       'Workflow designer',
// //       'Branching',
// //       'Task management',
// //       'Data routing',
// //       'Workflow templates',
// //     ],
// //     'Assignment Allotment and Tracking': [
// //       'Task creation',
// //       'Task allotment',
// //       'Task tracking',
// //     ],
// //     'Document Creation and Management': [
// //       'Document creation',
// //       'Templatization',
// //       'Indexing and tagging of documents',
// //       'Document search and retrieval',
// //     ],
// //     'Laws, Compliance and Regulatory Tracking': [
// //       'Sectoral differentiation',
// //       'Compliance applicability',
// //       'Law and compliance updates',
// //     ],
// //   },
// // };

// // const categoryLifecycleOptions = {
// //   'Client Relationship Management': [
// //     'Intake', 'Assessment', 'Strategize', 'Represent', 'Communication', 'Review'
// //   ],
// //   'Governance, Risk and Compliance': [
// //     'Coverage', 'Assessment', 'Validation', 'Implementation', 'Monitoring', 'Analysis'
// //   ],
// //   'Contract Lifecycle Management': [
// //     'Create', 'Negotiation', 'Authentication', 'Execute', 'Store', 'Tracking'
// //   ],
// //   'E-Signature': [
// //     'Document Preparation', 'Authentication', 'Signing', 'Encryption', 'Verification', 'Distribution'
// //   ],
// //   'Document Management System': [
// //     'Capture', 'Change management', 'Review', 'Organize', 'Access management', 'Retrieval'
// //   ],
// //   'E-billing and Invoicing': [
// //     'Invoice generation', 'Authorization', 'Distribution and Accessibility', 'Payment Faciliation', 'Tracking', 'Analysis'
// //   ],
// //   'E-discovery': [
// //     'Discover', 'Preserve', 'Acquire', 'Examine', 'Evaluate', 'Present'
// //   ],
// //   'Intellectual Property Management': [
// //     'Cataloging', 'Analysis', 'Protection', 'Monitoring', 'Enforcement', 'Reporting'
// //   ],
// //   'Litigation Management and Analytics': [
// //     'Intake', 'Strategize', 'Preparation', 'Litigation Support', 'Analytics', 'Outcome evaluation'
// //   ],
// //   'Legal Workflow Automation': [
// //     'Process Identification', 'Workflow configuration', 'Validation', 'Implementation', 'Tracking', 'Optimization'
// //   ],
// //   'Legal Research': [
// //     'Query Identification', 'Source and Type Selection', 'Filtration and sorting', 'Data extraction', 'Data Analysis and Organization', 'Storage or retrieval'
// //   ]
// // };

// // const ProgressBar = ({ currentStep, totalSteps }) => {
// //   return (
// //     <div className="w-full mb-8">
// //       <div className="flex items-center justify-between mb-2">
// //         <span className="text-sm font-medium text-[#334155]">Step {currentStep} of {totalSteps}</span>
// //         <span className="text-sm text-[#2d2d2d]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
// //       </div>
// //       <div className="w-full bg-gray-200 rounded-full h-3">
// //         <div 
// //           className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] h-3 rounded-full transition-all duration-500 ease-out"
// //           style={{ width: `${(currentStep / totalSteps) * 100}%` }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // const PremiumRfpForm = () => {
// //   const { userId, userType, isLoading } = useNewAuth();
// //   const router = useRouter();
  
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const totalSteps = 8;
  
// //   // User data from API
// //   const [userOrgType, setUserOrgType] = useState("");
// //   const [userTeamSize, setUserTeamSize] = useState("");
  
// //   // Form data
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [keyProblems, setKeyProblems] = useState("");
// //   const [keyGoals, setKeyGoals] = useState("");
// //   const [selectedLifecycleStages, setSelectedLifecycleStages] = useState([]);
// //   const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
// //   const [selectedFeatures, setSelectedFeatures] = useState({});
// //   const [urgency, setUrgency] = useState("");
// //   const [budgetMin, setBudgetMin] = useState("");
// //   const [budgetMax, setBudgetMax] = useState("");
// //   const [customisation, setCustomisation] = useState("");
  
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   // Fetch user data on component mount
// //   useEffect(() => {
// //     if (!isLoading && userId && userType === "user") {
// //       fetchUserData();
// //     }
// //   }, [isLoading, userId, userType]);

// //   const fetchUserData = async () => {
// //     if (!userId) return;
    
// //     setLoading(true);
// //     try {
// //       // Mock API call - replace with actual API
// //       const mockUserData = {
// //         success: true,
// //         profile: {
// //           CompanyType: "Law firms",
// //           TeamSize: "21-50"
// //         }
// //       };
      
// //       if (mockUserData.success) {
// //         const { profile } = mockUserData;
// //         setUserOrgType(profile.CompanyType || "");
// //         setUserTeamSize(profile.TeamSize || "");
// //       }
// //     } catch (err) {
// //       console.error("Error fetching user data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const nextStep = () => {
// //     if (validateCurrentStep()) {
// //       setCurrentStep(prev => Math.min(prev + 1, totalSteps));
// //       setErrors({});
// //     }
// //   };

// //   const prevStep = () => {
// //     setCurrentStep(prev => Math.max(prev - 1, 1));
// //     setErrors({});
// //   };

// //   const validateCurrentStep = () => {
// //     const newErrors = {};
    
// //     switch (currentStep) {
// //       case 1:
// //         if (!selectedCategory) newErrors.selectedCategory = "Please select a category";
// //         break;
// //       case 3:
// //         if (selectedLifecycleStages.length === 0) newErrors.lifecycleStages = "Please select at least one lifecycle stage";
// //         break;
// //       case 4:
// //         if (selectedFunctionalities.length === 0) newErrors.functionalities = "Please select at least one functionality";
// //         break;
// //       case 5:
// //         const hasFeatures = selectedFunctionalities.every(func => {
// //           return Object.values(selectedFeatures[func] || {}).some(feature => feature.selected);
// //         });
// //         if (!hasFeatures && selectedFunctionalities.length > 0) {
// //           newErrors.features = "Please select at least one feature for each functionality";
// //         }
// //         break;
// //       case 6:
// //         if (!urgency) newErrors.urgency = "Please select urgency level";
// //         break;
// //       case 7:
// //         if (!budgetMin) newErrors.budgetMin = "Please enter minimum budget";
// //         if (!budgetMax) newErrors.budgetMax = "Please enter maximum budget";
// //         break;
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleFunctionalityChange = (functionality) => {
// //     setSelectedFunctionalities(prev => {
// //       if (prev.includes(functionality)) {
// //         const updatedFeatures = { ...selectedFeatures };
// //         delete updatedFeatures[functionality];
// //         setSelectedFeatures(updatedFeatures);
// //         return prev.filter(f => f !== functionality);
// //       } else {
// //         return [...prev, functionality];
// //       }
// //     });
// //   };

// //   const handleFeatureChange = (functionality, feature) => {
// //     setSelectedFeatures(prev => {
// //       const functionalityFeatures = prev[functionality] || {};
// //       return {
// //         ...prev,
// //         [functionality]: {
// //           ...functionalityFeatures,
// //           [feature]: {
// //             selected: !functionalityFeatures[feature]?.selected,
// //             responses: [],
// //           }
// //         }
// //       };
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateCurrentStep()) return;
    
// //     setLoading(true);
    
// //     try {
// //       // Format data for submission
// //       const formattedLifecycle = {};
// //       selectedLifecycleStages.forEach(stage => {
// //         formattedLifecycle[stage] = {
// //           selected: true,
// //           responses: []
// //         };
// //       });
      
// //       const formattedFeatures = {};
// //       if (selectedCategory) {
// //         formattedFeatures[selectedCategory] = {};
        
// //         selectedFunctionalities.forEach(functionality => {
// //           formattedFeatures[selectedCategory][functionality] = {
// //             selected: true
// //           };
          
// //           const functionalityFeatures = selectedFeatures[functionality] || {};
// //           Object.entries(functionalityFeatures).forEach(([feature, details]) => {
// //             if (details.selected) {
// //               formattedFeatures[selectedCategory][functionality][feature] = {
// //                 selected: true,
// //                 responses: []
// //               };
// //             }
// //           });
// //         });
// //       }
      
// //       const formData = {
// //         userId,
// //         userOrgType: { value: userOrgType, responses: [] },
// //         userTeamSize: { value: userTeamSize, responses: [] },
// //         keyProblems: { value: keyProblems, responses: [] },
// //         keyGoals: { value: keyGoals, responses: [] },
// //         customisation: { value: customisation, responses: [] },
// //         selectedCategory,
// //         processLifecycle: formattedLifecycle,
// //         features: formattedFeatures,
// //         urgency: { value: urgency, responses: [] },
// //         budget: {
// //           value: {
// //             min: budgetMin,
// //             max: budgetMax,
// //             currency: "USD"
// //           },
// //           responses: []
// //         }
// //       };
      
// //       console.log("RFP Data:", formData);
      
// //       // Simulate API call
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       setIsSubmitted(true);
// //     } catch (err) {
// //       console.error("Error submitting RFP:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-[#2d2d2d] text-lg">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!userId || userType !== "user" || !userOrgType) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
// //         <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
// //           <div className="w-16 h-16 bg-[#1e2556] bg-opacity-10 text-[#1e2556] rounded-full flex items-center justify-center mx-auto mb-6">
// //             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //             </svg>
// //           </div>
// //           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">Login Required</h1>
// //           <p className="text-[#2d2d2d] mb-6">Please login as a legal professional to create an RFP</p>
// //           <button 
// //             className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
// //             onClick={() => router.push("/")}
// //           >
// //             Go to Login
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isSubmitted) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
// //         <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
// //           <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <Check className="w-8 h-8" />
// //           </div>
// //           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Submitted Successfully!</h1>
// //           <p className="text-[#2d2d2d] mb-6">Your request has been submitted. Vendors will contact you with proposals.</p>
// //           <button 
// //             className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
// //             onClick={() => router.push("/legal_professionals/dashboard/rfps")}
// //           >
// //             Go to Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const availableCategories = getCategoriesByOrgType(userOrgType);

// //   const renderStep = () => {
// //     switch (currentStep) {
// //       case 1:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">For which area do you want to implement legal tech?</h2>
// //               <p className="text-[#334155]">Tell us what part of your legal work needs tech support</p>
// //             </div>
            
// //             {errors.selectedCategory && (
// //               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
// //                 {errors.selectedCategory}
// //               </div>
// //             )}
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {availableCategories.map((category) => (
// //                 <div
// //                   key={category}
// //                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
// //                     selectedCategory === category
// //                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
// //                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
// //                   }`}
// //                   onClick={() => setSelectedCategory(category)}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
// //                       selectedCategory === category ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
// //                     }`}>
// //                       {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full"></div>}
// //                     </div>
// //                     <h3 className="font-semibold text-[#1e2556]">{category}</h3>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );

// //       case 2:
// //         return (
// //           <div className="space-y-8">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What challenges are you facing?</h2>
// //               <p className="text-[#334155]">Help us understand your specific needs</p>
// //             </div>
            
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-[#1e2556] font-semibold mb-3">
// //                   What is the key problem you are trying to address?
// //                 </label>
// //                 <textarea
// //                   value={keyProblems}
// //                   onChange={(e) => setKeyProblems(e.target.value)}
// //                   placeholder="Describe the main challenges you're facing with your current process..."
// //                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-[#1e2556] font-semibold mb-3">
// //                   What are the key goals you are trying to achieve?
// //                 </label>
// //                 <textarea
// //                   value={keyGoals}
// //                   onChange={(e) => setKeyGoals(e.target.value)}
// //                   placeholder="Tell us what success looks like for your organization..."
// //                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       case 3:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Which part of your process needs help first?</h2>
// //               <p className="text-[#334155]">Pick one or more that you want to streamline</p>
// //             </div>
            
// //             {errors.lifecycleStages && (
// //               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
// //                 {errors.lifecycleStages}
// //               </div>
// //             )}
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {categoryLifecycleOptions[selectedCategory]?.map((stage) => (
// //                 <div
// //                   key={stage}
// //                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
// //                     selectedLifecycleStages.includes(stage)
// //                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
// //                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
// //                   }`}
// //                   onClick={() => {
// //                     setSelectedLifecycleStages(prev => 
// //                       prev.includes(stage) 
// //                         ? prev.filter(s => s !== stage)
// //                         : [...prev, stage]
// //                     );
// //                   }}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
// //                       selectedLifecycleStages.includes(stage) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
// //                     }`}>
// //                       {selectedLifecycleStages.includes(stage) && <Check className="w-3 h-3 text-white" />}
// //                     </div>
// //                     <span className="font-medium text-[#2d2d2d]">{stage}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );

// //       case 4:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What do you want the tool to help you with?</h2>
// //               <p className="text-[#334155]">Pick the specific functionalities you need - we'll only show tools that fit</p>
// //             </div>
            
// //             {errors.functionalities && (
// //               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
// //                 {errors.functionalities}
// //               </div>
// //             )}
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {Object.keys(categoryOptions[selectedCategory] || {}).map((functionality) => (
// //                 <div
// //                   key={functionality}
// //                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
// //                     selectedFunctionalities.includes(functionality)
// //                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
// //                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
// //                   }`}
// //                   onClick={() => handleFunctionalityChange(functionality)}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
// //                       selectedFunctionalities.includes(functionality) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
// //                     }`}>
// //                       {selectedFunctionalities.includes(functionality) && <Check className="w-3 h-3 text-white" />}
// //                     </div>
// //                     <span className="font-medium text-[#2d2d2d]">{functionality}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );

// //       case 5:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What features are you looking for?</h2>
// //               <p className="text-[#334155]">Choose the things you'd like the software to do</p>
// //             </div>
            
// //             {errors.features && (
// //               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
// //                 {errors.features}
// //               </div>
// //             )}
            
// //             <div className="space-y-6">
// //               {selectedFunctionalities.map((functionality) => (
// //                 <div key={functionality} className="p-6 border-2 border-gray-200 rounded-xl bg-white">
// //                   <h4 className="font-semibold text-[#1e2556] mb-4">{functionality}</h4>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// //                     {categoryOptions[selectedCategory][functionality].map((feature) => (
// //                       <div key={feature} className="flex items-center">
// //                         <input
// //                           type="checkbox"
// //                           id={`feature-${functionality}-${feature}`}
// //                           checked={selectedFeatures[functionality]?.[feature]?.selected || false}
// //                           onChange={() => handleFeatureChange(functionality, feature)}
// //                           className="w-4 h-4 text-[#7cc6ee] border-gray-300 rounded focus:ring-[#7cc6ee]"
// //                         />
// //                         <label 
// //                           htmlFor={`feature-${functionality}-${feature}`}
// //                           className="ml-2 text-sm text-[#2d2d2d] cursor-pointer"
// //                         >
// //                           {feature}
// //                         </label>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );

// //       case 6:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">How soon do you want to solve this?</h2>
// //               <p className="text-[#334155]">This helps us prioritize your request</p>
// //             </div>
            
// //             {errors.urgency && (
// //               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
// //                 {errors.urgency}
// //               </div>
// //             )}
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {urgencyOptions.map((option) => (
// //                 <div
// //                   key={option}
// //                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
// //                     urgency === option
// //                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
// //                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
// //                   }`}
// //                   onClick={() => setUrgency(option)}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
// //                       urgency === option ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
// //                     }`}>
// //                       {urgency === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
// //                     </div>
// //                     <span className="font-medium text-[#2d2d2d]">{option}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );

// //       case 7:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What's your budget range (in USD)?</h2>
// //               <p className="text-[#334155]">We'll match you with tools within range - no spam</p>
// //             </div>
            
// //             <div className="max-w-md mx-auto space-y-6">
// //               <div>
// //                 <label className="block text-[#1e2556] font-semibold mb-3">Minimum: $</label>
// //                 <input
// //                   type="text"
// //                   value={budgetMin}
// //                   onChange={(e) => setBudgetMin(e.target.value)}
// //                   placeholder="10,000"
// //                   className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
// //                     errors.budgetMin ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
// //                   }`}
// //                 />
// //                 {errors.budgetMin && (
// //                   <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
// //                 )}
// //               </div>
              
// //               <div>
// //                 <label className="block text-[#1e2556] font-semibold mb-3">Maximum: $</label>
// //                 <input
// //                   type="text"
// //                   value={budgetMax}
// //                   onChange={(e) => setBudgetMax(e.target.value)}
// //                   placeholder="50,000"
// //                   className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
// //                     errors.budgetMax ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
// //                   }`}
// //                 />
// //                 {errors.budgetMax && (
// //                   <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       case 8:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Share anything else on your mind</h2>
// //               <p className="text-[#334155]">Goals, challenges, or special needs we didn't ask about</p>
// //             </div>
            
// //             <div>
// //               <textarea
// //                 value={customisation}
// //                 onChange={(e) => setCustomisation(e.target.value)}
// //                 placeholder="Tell us about any specific requirements, integrations, or concerns you have..."
// //                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[150px] bg-[#f5f7fa]"
// //               />
// //             </div>
// //           </div>
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-white">
// //       <div className="container mx-auto max-w-4xl px-4 py-8">
// //         <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
// //         <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px] flex flex-col">
// //           <div className="flex-1">
// //             {renderStep()}
// //           </div>
          
// //           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
// //             <button
// //               onClick={prevStep}
// //               disabled={currentStep === 1}
// //               className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
// //                 currentStep === 1 
// //                   ? 'text-gray-400 cursor-not-allowed' 
// //                   : 'text-[#1e2556] hover:bg-[#1e2556] hover:bg-opacity-10'
// //               }`}
// //             >
// //               <ChevronLeft className="w-5 h-5 mr-2" />
// //               Previous
// //             </button>
            
// //             {currentStep < totalSteps ? (
// //               <button
// //                 onClick={nextStep}
// //                 className="flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
// //               >
// //                 Next
// //                 <ChevronRight className="w-5 h-5 ml-2" />
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={handleSubmit}
// //                 disabled={loading}
// //                 className="flex items-center px-8 py-3 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
// //                     Submitting...
// //                   </>
// //                 ) : (
// //                   <>
// //                     Submit RFP
// //                     <Check className="w-5 h-5 ml-2" />
// //                   </>
// //                 )}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PremiumRfpForm;
// 'use client'

// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// // Mock auth context - replace with your actual auth context
// const useNewAuth = () => ({
//   userId: "user123",
//   userType: "user",
//   isLoading: false
// });

// const useRouter = () => ({
//   push: (path) => console.log(`Navigating to: ${path}`)
// });

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
//     <div className="w-full mb-8">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm font-medium text-[#334155]">Step {currentStep} of {totalSteps}</span>
//         <span className="text-sm text-[#2d2d2d]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div 
//           className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] h-3 rounded-full transition-all duration-500 ease-out"
//           style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const PremiumRfpForm = () => {
//   const { userId, userType, isLoading } = useNewAuth();
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
//       // Real API call - replace mock with actual API
//       const response = await fetch(`/api/get-user?userId=${userId}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
      
//       const userData = await response.json();
//       console.log("Fetched user data:", userData);
      
//       if (userData.success) {
//         const { profile } = userData;
//         console.log("User organization type:", profile.CompanyType);
//         setUserOrgType(profile.CompanyType || "");
//         setUserTeamSize(profile.TeamSize || "");
//       } else {
//         throw new Error("Failed to fetch user data");
//       }
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       // Fallback to mock data for testing different org types
//       console.log("Using fallback mock data");
//       setUserOrgType("In-House Counsels"); // Change this to test different org types
//       setUserTeamSize("21-50");
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
      
//       console.log("RFP Data:", formData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error("Error submitting RFP:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-[#2d2d2d] text-lg">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!userId || userType !== "user" || !userOrgType) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
//         <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
//         <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
//           <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Check className="w-8 h-8" />
//           </div>
//           <h1 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Submitted Successfully!</h1>
//           <p className="text-[#2d2d2d] mb-6">Your request has been submitted. Vendors will contact you with proposals.</p>
//           <button 
//             className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
//             onClick={() => router.push("/legal_professionals/dashboard/rfps")}
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const availableCategories = getCategoriesByOrgType(userOrgType);
  
//   console.log("Current organization type:", userOrgType);
//   console.log("Available categories:", availableCategories);

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">For which area do you want to implement legal tech?</h2>
//               <p className="text-[#334155]">Tell us what part of your legal work needs tech support</p>
//               {/* Debug info */}
//               <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
//                 <strong>Organization Type:</strong> {userOrgType || "Not set"} | 
//                 <strong> Available Categories:</strong> {availableCategories.length}
//               </div>
//             </div>
            
//             {errors.selectedCategory && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
//                 {errors.selectedCategory}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {availableCategories.map((category) => (
//                 <div
//                   key={category}
//                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     selectedCategory === category
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
//                       selectedCategory === category ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <h3 className="font-semibold text-[#1e2556]">{category}</h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-8">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What challenges are you facing?</h2>
//               <p className="text-[#334155]">Help us understand your specific needs</p>
//             </div>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-3">
//                   What is the key problem you are trying to address?
//                 </label>
//                 <textarea
//                   value={keyProblems}
//                   onChange={(e) => setKeyProblems(e.target.value)}
//                   placeholder="Describe the main challenges you're facing with your current process..."
//                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-3">
//                   What are the key goals you are trying to achieve?
//                 </label>
//                 <textarea
//                   value={keyGoals}
//                   onChange={(e) => setKeyGoals(e.target.value)}
//                   placeholder="Tell us what success looks like for your organization..."
//                   className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Which part of your process needs help first?</h2>
//               <p className="text-[#334155]">Pick one or more that you want to streamline</p>
//             </div>
            
//             {errors.lifecycleStages && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
//                 {errors.lifecycleStages}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {categoryLifecycleOptions[selectedCategory]?.map((stage) => (
//                 <div
//                   key={stage}
//                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
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
//                     <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
//                       selectedLifecycleStages.includes(stage) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedLifecycleStages.includes(stage) && <Check className="w-3 h-3 text-white" />}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d]">{stage}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What do you want the tool to help you with?</h2>
//               <p className="text-[#334155]">Pick the specific functionalities you need - we'll only show tools that fit</p>
//             </div>
            
//             {errors.functionalities && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
//                 {errors.functionalities}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.keys(categoryOptions[selectedCategory] || {}).map((functionality) => (
//                 <div
//                   key={functionality}
//                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     selectedFunctionalities.includes(functionality)
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => handleFunctionalityChange(functionality)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
//                       selectedFunctionalities.includes(functionality) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {selectedFunctionalities.includes(functionality) && <Check className="w-3 h-3 text-white" />}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d]">{functionality}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What features are you looking for?</h2>
//               <p className="text-[#334155]">Choose the things you'd like the software to do</p>
//             </div>
            
//             {errors.features && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
//                 {errors.features}
//               </div>
//             )}
            
//             <div className="space-y-6">
//               {selectedFunctionalities.map((functionality) => (
//                 <div key={functionality} className="p-6 border-2 border-gray-200 rounded-xl bg-white">
//                   <h4 className="font-semibold text-[#1e2556] mb-4">{functionality}</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                     {categoryOptions[selectedCategory][functionality].map((feature) => (
//                       <div key={feature} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`feature-${functionality}-${feature}`}
//                           checked={selectedFeatures[functionality]?.[feature]?.selected || false}
//                           onChange={() => handleFeatureChange(functionality, feature)}
//                           className="w-4 h-4 text-[#7cc6ee] border-gray-300 rounded focus:ring-[#7cc6ee]"
//                         />
//                         <label 
//                           htmlFor={`feature-${functionality}-${feature}`}
//                           className="ml-2 text-sm text-[#2d2d2d] cursor-pointer"
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
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">How soon do you want to solve this?</h2>
//               <p className="text-[#334155]">This helps us prioritize your request</p>
//             </div>
            
//             {errors.urgency && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
//                 {errors.urgency}
//               </div>
//             )}
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {urgencyOptions.map((option) => (
//                 <div
//                   key={option}
//                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
//                     urgency === option
//                       ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
//                       : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
//                   }`}
//                   onClick={() => setUrgency(option)}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
//                       urgency === option ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
//                     }`}>
//                       {urgency === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <span className="font-medium text-[#2d2d2d]">{option}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What's your budget range (in USD)?</h2>
//               <p className="text-[#334155]">We'll match you with tools within range - no spam</p>
//             </div>
            
//             <div className="max-w-md mx-auto space-y-6">
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-3">Minimum: $</label>
//                 <input
//                   type="text"
//                   value={budgetMin}
//                   onChange={(e) => setBudgetMin(e.target.value)}
//                   placeholder="10,000"
//                   className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
//                     errors.budgetMin ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
//                   }`}
//                 />
//                 {errors.budgetMin && (
//                   <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block text-[#1e2556] font-semibold mb-3">Maximum: $</label>
//                 <input
//                   type="text"
//                   value={budgetMax}
//                   onChange={(e) => setBudgetMax(e.target.value)}
//                   placeholder="50,000"
//                   className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
//                     errors.budgetMax ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
//                   }`}
//                 />
//                 {errors.budgetMax && (
//                   <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Share anything else on your mind</h2>
//               <p className="text-[#334155]">Goals, challenges, or special needs we didn't ask about</p>
//             </div>
            
//             <div>
//               <textarea
//                 value={customisation}
//                 onChange={(e) => setCustomisation(e.target.value)}
//                 placeholder="Tell us about any specific requirements, integrations, or concerns you have..."
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[150px] bg-[#f5f7fa]"
//               />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-white">
//       <div className="container mx-auto max-w-4xl px-4 py-8">
//         <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
//         {/* Temporary testing selector - remove in production */}
//         <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-sm text-yellow-700 mb-2"><strong>Testing Mode:</strong> Change organization type to test filtering</p>
//           <select 
//             value={userOrgType} 
//             onChange={(e) => setUserOrgType(e.target.value)}
//             className="px-3 py-1 border border-yellow-300 rounded text-sm"
//           >
//             <option value="">Select Organization Type</option>
//             <option value="Law firms">Law firms</option>
//             <option value="In-House Counsels">In-House Counsels</option>
//             <option value="Enterprises">Enterprises</option>
//             <option value="Individual Practitioners">Individual Practitioners</option>
//             <option value="Startups">Startups</option>
//           </select>
//         </div>
        
//         <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px] flex flex-col">
//           <div className="flex-1">
//             {renderStep()}
//           </div>
          
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
//                 currentStep === 1 
//                   ? 'text-gray-400 cursor-not-allowed' 
//                   : 'text-[#1e2556] hover:bg-[#1e2556] hover:bg-opacity-10'
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5 mr-2" />
//               Previous
//             </button>
            
//             {currentStep < totalSteps ? (
//               <button
//                 onClick={nextStep}
//                 className="flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 Next
//                 <ChevronRight className="w-5 h-5 ml-2" />
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="flex items-center px-8 py-3 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     Submit RFP
//                     <Check className="w-5 h-5 ml-2" />
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
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useNewAuth } from '@/context/NewAuthContext';
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
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#334155]">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-[#2d2d2d]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

const PremiumRfpForm = () => {
  const { userId, userType, isLoading } = useNewAuth();
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
      // Real API call to get user data
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
      // Format data for submission
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
      
      console.log("Submitting RFP data:", formData);
      
      // Real API call to submit RFP
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7cc6ee] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2d2d2d] text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userId || userType !== "user" || !userOrgType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
        <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-[#1e2556] bg-opacity-10 text-[#1e2556] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1e2556] mb-4">Login Required</h1>
          <p className="text-[#2d2d2d] mb-6">Please login as a legal professional to create an RFP</p>
          <button 
            className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            onClick={() => router.push("/")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-white">
        <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[#1e2556] mb-4">RFP Submitted Successfully!</h1>
          <p className="text-[#2d2d2d] mb-6">Your request has been submitted. Vendors will contact you with proposals.</p>
          <button 
            className="bg-[#1e2556] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            onClick={() => router.push("/legal_professionals/dashboard/rfps")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const availableCategories = getCategoriesByOrgType(userOrgType);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">For which area do you want to implement legal tech?</h2>
              <p className="text-[#334155]">Tell us what part of your legal work needs tech support</p>
            </div>
            
            {errors.selectedCategory && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {errors.selectedCategory}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCategories.map((category) => (
                <div
                  key={category}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedCategory === category ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <h3 className="font-semibold text-[#1e2556]">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What challenges are you facing?</h2>
              <p className="text-[#334155]">Help us understand your specific needs</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#1e2556] font-semibold mb-3">
                  What is the key problem you are trying to address?
                </label>
                <textarea
                  value={keyProblems}
                  onChange={(e) => setKeyProblems(e.target.value)}
                  placeholder="Describe the main challenges you're facing with your current process..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
                />
              </div>
              
              <div>
                <label className="block text-[#1e2556] font-semibold mb-3">
                  What are the key goals you are trying to achieve?
                </label>
                <textarea
                  value={keyGoals}
                  onChange={(e) => setKeyGoals(e.target.value)}
                  placeholder="Tell us what success looks like for your organization..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[120px] bg-[#f5f7fa]"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Which part of your process needs help first?</h2>
              <p className="text-[#334155]">Pick one or more that you want to streamline</p>
            </div>
            
            {errors.lifecycleStages && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {errors.lifecycleStages}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryLifecycleOptions[selectedCategory]?.map((stage) => (
                <div
                  key={stage}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedLifecycleStages.includes(stage)
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
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
                    <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                      selectedLifecycleStages.includes(stage) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedLifecycleStages.includes(stage) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-medium text-[#2d2d2d]">{stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What do you want the tool to help you with?</h2>
              <p className="text-[#334155]">Pick the specific functionalities you need - we'll only show tools that fit</p>
            </div>
            
            {errors.functionalities && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {errors.functionalities}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(categoryOptions[selectedCategory] || {}).map((functionality) => (
                <div
                  key={functionality}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedFunctionalities.includes(functionality)
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
                  }`}
                  onClick={() => handleFunctionalityChange(functionality)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                      selectedFunctionalities.includes(functionality) ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {selectedFunctionalities.includes(functionality) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-medium text-[#2d2d2d]">{functionality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What features are you looking for?</h2>
              <p className="text-[#334155]">Choose the things you'd like the software to do</p>
            </div>
            
            {errors.features && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {errors.features}
              </div>
            )}
            
            <div className="space-y-6">
              {selectedFunctionalities.map((functionality) => (
                <div key={functionality} className="p-6 border-2 border-gray-200 rounded-xl bg-white">
                  <h4 className="font-semibold text-[#1e2556] mb-4">{functionality}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryOptions[selectedCategory][functionality].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-${functionality}-${feature}`}
                          checked={selectedFeatures[functionality]?.[feature]?.selected || false}
                          onChange={() => handleFeatureChange(functionality, feature)}
                          className="w-4 h-4 text-[#7cc6ee] border-gray-300 rounded focus:ring-[#7cc6ee]"
                        />
                        <label 
                          htmlFor={`feature-${functionality}-${feature}`}
                          className="ml-2 text-sm text-[#2d2d2d] cursor-pointer"
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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">How soon do you want to solve this?</h2>
              <p className="text-[#334155]">This helps us prioritize your request</p>
            </div>
            
            {errors.urgency && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {errors.urgency}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgencyOptions.map((option) => (
                <div
                  key={option}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    urgency === option
                      ? 'border-[#7cc6ee] bg-[#7cc6ee] bg-opacity-10 shadow-lg transform scale-[1.02]'
                      : 'border-gray-200 bg-[#f5f7fa] hover:border-[#7cc6ee] hover:shadow-md'
                  }`}
                  onClick={() => setUrgency(option)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                      urgency === option ? 'border-[#7cc6ee] bg-[#7cc6ee]' : 'border-gray-300'
                    }`}>
                      {urgency === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium text-[#2d2d2d]">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">What's your budget range (in USD)?</h2>
              <p className="text-[#334155]">We'll match you with tools within range - no spam</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-[#1e2556] font-semibold mb-3">Minimum: $</label>
                <input
                  type="text"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="10,000"
                  className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
                    errors.budgetMin ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
                  }`}
                />
                {errors.budgetMin && (
                  <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1e2556] font-semibold mb-3">Maximum: $</label>
                <input
                  type="text"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="50,000"
                  className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors bg-[#f5f7fa] ${
                    errors.budgetMax ? 'border-red-500' : 'border-gray-200 focus:border-[#7cc6ee]'
                  }`}
                />
                {errors.budgetMax && (
                  <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e2556] mb-3">Share anything else on your mind</h2>
              <p className="text-[#334155]">Goals, challenges, or special needs we didn't ask about</p>
            </div>
            
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                {submitError}
              </div>
            )}
            
            <div>
              <textarea
                value={customisation}
                onChange={(e) => setCustomisation(e.target.value)}
                placeholder="Tell us about any specific requirements, integrations, or concerns you have..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#7cc6ee] focus:outline-none transition-colors min-h-[150px] bg-[#f5f7fa]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px] flex flex-col">
          <div className="flex-1">
            {renderStep()}
          </div>
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-[#1e2556] hover:bg-[#1e2556] hover:bg-opacity-10'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit RFP
                    <Check className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumRfpForm;