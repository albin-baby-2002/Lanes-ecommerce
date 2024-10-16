import { boolean, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  kindeId: varchar({ length: 256 }).notNull().unique(),
  email: varchar({ length: 256 }).notNull().unique(),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: integer("categoryId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment:1,
    })
    .unique(),
  name: varchar({ length: 256 }).notNull().unique(),
  description: varchar({ length: 256 }).notNull(),
  onOffer: boolean("onOffer").default(false).notNull(),
  offerName: varchar({ length: 256 }).notNull(),
  offerDiscount: integer("offerDiscount").default(0).notNull(),
});
