import { getPosts } from "@/data/blog";
import { getResume } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, resume] = await Promise.all([getPosts(), getResume()]);
  const site = resume.url.replace(/\/$/, "");

  return [
    { url: site },
    { url: `${site}/blog` },
    ...posts.map((post) => ({
      url: `${site}/blog/${post.slug}`,
      lastModified: post.publishedAt ?? undefined,
    })),
  ];
}
