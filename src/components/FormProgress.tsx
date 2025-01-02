// import React, { useMemo } from 'react';
// // import { ProductInfo } from '../stores/useStore';
// import { ProductInfo } from '@/store/useStore';

// const FormProgress = () => {
//   const store = ProductInfo();
  
//   const calculateProgress = useMemo(() => {
//     const totalFields = 53;
//     let filledFields = 0;
    
//     const fields = {
//       logoUrl: store.logoUrl,
//       logoFile: store.logoFile,
//       logoPreview: store.logoPreview,
//       productName: store.productName,
//       category: store.category,
//       deployment: store.deployment,
//       mobileAvailable: store.mobileAvailable,
//       focusCountries: store.focusCountries,
//       avgTimeAdoption: store.avgTimeAdoption,
//       languages: store.languages,
//       securityCertificate: store.securityCertificate,
//       integrations: store.integrations,
//       adoptionPeriod: store.adoptionPeriod,
//       adoptionPeriodUnit: store.adoptionPeriodUnit,
//       description: store.description,
//       usp: store.usp,
//       upcomingUpdates: store.upcomingUpdates,
//       painPointAddressed: store.painPointAddressed,
//       userCategory: store.userCategory,
//       industry: store.industry,
//       practiceAreas: store.practiceAreas,
//       teamSize: store.teamSize,
//       processLifecycle: store.processLifecycle,
//       features: store.features,
//       freeTrial: store.freeTrial,
//       timePeriod: store.timePeriod,
//       freeVersion: store.freeVersion,
//       pricingModel: store.pricingModel,
//       fixPricing: store.fixPricing,
//       contractPeriod: store.contractPeriod,
//       nameofPlan: store.nameofPlan,
//       validity: store.validity,
//       price: store.price,
//       pricingParams: store.pricingParams,
//       demo: store.demo,
//       support: store.support,
//       training: store.training,
//       storage: store.storage,
//       fileSize: store.fileSize,
//       maintenance: store.maintenance,
//       reqForChange: store.reqForChange,
//       dataMigration: store.dataMigration,
//       trainingReq: store.trainingReq,
//       images: store.images,
//       imagesUrl: store.imagesUrl,
//       attachmentsUrl: store.attachmentsUrl,
//       attachments: store.attachments,
//       videoUrl: store.videoUrl,
//       youtubeUrl: store.youtubeUrl,
//       linkedinUrl: store.linkedinUrl,
//       twitterUrl: store.twitterUrl,
//       instagramUrl: store.instagramUrl,
//       websiteUrl: store.websiteUrl
//     };

//     Object.entries(fields).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== '') {
//         if (Array.isArray(value)) {
//           if (value.length > 0) filledFields++;
//         }
//         else if (typeof value === 'object') {
//           if (Object.keys(value).length > 0) filledFields++;
//         }
//         else if (typeof value === 'boolean') {
//           filledFields++;
//         }
//         else if (value !== '') {
//           filledFields++;
//         }
//       }
//     });

//     return Math.round((filledFields / totalFields) * 100);
//   }, [store]);

//   return (
//     <div className="text-2xl font-bold">
//       {calculateProgress}%
//     </div>
//   );
// };

// export default FormProgress;

import React, { useMemo } from 'react';
import { ProductInfo } from '@/store/useStore';
// import { CircleHalf, CircleCheck, CircleEllipsis } from 'lucide-react';

// const FormProgress = () => {
//   const store = ProductInfo();
  
//   const calculateProgress = useMemo(() => {
//     const totalFields = 53;
//     let filledFields = 0;
    
