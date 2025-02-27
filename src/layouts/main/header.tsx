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
import { Menu, SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

//--------------------------------------------------------------------------------

const links = [
  { href: "/search", label: "Shop" },
  { href: "/orders", label: "Orders" },
  { href: "/search", label: "New Arrivals" },
  { href: "/search", label: "Top Selling" },
];

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { permissions, user, isAuthenticated } = useKindeBrowserClient();

  const isAdmin = permissions?.permissions?.includes("admin:permission");

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  return (
    <HeaderContainer>
      <div className="flex grow items-center gap-3 lg:gap-10">
        <GiHamburgerMenu className="lg:hidden cursor-pointer" onClick={toggleMobileMenu} size={28} />
        <Link href={"/"}>
          <Image
            src="/logos/lanes.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-[22px] w-fit"
          />
        </Link>

        <div className="hidden items-center  gap-6 xl:gap-8 text-sm lg:flex">
          {links.map((link, idx) => {
            return (
              <Link href={link.href} key={idx} className="hover:underline">
                {link.label}
              </Link>
            );
          })}
        </div>

        <Search className="hidden lg:flex" />
      </div>

      <div className="flex items-center gap-5">
        <Link href={"/search"} className="lg:hidden">
          <IoSearch size={"24px"} color="black" />
        </Link>

        <Link href={"/cart"}>
          <PiShoppingCartBold size={"24px"} color="black" />
        </Link>

        <AccountDropDown authenticated={isAuthenticated!} />

        {isAdmin && (
          <Link
            href={"/admin"}
            className="hidden rounded-sm border-2 border-black p-1 px-2 lg:block"
          >
            <p className="text-sm">Admin</p>
          </Link>
        )}
      </div>

      {/* mobile nav menu */}

      <div className={cn(" transition-all ease-in  bg-transparent  duration-300 -translate-x-[100%] lg:hidden absolute left-0 top-0 z-50 min-h-screen w-screen ",{
        "translate-x-0 bg-black/30":showMobileMenu,
      })}>
        <div className="relative min-h-screen max-w-[80%] bg-white p-3">
          <div onClick={toggleMobileMenu} className="absolute -right-12 top-[38px] flex justify-end text-white shadow-2xl">
            <X size={30} strokeWidth={3} className="cursor-pointer" />
          </div>

          <div className="p-5">
            <Search />

            <div className="flex flex-col gap-8 py-8 text-xl font-bold">
              <Link href={"/cart"} className="hover:underline">
                Shopping Cart
              </Link>

              <Link href={"/settings/profile"} className="hover:underline">
                Settings
              </Link>

              {links.map((link, idx) => {
                return (
                  <Link href={link.href} key={idx} className="hover:underline">
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
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
