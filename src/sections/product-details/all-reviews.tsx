"use client";
import React, { useState } from "react";

import TestimonialCard from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import AddReview from "./add-review";

const AllReviews = () => {
  const [value, setValue] = useState("  ");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mb-8 mt-16">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">
          All Reviews{" "}
          <span className="text-base font-normal text-black/60">(451)</span>
        </p>

        <div className="space-x-3">
          <Button onClick={handleOpen} className="rounded-full bg-ceramic px-8 py-6 text-black hover:text-white">
            Write a Review
          </Button>
        </div>
      </div>

      <>
        <div className="mt-10 grid grid-cols-2 gap-8">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="rounded-full px-8 py-6" variant={"outline"}>
            Load More Reviews
          </Button>
        </div>
      </>
      <AddReview open={open} handleClose={handleClose}/>
    </div>
  );
};

export default AllReviews;
