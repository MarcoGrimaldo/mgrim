"use client";

import { deletePost, savePost } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate, type AdminPost, type PostStatus } from "@/data/blog";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, EyeIcon, PinIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

type Filter = "all" | PostStatus;
type Sort = "updated" | "views" | "title";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "unpublished", label: "Unpublished" },
];

const SORTS: Record<Sort, (a: AdminPost, b: AdminPost) => number> = {
  updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  views: (a, b) => b.views - a.views,
  title: (a, b) => a.title.localeCompare(b.title),
};

// The status changes offered for a post, most likely first.
const TRANSITIONS: Record<PostStatus, { to: PostStatus; label: string }[]> = {
  draft: [{ to: "published", label: "Publish" }],
  published: [{ to: "unpublished", label: "Unpublish" }],
  unpublished: [
    { to: "published", label: "Publish" },
    { to: "draft", label: "Move to drafts" },
  ],
};

export function PostsDashboard({ posts }: { posts: AdminPost[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("updated");
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const counts = useMemo(() => {
    const byStatus = { draft: 0, published: 0, unpublished: 0 };
    for (const post of posts) byStatus[post.status] += 1;
    return { all: posts.length, ...byStatus };
  }, [posts]);
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts
      .filter((post) => filter === "all" || post.status === filter)
      .filter(
        (post) =>
          !needle ||
          `${post.title} ${post.slug} ${post.tags.join(" ")}`
            .toLowerCase()
            .includes(needle)
      )
      .sort(SORTS[sort]);
  }, [posts, filter, sort, query]);

  // The page re-renders with fresh posts once the action has revalidated it.
  const run = (action: () => Promise<{ error?: string } | object>) => {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if ("error" in result && result.error) setError(result.error);
    });
  };

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tighter">Blog dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Not a Link: prefetching this route would sign the user out. */}
          <a
            href="/admin/logout"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign out
          </a>
          <Link href="/admin/posts/new" className={buttonVariants({ size: "sm" })}>
            <PlusIcon className="mr-1 size-4" />
            New post
          </Link>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Published", value: counts.published },
          { label: "Drafts", value: counts.draft },
          { label: "Unpublished", value: counts.unpublished },
          { label: "Total views", value: totalViews },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border p-3">
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {stat.value.toLocaleString("en-US")}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {FILTERS.map(({ value, label }) => (
            <Button
              key={value}
              size="sm"
              variant={filter === value ? "default" : "outline"}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
              <span className="ml-1.5 tabular-nums opacity-70">
                {counts[value]}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search by title, slug or tag..."
            aria-label="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            aria-label="Sort posts"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="updated">Last updated</option>
            <option value="views">Most viewed</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
          {posts.length === 0
            ? "No posts yet. Write the first one."
            : "No posts match."}
        </p>
      ) : (
        <ul
          className={cn(
            "divide-y rounded-xl border",
            pending && "pointer-events-none opacity-60"
          )}
        >
          {visible.map((post) => (
            <li key={post.id} className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="block truncate font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    /blog/{post.slug}
                  </p>
                </div>
                <StatusBadge status={post.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>Updated {formatDate(post.updatedAt)}</span>
                {post.publishedAt && (
                  <span>First published {formatDate(post.publishedAt)}</span>
                )}
                <span className="inline-flex items-center gap-1">
                  <EyeIcon className="size-3" />
                  {post.views.toLocaleString("en-US")}
                </span>
                {post.featured && (
                  <span className="inline-flex items-center gap-1">
                    <PinIcon className="size-3" />
                    Featured
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 pt-1">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Edit
                </Link>
                {TRANSITIONS[post.status].map(({ to, label }) => (
                  <Button
                    key={to}
                    size="sm"
                    variant="outline"
                    onClick={() => run(() => savePost(post.id, { status: to }))}
                  >
                    {label}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    run(() => savePost(post.id, { featured: !post.featured }))
                  }
                >
                  {post.featured ? "Unfeature" : "Feature"}
                </Button>
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    View
                    <ExternalLinkIcon className="ml-1 size-3" />
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto text-destructive hover:text-destructive"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete "${post.title}"? This cannot be undone.`
                      )
                    ) {
                      run(() => deletePost(post.id));
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