//     const fields = {
//       logoUrl: store.logoUrl,
//       logoFile: store.logoFile,
//       logoPreview: store.logoPreview,
//       productName: store.productName,
//       category: store.category,
//       deployment: store.deployment,
//       mobileAvailable: store.mobileAvailable,
//       focusCountries: store.focusCountries,
//       avgTimeAdoption: store.avgTimeAdoption,
//       languages: store.languages,
//       securityCertificate: store.securityCertificate,
//       integrations: store.integrations,
//       adoptionPeriod: store.adoptionPeriod,
//       adoptionPeriodUnit: store.adoptionPeriodUnit,
//       description: store.description,
//       usp: store.usp,
//       upcomingUpdates: store.upcomingUpdates,
//       painPointAddressed: store.painPointAddressed,
//       userCategory: store.userCategory,
//       industry: store.industry,
//       practiceAreas: store.practiceAreas,
//       teamSize: store.teamSize,
//       processLifecycle: store.processLifecycle,
//       features: store.features,
//       freeTrial: store.freeTrial,
//       timePeriod: store.timePeriod,
//       freeVersion: store.freeVersion,
//       pricingModel: store.pricingModel,
//       fixPricing: store.fixPricing,
//       contractPeriod: store.contractPeriod,
//       nameofPlan: store.nameofPlan,
//       validity: store.validity,
//       price: store.price,
//       pricingParams: store.pricingParams,
//       demo: store.demo,
//       support: store.support,
//       training: store.training,
//       storage: store.storage,
//       fileSize: store.fileSize,
//       maintenance: store.maintenance,
//       reqForChange: store.reqForChange,
//       dataMigration: store.dataMigration,
//       trainingReq: store.trainingReq,
//       images: store.images,
//       imagesUrl: store.imagesUrl,
//       attachmentsUrl: store.attachmentsUrl,
//       attachments: store.attachments,
//       videoUrl: store.videoUrl,
//       youtubeUrl: store.youtubeUrl,
//       linkedinUrl: store.linkedinUrl,
//       twitterUrl: store.twitterUrl,
//       instagramUrl: store.instagramUrl,
//       websiteUrl: store.websiteUrl
//     };

//     Object.entries(fields).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== '') {
//         if (Array.isArray(value)) {
//           if (value.length > 0) filledFields++;
//         }
//         else if (typeof value === 'object') {
//           if (Object.keys(value).length > 0) filledFields++;
//         }
//         else if (typeof value === 'boolean') {
//           filledFields++;
//         }
//         else if (value !== '') {
//           filledFields++;
//         }
//       }
//     });

//     return Math.round((filledFields / totalFields) * 100);
//   }, [store]);

//   const getProgressStatus = () => {
//     if (calculateProgress === 100) return 'complete';
//     if (calculateProgress > 50) return 'good';
//     if (calculateProgress > 20) return 'progress';
//     return 'start';
//   };

//   const getStatusIcon = () => {
//     switch (getProgressStatus()) {
//       case 'complete':
//         return <CircleCheck className="w-8 h-8 text-green-500" />;
//       case 'good':
//         return <CircleHalf className="w-8 h-8 text-blue-500" />;
//       default:
//         return <CircleEllipsis className="w-8 h-8 text-gray-500" />;
//     }
//   };

//   const getStatusMessage = () => {
//     switch (getProgressStatus()) {
//       case 'complete':
//         return "All fields completed! Ready to submit.";
//       case 'good':
//         return "Good progress! Keep going.";
//       case 'progress':
//         return "You're making progress!";
//       default:
//         return "Let's get started!";
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 flex items-center bg-white rounded-xl shadow-lg p-4 border border-gray-200">
//       <div className="flex flex-col items-end mr-4">
//         <div className="text-sm text-gray-500 mb-1">Form Completion</div>
//         <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           {calculateProgress}%
//         </div>
//         <div className="text-sm font-medium text-gray-600">
//           {Math.round(calculateProgress * 53 / 100)}/53 fields
//         </div>
//         <div className="text-xs text-gray-500 mt-1">
//           {getStatusMessage()}
//         </div>
//       </div>
//       <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg">
//         {getStatusIcon()}
//       </div>
//     </div>
//   );
// };

// export default FormProgress;

import { CheckCircle2, Circle, Timer, Loader2 } from 'lucide-react';

