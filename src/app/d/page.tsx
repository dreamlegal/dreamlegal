"use client"

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const EvaluationForm = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    // Stage 1
    category: '',
    teamType: '',
    teamSize: '',
    
    // Stage 2
    processStages: [],
    keyFunctionalities: [],
    specificFeatures: [],
    
    // Stage 3
    language: '',
    deploymentModel: '',
    region: '',
    pricingModel: ''
  });

  const totalStages = 4;
  const stageLabels = ["Start", "Features", "Vendor", "Results"];

  const handleOptionSelect = (field, value) => {
    if (Array.isArray(formData[field])) {
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

  const goToNextStage = () => {
    if (currentStage < totalStages) {
      setCurrentStage(currentStage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      window.scrollTo(0, 0);
    }
  };

  // Categories data
//   const categories = [
//     { id: 'document-management', name: 'Document Management', icon: '📄' },
//     { id: 'contract-management', name: 'Contract Management', icon: '📝' },
//     { id: 'e-discovery', name: 'E-Discovery', icon: '🔍' },
//     { id: 'legal-research', name: 'Legal Research', icon: '📚' },
//     { id: 'practice-management', name: 'Practice Management', icon: '⚖️' },
//     { id: 'ip-management', name: 'IP Management', icon: '💡' }
//   ];

//   const teamTypes = [
//     { id: 'in-house', name: 'In-house Legal Team' },
//     { id: 'law-firm', name: 'Law Firm' },
//     { id: 'legal-ops', name: 'Legal Operations' },
//     { id: 'compliance', name: 'Compliance Team' }
//   ];

 // Updated Categories data
 const categories = [
    { id: 'client-relationship', name: 'Client Relationship Management', icon: '👥' },
    { id: 'contract-lifecycle', name: 'Contract Lifecycle Management', icon: '📝' },
    { id: 'e-signature', name: 'E-Signature', icon: '✍️' },
    { id: 'document-management', name: 'Document Management System', icon: '📄' },
    { id: 'e-billing', name: 'E-billing and Invoicing', icon: '💰' },
    { id: 'e-discovery', name: 'E-Discovery', icon: '🔍' },
    { id: 'governance-risk', name: 'Governance Risk & Compliance', icon: '⚖️' },
    { id: 'ip-management', name: 'Intellectual Property Management', icon: '💡' },
    { id: 'legal-research', name: 'Legal Research', icon: '📚' },
    { id: 'workflow-automation', name: 'Legal Workflow Automation', icon: '⚙️' },
    { id: 'litigation-management', name: 'Litigation Management & Analytics', icon: '📊' }
  ];

  // Updated Team Types
  const teamTypes = [
    { id: 'individual', name: 'Individual Practitioner' },
    { id: 'law-firm', name: 'Law Firm' },
    { id: 'government', name: 'Government Departments' },
    { id: 'startup', name: 'Startups' },
    { id: 'enterprise', name: 'Enterprises' },
    { id: 'judiciary', name: 'Judiciary' },
    { id: 'in-house', name: 'In-house Counsel' }
  ];

  const teamSizes = [
    { id: 'solo', name: '1 person' },
    { id: 'small', name: '2-20 people' },
    { id: 'medium', name: '21-50 people' },
    { id: 'large', name: '51-200 people' },
    { id: 'enterprise', name: '201-500 people' },
    { id: 'mega', name: '500+ people' }
  ];

  const processStages = [
    { id: 'intake', name: 'Intake/Request' },
    { id: 'creation', name: 'Document Creation' },
    { id: 'review', name: 'Review Process' },
    { id: 'approval', name: 'Approval Workflow' },
    { id: 'execution', name: 'Execution' },
    { id: 'storage', name: 'Storage/Repository' },
    { id: 'analysis', name: 'Analysis/Reporting' }
  ];

  const keyFunctionalities = [
    { id: 'ai-assist', name: 'AI Assistance' },
    { id: 'templates', name: 'Templates Library' },
    { id: 'collaboration', name: 'Collaboration Tools' },
    { id: 'workflow', name: 'Workflow Automation' },
    { id: 'esignature', name: 'E-Signature' },
    { id: 'analytics', name: 'Analytics & Reporting' },
    { id: 'integration', name: 'Integration Capabilities' }
  ];

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'japanese', name: 'Japanese' }
  ];

  const deploymentModels = [
    { id: 'on-premise', name: 'On premise deployment' },
    { id: 'cloud', name: 'Cloud based deployment' },
    { id: 'hybrid', name: 'Hybrid deployment' },
    { id: 'saas', name: 'Software as a Service' },
    { id: 'mobile', name: 'Mobile accessibility' }
  ];

  const regions = [
    { id: 'emea', name: 'EMEA (Europe, the Middle East and Africa)' },
    { id: 'na', name: 'NA (North America)' },
    { id: 'latam', name: 'LATAM (Latin America)' },
    { id: 'apac', name: 'APAC (Asia-Pacific)' }
  ];

  const pricingModels = [
    { id: 'annual', name: 'Annual Subscription fee' },
    { id: 'monthly', name: 'Monthly subscription fee' },
    { id: 'perpetual', name: 'Perpetual' },
    { id: 'volume', name: 'Volume based' },
    { id: 'onetime', name: 'One time' }
  ];

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

  // Render the appropriate stage content
  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What category of legal tech software are you evaluating?</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleOptionSelect('category', category.id)}
                    className={`p-4 rounded-xl transition-all duration-200 flex flex-col items-center text-center h-32 justify-center ${
                      formData.category === category.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <div className="font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What type of team will use this software?</h3>
              <div className="grid grid-cols-2 gap-5">
                {teamTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleOptionSelect('teamType', type.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.teamType === type.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What is your team's size?</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {teamSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleOptionSelect('teamSize', size.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.teamSize === size.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What stages of the process you want to cover by technology?</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {processStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleOptionSelect('processStages', stage.id)}
                    className={`p-4 rounded-xl transition-all duration-200 flex items-center ${
                      formData.processStages.includes(stage.id)
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium flex-1">{stage.name}</div>
                    {formData.processStages.includes(stage.id) && (
                      <Check className="ml-2 h-5 w-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What key functionalities do you need?</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {keyFunctionalities.map((func) => (
                  <button
                    key={func.id}
                    onClick={() => handleOptionSelect('keyFunctionalities', func.id)}
                    className={`p-4 rounded-xl transition-all duration-200 flex items-center ${
                      formData.keyFunctionalities.includes(func.id)
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium flex-1">{func.name}</div>
                    {formData.keyFunctionalities.includes(func.id) && (
                      <Check className="ml-2 h-5 w-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Are there any specific features you're looking for? (Optional)</h3>
              <textarea
                placeholder="Enter any specific requirements or features"
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-300 focus:outline-none"
                rows={4}
                value={formData.specificFeatures}
                onChange={(e) => setFormData({...formData, specificFeatures: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Is there any specific language requirement?</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleOptionSelect('language', lang.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.language === lang.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{lang.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Is there any specific deployment model preference?</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {deploymentModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleOptionSelect('deploymentModel', model.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.deploymentModel === model.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Which region you are based out of?</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleOptionSelect('region', region.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.region === region.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{region.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Are you particular of any pricing model?</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {pricingModels.map((pricing) => (
                  <button
                    key={pricing.id}
                    onClick={() => handleOptionSelect('pricingModel', pricing.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      formData.pricingModel === pricing.id
                        ? "bg-blue-600 text-white shadow-md border-2 border-blue-600"
                        : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{pricing.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8 py-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border-4 border-blue-100 mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Evaluation Results</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-lg mx-auto">
                Based on your requirements, here are the recommended software solutions
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              
              <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-6 md:w-1/3">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Legal Suite Pro</h4>
                  <p className="text-sm text-gray-500 mb-3">Perfect match for your needs</p>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">98% Match</div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <p className="text-gray-700 mb-4">This solution matches your specific criteria:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
                      <div>
                        <span className="block text-sm font-medium text-gray-800">Category</span>
                        <span className="text-gray-600">{categories.find(c => c.id === formData.category)?.name || 'Not selected'}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
                      <div>
                        <span className="block text-sm font-medium text-gray-800">Team Type</span>
                        <span className="text-gray-600">{teamTypes.find(t => t.id === formData.teamType)?.name || 'Not selected'}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
                      <div>
                        <span className="block text-sm font-medium text-gray-800">Team Size</span>
                        <span className="text-gray-600">{teamSizes.find(s => s.id === formData.teamSize)?.name || 'Not selected'}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">✓</div>
                      <div>
                        <span className="block text-sm font-medium text-gray-800">Language</span>
                        <span className="text-gray-600">{languages.find(l => l.id === formData.language)?.name || 'Not selected'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="my-20">
        {/* Integrated timeline - combining progress bar with steps */}
        <div className="relative">
          {/* Main connector line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
          
          {/* Progress bar overlay */}
          <div 
            className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `calc(${((currentStage - 1) / (totalStages - 1)) * 100}% + ${currentStage === 1 ? 0 : (currentStage === totalStages ? 0 : 5)}px)` }}
          ></div>
          
          {/* Stage circles with positioning */}
          <div className="flex justify-between relative" style={{ padding: '0 10px' }}>
            {/* Stage 1 */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
                  currentStage === 1 
                    ? 'bg-blue-50 border-blue-600 text-blue-600' 
                    : currentStage > 1 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {currentStage > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span 
                className={`font-medium mt-2 transition-all duration-200 ${
                  currentStage === 1 
                    ? 'text-blue-600' 
                    : currentStage > 1 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                }`}
              >
                Start
              </span>
            </div>
            
            {/* Stage 2 */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
                  currentStage === 2 
                    ? 'bg-blue-50 border-blue-600 text-blue-600' 
                    : currentStage > 2 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {currentStage > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span 
                className={`font-medium mt-2 transition-all duration-200 ${
                  currentStage === 2 
                    ? 'text-blue-600' 
                    : currentStage > 2 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                }`}
              >
                Features
              </span>
            </div>
            
            {/* Stage 3 */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
                  currentStage === 3 
                    ? 'bg-blue-50 border-blue-600 text-blue-600' 
                    : currentStage > 3 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {currentStage > 3 ? <Check className="h-5 w-5" /> : '3'}
              </div>
              <span 
                className={`font-medium mt-2 transition-all duration-200 ${
                  currentStage === 3 
                    ? 'text-blue-600' 
                    : currentStage > 3 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                }`}
              >
                Vendor
              </span>
            </div>
            
            {/* Stage 4 */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200 ${
                  currentStage === 4 
                    ? 'bg-blue-50 border-blue-600 text-blue-600' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                4
              </div>
              <span 
                className={`font-medium mt-2 transition-all duration-200 ${
                  currentStage === 4 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}
              >
                Results
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-xl p-8 mb-8 border border-gray-100">
        <div className="max-w-3xl mx-auto">
          {renderStageContent()}
        </div>
      </div>
      
      {/* Navigation buttons */}
      {currentStage < 4 && (
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          <button
            onClick={goToPreviousStage}
            className={`px-6 py-3 rounded-xl flex items-center transition-all duration-200 ${
              currentStage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
            }`}
            disabled={currentStage === 1}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back
          </button>
          
          <button
            onClick={goToNextStage}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-xl flex items-center font-medium transition-all duration-200 ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next step
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
      
      {currentStage === 4 && (
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          <button
            onClick={goToPreviousStage}
            className="px-6 py-3 rounded-xl flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back to edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EvaluationForm;