"use client";
import { useState } from "react";
import { IoIosInformation } from "react-icons/io";
import { ProductInformation } from "./ProductInformation";
// Import additional step components
import { Button } from "@/components/ui/button";
import ProductInfo from "./ProductInfo";

import CompanyInfo from "./CompanyInfo";
import { StepProvider, useStepContext } from "@/context/formContext";
import CustomerSegmentation from "./CustomerSegmentstion";
import FeaturesInfo from "./FeaturesInfo";
import PricingInfo from "./PricingInfo";
import SupportService from "./SupportService";
import { useSearchParams } from "next/navigation";
import ProductForm  from "./ProductForm";

function AddProduct( ) {
  const { step, nextStep, prevStep } = useStepContext();

  const searchParams = useSearchParams();
  // @ts-ignore
  const verify = searchParams.get('verified') ? true : false;

  if(verify){
    return(
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
       <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
      </div>
    )
  }

  return (
    <div className="font-clarity">
      <h1 className="text-xl font-bold">Add Product</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
          <div className="w-full col-span-3 shadow border px-5 py-6 rounded-lg">
            <div>
              {/* <ProductInfo editing={false} /> */}
              <ProductForm editing= {false}/>


              {/* Add more steps here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
