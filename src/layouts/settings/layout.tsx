"use client"
import React, { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";

//--------------------------------------------------------------------------------

interface TProps {
  children: React.ReactNode;
}

//--------------------------------------------------------------------------------

const SettingsLayout: React.FC<TProps> = ({ children }) => {
  // hooks

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

//--------------------------------------------------------------------------------

  return (
    <div className="flex max-h-screen w-full flex-col overflow-hidden">
      <Header toggleMenu={toggleMobileMenu} />
      <div className="flex">
        <SideBar showMobileMenu={showMobileMenu} />
        <div className="max-h-[calc(100vh-75px)] grow overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
