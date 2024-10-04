import React from "react";
import Header from "./header";
import SideBar from "./sidebar";

interface TProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex h-[calc(100vh-75px)]">
        <SideBar />
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
