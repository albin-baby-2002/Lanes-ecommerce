import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { PiAddressBookBold } from "react-icons/pi";

const Tabs = [
  { label: "Profile", link: "" },
  { label: "Address", link: "" },
  { label: "Password", link: "" },
];
const Profile = () => {
  return (
    <div className="flex  h-[calc(100vh-90px)] w-full gap-7 p-8">
      <div className="min-h-40 w-80 rounded-xl bg-white p-4">
        <div className="m-2 flex gap-4 pb-4">
          <div className="relative h-[70px] w-16 rounded-xl">
            <Image
              src={"/images/avatar.svg"}
              fill
              alt="avatar"
              className="rounded-xl object-cover"
            />
          </div>

          <div>
            <p className="text-2xl font-bold">Aleen John</p>
            <p className="text-sm font-bold text-black/40">#LUSID24KJKJ</p>
          </div>
        </div>
        <p className="p-2 font-bold text-black/70">USER DETAILS</p>
        <div className="grid gap-1">
          <div className="flex items-center gap-3 rounded-lg bg-ceramic px-2 py-2">
            {" "}
            <FaRegUser />
            <p>Profile </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <PiAddressBookBold />
            <p>Address</p>
          </div>
        </div>
      </div>
      <div className= " border-l   px-4 grow bg-white ">asdfs</div>
    </div>
  );
};

export default Profile;
