import React from "react";
import Header from "./header";
import Footer from "./footer";

interface TProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      {children}
      <Footer/>
    </div>
  );
};

export default MainLayout;
