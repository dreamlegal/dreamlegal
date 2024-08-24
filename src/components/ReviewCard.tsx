import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@mui/material";

function ReviewCard({ review, overallRating }: any) {
  return (
    <div className="my-2 bg-[#fff] p-2 rounded-md">
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="flex flex-row items-center">
        <Avatar>
          <AvatarImage src={review.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-sm text-gray-900 font-bold ml-3 mt-3">
          {review.user.name}
        </h3>
      </div>
  
      <div className="mt-2 sm:mt-0">
        <Rating value={overallRating} precision={0.5} readOnly />
      </div>
    </div>
    <div className="w-full h-px bg-slate-200 my-4 mx-auto"></div>
  
    <p className="text-sm text-slate-500 my-2">
      {review.overallExperienc}
    </p>
  </div>
  
  );
}

export default ReviewCard;
