import PasswordResetView from "@/sections/settings/view/password-reset-view";
import UserDetailsView from "@/sections/settings/view/user-profile";
import React from "react";

const Settings = ({ params }: { params: { slug: string[] } }) => {

  const endPoint = params.slug[0];

  switch (endPoint){

    case 'profile':
      return <UserDetailsView/>
    case 'reset-password':
      return <PasswordResetView/>
  }

};

export default Settings;
