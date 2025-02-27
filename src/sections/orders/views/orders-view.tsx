import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import OrderItems from "../order-items";
import { getAllOrders } from "@/lib/actions/client";
import { TOrderItem } from "@/lib/db-services/products";

const OrdersView = async () => {
  const orders: TOrderItem[] = (await getAllOrders()).data;

  return (
    <div className="min-h-screen px-5  lg:px-10">
      <BreadCrumb routes={["Home", "Cart"]} />
      <p className="font-integral_cf text-xl lg:text-2xl xl:text-3xl font-bold tracking-wide">
        YOUR ORDERS
      </p>
      <div className="my-6 flex gap-6">
        <OrderItems items={orders} />
      </div>
    </div>
  );
};

export default OrdersView;
