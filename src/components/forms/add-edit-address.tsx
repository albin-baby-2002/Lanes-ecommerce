import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

//----------------------------------------------------------

const inputFields = [
  { name: "fullName", placeholder: "John Doe", label: "Full Name" },
  { name: "addressLine", placeholder: "37-B, SkyLine Axios", label: "AddressLine" },
  { name: "city", placeholder: "Hsr Layout,Bengaluru", label: "City" },
  { name: "district", placeholder: "Bengaluru center", label: "District" },
  { name: "state", placeholder: "Karnataka", label: "State" },
  { name: "zipCode", placeholder: "9898888", label: "Postal Code" },
  { name: "email", placeholder: "johndoe@gmail.com", label: "Email" },
  { name: "phone", placeholder: "+91 XXX XXX XXXX", label: "Phone Number" },
];

//----------------------------------------------------------

const AddEditAddressForm = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-5">
          {inputFields.slice(0, 2).map((field) => (
            <CustomInputField
              key={field.name}
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name={field.name}
              placeholder={field.placeholder}
              label={field.label}
            />
          ))}
        </div>
        {inputFields.slice(2).map((field) => (
          <CustomInputField
            key={field.name}
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name={field.name}
            placeholder={field.placeholder}
            label={field.label}
          />
        ))}
      </form>
    </Form>
  );
};

export default AddEditAddressForm;
