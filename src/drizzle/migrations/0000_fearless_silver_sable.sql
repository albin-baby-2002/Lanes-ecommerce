CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"kindeId" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"firstName" varchar(256),
	"lastName" varchar(256),
	CONSTRAINT "users_kindeId_unique" UNIQUE("kindeId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
