import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import {
  PiAddressBookBold,
  PiUserSquare,
  PiUserSquareBold,
} from "react-icons/pi";
import ProfileForm from "../profile-form";
import { UserCircle, UserSquareIcon } from "lucide-react";
import { RiHomeOfficeLine } from "react-icons/ri";
import { TbHomeEdit } from "react-icons/tb";
const Tabs = [
  { label: "Profile", link: "" },
  { label: "Address", link: "" },
  { label: "Password", link: "" },
];

const ProfileView = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[310px] bg-neutral-50 py-8 pl-[28px] pr-8">
        <div className="pb-6 pt-3">
          <Image
            src="/logos/lanes.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-[18px] w-fit"
          />
        </div>

        {/* <div className=" items-center flex gap-4 py-4">
          <div className="relative size-10 rounded-xl">
            <Image
              src={"/images/avatar.svg"}
              fill
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <p className="text-xl font-bold">Aleen John</p>
            <p className="text-xs font-bold text-black/40">#LUSID24KJKJ</p>
          </div>
        </div> */}
        {/* <p className="text-sm font-bold text-black/70">USER DETAILS</p> */}
        <div className="mt-2 grid gap-3">
          <div className="text-large flex items-center gap-3 rounded-xl border bg-white/80 px-[14px] py-[14px] font-semibold shadow-2xl">
            {" "}
            <UserCircle size={22} />
            <p>Profile </p>
          </div>

          <div className="text-large flex items-center gap-3 rounded-xl   px-[14px] py-[14px] font-semibold ">
            <TbHomeEdit size={22} />
            <p>Address</p>
          </div>

          <div className="flex items-center gap-3 rounded-lg px-2 py-2"></div>
        </div>
      </div>
      <div className="grow ">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfileView;
