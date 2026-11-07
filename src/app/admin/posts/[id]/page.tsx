import { PostEditor } from "@/components/admin/post-editor";
import type { AdminPost } from "@/data/blog";
import { AdminApiError, adminFetch } from "@/lib/admin";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  let post: AdminPost;
  try {
    post = await adminFetch<AdminPost>(
      `/admin/posts/${encodeURIComponent(params.id)}`
    );
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) notFound();
    throw error;
  }

  // Remount when another post is opened, so no state carries over.
  return <PostEditor key={post.id} post={post} />;
}
