"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { TUserSelect } from "@/lib/actions/client";
import { UserProfileSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileForm = ({ userDetails }: { userDetails: TUserSelect }) => {
  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    const { firstName, lastName, email, birthDate, age, gender, phone } =
      userDetails;

    form.reset({
      firstName: firstName || "",
      lastName: lastName || "",
      email,
      birthDate: birthDate || "",
      age: age || undefined,
      gender: gender || "",
      phone: phone || "",
    });
  }, []);

  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <div className="flex w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="firstName"
            placeholder="John"
            label="First Name"
          />
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="firstName"
            placeholder="Doe"
            label="Last Name"
          />
        </div>

        <div className="flex w-full gap-5">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="age"
            placeholder="25"
            label="Age"
          />
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="gender"
            placeholder="M/F"
            label="Gender"
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
