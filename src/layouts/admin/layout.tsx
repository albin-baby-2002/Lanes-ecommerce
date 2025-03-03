"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBox, FaHome, FaLayerGroup, FaSearch } from "react-icons/fa";
import { FaCartShopping, FaMoneyBills, FaUserGroup } from "react-icons/fa6";
import { IoExitSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiShoppingBagFill } from "react-icons/pi";

//----------------------------------------------------------------------------------

interface TProps {
  children: React.ReactNode;
}

interface TLink {
  label: string;
  icon: React.JSX.Element;
  path: string;
}

//----------------------------------------------------------------------------------

const Links = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard size={18} />,
    path: "/admin",
  },
  {
    label: "Users",
    icon: <FaUserGroup size={18} />,
    path: "/admin/users",
  },
  {
    label: "Products",
    icon: <FaBox />,
    path: "/admin/products",
  },
  {
    label: "Categories",
    icon: <FaLayerGroup />,
    path: "/admin/categories",
  },
  {
    label: "Orders",
    icon: <FaCartShopping />,
    path: "/admin/orders",
  },
];

const Navigation = [
  {
    label: "Home",
    icon: <FaHome />,
    path: "/",
  },
  {
    label: "Search",
    icon: <FaSearch />,
    path: "/",
  },
  {
    label: "Cart",
    icon: <PiShoppingBagFill />,
    path: "/",
  },
  {
    label: "Checkout",
    icon: <IoExitSharp />,
    path: "/",
  },
];

//----------------------------------------------------------------------------------

const AdminLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <div className="border-r bg-yellow-200 md:bg-white lg:min-w-[300px]">
        <div className="px-6 py-8">
          <Link href={"/"}>
            <Image
            unoptimized
              src="/logos/lanes.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="h-[25px] w-fit"
            />
          </Link>
        </div>

        {/* navigations */}

        <div className="px-4">
          <p className="px-2 text-[15px] font-bold text-gray-400">MANAGEMENT</p>
          <div className="mt-3 flex flex-col gap-1">
            {Links.map((link, idx) => (
              <NavItem key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="mt-4 px-4">
          <p className="px-2 text-[15px] font-bold text-gray-400">NAVIGATION</p>
          <div className="mt-3 flex flex-col gap-1">
            {Navigation.map((link, idx) => (
              <NavItem key={idx} link={link} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-h-screen grow overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;

// child component

const NavItem = ({ link }: { link: TLink }) => {
  const pathname = usePathname();

  return (
    <Link href={link.path}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 hover:bg-slate-100",
          {
            "bg-slate-100 text-black": pathname === link.path,
          },
        )}
      >
        {link.icon}
        <p className="font-Inter text-[16px] font-semibold">{link.label}</p>
      </div>
    </Link>
  );
};
