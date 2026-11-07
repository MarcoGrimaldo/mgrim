import { portalUrl } from "@/lib/portal";

// Cache tag of every public blog fetch. The admin actions revalidate it, so a
// published change shows up on the site right away.
export const POSTS_TAG = "posts";

const REVALIDATE_SECONDS = 3600;

export type PostStatus = "draft" | "published" | "unpublished";

// Item of GET /posts on the mgrim-portal API.
export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  publishedAt: string | null;
  readingMinutes: number;
};

// Response of GET /posts/:slug.
export type Post = PostSummary & { content: string; updatedAt: string };

// Item of GET /admin/posts; GET /admin/posts/:id also carries the content.
export type AdminPost = PostSummary & {
  id: number;
  status: PostStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
  content?: string;
};

// Published posts, newest first.
export async function getPosts(): Promise<PostSummary[]> {
  const res = await fetch(portalUrl("/posts"), {
    next: { revalidate: REVALIDATE_SECONDS, tags: [POSTS_TAG] },
  });
  if (!res.ok) {
    throw new Error(`Portal API responded ${res.status} for /posts`);
  }
  return res.json();
}

// A published post, or null when the slug is unknown or not published.
export async function getPost(slug: string): Promise<Post | null> {
  const path = `/posts/${encodeURIComponent(slug)}`;
  const res = await fetch(portalUrl(path), {
    next: { revalidate: REVALIDATE_SECONDS, tags: [POSTS_TAG] },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Portal API responded ${res.status} for ${path}`);
  }
  return res.json();
}

export function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
