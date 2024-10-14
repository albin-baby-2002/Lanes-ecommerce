import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("user", user);

  if (!user || user == null || !user.id) {
    return NextResponse.redirect("http://127.0.0.1:3000/api/auth/logout");
  }

  let dbUser = await db.select().from(users).where(eq(users.kindeId, user.id));

  if (dbUser.length === 0) {
    dbUser = await db.insert(users).values({
      kindeId: user.id,
      firstName: user.given_name ?? user.email ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
    });
  }
  return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
