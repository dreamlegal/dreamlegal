// import React, { useState } from 'react';
// import { X, Check, ArrowLeft, ExternalLink } from 'lucide-react';

// const ProductDetailsView = ({ product, onClose }) => {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   if (!product) return null;
  
//   const getMatchScoreColor = (score) => {
//     if (score >= 90) return 'bg-green-600';
//     if (score >= 70) return 'bg-blue-600';
//     if (score >= 50) return 'bg-yellow-600';
//     return 'bg-gray-600';
//   };
  
//   // Parse teamSize and extract only the values that are true
//   const getTeamSizes = () => {
//     if (!product.teamSize || !product.teamSize.length) return [];
    
//     return product.teamSize
//       .filter(size => size.split('|')[2] === 'true')
//       .map(size => size.split('|')[0]);
//   };
  
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div className="space-y-3">
//             <p className="text-sm text-gray-600">{product.description}</p>
            
//             <div className="grid grid-cols-2 gap-2">
//               <div className="space-y-1">
//                 <h4 className="text-xs font-medium text-gray-500">Categories</h4>
//                 <div className="flex flex-wrap gap-1">
//                   {product.category.map((cat, idx) => (
//                     <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
//                       {cat}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="space-y-1">
//                 <h4 className="text-xs font-medium text-gray-500">Deployment Models</h4>
//                 <div className="flex flex-wrap gap-1">
//                   {product.deployement.map((deploy, idx) => (
//                     <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
//                       {deploy}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-2">
//               <div className="space-y-1">
//                 <h4 className="text-xs font-medium text-gray-500">Languages</h4>
//                 <div className="flex flex-wrap gap-1">
//                   {product.languages.map((lang, idx) => (
//                     <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
//                       {lang}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="space-y-1">
//                 <h4 className="text-xs font-medium text-gray-500">Pricing Models</h4>
//                 <div className="flex flex-wrap gap-1">
//                   {product.pricingModel?.map((pricing, idx) => (
//                     <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
//                       {pricing}
//                     </span>
//                   )) || <span className="text-xs text-gray-500">Not specified</span>}
//                 </div>
//               </div>
//             </div>
            
//             <div className="space-y-1">
//               <h4 className="text-xs font-medium text-gray-500">Team Sizes</h4>
//               <div className="flex flex-wrap gap-1">
//                 {getTeamSizes().length > 0 ? getTeamSizes().map((size, idx) => (
//                   <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
//                     {size}
//                   </span>
//                 )) : <span className="text-xs text-gray-500">All team sizes</span>}
//               </div>
//             </div>
//           </div>
//         );
        
//       case 'features':
//         return (
//           <div className="space-y-3">
//             {product.processLifecycle && Object.keys(product.processLifecycle).length > 0 ? (
//               <div className="space-y-2">
//                 <h4 className="text-xs font-medium text-gray-500">Process Lifecycle</h4>
//                 {Object.entries(product.processLifecycle).map(([category, stages], idx) => (
//                   <div key={idx} className="border border-gray-100 rounded p-2 space-y-1">
//                     <div className="text-xs font-medium">{category}</div>
//                     <div className="flex flex-wrap gap-1">
//                       {stages.map((stage, stageIdx) => (
//                         <span key={stageIdx} className="text-xs bg-blue-50 text-blue-700 px-1 rounded">
//                           {stage}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-3">
//                 <p className="text-xs text-gray-500">No detailed feature information available</p>
//               </div>
//             )}
            
//             {product.features && Object.keys(product.features).length > 0 && (
//               <div className="space-y-2">
//                 <h4 className="text-xs font-medium text-gray-500">Features</h4>
//                 {Object.entries(product.features).map(([category, subcategories], idx) => (
//                   <div key={idx} className="border border-gray-100 rounded p-2 space-y-2">
//                     <div className="text-xs font-semibold">{category}</div>
//                     {Object.entries(subcategories).map(([subcategory, features], subIdx) => (
//                       <div key={subIdx} className="ml-2 space-y-1">
//                         <div className="text-xs font-medium">{subcategory}</div>
//                         <div className="flex flex-wrap gap-1">
//                           {features.slice(0, 5).map((feature, featureIdx) => (
//                             <span key={featureIdx} className="text-xs bg-gray-50 text-gray-700 px-1 rounded">
//                               {feature}
//                             </span>
//                           ))}
//                           {features.length > 5 && (
//                             <span className="text-xs text-gray-500">
//                               +{features.length - 5} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
        
//       case 'compatibility':
//         return (
//           <div className="space-y-3">
//             <div className="bg-gray-50 rounded-lg p-3">
//               <div className="flex items-center mb-2">
//                 <div className={`w-8 h-8 rounded-full ${getMatchScoreColor(product.matchScore)} flex items-center justify-center text-white text-xs font-bold`}>
//                   {product.matchScore}%
//                 </div>
//                 <div className="ml-2">
//                   <div className="text-sm font-medium">Match Score</div>
//                   <div className="text-xs text-gray-500">{product.rawScore} of {product.totalPossible} points</div>
//                 </div>
//               </div>
              
