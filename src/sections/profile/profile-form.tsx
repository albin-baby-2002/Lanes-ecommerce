"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { UserProfileSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
  });
  return (
    <div>
      <p className="  pt-10 text-lg  px-8 font-bold">
        Account Profile
      </p>

      <div className="bg-neutral-50 ">
        <div className=" bg-white p-8 rounded-xl">
          <Form {...form}>
            <form className="grid w-full gap-4">
              <div className="flex w-full gap-5">
                <CustomInputField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  placeholder="37-B, SkyLine Axios"
                  label="First Name"
                />
                <CustomInputField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="name"
                  placeholder="37-B, SkyLine Axios"
                  label="Last Name"
                />
              </div>
              <CustomInputField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                placeholder="37-B, SkyLine Axios"
                label="AddressLine"
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
