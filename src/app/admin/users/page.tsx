import UsersView from "@/sections/admin/users/views/users-view";
import React from "react";

const UsersPage = async ({ searchParams }: {searchParams:{search?:string}}) => {
  return <UsersView search={searchParams.search || ''}/>;
};

export default UsersPage;
