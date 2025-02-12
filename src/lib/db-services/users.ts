import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq, like, or, sql } from "drizzle-orm";
import { TParsedUser } from "../helpers/data-validation";

type TUser = typeof users.$inferInsert;
type TUserUpdatePaylod = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
};

export const findUserByKindeId = async (kindeId: string) => {
  return await db.select().from(users).where(eq(users.kindeId, kindeId));
};

export const findUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.userId, id));
};

export const insertUser = async (user: TUser) => {
  return await db.insert(users).values(user);
};

export const getAllUsers = async (search?: string) => {
  console.log(search, "search \n \n");

  return await db
    .select()
    .from(users)
    .where(
      or(
        like(users.email, `%${search}%`),
        like(users.firstName, `%${search}%`),
        like(users.lastName, `%${search}%`),
        like(sql`CAST(${users.userInternalId} AS TEXT)`, `%${search}%`),
      ),
    );
};

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const deleteUserById = async (id: string) => {
  return await db.delete(users).where(eq(users.userId, id));
};

export const updateUserById = async (
  userId: string,
  user: TUserUpdatePaylod,
) => {
  return await db.update(users).set(user).where(eq(users.userId, userId));
};
