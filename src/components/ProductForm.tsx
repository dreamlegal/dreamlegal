import React, { useState, useEffect } from 'react';
import { ProductInfo } from '@/store/useStore';
import ProductInformation from './ProductForms/ProductInformation';
import ProductOverview from './ProductForms/ProductOverview';
import { z } from 'zod';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import ProductSAndS from './ProductForms/ProductSAndS';
import PricingForm from './ProductForms/PricingFrom';;

const ProductFormWithProgress = ({ editing = false }: { editing: boolean }) => {
  const {
    productName, category, deployment, focusCountries, languages,
    description, usp, upcomingUpdates ,demo,support,training,fileSize,storage, freeTrial,
    timePeriod,
   freeVersion,
    pricingModel,
    contractPeriod,
    nameofPlan,
    validity,
    price,
    pricingParams
  } = ProductInfo();

  const [completedSteps, setCompletedSteps] = useState({
    productInformation: false,
    productOverview: false,
  });

  const [activeStep, setActiveStep] = useState<number | null>(0);

  const wordCount = (value: string, maxWords: number): boolean => {
    return value.split(/\s+/).length <= maxWords;
  };

  const productSchema = z.object({
    productName: z.string().min(2).max(5),
    category: z.array(z.string()).min(1),
    deployment: z.array(z.string()).min(1),
    focusCountries: z.array(z.string()).min(1).max(5),
    languages: z.array(z.string()).min(1),
  });

  const ProductOverviewSchema = z.object({
    description: z.string().nonempty().refine(value => wordCount(value, 50)),
    usp: z.string().nonempty().refine(value => wordCount(value, 50)),
    upcomingUpdates: z.string().nonempty().refine(value => wordCount(value, 50)),
  });

  useEffect(() => {
    const productInformationComplete = productSchema.safeParse({
      productName, category, deployment, focusCountries, languages
    }).success;

    const productOverviewComplete = ProductOverviewSchema.safeParse({
      description, usp, upcomingUpdates
    }).success;

    setCompletedSteps({
      productInformation: productInformationComplete,
      productOverview: productOverviewComplete,
    });
  }, [productName, category, deployment, focusCountries, languages, description, usp, upcomingUpdates]);

  const steps = [
    { key: 'productInformation', title: 'Product Information', component: ProductInformation },
    { key: 'productOverview', title: 'Product Overview', component: ProductOverview },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(prevStep => prevStep === index ? null : index);
  };

  return (
    <>
    <div className="relative">
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
            {index === activeStep && <step.component />}
          </div>
        ))}
      </div>
      
    </div>

<ProductSAndS/>
<PricingForm/>
{/* {demo}
{support}
{training}
{storage}
{fileSize} */}
{freeTrial}
  {timePeriod}
 {freeVersion}
  {pricingModel}
  {contractPeriod}
  {nameofPlan}
  {validity}
  {price}
 {pricingParams}
</>
  );
};

export default ProductFormWithProgress;