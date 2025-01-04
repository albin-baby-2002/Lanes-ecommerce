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
  getProductVariantReviewInfo,
  updateProductVariantAvgReview,
} from "../db-services/products";

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

      console.log('add avg rating')
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
