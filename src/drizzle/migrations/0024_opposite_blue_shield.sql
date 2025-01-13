CREATE TYPE "public"."paymentStatus" AS ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."shippingStatus" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'RETURNED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "orderItems" (
	"orderItemId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderId" uuid NOT NULL,
	"productVariantId" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"discount" integer NOT NULL,
	"totalDiscount" integer NOT NULL,
	"total" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"orderId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"addressId" uuid NOT NULL,
	"total" integer NOT NULL,
	"totalDiscount" integer NOT NULL,
	"paymentStatus" "paymentStatus" NOT NULL,
	"shippingStatus" "paymentStatus" NOT NULL,
	"deliveryFee" integer NOT NULL,
	"grandTotal" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_orderId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("orderId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_productVariantId_productVariants_productVariantId_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("productVariantId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_billingAddresses_addressId_fk" FOREIGN KEY ("addressId") REFERENCES "public"."billingAddresses"("addressId") ON DELETE no action ON UPDATE no action;