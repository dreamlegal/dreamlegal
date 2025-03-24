import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, ExternalLink } from 'lucide-react';

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
  
  // Categories and options from original form
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

  // Function to handle form stage navigation
//   const goToNextStage = () => {
//     if (currentStage < 4) {
//       setCurrentStage(currentStage + 1);
//     }
//   };

  const goToPreviousStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
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
  // Submit form and get results
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
//       setShowResults(true);
      
//       // Move to results stage if not already there
//       if (currentStage !== 4) {
//         setCurrentStage(4);
//       }
//     } catch (err) {
//       console.error('Error during evaluation:', err);
//       setError(err.message || 'Something went wrong during evaluation');
//     } finally {
//       setLoading(false);
//     }
//   };
  // Updated handleSubmit function to automatically trigger results display
const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/evaluate-legal-tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get evaluation results');
      }
      
      const data = await response.json();
      setResults(data);
      
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
  // Then in the same file, update the filteredResults definition:
  
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
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Legal tech software category</h3>
              <div className="grid grid-cols-3 gap-2">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleOptionSelect('category', category.id)}
                    className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center text-center h-16 justify-center ${
                      formData.category === category.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="text-lg mb-1">{category.icon}</div>
                    <div className="font-medium text-xs">{category.name.length > 20 ? `${category.name.substring(0, 18)}...` : category.name}</div>
                  </button>
                ))}
              </div>
              {categories.length > 6 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {categories.slice(6).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleOptionSelect('category', category.id)}
                      className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center text-center h-16 justify-center ${
                        formData.category === category.id
                          ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                      }`}
                    >
                      <div className="text-lg mb-1">{category.icon}</div>
                      <div className="font-medium text-xs">{category.name.length > 20 ? `${category.name.substring(0, 18)}...` : category.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Team type</h3>
              <div className="grid grid-cols-3 gap-2">
                {teamTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleOptionSelect('teamType', type.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.teamType === type.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium text-xs">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Team size</h3>
              <div className="grid grid-cols-3 gap-2">
                {teamSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleOptionSelect('teamSize', size.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.teamSize === size.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium text-xs">{size.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Process stages to cover</h3>
              {formData.category ? (
                <div className="grid grid-cols-2 gap-2">
                  {getProcessStages().map((stage, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect('processStages', stage)}
                      className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                        formData.processStages.includes(stage)
                          ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                      }`}
                    >
                      <div className="font-medium text-xs flex-1">{stage}</div>
                      {formData.processStages.includes(stage) && (
                        <Check className="ml-1 h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-orange-600">Please select a category in Step 1</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Key functionalities</h3>
              {formData.category ? (
                <div className="grid grid-cols-1 gap-2">
                  {getFunctionalities().map((func, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect('keyFunctionalities', func)}
                      className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                        formData.keyFunctionalities.includes(func)
                          ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                      }`}
                    >
                      <div className="font-medium text-xs flex-1">{func}</div>
                      {formData.keyFunctionalities.includes(func) && (
                        <Check className="ml-1 h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-orange-600">Please select a category in Step 1</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Specific features</h3>
              {formData.keyFunctionalities.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {getFeatures().slice(0, 10).map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect('specificFeatures', feature)}
                      className={`p-2 rounded-lg transition-all duration-200 flex items-center ${
                        formData.specificFeatures.includes(feature)
                          ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                      }`}
                    >
                      <div className="font-medium text-xs flex-1">{feature}</div>
                      {formData.specificFeatures.includes(feature) && (
                        <Check className="ml-1 h-3 w-3" />
                      )}
                    </button>
                  ))}
                  {getFeatures().length > 10 && (
                    <p className="text-xs text-gray-500 italic">And {getFeatures().length - 10} more features available...</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-orange-600">Please select key functionalities first</p>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Language requirement</h3>
              <div className="relative">
                <select 
                  className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-300 focus:outline-none appearance-none text-xs"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option value="">Select language</option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Deployment model</h3>
              <div className="grid grid-cols-2 gap-2">
                {deploymentModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleOptionSelect('deploymentModel', model.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.deploymentModel === model.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium text-xs">{model.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Region</h3>
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleOptionSelect('region', region.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.region === region.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium text-xs">{region.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Pricing model</h3>
              <div className="grid grid-cols-2 gap-2">
                {pricingModels.map((pricing) => (
                  <button
                    key={pricing.id}
                    onClick={() => handleOptionSelect('pricingModel', pricing.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.pricingModel === pricing.id
                        ? "bg-blue-600 text-white shadow-sm border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium text-xs">{pricing.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-gray-600">Finding the best matches...</span>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 text-center">
                  <p className="text-xs text-blue-800 font-medium">Found {filteredResults.length} products matching your criteria</p>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 pl-8 rounded-lg border-2 border-gray-200 focus:border-blue-300 focus:outline-none text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                </div>
                
                {paginatedResults.length > 0 ? (
                  <>
                    {paginatedResults.map((product) => (
                      <div 
                        key={product.id} 
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="flex items-center p-2 border-b border-gray-100">
                          <div className={`w-10 h-10 rounded flex items-center justify-center mr-2 ${
                            product.matchScore >= 90 ? 'bg-green-50 text-green-600' :
                            product.matchScore >= 70 ? 'bg-blue-50 text-blue-600' :
                            product.matchScore >= 50 ? 'bg-yellow-50 text-yellow-600' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            <div className="text-xs font-bold">{product.matchScore}%</div>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{product.name}</h3>
                            <div className="flex flex-wrap">
                              {product.category.slice(0, 1).map((cat, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-1 rounded mr-1 mb-1">
                              {cat.length > 15 ? `${cat.substring(0, 13)}...` : cat}
                            </span>
                          ))}
                          {product.category.length > 1 && (
                            <span className="text-xs bg-gray-50 text-gray-500 px-1 rounded">
                              +{product.category.length - 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-xs text-gray-600">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </div>
                    <div className="px-2 pb-2">
                      <div className="flex flex-wrap gap-1">
                        {product.deployement.slice(0, 2).map((deploy, idx) => (
                          <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-1 rounded">
                            {deploy}
                          </span>
                        ))}
                        {product.deployement.length > 2 && (
                          <span className="text-xs bg-gray-50 text-gray-500 px-1 rounded">
                            +{product.deployement.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-1 mt-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className="px-2 py-1 text-xs rounded border border-gray-200 disabled:opacity-50"
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <span className="px-2 py-1 text-xs">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className="px-2 py-1 text-xs rounded border border-gray-200 disabled:opacity-50"
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm">No products found matching your search</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  
  default:
    return null;
}
}

return (
<div className="max-w-xl mx-auto p-2">
  <div className="my-2">
    {/* Progress indicators - Simplified */}
    <div className="relative mb-4">
      {/* Main connector line */}
      <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200"></div>
      
      {/* Progress bar overlay */}
      <div 
        className="absolute top-3 left-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ width: `${((currentStage - 1) / (totalStages - 1)) * 100}%` }}
      ></div>
      
      {/* Stage circles with positioning */}
      <div className="flex justify-between relative">
        {stageLabels.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 text-xs ${
                currentStage === index + 1 
                  ? 'bg-blue-50 border-blue-600 text-blue-600' 
                  : currentStage > index + 1 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {currentStage > index + 1 ? <Check className="h-3 w-3" /> : index + 1}
            </div>
            <span 
              className={`font-medium mt-1 transition-all duration-200 text-xs ${
                currentStage === index + 1 
                  ? 'text-blue-600' 
                  : currentStage > index + 1 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  {/* Form content */}
  <div className="bg-white shadow-sm rounded-lg p-3 mb-3 border border-gray-100">
    {renderStageContent()}
  </div>
  
  {/* Navigation buttons */}
  {/* <div className="flex justify-between">
    <button
      onClick={goToPreviousStage}
      className={`px-3 py-1 rounded-lg flex items-center transition-all duration-200 text-sm ${
        currentStage === 1
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
      }`}
      disabled={currentStage === 1}
    >
      <ArrowLeft className="mr-1 h-3 w-3" />
      Back
    </button>
    
    {currentStage < 4 ? (
      <button
        onClick={goToNextStage}
        disabled={!canProceed()}
        className={`px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm ${
          canProceed()
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
        <ArrowRight className="ml-1 h-3 w-3" />
      </button>
    ) : !results ? (
      <button
        onClick={handleSubmit}
        className="px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm bg-blue-600 text-white hover:bg-blue-700"
      >
        Find Products
        <Search className="ml-1 h-3 w-3" />
      </button>
    ) : (
      <div></div>
    )}
  </div> */}
  {/* Navigation buttons */}
<div className="flex justify-between">
  <button
    onClick={goToPreviousStage}
    className={`px-3 py-1 rounded-lg flex items-center transition-all duration-200 text-sm ${
      currentStage === 1
        ? 'text-gray-300 cursor-not-allowed'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
    }`}
    disabled={currentStage === 1}
  >
    <ArrowLeft className="mr-1 h-3 w-3" />
    Back
  </button>
  
  {currentStage < 4 ? (
    <button
      onClick={goToNextStage}
      disabled={!canProceed()}
      className={`px-4 py-1 rounded-lg flex items-center font-medium transition-all duration-200 text-sm ${
        canProceed()
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
    >
      {currentStage === 3 ? 'Show Results' : 'Next'}
      <ArrowRight className="ml-1 h-3 w-3" />
    </button>
  ) : (
    <div></div>
  )}
</div>
</div>
);
};

export default CompactEvaluationForm;