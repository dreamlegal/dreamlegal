"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Rating } from '@mui/material';
import { MdOutlineDelete } from 'react-icons/md';

function ReviewDetailsAdmin({ id }: any) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/get-reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
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
  }, [id]);

  const handleDelete = async (reviewId: string) => {
    try {
      const response = await fetch("/api/delete-review", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });

      const result = await response.json();

      if (result.success) {
        setReviews(reviews.filter(review => review.id !== reviewId));
      } else {
        setError(result.msg);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.id} review={review} overallRating={overallRating} onDelete={handleDelete} />
      ))}
    </div>
  );
}

function Review({ review, overallRating, onDelete }: any) {
  if (!review || !review.user) {
    return <div>Review data is missing</div>;
  }

  return (
    <div className='flex gap-3 items-center border-b'>
      <div className="my-2">
        <div className="flex gap-4 w-full">
          <Avatar>
            <AvatarImage src={review.user.image || ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-gray-900 font-bold">{review.user.name}</h3>
          </div>
        </div>
        <p className="text-sm text-slate-500 my-2">
          {review.overallExperience || 'No experience provided'}
        </p>
        <div className="flex items-center gap-2">
          <Rating value={overallRating} precision={0.5} readOnly />
        </div>
      </div>
      <div className='ml-auto'>
        <button
          className='flex justify-center gap-3 px-4 py-3 rounded-sm bg-red-500 text-white items-center'
          onClick={() => onDelete(review.id)}
        >
          Delete
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default ReviewDetailsAdmin;
