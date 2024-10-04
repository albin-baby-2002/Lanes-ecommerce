"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TProps {
  tab: { label: string; path: string; icon: React.JSX.Element };
}
const Tab: React.FC<TProps> = ({ tab }) => {
  const path = usePathname();
  return (
    <Link
    href={tab.path}
      className={cn(
        "flex items-center gap-3 rounded-sm px-3 py-[14px] font-semibold text-black/80 hover:bg-ceramic",
        {
          "bg-ceramic": path === tab.path,
        },
      )}
    >
      {tab.icon}
      <p> {tab.label} </p>
    </Link>
  );
};

export default Tab;
