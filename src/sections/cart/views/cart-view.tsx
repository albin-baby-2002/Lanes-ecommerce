import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import ProductsInCart from "../products-in-cart";
import OrderSummary from "../order-summary";
import { getUserCartData } from "@/lib/actions/client";

export interface TcartItems {
    cartItemId: string;
    userId: string;
    name: string | null;
    description: string | null;
    discount: number | null;
    onDiscount: boolean | null;
    productVariantId: string;
    inventoryCount: number;
    quantity: number;
    color: string | null;
    size: string | null;
    price: number
    imgUrls: string[];
}

const CartView = async() => {

  const resp = await getUserCartData();
  const cartItems = resp.data as unknown as TcartItems[];

  return (
    <div className="min-h-screen">
      <BreadCrumb routes={["Home", "Cart"]} />

      <p className="font-integral_cf text-3xl font-bold tracking-wide">
        YOUR CART
      </p>

      <div className="my-6 flex gap-6">
        <ProductsInCart items={cartItems} />
        <OrderSummary  items={cartItems}/>
      </div>
    </div>
  );
};

export default CartView;
