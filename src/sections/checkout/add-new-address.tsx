import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AddNewAddressForm from "@/components/forms/add-new-address";
import { Button } from "@/components/ui/button";

const AddNewAddress = () => {
  return (
    <AccordionItem value="item-2" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Add New Address
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-3 border-t px-1 py-4">
        <AddNewAddressForm />

        <Button className="my-4">Create Address</Button>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AddNewAddress;
