"use server";

import { POSTS_TAG, type AdminPost, type PostStatus } from "@/data/blog";
import { AdminApiError, adminFetch } from "@/lib/admin";
import { portalUrl } from "@/lib/portal";
import { sessionCookies } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

export async function login(
  _previous: LoginState,
  formData: FormData
): Promise<LoginState> {
  const res = await fetch(portalUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return { error: data?.error ?? "Could not sign in. Try again." };
  }

  for (const cookie of sessionCookies(data)) {
    cookies().set(cookie.name, cookie.value, cookie.options);
  }
  redirect("/admin");
}

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  status: PostStatus;
};

export type PostResult = { post: AdminPost } | { error: string };

// Runs a write against the API, then drops the cached public pages and the dashboard.
async function mutate<T>(write: () => Promise<T>): Promise<T | { error: string }> {
  let result: T;
  try {
    result = await write();
  } catch (error) {
    // Anything else (including the redirect to the login page) propagates.
    if (error instanceof AdminApiError) return { error: error.message };
    throw error;
  }
  revalidateTag(POSTS_TAG);
  revalidatePath("/admin", "layout");
  return result;
}

// Creates the post when id is null.
export async function savePost(
  id: number | null,
  input: Partial<PostInput>
): Promise<PostResult> {
  return mutate(async () => ({
    post: await adminFetch<AdminPost>(
      id === null ? "/admin/posts" : `/admin/posts/${id}`,
      { method: id === null ? "POST" : "PATCH", body: input }
    ),
  }));
}

export async function deletePost(id: number): Promise<{ error?: string }> {
  return mutate(async () => {
    await adminFetch(`/admin/posts/${id}`, { method: "DELETE" });
    return {};
  });
}
