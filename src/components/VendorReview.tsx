"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Rating } from "@mui/material";
import { useSearchParams } from "next/navigation";

function VendorReview({ userId ,}: { userId: string }) {
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  // @ts-ignore
  const verify = searchParams.get('verified') ? true : false;

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/vendor-reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (data.success) {
          setReviewsData(data.products);
          setOverallRating(data.overallRating);
        } else {
          setError(data.msg);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [userId]);

  if(verify){
    return(
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
       <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
      </div>
    )
  }

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if( !reviewsData  || reviewsData.length === 0) {
    return <div>No reviews found</div>;

  }
  return (
    <div>
      <div className="border rounded-md px-5 py-4">
        {/* Map over products and display reviews for each */}
        {reviewsData.map((product) => (
          <div key={product.id}>
            <h2 className="text-lg font-bold text-gray-600 italic">{product.name}</h2>
            {product.reviews.map((review: any) => (
              <ReviewCard
                key={review.id}
                review={review}
                overallRating={overallRating}
                productName={product.name} // Pass the product name to ReviewCard
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, overallRating, productName }: any) {
  return (
    <div className="my-2">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={review.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-gray-900 font-bold">
            {review.user.name}
          </h3>
          <p className="text-sm text-slate-500 my-2">
        {review.overallExperienc} {/* Assuming you meant `overallExperience` */}
      </p>
        </div>
      </div>
     

     
      <div className="flex items-center gap-2">
        <Rating value={overallRating} precision={0.5} readOnly />
      </div>
    </div>
  );
}

export default VendorReview;
