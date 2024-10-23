import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: uuid("id").defaultRandom().primaryKey(),
  kindeId: varchar({ length: 256 }).notNull().unique(),
  email: varchar({ length: 256 }).notNull().unique(),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  categoryId: uuid("id").defaultRandom().primaryKey(),
  categoryInternalId: integer("categoryInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  name: varchar({ length: 256 }).notNull().unique(),
  description: varchar({ length: 256 }).notNull(),
  onOffer: boolean("onOffer").default(false).notNull(),
  offerName: varchar({ length: 256 }).notNull(),
  offerDiscount: integer("offerDiscount").default(0).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const products = pgTable("products", {
  productId: uuid("id").defaultRandom().primaryKey(),
  productInternalId: integer("productInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  name: varchar({ length: 256 }).notNull().unique(),
  description: varchar({ length: 256 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const productCategories = pgTable(
  "productCategories",
  {
    productId: uuid("productId")
      .notNull()
      .references(() => products.productId),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.categoryId),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.categoryId] }),
    };
  },
);

export const productVariants = pgTable("productVariants", {
  productVariantId: uuid("id").defaultRandom().primaryKey(),
  productVariantInternalId: integer("productVariantInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.productId),
  color: varchar({ length: 256 }).notNull(),
  size: varchar({ length: 256 }).notNull(),
  inventoryCount: integer("inventoryCount").notNull().default(0),
  price: integer("price").notNull().default(0),
  onSale: boolean("onOffer").default(false).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const productVariantImages = pgTable("productVariantImages", {
  productVariantImageId: uuid("id").defaultRandom().primaryKey(),
  imgUrl: varchar({ length: 256 }).notNull(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.productId),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
