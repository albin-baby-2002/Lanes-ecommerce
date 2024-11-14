import React from "react";
import { Form } from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { SelectItem } from "../ui/select";
import { UseFormReturn } from "react-hook-form";


interface TProps{
  form:UseFormReturn<any>
}

const ON_DISCOUNT_OPTIONS = [
  { label: "True", Value: "True" },
  { label: "False", Value: "False" },
];

const AddEditCategoryForm:React.FC<TProps> = ({
  form
}) => {


  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          placeholder="Enter Product Name"
          label="Product Name"
        />

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          placeholder="Type Your Description"
          label="Description"
        />

        <div className="flex gap-3">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="categories"
            placeholder="Select"
            label="Categories"
          >
            {ON_DISCOUNT_OPTIONS.map((item) => (
              <SelectItem
                key={item.label}
                value={item.Value}
                className="cursor-pointer hover:bg-slate-600"
              >
                <div className="flex items-center gap-2">
                  <p>{item.label}</p>
                </div>
              </SelectItem>
            ))}
          </CustomInputField>

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="offerDiscount"
            placeholder="10"
            label="Discount (%)"
          />
        </div>

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="offerName"
          placeholder="Diwali Steals"
          label="Offer Name"
        />
      </form>
    </Form>
  );
};

export default AddEditCategoryForm;
