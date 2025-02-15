"use client";

import { Button } from "@/components/ui/button";
import { TOrderItemsSelect } from "@/lib/db-services/orders";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import EditOrderModal from "./edit-order-modal";
import { ordersReducers } from "@/store/slices/admin/orders";
import { exportToExcel } from "@/lib/helpers/export-to-excel";
import DashboardSearch from "@/components/admin/search";

const SearchAndActions = ({ orders }: { orders: TOrderItemsSelect[] }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { showEditOrder, orderToEdit } = useSelector(
    (state: RootState) => state.orders,
  );

  return (
    <>
      <div className="flex justify-between gap-6">
        <DashboardSearch/>
        <Button
          variant={"outline"}
          onClick={() => {
            exportToExcel(orders);
          }}
          className="h-auto min-h-full border-2 border-black px-5"
        >
          Export Data
        </Button>
      </div>
      <EditOrderModal
        orderToEdit={orders.find((order) => order.orderItemId === orderToEdit)}
        open={showEditOrder}
        toggleClose={() => {
          dispatch(ordersReducers.toggleShowEditOrder());
        }}
      />
    </>
  );
};

export default SearchAndActions;
