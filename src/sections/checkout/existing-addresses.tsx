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
    <AccordionItem value="item-1" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Billing Addresses
      </AccordionTrigger>
      <AccordionContent className="flex max-h-[420px] w-full  px-2 flex-wrap gap-3 overflow-y-auto border-t">
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
                  className="flex w-full space-x-4 border-t pt-8 pb-2 first:py-4 first:border-t-0"
                >
                  <RadioGroupItem
                    className="mt-2"
                    value={address.addressId}
                    id={address.addressId}
                  />

                  <div className="grid w-full grid-cols-2 gap-4 pr-4 font-medium">
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

const DataDisplayingInput = (data: { label: string; value: string }) => {
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
