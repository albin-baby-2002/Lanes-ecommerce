import { DataTable } from "@/components/table/data-table";
import React from "react";
import SearchAndActions from "../search-and-actions";
import { getAllUsers } from "@/lib/db-services/users";
import { usersColumns } from "../datatable-columns";
import { users } from "@/drizzle/schema";
import UserActionModels from "../users-action-modals";
import { exportToExcel } from "@/lib/helpers/export-to-excel";

export type TUser = typeof users.$inferSelect;

const UsersView = async ({ search }: { search: string }) => {
  const userData = await getAllUsers(search);

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Users</p>
      </div>

      <SearchAndActions data={userData} />
      <UserActionModels userData={userData} />

      <div className="mt-8 h-[calc(100vh-200px)]">
        <DataTable
          columns={usersColumns}
          data={userData}
          columnVisibility={{
            userId: false,
            productVariants: false,
            firstName: false,
            lastName: false,
          }}
        />
      </div>
    </div>
  );
};

export default UsersView;
