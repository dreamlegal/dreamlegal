"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { FaStar } from "react-icons/fa6";

function ProductAllReviewProgressbar({ product }: any) {
  const [ratings, setRatings] = useState({
    overallRating: 0,
    easeOfLearning: 0,
    integration: 0,
    support: 0,
    roi: 0,
    totalReviews: 0,
    overallRecommendation: 0,
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async (id: any) => {
      try {
        const response = await fetch("/api/cal-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data rating", data);

        // Update the state with the fetched data
        if (data.message === "No reviews found for this product") {
          setRatings({ ...ratings, message: "No reviews found for this product" });
        } else {
          setRatings(data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (product && product.id) {
      fetchRatings(product.id);
    } else {
      setLoading(false);
      setError("Product ID is missing.");
    }
  }, [product]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const {
    overallRating,
    easeOfLearning,
    integration,
    support,
    roi,
    overallRecommendation,
    totalReviews,
  } = ratings;

  // Round the ratings and calculate percentage for the progress bars
  const roundedOverallRating = (overallRating ?? 0).toFixed(1);  
  const roundedEaseOfLearning = (easeOfLearning ?? 0).toFixed(1);
  const roundedIntegration = (integration ?? 0).toFixed(1);
  const roundedSupport = (support ?? 0).toFixed(1);
  const roundedRoi = (roi ?? 0).toFixed(1);
  const roundedOverallRecommendation = Math.round(overallRecommendation ?? 0);

  if (ratings.message === "No reviews found for this product") {
    return <p>No reviews found for this product</p>;
  }

  return (
    
    <div className="flex flex-col w-full gap-10 bg-primary2 p-5 rounded-2xl">
      <div className="flex flex-col p-3 md:flex-col md:gap-4 sm:flex-col sm:gap-4 justify-between">
        <div className="flex flex-col md:flex-col md:gap-4 sm:flex-col sm:gap-4">
          <div className="md:flex md:flex-col">
            <h2 className="text-lg font-bold text-gray-900 pb-2">
              Overall Rating
            </h2>
            <div className="flex flex-col md:flex-col items-center gap-4">
              <div className="flex items-end self-start ">
              <FaStar className="text-[#FDB52A] h-6 w-6"  />
            
              <FaStar className="text-[#FDB52A] h-8 w-8 " />
              <FaStar className="text-[#FDB52A] h-10 w-10 " />
              <FaStar className="text-[#FDB52A] h-12 w-12" />
              <FaStar className="text-[#FDB52A] h-14 w-14 " />


              </div>
              <p className="text-[#FDB52A] text-[45px] m-0 p-0 text-left self-start">
                {roundedOverallRating}
                <span className="text-[35px]">/5</span>
              </p>
            </div>
          </div>
        </div>
    
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Features</h2>
              <h3 className="text-[#FDB52A]">{roundedEaseOfLearning}/5</h3>
            </div>
            <Progress value={(easeOfLearning / 5) * 100} className="h-2" />
          </div>
    
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Value for money</h2>
              <h3 className="text-[#FDB52A]">{roundedIntegration}/5</h3>
            </div>
            <Progress value={(integration / 5) * 100} className="h-2" />
          </div>
    
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Easy to use</h2>
              <h3 className="text-[#FDB52A]">{roundedSupport}/5</h3>
            </div>
            <Progress value={(support / 5) * 100} className="h-2" />
          </div>
    
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Customer support</h2>
              <h3 className="text-[#FDB52A]">{roundedRoi}/5</h3>
            </div>
            <Progress value={(roi / 5) * 100} className="h-2" />
          </div>
        </div>
      </div>
  
     <div className="flex flex-col p-3 md:flex-col md:gap-4 sm:flex-col sm:gap-4 justify-between">
    <div className="flex items-center flex-wrap space-x-2">
      <h2 className="text-lg text-gray-900">Overall Recommendation:</h2>
      <h2 className="text-primary1 text-[45px] ml-10 sm:ml-0 md:ml-0 sm:text-[30px] md:text-[35px]">
        {roundedOverallRecommendation}%
      </h2>
    </div>

  
      <div className="flex mt-4">
        <p className="text-slate-500">Based on {totalReviews}+ reviews</p>
      </div>
     </div>
  </div>
  
  );
}

export default ProductAllReviewProgressbar;
