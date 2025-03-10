import { ProductInfo } from '@/store/useStore';
import React, { useEffect, useState } from 'react';

import VendorPricingForm from './VendorProductForms/VendorPricingFrom';
import VendorProductCustomerSegment from './VendorProductForms/VendorProductCustomerSegment';
import VendorProductFeatures from './VendorProductForms/VendorProductFeatures';
import VendorProductInformation from './VendorProductForms/VendorProductInformation';
import VendorProductLifeCycle from './VendorProductForms/VendorProductLifeCycle';
import VendorProductOverview from './VendorProductForms/VendorProductOverview';
import VendorProductPostImplementationService from './VendorProductForms/VendorProductPostImplementationService';
import VendorProductReference from './VendorProductForms/VendorProductReference';
import VendorProductSAndS from './VendorProductForms/VendorProductSAndS';

import FormProgress from '@/components/FormProgress';

import { Check, Menu, X } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

interface ProductFormWithProgressProps {
  editing: boolean;
  product?: any; // Adjust the type based on the actual product shape or interface
}

import { useParams } from 'next/navigation';
import { useToast } from "./ui/use-toast";

const ProductFormWithProgress: React.FC<ProductFormWithProgressProps> = ({ editing, product }) => {
  const [loading, setLoading] = useState(true);

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
    
    websiteUrl, integrations,
    securityCertificate,
    description, usp, upcomingUpdates,
    freeTrial, timePeriod, freeVersion, pricingModel, contractPeriod, nameofPlan, validity, price, pricingParams,
    processLifecycle,
    demo, support, training, fileSize, storage,
    maintenance, reqForChange, trainingReq, dataMigration,
    images, attachments, instagramUrl, videoUrl, linkedinUrl, twitterUrl, youtubeUrl,
    userCategory, industry, practiceAreas, teamSize, features,

    companyName,
    headquarters,
    foundersNames,
    setCompanyName,
    setHeadquarters,
    setFoundersNames,

    ByAdminYearFounded,
    setByAdminYearFounded,
    ByAdminAwards,
    setByAdminAwards,
    ByAdminTeamSize,
    setByAdminTeamSize,
    ByAdminEmail,
    setByAdminEmail,
    ByAdminPhone,
    setByAdminPhone,
    ByAdminWebsite,
    setByAdminWebsite,
  } = ProductInfo();

  console.log("I console here = ", product);
  
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

  useEffect(() => {
    if (editing === true && product) {
      setLoading(true);

      const safeSetState = (value, setter, defaultValue = '') => {
        if (value !== undefined && value !== null) {
          setter(value);
        } else if (defaultValue !== '') {
          setter(defaultValue);
        }
      };

      const safeSetArray = (value, setter) => {
        if (Array.isArray(value)) {
          setter(value);
        } else if (value) {
          setter([value]);
        } else {
          setter([]);
        }
      };

      console.log("Setting product info because editing is true");

      safeSetState(product.name, setProductName);
      safeSetState(product.painPointAddressed, setPainPointAddressed);
      safeSetState(product.websiteUrl, setWebsiteUrl);
      safeSetState(product.logoUrl, setLogoUrl);
      safeSetState(product.category, setCategory);
      safeSetState(product.deployement, setDeployment);
      safeSetState(product.mobileAvailable, setMobileAvailable);
      safeSetState(product.focusCountries, setFocusCountries);
      safeSetState(Number(product.adoptionPeriod) || 0, setAdoptionPeriod);
      safeSetState(product.adoptionPeriodUnit, setAdoptionPeriodUnit);
      safeSetState(product.languages, setLanguages);
      safeSetState(product.securityCertificate, setSecurityCertificate);
      
      safeSetArray(product.integrations, setIntegrations);

      safeSetState(product.description, setDescription);
      safeSetState(product.usp, setUSP);
      safeSetState(product.upcomingUpdates, setUpcomingUpdates);
      safeSetState(product.userCategory, setUserCategory);
      safeSetState(product.industry, setIndustry);
      safeSetState(product.practiceAreas, setPracticeAreas);
      safeSetState(product.teamSize, setTeamSize);
      
      safeSetState(product.CompanyName, setCompanyName);
      safeSetState(product.Headquarters, setHeadquarters);
      safeSetState(product.FoundersNames, setFoundersNames);

      safeSetState(product.ByAdminYearFounded, setByAdminYearFounded);
      safeSetState(product.ByAdminAwards, setByAdminAwards);
      safeSetState(product.ByAdminTeamSize, setByAdminTeamSize);
      safeSetState(product.ByAdminEmail, setByAdminEmail);
      safeSetState(product.ByAdminPhone, setByAdminPhone);
      safeSetState(product.ByAdminWebsite, setByAdminWebsite);

      if (product.processLifecycle && typeof product.processLifecycle === 'object') {
        Object.entries(product.processLifecycle).forEach(([category, values]) => {
          const valueArray = Array.isArray(values) ? values : values ? [values] : [];
          setProcessLifecycle(category, valueArray);
        });
      }

      if (product.features && typeof product.features === 'object') {
        Object.entries(product.features).forEach(([category, subCategories]) => {
          if (typeof subCategories === 'object' && subCategories !== null) {
            const updatedCategory = Object.entries(subCategories).reduce((acc, [subCategory, values]) => {
              acc[subCategory] = Array.isArray(values) ? values : values ? [values] : [];
              return acc;
            }, {});
            setFeatures(category, updatedCategory);
          }
        });
      }

      safeSetState(product.freeTrial, setFreeTrial);
      safeSetState(product.timePeriod, setTimePeriod);
      safeSetState(product.pricingModel, setPricingModel);
      safeSetState(product.contractPeriod, setContractPeriod);
      
      const pricingParams = Array.isArray(product.pricingParams) 
        ? product.pricingParams.filter(param => param).join(', ') 
        : product.pricingParams || '';
      safeSetState(pricingParams, setPricingParams);

      safeSetState(product.freeVersion, setFreeVersion);
      safeSetState(product.Demo, setDemo);
      safeSetState(product.support, setSupport);
      safeSetState(product.training, setTraining);
      
      safeSetState(Array.isArray(product.fileSize) ? product.fileSize[0] : product.fileSize, setFileSize);
      safeSetState(Array.isArray(product.storage) ? product.storage[0] : product.storage, setStorage);

      safeSetState(product.maintenance, setMaintenance);
      safeSetState(product.validity, setValidity);
      safeSetState(product.nameofPlan, setNameofPlan);
      safeSetState(product.price, setPrice);
      safeSetState(product.reqForChange, setReqForChange);
      safeSetState(product.dataMigration, setDataMigration);
      safeSetState(product.trainingReq, setTrainingReq);
      safeSetState(product.Images, setImagesUrl);
      safeSetState(product.videoUrl, setVideoUrl);
      safeSetState(product.youtubeUrl, setYoutubeUrl);
      safeSetState(product.linkedinUrl, setLinkedinUrl);
      safeSetState(product.twitterUrl, setTwitterUrl);
      safeSetState(product.instagramUrl, setInstagramUrl);
      safeSetState(product.attachments, setAttachmentsUrl);

      setLoading(false);
    }
  }, [editing, product]);

  const [submissionStatus, setSubmissionStatus] = useState("");
  const { toast } = useToast();

  const [activeStep, setActiveStep] = useState<number | null>(0);

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

  const steps = [
    { key: 'productInformation', title: 'Product Information', component: VendorProductInformation },
    { key: 'productOverview', title: 'Product Overview', component: VendorProductOverview },
    { key: 'productCustomerSegments', title: 'Customer Segments', component: VendorProductCustomerSegment },
    { key: 'productLifeCycle', title: 'Process LifeCycle', component: VendorProductLifeCycle },
    { key: 'productFeatures', title: 'Features', component: VendorProductFeatures },
    { key: 'productPricing', title: 'Pricing', component: VendorPricingForm },
    { key: 'productSAndS', title: 'Service and Support', component: VendorProductSAndS },
    { key: 'productPostImplementationService', title: 'Post Implementation Service', component: VendorProductPostImplementationService },
    { key: 'productReference', title: 'Reference', component: VendorProductReference },
  ];

  const params = useParams();
  const productId =params.id || null;

  const handleSubmit = async () => {

    toast({
      title: "saving...",
      description: "Saving Your Information..Have Some Patience Please!",
      variant: "saving",
    });
    
    function normalizeToArray(value:any) {
      if (typeof value === 'string') {
        return [value];
      } else if (Array.isArray(value)) {
        return value.flat();
      }
      return [];
    }
    if (editing === false) {
     
     
      try {

        const FormValues = {
         
          prname: productName,
          logoUrl : logoUrl ,
          category: category,
          deployment: deployment,
          mobileAccessibility:mobileAvailable,
          adoptionPeriod:adoptionPeriod,
          adoptionPeriodUnit:adoptionPeriodUnit,
          securityCertificate: securityCertificate,
          focusCountries: focusCountries,
          
          languages: languages,
          

          description: description,
          usp: usp,
          upcomingUpdates: upcomingUpdates,
          painPointAddressed: painPointAddressed,
          websiteUrl:websiteUrl,
    
          

          userCategory: userCategory,
          industry: industry,
          practiceAreas: practiceAreas,
          teamSize: teamSize,


          processLifecycle:processLifecycle, 
          features:features,
          integrations:integrations,

        
          freeTrial: freeTrial,

          timePeriod: timePeriod,
          freeVersion: freeVersion,
          pricingModel: pricingModel,
          contractPeriod: contractPeriod,
          nameofPlan: nameofPlan,
          validity: validity,
          price: price,
          
          pricingParams: [pricingParams],
        
          Demo: demo,
          support: support,
          training: training,
          fileSize: [fileSize],
          storage: [storage],

          maintenance: maintenance,
          reqForChange: reqForChange,
          trainingReq: trainingReq,
          dataMigration: dataMigration,

          ImagesUrl: imagesUrl || "image.png",
          attachmentUrl: attachmentsUrl || "undefined",
          instagramUrl: instagramUrl,
          videoUrl: videoUrl,
          linkedinUrl: linkedinUrl,
          twitterUrl: twitterUrl,
          youtubeUrl: youtubeUrl,

          companyName: companyName,
          headquarters: headquarters,
          foundersNames: foundersNames,
          ByAdminYearFounded,
          
          ByAdminAwards,
         
          ByAdminTeamSize,
          
          ByAdminEmail,
          
          ByAdminPhone,
         
          ByAdminWebsite,
          

        
          active: "draft",
          featured: false
          
        };


        console.log("my form ", FormValues);

        const response = await fetch("/api/admin-add-product", {
          method: "POST",
          body: JSON.stringify(FormValues),
          headers: {
            "Content-Type": "application/json",
          },
        });

          const data = await response.json();

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
            setSubmissionStatus("error");
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
     
     
      try {

        const FormValues = {

          id: productId,
          prname: productName,
          logoUrl :logoUrl,
          category: category,
          deployment: deployment,
          mobileAccessibility:mobileAvailable,
          adoptionPeriod:adoptionPeriod,
          adoptionPeriodUnit:adoptionPeriodUnit,
          securityCertificate: securityCertificate,
          focusCountries: focusCountries,
          
          languages: languages,
           

          description: description,
          usp: usp,
          upcomingUpdates: upcomingUpdates,
          painPointAddressed: painPointAddressed,
          websiteUrl:websiteUrl,

          userCategory: userCategory,
          industry: industry,
          practiceAreas: practiceAreas,
          teamSize: teamSize,


          processLifecycle:processLifecycle, 
          features:features,
          integrations:integrations,

        
          freeTrial: freeTrial,

          timePeriod: timePeriod,
          freeVersion: freeVersion,
          pricingModel: pricingModel,
          contractPeriod: contractPeriod,
          nameofPlan: nameofPlan,
          validity: validity,
          price: price,
          
          pricingParams: normalizeToArray(pricingParams),
        
          Demo: demo,
          support: support,
          training: training,
          fileSize:normalizeToArray(fileSize),
          storage:normalizeToArray(storage),

          maintenance: maintenance,
          reqForChange: reqForChange,
          trainingReq: trainingReq,
          dataMigration: dataMigration,

          ImageUrl: imagesUrl,
          attachmentUrl: attachmentsUrl,
          instagramUrl: instagramUrl,
          videoUrl: videoUrl,
          linkedinUrl: linkedinUrl,
          twitterUrl: twitterUrl,
          youtubeUrl: youtubeUrl,
          companyName: companyName,
          headquarters: headquarters,
          foundersNames: foundersNames,
          ByAdminYearFounded,
          
          ByAdminAwards,
          ByAdminTeamSize,
          ByAdminEmail,
          ByAdminPhone,
          ByAdminWebsite,


        
          featured: false
          
        };


        console.log("my form ", FormValues);

     
      
      const response = await fetch("/api/admin-product-edit", {
        method: "POST",
        body: JSON.stringify(FormValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

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
  
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    
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
    
    const handleStepSelect = (index) => {
      setActiveStepIndex(index);
    };
  
    const renderActiveComponent = () => {
      const ActiveComponent = steps[activeStepIndex].component;
      return <ActiveComponent />;
    };
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  


  return (
    
    <div className="relative">
    
     {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <FormProgress />
          
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Add a New Product</h1>
                  <p className="text-sm text-gray-500">Complete all sections</p>
                </div>
                
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
              
              <div className="flex relative">
                {mobileMenuOpen && (
                  <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                )}
                
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
                          setMobileMenuOpen(false);
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
                
                <div className="flex-1 p-6">
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
                  
                  <h2 className="text-xl font-semibold mb-6 hidden md:block">{steps[activeStepIndex].title}</h2>
                  
                  {renderActiveComponent()}
                  
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
        </>
      )}
    </div>
  );
};

export default ProductFormWithProgress;
