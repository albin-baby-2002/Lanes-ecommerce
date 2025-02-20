import React from "react";

import { UserCircle, X } from "lucide-react";
import {
  TbClipboardCheck,
  TbHomeEdit,
  TbHomeMove,
  TbLock,
  TbSearch,
  TbShoppingCart,
} from "react-icons/tb";
import Tab from "./components/tab";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Tabs = [
  {
    label: "User Profile",
    path: "/settings/profile",
    icon: <UserCircle size={22} />,
  },
  {
    label: "Address",
    path: "/settings/address",
    icon: <TbHomeEdit size={22} />,
  },
  {
    label: "Password",
    path: "/settings/reset-password",
    icon: <TbLock size={22} />,
  },
];

const Navigation = [
  { label: "Lanes Home", path: "/", icon: <TbHomeMove size={22} /> },
  { label: "Search", path: "/search", icon: <TbSearch size={22} /> },
  { label: "Shopping Cart", path: "/cart", icon: <TbShoppingCart size={22} /> },
  {
    label: "Checkout",
    path: "/checkout",
    icon: <TbClipboardCheck size={22} />,
  },
];
const SideBar = ({ showMobileMenu }: { showMobileMenu: boolean }) => {
  return (
    <div
      className={cn(
        "absolute z-50 min-h-screen w-[280px] md:w-[240px] lg:w-[280px] translate-x-0 border-r bg-white px-2 pr-1 pt-10 transition-all duration-500 ease-in md:static",
        { "-translate-x-[100%] md:translate-x-0": !showMobileMenu },
      )}
    >
      <p className="mb-3 px-6 font-Inter text-[14px] font-semibold text-black/50">
        Main Menu
      </p>
      <div className="mx-3 mt-2 grid gap-1 font-Inter text-[15px] text-black/70">
        {Tabs.map((tab, idx) => {
          return <Tab tab={tab} key={idx} />;
        })}

        <div className="flex items-center gap-3 rounded-lg px-2 py-2"></div>
      </div>
      <p className="mb-3 px-6 font-Inter text-[14px] font-semibold text-black/50">
        Navigation
      </p>
      <div className="mx-3 mt-2 grid gap-1 font-Inter text-[15px] text-black/70">
        {Navigation.map((item, idx) => {
          return (
            <Link
              href={item.path}
              key={idx}
              className="flex items-center gap-3 rounded-sm px-3 py-[14px] font-semibold text-black/80 hover:bg-ceramic"
            >
              {item.icon}
              <p> {item.label} </p>
            </Link>
          );
        })}

        <div className="flex items-center gap-3 rounded-lg px-2 py-2"></div>
      </div>
    </div>
  );
};

export default SideBar;
