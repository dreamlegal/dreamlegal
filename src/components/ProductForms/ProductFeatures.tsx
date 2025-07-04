

import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';

const categoryOptions = {
  'Legal AI': {
    'Drafting and Document Automation': ['-Template based drafting', '-Precedent based drafting', '-Legal style and consistency check', '-Smart summarization', '-Clause and language optimization'],
    'Data Processing and Manipulation': ['-command-based data extraction', '-OCR and text recognition', '-Data comparison', '-reference-based search', '-Automated redaction'],
    'Contract Specific Capabilities': ['-Contract generation', '-Contract review and assessment', '-Obligation tracking', '-Negotiation intelligence', '-Clause library and standarization'],
    'Compliance and Risk Management': ['-Regulatory monitoring', '-Automated policy drafting', '-Risk scoring and alerts'],
    'Research and Litigation': ['-Case analysis', '-Smart legal research', '-Predictive analysis for outcome', '-Automated e-discovery', '-Argument builder'],
    'Workflow Automation': ['-Task allocation', '-Lifecycle automation'],
  },
  'Contract Lifecycle Management': {
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
 
  'Legal Research': {
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
 
  'E-discovery': {
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
  
};

const commonFeaturesOptions = {
  'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
  'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
  'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
  'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control']
};

const ProductFeatures = () => {
  const { category = [], setFeatures, features = {} } = ProductInfo();
  const [localFeatures, setLocalFeatures] = useState({});

  useEffect(() => {
    // Use default empty arrays for any missing data
    const initialCategoryState = (category || []).reduce((acc, cat) => {
      if (categoryOptions[cat]) {
        acc[cat] = Object.keys(categoryOptions[cat]).reduce((subAcc, subCat) => {
          subAcc[subCat] = Array.isArray(features[cat]?.[subCat]) ? features[cat][subCat] : [];
          return subAcc;
        }, {});
      }
      return acc;
    }, {});

    const initialCommonState = Object.keys(commonFeaturesOptions).reduce((acc, subCat) => {
      acc[subCat] = Array.isArray(features['Common Features']?.[subCat]) ? features['Common Features'][subCat] : [];
      return acc;
    }, {});

    setLocalFeatures({
      ...initialCategoryState,
      'Common Features': initialCommonState
    });
  }, [category, features]);

  const handleChange = (cat, subCat, option, checked) => {
    setLocalFeatures(prevState => {
      // Handle the case where prevState[cat] or prevState[cat][subCat] might be undefined
      const catState = prevState[cat] || {};
      const subCatArray = catState[subCat] || [];
      
      const updatedSubCat = checked
        ? [...subCatArray, option]
        : subCatArray.filter(item => item !== option);

      const newState = {
        ...prevState,
        [cat]: {
          ...catState,
          [subCat]: updatedSubCat
        }
      };
      
      // Save to global store even if selection is empty
      setFeatures(cat, { ...newState[cat] });
      console.log("features", features);
      
      return newState;
    });
  };

  return (
    <div className="space-y-6">
      {/* Render Common Features */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Common Features</h2>
        {Object.keys(commonFeaturesOptions).map(subCat => (
          <div key={subCat} className="mt-6 first:mt-0">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">{subCat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonFeaturesOptions[subCat].map(option => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`Common-${subCat}-${option}`}
                    checked={localFeatures['Common Features']?.[subCat]?.includes(option) || false}
                    onChange={(e) => handleChange('Common Features', subCat, option, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-offset-0 transition duration-150 ease-in-out"
                  />
                  <label htmlFor={`Common-${subCat}-${option}`} className="ml-2 cursor-pointer text-gray-600">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Render Category-Specific Features */}
      {(category || []).map(cat => (
        <div key={cat} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{cat}</h2>
          {Object.keys(categoryOptions[cat] || {}).map(subCat => (
            <div key={subCat} className="mt-6 first:mt-0">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">{subCat}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryOptions[cat][subCat].map(option => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${cat}-${subCat}-${option}`}
                      checked={localFeatures[cat]?.[subCat]?.includes(option) || false}
                      onChange={(e) => handleChange(cat, subCat, option, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-offset-0 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`${cat}-${subCat}-${option}`} className="ml-2 cursor-pointer text-gray-600">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;