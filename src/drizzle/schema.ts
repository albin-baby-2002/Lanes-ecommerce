import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//----------------------------------------------------------------------------------

export const paymentStatus = pgEnum("paymentStatus", [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "CANCELLED",
  "CASH_ON_DELIVERY",
]);

export const shippingStatus = pgEnum("shippingStatus", [
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
]);

//----------------------------------------------------------------------------------

export const users = pgTable("users", {
  userId: uuid("userId").defaultRandom().primaryKey(),
  userInternalId: integer("userInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  kindeId: varchar({ length: 256 }).notNull().unique(),
  email: varchar({ length: 256 }).notNull().unique(),
  phone: varchar({ length: 256 }).unique(),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  birthDate: varchar({ length: 256 }),
  gender: varchar({ length: 256 }),
  age: integer("age"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

export const categories = pgTable("categories", {
  categoryId: uuid("categoryId").defaultRandom().primaryKey(),
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

//----------------------------------------------------------------------------------

export const products = pgTable("products", {
  productId: uuid("productId").defaultRandom().primaryKey(),
  productInternalId: integer("productInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  name: varchar({ length: 256 }).notNull().unique(),
  description: varchar({ length: 256 }).notNull(),
  discount: integer("discount").default(0),
  onDiscount: boolean("onDiscount").default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

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

//----------------------------------------------------------------------------------

export const productVariants = pgTable("productVariants", {
  productVariantId: uuid("productVariantId").defaultRandom().primaryKey(),
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
  onSale: boolean("onSale").default(false).notNull(),
  avgRating: integer("avgRating").default(0),
  ratingsCount: integer("ratingsCount").default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

export const productVariantImages = pgTable("productVariantImages", {
  productVariantImageId: uuid("productVariantImageId")
    .defaultRandom()
    .primaryKey(),
  imgUrl: varchar({ length: 256 }).notNull(),
  productVariantId: uuid("productVariantId")
    .notNull()
    .references(() => productVariants.productVariantId),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

export const cartItems = pgTable(
  "cartItems",
  {
    cartItemId: uuid("cartItemId").defaultRandom().notNull(),

    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),

    productVariantId: uuid("productVariantId")
      .notNull()
      .references(() => productVariants.productVariantId),

    quantity: integer("quantity").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.productVariantId] }),
    };
  },
);

//----------------------------------------------------------------------------------

export const productReviews = pgTable(
  "productReviews",
  {
    productReviewId: uuid("productReviewId").defaultRandom(),

    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),

    productVariantId: uuid("productVariantId")
      .notNull()
      .references(() => productVariants.productVariantId),

    rating: integer("rating").notNull(),

    review: varchar({ length: 500 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.productVariantId] }),
    };
  },
);

//----------------------------------------------------------------------------------

export const billingAddresses = pgTable("billingAddresses", {
  addressId: uuid("addressId").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.userId),
  fullName: varchar({ length: 256 }).notNull(),
  addressLine: varchar({ length: 256 }).notNull(),
  city: varchar({ length: 256 }).notNull(),
  district: varchar({ length: 256 }).notNull(),
  state: varchar({ length: 256 }).notNull(),
  zipCode: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull(),
  phone: varchar({ length: 256 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

export const orders = pgTable("orders", {
  orderId: uuid("orderId").defaultRandom().primaryKey(),

  orderInternalId: integer("orderInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.userId),
  addressId: uuid("addressId")
    .notNull()
    .references(() => billingAddresses.addressId),
  total: integer("total").notNull(),
  totalDiscount: integer("totalDiscount").notNull(),
  deliveryFee: integer("deliveryFee").notNull(),
  grandTotal: integer("grandTotal").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

//----------------------------------------------------------------------------------

export const orderItems = pgTable("orderItems", {
  orderItemId: uuid("orderItemId").defaultRandom().primaryKey(),

  orderItemInternalId: integer("orderItemInternalId")
    .generatedAlwaysAsIdentity({
      startWith: 1000,
      increment: 1,
    })
    .unique(),
  orderId: uuid("orderId")
    .notNull()
    .references(() => orders.orderId),
  productVariantId: uuid("productVariantId")
    .notNull()
    .references(() => productVariants.productVariantId),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  discount: integer("discount").notNull(),
  totalDiscount: integer("totalDiscount").notNull(),
  total: integer("total").notNull(),
  paymentStatus: paymentStatus().notNull(),
  shippingStatus: shippingStatus().notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