const FormProgress = () => {
  const store = ProductInfo();
  
  const calculateProgress = useMemo(() => {
    const totalFields = 53;
    let filledFields = 0;
    
    const fields = {
      logoUrl: store.logoUrl,
      logoFile: store.logoFile,
      logoPreview: store.logoPreview,
      productName: store.productName,
      category: store.category,
      deployment: store.deployment,
      mobileAvailable: store.mobileAvailable,
      focusCountries: store.focusCountries,
      avgTimeAdoption: store.avgTimeAdoption,
      languages: store.languages,
      securityCertificate: store.securityCertificate,
      integrations: store.integrations,
      adoptionPeriod: store.adoptionPeriod,
      adoptionPeriodUnit: store.adoptionPeriodUnit,
      description: store.description,
      usp: store.usp,
      upcomingUpdates: store.upcomingUpdates,
      painPointAddressed: store.painPointAddressed,
      userCategory: store.userCategory,
      industry: store.industry,
      practiceAreas: store.practiceAreas,
      teamSize: store.teamSize,
      processLifecycle: store.processLifecycle,
      features: store.features,
      freeTrial: store.freeTrial,
      timePeriod: store.timePeriod,
      freeVersion: store.freeVersion,
      pricingModel: store.pricingModel,
      fixPricing: store.fixPricing,
      contractPeriod: store.contractPeriod,
      nameofPlan: store.nameofPlan,
      validity: store.validity,
      price: store.price,
      pricingParams: store.pricingParams,
      demo: store.demo,
      support: store.support,
      training: store.training,
      storage: store.storage,
      fileSize: store.fileSize,
      maintenance: store.maintenance,
      reqForChange: store.reqForChange,
      dataMigration: store.dataMigration,
      trainingReq: store.trainingReq,
      images: store.images,
      imagesUrl: store.imagesUrl,
      attachmentsUrl: store.attachmentsUrl,
      attachments: store.attachments,
      videoUrl: store.videoUrl,
      youtubeUrl: store.youtubeUrl,
      linkedinUrl: store.linkedinUrl,
      twitterUrl: store.twitterUrl,
      instagramUrl: store.instagramUrl,
      websiteUrl: store.websiteUrl
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) filledFields++;
        }
        else if (typeof value === 'object') {
          if (Object.keys(value).length > 0) filledFields++;
        }
        else if (typeof value === 'boolean') {
          filledFields++;
        }
        else if (value !== '') {
          filledFields++;
        }
      }
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [store]);

  const getProgressColor = () => {
    if (calculateProgress === 100) return 'text-green-500';
    if (calculateProgress > 75) return 'text-blue-500';
    if (calculateProgress > 50) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getProgressIcon = () => {
    if (calculateProgress === 100) {
      return <CheckCircle2 className="w-8 h-8 text-green-500" />;
    }
    if (calculateProgress > 75) {
      return <Timer className="w-8 h-8 text-blue-500" />;
    }
    if (calculateProgress > 25) {
      return <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />;
    }
    return <Circle className="w-8 h-8 text-gray-400" />;
  };

  const getMessage = () => {
    if (calculateProgress === 100) return "Perfect! Ready to submit";
    if (calculateProgress > 75) return "Almost there!";
    if (calculateProgress > 50) return "Good progress!";
    if (calculateProgress > 25) return "Keep going!";
    return "Just getting started";
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col items-end mr-6">
        <div className="text-sm font-medium text-gray-500 mb-1">Form Progress</div>
        <div className={`text-4xl font-bold ${getProgressColor()} transition-colors duration-300`}>
          {calculateProgress}%
        </div>
        <div className="text-sm font-medium text-gray-600 mt-1">
          {Math.round(calculateProgress * 53 / 100)}/53 fields
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {getMessage()}
        </div>
      </div>
      <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-lg">
        {getProgressIcon()}
      </div>
    </div>
  );
};

export default FormProgress;