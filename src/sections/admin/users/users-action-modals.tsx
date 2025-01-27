"use client";
import { RootState } from "@/store/store";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOrEditUserModal from "./add-edit-user-modal";
import { usersReducers } from "@/store/slices/admin/users";
import { TUser } from "./views/users-view";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteUserById } from "@/lib/db-services/users";
import { deleteUser } from "@/lib/actions/admin/users-actions";

const UserActionModels = ({ userData }: { userData: TUser[] }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    showAddUser,
    showDeleteConfirmation,
    userToDelete,
    showEditUser,
    userToEdit,
    pendingDeleting,
  } = useSelector((state: RootState) => state.users);

  const userToEditData = useMemo(() => {
    return userData.find((usr) => usr.userId === userToEdit);
  }, [userData, userToEdit]);

  const userToDeleteData = useMemo(() => {
    return userData.find((usr) => usr.userId === userToDelete);
  }, [userData, userToDelete]);

  const handleDelete = async () => {
    dispatch(usersReducers.togglePendingDeleting());

    if (!userToDelete) return toast.error("Unexpected error try again");

    const resp = await deleteUser(userToDelete);

    if (resp.success) {
      toast.success("Successfully deleted the category");
      router.refresh();
      dispatch(usersReducers.togglePendingDeleting());
      return dispatch(usersReducers.toggleShowDeleteConfirmation());
    }

    toast.error(resp.message);
    dispatch(usersReducers.togglePendingDeleting());
  };

  return (
    <>
      <AddOrEditUserModal
        type="add"
        open={showAddUser}
        toggleClose={() => {
          dispatch(usersReducers.toggleShowAddUser());
        }}
      />

      <AddOrEditUserModal
        type="edit"
        open={showEditUser}
        toggleClose={() => {
          dispatch(usersReducers.toggleShowEditUser());
        }}
        userToEdit={userToEditData}
      />

      <ConfirmationModal
        open={showDeleteConfirmation}
        title="Delete User"
        description={
          <div>
            {`Are you sure you wanna delete the user with email "${userToDeleteData?.email}"  `}
            `
          </div>
        }
        secondaryAction={() => {
          dispatch(usersReducers.toggleShowDeleteConfirmation());
        }}
        secondaryActionLabel="Cancel"
        primaryAction={handleDelete}
        primaryActionLabel="Delete"
        primaryActionPending={pendingDeleting}
        color="error"
      />
    </>
  );
};

export default UserActionModels;
