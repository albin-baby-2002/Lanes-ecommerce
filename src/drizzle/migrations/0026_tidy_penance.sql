ALTER TABLE "orderItems" ADD COLUMN "paymentStatus" "paymentStatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "orderItems" ADD COLUMN "shippingStatus" "shippingStatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "paymentStatus";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "shippingStatus";