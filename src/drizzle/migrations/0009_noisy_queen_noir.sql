ALTER TABLE "products" RENAME COLUMN "id" TO "productId";--> statement-breakpoint
ALTER TABLE "productCategories" DROP CONSTRAINT "productCategories_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariants" DROP CONSTRAINT "productVariants_productId_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productCategories" ADD CONSTRAINT "productCategories_productId_products_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_productId_products_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
