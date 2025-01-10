ALTER TABLE "cartItem" RENAME TO "cartItems";--> statement-breakpoint
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItem_userId_users_userId_fk";
--> statement-breakpoint
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItem_productVariantId_productVariants_productVariantId_fk";
--> statement-breakpoint
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItem_userId_productVariantId_pk";--> statement-breakpoint
ALTER TABLE "cartItems" ALTER COLUMN "cartItemId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_userId_productVariantId_pk" PRIMARY KEY("userId","productVariantId");--> statement-breakpoint
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_productVariantId_productVariants_productVariantId_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("productVariantId") ON DELETE no action ON UPDATE no action;