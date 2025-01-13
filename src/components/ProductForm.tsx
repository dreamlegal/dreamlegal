
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
import { ChevronDown, ChevronUp, ArrowRight ,Check,RefreshCw} from 'lucide-react';
import CheckUpload from './ProductForms/CheckUpload';
import { z } from 'zod';
interface ProductFormWithProgressProps {
  editing: boolean;
  product?: any; // Adjust the type based on the actual product shape or interface
}
import 'react-toastify/dist/ReactToastify.css';

import { useToast } from "./ui/use-toast";
import { useAuth } from '@/context/AuthContext';
// const ProductFormWithProgress = ({ editing = false }: { editing: boolean }) => {
// const ProductFormWithProgress: React.FC<ProductFormWithProgressProps> = ({ editing }) => {
const ProductFormWithProgress: React.FC<ProductFormWithProgressProps> = ({ editing, product }) => {
  
    // Component logic here
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
    
    websiteUrl,integrations,
    securityCertificate,
    description, usp, upcomingUpdates,
    freeTrial, timePeriod, freeVersion, pricingModel, contractPeriod, nameofPlan, validity, price, pricingParams,
    processLifecycle,
    demo, support, training, fileSize, storage,
    maintenance, reqForChange, trainingReq, dataMigration,
    images, attachments, instagramUrl, videoUrl, linkedinUrl, twitterUrl, youtubeUrl,
    userCategory ,industry, practiceAreas, teamSize,features,
  } = ProductInfo();

  const {
    // painPointAddressed,
    // setPainPointAddressed,
    setProductName,
    // setLogo,
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
  setPrice,setNameofPlan,
  
  setImagesUrl,

  // Function to set attachment URLs
  setAttachmentsUrl,
  
  } = ProductInfo();


  useEffect(() => {
    if (editing === true) {
      console.log("Setting product info because editing is true");

      console.log("Product Name:", product.prname);
      setProductName(product.prname);
      
      setPainPointAddressed(product.painPointAddressed);
      setWebsiteUrl(product.websiteUrl)

      console.log("Logo URL:", product.logoUrl);
      setLogoUrl(product.logoUrl);

      console.log("Category:", product.category);
      setCategory(product.category);

      console.log("Deployment:", product.deployment);
      setDeployment(product.deployment);

      console.log("Mobile Available:", product.mobileAccessibility);
      setMobileAvailable(product.mobileAccessibility);

      console.log("Focus Countries:", product.focusCountries);
      setFocusCountries(product.focusCountries);

      console.log("Adoption Period:", product.adoptionPeriod);
      // setAdoptionPeriod(product.adoptionPeriod);
      setAdoptionPeriod(Number(product.adoptionPeriod) || 0);

      setAdoptionPeriodUnit(product.adoptionPeriodUnit)

      console.log("Languages:", product.languages);
      setLanguages(product.languages);

      console.log("Security Certificate:", product.securityCertificate);
      setSecurityCertificate(product.securityCertificate);

      console.log("Integrations:", Array.isArray(product.integrations) ? product.integrations : [product.integrations]);
      setIntegrations(Array.isArray(product.integrations) ? product.integrations : [product.integrations]);

      console.log("Description:", product.description);
      setDescription(product.description);

      console.log("USP:", product.usp);
      setUSP(product.usp);

      console.log("Upcoming Updates:", product.upcomingUpdates);
      setUpcomingUpdates(product.upcomingUpdates);

      console.log("User Category:", product.userCategory);
      setUserCategory(product.userCategory);

      console.log("Industry:", product.industry);
      setIndustry(product.industry);

      console.log("Practice Areas:", product.practiceAreas);
      setPracticeAreas(product.practiceAreas);

      console.log("Team Size:", product.teamSize);
      setTeamSize(product.teamSize);

      console.log("Process Lifecycle:", product.processLifecycle);
      // setProcessLifecycle(product.processLifecycle);
     
      Object.entries(product.processLifecycle).forEach(([category, values]) => {
        // Ensure values is always an array
        const valueArray = Array.isArray(values) ? values : [values];
        setProcessLifecycle(category, valueArray);
      });
      console.log("Process Lifecycle on main page",processLifecycle);


      console.log("Features:", product.features);
      // setFeatures(product.features);
      // Object.entries(product.features).forEach(([category, values]) => {
      //   // Ensure values is always an array
      //   const valueArray = Array.isArray(values) ? values : [values];
      //   setFeatures(category, valueArray);
      // });

      Object.entries(product.features).forEach(([category, subCategories]) => {
        if (typeof subCategories === 'object' && subCategories !== null) {
          const updatedCategory = Object.entries(subCategories).reduce((acc, [subCategory, values]) => {
            acc[subCategory] = Array.isArray(values) ? values : [];
            return acc;
          }, {});
          
          setFeatures(category, updatedCategory);
        }
      });
      console.log("check me: yes",features)

     

      console.log("Free Trial:", product.freeTrial);
      setFreeTrial(product.freeTrial);
      

      console.log("Time Period:", product.timePeriod);
      setTimePeriod(product.timePeriod);

      console.log("Pricing Model:", product.pricingModel);
      setPricingModel(product.pricingModel);

      console.log("Contract Period:", product.contractPeriod);
      setContractPeriod(product.contractPeriod);

      // console.log("Pricing Params:", [product.pricingParams]);
      // setPricingParams([product.pricingParams]);
      const pricingParams = Array.isArray(product.pricingParams) ? product.pricingParams.join(', ') : product.pricingParams;

console.log("Pricing Params:", pricingParams);
setPricingParams(pricingParams);

      console.log("Free Version:", product.freeVersion);
      setFreeVersion(product.freeVersion);

      console.log("Demo:", product.Demo);
      setDemo(product.Demo);

      console.log("Support:", product.support);
      setSupport(product.support);

      console.log("Training:", product.training);
      setTraining(product.training);

      // console.log("File Size:", [product.fileSize]);
      // setFileSize([product.fileSize]);

      // console.log("Storage:", [product.storage]);
      // setStorage([product.storage]);
 

      const fileSize = Array.isArray(product.fileSize) ? product.fileSize[0] || '' : product.fileSize || '';
      const storage = Array.isArray(product.storage) ? product.storage[0] || '' : product.storage || '';
      
console.log("File Size:", fileSize);
setFileSize(fileSize);

console.log("Storage:", storage);
setStorage(storage);

      console.log("Maintenance:", product.maintenance);
      setMaintenance(product.maintenance);
      console.log("name of plans:", product.validity);
      setValidity(product.validity);
      console.log("duration:", product.nameofPlan);
      setNameofPlan(product.nameofPlan);
      console.log("price:", product.price);
      setPrice(product.price);

      // const fixedPricing = product.price !== undefined ? true : false;
      
      // setFixPricing(fixedPricing); 
      
      // const fixedPricing = product.price !== undefined ? true : false;
      // console.log(fixedPricing)
      // setFixPricing(fixedPricing);
      // console.log("fixed pricing",fixPricing)

      console.log("Req For Change:", product.reqForChange);
      setReqForChange(product.reqForChange);

      console.log("Data Migration:", product.dataMigration);
      setDataMigration(product.dataMigration);

      console.log("Training Req:", product.trainingReq);
      setTrainingReq(product.trainingReq);

      console.log("Images:", product.Images);
      setImagesUrl(product.Images);

      console.log("Video URL:", product.videoUrl);
      setVideoUrl(product.videoUrl);

      console.log("Youtube URL:", product.youtubeUrl);
      setYoutubeUrl(product.youtubeUrl);

      console.log("LinkedIn URL:", product.linkedinUrl);
      setLinkedinUrl(product.linkedinUrl);

      console.log("Twitter URL:", product.twitterUrl);
      setTwitterUrl(product.twitterUrl);

      console.log("Instagram URL:", product.instagramUrl);
      setInstagramUrl(product.instagramUrl);

      console.log("Attachments:", product.attachments);
      setAttachmentsUrl(product.attachments);
    }
  }, [editing]);
  
  console.log("check me:",features)


  const [submissionStatus, setSubmissionStatus] = useState("");
  const { toast } = useToast();

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
    painPointAddressed: z.string().nonempty().refine(value => value.split(/\s+/).length <= 50),
    
  });

  const ProductSAndSSchema = z.object({
    demo: z.array(z.string()).min(1, "At least one demo option is required"),
    support: z.array(z.string()).min(1, "At least one support option is required"),
    training: z.array(z.string()).min(1, "At least one training option is required"),
    storage: z.string().nonempty("Storage value is required"),
    fileSize: z.string().nonempty("File size value is required")
  });
  useEffect(() => {
    console.log("Updated processLifecycle:", processLifecycle);
  }, [processLifecycle]);
  useEffect(() => {
    console.log("Updated features:", features);
  }, [features]);
  

  console.log('check', {
    userCategory: userCategory,
    industry:industry,
    practiceAreas:practiceAreas,
    teamSize:teamSize
  });

  console.log(images)
  

  console.log("prodyct oage " , integrations)
  useEffect(() => {
    const productInformationComplete = productSchema.safeParse({
      productName, category, deployment, adoptionPeriod, adoptionPeriodUnit, focusCountries, languages, websiteUrl, securityCertificate
    }).success;

    const productOverviewComplete = ProductOverviewSchema.safeParse({
      description, usp, upcomingUpdates,painPointAddressed
    }).success;

    const SAndSresult = ProductSAndSSchema.safeParse({
      demo, support, training, storage, fileSize,
    }).success;

    const processLifecycleComplete = Object.keys(processLifecycle).length > 0;

    const productPricingComplete = freeTrial && timePeriod && freeVersion && pricingModel && contractPeriod   && pricingParams 

    const PIServices = maintenance && reqForChange && trainingReq && dataMigration;
     const productReferenceFields = imagesUrl && imagesUrl.length > 0

    console.log(userCategory, industry, practiceAreas, teamSize);
    const productCustomerSegmentsCompletion = userCategory.length > 0 && industry.length > 0 && practiceAreas.length > 0 && teamSize.length > 0;

    const productFeaturesComplete=productInformationComplete && productOverviewComplete && productCustomerSegmentsCompletion && processLifecycleComplete && productPricingComplete && SAndSresult && productReferenceFields || Object.keys(features).length > 0;
   
    
    

    setCompletedSteps({
      productInformation: productInformationComplete && logoUrl, 
      productOverview: productOverviewComplete,
      productPostImplementationService: PIServices,
      productSAndS: SAndSresult,
      productReference: productReferenceFields,
       productPricing: productPricingComplete,
       productLifeCycle: processLifecycleComplete,
       productFeatures: productFeaturesComplete,
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
    { key: 'productLifeCycle', title: 'Process LifeCycle', component: ProductLifeCycle },
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

  const { vendorId, userType } = useAuth();
  const handleSubmit = async () => {

    toast({
      title: "saving...",
      description: "Saving Your Information..Have Some Patience Please!",
      variant: "saving",
    });
    // const userId = localStorage.getItem("vendorId");
    // if (!userId) {
    //     console.log({
    //       title: "Error",
    //       description: "Something went wrong. Please login again.",
    //       variant: "destructive",
    //     });
    // return;
    // }
    function normalizeToArray(value:any) {
      if (typeof value === 'string') {
        // Convert a string to an array with the string as the only element
        return [value];
      } else if (Array.isArray(value)) {
        // Flatten a nested array to a single-level array
        return value.flat();
      }
      // Return an empty array if the value is neither a string nor an array
      return [];
    }
    if (editing === false) {
      // const wordsArray = pricingParams.split(/\s+/)
      // const userId = localStorage.getItem("vendorId");
     
    const userId= vendorId
      if (!userId) {
          console.log({
            title: "Error",
            description: "Something went wrong. Please login again.",
            variant: "destructive",
          });
      return;
      }
     
      try {

        const FormValues = {
          userId: userId,  // From global state
          prname: productName,  // Mapped to productName
          logoUrl : logoUrl ,
          category: category,  // Mapped from global state
          deployment: deployment,  // Mapped from global state
          mobileAccessibility:mobileAvailable,
          adoptionPeriod:adoptionPeriod,
          adoptionPeriodUnit:adoptionPeriodUnit,
          securityCertificate: securityCertificate,
          focusCountries: focusCountries,  // Mapped from global state
          
          languages: languages,  // Mapped from global state
          // websiteUrl: websiteUrl,  // Mapped from global state
           

          description: description,
          usp: usp,  // Mapped from global state
          upcomingUpdates: upcomingUpdates,
          painPointAddressed: painPointAddressed,
          websiteUrl:websiteUrl,
    
           // Mapped from global state

          userCategory: userCategory,  // Mapped from global state
          industry: industry,  // Mapped from global state
          practiceAreas: practiceAreas,  // Mapped from global state
          teamSize: teamSize,  // Mapped from global state


          processLifecycle:processLifecycle, 
          features:features,
          integrations:integrations,

        
          freeTrial: freeTrial,  // Mapped from global state

          timePeriod: timePeriod,  // Mapped from global state
          freeVersion: freeVersion,  // Mapped from global state
          pricingModel: pricingModel,  // Mapped from global state
          contractPeriod: contractPeriod,  // Mapped from global state
          nameofPlan: nameofPlan,  // Mapped from global state
          validity: validity,  // Mapped from global state
          price: price,  // Mapped from global state
          
          pricingParams: [pricingParams],  // Mapped from global state
        
          Demo: demo,  // Mapped from global state
          support: support,  // Mapped from global state
          training: training,  // Mapped from global state
          fileSize: [fileSize],  // Mapped from global state
          storage: [storage],  // Mapped from global state

          maintenance: maintenance,  // Mapped from global state
          reqForChange: reqForChange,  // Mapped from global state
          trainingReq: trainingReq,  // Mapped from global state
          dataMigration: dataMigration,  // Mapped from global state

          ImagesUrl: imagesUrl || "image.png",  // Mapped from global state
          attachmentUrl: attachmentsUrl || "undefined",  // Mapped from global state
          instagramUrl: instagramUrl,  // Mapped from global state
          videoUrl: videoUrl,  // Mapped from global state
          linkedinUrl: linkedinUrl,  // Mapped from global state
          twitterUrl: twitterUrl,  // Mapped from global state
          youtubeUrl: youtubeUrl,  // Mapped from global state

        
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
            toast({
              title: "Fail to create product",
              description: "Fail to create product",
              variant: "destructive",
            });
            setSubmissionStatus("error"); // Set status to "error" if submission fails
            return;
          } else {
            console.log({
              title: "Form Submitted",
              description: "Thank you for your submission!",
              variant: "success",
            });
            toast({
              title: "Form Submitted",
              description: "Thank you for your submission!",
              variant: "success",
            });
            setSubmissionStatus("saved"); 
          }
      } catch (error) {
        console.error("Error submitting form", error);
        console.log({
          title: "Fail to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
        toast({
          title: "Fail to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
        setSubmissionStatus("error");
      }
    }
    if (editing === true) {
      // const wordsArray = pricingParams.split(/\s+/
      const userId = product.userId;
      const productId = product.id;
     
     
      try {

        const FormValues = {

          id: productId,
          userId: userId,  // From global state
          prname: productName,  // Mapped to productName
          logoUrl :logoUrl,
          category: category,  // Mapped from global state
          deployment: deployment,  // Mapped from global state
          mobileAccessibility:mobileAvailable,
          adoptionPeriod:adoptionPeriod,
          adoptionPeriodUnit:adoptionPeriodUnit,
          securityCertificate: securityCertificate,
          focusCountries: focusCountries,  // Mapped from global state
          
          languages: languages,  // Mapped from global state
          // websiteUrl: websiteUrl,  // Mapped from global state
           

          description: description,
          usp: usp,  // Mapped from global state
          upcomingUpdates: upcomingUpdates,  // Mapped from global state
          painPointAddressed: painPointAddressed,
          websiteUrl:websiteUrl,

          userCategory: userCategory,  // Mapped from global state
          industry: industry,  // Mapped from global state
          practiceAreas: practiceAreas,  // Mapped from global state
          teamSize: teamSize,  // Mapped from global state


          processLifecycle:processLifecycle, 
          features:features,
          integrations:integrations,

        
          freeTrial: freeTrial,  // Mapped from global state

          timePeriod: timePeriod,  // Mapped from global state
          freeVersion: freeVersion,  // Mapped from global state
          pricingModel: pricingModel,  // Mapped from global state
          contractPeriod: contractPeriod,  // Mapped from global state
          nameofPlan: nameofPlan,  // Mapped from global state
          validity: validity,  // Mapped from global state
          price: price,  // Mapped from global state
          
          pricingParams: normalizeToArray(pricingParams),  // Mapped from global state
        
          Demo: demo,  // Mapped from global state
          support: support,  // Mapped from global state
          training: training,  // Mapped from global state
          fileSize:normalizeToArray(fileSize),  // Mapped from global state
          storage:normalizeToArray(storage),  // Mapped from global state

          maintenance: maintenance,  // Mapped from global state
          reqForChange: reqForChange,  // Mapped from global state
          trainingReq: trainingReq,  // Mapped from global state
          dataMigration: dataMigration,  // Mapped from global state

          ImageUrl: imagesUrl,  // Mapped from global state
          attachmentUrl: attachmentsUrl,  // Mapped from global state
          instagramUrl: instagramUrl,  // Mapped from global state
          videoUrl: videoUrl,  // Mapped from global state
          linkedinUrl: linkedinUrl,  // Mapped from global state
          twitterUrl: twitterUrl,  // Mapped from global state
          youtubeUrl: youtubeUrl,  // Mapped from global state

        
          // active: "active",  // Default value
          featured: false  // Default value
          
        };


        console.log("my form ", FormValues);

      //   const response = await fetch("/api/edit-product", {
      //     method: "POST",
      //     body: JSON.stringify(FormValues),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //     const data = await response.json();

      //     // Handle success
      //     console.log("Form edited successfully", data);
      //     if (data?.success === false) {
      //       console.log("dataaa => ", data);
      //       console.log({
      //         title: "Fail to edit product",
      //         description: "Fail to edit product",
      //         variant: "destructive",
      //       });
      //       return;
      //     } else {
      //       console.log({
      //         title: "Form edited",
      //         description: "Thank you for your updation!",
      //         variant: "success",
      //       });
      //     }
      // } catch (error) {
      //   console.error("Error editing form", error);
      //   console.log({
      //     title: "Fail to edit",
      //     description: "Got some internal error",
      //     variant: "destructive",
      //   });
      // }

      const response = await fetch("/api/edit-product", {
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
        console.log({
          title: "Fail to create product",
          description: "Fail to create product",
          variant: "destructive",
        });
        toast({
          title: "Fail to create product",
          description: "Fail to create product",
          variant: "destructive",
        });
        setSubmissionStatus("Failed");
        return;
      } else {
        console.log({
          title: "Form Submitted",
          description: "Thank you for your submission!",
          variant: "success",
        });
        toast({
          title: "Form Submitted",
          description: "Thank you for your submission!",
          variant: "success",
        });
        setSubmissionStatus("saved");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      console.log({
        title: "Fail to submit",
        description: "Got some internal error",
        variant: "destructive",
      });
      toast({
        title: "Fail to submit",
        description: "Got some internal error",
        variant: "destructive",
      });
      setSubmissionStatus("error");
    }
    }

  

  }
  


  return (
    
    // <div className="relative">
     
     
     
    //   <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-16 flex-col items-center">
    //     {steps.map((step, index) => (
    //       <React.Fragment key={index}>
    //         <div 
    //           className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
    //             completedSteps[step.key] ? 'bg-green-500 text-white' : 'bg-gray-300'
    //           }`}
    //           onClick={() => handleStepClick(index)}
    //         >
    //           {completedSteps[step.key] ? <Check size={16} /> : index + 1}
    //         </div>
    //         {index < steps.length - 1 && (
    //           <div className={`w-1 flex-grow ${
    //             completedSteps[step.key] && completedSteps[steps[index + 1].key]
    //               ? 'bg-green-500' : 'bg-gray-300'
    //           }`} />
    //         )}
    //       </React.Fragment>
    //     ))}
    //   </div>
    //   <div className="md:pl-20">
    //     {steps.map((step, index) => (
    //       <div key={index} className="mb-4">
    //         <button
    //           className={`w-full text-left p-4 font-semibold flex justify-between items-center ${
    //             index === activeStep ? 'bg-blue-100' : 'bg-gray-100'
    //           } hover:bg-gray-200 rounded-lg`}
    //           onClick={() => handleStepClick(index)}
    //         >
    //           {step.title}
    //           {index === activeStep ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    //         </button>
    //         {index === activeStep && (
    //           <div className="mt-4">
    //             <step.component />
    //             {index < steps.length - 1 && (
    //               <Button 
    //                 className="mt-4 flex items-center"
    //                 onClick={handleNextStep}
    //               >
    //                 Next <ArrowRight className="ml-2" size={16} />
    //               </Button>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     ))}

    //     <Button className="mt-4 flex items-center" onClick={handleSubmit}>Submit here </Button>
    //   </div>

     
    // </div>


  // In your existing component, replace the form section with:
<div className="relative">
  {/* Header with Refresh */}
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Add a New Product
      </h2>
      <p className="text-gray-500 mt-1">Follow the steps below</p>
    </div>
    <button 
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium
                text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50
                hover:shadow-md active:scale-95 group"
    >
      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      Refresh
    </button>
  </div>

  <div className="flex gap-8">
    
<div className="hidden lg:block w-24 relative">

  <div className="absolute inset-y-0 left-8 w-0.5 bg-gray-200" />
  
  
  <div className="overflow-y-auto h-screen fixed scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100">
    {steps.map((step, index) => (
      <div key={index} className="relative mb-24">
        <div
          onClick={() => handleStepClick(index)}
          className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer
            transition-all duration-300 transform hover:scale-110 shadow-lg
            ${
              completedSteps[step.key]
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : index === activeStep
                ? 'bg-white border-2 border-indigo-500 text-indigo-600'
                : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
            }`}
        >
          {completedSteps[step.key] ? (
            <Check className="w-6 h-6" />
          ) : (
            <span className="text-lg font-medium">{index + 1}</span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


    {/* Main Content */}
    <div className="flex-1 max-w-3xl">
      {steps.map((step, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => handleStepClick(index)}
            className={`w-full transition-all duration-300 ${
              index === activeStep 
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500'
                : 'bg-white hover:bg-gray-50'
            } rounded-xl shadow-sm hover:shadow-md`}
          >
            <div className="p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  completedSteps[step.key]
                    ? 'bg-green-100 text-green-600'
                    : index === activeStep
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {completedSteps[step.key] ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                </div>
              </div>
              {index === activeStep ? (
                <ChevronUp className="w-5 h-5 text-indigo-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          {index === activeStep && (
            <div className="mt-4 transform transition-all duration-300">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <step.component />
                
                <div className="mt-6 flex justify-end gap-4">
                  {index < steps.length - 1 ? (
                    <button 
                      onClick={handleNextStep}
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5
                               text-white text-sm font-medium shadow-lg shadow-indigo-200 transition-all duration-200
                               hover:shadow-xl hover:shadow-indigo-300 active:scale-95
                               flex items-center gap-2"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5
                               text-white text-sm font-medium shadow-lg shadow-indigo-200 transition-all duration-200
                               hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default ProductFormWithProgress;


