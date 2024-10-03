import Image from "next/image";
import React from "react";

import ProfileForm from "../profile-form";
import { icons, UserCircle } from "lucide-react";
import { TbClipboardCheck, TbHomeEdit, TbHomeMove, TbLock, TbSearch, TbShoppingCart } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Tabs = [
  { label: "User Profile", link: "", icon: <UserCircle size={22} /> },
  { label: "Address", link: "", icon: <TbHomeEdit size={22} /> },
  { label: "Password", link: "", icon: <TbLock size={22} /> },
];

const Navigation = [
  { label: "Lanes Home", link: "", icon: <TbHomeMove size={22} /> },
  { label: "Search", link: "", icon: <TbSearch size={22} /> },
  { label: "Shopping Cart", link: "", icon: <TbShoppingCart size={22} /> },
  { label: "Checkout", link: "", icon: <TbClipboardCheck size={22} /> },
];
const ProfileView = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex items-center justify-between border-b px-8 py-4">
        <Image
          src="/logos/lanes.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="h-[22px] w-fit"
        />
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="bg-black text-white">C</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex h-[calc(100vh-75px)]">
        <div className="w-[280px] border-r px-2 pr-1 pt-10">
          <p className="font-Inter mb-3 px-6 text-[14px] font-semibold text-black/50">
            Main Menu
          </p>
          <div className="font-Inter mx-3 mt-2 grid gap-1 text-[15px] text-black/70">
            {Tabs.map((tab, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-sm px-3 py-[14px] font-semibold text-black/80 hover:bg-ceramic"
                >
                  {tab.icon}
                  <p> {tab.label} </p>
                </div>
              );
            })}

            <div className="flex items-center gap-3 rounded-lg px-2 py-2"></div>
          </div>
          <p className="font-Inter mb-3 px-6 text-[14px] font-semibold text-black/50">
          Navigation
          </p>
          <div className="font-Inter mx-3 mt-2 grid gap-1 text-[15px] text-black/70">
            {Navigation.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-sm px-3 py-[14px] font-semibold text-black/80 hover:bg-ceramic"
                >
                  {item.icon}
                  <p> {item.label} </p>
                </div>
              );
            })}

            <div className="flex items-center gap-3 rounded-lg px-2 py-2"></div>
          </div>
        </div>
        <div className="grow">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
