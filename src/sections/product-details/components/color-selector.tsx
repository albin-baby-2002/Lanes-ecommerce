"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

export interface TColors {
  label: string;
  color: string;
}

interface TProps {
  colors: TColors[];
}

const ColorSelector: React.FC<TProps> = ({ colors }) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleColorChange = (color: string) => {

    const params = new URLSearchParams(searchParams.toString());

    params.set("color", color);

    router.push(pathname + "?" + params);
  };

  return (
    <div className="border-b py-4 text-lg text-black/60">
      <p>Select colors</p>
      <div className="mt-2 flex gap-3">
        {colors.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => handleColorChange(item.label)}
              className={cn(
                "flex size-8 items-center justify-center rounded-[50%] p-1",
                `bg-[${item.color}]`,
              )}
            >
              <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
