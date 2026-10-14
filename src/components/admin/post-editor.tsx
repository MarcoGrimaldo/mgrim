"use client";

import { savePost, type PostInput } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { PostContent } from "@/components/post-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AdminPost, PostStatus } from "@/data/blog";
import { ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

type Fields = Omit<PostInput, "tags" | "status"> & { tags: string };

// Same rule as the API, which fills the slug in when it is left empty.
function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SAVE_LABELS: Record<PostStatus, string> = {
  draft: "Save draft",
  published: "Save changes",
  unpublished: "Save",
};

// Editor for a new post (no `post`) or an existing one.
export function PostEditor({ post }: { post?: AdminPost }) {
  const router = useRouter();
  const [saved, setSaved] = useState(post);
  const [fields, setFields] = useState<Fields>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    tags: post?.tags.join(", ") ?? "",
    featured: post?.featured ?? false,
  });
  // A new post's slug follows its title until the slug is typed by hand.
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState<{ error: boolean; text: string }>();
  const [pending, startTransition] = useTransition();

  const status: PostStatus = saved?.status ?? "draft";
  const words = fields.content.trim().split(/\s+/).filter(Boolean).length;

  const update = (changes: Partial<Fields>) => {
    setFields((current) => ({ ...current, ...changes }));
    setDirty(true);
  };

  const save = (nextStatus: PostStatus = status) => {
    if (pending) return;
    setMessage(undefined);
    startTransition(async () => {
      const result = await savePost(saved?.id ?? null, {
        ...fields,
        tags: fields.tags.split(","),
        status: nextStatus,
      });
      if ("error" in result) {
        setMessage({ error: true, text: result.error });
        return;
      }
      setDirty(false);
      setSaved(result.post);
      setFields((current) => ({ ...current, slug: result.post.slug }));
      setSlugTouched(true);
      setMessage({
        error: false,
        text:
          nextStatus === status
            ? "Saved."
            : nextStatus === "published"
            ? "Published."
            : "No longer on the site.",
      });
      if (!saved) router.replace(`/admin/posts/${result.post.id}`);
    });
  };

  // Ctrl/Cmd+S saves; the ref keeps the listener on the latest state.
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          Dashboard
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {dirty && <span>Unsaved changes</span>}
          <StatusBadge status={status} />
        </div>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            required
            maxLength={200}
            value={fields.title}
            onChange={(event) =>
              update({
                title: event.target.value,
                ...(slugTouched ? {} : { slug: slugify(event.target.value) }),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            maxLength={120}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and dashes"
            value={fields.slug}
            onChange={(event) => {
              setSlugTouched(true);
              update({ slug: event.target.value });
            }}
          />
          <p className="text-xs text-muted-foreground">
            /blog/{fields.slug || "..."}
            {status === "published" &&
              " — changing it breaks existing links to this post."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            rows={2}
            maxLength={500}
            placeholder="One or two sentences shown on cards and in search results."
            value={fields.excerpt}
            onChange={(event) => update({ excerpt: event.target.value })}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="nextjs, math"
              value={fields.tags}
              onChange={(event) => update({ tags: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://... or /image.png"
              value={fields.coverImage}
              onChange={(event) => update({ coverImage: event.target.value })}
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4 accent-foreground"
            checked={fields.featured}
            onChange={(event) => update({ featured: event.target.checked })}
          />
          Featured: pin to the top of the blog
        </label>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant={preview ? "outline" : "default"}
                aria-pressed={!preview}
                onClick={() => setPreview(false)}
              >
                Write
              </Button>
              <Button
                type="button"
                size="sm"
                variant={preview ? "default" : "outline"}
                aria-pressed={preview}
                onClick={() => setPreview(true)}
              >
                Preview
              </Button>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {words.toLocaleString("en-US")} words ·{" "}
              {Math.max(1, Math.ceil(words / 200))} min read
            </span>
          </div>
          {preview ? (
            <div className="min-h-[24rem] rounded-md border p-4">
              {fields.content.trim() ? (
                <PostContent content={fields.content} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          ) : (
            <Textarea
              aria-label="Content"
              className="min-h-[24rem] font-mono"
              placeholder={
                "Markdown: **bold**, ## headings, ```js code blocks, tables, $math$..."
              }
              value={fields.content}
              onChange={(event) => update({ content: event.target.value })}
            />
          )}
        </div>

        {message && (
          <p
            role={message.error ? "alert" : "status"}
            className={
              message.error
                ? "text-sm text-destructive"
                : "text-sm text-muted-foreground"
            }
          >
            {message.text}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" variant="outline" disabled={pending}>
            {pending ? "Saving..." : SAVE_LABELS[status]}
          </Button>
          {status === "published" ? (
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => save("unpublished")}
            >
              Unpublish
            </Button>
          ) : (
            <Button
              type="button"
              disabled={pending || !fields.title.trim()}
              onClick={() => save("published")}
            >
              Publish
            </Button>
          )}
          {status === "published" && saved && (
            <Link
              href={`/blog/${saved.slug}`}
              target="_blank"
              className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              View on site
              <ExternalLinkIcon className="size-3" />
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}
