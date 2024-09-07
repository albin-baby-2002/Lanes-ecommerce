import Star from "@/assets/icons/star";
import { cn } from "@/lib/utils";
import React from "react";

const StarRating = ({ rating ,className}: { rating: number,className?:string }) => {
  const Whole = Math.floor(rating);

  const fraction = Number((rating % 1).toFixed(1));

  return (
    <div className={cn("flex  items-center  gap-2", className)}>
      <div className=" flex">
        {new Array(Whole).fill(0).map((val, idx) => {
          return <Star key={idx} score={1} />;
        })}

        <Star score={fraction} />
      </div>
      
      <p className=" text-sm tracking-widest">{rating}/<span className=" text-black/70">5</span></p>
    </div>
  );
};

export default StarRating;
