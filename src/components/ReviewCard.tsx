import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@mui/material";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import { User, Building } from 'lucide-react';
function ReviewCard({ review, overallRating }: any) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
    <div className="my-2 bg-[#f8f8fb] p-3 rounded-[10px]">
    <div className=" flex flex-col justify-between md:flex-row md:justify-between gap-4">
    <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={review.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-sm text-gray-900 font-bold mt-2">{review.user.name}</h3>
      
    </div>
    
     <div  className="flex gap-4">
       <div className="flex gap-2">
            <p>Overall Rating:</p>
            <Rating value={overallRating} precision={0.5} readOnly />

        </div>
      <button
        onClick={handleToggle}
        className="ml-auto flex items-center text-gray-600 hover:text-gray-900"
      >
        {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </button>
     </div>
     
    </div>
    {/* <div className="flex  md:flex-row  gap-4">
      <h3 className="text-sm text-gray-900 font-bold mt-2">{review.user.Designation} @</h3> 
      <h3 className="text-sm text-gray-900 font-bold mt-2">{review.user.CompanyAddress}</h3>
    </div> */}
    {/* <div className="flex md:flex-row gap-4">
  <h3 className="text-sm text-gray-900 font-bold mt-2">
    {review.user.Designation} @
  </h3> 
  <h3 className="text-sm text-gray-900 font-bold mt-2">
    {review.user.CompanyAddress}
  </h3>
</div> */}
{/* <div className="flex flex-col md:flex-row gap-4 ml-4 md:ml-12 bg-red-100 p-3 rounded-lg shadow-sm p-2">
      <div className="flex items-center">
        <User className="w-5 h-5 mr-2 text-red-600" />
        <h3 className="text-sm text-red-700 font-medium">
          {review.user.Designation}
        </h3>
      </div>
      <div className="flex items-center">
        <Building className="w-5 h-5 mr-2 text-red-600" />
        <h3 className="text-sm text-red-700 font-medium">
          {review.user.CompanyAddress}
        </h3>
      </div>
    </div> */}
    
     <div className="inline-flex flex-col md:flex-row gap-4 ml-4 md:ml-12 p-3">
     <h4><strong>{review.user.Designation}</strong> of <strong> {review.user.CompanyAddress}</strong> reviewed this product :</h4>
    </div>

    {!isCollapsed && (
      <>
        <hr className="mt-3" />
        <div className="flex flex-col gap-2">
          <div className="text-base text-slate-600 mt-3">
            <p className="text-lg text-black font-semibold">What did they like the best about the product:</p>
            <p>{review.bestThing}</p>
          </div>
          <hr />
          <div className="text-base text-slate-600 mt-3">
            <p className="text-lg text-black font-semibold">What did they not like about the product?</p>
            <p>{review.worstThing}</p>
          </div>
          <hr />
          <div className="text-base text-slate-600 mt-3">
            <p className="text-lg text-black font-semibold">How likely are they to recommend this product to someone?</p>
            <p>{review.recommend}</p>
          </div>
          <hr />
          <div className="text-base text-slate-600 mt-3">
            <p className="text-lg text-black font-semibold">Would they be available for someone for reference?</p>
            <p>{review.reference}</p>
          </div>
          <hr />
          <div className="text-base text-slate-600 mt-3">
            <p className="text-lg text-black font-semibold">Document attached to verify that they are a genuine user of the product.</p>
            <p>{review.uploadedFile}</p>
          </div>

          <hr />
          <div className="flex flex-col space-y-4 mt-4">
            <p className="font-bold text-xl">Overall experience</p>
            <p>Ease of learning</p>
            <Rating name="ease-of-learning-rating" value={review.easeOfLearning} precision={0.5} readOnly />

            <p>Integration with existing workflow</p>
            <Rating name="integration-rating" value={review.integration} precision={0.5} readOnly />

            <p>Support and service</p>
            <Rating name="support-rating" value={review.support} precision={0.5} readOnly />

            <p>Return on Investment</p>
            <Rating name="roi-rating" value={review.roi} precision={0.5} readOnly />
          </div>

          <hr className="mt-3" />
          <div className="flex flex-col space-y-4 mt-4">
            <p className="font-bold text-xl">Features</p>
            {review.functionality.map((feature) => (
              <div key={feature.category}>
                <p>{feature.category}</p>
                <Rating value={feature.rating} precision={0.5} />
              </div>
            ))}
          </div>

          <hr className="mt-3" />
          <div className="flex flex-col space-y-4 mt-4">
            <p className="font-bold text-xl">Process Lifecycle</p>
            {review.processStep.map((lifecycle) => {
              const extractedCategory = lifecycle.category.split("Document Management System Software - ")[1];
              return (
                <div key={lifecycle.category}>
                  <h4>{extractedCategory}</h4>
                  <Rating name={extractedCategory} value={lifecycle.rating} precision={0.5} />
                </div>
              );
            })}
          </div>

          <hr className="mt-3" />
          <div className="flex flex-col md:flex-col items-center gap-2">
            <p>Overall Rating:</p>
            <Rating value={overallRating} precision={0.5} readOnly />
          </div>
        </div>
      </>
      )}
  </div>
  
  );
}

export default ReviewCard;
