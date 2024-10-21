"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { UserProfileSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileForm = () => {
  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
  });
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <div className="flex w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="first_name"
            placeholder="Johnk"
            label="First Name"
          />
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="last_name"
            placeholder="Doe"
            label="Last Name"
          />
        </div>

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

export default ProfileForm;
