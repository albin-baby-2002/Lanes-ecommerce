import React from "react";
import { Form } from "../ui/form";
import CustomInputField, { FormFieldType } from "../custom-input";
import { UseFormReturn } from "react-hook-form";

//------------------------------------------------------------------------------

interface TProps {
  type: "add" | "edit";
  form: UseFormReturn<any>;
}

//------------------------------------------------------------------------------

const AddEditUserForm: React.FC<TProps> = ({ type, form }) => {
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <>
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="firstName"
            placeholder="Enter First Name"
            label="First Name"
          />

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="lastName"
            placeholder="Enter Last Name"
            label="Last Name"
          />

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            placeholder="Enter Email"
            label="Email"
            disabled={type === "edit"}
          />

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="phone"
            placeholder="Enter Phone Number"
            label="Phone"
          />

          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="birthDate"
            placeholder="Enter Date of Birth"
            label="Birth Date"
          />
        </>
      </form>
    </Form>
  );
};

export default AddEditUserForm;

//------------------------------------------------------------------------------
