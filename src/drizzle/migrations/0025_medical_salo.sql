-- Step 1: Drop the existing ENUM type if it exists (Be cautious of dependencies)
DROP TYPE IF EXISTS "public"."shippingStatus";

-- Step 2: Create the new ENUM type
CREATE TYPE "public"."shippingStatus" AS ENUM('PROCESSING', 'SHIPPED', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- Step 3: Alter the column to use the new ENUM type
ALTER TABLE "orders" ALTER COLUMN "shippingStatus" SET DATA TYPE "public"."shippingStatus"
USING "shippingStatus"::"public"."shippingStatus";
