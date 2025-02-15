import React from "react";
import StatCards from "../stat-cards";
import { SalesChart } from "../sales-chart";
import { SalesAndProfitChart } from "../sales-profit-chart";

const DashboardView = () => {
  return (
    <div className=" space-y-8 min-h-screen bg-slate-50 p-8">
      <h1 className=" font-Inter text-2xl font-bold">Admin Dashboard</h1>
      <StatCards />
      <div className=" gap-4 grid grid-cols-2">
        <SalesChart />
        <SalesAndProfitChart/>
      </div>
    </div>
  );
};

export default DashboardView;
