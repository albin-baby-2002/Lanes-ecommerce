ALTER TABLE "products" ADD COLUMN "discount" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "onDiscount" boolean DEFAULT false;