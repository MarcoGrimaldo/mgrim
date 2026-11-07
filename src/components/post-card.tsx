import { Badge } from "@/components/ui/badge";
import { formatDate, type PostSummary } from "@/data/blog";
import { PinIcon } from "lucide-react";
import Link from "next/link";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-lg sm:flex-row"
    >
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="h-40 w-full object-cover sm:h-auto sm:w-44 sm:shrink-0"
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.featured && (
            <PinIcon className="size-3" aria-label="Featured" />
          )}
          <time dateTime={post.publishedAt ?? undefined}>
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="font-semibold leading-snug group-hover:underline">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
