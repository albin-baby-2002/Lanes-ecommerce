"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TAddress } from "./views/checkout-view";
import { Skeleton } from "@/components/ui/skeleton";

//-------------------------------------------------------------------------------

const filedsNotTOShow = ["addressId", "userId", "createdAt", "updatedAt"];

const ExistingAddresses = ({
  Addressess,
  selectedAddress,
  handleOnSelect,
  loading,
}: {
  Addressess: TAddress[] | null;
  selectedAddress: string | null;
  handleOnSelect: (addressId: string) => void;
  loading: boolean;
}) => {
  return (
    <AccordionItem value="item-1" className="border px-2 md:px-4">
      <AccordionTrigger className="px-1 font-bold hover:no-underline">
        Billing Addresses
      </AccordionTrigger>
      <AccordionContent className="flex max-h-[420px] w-full flex-wrap gap-3 overflow-y-auto border-t px-2">
        {loading ? (
          <LoadingAddressSkeleton />
        ) : (
          <RadioGroup
            value={selectedAddress || ""}
            onValueChange={(val) => {
              handleOnSelect(val);
            }}
            className="w-full space-y-5 py-4 text-lg"
          >
            {Addressess?.map((address, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full border-t pb-2  first:border-t-0  px-2 lg:px-0 pt-6 first:pt-2 md:space-x-4"
                >
                  <div className=" flex text-[15px] md:ml-4 items-center  font-bold pb-2.5 uppercase text-black/80  ">
                    <RadioGroupItem
                      className="mr-2 "
                      value={address.addressId}
                      id={address.addressId}
                    />
                    <p>{address.city} </p>
                  </div>

                  <div className="grid w-full grid-cols-1 gap-4 font-medium md:grid-cols-2 md:pr-4">
                    {" "}
                    {Object.keys(address).map((key, idx) => {
                      if (filedsNotTOShow.includes(key)) return null;

                      return (
                        <DataDisplayingInput
                          key={idx}
                          value={address[
                            key as keyof typeof address
                          ].toString()}
                          label={key.split("_").join(" ")}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ExistingAddresses;

//-------------------------------------------------------------------------
// child components

export const DataDisplayingInput = (data: { label: string; value: string }) => {
  return (
    <div className="w-full flex-1 space-y-2">
      <p className="text-[15px] capitalize">{data.label}</p>
      <Input value={data.value} className="w-full" />
    </div>
  );
};

const LoadingAddressSkeleton = () => {
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-2 gap-8">
        {Array(8)
          .fill(0)
          .map((_, idx) => {
            return (
              <div key={idx} className="space-y-3">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-10 w-full" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
