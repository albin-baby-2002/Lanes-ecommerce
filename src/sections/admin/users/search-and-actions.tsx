"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { usersReducers } from "@/store/slices/admin/users";
import DashboardSearch from "@/components/admin/search";
import { exportToExcel } from "@/lib/helpers/export-to-excel";

const SearchAndActions = ({data}:{data:Record<string,unknown>[]}) => {
  const dispatch = useDispatch<AppDispatch>();


  return (
    <>
      <div className="flex justify-between gap-6">
        <DashboardSearch />

        <Button
          onClick={() => {
            console.log(true);
            dispatch(usersReducers.toggleShowAddUser());
          }}
          className="h-auto min-h-full rounded-md bg-black px-5 text-white"
        >
          Add Users
        </Button>

        <Button
        onClick={()=>{exportToExcel(data)}}
          variant={"outline"}
          className="h-auto min-h-full border-2 border-black px-5"
        >
          Export Data
        </Button>
      </div>
    </>
  );
};

export default SearchAndActions;
