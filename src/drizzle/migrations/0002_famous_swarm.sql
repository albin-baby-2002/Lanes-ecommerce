CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" integer GENERATED ALWAYS AS IDENTITY (sequence name "categories_categoryId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"onOffer" boolean DEFAULT false,
	"offerName" varchar(256) NOT NULL,
	"offerDiscount" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "categories_categoryId_unique" UNIQUE("categoryId"),
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_offerName_unique" UNIQUE("offerName")
);
