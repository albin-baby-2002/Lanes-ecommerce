import React, { useEffect } from "react";
import { Form } from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface TProps {
  form: UseFormReturn<any>;
}

const AddEditProductForm: React.FC<TProps> = ({ form }) => {

  // redux states and hooks

  const dispatch = useDispatch<AppDispatch>();

  const { categoryOptions } = useSelector((state: RootState) => state.products);

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
          <CustomInputField<string>
            control={form.control}
            fieldType={FormFieldType.MULTI_SELECT}
            options={categoryOptions}
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
