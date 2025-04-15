


// import React, { useState, useEffect } from 'react';
// import { ProductInfo } from '@/store/useStore';
// import ProductInformation from './ProductForms/ProductInformation';
// import ProductOverview from './ProductForms/ProductOverview';
// import ProductSAndS from './ProductForms/ProductSAndS';
// import PricingForm from './ProductForms/PricingFrom';
// import ProductFeatures from './ProductForms/ProductFeatures';
// import ProductCustomerSegment from './ProductForms/ProductCustomerSegment';
// import ProductLifeCycle from './ProductForms/ProductLifeCycle';
// import ProductReference from './ProductForms/ProductReference';
// import ProductPostImplementationService from './ProductForms/ProductPostImplementationService';
// import { Button } from "./ui/button";
// import { ChevronDown, ChevronUp, ArrowRight, Check, RefreshCw, Menu, X } from 'lucide-react';
// import CheckUpload from './ProductForms/CheckUpload';
// import 'react-toastify/dist/ReactToastify.css';
// import { useToast } from "./ui/use-toast";
// import { useAuth } from '@/context/authContext';
// import Alert from '@/components/Alert';

// interface ProductFormWithProgressProps {
//   editing: boolean;
//   product?: any; // Adjust the type based on the actual product shape or interface
// }

// const ProductFormWithProgress: React.FC<ProductFormWithProgressProps> = ({ editing, product }) => {
//   // Get product info from store
//   const {
//     logo,
//     logoUrl,
//     mobileAvailable,
//     productName,
//     category,
//     deployment,
//     adoptionPeriod,
//     adoptionPeriodUnit,
//     focusCountries,
//     languages,
//     painPointAddressed,
//     websiteUrl,
//     integrations,
//     securityCertificate,
//     description, 
//     usp, 
//     upcomingUpdates,
//     freeTrial, 
//     timePeriod, 
//     freeVersion, 
//     pricingModel, 
//     contractPeriod, 
//     nameofPlan, 
//     validity, 
//     price, 
//     pricingParams,
//     processLifecycle,
//     demo, 
//     support, 
//     training, 
//     fileSize, 
//     storage,
//     maintenance, 
//     reqForChange, 
//     trainingReq, 
//     dataMigration,
//     images, 
//     attachments, 
//     instagramUrl, 
//     videoUrl, 
//     linkedinUrl, 
//     twitterUrl, 
//     youtubeUrl,
//     userCategory,
//     industry, 
//     practiceAreas, 
//     teamSize,
//     features,
//   } = ProductInfo();

//   const {
//     setProductName,
//     setWebsiteUrl,
//     setAdoptionPeriodUnit,
//     setPainPointAddressed,
//     setLogoUrl,
//     setCategory,
//     setDeployment,
//     fixPricing,
//     setMobileAvailable,
//     setFocusCountries,
//     setAdoptionPeriod,
//     setLanguages,
//     setSecurityCertificate,
//     setIntegrations,
//     setDescription,
//     setUSP,
//     setUpcomingUpdates,
//     setUserCategory,
//     setIndustry,
//     setPracticeAreas,
//     setTeamSize,
//     setProcessLifecycle,
//     setFeatures,
//     setFreeTrial,
//     setTimePeriod,
//     setPricingModel,
//     setContractPeriod,
//     setPricingParams,
//     setFreeVersion,
//     setDemo,
//     setSupport,
//     setTraining,
//     setFileSize,
//     setStorage,
//     setMaintenance,
//     setReqForChange,
//     setDataMigration,
//     setTrainingReq,
//     setImages,
//     setVideoUrl,
//     setYoutubeUrl,
//     setLinkedinUrl,
//     setTwitterUrl,
//     setInstagramUrl,
//     setAttachments,
//     imagesUrl,
//     attachmentsUrl,
//     setValidity,
//     setFixPricing,
//     setPrice,
//     setNameofPlan,
//     setImagesUrl,
//     setAttachmentsUrl,
//   } = ProductInfo();
  
//   const [alert, setAlert] = useState(null);
//   const showAlert = (message, type = 'success') => {
//     setAlert({ message, type });
//     // Auto dismiss after 3 seconds
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000);
//   };
  
//   // Set product info if editing
//   useEffect(() => {
//     if (editing === true && product) {
//       console.log("Setting product info because editing is true");
      
//       setProductName(product.name || '');
//       setPainPointAddressed(product.painPointAddressed || '');
//       setWebsiteUrl(product.websiteUrl || '');
//       setLogoUrl(product.logoUrl || '');
//       setCategory(product.category || []);
//       setDeployment(product.deployement || []);
//       setMobileAvailable(product.mobileAvailable || false);
//       setFocusCountries(product.focusCountries || []);

