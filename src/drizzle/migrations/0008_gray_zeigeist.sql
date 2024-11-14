ALTER TABLE "productCategories" DROP CONSTRAINT "productCategories_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariantImages" DROP CONSTRAINT "productVariantImages_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariantImages" ADD COLUMN "productVariantId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productCategories" ADD CONSTRAINT "productCategories_categoryId_categories_categoryId_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("categoryId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariantImages" ADD CONSTRAINT "productVariantImages_productVariantId_productVariants_id_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "productVariantImages" DROP COLUMN IF EXISTS "productId";