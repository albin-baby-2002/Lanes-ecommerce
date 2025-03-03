import { z } from "zod";

//-----------------------------------------------------------------

const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

export const PaymentStatusEnum = z.enum([
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "CANCELLED",
  "CASH_ON_DELIVERY",
]);

export const ShippingStatusEnum = z.enum([
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
]);

//-----------------------------------------------------------------

export const BillingAddressSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  addressLine: z
    .string()
    .min(5, { message: "Street address must be at least 5 characters long" }),

  city: z.string().min(2, { message: "City is required" }),

  district: z.string().min(2, { message: "District is required" }),

  state: z.string().min(2, { message: "State is required" }),

  zipCode: z.string().min(3, { message: "Postal code is required" }),

  email: z.string().email("Enter a valid email address"),

  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Invalid phone number - include country code",
    ),
});

//-----------------------------------------------------------------

export const UserProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: "first_name should be alteast 2 char long",
  }),
  lastName: z.string(),
  email: z.string().email("Enter a valid email address"),
  birthDate: z
    .string()
    .optional()
    .refine((val) => val && datePattern.test(val), {
      message: "Date must be in the format DD/MM/YYYY",
    }),
  age: z.number().optional(),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{1,3}\s?\d{7,15}$/.test(phone),
      "Invalid phone - Enter Phone With Country Code",
    ),
});

//-----------------------------------------------------------------

export const ResetPasswordSchema = z
  .object({
    new_password: z.string().min(8, {
      message: "New Password Should be atleast 8 char long",
    }),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "New password and confirm password must match",
    path: ["confirm_new_password"],
  });

//-----------------------------------------------------------------

export const CategorySchema = z.object({
  name: z.string().min(3, {
    message: "Name must be atleast 4 char long.",
  }),

  description: z
    .string()
    .min(8, {
      message: "Description must be alteast 8 char long",
    })
    .max(256, { message: "max length should be 256 char" }),

  onOffer: z.boolean().default(false),
  offerName: z.string().min(4, {
    message: "Offer Name Should min 4 char long",
  }),

  offerDiscount: z.number().default(0),
});

//-----------------------------------------------------------------

export const ProductVariantSchema = z.object({
  productVariantId: z.string().optional(),
  color: z.string().min(3, {
    message: "Color must be atleast 3 char long.",
  }),
  size: z.string().min(1, {
    message: "Size must be atleast 1 char long.",
  }),
  inventoryCount: z.number().default(0),
  price: z.number().default(0),
  onSale: z.boolean().default(false),
  productVariantImages: z
    .array(z.string().min(1, { message: "There should be min 1 image" }))
    .min(1, {
      message: "There should be min 1 image",
    }),
});

//-----------------------------------------------------------------

export const ProductSchema = z.object({
  productId: z.string().optional(),
  name: z.string().min(4, {
    message: "Name must be atleast 4 char long.",
  }),
  description: z
    .string()
    .min(8, {
      message: "Description must be alteast 8 char long",
    })
    .max(256, { message: "max length should be 256 char" }),
  categories: z.array(z.string()).min(1, "Select a category "),
  discount: z.number(),
  onDiscount: z.boolean().default(false),
  productVariants: z.array(ProductVariantSchema),
});

//-----------------------------------------------------------------

export const orderItemSchema = z.object({
  orderItemId: z.string(),
  orderItemInternalId: z.number(),
  total: z.number(),
  discount: z.number(),
  totalDiscount: z.number(),
  price: z.number(),
  quantity: z.number(),
  paymentStatus: PaymentStatusEnum,
  shippingStatus: ShippingStatusEnum,
  productVariantInternalId: z.number().nullable(),
});
