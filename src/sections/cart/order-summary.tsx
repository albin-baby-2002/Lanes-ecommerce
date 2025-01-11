import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TcartItems } from "./views/cart-view";
import Link from "next/link";

const OrderSummary = ({ items }: { items: TcartItems[] }) => {
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalDiscount = items.reduce((acc, item) => {
    return acc + (item.price * item.quantity * (item.discount || 0)) / 100;
  }, 0);

  const deliveryFee = 15;

  const GrandTotal = total - totalDiscount + deliveryFee;

  return (
    <div className="h-max basis-2/5 rounded-3xl border border-black/10 p-6 pb-10">
      <p className="pb-4 text-2xl font-bold"> Order Summary</p>

      <div className="space-y-3 border-b pb-5">
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Subtotal</p>
          <p className="font-bold">${total}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Discount</p>
          <p className="font-bold text-red-500">-${totalDiscount}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Delivery Fee</p>
          <p className="font-bold">${deliveryFee}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-lg">
        <p className="tracking-wide text-black/60">Total</p>
        <p className="font-bold">${GrandTotal}</p>
      </div>

      {/* <div className="mt-4 flex items-center gap-3">

        <div className="flex grow items-center gap-2 rounded-full bg-ceramic px-4 py-3">
          <MdOutlineLocalOffer className="text-black/60" size={24} />
          <input
            className="bg-inherit text-lg"
            type="text"
            placeholder="Add promo code"
          />
        </div>

        <Button className="m-0 h-12 min-h-full rounded-full px-10">
          Apply
        </Button>
      </div>
 */}
      <Link href="/checkout">
        <Button className="m-0 mt-8 h-12 w-full rounded-full py-7">
          Go to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummary;
