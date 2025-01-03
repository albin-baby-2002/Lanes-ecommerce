"use server";
import { db } from "@/drizzle/db";
import { cartItem } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export type TCartItem = typeof cartItem.$inferInsert;

export const insertCartItem = async (cartItemValue: TCartItem) => {
  return await db
    .insert(cartItem)
    .values(cartItemValue)
    .onConflictDoUpdate({
      target: [cartItem.productVariantId, cartItem.userId],
      set: { quantity: cartItemValue.quantity },
    });
};

export const getCartItemsIdByUser = async (userId: string) => {
  return await db
    .select({ productId: cartItem.productVariantId })
    .from(cartItem)
    .where(eq(cartItem.userId, userId));
};
