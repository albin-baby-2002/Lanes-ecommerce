"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const ProfileForm = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <div className="flex flex-wrap w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="firstName"
            placeholder="John"
            label="First Name"
            className=" basis-full sm:basis-[45%]"
          />
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="lastName"
            placeholder="Doe"
            label="Last Name"
            className=" basis-full sm:basis-[45%]"
          />
        </div>

        <div className="flex flex-wrap w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="age"
            placeholder="25"
            label="Age"
            dataType="number"
            className=" basis-full sm:basis-[45%]"
          />
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="gender"
            placeholder="M/F"
            label="Gender"
            className=" basis-full sm:basis-[45%]"
          />
        </div>

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          disabled
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

        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="birthDate"
          placeholder="DD/MM/YYYY"
          label="Birth Date"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
