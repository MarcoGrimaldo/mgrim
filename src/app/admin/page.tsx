import { PostsDashboard } from "@/components/admin/posts-dashboard";
import type { AdminPost } from "@/data/blog";
import { adminFetch } from "@/lib/admin";

export default async function AdminPage() {
  const posts = await adminFetch<AdminPost[]>("/admin/posts");

  return <PostsDashboard posts={posts} />;
}
