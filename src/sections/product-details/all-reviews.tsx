"use client";
import React, { useState } from "react";

import TestimonialCard from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import AddReview from "./add-review";
import { productReviews } from "@/drizzle/schema";
import { MessageSquareText, ShoppingBag } from "lucide-react";

export type TReview = {
  productReviewId?: string | null;
  userId?: string | null;
  rating: number | null;
  review: string | null;
  firstName: string | null;
  lastName: string | null;
};

const AllReviews = (props: { variantId: string; reviews: TReview[] }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mb-8 mt-16">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">
          All Reviews{" "}
          <span className="text-base font-normal text-black/60">
            ( {props?.reviews?.length} )
          </span>
        </p>

        <div className="space-x-3">
          <Button
            onClick={handleOpen}
            className="rounded-full bg-ceramic px-8 py-6 text-black hover:text-white"
          >
            Write a Review
          </Button>
        </div>
      </div>

      {!props.reviews ||
        (props.reviews.length === 0 && (
          <div className="mt-8 h-auto min-h-[60vh] items-center flex justify-center w-full rounded-3xl border border-black/10 p-6">
            <div className="flex  flex-col items-center justify-center gap-4">
              <MessageSquareText size={52} />

              <p className="text-[28px] capitalize  font-bold">
                No reviews available
              </p>

              <p className="text-[20px] capitalize  font-semibold text-black/60">
                Be the first to review this product and help others
              </p>
            </div>
          </div>
        ))}

      <>
        <div className="mt-10 grid grid-cols-2 gap-8">
          {props.reviews.map((review, idx) => {
            return <TestimonialCard review={review} key={idx} />;
          })}
        </div>

        {/* <div className="mt-6 flex justify-center">
          <Button className="rounded-full px-8 py-6" variant={"outline"}>
            Load More Reviews
          </Button>
        </div> */}
      </>
      <AddReview
        variantId={props.variantId}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AllReviews;
