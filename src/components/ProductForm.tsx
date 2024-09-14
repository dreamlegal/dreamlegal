// import React, { useState, useEffect } from 'react';
// import { ProductInfo } from '@/store/useStore';
// import ProductInformation from './ProductForms/ProductInformation';
// import ProductOverview from './ProductForms/ProductOverview';
// import { z } from 'zod';
// import { Check, ChevronDown, ChevronUp } from 'lucide-react';
// import ProductSAndS from './ProductForms/ProductSAndS';
// import PricingForm from './ProductForms/PricingFrom';
// import ProductFeatures from './ProductForms/ProductFeatures';
// import ProductCustomerSegment from './ProductForms/ProductCustomerSegment';
// import ProductLifeCycle from './ProductForms/ProductLifeCycle';
// import ProductReference from './ProductForms/ProductReference';
// import ProductPostImplementationService from  './ProductForms/ProductPostImplementationService';
// const ProductFormWithProgress = ({ editing = false }: { editing: boolean }) => {
//   const {
 
//     // information 
//     logo,
//     productName,
//     category,
//     deployment,
//     adoptionPeriod,
//     adoptionPeriodUnit,
//     focusCountries,
//     languages,
//     websiteUrl,
//     securityCertificate,

//     // Overview 
//     description, usp, upcomingUpdates ,
    
//      freeTrial,
//     timePeriod,
//    freeVersion,
//     pricingModel,
//     contractPeriod,
//     nameofPlan,
//     validity,
//     price,
//     pricingParams,

//     // lifecyle 

//     processLifecycle,
//     // SAndS
//     demo,support,training,fileSize,storage,

//     // PostImplementationServides 
//     maintenance,
//     reqForChange,
//     trainingReq,
//     dataMigration,

//     // reference form
//     images,
//     attachments,
//     instagramUrl,
//     videoUrl,
//     linkedinUrl,
//     twitterUrl,
//     youtubeUrl, 
//   } = ProductInfo();

//   const [completedSteps, setCompletedSteps] = useState({
//     productInformation: false,
//     productOverview: false,
  
//     productPostImplementationService:false,
//     productSAndS:false,
//     productReference:false,

//   });


//   const [activeStep, setActiveStep] = useState<number | null>(0);

//   const wordCount = (value: string, maxWords: number): boolean => {
//     return value.split(/\s+/).length <= maxWords;
//   };

//   const productSchema = z.object({
//     productName: z
//       .string()
//       .max(5, "Product name must be 5 characters or less")
//       .min(2, "Product name must be at least 2 characters"),
//     category: z.array(z.string()).min(1, "Please select at least one category"),
//     deployment: z
//       .array(z.string())
//       .min(1, "Please select at least one deployment option"),
    
    
//     focusCountries: z
//       .array(z.string())
//       .max(5, "You can select up to 5 countries")
//       .min(1, "Please select at least one language"),
//     languages: z.array(z.string()).min(1, "Please select at least one language"),
//     securityCertificate: z.string().optional().refine(value => {
//       if (value === undefined || value.trim() === '') return true; // Skip validation for undefined or empty values
//       return wordCount(value, 50); // Ensure this function is correctly defined
//     }, {
//       message: "Max word limit of 50 words exceeded",
//     }),
//     websiteUrl: z.string().url("Invalid Website URL").optional().nullable(),
//     adoptionPeriod: z.number().min(1, "Adoption period must be at least 1"),
//     adoptionPeriodUnit: z.enum(["days", "months", "years"], {
//       invalid_type_error: "Please select a valid period unit",
//     }),
//     logo: z.string().optional()
  
//   });

//   const ProductOverviewSchema = z.object({
//     description: z.string().nonempty().refine(value => wordCount(value, 50)),
//     usp: z.string().nonempty().refine(value => wordCount(value, 50)),
//     upcomingUpdates: z.string().nonempty().refine(value => wordCount(value, 50)),
//   });
//   const ProductSAndSSchema = z.object({
//     demo: z.array(z.string()).min(1, "At least one demo option is required"),
//     support: z.array(z.string()).min(1, "At least one support option is required"),
//     training: z.array(z.string()).min(1, "At least one training option is required"),
//     storage: z.string().nonempty("Storage value is required"),
//     fileSize: z.string().nonempty("File size value is required")
//   });

//   useEffect(() => {
//     const productInformationComplete = productSchema.safeParse({
  
//       productName,
//       category,
//       deployment,
//       adoptionPeriod,
//       adoptionPeriodUnit,
//       focusCountries,
//       languages,
//       websiteUrl,
//       securityCertificate,
//     }).success;

