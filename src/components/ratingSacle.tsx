"use client";
import React, { useState } from 'react';

const RatingScale: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (

    <div className="rating-scale">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`rating-box ${index < rating ? 'rated' : ''}`}
          style={{ backgroundColor: index < rating ? 'rgb(81, 120, 255)' : 'white' }}
          onClick={() => handleRatingClick(index + 1)}
        >
          {index + 1}
        </div>
      ))}
      <style>{`
        .rating-scale {
          display: flex;
          align-items: center;
        }
        .rating-box {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 5px;
          cursor: pointer;
        }
        .rated {
          background-color: rgb(81, 120, 255);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default RatingScale;
