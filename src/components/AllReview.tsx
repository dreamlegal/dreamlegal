"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewCard from "./ReviewCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddReviewForm from "./AddReviewForm";
import Link from "next/link";

function AllReview({ type = "user", product }: any) {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [reviews, setReviews] = useState<any[]>([]);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("latest");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/get-reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product.id }),
        });

        const result = await response.json();

        if (result.success) {
          setReviews(result.reviews);
          setOverallRating(result.overallRating);
          setTotalReviews(result.totalReviews);
        } else {
          setError(result.msg);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product.id]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const sortReviews = (reviews: any[], option: string) => {
    switch (option) {
      case "best":
        return [...reviews].sort((a, b) => b.overallRating - a.overallRating);
      case "worst":
        return [...reviews].sort((a, b) => a.overallRating - b.overallRating);
      case "latest":
      default:
        return reviews; // Assuming the backend returns reviews sorted by latest by default
    }
  };

  const sortedReviews = sortReviews(reviews, sortOption);

  return (
    <div className="font-clarity mt-5 bg-primary2 p-5 rounded-2xl">

      <div className="flex flex-col md:flex-row items-center gap-5 mt-5 w-full">
        <div className="flex flex-col md:flex-row items-center gap-5 w-full">
          {/* Reverse order for mobile view */}
          {userId ? (
            <Link
              className="mt-5 w-full md:w-auto order-2 md:order-1"
              href={{
                pathname: `/review`,
                query: {
                  id: product.id,
                },
              }}
            >
              <button className="bg-primary1 text-white py-4 px-4 rounded-lg text-xs md:w-[200px] w-full">
                Add Review
              </button>
            </Link>
          ) : (
            <Link href={"/sign-in"} className=" w-full md:w-auto order-2 md:order-1">
              <button className="bg-primary1 text-white py-4 px-4 rounded-lg text-xs md:w-[200px] w-full">
                Login to Review
              </button>
            </Link>
          )}
          
          <div className="w-full md:w-[180px] order-1 md:order-2">
            <Select onValueChange={handleSortChange} value={sortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="best">Best</SelectItem>
                <SelectItem value="worst">Worst</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>






   <div className=" p-0  mt-5">


      {loading ? (
         
        <p>Loading reviews...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reviews.length > 0 ? (
        sortedReviews.map((review: any) => (
          <ReviewCard
            key={review.id}
            review={review}
            overallRating={overallRating}
          />
        ))
      ) : (
        <p>No reviews available.</p>
      )}
       </div>
    </div>
  );
}

export default AllReview;
