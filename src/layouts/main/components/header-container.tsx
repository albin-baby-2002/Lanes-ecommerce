"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface TProps {
  children: React.ReactNode;
}
const HeaderContainer: React.FC<TProps> = ({ children }) => {
  const pathname = usePathname();

  const showBorderBottom = pathname !== "/";

  return (
    <div
      className={cn(
        "contain sticky top-0 z-50 flex items-center justify-between gap-10 bg-white px-20 py-6",
        showBorderBottom && "border-b",
      )}
    >
      {children}
    </div>
  );
};

export default HeaderContainer;
