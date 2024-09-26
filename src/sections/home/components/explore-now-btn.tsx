import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

interface TProps {
  href:Url
}
const ExploreNow:React.FC<TProps> = ({href}) => {
  return (
    <Link href={href}>
    <div className="flex items-center gap-2 rounded-2xl bg-ceramic px-5 py-3.5">
      <p className="pb-[2px] text-sm">Explore now</p>
      <MdOutlineArrowCircleRight size={"24px"} />
    </div>
    </Link>
  );
};

export default ExploreNow;
