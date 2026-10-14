"use server";

import { portalUrl } from "@/lib/portal";

// Counts a visit to a post. The count is only shown in the admin dashboard.
export async function recordView(slug: string) {
  await fetch(portalUrl(`/posts/${encodeURIComponent(slug)}/view`), {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}
