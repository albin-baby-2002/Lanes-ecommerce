import { cn } from "@/lib/utils";
import { useMemo } from "react";

//--------------------------------------------------

interface TProps {
  price: number;
  discount: number;
  className?: string;
}

//--------------------------------------------------

export const Pricing = ({ price, discount, className }: TProps) => {
  const discountedPrice = useMemo(
    () => price - (price * discount) / 100,
    [price, discount],
  );

//--------------------------------------------------

  return (
    <div className={cn("mt-2 flex items-center gap-3 text-base", className)}>
      <p className="font-bold">${discount ? discountedPrice : price}</p>
      {discount > 0 && (
        <>
          <p className="font-bold text-black/40 line-through">${price}</p>
          <div className="flex items-center rounded-xl bg-red-100 px-2 text-red-500">
            <p className="text-[10px] leading-5">-{discount}%</p>
          </div>
        </>
      )}
    </div>
  );
};
