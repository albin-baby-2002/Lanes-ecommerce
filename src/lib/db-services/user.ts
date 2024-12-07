import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type TUser = typeof users.$inferInsert;

export const findUserByKindeId = async (kindeId: string) => {
  return await db.select().from(users).where(eq(users.kindeId, kindeId));
};

export const insertUser = async (user: TUser) => {
  return await db.insert(users).values(user);
};

export const getAllUsers = async () => {
  return await db.select().from(users);
};

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

  