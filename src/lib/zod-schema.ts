import { categories, productVariantImages } from "@/drizzle/schema";
import { z } from "zod";

const validateDigits = (val: string) => {
  return /^\d+$/.test(val);
};

const validateDiscount = (val: string) => {
  return validateDigits(val) && Number(val) >= 0;
};

export const BillingAddressSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  address_line: z
    .string()
    .min(5, { message: "Street address must be at least 5 characters long" }),

  city: z.string().min(2, { message: "City is required" }),

  district: z.string().min(2, { message: "District is required" }),

  state: z.string().min(2, { message: "State is required" }),

  postal_code: z.string().min(3, { message: "Postal code is required" }),

  email: z.string().email("Enter a valid email address"),

  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const UserProfileSchema = z.object({
  first_name: z.string().min(2, {
    message: "first_name should be alteast 2 char long",
  }),

  last_name: z.string(),

  email: z.string().email("Enter a valid email address"),

  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const ResetPasswordSchema = z
  .object({
    current_password: z.string().min(2, {
      message: "Enter your current password",
    }),
    new_password: z.string().min(8, {
      message: "New Password Should be atleast 8 char long",
    }),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "New password and confirm password must match",
    path: ["confirm_new_password"],
  });

export const CategorySchema = z.object({
  name: z.string().min(4, {
    message: "Name must be atleast 4 char long.",
  }),

  description: z.string().min(8, {
    message: "Description must be alteast 8 char long",
  }),

  onOffer: z.enum(["True", "False"]),

  offerName: z.string().min(4, {
    message: "Offer Name Should min 4 char long",
  }),

  offerDiscount: z
    .string()
    .refine(
      validateDiscount,
      "Discount should be number greater than equal to 0",
    ),
});

export const ProductVariantSchema = z.object({
  color: z.string().min(3, {
    message: "Color must be atleast 3 char long.",
  }),
  size: z.string().min(1, {
    message: "Size must be atleast 1 char long.",
  }),
  inventoryCount: z.number().default(0),
  price: z.number().default(0),
  onSale: z.enum(["True", "False"]),
  productVariantImages: z.array(z.string()).min(1, {
    message: "There should be min 1 image",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be atleast 4 char long.",
  }),
  description: z.string().min(8, {
    message: "Description must be alteast 8 char long",
  }),
  categories: z.array(z.string()).min(1, "Select a category "),
  discount: z.number().default(0),
  onDiscount: z.enum(["True", "False"]),
  productVariants: z.array(ProductVariantSchema),
});
