import CustomInputField, { FormFieldType } from "@/components/custom-input";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { BillingAddressSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const AddNewAddress = () => {
  const form = useForm<z.infer<typeof BillingAddressSchema>>({
    resolver: zodResolver(BillingAddressSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  return (
    <AccordionItem value="item-2" className="border px-4">
      <AccordionTrigger className="font-bold hover:no-underline">
        Add New Address
      </AccordionTrigger>
      <AccordionContent className="flex flex-wrap gap-3 border-t px-1 py-4">
        <Form {...form}>
          <form className="grid w-full gap-4">
            <div className="flex w-full gap-5">
              <CustomInputField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                placeholder="John Doe"
                label="Full Name"
              />
              <CustomInputField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="address_line"
                placeholder="37-B, SkyLine Axios"
                label="AddressLine"
              />
            </div>
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="city"
              placeholder="Hsr Layout,Bengaluru"
              label="City"
            />
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="district"
              placeholder="Bengaluru center"
              label="District"
            />
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="state"
              placeholder="Karnataka"
              label="State"
            />
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="postal_code"
              placeholder="9898888"
              label="Postal Code"
            />
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              placeholder="johndoe@gmail.com"
              label="Email"
            />
            <CustomInputField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="phone"
              placeholder="+91 XXX XXX XXXX"
              label="Phone Number"
            />
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AddNewAddress;
