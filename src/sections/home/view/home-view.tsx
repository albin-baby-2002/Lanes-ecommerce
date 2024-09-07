import React from "react";
import HeroSection from "../hero-section";
import LatestProducts from "../latest-products";
import TopSelling from "../top-selling";
import BrowseByStyle from "../browse-by-style";

const HomeView = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <LatestProducts />

      <TopSelling />
      
      <BrowseByStyle/>
    </div>
  );
};

export default HomeView;
