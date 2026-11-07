import { portalUrl } from "@/lib/portal";
import { ACCESS_COOKIE } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Calls an /admin endpoint of the mgrim-portal API as the signed-in user. Server only.
// A rejected session ends at the login page; other failures throw AdminApiError.
export async function adminFetch<T>(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<T> {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) redirect("/admin/logout");

  const res = await fetch(portalUrl(path), {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  if (res.status === 401) redirect("/admin/logout");

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new AdminApiError(
      res.status,
      data?.error ?? `Portal API responded ${res.status} for ${path}`
    );
  }
  return data;
}
