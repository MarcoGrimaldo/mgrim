import { expiredCookies } from "@/lib/session";
import { NextResponse, type NextRequest } from "next/server";

// Ends the admin session. Also where a rejected session is sent, so the stale
// cookies are gone before the login page loads.
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  for (const cookie of expiredCookies()) {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  }
  return response;
}
