"use client";
import React, { useState } from "react";

import TestimonialCard from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

const AllReviews = () => {
  const [value, setValue] = useState("  ");
  return (
    <div className="my-8">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">
          All Reviews{" "}
          <span className="text-base font-normal text-black/60">(451)</span>
        </p>

        <div className="space-x-3">
          <Combobox
            className="w-28 rounded-full bg-ceramic"
            label="Latest"
            options={[
              { value: "High to low", label: "high to low" },
              { value: "Low to High", label: "Low to high" },
            ]}
            value={value}
            onChange={(value) => setValue(value)}
          />
          <Button className="rounded-full px-8">Write a Review</Button>
        </div>
      </div>

      <>
        <div className="mt-6 grid grid-cols-2 gap-8">
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
    </div>
  );
};

export default AllReviews;
