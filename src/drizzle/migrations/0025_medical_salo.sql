-- Step 1: Drop the existing ENUM type if it exists (Be cautious of dependencies)
DROP TYPE IF EXISTS "public"."shippingStatus";

-- Step 2: Create the new ENUM type
CREATE TYPE "public"."shippingStatus" AS ENUM('PROCESSING', 'SHIPPED', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- Step 3: Drop the existing shippingStatus column

ALTER TABLE "orders" DROP COLUMN "shippingStatus";

-- Step 4: Create the new shippingStatus column with the new ENUM type

ALTER TABLE "orders"
ADD COLUMN "shippingStatus" "public"."shippingStatus";