//       // const [adoptionPeriod, adoptionPeriodUnit] = product.avgTimeAdoption.split(' ');
//       const [adoptionPeriod, adoptionPeriodUnit] = (product.avgTimeAdoption || '0 days').split(' ');
//       setAdoptionPeriod(Number(adoptionPeriod) || 0);
//       setAdoptionPeriodUnit(adoptionPeriodUnit || 'days');

      
//       setLanguages(product.languages || []);
//       setSecurityCertificate(product.securityCertificate || '');
      
//       // Handle integrations - ensure it's always an array
//       setIntegrations(Array.isArray(product.integrations) ? product.integrations : 
//                      (product.integrations ? [product.integrations] : []));
      
//       setDescription(product.description || '');
//       setUSP(product.usp || '');
//       setUpcomingUpdates(product.upcomingUpdates || '');
//       setUserCategory(product.userCategory || []);
//       setIndustry(product.industry || []);
//       setPracticeAreas(product.practiceAreas || []);
//       setTeamSize(product.teamSize || []);
      
//       // Process lifecycle
//       if (product.processLifecycle && typeof product.processLifecycle === 'object') {
//         Object.entries(product.processLifecycle).forEach(([category, values]) => {
//           const valueArray = Array.isArray(values) ? values : [values];
//           setProcessLifecycle(category, valueArray);
//         });
//       }
      
//       // Features
//       if (product.features && typeof product.features === 'object') {
//         Object.entries(product.features).forEach(([category, subCategories]) => {
//           if (typeof subCategories === 'object' && subCategories !== null) {
//             const updatedCategory = Object.entries(subCategories).reduce((acc, [subCategory, values]) => {
//               acc[subCategory] = Array.isArray(values) ? values : [];
//               return acc;
//             }, {});
            
//             setFeatures(category, updatedCategory);
//           }
//         });
//       }
      
//       setFreeTrial(product.freeTrial || false);
//       setTimePeriod(product.timePeriod || '');
//       setPricingModel(product.pricingModel || '');
//       setContractPeriod(product.contractPeriod || '');
      
//       // Handle pricing params
//       const pricingParams = Array.isArray(product.pricingParams) 
//                           ? product.pricingParams.join(', ') 
//                           : product.pricingParams || '';
//       setPricingParams(pricingParams);
      
//       setFreeVersion(product.freeVersion || false);
//       setDemo(product.Demo || []);
//       setSupport(product.support || []);
//       setTraining(product.training || []);
      
//       // Handle file size and storage
//       const fileSize = Array.isArray(product.fileSize) 
//                      ? product.fileSize[0] || '' 
//                      : product.fileSize || '';
//       setFileSize(fileSize);
      
//       const storage = Array.isArray(product.storage) 
//                     ? product.storage[0] || '' 
//                     : product.storage || '';
//       setStorage(storage);
      
//       setMaintenance(product.maintenance || '');
//       setValidity(product.validity || '');
//       setNameofPlan(product.nameofPlan || '');
//       setPrice(product.price || '');
//       setReqForChange(product.reqForChange || '');
//       setDataMigration(product.dataMigration || '');
//       setTrainingReq(product.trainingReq || '');
//       setImagesUrl(product.Images || []);
//       setVideoUrl(product.videoUrl || '');
//       setYoutubeUrl(product.youtubeUrl || '');
//       setLinkedinUrl(product.linkedinUrl || '');
//       setTwitterUrl(product.twitterUrl || '');
//       setInstagramUrl(product.instagramUrl || '');
//       setAttachmentsUrl(product.attachments || []);
//     }
//   }, [editing, product]);
  
//   const [submissionStatus, setSubmissionStatus] = useState("");
//   const { toast } = useToast();
//   const [activeStepIndex, setActiveStepIndex] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState({
//     productInformation: false,
//     productOverview: false,
//     productCustomerSegments: false,
//     productLifeCycle: false,
//     productFeatures: false,
//     productPricing: false,
//     productSAndS: false,
//     productPostImplementationService: false,
//     productReference: false,
//   });
  
//   // Effect to track completed steps
//   useEffect(() => {
//     // Check product information completeness
//     const productInformationComplete = productName && 
//                                      category?.length > 0 && 
//                                      deployment?.length > 0 && 
//                                      adoptionPeriod > 0 && 
//                                      adoptionPeriodUnit && 
//                                      focusCountries?.length > 0 && 
//                                      languages?.length > 0;
    
//     // Check product overview completeness
//     const productOverviewComplete = description && 
//                                    usp && 
//                                    upcomingUpdates && 
//                                    painPointAddressed;
    
//     // Check service and support completeness
//     const SAndSresult = demo?.length > 0 && 
//                        support?.length > 0 && 
//                        training?.length > 0 && 
//                        storage && 
//                        fileSize;
    
//     // Check process lifecycle completeness
//     const processLifecycleComplete = Object.keys(processLifecycle || {}).length > 0;
    
//     // Check pricing completeness
//     const productPricingComplete = freeTrial !== undefined && 
//                                  timePeriod && 
//                                  freeVersion !== undefined && 
//                                  pricingModel && 
//                                  contractPeriod && 
//                                  pricingParams;
    
