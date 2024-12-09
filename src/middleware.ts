import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/cart","/admin", "/checkout", "/settings"];

export async function middleware(request: NextRequest) {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const current_route = request.nextUrl.pathname;

  // check logged in user or not

  if (PROTECTED_ROUTES.some((route) => current_route.startsWith(route))) {
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }
  }

  // check permission of user for admin route

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminPermission = await getPermission("admin:permission");

    if (!adminPermission?.isGranted) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/settings/:path*",
  ],
};
