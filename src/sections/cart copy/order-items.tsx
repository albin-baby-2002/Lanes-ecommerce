"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { TOrderItem } from "@/lib/db-services/products";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { cancelOrder } from "@/lib/actions/client";
import { toast } from "sonner";

// Main OrderItems component

const OrderItems = ({ items }: { items: TOrderItem[] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="mt-8 h-auto min-h-[60vh] w-full rounded-3xl border border-black/10 p-6">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <ShoppingBag size={52} />
          <p className="text-[26px] font-bold">
            You haven&apos;t placed any orders yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-max w-full grid-cols-2 gap-6 rounded-3xl">
      {items.map((item, idx) => (
        <OrderItemCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default OrderItems;

// Child OrderItemCard component

const OrderItemCard = ({ item }: { item: TOrderItem }) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleCancelOrder = async (id: string) => {
    try {
      setSubmitting(true);
      let resp = await cancelOrder(id);

      if (!resp.success) {
        setSubmitting(false);
        return toast.error(resp.message);
      }

      toast.success(resp.message);
      router.refresh();
    } catch (error) {
      toast.error("Unexpected error! Try Again!");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full justify-between rounded-2xl border border-black/10 p-6">
      <div className="flex gap-4">
        <div className="relative size-32">
          <Image
            className="h-36 rounded-2xl object-cover"
            fill
            src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${item.imgUrls[0]}`}
            alt="product"
          />
        </div>

        <div className="flex flex-col text-black/60">
          <div className="space-y-[6px]">
            <p className="text-xl font-bold text-black">{item.name}</p>
            <p className="text-[17px] font-medium tracking-wide">
              Quantity: {item.quantity}
            </p>
            <p className="text-[17px] font-medium tracking-wide">
              Total: Rs.{item.total}
            </p>
            <p className="text-[17px] tracking-wide">
              Order Date: {new Date(item.orderDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between font-bold text-black">
        <div className="flex gap-1 pt-[3.5px]">
          <span className="uppercase">Shipping: </span>
          <span className="uppercase">
            {item.shippingStatus?.toLowerCase()}
          </span>
        </div>

        <Button
          onClick={() => handleCancelOrder(item.orderItemId)}
          className={cn(
            "rounded-full bg-gray-100 px-8 py-5 font-Inter font-semibold hover:border-red-500 hover:text-red-600",
            {
              "bg-black text-white":  submitting,
            }
          )}
          variant="outline"
        >
          {submitting && (
            <Image
              height={24}
              width={24}
              className="mr-2"
              alt="svg"
              src="/loaders/circular-loader.svg"
            />
          )}
          Cancel
        </Button>
      </div>
    </div>
  );
};