//     // Check post-implementation services completeness
//     const PIServices = maintenance && 
//                       reqForChange && 
//                       trainingReq && 
//                       dataMigration;
    
//     // Check product reference completeness
//     const productReferenceFields = imagesUrl && imagesUrl.length > 0;
    
//     // Check customer segments completeness
//     const productCustomerSegmentsCompletion = userCategory?.length > 0 && 
//                                             industry?.length > 0 && 
//                                             practiceAreas?.length > 0 && 
//                                             teamSize?.length > 0;
    
//     // Check features completeness
//     const productFeaturesComplete = Object.keys(features || {}).length > 0;
    
//     // Update completed steps state
//     setCompletedSteps({
//       productInformation: productInformationComplete && logoUrl,
//       productOverview: productOverviewComplete,
//       productPostImplementationService: PIServices,
//       productSAndS: SAndSresult,
//       productReference: productReferenceFields,
//       productPricing: productPricingComplete,
//       productLifeCycle: processLifecycleComplete,
//       productFeatures: productFeaturesComplete,
//       productCustomerSegments: productCustomerSegmentsCompletion,
//     });
//   }, [
//     productName, category, deployment, adoptionPeriod, adoptionPeriodUnit, 
//     focusCountries, languages, logoUrl, websiteUrl, securityCertificate,
//     description, usp, upcomingUpdates, painPointAddressed,
//     maintenance, reqForChange, trainingReq, dataMigration,
//     demo, support, training, storage, fileSize,
//     processLifecycle, freeTrial, timePeriod, freeVersion, pricingModel,
//     contractPeriod, pricingParams, imagesUrl, features,
//     userCategory, industry, practiceAreas, teamSize
//   ]);
  
//   const steps = [
//     { key: 'productInformation', title: 'Product Information', component: ProductInformation },
//     { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
//     { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
//     { key: 'productLifeCycle', title: 'Process LifeCycle', component: ProductLifeCycle },
//     { key: 'productFeatures', title: 'Features', component: ProductFeatures },
//     { key: 'productPricing', title: 'Pricing', component: PricingForm },
//     { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
//     { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
//     { key: 'productReference', title: 'Reference', component: ProductReference },
//   ];
  
//   // Handle selecting a step from the sidebar
//   const handleStepSelect = (index) => {
//     setActiveStepIndex(index);
//   };
  
//   // Function to render the active component
//   const renderActiveComponent = () => {
//     const ActiveComponent = steps[activeStepIndex].component;
//     return <ActiveComponent />;
//   };
  
//   const { vendorId, userType } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   // Function to normalize values to array format
//   function normalizeToArray(value) {
//     if (typeof value === 'string') {
//       return [value];
//     } else if (Array.isArray(value)) {
//       return value.flat();
//     }
//     return [];
//   }
  
//   const handleSubmit = async () => {
//     showAlert("Saving Your Information..Have Some Patience Please!", 'success');
//     toast({
//       title: "saving...",
//       description: "Saving Your Information..Have Some Patience Please!",
//       variant: "saving",
//     });
    
//     if (editing === false) {
//       const userId = vendorId;
//       if (!userId) {
//         toast({
//           title: "Error",
//           description: "Something went wrong. Please login again.",
//           variant: "destructive",
//         });
//         return;
//       }
     
//       try {
//         const FormValues = {
//           userId: userId,
//           prname: productName,
//           logoUrl: logoUrl,
//           category: category,
//           deployment: deployment,
//           mobileAccessibility: mobileAvailable,
//           adoptionPeriod: adoptionPeriod,
//           adoptionPeriodUnit: adoptionPeriodUnit,
//           securityCertificate: securityCertificate,
//           focusCountries: focusCountries,
//           languages: languages,
//           description: description,
//           usp: usp,
//           upcomingUpdates: upcomingUpdates,
//           painPointAddressed: painPointAddressed,
//           websiteUrl: websiteUrl,
//           userCategory: userCategory,
//           industry: industry,
//           practiceAreas: practiceAreas,
//           teamSize: teamSize,
//           processLifecycle: processLifecycle,
//           features: features,
//           integrations: integrations,
//           freeTrial: freeTrial,
//           timePeriod: timePeriod,
//           freeVersion: freeVersion,
//           pricingModel: pricingModel,
//           contractPeriod: contractPeriod,
//           nameofPlan: nameofPlan,
//           validity: validity,
//           price: price,
//           pricingParams: [pricingParams],
//           Demo: demo,
//           support: support,
//           training: training,
//           fileSize: [fileSize],
//           storage: [storage],
//           maintenance: maintenance,
//           reqForChange: reqForChange,
//           trainingReq: trainingReq,
//           dataMigration: dataMigration,
//           ImagesUrl: imagesUrl || "image.png",
//           attachmentUrl: attachmentsUrl || "undefined",
//           instagramUrl: instagramUrl,
//           videoUrl: videoUrl,
//           linkedinUrl: linkedinUrl,
//           twitterUrl: twitterUrl,
//           youtubeUrl: youtubeUrl,
//           active: "draft",
//           featured: false
//         };

