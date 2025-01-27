import { db } from "@/drizzle/db";
import { orderItems, productVariants } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export interface TOrderItemsSelect {
  orderItemId: string;
  orderItemInternalId: number;
  total: number;
  discount: number;
  totalDiscount: number;
  price: number;
  quantity: number;
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

export const findAllOrdersByAdmin = async () => {
  return await db
    .select({
      orderItemId: orderItems.orderId,
      orderItemInternalId: orderItems.orderItemInternalId,
      price:orderItems.price,
      quantity:orderItems.quantity,
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
    );
};
