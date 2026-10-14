// The admin session: the tokens the mgrim-portal API returns from /auth/login, kept
// in httpOnly cookies scoped to /admin. Shared by the middleware and the admin actions.

export const ACCESS_COOKIE = "portal_access";
export const REFRESH_COOKIE = "portal_refresh";

const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

// Response of POST /auth/login and /auth/refresh.
export type Session = {
  accessToken: string;
  refreshToken: string;
  // Unix seconds
  expiresAt: number;
  email: string;
};

const baseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/admin",
} as const;

// The access cookie expires a minute before its token does; the middleware then
// trades the refresh token for a new session.
export function sessionCookies(session: Session) {
  const accessMaxAge = Math.max(
    session.expiresAt - Math.floor(Date.now() / 1000) - 60,
    0
  );
  return [
    {
      name: ACCESS_COOKIE,
      value: session.accessToken,
      options: { ...baseOptions, maxAge: accessMaxAge },
    },
    {
      name: REFRESH_COOKIE,
      value: session.refreshToken,
      options: { ...baseOptions, maxAge: REFRESH_MAX_AGE },
    },
  ];
}

export function expiredCookies() {
  return [ACCESS_COOKIE, REFRESH_COOKIE].map((name) => ({
    name,
    value: "",
    options: { ...baseOptions, maxAge: 0 },
  }));
}
