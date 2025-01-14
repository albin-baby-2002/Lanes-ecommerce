"use server";

import { findUserByKindeId } from "@/lib/db-services/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  findCartItemsIdByUser,
  findReviewByUserIdAndVariantId,
  insertCartItem,
  insertNewReview,
  TCartItem,
} from "../db-services/client";
import {
  deleteCartItem,
  findAllOrderItems,
  findAllUserCartItems,
  getProductVariantReviewInfo,
  updateProductVariantAvgReview,
} from "../db-services/products";
import { getUserDetailsUsingSession } from "./auth-actions";
import {
  cartItems,
  orderItems,
  orders,
  productVariants,
  users,
} from "@/drizzle/schema";
import {
  findBillingAddressByUserId,
  insertBillingAddress,
  TBillingAddressInsert,
} from "../db-services/billing-address";
import { TBillingAddressFormData } from "@/sections/checkout/add-new-address";
import { db } from "@/drizzle/db";
import { eq, inArray, sql } from "drizzle-orm";

export type TUserSelect = typeof users.$inferSelect;

export type TOrderItemsInsert = typeof orderItems.$inferInsert;

export const addToCart = async (productVariantId: string, quantity: number) => {
  const response = { success: false, message: "" };

  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const authenticated = await isAuthenticated();

    if (!authenticated) {
      response.message = "Login to add product to cart";
      return response;
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

    await insertCartItem(cartItem);

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

interface TDataResponse {
  success: boolean;
  message: string;
  data: null | any;
  details?: any;
}

export const getCartItemsId = async () => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    const { getUser } = getKindeServerSession();

    const kindeUser = await getUser();

    if (!kindeUser) {
      response.message = "Login to get cart data";
      return response;
    }

    const user = await findUserByKindeId(kindeUser.id);

    if (!user) {
      response.message = "Unexpected error try again";
      return response;
    }

    const cartItemsIds = await findCartItemsIdByUser(user[0].userId);

    const tranformedCartItemsIds = cartItemsIds.map((val) => val.productId);

    response.data = tranformedCartItemsIds;
    response.message = "successfully fetched cartItem Ids";
    return response;
  } catch (err: any) {
    console.error("Error:", err);

    response.message = "Sorry, something went wrong. Please try again later.";
    response.details = err.message;
    return response;
  }
};

export const addReview = async (
  productVariantId: string,
  review: string,
  rating: number,
) => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    const { getUser } = getKindeServerSession();

    const kindeUser = await getUser();

    if (!kindeUser) {
      response.message = "Login to add review";
      return response;
    }

    const user = await findUserByKindeId(kindeUser.id);

    if (!user) {
      response.message = "Unexpected error try again";
      return response;
    }

    const existingReview = await findReviewByUserIdAndVariantId(
      user[0].userId,
      productVariantId,
    );

    if (existingReview?.[0]?.productReviewId) {
      response.message = "You have already added review for the product";
      return response;
    }

    const newReview = await insertNewReview({
      userId: user[0].userId,
      productVariantId: productVariantId,
      review,
      rating,
    });

    const variantReviewInfo =
      await getProductVariantReviewInfo(productVariantId);

    const { avgRating, ratingsCount } = variantReviewInfo[0];

    if (avgRating != null && ratingsCount != null) {
      const newAvgRating = (avgRating + rating) / (ratingsCount + 1);

      await updateProductVariantAvgReview(
        productVariantId,
        newAvgRating,
        ratingsCount,
      );
    }

    response.success = true;

    response.message = "successfully added review";

    return response;
  } catch (err: any) {
    console.error("Error:", err);

    response.message = "Sorry, something went wrong. Please try again later.";
    response.details = err.message;
    return response;
  }
};

export const getUserCartData = async () => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    const { getUser } = getKindeServerSession();

    const kindeUser = await getUser();

    if (!kindeUser) {
      response.message = "Unexpected try again ";
      return response;
    }

    const user = await findUserByKindeId(kindeUser.id);

    if (!user) {
      response.message = "Unexpected error try again";
      return response;
    }

    const cartItems = await findAllUserCartItems(user[0].userId);

    response.data = cartItems;

    response.success = true;

    response.message = "successfully fetched cart data";

    return response;
  } catch (err: any) {
    console.error("Error:", err);

    response.message = "Sorry, something went wrong. Please try again later.";
    response.details = err.message;
    return response;
  }
};

