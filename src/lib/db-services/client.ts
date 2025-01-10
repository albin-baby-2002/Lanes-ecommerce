"use server";
import { db } from "@/drizzle/db";
import { cartItems, productReviews } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export type TCartItem = typeof cartItems.$inferInsert;
export type TReviewItem = typeof productReviews.$inferInsert;

export const insertCartItem = async (cartItemValue: TCartItem) => {
  return await db
    .insert(cartItems)
    .values(cartItemValue)
    .onConflictDoUpdate({
      target: [cartItems.productVariantId, cartItems.userId],
      set: { quantity: cartItemValue.quantity },
    });
};

export const findCartItemsIdByUser = async (userId: string) => {
  return await db
    .select({ productId: cartItems.productVariantId })
    .from(cartItems)
    .where(eq(cartItems.userId, userId));
};

export const findReviewByUserIdAndVariantId = async (
  userId: string,
  productVariantId: string,
) => {
  return await db
    .select()
    .from(productReviews)
    .where(
      and(
        eq(productReviews.userId, userId),
        eq(productReviews.productVariantId, productVariantId),
      ),
    );
};

export const insertNewReview = async (reviewData: TReviewItem) => {
  return await db.insert(productReviews).values(reviewData);
};
