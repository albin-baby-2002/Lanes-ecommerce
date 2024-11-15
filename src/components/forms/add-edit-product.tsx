import React from "react";
import { Form } from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { UseFormReturn } from "react-hook-form";

interface TProps {
  form: UseFormReturn<any>;
}

const ON_DISCOUNT_OPTIONS = [
  { label: "True", value: "True" },
  { label: "False", value: "False" },
];

const AddEditProductForm: React.FC<TProps> = ({ form }) => {
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
            fieldType={FormFieldType.MULTI_SELECT}
            options={ON_DISCOUNT_OPTIONS}
            name="categories"
            placeholder="Select Category"
            label="Categories"
          />

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

export default AddEditProductForm;
