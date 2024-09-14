import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';

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
  }
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
    <div className="space-y-4">
      {/* Render Common Features */}
      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Common Features</h2>
        {Object.keys(commonFeaturesOptions).map(subCat => (
          <div key={subCat}>
            <h3 className="text-lg font-semibold mt-4">{subCat}</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonFeaturesOptions[subCat].map(option => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`Common-${subCat}-${option}`}
                    checked={localFeatures['Common Features']?.[subCat]?.includes(option) || false}
                    onChange={(e) => handleChange('Common Features', subCat, option, e.target.checked)}
                    className="w-5 h-5 mr-2"
                  />
                  <label htmlFor={`Common-${subCat}-${option}`} className="cursor-pointer">
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
        <div key={cat} className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">{cat}</h2>
          {Object.keys(categoryOptions[cat] || {}).map(subCat => (
            <div key={subCat}>
              <h3 className="text-lg font-semibold mt-4">{subCat}</h3>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions[cat][subCat].map(option => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${cat}-${subCat}-${option}`}
                      checked={localFeatures[cat]?.[subCat]?.includes(option) || false}
                      onChange={(e) => handleChange(cat, subCat, option, e.target.checked)}
                      className="w-5 h-5 mr-2"
                    />
                    <label htmlFor={`${cat}-${subCat}-${option}`} className="cursor-pointer">
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
