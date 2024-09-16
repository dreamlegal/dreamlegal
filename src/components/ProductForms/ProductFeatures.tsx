import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';

// const categoryOptions = {
//   'Client Relationship Management': {
//     'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
//     'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
//     'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
//     'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
//     'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
//     'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
//   },
//   'Governance, Risk and Compliance': {
//     'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
//     'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
//     'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
//   }
  
// };
const categoryOptions = {
  'Client Relationship Management': {
    'Intake and Lead Management': ['Tracking and capture', 'Lead assignment', 'Follow Up'],
    'Client Portal': ['Profile Management', 'Appointment Management', 'Task Tracking', 'Client Communication'],
    'Document Management': ['Document creation', 'Document Templatization', 'Version control', 'Granular permissions'],
    'Case Alerts': ['Event based notifications', 'Case schedules updates', 'Document changes alert'],
    'Budget, Expense and Time Tracking': ['Budget Management', 'Time tracking', 'Approval Management'],
    'Client Billing and Invoicing': ['Multiple fee arrangement', 'Invoice creation', 'Automated Invoicing']
  },
  'Governance, Risk and Compliance': {
    'Policy Management': ['Policy creation', 'Centralized repository', 'Version control', 'Policy reviews', 'Policy monitoring'],
    'Issue Management': ['Incident reporting', 'Issue assessment', 'Action tracking', 'Response measuring'],
    'Laws, Compliance and Regulatory Tracking': ['Sectoral relevance', 'Compliance applicability', 'Law and compliance updates']
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
  'E-Signature': {
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
  'E-billing and Invoicing': {
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
  'Legal Workflow Automation': {
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


const commonFeaturesOptions = {
  'Internal Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
  'External Collaboration': ['Messaging and Communication', 'Notification', 'Document sharing', 'Real time Document editing'],
  'Analytics and Reporting': ['Analytics dashboard', 'Report generation', 'Dashboard Customization', 'Report Customization'],
  'Tool Administration and Control': ['Multiple User role', 'Granular Permission', 'Information access control', 'Role based access control']
};

const ProductFeatures = () => {
  const { category, setFeatures, features } = ProductInfo();
  const [localFeatures, setLocalFeatures] = useState({});

  useEffect(() => {
    const initialCategoryState = category.reduce((acc, cat) => {
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
      const updatedSubCat = checked
        ? [...(prevState[cat][subCat] || []), option]
        : (prevState[cat][subCat] || []).filter(item => item !== option);

      const newState = {
        ...prevState,
        [cat]: {
          ...prevState[cat],
          [subCat]: updatedSubCat
        }
      };
      
      setFeatures(cat, { ...newState[cat] });
      console.log("features"  ,features)
      
      return newState;
    });
  };

  return (
    // <div className="space-y-4">
    //   {/* Render Common Features */}
    //   <div className="border p-4 rounded-lg shadow">
    //     <h2 className="text-xl font-bold mb-2">Common Features</h2>
    //     {Object.keys(commonFeaturesOptions).map(subCat => (
    //       <div key={subCat}>
    //         <h3 className="text-lg font-semibold mt-4">{subCat}</h3>
    //         <div className="grid grid-cols-2 gap-2">
    //           {commonFeaturesOptions[subCat].map(option => (
    //             <div key={option} className="flex items-center">
    //               <input
    //                 type="checkbox"
    //                 id={`Common-${subCat}-${option}`}
    //                 checked={localFeatures['Common Features']?.[subCat]?.includes(option) || false}
    //                 onChange={(e) => handleChange('Common Features', subCat, option, e.target.checked)}
    //                 className="w-5 h-5 mr-2"
    //               />
    //               <label htmlFor={`Common-${subCat}-${option}`} className="cursor-pointer">
    //                 {option}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Render Category-Specific Features */}
    //   {category.map(cat => (
    //     <div key={cat} className="border p-4 rounded-lg shadow">
    //       <h2 className="text-xl font-bold mb-2">{cat}</h2>
    //       {Object.keys(categoryOptions[cat] || {}).map(subCat => (
    //         <div key={subCat}>
    //           <h3 className="text-lg font-semibold mt-4">{subCat}</h3>
    //           <div className="grid grid-cols-2 gap-2">
    //             {categoryOptions[cat][subCat].map(option => (
    //               <div key={option} className="flex items-center">
    //                 <input
    //                   type="checkbox"
    //                   id={`${cat}-${subCat}-${option}`}
    //                   checked={localFeatures[cat]?.[subCat]?.includes(option) || false}
    //                   onChange={(e) => handleChange(cat, subCat, option, e.target.checked)}
    //                   className="w-5 h-5 mr-2"
    //                 />
    //                 <label htmlFor={`${cat}-${subCat}-${option}`} className="cursor-pointer">
    //                   {option}
    //                 </label>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
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
      {category.map(cat => (
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
