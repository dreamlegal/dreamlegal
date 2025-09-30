
// 'use client'
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Check, Loader2, Users } from 'lucide-react';

// const categoryData = [
//   {
//     id: 'CONTRACT-LIFECYCLE-MANAGEMENT',
//     name: 'Contract Lifecycle Management',
//     shortName: 'Contracts',
//   },
//   {
//     id: 'LEGAL-AI',
//     name: 'Legal AI',
//     shortName: 'Legal AI',
//   },
//   {
//     id: 'DOCUMENT-MANAGEMENT-SYSTEM',
//     name: 'Document Management System',
//     shortName: 'Documents',
//   },
//   {
//     id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS',
//     name: 'Litigation Management & Analytics',
//     shortName: 'Litigation',
//   },
//   {
//     id: 'IP-MANAGEMENT',
//     name: 'IP Management',
//     shortName: 'IP Management',
//   },
//   {
//     id: 'LEGAL-RESEARCH',
//     name: 'Legal Research',
//     shortName: 'Research',
//   },
//   {
//     id: 'E-DISCOVERY',
//     name: 'E-Discovery',
//     shortName: 'E-Discovery',
//   }
// ];

// const teamSizeOptions = [
//   { value: 1, label: "1 person" },
//   { value: 20, label: "2-20 people" },
//   { value: 50, label: "21-50 people" },
//   { value: 200, label: "51-200 people" },
//   { value: 500, label: "201-500 people" },
//   { value: 501, label: "500+ people" },
// ];

// const countries = [
//   'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Singapore', 'Netherlands'
// ];

// const currencies = [
//   { code: 'USD', symbol: '$', name: 'US Dollar' },
//   { code: 'EUR', symbol: '€', name: 'Euro' },
//   { code: 'GBP', symbol: '£', name: 'British Pound' },
//   { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
//   { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
//   { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
//   { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
//   { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
// ];

// const RfpFormFlow = ({ userId, onRfpGenerated }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     category: '',
//     coreProblem: '',
//     priority: '',
//     implementationTimeline: '',
//     budgetMin: '',
//     budgetMax: '',
//     currency: 'USD',
//     teamType: '',
//     teamSize: '',
//     vendorCountry: ''
//   });

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const nextStep = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const handleGenerateRfp = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/rfp/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           ...formData
//         })
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         onRfpGenerated(result.rfpId);
//       } else {
//         alert('Error generating RFP: ' + result.message);
//       }
//     } catch (error) {
//       console.error('Error generating RFP:', error);
//       alert('Failed to generate RFP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1: return formData.category;
//       case 2: return formData.coreProblem && formData.priority;
//       case 3: return formData.implementationTimeline && formData.budgetMin && formData.budgetMax && formData.currency;
//       case 4: return formData.teamType && formData.teamSize && formData.vendorCountry;
//       default: return false;
//     }
//   };

//   const totalSteps = 4;
//   const progressPercentage = (currentStep / totalSteps) * 100;
//   const selectedCurrency = currencies.find(c => c.code === formData.currency);

//   return (
//     <div className="min-h-screen bg-gray-50 pt-16"> {/* Changed to min-h-screen for natural height */}
//       {/* Progress Bar */}
//       <div className="w-full bg-gray-200 h-1">
//         <div 
//           className="bg-[#00d4aa] h-1 transition-all duration-300" 
//           style={{ width: `${progressPercentage}%` }}
//         ></div>
//       </div>

//       {/* Main Content Container */}
//       <div className="max-w-4xl mx-auto w-full px-4 py-8">
//         {/* Step Indicator */}
//         <div className="text-center mb-8">
//           <p className="text-sm text-gray-500 mb-2">STEP {currentStep}/{totalSteps}</p>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white min-h-[600px] flex flex-col rounded-lg shadow-sm">
//           {/* Step 1: Category Selection */}
//           {currentStep === 1 && (
//             <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
//               <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
//                 Which category solution are you looking for?
//               </h2>
//               <p className="text-[#334155] text-center mb-12">
//                 Select the legal software category that best fits your needs
//               </p>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
//                 {categoryData.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => updateFormData('category', category.id)}
//                     className={`p-4 rounded-lg border transition-all duration-200 text-center hover:shadow-md ${
//                       formData.category === category.id
//                         ? 'border-[#7cc6ee] bg-blue-50 shadow-md'
//                         : 'border-gray-300 hover:border-[#7cc6ee]'
//                     }`}
//                   >
//                     <h3 className="font-medium text-[#1e2556] text-sm">{category.shortName}</h3>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Step 2: Problem & Priority */}
//           {currentStep === 2 && (
//             <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
//               <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
//                 What's your main challenge?
//               </h2>
//               <p className="text-[#334155] text-center mb-8">
//                 Help us understand your core problem and what matters most to you
//               </p>

