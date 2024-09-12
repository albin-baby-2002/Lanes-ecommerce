import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";

const OrderSummary = () => {
  return (
    <div className="basis-2/5 rounded-3xl border border-black/10 p-6">
      <p className="pb-4 text-2xl font-bold"> Order Summary</p>

      <div className="space-y-3 border-b pb-5">
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Subtotal</p>
          <p className="font-bold">$565</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Discount (-20%)</p>
          <p className="font-bold text-red-500">-$565</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="tracking-wide text-black/60">Delivery Fee</p>
          <p className="font-bold">$55</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-lg">
        <p className="tracking-wide text-black/60">Total</p>
        <p className="font-bold">$565</p>
      </div>

      <div className="mt-4 flex items-center gap-3">
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

      <Button className="m-0 h-12  mt-8 rounded-full w-full py-7 ">Go to Checkout</Button>
    </div>
  );
};

export default OrderSummary;
