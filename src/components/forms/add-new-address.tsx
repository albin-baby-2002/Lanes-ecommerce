import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { BillingAddressSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type TData = z.infer<typeof BillingAddressSchema>;

const AddNewAddressForm = () => {
  const form = useForm<TData>({
    resolver: zodResolver(BillingAddressSchema),
  });

  return (
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
  );
};

export default AddNewAddressForm;
