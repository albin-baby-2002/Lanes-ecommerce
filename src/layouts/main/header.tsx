"use client";
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
import { PiShoppingCart, PiShoppingCartBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import HeaderContainer from "./components/header-container";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "./components/header-search";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Menu, SearchIcon } from "lucide-react";

//--------------------------------------------------------------------------------

const links = [
  { href: "/search", label: "Shop" },
  { href: "/orders", label: "Orders" },
  { href: "/search", label: "New Arrivals" },
  { href: "/search", label: "Top Selling" },
];

const Header = () => {
  const { permissions, user, isAuthenticated } = useKindeBrowserClient();

  const isAdmin = permissions?.permissions?.includes("admin:permission");

  return (
    <HeaderContainer>
      <div className="flex grow items-center gap-3 lg:gap-10">
        <GiHamburgerMenu size={28}/>
        <Link href={"/"}>
          <Image
            src="/logos/lanes.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-[22px] w-fit"
          />
        </Link>

        <div className="flex hidden items-center gap-8 text-sm">
          {links.map((link, idx) => {
            return (
              <Link href={link.href} key={idx} className="hover:underline">
                {link.label}
              </Link>
            );
          })}
        </div>

        <Search  />
      </div>

      <div className="flex items-center gap-5">


        <Link href={"/search"}>
          <IoSearch size={"24px"} color="black" />
        </Link>

        <Link href={"/cart"}>
          <PiShoppingCartBold size={"24px"} color="black" />
        </Link>

        <AccountDropDown authenticated={isAuthenticated!} />

        {isAdmin && (
          <Link
            href={"/admin"}
            className="rounded-sm hidden md:block border-2 border-black p-1 px-2"
          >
            <p className="text-sm">Admin</p>
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;

//child components

const AccountDropDown = ({ authenticated }: { authenticated: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaRegUserCircle size={"22px"} color="black" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {authenticated ? (
          <>
            {/* profile */}

            <Link href={"/settings/profile"}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>

            {/* logout */}

            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {/* login */}
            <DropdownMenuItem>
              <LoginLink>Login</LoginLink>
            </DropdownMenuItem>

            {/* signUp */}

            <DropdownMenuItem>
              <RegisterLink>SignUp</RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
