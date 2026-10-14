import { BlogList } from "@/components/blog-list";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { getPosts } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software, problem solving and things I'm learning.",
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="space-y-6">
      <div className="space-y-1.5">
        <BlurFadeText
          className="text-3xl font-bold tracking-tighter sm:text-4xl"
          yOffset={8}
          text="Blog"
        />
        <BlurFadeText
          className="text-muted-foreground"
          delay={0.04}
          text="Notes on software, problem solving and things I'm learning."
        />
      </div>
      <BlurFade delay={0.08}>
        {posts.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nothing published yet. Check back soon.
          </p>
        ) : (
          <BlogList posts={posts} />
        )}
      </BlurFade>
    </main>
  );
}
