"use server";

import { findUserByKindeId } from "@/lib/db-services/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { insertCartItem, TCartItem } from "../db-services/client";

export const addToCart = async (productVariantId: string, quantity: number) => {
  const response = { success: false, message: "" };

  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const authenticated = await isAuthenticated();

    if(!authenticated){
      response.message = 'Login to add product to cart';
      return response
    }

    const kindeUserDetails = await getUser();

    if (!kindeUserDetails) {
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    const userDetails = await findUserByKindeId(kindeUserDetails.id);

    if (!userDetails) {
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    const cartItem: TCartItem = {
      userId: userDetails[0].userId,
      productVariantId,
      quantity,
    };

    const cartItemAdded = await insertCartItem(cartItem);

    response.success = true;
    response.message = "Successfully added item to cart";

    return response;
  } catch (err: any) {
    console.error("Error:", err);
    return {
      success: false,
      message: "Sorry, something went wrong. Please try again later.",
      details: err.message,
    };
  }
};
