import UsersView from "@/sections/admin/users/views/users-view";
import React from "react";

interface TProps {
  searchParams: {
    search?: string;
  };
}

const UsersPage = async ({ searchParams }: TProps) => {
  return <UsersView search={searchParams.search || ""} />;
};

export default UsersPage;
