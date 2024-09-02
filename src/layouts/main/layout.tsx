import React from "react";
import Header from "./header";

interface TProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
