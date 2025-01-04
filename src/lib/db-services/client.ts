"use server";
import { db } from "@/drizzle/db";
import { cartItem, productReviews } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export type TCartItem = typeof cartItem.$inferInsert;
export type TReviewItem = typeof productReviews.$inferInsert;

export const insertCartItem = async (cartItemValue: TCartItem) => {
  return await db
    .insert(cartItem)
    .values(cartItemValue)
    .onConflictDoUpdate({
      target: [cartItem.productVariantId, cartItem.userId],
      set: { quantity: cartItemValue.quantity },
    });
};

export const findCartItemsIdByUser = async (userId: string) => {
  return await db
    .select({ productId: cartItem.productVariantId })
    .from(cartItem)
    .where(eq(cartItem.userId, userId));
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
