import { portalUrl } from "@/lib/portal";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  expiredCookies,
  sessionCookies,
  type Session,
} from "@/lib/session";
import { NextResponse, type NextRequest } from "next/server";

export const config = { matcher: ["/admin/:path*"] };

const LOGIN_PATH = "/admin/login";
// Clears the session itself, so it must stay reachable in any state.
const LOGOUT_PATH = "/admin/logout";

async function refreshSession(refreshToken: string): Promise<Session | null> {
  try {
    const res = await fetch(portalUrl("/auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

// Guards /admin: sends visitors without a session to the login page, and renews an
// expired access token before the page or action runs.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === LOGOUT_PATH) return NextResponse.next();

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  let refreshed: Session | null = null;
  if (!request.cookies.has(ACCESS_COOKIE) && refreshToken) {
    refreshed = await refreshSession(refreshToken);
    for (const cookie of refreshed ? sessionCookies(refreshed) : []) {
      // Seen by the page or action handling this same request.
      request.cookies.set(cookie.name, cookie.value);
    }
  }

  const signedIn = request.cookies.has(ACCESS_COOKIE);
  let response: NextResponse;
  if (!signedIn && pathname !== LOGIN_PATH) {
    response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  } else if (signedIn && pathname === LOGIN_PATH) {
    response = NextResponse.redirect(new URL("/admin", request.url));
  } else {
    response = NextResponse.next({ request });
  }

  const cookies = refreshed
    ? sessionCookies(refreshed)
    : !signedIn && refreshToken
    ? expiredCookies()
    : [];
  for (const cookie of cookies) {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  }
  return response;
}
