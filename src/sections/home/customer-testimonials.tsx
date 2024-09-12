"use client"
import TestimonialCard from "@/components/testimonial-card";
import React, { useRef } from "react";

const CustomerTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-14">
      <h2 className="px-10 font-integral_cf text-3xl font-bold tracking-wide">
        OUR HAPPY CUSTOMERS
      </h2>

      <div ref={containerRef} className="mt-10 overflow-hidden">
        <ul className="animate-scroll flex gap-10">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </ul>
      </div>
    </div>
  );
};

export default CustomerTestimonials;

