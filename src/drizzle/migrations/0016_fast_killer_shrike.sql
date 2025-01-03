CREATE TABLE IF NOT EXISTS "cartItem" (
	"cartItemId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_productId_products_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
