"use client";

import { Button } from "@/components/ui/button";
import { TOrderItemsSelect } from "@/lib/db-services/orders";
import { AppDispatch, RootState } from "@/store/store";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import EditOrderModal from "./edit-order-modal";
import { ordersReducers } from "@/store/slices/admin/orders";

const SearchAndActions = ({orders}:{orders:TOrderItemsSelect[]}) => {

  const dispatch = useDispatch<AppDispatch>();

const { showEditOrder, orderToEdit } = useSelector(
    (state: RootState) => state.orders,
  );

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex grow items-center rounded-md border border-gray-200 bg-white px-4 focus-within:border-black focus-within:bg-ceramic">
          <FaSearch className="text-gray-400" />
          <input
            className="ml-2 w-full border-none py-3 font-Inter text-[15px] outline-none focus:border-none"
            placeholder="Search Orders "
          />
        </div>
        <Button
          variant={"outline"}
          className="h-auto min-h-full border-2 border-black px-5"
        >
          Export Data
        </Button>
      </div>
      <EditOrderModal open={showEditOrder} toggleClose={()=>{
        dispatch(ordersReducers.toggleShowEditOrder())
      }}/>
    </>
  );
};

export default SearchAndActions;
