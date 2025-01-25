import { getAllUserAddress, getUserProfileInfo } from "@/lib/actions/client";
import PasswordResetView from "@/sections/settings/view/password-reset-view";
import UpdateAddressView from "@/sections/settings/view/update-address-view";
import UserDetailsView from "@/sections/settings/view/user-profile";
import React from "react";

const Settings = async ({ params }: { params: { slug: string[] } }) => {
  const endPoint = params.slug[0];

  const userDetails = (await getUserProfileInfo()).data;

  const addresses = (await getAllUserAddress()).data;
  switch (endPoint) {
    case "profile":
      return <UserDetailsView userDetails={userDetails} />;
    case "address":
      return <UpdateAddressView addresses={addresses} />;
    case "reset-password":
      return <PasswordResetView />;
  }
};

export default Settings;
