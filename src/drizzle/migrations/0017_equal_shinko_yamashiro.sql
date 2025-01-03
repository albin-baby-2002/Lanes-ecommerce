ALTER TABLE "cartItem" RENAME COLUMN "productId" TO "productVariantId";--> statement-breakpoint
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_productId_products_productId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_productVariantId_productVariants_productVariantId_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("productVariantId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
