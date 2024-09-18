import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex min-h-screen w-full gap-7 bg-black/5 p-11">
      <div className="min-h-40 w-80 rounded-xl bg-white p-4 shadow-xl">
        <div className="m-2 flex gap-4 pb-4">
          <div className=" w-16 h-[70px] relative rounded-xl">
            <Image src={"/images/avatar.svg"} fill alt="avatar" className=" rounded-xl object-cover"/>
          </div>

          <div>
            <p className="text-2xl font-bold">Aleen John</p>
            <p className="text-sm font-bold text-black/40">#LUSID24KJKJ</p>
          </div>
        </div>

        <div className="">

          <div className=" flex  border items-center gap-3 p-3 rounded-xl">
            <FaRegUser/>
            <p>Profile </p>
          </div>
        </div>
      </div>
      <div className="grow bg-white shadow-xl">asdfs</div>
    </div>
  );
};

export default Profile;
