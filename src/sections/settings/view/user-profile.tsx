"use client";

import { Button } from "@/components/ui/button";
import ProfileForm from "../profile-form";
import { TUserSelect, updateUserProfileInfo } from "@/lib/actions/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserProfileSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export type TProfileFormData = z.infer<typeof UserProfileSchema>;

const UserProfileView = ({ userDetails }: { userDetails: TUserSelect }) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TProfileFormData>({
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

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: TProfileFormData) => {
    try {
      setSubmitting(true);

      const resp = await updateUserProfileInfo(values);

      if (!resp.success) {
        toast.error("Failed to update user profile. Try Again");
      }

      toast.success("Successfully updated user details");

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error("Failed to update profile Try Again ");
    }
  };

  const onError = () => {
    toast.error("Enter all requied fields");
  };

  return (
    <div className="h-[calc(100vh-75px)]">
      <div className="h-[calc(100vh-130px)] rounded-md bg-white">
        <p className=" px-8 pt-8 text-xl lg:text-lg font-bold">Profile Details</p>
        <div className=" lg:w-[90%] xl:w-[60%] rounded-xl bg-white p-8">
          <ProfileForm form={form} />
          <div className="mt-8">
            <Button onClick={form.handleSubmit(onSubmit, onError)}>
              {" "}
              {submitting && (
                <Image
                  height={24}
                  width={24}
                  className="mr-2"
                  alt="svg"
                  src={"/loaders/circular-loader.svg"}
                />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
