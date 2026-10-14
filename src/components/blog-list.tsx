"use client";

import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { PostSummary } from "@/data/blog";
import { useMemo, useState } from "react";

// The blog index: search box, tag filter and the matching posts, pinned ones first.
export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts
      .filter((post) => !activeTag || post.tags.includes(activeTag))
      .filter(
        (post) =>
          !needle ||
          `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
            .toLowerCase()
            .includes(needle)
      )
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [posts, query, activeTag]);

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search posts..."
        aria-label="Search posts"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              <Badge variant={activeTag === tag ? "default" : "outline"}>
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No posts match.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
