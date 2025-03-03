import Star from "@/assets/icons/star";
import React, { useState } from "react";

interface TProps {
  rating: number;
  setRating: (val: number) => void;
}
const RatingInput: React.FC<TProps> = ({ rating, setRating }) => {
  const [ratingHover, setRatingHover] = useState(0);
  return (
    <div className="flex gap-1 pb-2">
      {new Array(5).fill(0).map((_, idx) => {
        return (
          <div
          key={idx}
            onClick={() => setRating(idx + 1)}
            onMouseEnter={() => setRatingHover(idx + 1)}
            onMouseLeave={() => setRatingHover(0)}
          >
            <Star
              key={idx}
              size="large"
              score={1}
              fill={
                rating >= idx + 1 || ratingHover >= idx + 1 ? "" : "#f2e8c1"
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingInput;
