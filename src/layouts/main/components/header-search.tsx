"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({className}:{className?:string}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("name") || "");

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.key === "Enter";

    const params = new URLSearchParams(searchParams.toString());
    params.set("name", search);

    if (isEnter) router.push("/search?" + params.toString());
  };

  return (
    <div className={cn(" flex max-w-[600px] grow items-center gap-4 rounded-3xl bg-slate-200 px-4 py-2.5",className)}>
      <IoSearch />

      <input
        className="bg-slate-200 text-sm outline-none placeholder:text-sm focus-within:bg-slate-200"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  );
};

export default Search;