//               <div className="max-w-2xl w-full space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-[#1e2556] mb-3">
//                     What is the core problem you are facing?
//                   </label>
//                   <textarea
//                     value={formData.coreProblem}
//                     onChange={(e) => updateFormData('coreProblem', e.target.value)}
//                     placeholder="Describe the main challenge you're trying to solve..."
//                     rows={4}
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#1e2556] mb-4">
//                     What's more important for you?
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {[
//                       'Easy to use / simple setup',
//                       'Advanced features & customization',
//                       'Strong customer support & training',
//                       'Affordable pricing'
//                     ].map((option) => (
//                       <button
//                         key={option}
//                         onClick={() => updateFormData('priority', option)}
//                         className={`p-4 text-center rounded-lg border transition-all duration-200 ${
//                           formData.priority === option
//                             ? 'border-[#7cc6ee] bg-blue-50'
//                             : 'border-gray-300 hover:border-[#7cc6ee]'
//                         }`}
//                       >
//                         <span className="text-[#2d2d2d] text-sm">{option}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Timeline & Budget */}
//           {currentStep === 3 && (
//             <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
//               <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
//                 When would you like to start this project?
//               </h2>
//               <p className="text-[#334155] text-center mb-8">
//                 Let's make sure companies we find are available to work within your time frame
//               </p>

//               <div className="max-w-3xl w-full space-y-6">
//                 <div>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                     {[
//                       'Immediately (0–3 months)',
//                       'Near future (3–6 months)', 
//                       'Exploring (6+ months)'
//                     ].map((option) => (
//                       <button
//                         key={option}
//                         onClick={() => updateFormData('implementationTimeline', option)}
//                         className={`p-4 text-center rounded-lg border transition-all duration-200 ${
//                           formData.implementationTimeline === option
//                             ? 'border-[#7cc6ee] bg-blue-50'
//                             : 'border-gray-300 hover:border-[#7cc6ee]'
//                         }`}
//                       >
//                         <span className="text-[#2d2d2d] text-sm">{option}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#1e2556] mb-4">
//                     What's your budget range for a solution?
//                   </label>
                  
//                   {/* Currency Selection */}
//                   <div className="mb-4">
//                     <label className="block text-xs text-[#334155] mb-2">Currency</label>
//                     <select
//                       value={formData.currency}
//                       onChange={(e) => updateFormData('currency', e.target.value)}
//                       className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                     >
//                       {currencies.map((currency) => (
//                         <option key={currency.code} value={currency.code}>
//                           {currency.symbol} - {currency.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs text-[#334155] mb-2">Minimum Budget</label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#334155]">
//                           {selectedCurrency?.symbol}
//                         </span>
//                         <input
//                           type="number"
//                           value={formData.budgetMin}
//                           onChange={(e) => updateFormData('budgetMin', e.target.value)}
//                           placeholder="0"
//                           className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs text-[#334155] mb-2">Maximum Budget</label>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#334155]">
//                           {selectedCurrency?.symbol}
//                         </span>
//                         <input
//                           type="number"
//                           value={formData.budgetMax}
//                           onChange={(e) => updateFormData('budgetMax', e.target.value)}
//                           placeholder="100,000"
//                           className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Team Details */}
//           {currentStep === 4 && (
//             <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
//               <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
//                 How many employees are in your organization?
//               </h2>
//               <p className="text-[#334155] text-center mb-8">
//                 This helps us recommend providers that understand the unique needs of businesses your size
//               </p>

//               <div className="max-w-4xl w-full space-y-6">
//                 {/* Team Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-[#1e2556] mb-4">
//                     What best describes your team type?
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                     {['Law firm', 'Legal department'].map((option) => (
//                       <button
//                         key={option}
//                         onClick={() => updateFormData('teamType', option)}
//                         className={`p-4 text-center rounded-lg border transition-all duration-200 ${
//                           formData.teamType === option
//                             ? 'border-[#7cc6ee] bg-blue-50'
//                             : 'border-gray-300 hover:border-[#7cc6ee]'
//                         }`}
//                       >
//                         <span className="text-[#2d2d2d] text-sm">{option}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Team Size - styled like the image */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                   {teamSizeOptions.map((option) => (
//                     <button
//                       key={option.value}
//                       onClick={() => updateFormData('teamSize', option.label)}
//                       className={`p-4 text-center rounded-lg border transition-all duration-200 flex items-center justify-center ${
//                         formData.teamSize === option.label
//                           ? 'border-[#7cc6ee] bg-blue-50'
//                           : 'border-gray-300 hover:border-[#7cc6ee]'
//                       }`}
//                     >
//                       <Users className="w-4 h-4 text-[#7cc6ee] mr-2" />
//                       <span className="text-[#2d2d2d] text-sm">{option.label}</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#1e2556] mb-3">
//                     Vendor location preference
//                   </label>
//                   <select
//                     value={formData.vendorCountry}
//                     onChange={(e) => updateFormData('vendorCountry', e.target.value)}
//                     className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                   >
//                     <option value="">Select a country</option>
//                     {countries.map((country) => (
//                       <option key={country} value={country}>{country}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-between items-center py-8">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1}
//             className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//               currentStep === 1
//                 ? 'text-gray-400 cursor-not-allowed'
//                 : 'text-[#334155] hover:text-[#1e2556] hover:bg-gray-50'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back
//           </button>

//           {currentStep < 4 ? (
//             <button
//               onClick={nextStep}
//               disabled={!isStepValid()}
//               className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
//                 isStepValid()
//                   ? 'bg-[#1e2556] text-white hover:bg-opacity-90'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Next
//               <ChevronRight className="w-5 h-5 ml-1" />
//             </button>
//           ) : (
//             <button
//               onClick={handleGenerateRfp}
//               disabled={!isStepValid() || isLoading}
//               className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
//                 isStepValid() && !isLoading
//                   ? 'bg-[#1e2556] text-white hover:bg-opacity-90'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <Check className="w-5 h-5 mr-2" />
//                   Generate
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RfpFormFlow;
'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Loader2, Users, MapPin, Target } from 'lucide-react';

const categoryData = [
  {
    id: 'CONTRACT-LIFECYCLE-MANAGEMENT',
    name: 'Contract Lifecycle Management',
    shortName: 'Contracts',
  },
  {
    id: 'LEGAL-AI',
    name: 'Legal AI',
    shortName: 'Legal AI',
  },
  {
    id: 'DOCUMENT-MANAGEMENT-SYSTEM',
    name: 'Document Management System',
    shortName: 'Documents',
  },
  {
    id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS',
    name: 'Litigation Management & Analytics',
    shortName: 'Litigation',
  },
  {
    id: 'IP-MANAGEMENT',
    name: 'IP Management',
    shortName: 'IP Management',
  },
  {
    id: 'LEGAL-RESEARCH',
    name: 'Legal Research',
    shortName: 'Research',
  },
  {
    id: 'E-DISCOVERY',
    name: 'E-Discovery',
    shortName: 'E-Discovery',
  }
];

const teamSizeOptions = [
  { value: 1, label: "1 person" },
  { value: 20, label: "2-20 people" },
  { value: 50, label: "21-50 people" },
  { value: 200, label: "51-200 people" },
  { value: 500, label: "201-500 people" },
  { value: 501, label: "500+ people" },
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Singapore', 'Netherlands'
];

const RfpFormFlow = ({ userId, onRfpGenerated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    coreProblem: '',
    implementationTimeline: '',
    teamType: '',
    teamSize: '',
    vendorCountry: '',
    priority: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleGenerateRfp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/rfp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        onRfpGenerated(result.rfpId);
      } else {
        alert('Error generating RFP: ' + result.message);
      }
    } catch (error) {
      console.error('Error generating RFP:', error);
      alert('Failed to generate RFP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.category;
      case 2: return formData.coreProblem;
      case 3: return formData.implementationTimeline;
      case 4: return formData.teamType && formData.teamSize;
      case 5: return formData.vendorCountry && formData.priority;
      default: return false;
    }
  };

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-[#00d4aa] h-1 transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {/* Step Indicator */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">STEP {currentStep}/{totalSteps}</p>
        </div>

        {/* Form Content */}
        <div className="bg-white min-h-[600px] flex flex-col rounded-lg shadow-sm">
          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
              <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
                Which category solution are you looking for?
              </h2>
              <p className="text-[#334155] text-center mb-12">
                Select the legal software category that best fits your needs
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
                {categoryData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => updateFormData('category', category.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-center hover:shadow-md ${
                      formData.category === category.id
                        ? 'border-[#7cc6ee] bg-blue-50 shadow-md'
                        : 'border-gray-300 hover:border-[#7cc6ee]'
                    }`}
                  >
                    <h3 className="font-medium text-[#1e2556] text-sm">{category.shortName}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Core Problem */}
          {currentStep === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
              <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
                What's your main challenge?
              </h2>
              <p className="text-[#334155] text-center mb-8">
                Help us understand the core problem you're trying to solve
              </p>

              <div className="max-w-2xl w-full">
                <div>
                  <label className="block text-sm font-medium text-[#1e2556] mb-3">
                    What is the core problem you are facing?
                  </label>
                  <textarea
                    value={formData.coreProblem}
                    onChange={(e) => updateFormData('coreProblem', e.target.value)}
                    placeholder="Describe the main challenge you're trying to solve..."
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {currentStep === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
              <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
                When would you like to start this project?
              </h2>
              <p className="text-[#334155] text-center mb-8">
                Let's make sure companies we find are available to work within your time frame
              </p>

              <div className="max-w-3xl w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    'Immediately (0–3 months)',
                    'Near future (3–6 months)', 
                    'Exploring (6+ months)'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateFormData('implementationTimeline', option)}
                      className={`p-4 text-center rounded-lg border transition-all duration-200 ${
                        formData.implementationTimeline === option
                          ? 'border-[#7cc6ee] bg-blue-50'
                          : 'border-gray-300 hover:border-[#7cc6ee]'
                      }`}
                    >
                      <span className="text-[#2d2d2d] text-sm">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Team Details */}
          {currentStep === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
              <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
                Tell us about your team
              </h2>
              <p className="text-[#334155] text-center mb-8">
                This helps us recommend providers that understand the unique needs of businesses your size
              </p>

              <div className="max-w-4xl w-full space-y-8">
                {/* Team Type */}
                <div>
                  <label className="block text-sm font-medium text-[#1e2556] mb-4">
                    What best describes your team type?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Law firm', 'Legal department'].map((option) => (
                      <button
                        key={option}
                        onClick={() => updateFormData('teamType', option)}
                        className={`p-4 text-center rounded-lg border transition-all duration-200 ${
                          formData.teamType === option
                            ? 'border-[#7cc6ee] bg-blue-50'
                            : 'border-gray-300 hover:border-[#7cc6ee]'
                        }`}
                      >
                        <span className="text-[#2d2d2d] text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-sm font-medium text-[#1e2556] mb-4">
                    How many employees are in your organization?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamSizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('teamSize', option.label)}
                        className={`p-4 text-center rounded-lg border transition-all duration-200 flex items-center justify-center ${
                          formData.teamSize === option.label
                            ? 'border-[#7cc6ee] bg-blue-50'
                            : 'border-gray-300 hover:border-[#7cc6ee]'
                        }`}
                      >
                        <Users className="w-4 h-4 text-[#7cc6ee] mr-2" />
                        <span className="text-[#2d2d2d] text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 5 && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
              <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-4">
                What do you prefer?
              </h2>
              <p className="text-[#334155] text-center mb-8">
                Help us understand your priorities and location preferences
              </p>

              <div className="max-w-3xl w-full space-y-8">
                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-[#1e2556] mb-4">
                    What's more important for you?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Easy to use / simple setup',
                      'Advanced features & customization',
                      'Strong customer support & training',
                      'Affordable pricing'
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => updateFormData('priority', option)}
                        className={`p-4 text-center rounded-lg border transition-all duration-200 ${
                          formData.priority === option
                            ? 'border-[#7cc6ee] bg-blue-50'
                            : 'border-gray-300 hover:border-[#7cc6ee]'
                        }`}
                      >
                        <span className="text-[#2d2d2d] text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Preference */}
                <div>
                  <label className="block text-sm font-medium text-[#1e2556] mb-3">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Vendor location preference
                  </label>
                  <select
                    value={formData.vendorCountry}
                    onChange={(e) => updateFormData('vendorCountry', e.target.value)}
                    className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center py-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#334155] hover:text-[#1e2556] hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                isStepValid()
                  ? 'bg-[#1e2556] text-white hover:bg-opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleGenerateRfp}
              disabled={!isStepValid() || isLoading}
              className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                isStepValid() && !isLoading
                  ? 'bg-[#1e2556] text-white hover:bg-opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Generate
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RfpFormFlow;