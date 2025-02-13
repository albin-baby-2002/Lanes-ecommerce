import React from "react";
import SearchAndActions from "../search-and-actions";
import { findAllOrdersByAdmin } from "@/lib/db-services/orders";
import { DataTable } from "@/components/table/data-table";
import { ordersColumns } from "../datatable-columns";

const OrdersView = async ({search}:{search:string}) => {

  const orders = await findAllOrdersByAdmin(search ||'');


  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Orders</p>
      </div>

      <SearchAndActions orders={orders} />

      <div className="mt-8 h-[calc(100vh-200px)]">
        <DataTable
          data={orders}
          columns={ordersColumns}
          columnVisibility={{
            orderItemId: false,
            quantity:false,
            price:false
          }}
        />
      </div>
    </div>
  );
};

export default OrdersView;
