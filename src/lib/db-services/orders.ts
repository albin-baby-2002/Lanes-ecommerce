import { db } from "@/drizzle/db";
import { orderItems, productVariants } from "@/drizzle/schema";
import { TOrderItemForm } from "@/sections/admin/orders/edit-order-modal";
import { eq, ilike, sql } from "drizzle-orm";

//-----------------------------------------------------------------

export interface TOrderItemsSelect extends Record<string, unknown> {
  orderItemId: string;
  orderItemInternalId: number;
  price: number;
  quantity: number;
  total: number;
  discount: number;
  totalDiscount: number;
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "CANCELLED"
    | "CASH_ON_DELIVERY";
  shippingStatus:
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED";
  productVariantInternalId: number | null;
}

//-----------------------------------------------------------------

export const findAllOrdersByAdmin = async (search?: string) => {
  return await db
    .select({
      orderItemId: orderItems.orderItemId,
      orderItemInternalId: orderItems.orderItemInternalId,
      price: orderItems.price,
      quantity: orderItems.quantity,
      total: orderItems.total,
      discount: orderItems.discount,
      totalDiscount: orderItems.totalDiscount,
      paymentStatus: orderItems.paymentStatus,
      shippingStatus: orderItems.shippingStatus,
      productVariantInternalId: productVariants.productVariantInternalId,
    })
    .from(orderItems)
    .leftJoin(
      productVariants,
      eq(productVariants.productVariantId, orderItems.productVariantId),
    )
    .where(
      ilike(
        sql`CAST(${orderItems.orderItemInternalId} AS TEXT)`,
        `%${search || ''}%`,
      ),
    );
};

//-----------------------------------------------------------------

export const updateOrderItemById = async ({
  orderItemId,
  price,
  quantity,
  total,
  discount,
  totalDiscount,
  paymentStatus,
  shippingStatus,
}: TOrderItemForm) => {
  await db
    .update(orderItems)
    .set({
      price,
      quantity,
      total,
      discount,
      totalDiscount,
      paymentStatus,
      shippingStatus,
      updatedAt: new Date(),
    })
    .where(eq(orderItems.orderItemId, orderItemId));
};