//         const response = await fetch("/api/add-product", {
//           method: "POST",
//           body: JSON.stringify(FormValues),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();

//         if (data?.success === false) {
//           showAlert("Failed to create product", 'error');
//           toast({
//             title: "Failed to create product",
//             description: "Failed to create product",
//             variant: "destructive",
//           });
//           setSubmissionStatus("error");
//         } else {
//           showAlert("Form Submitted", 'success');
//           toast({
//             title: "Form Submitted",
//             description: "Thank you for your submission!",
//             variant: "success",
//           });
//           setSubmissionStatus("saved");
//         }
//       } catch (error) {
//         console.error("Error submitting form", error);
//         showAlert("Failed to create product", 'error');
//         toast({
//           title: "Failed to submit",
//           description: "Got some internal error",
//           variant: "destructive",
//         });
//         setSubmissionStatus("error");
//       }
//     } else if (editing === true) {
//       const userId = product.userId;
//       const productId = product.id;
     
//       try {
//         const FormValues = {
//           id: productId,
//           userId: userId,
//           prname: productName,
//           logoUrl: logoUrl,
//           category: category,
//           deployment: deployment,
//           mobileAccessibility: mobileAvailable,
//           adoptionPeriod: adoptionPeriod,
//           adoptionPeriodUnit: adoptionPeriodUnit,
//           securityCertificate: securityCertificate,
//           focusCountries: focusCountries,
//           languages: languages,
//           description: description,
//           usp: usp,
//           upcomingUpdates: upcomingUpdates,
//           painPointAddressed: painPointAddressed,
//           websiteUrl: websiteUrl,
//           userCategory: userCategory,
//           industry: industry,
//           practiceAreas: practiceAreas,
//           teamSize: teamSize,
//           processLifecycle: processLifecycle,
//           features: features,
//           integrations: integrations,
//           freeTrial: freeTrial,
//           timePeriod: timePeriod,
//           freeVersion: freeVersion,
//           pricingModel: pricingModel,
//           contractPeriod: contractPeriod,
//           nameofPlan: nameofPlan,
//           validity: validity,
//           price: price,
//           pricingParams: normalizeToArray(pricingParams),
//           Demo: demo,
//           support: support,
//           training: training,
//           fileSize: normalizeToArray(fileSize),
//           storage: normalizeToArray(storage),
//           maintenance: maintenance,
//           reqForChange: reqForChange,
//           trainingReq: trainingReq,
//           dataMigration: dataMigration,
//           ImageUrl: imagesUrl,
//           attachmentUrl: attachmentsUrl,
//           instagramUrl: instagramUrl,
//           videoUrl: videoUrl,
//           linkedinUrl: linkedinUrl,
//           twitterUrl: twitterUrl,
//           youtubeUrl: youtubeUrl,
//           featured: false
//         };

//         const response = await fetch("/api/edit-product", {
//           method: "POST",
//           body: JSON.stringify(FormValues),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();

