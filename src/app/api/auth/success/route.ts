import { findUserByKindeId, insertUser } from "@/lib/db-services/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

//--------------------------------------------------

export async function GET() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  try {
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
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
