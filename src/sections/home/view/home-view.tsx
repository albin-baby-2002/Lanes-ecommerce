import React from "react";
import HeroSection from "../hero-section";
import LatestProducts from "../latest-products";

const HomeView = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <LatestProducts />
    </div>
  );
};

export default HomeView;