//         if (data?.success === false) {
//           showAlert("Failed to update product", 'error');
//           toast({
//             title: "Failed to update product",
//             description: "Failed to update product",
//             variant: "destructive",
//           });
//           setSubmissionStatus("Failed");
//         } else {
//           showAlert("Product updated successfully", 'success');
//           toast({
//             title: "Form Submitted",
//             description: "Thank you for your submission!",
//             variant: "success",
//           });
//           setSubmissionStatus("saved");
//         }
//       } catch (error) {
//         console.error("Error submitting form", error);
//         showAlert("Failed to update product", 'error');
//         toast({
//           title: "Failed to submit",
//           description: "Got some internal error",
//           variant: "destructive",
//         });
//         setSubmissionStatus("error");
//       }
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       {alert && (
//         <Alert 
//           message={alert.message} 
//           type={alert.type} 
//           onClose={() => setAlert(null)} 
//         />
//       )}
      
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-800">
//               {editing ? 'Edit Product' : 'Add a New Product'}
//             </h1>
//             <p className="text-sm text-gray-500">Complete all sections</p>
//           </div>
          
//           {/* Mobile menu toggle - only visible on small screens */}
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 text-gray-600 hover:text-gray-900"
//           >
//             {mobileMenuOpen ? 
//               <X className="w-6 h-6" /> : 
//               <Menu className="w-6 h-6" />
//             }
//           </button>
//         </div>
        
//         {/* Content area with sidebar and form */}
//         <div className="md:flex">
//           {/* Left sidebar navigation */}
//           <div 
//             className={`
//               md:w-64 border-r border-gray-200 bg-gray-50
//               ${mobileMenuOpen ? 'block' : 'hidden'} md:block
//             `}
//           >
//             <nav className="py-2">
//               {steps.map((step, index) => (
//                 <button
//                   key={step.key}
//                   onClick={() => {
//                     handleStepSelect(index);
//                     setMobileMenuOpen(false); // Close mobile menu when a step is selected
//                   }}
//                   className={`w-full text-left py-3 px-6 flex items-center gap-3 transition-colors
//                     ${index === activeStepIndex ? 'bg-blue-50 border-l-4 border-blue-500 pl-5' : 'hover:bg-gray-100 border-l-4 border-transparent'}`}
//                 >
//                   <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
//                     ${completedSteps[step.key]
//                       ? 'bg-green-500 text-white'
//                       : index === activeStepIndex 
//                         ? 'bg-blue-500 text-white' 
//                         : 'bg-gray-200 text-gray-700'}`}
//                   >
//                     {completedSteps[step.key] ? <Check className="w-4 h-4" /> : index + 1}
//                   </div>
//                   <span className={`text-sm ${index === activeStepIndex ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
//                     {step.title}
//                   </span>
//                 </button>
//               ))}
//             </nav>
//           </div>
          
//           {/* Right side form content */}
//           <div className="flex-1 p-6">
//             {/* Current step indicator - mobile only */}
//             <div className="flex items-center mb-4 md:hidden">
//               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
//                 ${completedSteps[steps[activeStepIndex].key]
//                   ? 'bg-green-500 text-white'
//                   : 'bg-blue-500 text-white'}`}
//               >
//                 {completedSteps[steps[activeStepIndex].key] ? <Check className="w-4 h-4" /> : activeStepIndex + 1}
//               </div>
//               <span className="ml-2 text-blue-700 font-medium">
//                 Step {activeStepIndex + 1}: {steps[activeStepIndex].title}
//               </span>
//             </div>
            
//             {/* Form title - desktop only */}
//             <h2 className="text-xl font-semibold mb-6 hidden md:block">{steps[activeStepIndex].title}</h2>
            
//             {/* Render the active form component */}
//             {renderActiveComponent()}
            
//             {/* Action buttons */}
//             <div className="mt-8 flex justify-between items-center border-t pt-6">
//               <div className="text-sm text-gray-500">
//                 Step {activeStepIndex + 1} of {steps.length}
//               </div>
              
//               <div className="flex gap-3">
//                 {activeStepIndex > 0 && (
//                   <button
//                     onClick={() => setActiveStepIndex(activeStepIndex - 1)}
//                     className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     Back
//                   </button>
//                 )}
                
//                 {activeStepIndex < steps.length - 1 ? (
//                   <button
//                     onClick={() => setActiveStepIndex(activeStepIndex + 1)}
//                     className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                   >
//                     Continue
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleSubmit}
//                     className="px-5 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
//                   >
//                     {editing ? 'Update' : 'Submit'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFormWithProgress;
import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';
import ProductInformation from './ProductForms/ProductInformation';
import ProductOverview from './ProductForms/ProductOverview';
import ProductSAndS from './ProductForms/ProductSAndS';
import PricingForm from './ProductForms/PricingFrom';
import ProductFeatures from './ProductForms/ProductFeatures';
import ProductCustomerSegment from './ProductForms/ProductCustomerSegment';
import ProductLifeCycle from './ProductForms/ProductLifeCycle';
import ProductReference from './ProductForms/ProductReference';
import ProductPostImplementationService from './ProductForms/ProductPostImplementationService';
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, ArrowRight, Check, RefreshCw, Menu, X } from 'lucide-react';
import CheckUpload from './ProductForms/CheckUpload';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "./ui/use-toast";
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';

interface ProductFormWithProgressProps {
  editing: boolean;
  product?: any; // Adjust the type based on the actual product shape or interface
}

