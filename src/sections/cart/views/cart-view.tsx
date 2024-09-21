import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import ProductsInCart from "../products-in-cart";
import OrderSummary from "../order-summary";

const CartView = () => {
  return (
    <div className="min-h-screen">
      <BreadCrumb routes={["Home", "Cart"]} />

      <p className="font-integral_cf text-3xl font-bold tracking-wide">
        YOUR CART
      </p>

      <div className="my-6 flex gap-6">
        <ProductsInCart />
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartView;
