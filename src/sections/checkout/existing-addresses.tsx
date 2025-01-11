import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TAddress } from "./views/checkout-view";

const filedsNotTOShow = ["addressId", "userId","createdAt","updatedAt"];

const ExistingAddresses = ({
  Addressess,
}: {
  Addressess: TAddress[] | null;
}) => {
  return (
    <AccordionItem value="item-1" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Billing Addresses
      </AccordionTrigger>
      <AccordionContent className="flex w-full flex-wrap gap-3 border-t">
        <RadioGroup
          defaultValue="comfortable "
          className="w-full space-y-5 py-4 text-lg"
        >
          {Addressess?.map((address, idx) => {
            return (
              <div key={idx} className="flex w-full space-x-4">
                <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />

                <div className="grid w-full grid-cols-2 gap-4 pr-4 font-medium">
                  {Object.keys(address).map((key, idx) => {

                    if(filedsNotTOShow.includes(key)) return null;

                    return (
                      <DataDisplayingInput
                        key={idx}
                        value={address[key as keyof typeof address]}
                        label={key.split("_").join(" ")}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ExistingAddresses;

// child components

const DataDisplayingInput = (data: { label: string; value: string }) => {
  return (
    <div className="w-full flex-1 space-y-2">
      <p className="text-[15px] capitalize">{data.label}</p>
      <Input value={data.value} className="w-full" />
    </div>
  );
};
