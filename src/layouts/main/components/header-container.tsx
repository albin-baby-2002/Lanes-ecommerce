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
        "contain sticky top-0 z-10  flex items-center justify-between gap-10 bg-white  p-4  lg:px-16 xl:px-20 lg:py-6 py-5",
        showBorderBottom && "border-b",
      )}
    >
      {children}
    </div>
  );
};

export default HeaderContainer;
