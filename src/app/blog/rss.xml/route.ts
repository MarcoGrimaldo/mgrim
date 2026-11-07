import { getPosts } from "@/data/blog";
import { getResume } from "@/data/resume";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const [posts, resume] = await Promise.all([getPosts(), getResume()]);
  const site = resume.url.replace(/\/$/, "");

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site}/blog/${post.slug}</link>
      <guid>${site}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>${
        post.publishedAt
          ? `\n      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`
          : ""
      }
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(resume.name)} | Blog</title>
    <link>${site}/blog</link>
    <description>${escapeXml(resume.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