//     const productOverviewComplete = ProductOverviewSchema.safeParse({
//       description, usp, upcomingUpdates
//     }).success;

  

//     const SAndSresult = ProductSAndSSchema.safeParse({
//       demo,
//       support,
//       training,
//       storage,
//       fileSize,
//     }).success;
  

//     const PIServices = maintenance && reqForChange && trainingReq && dataMigration
//     const productReferenceFields =  instagramUrl && videoUrl && linkedinUrl && twitterUrl && youtubeUrl

//     console.log(productReferenceFields)
  


//     setCompletedSteps({
//       productInformation: productInformationComplete,
//       productOverview: productOverviewComplete,
//       productPostImplementationService:PIServices,
//       productSAndS:SAndSresult,
//       productReference: productReferenceFields,
//     });
//   }, [
//     productName,
//     category,
//     deployment,
//     adoptionPeriod,
//     adoptionPeriodUnit,
//     focusCountries,
//     languages,
//     websiteUrl,
//     securityCertificate,
//     description,
//     usp,
//     upcomingUpdates,
   
//     maintenance,
//     reqForChange,
//     trainingReq,
//     dataMigration,

//     demo,
//     support,
//     training,
//     storage,
//     fileSize,

//     youtubeUrl,
//     twitterUrl,
//     instagramUrl,
//     videoUrl,
//     linkedinUrl,
    
//   ]);

//   const steps = [
//     { key: 'productInformation', title: 'Product Information', component: ProductInformation },
//     { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
//     { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
//     { key: 'productLifeCycle', title: 'Product LifeCycle', component: ProductLifeCycle },
//     { key: 'productFeatures', title: 'Features', component:  ProductFeatures },
//     { key: 'productPricing', title: 'Pricing', component: PricingForm },
//     { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
//     { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
//     { key: 'productReference', title: 'Reference', component:  ProductReference },
//   ];

//   const handleStepClick = (index: number) => {
//     setActiveStep(prevStep => prevStep === index ? null : index);
//   };

//   return (
//     <>
       
//    {logo}
//     <div className="relative">
//       <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center">
//         {steps.map((step, index) => (
//           <React.Fragment key={index}>
//             <div 
//               className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
//                 completedSteps[step.key] ? 'bg-green-500 text-white' : 'bg-gray-300'
//               }`}
//               onClick={() => handleStepClick(index)}
//             >
//               {completedSteps[step.key] ? <Check size={16} /> : index + 1}
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`w-1 flex-grow ${
//                 completedSteps[step.key] && completedSteps[steps[index + 1].key] 
//                   ? 'bg-green-500' : 'bg-gray-300'
//               }`} />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//       <div className="pl-20">
//         {steps.map((step, index) => (
//           <div key={index} className="mb-4">
//             <button
//               className={`w-full text-left p-4 font-semibold flex justify-between items-center ${
//                 index === activeStep ? 'bg-blue-100' : 'bg-gray-100'
//               } hover:bg-gray-200 rounded-lg`}
//               onClick={() => handleStepClick(index)}
//             >
//               {step.title}
//               {index === activeStep ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>
//             {index === activeStep && <step.component />}
//           </div>
//         ))}
//       </div>
      
//     </div>




// {freeTrial}
//   {timePeriod}
//  {freeVersion}
//   {pricingModel}
//   {contractPeriod}
//   {nameofPlan}
//   {validity}
//   {price}
//  {pricingParams}
// </>
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
import { ChevronDown, ChevronUp, ArrowRight ,Check} from 'lucide-react';
import { z } from 'zod';

