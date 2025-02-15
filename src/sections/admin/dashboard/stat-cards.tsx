import React from "react";
import { LucideIcon } from "lucide-react";
import {
  DollarSign,
  Package,
  ShoppingCartIcon,
  UsersRound,
} from "lucide-react";

//-----------------------------------------------------------

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeTimeframe: string;
  icon: LucideIcon;
}

//-----------------------------------------------------------

const dashboardStats = [
  {
    title: "Total Users",
    value: "+2,350",
    change: "+20%",
    changeTimeframe: "month",
    icon: UsersRound,
  },
  {
    title: "Cumulative Sales",
    value: "+1,12,350",
    change: "+10%",
    changeTimeframe: "month",
    icon: DollarSign,
  },
  {
    title: "Completed Orders",
    value: "+1,150",
    change: "+30%",
    changeTimeframe: "month",
    icon: ShoppingCartIcon,
  },
  {
    title: "Active Orders",
    value: "+350",
    change: "+10%",
    changeTimeframe: "day",
    icon: Package,
  },
];

//-----------------------------------------------------------

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatCards;

//-----------------------------------------------------------

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeTimeframe,
  icon: Icon,
}) => (
  <div className="flex shadow-sm flex-col gap-3 rounded-xl border border-black/10 bg-white p-6">
    <div className="flex items-center justify-between">
      <p className="font-semibold text-black/80">{title}</p>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[26px] font-bold">{value}</p>
      <p className="pt-1 text-xs text-black/50">
        {change} from last {changeTimeframe}
      </p>
    </div>
  </div>
);
