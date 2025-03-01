import Star from "@/assets/icons/star";
import { cn } from "@/lib/utils";
import React from "react";

//----------------------------------------------

type TProps = {
  rating: number;
  className?: string;
  size?: "small" | "medium";
};

//----------------------------------------------

const StarRating = ({ rating, className, size = "small" }: TProps) => {
  // values

  const Whole = Math.floor(rating);
  const fraction = Number((rating % 1).toFixed(1));

//----------------------------------------------

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex">
        {new Array(Whole).fill(0).map((_val, idx) => {
          return <Star size={size} key={idx} score={1} />;
        })}
        {fraction > 0 && <Star size={size} score={fraction} />}
      </div>

      <p className="text-sm tracking-widest">
        {rating}/<span className="text-black/70">5</span>
      </p>
    </div>
  );
};

export default StarRating;
