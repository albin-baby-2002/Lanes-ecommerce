import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import HeaderContainer from "./components/header-container";
import Search from "./components/header-search";

//--------------------------------------------------------------------------------

const links = [
  { href: "/search", label: "Shop" },
  { href: "/search", label: "On Sale" },
  { href: "/search", label: "New Arrivals" },
  { href: "/search", label: "Brands" },
];

const Header = () => {
  return (
    <HeaderContainer>
      <div className="flex grow items-center gap-10">
        <Link href={"/"}>
          <Image
            src="/logos/lanes.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-[22px] w-fit"
          />
        </Link>

        <div className="flex items-center gap-8 text-sm">
          {links.map((link, idx) => {
            return (
              <Link href={link.href} key={idx} className="hover:underline">
                {link.label}
              </Link>
            );
          })}
        </div>

        <Search />
      </div>

      <div className="flex items-center gap-5">
        <Link href={'/cart'}>
          <PiShoppingCart size={"24px"} color="black" />
        </Link>

        <AccountDropDown />
      </div>
    </HeaderContainer>
  );
};

export default Header;

//child components

const AccountDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaRegUserCircle size={"22px"} color="black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
