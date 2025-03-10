
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
import { ChevronDown, ChevronUp, ArrowRight ,Check,RefreshCw ,Menu ,X} from 'lucide-react';
import CheckUpload from './ProductForms/CheckUpload';
import { z } from 'zod';
interface ProductFormWithProgressProps {
  editing: boolean;
  product?: any; // Adjust the type based on the actual product shape or interface
}
import 'react-toastify/dist/ReactToastify.css';

import { useToast } from "./ui/use-toast";
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';

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
 const [alert, setAlert] = useState(null);
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
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

  // const [completedSteps, setCompletedSteps] = useState({
  //   productInformation: false,
  //   productOverview: false,
  //   productPostImplementationService: false,
  //   productSAndS: false,
  //   productReference: false,
  //   productPricing:false,
  //   productLifeCycle:false,
  //   productFeatures:false,
  //   productCustomerSegments:false,
  // });

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

  // const steps = [
  //   { key: 'productInformation', title: 'Product Information', component: ProductInformation },
  //   { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
  //   { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
  //   { key: 'productLifeCycle', title: 'Process LifeCycle', component: ProductLifeCycle },
  //   { key: 'productFeatures', title: 'Features', component: ProductFeatures },
  //   { key: 'productPricing', title: 'Pricing', component: PricingForm },
  //   { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
  //   { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
  //   { key: 'productReference', title: 'Reference', component: ProductReference },
  // ];

  // const handleStepClick = (index: number) => {
  //   setActiveStep(prevStep => (prevStep === index ? null : index));
  // };

  // const handleNextStep = () => {
  //   if (activeStep !== null && activeStep < steps.length - 1) {
  //     setActiveStep(activeStep + 1); // Just move to the next form without affecting validation or colors
  //   }
  // };

  // form submission 

  const { vendorId, userType } = useAuth();
  const handleSubmit = async () => {

    showAlert("Saving Your Information..Have Some Patience Please!", 'success');
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
            showAlert("Fail to create product", 'error');
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
        console.log({
          title: "Fail to submit",
          description: "Got some internal error",
          variant: "destructive",
        });
        showAlert("Fail to create product", 'error');
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

  // const steps = [
  //   { key: 'productInformation', title: 'Product Information', component: ProductInformation },
  //   { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
  //   { key: 'productCustomerSegments', title: 'Customer Segments', component: ProductCustomerSegment },
  //   { key: 'productLifeCycle', title: 'Process LifeCycle', component: ProductLifeCycle },
  //   { key: 'productFeatures', title: 'Features', component: ProductFeatures },
  //   { key: 'productPricing', title: 'Pricing', component: PricingForm },
  //   { key: 'productSAndS', title: 'Service and Support', component: ProductSAndS },
  //   { key: 'productPostImplementationService', title: 'Post Implementation Service', component: ProductPostImplementationService },
  //   { key: 'productReference', title: 'Reference', component: ProductReference },
  // ];

  // // State for the currently selected step
  // const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // // Handle selecting a step from the sidebar
  // const handleStepSelect = (index) => {
  //   setActiveStepIndex(index);
  // };

  // // Function to render the active component
  // const renderActiveComponent = () => {
  //   const ActiveComponent = steps[activeStepIndex].component;
  //   return <ActiveComponent />;
  // };

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

  // State for the currently selected step
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // State for tracking completed steps
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
  
  // Handle selecting a step from the sidebar
  const handleStepSelect = (index) => {
    setActiveStepIndex(index);
  };

  // Function to render the active component
  const renderActiveComponent = () => {
    const ActiveComponent = steps[activeStepIndex].component;
    return <ActiveComponent />;
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
  
// <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Single container for the entire form system */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h1 className="text-xl font-semibold text-gray-800">Add a New Product</h1>
//           <p className="text-sm text-gray-500">Complete all sections</p>
//         </div>
        
//         {/* Content area with sidebar and form */}
//         <div className="flex">
//           {/* Left sidebar navigation */}
//           <div className="w-64 border-r border-gray-200 bg-gray-50">
//             <nav className="py-2">
//               {steps.map((step, index) => (
//                 <button
//                   key={step.key}
//                   onClick={() => handleStepSelect(index)}
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
//             {/* Form title */}
//             <h2 className="text-xl font-semibold mb-6">{steps[activeStepIndex].title}</h2>
            
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
//                     Submit
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
<div className="max-w-7xl mx-auto px-4 py-8">
{/* Single container for the entire form system */}
<div className="bg-white rounded-lg shadow-lg overflow-hidden">
  {/* Header */}
  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
    <div>
      <h1 className="text-xl font-semibold text-gray-800">Add a New Product</h1>
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
  <div className="flex relative">
    {/* Mobile sidebar overlay - only appears on small screens when menu is open */}
    {mobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
        onClick={() => setMobileMenuOpen(false)}
      />
    )}
    
    {/* Left sidebar navigation - sliding for mobile, fixed for desktop */}
    <div className={`
      absolute md:relative inset-y-0 left-0 
      transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 transition duration-300 ease-in-out
      z-30 md:z-0 w-64 border-r border-gray-200 bg-gray-50 h-full
      md:block
    `}>
      <nav className="py-2 h-full overflow-y-auto">
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
              Submit
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

