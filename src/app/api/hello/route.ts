import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  await db
    .insert(users)
    .values({ kindeId:'asdfas',firstName: "albin", email: "ab@gmail.com", lastName: "babay" });

  return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
