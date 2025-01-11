CREATE TABLE "billingAddresses" (
	"addressId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"addressLine" varchar(256) NOT NULL,
	"city" varchar(256) NOT NULL,
	"district" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"zipCode" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "billingAddresses" ADD CONSTRAINT "billingAddresses_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;