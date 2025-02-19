"use client";
import TestimonialCard from "@/components/testimonial-card";
import React, { useRef } from "react";
import { TReview } from "../product-details/all-reviews";

const CustomerTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const data: TReview[] = [
    {
      review:
        "I love the quality of the product. It's worth the price and it has exceeded my expectations in terms of performance. The design is also sleek and modern.",
      rating: 5,
      firstName: "John",
      lastName: "Doe",
    },
    {
      review:
        "The product is decent, but I feel the price is a bit high for what it offers. It's not a bad purchase, but I would expect more features at this price range.",
      rating: 3,
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      review:
        "Absolutely fantastic! The quality is top-notch and it arrived ahead of time. I am truly impressed with how well it works. Will definitely buy again.",
      rating: 5,
      firstName: "Michael",
      lastName: "Johnson",
    },
    {
      review:
        "I'm really happy with my purchase. The color is exactly as shown in the pictures, and the material feels premium. It's worth every penny.",
      rating: 4,
      firstName: "Emily",
      lastName: "Davis",
    },
    {
      review:
        "Not bad, but the product didn't meet all of my expectations. It performs okay, but there are some minor issues that could be improved for the next version.",
      rating: 3,
      firstName: "Chris",
      lastName: "Brown",
    },
    {
      review:
        "The product works well for its intended purpose. I was a bit skeptical at first, but it's been reliable. The quality could be improved a bit, but overall good value for money.",
      rating: 4,
      firstName: "Linda",
      lastName: "Martinez",
    },
    {
      review:
        "Disappointed with my purchase. The product broke down after just a few uses, and the customer service was not very helpful. Would not recommend.",
      rating: 1,
      firstName: "David",
      lastName: "Garcia",
    },
    {
      review:
        "Great product! I've been using it for a while now, and it works just as advertised. It has really helped me with my daily tasks. Highly recommend it to others.",
      rating: 5,
      firstName: "Sarah",
      lastName: "Wilson",
    },
    {
      review:
        "The product arrived late, and when it did, it was not in the condition I expected. It was scratched and had some minor defects, but it was still disappointing.",
      rating: 2,
      firstName: "Robert",
      lastName: "Moore",
    },
    {
      review:
        "I purchased this product as a gift, and the recipient loved it! The build quality is great, and it was very easy to set up. A great addition to any home.",
      rating: 4,
      firstName: "Sophia",
      lastName: "Taylor",
    },
    {
      review:
        "I’m very satisfied with my purchase. The product exceeded my expectations in terms of quality and performance. It’s exactly what I needed, and it looks amazing too.",
      rating: 5,
      firstName: "William",
      lastName: "Anderson",
    },
  ];

  return (
    <div className="mb-14">
      <h2 className="px-10 text-center lg:text-left font-integral_cf text-3xl font-bold tracking-wide">
        OUR HAPPY CUSTOMERS
      </h2>

      <div ref={containerRef} className="mt-10 overflow-hidden">
        <ul className="flex animate-scroll gap-10">
          {data.map((review, idx) => {
            return <TestimonialCard key={idx} review={review} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