const ProductFormWithProgress: React.FC<ProductFormWithProgressProps> = ({ editing, product }) => {
  // Get product info from store
  const {
    logo,
    logoUrl,
    mobileAvailable,
    productName,
    category,
    deployment,
    adoptionPeriod,
    adoptionPeriodUnit,
    focusCountries,
    languages,
    painPointAddressed,
    websiteUrl,
    integrations,
    securityCertificate,
    description, 
    usp, 
    upcomingUpdates,
    freeTrial, 
    timePeriod, 
    freeVersion, 
    pricingModel, 
    contractPeriod, 
    nameofPlan, 
    validity, 
    price, 
    pricingParams,
    processLifecycle,
    demo, 
    support, 
    training, 
    fileSize, 
    storage,
    maintenance, 
    reqForChange, 
    trainingReq, 
    dataMigration,
    images, 
    attachments, 
    instagramUrl, 
    videoUrl, 
    linkedinUrl, 
    twitterUrl, 
    youtubeUrl,
    userCategory,
    industry, 
    practiceAreas, 
    teamSize,
    features,
  } = ProductInfo();

  const {
    setProductName,
    setWebsiteUrl,
    setAdoptionPeriodUnit,
    setPainPointAddressed,
    setLogoUrl,
    setCategory,
    setDeployment,
    fixPricing,
    setMobileAvailable,
    setFocusCountries,
    setAdoptionPeriod,
    setLanguages,
    setSecurityCertificate,
    setIntegrations,
    setDescription,
    setUSP,
    setUpcomingUpdates,
    setUserCategory,
    setIndustry,
    setPracticeAreas,
    setTeamSize,
    setProcessLifecycle,
    setFeatures,
    setFreeTrial,
    setTimePeriod,
    setPricingModel,
    setContractPeriod,
    setPricingParams,
    setFreeVersion,
    setDemo,
    setSupport,
    setTraining,
    setFileSize,
    setStorage,
    setMaintenance,
    setReqForChange,
    setDataMigration,
    setTrainingReq,
    setImages,
    setVideoUrl,
    setYoutubeUrl,
    setLinkedinUrl,
    setTwitterUrl,
    setInstagramUrl,
    setAttachments,
    imagesUrl,
    attachmentsUrl,
    setValidity,
    setFixPricing,
    setPrice,
    setNameofPlan,
    setImagesUrl,
    setAttachmentsUrl,
  } = ProductInfo();
  
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  
  // Set product info if editing
  useEffect(() => {
    if (editing === true && product) {
      console.log("Setting product info because editing is true");
      
      setProductName(product.name || '');
      setPainPointAddressed(product.painPointAddressed || '');
      setWebsiteUrl(product.websiteUrl || '');
      setLogoUrl(product.logoUrl || '');
      setCategory(product.category || []);
      setDeployment(product.deployement || []);
      setMobileAvailable(product.mobileAvailable || false);
      setFocusCountries(product.focusCountries || []);

      // const [adoptionPeriod, adoptionPeriodUnit] = product.avgTimeAdoption.split(' ');
      const [adoptionPeriod, adoptionPeriodUnit] = (product.avgTimeAdoption || '0 days').split(' ');
      setAdoptionPeriod(Number(adoptionPeriod) || 0);
      setAdoptionPeriodUnit(adoptionPeriodUnit || 'days');

      
      setLanguages(product.languages || []);
      setSecurityCertificate(product.securityCertificate || '');
      
      // Handle integrations - ensure it's always an array
      setIntegrations(Array.isArray(product.integrations) ? product.integrations : 
                     (product.integrations ? [product.integrations] : []));
      
      setDescription(product.description || '');
      setUSP(product.usp || '');
      setUpcomingUpdates(product.upcomingUpdates || '');
      setUserCategory(product.userCategory || []);
      setIndustry(product.industry || []);
      setPracticeAreas(product.practiceAreas || []);
      setTeamSize(product.teamSize || []);
      
      // Process lifecycle
      if (product.processLifecycle && typeof product.processLifecycle === 'object') {
        Object.entries(product.processLifecycle).forEach(([category, values]) => {
          const valueArray = Array.isArray(values) ? values : [values];
          setProcessLifecycle(category, valueArray);
        });
      }
      
      // Features
      if (product.features && typeof product.features === 'object') {
        Object.entries(product.features).forEach(([category, subCategories]) => {
          if (typeof subCategories === 'object' && subCategories !== null) {
            const updatedCategory = Object.entries(subCategories).reduce((acc, [subCategory, values]) => {
              acc[subCategory] = Array.isArray(values) ? values : [];
              return acc;
            }, {});
            
            setFeatures(category, updatedCategory);
          }
        });
      }
      
      setFreeTrial(product.freeTrial || false);
      setTimePeriod(product.timePeriod || '');
      setPricingModel(product.pricingModel || '');
      setContractPeriod(product.contractPeriod || '');
      
      // Handle pricing params
      const pricingParams = Array.isArray(product.pricingParams) 
                          ? product.pricingParams.join(', ') 
                          : product.pricingParams || '';
      setPricingParams(pricingParams);
      
      setFreeVersion(product.freeVersion || false);
      setDemo(product.Demo || []);
      setSupport(product.support || []);
      setTraining(product.training || []);
      
      // Handle file size and storage
      const fileSize = Array.isArray(product.fileSize) 
                     ? product.fileSize[0] || '' 
                     : product.fileSize || '';
      setFileSize(fileSize);
      
      const storage = Array.isArray(product.storage) 
                    ? product.storage[0] || '' 
                    : product.storage || '';
      setStorage(storage);
      
      setMaintenance(product.maintenance || '');
      setValidity(product.validity || '');
      setNameofPlan(product.nameofPlan || '');
      setPrice(product.price || '');
      setReqForChange(product.reqForChange || '');
      setDataMigration(product.dataMigration || '');
      setTrainingReq(product.trainingReq || '');
      setImagesUrl(product.Images || []);
      setVideoUrl(product.videoUrl || '');
      setYoutubeUrl(product.youtubeUrl || '');
      setLinkedinUrl(product.linkedinUrl || '');
      setTwitterUrl(product.twitterUrl || '');
      setInstagramUrl(product.instagramUrl || '');
      setAttachmentsUrl(product.attachments || []);
    }
  }, [editing, product]);
  
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { toast } = useToast();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // Set all steps to always be complete - no validation required
  const [completedSteps, setCompletedSteps] = useState({
    productInformation: false,
    productOverview: false,
    productCustomerSegments: false,
    productLifeCycle: false,
    productFeatures: false,
    productPricing: false,
    productSAndS: false,
    productPostImplementationService: false,
    productReference: false,
  });
  
  const steps = [
    { key: 'productInformation', title: 'Product Information', component: ProductInformation },
    { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
    { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
    { key: 'productLifeCycle', title: 'Process LifeCycle', component: ProductLifeCycle },
    { key: 'productFeatures', title: 'Features', component: ProductFeatures },
    { key: 'productPricing', title: 'Pricing', component: PricingForm },
    { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
    { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
    { key: 'productReference', title: 'Reference', component: ProductReference },
  ];
  
  // Handle selecting a step from the sidebar
  const handleStepSelect = (index) => {
    setActiveStepIndex(index);
  };
  
  // Function to render the active component
  const renderActiveComponent = () => {
    const ActiveComponent = steps[activeStepIndex].component;
    return <ActiveComponent />;
  };
  
  const { vendorId, userType } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Function to normalize values to array format
  function normalizeToArray(value) {
    if (typeof value === 'string') {
      return [value];
    } else if (Array.isArray(value)) {
      return value.flat();
    }
    return [];
  }
  
  const handleSubmit = async () => {
    showAlert("Saving Your Information..Have Some Patience Please!", 'success');
    toast({
      title: "saving...",
      description: "Saving Your Information..Have Some Patience Please!",
      variant: "saving",
    });
    
    if (editing === false) {
      const userId = vendorId;
      console.log(userId)
      try {
        const FormValues = {
          userId: userId,
          prname: productName,
          logoUrl: logoUrl || "placeholder.png",
          category: category || [],
          deployment: deployment || [],
          mobileAccessibility: mobileAvailable || "No",
          adoptionPeriod: adoptionPeriod || 0,
          adoptionPeriodUnit: adoptionPeriodUnit || "days",
          securityCertificate: securityCertificate || "",
          focusCountries: focusCountries || [],
          languages: languages || [],
          description: description || "",
          usp: usp || "",
          upcomingUpdates: upcomingUpdates || "",
          painPointAddressed: painPointAddressed || "",
          websiteUrl: websiteUrl || "",
          userCategory: userCategory || [],
          industry: industry || [],
          practiceAreas: practiceAreas || [],
          teamSize: teamSize || [],
          processLifecycle: processLifecycle || {},
          features: features || {},
          integrations: integrations || [],
          freeTrial: freeTrial || "No",
          timePeriod: timePeriod || "",
          freeVersion: freeVersion || "No",
          pricingModel: pricingModel || [],
          contractPeriod: contractPeriod || "",
          nameofPlan: nameofPlan || [],
          validity: validity || [],
          price: price || [],
          pricingParams: [pricingParams || ""],
          Demo: demo || [],
          support: support || [],
          training: training || [],
          fileSize: [fileSize || ""],
          storage: [storage || ""],
          maintenance: maintenance || "",
          reqForChange: reqForChange || "",
          trainingReq: trainingReq || "",
          dataMigration: dataMigration || "",
          ImagesUrl: imagesUrl || ["image.png"],
          attachmentUrl: attachmentsUrl || [],
          instagramUrl: instagramUrl || "",
          videoUrl: videoUrl || "",
          linkedinUrl: linkedinUrl || "",
          twitterUrl: twitterUrl || "",
          youtubeUrl: youtubeUrl || "",
          active: "draft",
          featured: false
        };

        const response = await fetch("/api/add-product", {
          method: "POST",
          body: JSON.stringify(FormValues),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data?.success === false) {
          showAlert("Failed to create product", 'error');
          toast({
            title: "Failed to create product",
            description: "Failed to create product",
            variant: "destructive",
          });
          setSubmissionStatus("error");
        } else {
          showAlert("Form Submitted", 'success');
          toast({
            title: "Form Submitted",
            description: "Thank you for your submission!",
            variant: "success",
          });
          setSubmissionStatus("saved");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        showAlert("Failed to create product", 'error');
        toast({
          title: "Failed to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
        setSubmissionStatus("error");
      }
    } else if (editing === true) {
      const userId = product.userId;
      const productId = product.id;
     
      try {
        const FormValues = {
          id: productId,
          userId: userId,
          prname: productName || "",
          logoUrl: logoUrl || "",
          category: category || [],
          deployment: deployment || [],
          mobileAccessibility: mobileAvailable || "No",
          adoptionPeriod: adoptionPeriod || 0,
          adoptionPeriodUnit: adoptionPeriodUnit || "days",
          securityCertificate: securityCertificate || "",
          focusCountries: focusCountries || [],
          languages: languages || [],
          description: description || "",
          usp: usp || "",
          upcomingUpdates: upcomingUpdates || "",
          painPointAddressed: painPointAddressed || "",
          websiteUrl: websiteUrl || "",
          userCategory: userCategory || [],
          industry: industry || [],
          practiceAreas: practiceAreas || [],
          teamSize: teamSize || [],
          processLifecycle: processLifecycle || {},
          features: features || {},
          integrations: integrations || [],
          freeTrial: freeTrial || "No",
          timePeriod: timePeriod || "",
          freeVersion: freeVersion || "No",
          pricingModel: pricingModel || [],
          contractPeriod: contractPeriod || "",
          nameofPlan: nameofPlan || [],
          validity: validity || [],
          price: price || [],
          pricingParams: normalizeToArray(pricingParams || ""),
          Demo: demo || [],
          support: support || [],
          training: training || [],
          fileSize: normalizeToArray(fileSize || ""),
          storage: normalizeToArray(storage || ""),
          maintenance: maintenance || "",
          reqForChange: reqForChange || "",
          trainingReq: trainingReq || "",
          dataMigration: dataMigration || "",
          ImageUrl: imagesUrl || ["image.png"],
          attachmentUrl: attachmentsUrl || [],
          instagramUrl: instagramUrl || "",
          videoUrl: videoUrl || "",
          linkedinUrl: linkedinUrl || "",
          twitterUrl: twitterUrl || "",
          youtubeUrl: youtubeUrl || "",
          featured: false
        };

        const response = await fetch("/api/edit-product", {
          method: "POST",
          body: JSON.stringify(FormValues),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data?.success === false) {
          showAlert("Failed to update product", 'error');
          toast({
            title: "Failed to update product",
            description: "Failed to update product",
            variant: "destructive",
          });
          setSubmissionStatus("Failed");
        } else {
          showAlert("Product updated successfully", 'success');
          toast({
            title: "Form Submitted",
            description: "Thank you for your submission!",
            variant: "success",
          });
          setSubmissionStatus("saved");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        showAlert("Failed to update product", 'error');
        toast({
          title: "Failed to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
        setSubmissionStatus("error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {editing ? 'Edit Product' : 'Add a New Product'}
            </h1>
            <p className="text-sm text-gray-500">Complete all sections</p>
          </div>
          
          {/* Mobile menu toggle - only visible on small screens */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? 
              <X className="w-6 h-6" /> : 
              <Menu className="w-6 h-6" />
            }
          </button>
        </div>
        
        {/* Content area with sidebar and form */}
        <div className="md:flex">
          {/* Left sidebar navigation */}
          <div 
            className={`
              md:w-64 border-r border-gray-200 bg-gray-50
              ${mobileMenuOpen ? 'block' : 'hidden'} md:block
            `}
          >
            <nav className="py-2">
              {steps.map((step, index) => (
                <button
                  key={step.key}
                  onClick={() => {
                    handleStepSelect(index);
                    setMobileMenuOpen(false); // Close mobile menu when a step is selected
                  }}
                  className={`w-full text-left py-3 px-6 flex items-center gap-3 transition-colors
                    ${index === activeStepIndex ? 'bg-blue-50 border-l-4 border-blue-500 pl-5' : 'hover:bg-gray-100 border-l-4 border-transparent'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                    ${completedSteps[step.key]
                      ? 'bg-green-500 text-white'
                      : index === activeStepIndex 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700'}`}
                  >
                    {completedSteps[step.key] ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-sm ${index === activeStepIndex ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Right side form content */}
          <div className="flex-1 p-6">
            {/* Current step indicator - mobile only */}
            <div className="flex items-center mb-4 md:hidden">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                ${completedSteps[steps[activeStepIndex].key]
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'}`}
              >
                {completedSteps[steps[activeStepIndex].key] ? <Check className="w-4 h-4" /> : activeStepIndex + 1}
              </div>
              <span className="ml-2 text-blue-700 font-medium">
                Step {activeStepIndex + 1}: {steps[activeStepIndex].title}
              </span>
            </div>
            
            {/* Form title - desktop only */}
            <h2 className="text-xl font-semibold mb-6 hidden md:block">{steps[activeStepIndex].title}</h2>
            
            {/* Render the active form component */}
            {renderActiveComponent()}
            
            {/* Action buttons */}
            <div className="mt-8 flex justify-between items-center border-t pt-6">
              <div className="text-sm text-gray-500">
                Step {activeStepIndex + 1} of {steps.length}
              </div>
              
              <div className="flex gap-3">
                {activeStepIndex > 0 && (
                  <button
                    onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                    className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                
                {activeStepIndex < steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                  >
                    {editing ? 'Update' : 'Submit'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormWithProgress;