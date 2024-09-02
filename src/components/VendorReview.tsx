"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Rating } from "@mui/material";
import { useSearchParams } from "next/navigation";

 // Adjust the import based on your Rating component's location
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // You can use these icons or any other icons you prefer


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
        console.log(data);

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
    )}

 
export default VendorReview;
