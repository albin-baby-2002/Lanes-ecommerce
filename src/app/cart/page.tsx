import CartView from "@/sections/cart/views/cart-view";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Cart = async () => {
  const { isAuthenticated ,getUser} = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const user = await getUser()

  if (!isLoggedIn) {
    console.log('not logged in',isLoggedIn,user)
    redirect("/api/auth/login");
  }
  return <CartView />;
};

export default Cart;
