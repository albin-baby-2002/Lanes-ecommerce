import React from "react";
import StatCards from "../stat-cards";
import { SalesChart } from "../sales-chart";
import { SalesAndProfitChart } from "../sales-profit-chart";
import { UsersChart } from "../users-chart";
import { OrdersChart } from "../orders-chart";

const DashboardView = () => {
  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-8">
      <h1 className="font-Inter text-2xl font-bold">Admin Dashboard</h1>
      <StatCards />
      <div className="grid grid-cols-2 gap-4">
        <SalesChart />
        <SalesAndProfitChart />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <UsersChart />
        <OrdersChart/>
      </div>
    </div>
  );
};

export default DashboardView;
