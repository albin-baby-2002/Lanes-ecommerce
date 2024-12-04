import { DataTable } from "@/components/table/data-table";
import React from "react";
import SearchAndActions from "../search-and-actions";
import { getAllUsers } from "@/lib/db-services/user";
import { usersColumns } from "../datatable-columns";

const UsersView = async () => {
  const userData = await getAllUsers();

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Users</p>
      </div>

      <SearchAndActions />

      {/* <ProductActionsModals */}
      {/* productsData={productsData} */}
      {/* categoryOptions={categoriesOptions} */}
      {/* /> */}

      <div className="mt-8">
        <DataTable
          columns={usersColumns}
          data={userData}
          columnVisibility={{
            userId: false,
            productVariants: false,
          }}
        />
      </div>
    </div>
  );
};

export default UsersView;
