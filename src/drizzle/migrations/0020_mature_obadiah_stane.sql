CREATE TABLE IF NOT EXISTS "productReviews" (
	"productReviewId" uuid DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"productVariantId" uuid NOT NULL,
	"rating" integer NOT NULL,
	"review" varchar(500) NOT NULL,
	CONSTRAINT "productReviews_userId_productVariantId_pk" PRIMARY KEY("userId","productVariantId")
);
--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "avgRating" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "ratingsCount" integer DEFAULT 0;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productReviews" ADD CONSTRAINT "productReviews_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productReviews" ADD CONSTRAINT "productReviews_productVariantId_productVariants_productVariantId_fk" FOREIGN KEY ("productVariantId") REFERENCES "public"."productVariants"("productVariantId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
