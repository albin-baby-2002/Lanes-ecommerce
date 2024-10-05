import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Addressess = [
  {
    full_name: "John Doe",
    addressLine: "Flat 45/5, 22 Sector",
    city: "kochi",
    district: "ernakulam",
    state: "kerala",
    postal_code: "346511",
    email: "john@gmail.com",
    phone: "+92 257885 2352",
  },
];
const ExistingAddresses = () => {
  return (
    <AccordionItem value="item-1" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Billing Addresses
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-3 w-full border-t">
        <RadioGroup
          defaultValue="comfortable "
          className="space-y-5 py-4 text-lg w-full"
        >
          {Addressess.map((address, idx) => {
            return (
              <div key={idx} className="flex w-full space-x-4">
                <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />

                <div className=" grid grid-cols-2 gap-4 pr-4 w-full font-medium">
                  {Object.keys(address).map((key, idx) => {
                    return (
                      <DataDisplayingInput
                        key={idx}
                        value={address[key as keyof typeof address]}
                        label={key.split('_').join(' ')}
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
    <div className="flex-1 space-y-2 w-full">
      <p className=" text-[15px] capitalize">{data.label}</p>
      <Input value={data.value} className=" w-full"/>
    </div>
  );
};
