"use client";

//----------------------------------------------------------

import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";

//----------------------------------------------------------
const DashboardSearch = () => {
  // hook

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // functions

  const updateSearchParams = (newSearch: string) => {
    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    return params;
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const params = updateSearchParams(search);
    router.replace(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const params = updateSearchParams(search);
      router.replace(`${pathName}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [search, router, pathName, searchParams]);

//----------------------------------------------------------

  return (
    <div className="flex grow items-center rounded-md border border-gray-200 bg-white px-4 focus-within:border-black focus-within:bg-ceramic">
      <FaSearch className="text-gray-400" />
      <input
        className="ml-2 w-full border-none py-3 font-Inter text-[15px] outline-none focus:border-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleEnter}
        placeholder="Search "
      />
    </div>
  );
};

export default DashboardSearch;
