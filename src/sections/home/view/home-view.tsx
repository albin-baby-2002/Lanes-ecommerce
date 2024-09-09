import React from "react";
import HeroSection from "../hero-section";
import LatestProducts from "../latest-products";
import TopSelling from "../top-selling";
import BrowseByStyle from "../browse-by-style";
import CustomerTestimonials from "../customer-testimonials";

const HomeView = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <LatestProducts />

      <TopSelling />
      
      <BrowseByStyle/>
      
      <CustomerTestimonials/>
    </div>
  );
};

export default HomeView;
