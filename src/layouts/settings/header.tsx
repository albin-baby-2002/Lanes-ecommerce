import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//--------------------------------------------------------------------------------

interface TProps {
  toggleMenu: () => void;
}

//--------------------------------------------------------------------------------

const Header = ({ toggleMenu }: TProps) => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <Grip
          className="cursor-pointer md:hidden"
          onClick={toggleMenu}
          size={24}
        />

        <Link href={"/"}>
          <Image
            src="/logos/lanes.svg"
            unoptimized
            height={1000}
            width={1000}
            alt="patient"
            className="h-[22px] w-fit"
          />
        </Link>
      </div>
      <Avatar className="size-9 lg:size-10">
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback className="bg-black text-white">C</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
