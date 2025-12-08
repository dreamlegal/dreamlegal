'use client'

import React, { useState, useEffect } from "react";
import { useNewAuth } from '@/context/NewAuthContext'; // Adjust path as needed
import { useRouter } from "next/navigation";

// Categories and options from your original code
const organizationTypes = [
  "Law firms",
  "Enterprises",
  "Individual Practitioners",
  "Startups",
  "Government Departments",
  "Judiciary",
  "In-House Counsels",
];

const teamSizes = ["1", "2-20", "21-50", "51- 200", "201-500", "500+"];

const urgencyOptions = [
  "Critical (Address Immediately)",
  "High (Address in three months)",
  "Moderate (Address in six to twelve months)",
  "Low (Can be considered next year)",
];

const currencies = ["USD", "EUR", "GBP", "INR"];

// Process lifecycle options based on category
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

const categoryNames = Object.keys(categoryOptions);

// Extract all features for validation (not needed in final form, but keeping structure)
const allFeatures = Object.values(categoryOptions)
  .flatMap(subcategories => Object.values(subcategories).flatMap(features => features));

const RfpFormPage = () => {
  const { userId, userType, isLoading } = useNewAuth();
  const router = useRouter();

  // Organization details
  const [userOrgType, setUserOrgType] = useState("");
  const [userTeamSize, setUserTeamSize] = useState("");
  
  // Project details
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyProblems, setKeyProblems] = useState("");
  const [keyGoals, setKeyGoals] = useState("");
  
  // Process lifecycle and features
  const [selectedLifecycleStages, setSelectedLifecycleStages] = useState([]);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  
  // Budget and timeline
  const [urgency, setUrgency] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [budgetUnit, setBudgetUnit] = useState("");
  
  // Customization
  const [customisation, setCustomisation] = useState("");
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    if (!isLoading && userId && userType === "user") {
      fetchUserData();
    }
  }, [isLoading, userId, userType]);

  // Redirect if not a legal professional
  useEffect(() => {
    if (!isLoading && (!userId || userType !== "user")) {
      router.push("/unauthorized");
    }
  }, [isLoading, userId, userType, router]);

  // Fetch user profile data
  const fetchUserData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/get-user?userId=${userId}`
      );
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
      setError(err.message || "An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  // Handle functionality selection
  const handleFunctionalityChange = (functionality) => {
    setSelectedFunctionalities(prev => {
      if (prev.includes(functionality)) {
        // If removing a functionality, also remove its features
        const updatedFeatures = { ...selectedFeatures };
        delete updatedFeatures[functionality];
        setSelectedFeatures(updatedFeatures);
        return prev.filter(f => f !== functionality);
      } else {
        // If adding a functionality, auto-select all its features
        const newFeatures = { ...selectedFeatures };
        newFeatures[functionality] = {};
        
        if (selectedCategory && categoryOptions[selectedCategory][functionality]) {
          categoryOptions[selectedCategory][functionality].forEach(feature => {
            newFeatures[functionality][feature] = {
              selected: true,
              responses: []
            };
          });
        }
        
        setSelectedFeatures(newFeatures);
        return [...prev, functionality];
      }
    });
  };

  // Handle feature selection
  const handleFeatureChange = (functionality, feature) => {
    setSelectedFeatures(prev => {
      const functionalityFeatures = prev[functionality] || {};
      return {
        ...prev,
        [functionality]: {
          ...functionalityFeatures,
          [feature]: {
            selected: !functionalityFeatures[feature]?.selected,
            responses: []
          }
        }
      };
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!userOrgType) newErrors.userOrgType = "Organization type is required";
    if (!userTeamSize) newErrors.userTeamSize = "Team size is required";
    if (!selectedCategory) newErrors.selectedCategory = "Category is required";
    if (!urgency) newErrors.urgency = "Urgency level is required";
    if (!budgetUnit) newErrors.budgetUnit = "Currency is required";
    if (!budgetMin) newErrors.budgetMin = "Minimum budget is required";
    if (!budgetMax) newErrors.budgetMax = "Maximum budget is required";
    
    // Check if at least one lifecycle stage is selected
    if (selectedLifecycleStages.length === 0) {
      newErrors.lifecycleStages = "At least one process lifecycle stage must be selected";
    }
    
    // Check if at least one functionality is selected
    if (selectedFunctionalities.length === 0) {
      newErrors.functionalities = "At least one functionality must be selected";
    }
    
    // Check if at least one feature is selected for each functionality
    const hasFeatures = selectedFunctionalities.every(func => {
      return Object.values(selectedFeatures[func] || {}).some(feature => feature.selected);
    });
    
    if (!hasFeatures && selectedFunctionalities.length > 0) {
      newErrors.features = "Please select at least one feature for each functionality";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setLoading(true);
    
    try {
      // Format the data according to our new JSON structure
      const formattedLifecycles = {};
      selectedLifecycleStages.forEach(stage => {
        formattedLifecycles[stage] = {
          selected: true,
          responses: []
        };
      });
      
      // Format features with proper structure
      const formattedFeatures = {};
      if (selectedCategory) {
        formattedFeatures[selectedCategory] = {};
        
        // Add functionalities with selected flag
        selectedFunctionalities.forEach(functionality => {
          formattedFeatures[selectedCategory][functionality] = {
            selected: true
          };
          
          // Add features with selected flag
          const functionalityFeatures = selectedFeatures[functionality] || {};
          Object.keys(functionalityFeatures).forEach(feature => {
            if (functionalityFeatures[feature]?.selected) {
              formattedFeatures[selectedCategory][functionality][feature] = {
                selected: true,
                responses: []
              };
            }
          });
        });
      }
      
      // Format the data in the structure expected by the backend
      const formData = {
        userId,
        userOrgType: {
          value: userOrgType,
          responses: []
        },
        userTeamSize: {
          value: userTeamSize,
          responses: []
        },
        keyProblems: {
          value: keyProblems,
          responses: []
        },
        keyGoals: {
          value: keyGoals,
          responses: []
        },
        customisation: {
          value: customisation,
          responses: []
        },
        selectedCategory,
        processLifecycle: formattedLifecycles,
        features: formattedFeatures,
        urgency: {
          value: urgency,
          responses: []
        },
        budget: {
          value: {
            min: budgetMin,
            max: budgetMax,
            currency: budgetUnit
          },
          responses: []
        }
      };
      
      // Log the formatted data
      console.log("Submitting RFP with data:", JSON.stringify(formData, null, 2));
      
      const response = await fetch('/api/submit-rfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("RFP submitted successfully!");
        // router.push("/dashboard"); // Redirect to dashboard or confirmation page
      } else {
        setError(result.msg || "Failed to submit RFP.");
      }
    } catch (err) {
      console.error("Error submitting RFP:", err);
      setError("An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#2d2d2d] text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if not a legal professional
  if (!userId || userType !== "user") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-[#1e2556] mb-4">Unauthorized Access</h1>
          <p className="text-[#2d2d2d] mb-6">You must be a legal professional to access this page.</p>
          <button 
            className="bg-[#7cc6ee] text-white px-4 py-2 rounded hover:bg-[#6ab5dd] transition-colors"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1e2556] text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request for Proposal (RFP)</h1>
          <p className="text-lg md:text-xl">Find the perfect legal technology solution for your organization's needs</p>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="bg-[#f5f7fa] py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#1e2556] mb-4">How It Works</h2>
          <p className="text-[#2d2d2d] mb-4">
            Complete this form to submit your requirements for legal technology solutions.
            Vendors that match your needs will respond with proposals tailored to your specific requirements.
          </p>
          <p className="text-[#2d2d2d]">
            Your RFP will be visible to relevant vendors in our marketplace, connecting you with
            the right solutions for your organization.
          </p>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#1e2556] mb-6">Create Your RFP</h2>
            
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Organization Details */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#334155] mb-4">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organization Type */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="userOrgType">
                      Organization Type*
                    </label>
                    <select
                      id="userOrgType"
                      value={userOrgType}
                      onChange={(e) => setUserOrgType(e.target.value)}
                      className={`w-full p-2 border ${errors.userOrgType ? 'border-red-500' : 'border-gray-300'} rounded`}
                    >
                      <option value="">Select organization type</option>
                      {organizationTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.userOrgType && (
                      <p className="text-red-500 text-sm mt-1">{errors.userOrgType}</p>
                    )}
                  </div>
                  
                  {/* Team Size */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="userTeamSize">
                      Team Size*
                    </label>
                    <select
                      id="userTeamSize"
                      value={userTeamSize}
                      onChange={(e) => setUserTeamSize(e.target.value)}
                      className={`w-full p-2 border ${errors.userTeamSize ? 'border-red-500' : 'border-gray-300'} rounded`}
                    >
                      <option value="">Select team size</option>
                      {teamSizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.userTeamSize && (
                      <p className="text-red-500 text-sm mt-1">{errors.userTeamSize}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Budget & Timeline */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#334155] mb-4">Budget & Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  {/* Budget Min */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetMin">
                      Minimum Budget*
                    </label>
                    <input
                      type="text"
                      id="budgetMin"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      placeholder="Enter minimum budget"
                      className={`w-full p-2 border ${errors.budgetMin ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.budgetMin && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
                    )}
                  </div>
                  
                  {/* Budget Max */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetMax">
                      Maximum Budget*
                    </label>
                    <input
                      type="text"
                      id="budgetMax"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      placeholder="Enter maximum budget"
                      className={`w-full p-2 border ${errors.budgetMax ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.budgetMax && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
                    )}
                  </div>
                  
                  {/* Budget Unit */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="budgetUnit">
                      Currency*
                    </label>
                    <select
                      id="budgetUnit"
                      value={budgetUnit}
                      onChange={(e) => setBudgetUnit(e.target.value)}
                      className={`w-full p-2 border ${errors.budgetUnit ? 'border-red-500' : 'border-gray-300'} rounded`}
                    >
                      <option value="">Select currency</option>
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    {errors.budgetUnit && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetUnit}</p>
                    )}
                  </div>
                  
                  {/* Urgency */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="urgency">
                      Urgency Level*
                    </label>
                    <select
                      id="urgency"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className={`w-full p-2 border ${errors.urgency ? 'border-red-500' : 'border-gray-300'} rounded`}
                    >
                      <option value="">Select urgency</option>
                      {urgencyOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.urgency && (
                      <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Key Problems and Goals */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#334155] mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Problems */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="keyProblems">
                      Key Problems
                    </label>
                    <textarea
                      id="keyProblems"
                      value={keyProblems}
                      onChange={(e) => setKeyProblems(e.target.value)}
                      placeholder="Describe the key problems you're trying to solve"
                      className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                    />
                  </div>
                  
                  {/* Key Goals */}
                  <div>
                    <label className="block text-[#2d2d2d] mb-2" htmlFor="keyGoals">
                      Key Goals
                    </label>
                    <textarea
                      id="keyGoals"
                      value={keyGoals}
                      onChange={(e) => setKeyGoals(e.target.value)}
                      placeholder="Describe your key goals for this project"
                      className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Category Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#334155] mb-4">Solution Category</h3>
                <div>
                  <label className="block text-[#2d2d2d] mb-2" htmlFor="category">
                    Select Category*
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedLifecycleStages([]);
                      setSelectedFunctionalities([]);
                      setSelectedFeatures({});
                    }}
                    className={`w-full p-2 border ${errors.selectedCategory ? 'border-red-500' : 'border-gray-300'} rounded`}
                  >
                    <option value="">Select a category</option>
                    {categoryNames.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.selectedCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedCategory}</p>
                  )}
                </div>
              </div>
              
              {/* Customization Requirements */}
              <div className="mb-8">
                <label className="block text-[#2d2d2d] mb-2" htmlFor="customisation">
                  Specific Customisation Requirements
                </label>
                <textarea
                  id="customisation"
                  value={customisation}
                  onChange={(e) => setCustomisation(e.target.value)}
                  placeholder="Describe any specific customization requirements you have"
                  className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                />
              </div>
              
              {/* Process Lifecycle - Only shown after category selection */}
              {selectedCategory && categoryLifecycleOptions[selectedCategory] && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#334155] mb-4">Process Lifecycle</h3>
                  <p className="text-[#2d2d2d] mb-4">Select the stages that are important for your solution</p>
                  
                  {errors.lifecycleStages && (
                    <p className="text-red-500 text-sm mb-3">{errors.lifecycleStages}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryLifecycleOptions[selectedCategory].map((stage) => (
                      <div 
                        key={stage} 
                        className={`border rounded p-3 cursor-pointer transition-colors ${
                          selectedLifecycleStages.includes(stage) 
                            ? 'bg-[#7cc6ee] bg-opacity-10 border-[#7cc6ee] text-[#1e2556]' 
                            : 'bg-[#f5f7fa] hover:border-[#7cc6ee]'
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
                          <input
                            type="checkbox"
                            id={`lifecycle-${stage}`}
                            checked={selectedLifecycleStages.includes(stage)}
                            onChange={() => {}}
                            className="mr-2"
                          />
                          <label 
                            htmlFor={`lifecycle-${stage}`}
                            className="cursor-pointer text-[#2d2d2d] font-medium"
                          >
                            {stage}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Functionality Selection - Only shown after category selection */}
              {selectedCategory && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#334155] mb-4">Functionality</h3>
                  <p className="text-[#2d2d2d] mb-4">Select the functionalities you need for your solution</p>
                  
                  {errors.functionalities && (
                    <p className="text-red-500 text-sm mb-3">{errors.functionalities}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(categoryOptions[selectedCategory]).map((functionality) => (
                      <div 
                        key={functionality}
                        className={`border rounded p-3 cursor-pointer hover:border-[#7cc6ee] transition-colors ${
                          selectedFunctionalities.includes(functionality) 
                            ? 'bg-[#7cc6ee] bg-opacity-10 border-[#7cc6ee]' 
                            : 'bg-[#f5f7fa]'
                        }`}
                        onClick={() => handleFunctionalityChange(functionality)}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id={`func-${functionality}`}
                            checked={selectedFunctionalities.includes(functionality)}
                            onChange={() => {}}
                            className="mt-1 mr-2"
                          />
                          <label 
                            htmlFor={`func-${functionality}`} 
                            className="cursor-pointer text-[#2d2d2d] font-medium"
                          >
                            {functionality}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Features Selection - Only shown after functionality selection */}
              {selectedFunctionalities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#334155] mb-4">Features</h3>
                  <p className="text-[#2d2d2d] mb-4">Adjust the selected features for each functionality</p>
                  
                  {errors.features && (
                    <p className="text-red-500 text-sm mb-3">{errors.features}</p>
                  )}
                  
                  {selectedFunctionalities.map((functionality) => (
                    <div key={functionality} className="mb-6 p-4 border rounded bg-white">
                      <h4 className="font-medium text-[#1e2556] mb-3">{functionality}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categoryOptions[selectedCategory][functionality].map((feature) => (
                          <div key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`feature-${functionality}-${feature}`}
                              checked={selectedFeatures[functionality]?.[feature]?.selected || false}
                              onChange={() => handleFeatureChange(functionality, feature)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`feature-${functionality}-${feature}`}
                              className="text-sm text-[#2d2d2d]"
                            >
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e2556] text-white py-3 rounded hover:bg-opacity-90 transition-colors"
              >
                {loading ? "Submitting..." : "Submit RFP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfpFormPage;