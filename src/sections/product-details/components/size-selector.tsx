"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface TProps {
  sizes: string[];
}
const SizeSelector: React.FC<TProps> = ({ sizes }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("size", size);

    router.push(pathname + "?" + params);
  };

  return (
    <div className="border-b py-4 text-lg text-black/60">
      <p>Choose Size</p>
      <div className="mt-4 flex gap-3">
        {sizes.map((size, idx) => {
          return (
            <div
              key={idx}
              onClick={()=>handleSizeChange(size)}
              className={cn(
                "rounded-3xl bg-ceramic px-6 py-2 text-lg text-black/70",
                {
                  "bg-black text-white":
                    searchParams.get("size")?.toLowerCase() ===
                    size.toLowerCase(),
                },
              )}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