export const deleteFromCart = async (productVariantId: string) => {
  const response = { success: false, message: "" };

  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const authenticated = await isAuthenticated();

    if (!authenticated) {
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
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

    const deleteResp = await deleteCartItem({
      productVariantId,
      userId: userDetails[0].userId,
    });

    response.success = true;

    response.message = "Successfully deleted item from cart";

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

export const addNewBillingAddress = async (
  address: TBillingAddressFormData,
) => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    let userDetails: TUserSelect | null = null;

    try {
      userDetails = await getUserDetailsUsingSession();

      if (!userDetails) {
        throw new Error("Failed to get user details");
      }
    } catch (error) {
      console.error("Error:", error);
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    await insertBillingAddress({ ...address, userId: userDetails.userId });

    response.success = true;
    response.message = "Successfully added new billing address";

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

export const getAllUserAddress = async () => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    let userDetails: TUserSelect | null = null;

    try {
      userDetails = await getUserDetailsUsingSession();

      if (!userDetails) {
        throw new Error("Failed to get user details");
      }
    } catch (error) {
      console.error("Error:", error);
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    const addresses = await findBillingAddressByUserId(userDetails.userId);

    response.success = true;
    response.data = addresses;
    response.message = "Successfully added new billing address";

    return response;
  } catch (err: any) {
    console.error("Error:", err);

    response.message = "Sorry, something went wrong. Please try again later.";
    response.details = err.message;
    return response;
  }
};

export const placeOrder = async (addressId: string) => {
  const response = { success: false, message: "" };

  console.log("\n \n", addressId, "addressId");

  try {
    let userDetails: TUserSelect | null = null;

    try {
      userDetails = await getUserDetailsUsingSession();

      if (!userDetails) {
        throw new Error("Failed to get user details");
      }
    } catch (error) {
      console.error("Error:", error);
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    console.log("\n \n", userDetails, "userDetails");

    // Perform transaction
    try {
      await db.transaction(async (tx) => {
        // Fetch user cart items
        const cartItemsData = await findAllUserCartItems(userDetails.userId);

        if (!cartItemsData.length) {
          throw new Error("No items in cart");
        }

        const newOrderItems: TOrderItemsInsert[] = cartItemsData.map((item) => {
          const total = (item.price || 0) * item.quantity;
          const totalDiscount = (item.discount || 0)/100 * total;
          const grandTotal = total - totalDiscount;

          return {
            orderId: "",
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            price: item.price || 0,
            discount: item.discount || 0,
            total: grandTotal,
            totalDiscount,
          };
        });

        const total = newOrderItems.reduce((acc, val) => acc + val.total, 0);

        const totalDiscount = newOrderItems.reduce(
          (acc, val) => acc + val.totalDiscount,
          0,
        );
        const deliveryFee = 15;
        const grandTotal = total - totalDiscount + deliveryFee;

        const newOrder = await tx
          .insert(orders)
          .values({
            userId: userDetails.userId,
            addressId,
            total,
            totalDiscount,
            paymentStatus: "PAID",
            shippingStatus: "PENDING",
            deliveryFee,
            grandTotal,
          })
          .returning({ orderId: orders.orderId });

        newOrderItems.forEach((item) => {
          item.orderId = newOrder[0].orderId;
        });

        await tx.insert(orderItems).values(newOrderItems);

        const cartItemsIds = cartItemsData.map((item) => item.cartItemId);

        await tx
          .delete(cartItems)
          .where(inArray(cartItems.cartItemId, cartItemsIds));

        // Update inventory in parallel using Promise.all

        await Promise.all(
          newOrderItems.map((item) =>
            tx
              .update(productVariants)
              .set({
                inventoryCount: sql`${productVariants.inventoryCount} - ${item.quantity}`,
              })
              .where(
                eq(productVariants.productVariantId, item.productVariantId),
              ),
          ),
        );

        console.log("\n \n", newOrderItems, "successfully updated");
      });

      // Success response
      response.success = true;
      response.message = "Successfully placed order";
    } catch (txError) {
      console.error("Transaction Error:", txError);
      response.message = "Failed to insert product. Please try again.";
      throw txError;
    }

    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Sorry, something went wrong. Please try again later.",
      details: error.message,
    };
  }
};

export const getAllOrders = async () => {
  const response: TDataResponse = { success: false, message: "", data: null };

  try {
    let userDetails: TUserSelect | null = null;

    try {
      userDetails = await getUserDetailsUsingSession();

      if (!userDetails) {
        throw new Error("Failed to get user details");
      }
    } catch (error) {
      console.error("Error:", error);
      response.message =
        "Unexpected error - failed to identify user - try again";
      return response;
    }

    const ordersData = await findAllOrderItems(userDetails.userId);

    response.success = true;
    response.data = ordersData;
    response.message = "Successfully added new billing address";

    return response;
  } catch (err: any) {
    console.error("Error:", err);

    response.message = "Sorry, something went wrong. Please try again later.";
    response.details = err.message;
    return response;
  }
};
