"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface TProps {
  children: React.ReactNode;
}

const ProviderLayout: React.FC<TProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderLayout;