//               <div className="text-xs text-gray-600">
//                 This score indicates how well this product matches your specific requirements.
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <h4 className="text-xs font-medium text-gray-500">Compatibility Details</h4>
              
//               <div className="grid grid-cols-1 gap-2">
//                 <div className="flex items-center border border-gray-100 rounded p-2">
//                   <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
//                     <Check className="h-3 w-3" />
//                   </div>
//                   <div className="text-xs">
//                     <span className="font-medium">Category:</span> {product.category ? 'Match' : 'No match'}
//                   </div>
//                 </div>
                
//                 <div className="flex items-center border border-gray-100 rounded p-2">
//                   <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
//                     <Check className="h-3 w-3" />
//                   </div>
//                   <div className="text-xs">
//                     <span className="font-medium">Deployment:</span> {product.deployement ? 'Match' : 'No match'}
//                   </div>
//                 </div>
                
//                 <div className="flex items-center border border-gray-100 rounded p-2">
//                   <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
//                     <Check className="h-3 w-3" />
//                   </div>
//                   <div className="text-xs">
//                     <span className="font-medium">Language:</span> {product.languages ? 'Match' : 'No match'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
//         <div className="p-3 border-b border-gray-100 flex items-center justify-between">
//           <div className="flex items-center">
//             {product.logoUrl && (
//               <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center mr-2 overflow-hidden">
//                 <img src={product.logoUrl} alt={product.name} className="w-6 h-6 object-contain" />
//               </div>
//             )}
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <div className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getMatchScoreColor(product.matchScore)}`}>
//               {product.matchScore}% Match
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
        
//         <div className="border-b border-gray-100">
//           <div className="flex">
//             <button
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === 'overview' 
//                   ? 'border-blue-600 text-blue-600' 
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//             <button
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === 'features' 
//                   ? 'border-blue-600 text-blue-600' 
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => setActiveTab('features')}
//             >
//               Features
//             </button>
//             <button
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === 'compatibility' 
//                   ? 'border-blue-600 text-blue-600' 
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => setActiveTab('compatibility')}
//             >
//               Compatibility
//             </button>
//           </div>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-3">
//           {renderTabContent()}
//         </div>
        
//         <div className="p-3 border-t border-gray-100 flex justify-between">
//           <button
//             onClick={onClose}
//             className="px-3 py-1 rounded-lg flex items-center text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
//           >
//             <ArrowLeft className="mr-1 h-3 w-3" />
//             Back to results
//           </button>
          
//           <a
//             href={`https://example.com/products/${product.slug}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-3 py-1 rounded-lg flex items-center text-sm bg-blue-600 text-white hover:bg-blue-700"
//           >
//             View website
//             <ExternalLink className="ml-1 h-3 w-3" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsView;


import React, { useState } from 'react';
import { X, Check, ArrowLeft, ExternalLink } from 'lucide-react';

