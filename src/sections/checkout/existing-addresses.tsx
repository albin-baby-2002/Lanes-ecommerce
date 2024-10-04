import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ExistingAddresses = () => {
  return (
    <AccordionItem value="item-1" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Billing Addresses
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-3 border-t">
        <RadioGroup
          defaultValue="comfortable "
          className="space-y-5 py-4 text-lg"
        >
          <div className="flex space-x-4">
            <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />
            <div className="font-medium">
              <p>Flat 45/5, 22 Sector</p>
              <p> North Junction</p>
              <p> New Delhi, India</p>
              <p>Pincode : 6846288</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <RadioGroupItem className="mt-2" value={"cod"} id={"cod"} />
            <div className="font-medium">
              <p>Flat 45/5, 22 Sector</p>
              <p> North Junction</p>
              <p> New Delhi, India</p>
              <p>Pincode : 6846288</p>
            </div>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ExistingAddresses;
