import { findUserByKindeId, insertUser } from "@/lib/db-services/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {

  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const logoutUrl = `https://albin.kinde.com/logout?redirect='http://127.0.0.1:3000/'`;

  if (!kindeUser || kindeUser == null || !kindeUser.id || true) {
    console.log("...........................");
    console.log("logout becaue failed to get user data");
    console.log("...........................");
    return NextResponse.redirect(logoutUrl);
  }

  let dbUser = await findUserByKindeId(kindeUser.id);

  if (dbUser.length === 0) {
    const newUser = {
      kindeId: kindeUser.id,
      firstName: kindeUser.given_name ?? kindeUser.email ?? "",
      lastName: kindeUser.family_name ?? "",
      email: kindeUser.email ?? "",
    };

    await insertUser(newUser);
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
