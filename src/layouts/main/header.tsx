import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="contain sticky top-0 z-50 px-20 flex items-center justify-between gap-10 py-6 bg-white">
      <div className="flex grow items-center gap-10">
        <Image
          src="/logos/lanes.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="h-6 w-fit"
        />

        <div className="flex items-center gap-6">
          <Link href={"/"}>Shop</Link>
          <Link href={"/"}>On Sale</Link>
          <Link href={"/"}>New Arrivals</Link>
          <Link href={"/"}>Brands</Link>
        </div>

        <div className="flex max-w-[600px] grow items-center gap-4 rounded-3xl bg-slate-200 px-4 py-2.5">
          <IoSearch />

          <input
            className="bg-slate-200 outline-none"
            placeholder="Search for products..."
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <PiShoppingCart size={"24px"} color="black" />
        <FaRegUserCircle size={"22px"} color="black" />
      </div>
    </div>
  );
};

export default Header;
