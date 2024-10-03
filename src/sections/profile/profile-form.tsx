"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Button } from "@/components/ui/button";
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
    <div className="h-[calc(100vh-75px)] bg-ceramic px-10 py-8">
      <div className="h-[calc(100vh-130px)] rounded-md bg-white">
        <p className="px-8 pt-8 text-lg font-bold">Profile Details</p>
        <div className="w-1/2 rounded-xl bg-white p-8">
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

          <div className=" mt-8">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
