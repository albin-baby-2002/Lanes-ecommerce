"use client"
import StarRating from "@/components/star-rating";
import React, { useRef } from "react";
import { IoMdCheckmark } from "react-icons/io";

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

const TestimonialCard = () => {
  return (
    <div className="min-h-[240px] min-w-[400px] space-y-3 rounded-xl border border-black/10 p-8">
      <div className="flex items-center gap-3">
        <p className="text-xl font-bold">Sarah M</p>

        <div className="flex size-6 items-center justify-center rounded-[50%] bg-green-450">
          <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
        </div>
      </div>

      <p className="text-black/60">
        &quot; I&apos;m blown away by the quality and style of the clothes I
        received from Shop.co. From casual wear to elegant dresses, every piece
        I&apos;ve bought has exceeded my expectations.&quot;
      </p>

      <StarRating rating={5} />
    </div>
  );
};
