"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
 const router = useRouter()

  const [search, setSearch] = useState("");

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.key === "Enter";

    if (isEnter) router.push('/search')
  };

  return (
    <div className="flex max-w-[600px] grow items-center gap-4 rounded-3xl bg-slate-200 px-4 py-2.5">
      <IoSearch />

      <input
        className="bg-slate-200 focus-within:bg-slate-200 text-sm outline-none placeholder:text-sm"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  );
};

export default Search;
