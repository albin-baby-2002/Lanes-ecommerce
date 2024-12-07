"use client";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOrEditUserModal from "./add-edit-user-modal";
import { usersReducers } from "@/store/slices/admin/users";

const UserActionModels = () => {
  const dispatch = useDispatch();
  const { showAddUser } = useSelector((state: RootState) => state.users);

  return (
    <>
      <AddOrEditUserModal
        type="add"
        open={showAddUser}
        toggleClose={() => {
          dispatch(usersReducers.toggleShowAddUser());
        }}
      />
    </>
  );
};

export default UserActionModels;
