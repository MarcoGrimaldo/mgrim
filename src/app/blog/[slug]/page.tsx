import BlurFade from "@/components/magicui/blur-fade";
import { PostContent } from "@/components/post-content";
import { Badge } from "@/components/ui/badge";
import { ViewTracker } from "@/components/view-tracker";
import { formatDate, getPost, getPosts } from "@/data/blog";
import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

// Posts published after the build are rendered on first visit.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main>
      <ViewTracker slug={post.slug} />
      <BlurFade>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          All posts
        </Link>
        <article className="mt-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt ?? undefined}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="mt-6 max-h-80 w-full rounded-xl border object-cover"
            />
          )}
          <PostContent content={post.content} className="mt-8" />
        </article>
      </BlurFade>
    </main>
  );
}
