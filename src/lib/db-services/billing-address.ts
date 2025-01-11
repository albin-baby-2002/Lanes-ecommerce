import { db } from "@/drizzle/db";
import { billingAddresses } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export type TBillingAddressInsert = typeof billingAddresses.$inferInsert;

export const insertBillingAddress = async (
  billingAddress: TBillingAddressInsert,
) => {
  return await db.insert(billingAddresses).values(billingAddress);
};

export const findBillingAddressByUserId = async (userId: string) => {
  return await db
    .select()
    .from(billingAddresses)
    .where(eq(billingAddresses.userId, userId));
};
