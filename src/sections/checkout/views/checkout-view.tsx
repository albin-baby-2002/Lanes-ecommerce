"use client";
import BreadCrumb from "@/components/breadcrumb";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ExistingAddresses from "../existing-addresses";
import AddNewAddress from "../add-new-address";
import {
  getAllUserAddress,
  getUserCartData,
  placeOrder,
} from "@/lib/actions/client";
import { useEffect, useState } from "react";
import { billingAddresses } from "@/drizzle/schema";
import { TcartItems } from "@/sections/cart/views/cart-view";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

//----------------------------------------------------------------------------------

export type TAddress = typeof billingAddresses.$inferSelect;

//----------------------------------------------------------------------------------

const CheckoutView = () => {
  const router = useRouter();

  const [addresses, setAddresses] = useState<TAddress[] | null>(null);

  const [cartItems, setCartItems] = useState<TcartItems[] | null>(null);

  const [loadingAddressess, setLoadingAddressess] = useState(true);

  const [loadingCartItems, setLoadingCartItems] = useState(true);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const total =
    cartItems?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0) || 0;

  const totalDiscount =
    cartItems?.reduce((acc, item) => {
      return acc + (item.price * item.quantity * (item.discount || 0)) / 100;
    }, 0) || 0;

  const deliveryFee = 15;

  const GrandTotal = total - totalDiscount + deliveryFee;

  useEffect(() => {
    async function fetchAddresses() {
      setLoadingAddressess(true);

      let resp = await getAllUserAddress();

      setAddresses(resp.data);

      setLoadingAddressess(false);
    }

    fetchAddresses();
  }, []);

  useEffect(() => {
    async function fetchCartItems() {
      setLoadingCartItems(true);

      const resp = await getUserCartData();
      const data = resp.data as unknown as TcartItems[];

      setCartItems(data);

      setLoadingCartItems(false);
    }

    fetchCartItems();
  }, []);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handlePlaceOrder = async () => {
    try {
      setSubmitting(true);

      if (!selectedAddress) {
        toast.error("Please select an address to place the order");
        setSubmitting(false);
        return;
      }

      const resp = await placeOrder(selectedAddress);

      if (!resp.success) {
        toast.error(resp.message);
        setSubmitting(false);
        return;
      }

      toast.success("Order Placed Successfully");

      setSubmitting(false);
      router.push("/orders");
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)]">
      <BreadCrumb routes={["Home", "Cart", "CheckOut"]} />

      <p className="font-integral_cf text-2xl font-bold tracking-wide">
        CHECKOUT
      </p>

      <div className="mt-8 flex gap-6">
        <div className="basis-[70%]">
          <Accordion
            className="space-y-4"
            defaultValue="item-1"
            type="single"
            collapsible
          >
            <ExistingAddresses
              loading={loadingAddressess}
              Addressess={addresses}
              selectedAddress={selectedAddress}
              handleOnSelect={handleSelectAddress}
            />

            <AddNewAddress />
          </Accordion>
        </div>
        <div className="h-max min-h-[552px] basis-[30%] border bg-ceramic p-6">
          {loadingCartItems ? (
            <LoadingSkeleton />
          ) : (
            <>
              <p className="border-b border-black pb-4 font-bold">Your Order</p>

              <div className="mt-6 grid gap-4 border-b border-black/20 pb-4">
                <div className="flex font-semibold">
                  <div className="basis-3/4">
                    <p>Product</p>
                  </div>
                  <div className="basis-1/4 text-right">
                    <p>Total</p>
                  </div>
                </div>

                {/* products */}

                {cartItems?.map((item, idx) => {
                  return (
                    <div key={idx} className="flex">
                      <div className="basis-3/4">
                        <p>
                          {item.name} ( {item.quantity} )
                        </p>
                      </div>
                      <div className="basis-1/4 text-right">
                        <p>${item.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex">
                <div className="basis-2/3">
                  <p> Total</p>
                </div>
                <div className="basis-1/3 text-right">
                  <p>${total}</p>
                </div>
              </div>

              <div className="pb-4k mt-4 flex text-red-600">
                <div className="basis-2/3">
                  <p> Discount</p>
                </div>
                <div className="basis-1/3 text-right">
                  <p>${totalDiscount}</p>
                </div>
              </div>

              <div className="mt-4 flex border-b border-black/20 pb-4">
                <div className="basis-2/3">
                  <p> Shipping</p>
                </div>
                <div className="basis-1/3 text-right">
                  <p>${deliveryFee}</p>
                </div>
              </div>

              <div className="mt-4 flex pb-4 font-semibold">
                <div className="basis-2/3">
                  <p> Total</p>
                </div>
                <div className="basis-1/3 text-right">
                  <p>${GrandTotal}</p>
                </div>
              </div>

              <p className="mt-4 text-slate-500">
                Disclaimer: Cancelling the order after 2 days of placing the
                order will attract cancellation charges
              </p>

              <Button
                onClick={handlePlaceOrder}
                className="mt-6 h-auto w-full py-4 text-base font-bold"
              >
                {submitting  && (
                  <Image
                    height={24}
                    width={24}
                    className="mr-2"
                    alt="svg"
                    src={"/loaders/circular-loader.svg"}
                  />
                )}
                Place Your Order
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-6 w-40 bg-black/20" />

      <div className="mt-4 grid grid-cols-2 gap-6 border-y border-black/20 py-4">
        {Array(2)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn("flex w-full", {
                  "justify-between": idx % 2 === 0,
                  "justify-end": idx % 2 === 1,
                })}
              >
                <Skeleton className="h-4 w-[40%] bg-black/20" />
              </div>
            );
          })}

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[80%] bg-black/20" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-1/2 bg-black/20" />
        </div>

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[70%] bg-black/20" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-1/2 bg-black/20" />
        </div>

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[70%] bg-black/20" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-1/2 bg-black/20" />
        </div>

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[80%] bg-black/20" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-1/2 bg-black/20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 border-b border-black/20 py-4">
        {Array(2)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn("flex w-full", {
                  "justify-between": idx % 2 === 0,
                  "justify-end": idx % 2 === 1,
                })}
              >
                <Skeleton className="h-4 w-1/2 bg-black/20" />
              </div>
            );
          })}

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[30%] bg-black/30" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-[25%] bg-black/20" />
        </div>

        <div className={cn("flex w-full")}>
          <Skeleton className="h-4 w-[40%] bg-black/20" />
        </div>

        <div className={cn("flex w-full justify-end")}>
          <Skeleton className="h-4 w-[35%] bg-black/20" />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-5 border-black/20 py-4">
        {Array(2)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn("flex w-full", {
                  "justify-between": idx % 2 === 0,
                  "justify-end": idx % 2 === 1,
                })}
              >
                <Skeleton className="h-5 w-1/2 bg-black/20" />
              </div>
            );
          })}
      </div>

      <Skeleton className="h-8 w-full bg-black/20 px-4" />
    </div>
  );
};