const ProductDetailsView = ({ product, onClose, formData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!product) return null;
  
  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 70) return 'bg-blue-600';
    if (score >= 50) return 'bg-yellow-600';
    return 'bg-gray-600';
  };
  
  // Parse teamSize and extract only the values that are true
  const getTeamSizes = () => {
    if (!product.teamSize || !product.teamSize.length) return [];
    
    return product.teamSize
      .filter(size => size.split('|')[2] === 'true')
      .map(size => size.split('|')[0]);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Categories</h4>
                <div className="flex flex-wrap gap-1">
                  {product.category.map((cat, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Deployment Models</h4>
                <div className="flex flex-wrap gap-1">
                  {product.deployement.map((deploy, idx) => (
                    <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                      {deploy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {product.languages.map((lang, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Pricing Models</h4>
                <div className="flex flex-wrap gap-1">
                  {product.pricingModel?.map((pricing, idx) => (
                    <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      {pricing}
                    </span>
                  )) || <span className="text-xs text-gray-500">Not specified</span>}
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-gray-500">Team Sizes</h4>
              <div className="flex flex-wrap gap-1">
                {getTeamSizes().length > 0 ? getTeamSizes().map((size, idx) => (
                  <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                    {size}
                  </span>
                )) : <span className="text-xs text-gray-500">All team sizes</span>}
              </div>
            </div>
            
            {product.usp && (
              <div className="space-y-1 mt-2 p-2 bg-blue-50 rounded-lg">
                <h4 className="text-xs font-medium text-blue-700">Unique Selling Proposition</h4>
                <p className="text-xs text-gray-700">{product.usp}</p>
              </div>
            )}
            
            {product.focusCountries && product.focusCountries.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Focus Countries</h4>
                <div className="flex flex-wrap gap-1">
                  {product.focusCountries.map((country, idx) => (
                    <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {product.industry && product.industry.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-500">Industries</h4>
                <div className="flex flex-wrap gap-1">
                  {product.industry.map((ind, idx) => {
                    const industryName = ind.split('|')[0];
                    return (
                      <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                        {industryName}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'features':
        return (
          <div className="space-y-3">
            {product.processLifecycle && Object.keys(product.processLifecycle).length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">Process Lifecycle</h4>
                {Object.entries(product.processLifecycle).map(([category, stages], idx) => (
                  <div key={idx} className="border border-gray-100 rounded p-2 space-y-1">
                    <div className="text-xs font-medium">{category}</div>
                    <div className="flex flex-wrap gap-1">
                      {stages.map((stage, stageIdx) => (
                        <span key={stageIdx} className="text-xs bg-blue-50 text-blue-700 px-1 rounded">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-xs text-gray-500">No detailed feature information available</p>
              </div>
            )}
            
            {product.features && Object.keys(product.features).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">Features</h4>
                {Object.entries(product.features).map(([category, subcategories], idx) => (
                  <div key={idx} className="border border-gray-100 rounded p-2 space-y-2">
                    <div className="text-xs font-semibold">{category}</div>
                    {Object.entries(subcategories).map(([subcategory, features], subIdx) => (
                      <div key={subIdx} className="ml-2 space-y-1">
                        <div className="text-xs font-medium">{subcategory}</div>
                        <div className="flex flex-wrap gap-1">
                          {features.map((feature, featureIdx) => (
                            <span key={featureIdx} className="text-xs bg-gray-50 text-gray-700 px-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'compatibility':
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${getMatchScoreColor(product.matchScore)} flex items-center justify-center text-white text-xs font-bold`}>
                  {product.matchScore}%
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">Match Score</div>
                  <div className="text-xs text-gray-500">{product.rawScore} of {product.totalPossible} points</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600">
                This score indicates how well this product matches your specific requirements.
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500">Compatibility Details</h4>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center border border-gray-100 rounded p-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                    product.category.includes(formData?.category) 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.category.includes(formData?.category) 
                      ? <Check className="h-3 w-3" /> 
                      : <X className="h-3 w-3" />}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Category:</span> {product.category.includes(formData?.category) ? 'Match' : 'No match'}
                  </div>
                </div>
                
                <div className="flex items-center border border-gray-100 rounded p-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                    product.deployement.includes(formData?.deploymentModel) 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.deployement.includes(formData?.deploymentModel) 
                      ? <Check className="h-3 w-3" /> 
                      : <X className="h-3 w-3" />}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Deployment:</span> {product.deployement.includes(formData?.deploymentModel) ? 'Match' : 'No match'}
                  </div>
                </div>
                
                <div className="flex items-center border border-gray-100 rounded p-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                    product.languages.some(lang => lang.toLowerCase() === formData?.language)
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.languages.some(lang => lang.toLowerCase() === formData?.language)
                      ? <Check className="h-3 w-3" /> 
                      : <X className="h-3 w-3" />}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Language:</span> {product.languages.some(lang => lang.toLowerCase() === formData?.language) ? 'Match' : 'No match'}
                  </div>
                </div>
                
                <div className="flex items-center border border-gray-100 rounded p-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                    product.pricingModel && product.pricingModel.includes(formData?.pricingModel)
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.pricingModel && product.pricingModel.includes(formData?.pricingModel)
                      ? <Check className="h-3 w-3" /> 
                      : <X className="h-3 w-3" />}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Pricing:</span> {product.pricingModel && product.pricingModel.includes(formData?.pricingModel) ? 'Match' : 'No match'}
                  </div>
                </div>
                
                {formData?.processStages && formData.processStages.length > 0 && product.processLifecycle && (
                  <div className="flex items-start border border-gray-100 rounded p-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-1 ${
                      formData.processStages.some(stage => 
                        Object.values(product.processLifecycle).some(stages => 
                          stages.includes(stage)
                        )
                      )
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                    }`}>
                      {formData.processStages.some(stage => 
                        Object.values(product.processLifecycle).some(stages => 
                          stages.includes(stage)
                        )
                      )
                      ? <Check className="h-3 w-3" /> 
                      : <X className="h-3 w-3" />}
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">Process Stages:</span>
                      <div className="mt-1">
                        {formData.processStages.map((stage, idx) => {
                          const isMatched = Object.values(product.processLifecycle).some(stages => 
                            stages.includes(stage)
                          );
                          return (
                            <div key={idx} className={`text-xs ${isMatched ? 'text-green-600' : 'text-red-600'}`}>
                              {stage}: {isMatched ? 'Supported' : 'Not supported'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            {product.logoUrl && (
              <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center mr-2 overflow-hidden">
                <img src={product.logoUrl} alt={product.name} className="w-6 h-6 object-contain" />
              </div>
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getMatchScoreColor(product.matchScore)}`}>
              {product.matchScore}% Match
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'features' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'compatibility' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('compatibility')}
            >
              Compatibility
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          {renderTabContent()}
        </div>
        
        <div className="p-3 border-t border-gray-100 flex justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg flex items-center text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to results
          </button>
          
          <a
            href={`https://example.com/products/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg flex items-center text-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            View website
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
