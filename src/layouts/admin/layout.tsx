import Image from "next/image";
import React from "react";
import { FaBox, FaHome, FaLayerGroup, FaSearch, FaUser, FaUsers } from "react-icons/fa";
import { FaCartShopping, FaUserGroup } from "react-icons/fa6";

interface TProps {
  children: React.ReactNode;
}

const Links = [
  {
    label: "Users",
    icon: <FaUserGroup size={18} />,
    path: "/admin",
  },
  {
    label: "Products",
    icon: <FaBox />,
    path: "/admin",
  },
  {
    label: "Categories",
    icon: <FaLayerGroup />,
    path: "/admin",
  },
  {
    label: "Orders",
    icon: <FaCartShopping />,
    path: "/admin",
  },
];

const Navigation = [
  {
    label: "Home",
    icon: <FaHome />,
    path: "/",
  },{
    label: "Search",
    icon: <FaSearch />,
    path: "/",
  },
];
const AdminLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-[300px] border-r">
        <div className="px-6 py-8">
          <Image
            src="/logos/lanes.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-[18px] w-fit"
          />
        </div>

        {/* navigations */}

        <div className="px-4">
          <p className="px-2 text-sm font-bold text-gray-400">MANAGEMENT</p>
          <div className="mt-3">
            {Links.map((link, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-600 hover:bg-slate-100"
                >
                  {link.icon}
                  <p className="text-[15px] font-bold">{link.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" mt-4 px-4">
          <p className="px-2 text-sm font-bold text-gray-400">NAVIGATION</p>
          <div className="mt-3">
            {Navigation.map((link, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-600 hover:bg-slate-100"
                >
                  {link.icon}
                  <p className="text-[15px] font-bold">{link.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grow">{children}</div>
    </div>
  );
};

export default AdminLayout;
