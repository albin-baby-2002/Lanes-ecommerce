ALTER TABLE "productVariants" RENAME COLUMN "id" TO "productVariantId";--> statement-breakpoint
ALTER TABLE "productVariantImages" DROP CONSTRAINT "productVariantImages_productVariantId_productVariants_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariantImages" ADD CONSTRAINT "productVariantImages_productVariantId_productVariants_productVariantId_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("productVariantId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
