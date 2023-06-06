import React from "react";
import { HeroSection, FeatureProducts } from "../../components/index";
import "./HomePage.css";
import "../../components/FeatureProducts/FeatureProducts.css";

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureProducts />
    </div>
  );
};