const ProductFormWithProgress = ({ editing = false }: { editing: boolean }) => {
  const {
    logo,
    productName,
    category,
    deployment,
    adoptionPeriod,
    adoptionPeriodUnit,
    focusCountries,
    languages,
    websiteUrl,
    securityCertificate,
    description, usp, upcomingUpdates,
    freeTrial, timePeriod, freeVersion, pricingModel, contractPeriod, nameofPlan, validity, price, pricingParams,
    processLifecycle,
    demo, support, training, fileSize, storage,
    maintenance, reqForChange, trainingReq, dataMigration,
    images, attachments, instagramUrl, videoUrl, linkedinUrl, twitterUrl, youtubeUrl,
    userCategory ,industry, practiceAreas, teamSize
  } = ProductInfo();

  const [completedSteps, setCompletedSteps] = useState({
    productInformation: false,
    productOverview: false,
    productPostImplementationService: false,
    productSAndS: false,
    productReference: false,
    productPricing:false,
    productLifeCycle:false,
    productFeatures:false,
    productCustomerSegments:false,
  });

  const [activeStep, setActiveStep] = useState<number | null>(0);

  const productSchema = z.object({
    productName: z.string().max(5, "Product name must be 5 characters or less").min(2, "Product name must be at least 2 characters"),
    category: z.array(z.string()).min(1, "Please select at least one category"),
    deployment: z.array(z.string()).min(1, "Please select at least one deployment option"),
    focusCountries: z.array(z.string()).max(5, "You can select up to 5 countries").min(1, "Please select at least one language"),
    languages: z.array(z.string()).min(1, "Please select at least one language"),
    securityCertificate: z.string().optional().refine(value => !value || value.split(/\s+/).length <= 50, "Max word limit of 50 words exceeded"),
    websiteUrl: z.string().url("Invalid Website URL").optional().nullable(),
    adoptionPeriod: z.number().min(1, "Adoption period must be at least 1"),
    adoptionPeriodUnit: z.enum(["days", "months", "years"], { invalid_type_error: "Please select a valid period unit" }),
    logo: z.string().optional(),
  });

  const ProductOverviewSchema = z.object({
    description: z.string().nonempty().refine(value => value.split(/\s+/).length <= 50),
    usp: z.string().nonempty().refine(value => value.split(/\s+/).length <= 50),
    upcomingUpdates: z.string().nonempty().refine(value => value.split(/\s+/).length <= 50),
  });

  const ProductSAndSSchema = z.object({
    demo: z.array(z.string()).min(1, "At least one demo option is required"),
    support: z.array(z.string()).min(1, "At least one support option is required"),
    training: z.array(z.string()).min(1, "At least one training option is required"),
    storage: z.string().nonempty("Storage value is required"),
    fileSize: z.string().nonempty("File size value is required")
  });

  useEffect(() => {
    const productInformationComplete = productSchema.safeParse({
      productName, category, deployment, adoptionPeriod, adoptionPeriodUnit, focusCountries, languages, websiteUrl, securityCertificate
    }).success;

    const productOverviewComplete = ProductOverviewSchema.safeParse({
      description, usp, upcomingUpdates
    }).success;

    const SAndSresult = ProductSAndSSchema.safeParse({
      demo, support, training, storage, fileSize,
    }).success;

    const processLifecycleComplete = processLifecycle ;

    const productPricingComplete = freeTrial && timePeriod && freeVersion && pricingModel && contractPeriod   && pricingParams 

    const PIServices = maintenance && reqForChange && trainingReq && dataMigration;
    const productReferenceFields = instagramUrl && videoUrl && linkedinUrl && twitterUrl && youtubeUrl;

    console.log(userCategory, industry, practiceAreas, teamSize);
    const productCustomerSegmentsCompletion = userCategory.length > 0 && industry.length > 0 && practiceAreas.length > 0 && teamSize.length > 0;
   
    
    

    setCompletedSteps({
      productInformation: productInformationComplete,
      productOverview: productOverviewComplete,
      productPostImplementationService: PIServices,
      productSAndS: SAndSresult,
      productReference: productReferenceFields,
       productPricing: productPricingComplete,
       productLifeCycle: processLifecycleComplete,
       productFeatures: true,
       productCustomerSegments:productCustomerSegmentsCompletion,

    });
  }, [
    productName, category, deployment, adoptionPeriod, adoptionPeriodUnit, focusCountries, languages, websiteUrl, securityCertificate,
    description, usp, upcomingUpdates, maintenance, reqForChange, trainingReq, dataMigration,
    demo, support, training, storage, fileSize, youtubeUrl, twitterUrl, instagramUrl, videoUrl, linkedinUrl,
    processLifecycle
  ]);

  const steps = [
    { key: 'productInformation', title: 'Product Information', component: ProductInformation },
    { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
    { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
    { key: 'productLifeCycle', title: 'Product LifeCycle', component: ProductLifeCycle },
    { key: 'productFeatures', title: 'Features', component: ProductFeatures },
    { key: 'productPricing', title: 'Pricing', component: PricingForm },
    { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
    { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
    { key: 'productReference', title: 'Reference', component: ProductReference },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(prevStep => (prevStep === index ? null : index));
  };

  const handleNextStep = () => {
    if (activeStep !== null && activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1); // Just move to the next form without affecting validation or colors
    }
  };

  // form submission 


  const handleSubmit = async () => {
    const userId = localStorage.getItem("vendorId");
    if (!userId) {
        console.log({
          title: "Error",
          description: "Something went wrong. Please login again.",
          variant: "destructive",
        });
    return;
    }
    if (editing === false) {

      try {

        const FormValues = {
          userId: userId,  // From global state
          name: productName,  // Mapped to productName
       
          category: category,  // Mapped from global state
          deployement: deployment,  // Mapped from global state
        
          focusCountries: focusCountries,  // Mapped from global state
          avgTimeAdoption: `${adoptionPeriod} ${adoptionPeriodUnit}`,  // Combine adoptionPeriod and adoptionPeriodUnit
          languages: languages,  // Mapped from global state
          websiteUrl: websiteUrl,  // Mapped from global state
          securityCertificate: securityCertificate,  // Mapped from global state
          description: description,  // Mapped from global state
          usp: usp,  // Mapped from global state
          upcomingUpdates: upcomingUpdates,  // Mapped from global state
          // freeTrial: freeTrial,  // Mapped from global state
          // timePeriod: timePeriod,  // Mapped from global state
          // freeVersion: freeVersion,  // Mapped from global state
          // pricingModel: pricingModel,  // Mapped from global state
          // contractPeriod: contractPeriod,  // Mapped from global state
          // nameofPlan: nameofPlan,  // Mapped from global state
          // validity: validity,  // Mapped from global state
          // price: price,  // Mapped from global state
          // pricingParams: pricingParams,  // Mapped from global state
        
          // demo: demo,  // Mapped from global state
          // support: support,  // Mapped from global state
          // training: training,  // Mapped from global state
          // fileSize: fileSize,  // Mapped from global state
          // storage: storage,  // Mapped from global state
          // maintenance: maintenance,  // Mapped from global state
          // reqForChange: reqForChange,  // Mapped from global state
          // trainingReq: trainingReq,  // Mapped from global state
          // dataMigration: dataMigration,  // Mapped from global state
          // images: images,  // Mapped from global state
          // attachments: attachments,  // Mapped from global state
          // instagramUrl: instagramUrl,  // Mapped from global state
          // videoUrl: videoUrl,  // Mapped from global state
          // linkedinUrl: linkedinUrl,  // Mapped from global state
          // twitterUrl: twitterUrl,  // Mapped from global state
          // youtubeUrl: youtubeUrl,  // Mapped from global state
          // userCategory: userCategory,  // Mapped from global state
          // industry: industry,  // Mapped from global state
          // practiceAreas: practiceAreas,  // Mapped from global state
          // teamSize: teamSize,  // Mapped from global state
          active: "draft",  // Default value
          featured: false  // Default value
          
        };
        console.log("my form ", FormValues);

        const response = await fetch("/api/add-product", {
          method: "POST",
          body: JSON.stringify(FormValues),
          headers: {
            "Content-Type": "application/json",
          },
        });

          const data = await response.json();

          // Handle success
          console.log("Form submitted successfully", data);
          if (data?.success === false) {
            console.log("dataaa => ", data);
            console.log({
              title: "Fail to create product",
              description: "Fail to create product",
              variant: "destructive",
            });
            return;
          } else {
            console.log({
              title: "Form Submitted",
              description: "Thank you for your submission!",
              variant: "success",
            });
          }
      } catch (error) {
        console.error("Error submitting form", error);
        console.log({
          title: "Fail to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
      }
    }

  }
  


  return (
    
    <div className="relative">
     
      {logo}
      <Button    className="mt-4 flex items-center" onClick={handleSubmit}>Submit here </Button>
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                completedSteps[step.key] ? 'bg-green-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleStepClick(index)}
            >
              {completedSteps[step.key] ? <Check size={16} /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-1 flex-grow ${
                completedSteps[step.key] && completedSteps[steps[index + 1].key]
                  ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="pl-20">
        {steps.map((step, index) => (
          <div key={index} className="mb-4">
            <button
              className={`w-full text-left p-4 font-semibold flex justify-between items-center ${
                index === activeStep ? 'bg-blue-100' : 'bg-gray-100'
              } hover:bg-gray-200 rounded-lg`}
              onClick={() => handleStepClick(index)}
            >
              {step.title}
              {index === activeStep ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {index === activeStep && (
              <div className="mt-4">
                <step.component />
                {index < steps.length - 1 && (
                  <Button 
                    className="mt-4 flex items-center"
                    onClick={handleNextStep}

                  >
                    Next <ArrowRight className="ml-2" size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ProductFormWithProgress;
