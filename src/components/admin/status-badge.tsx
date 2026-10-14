import type { PostStatus } from "@/data/blog";
import { cn } from "@/lib/utils";

export const STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Draft",
  published: "Published",
  unpublished: "Unpublished",
};

const STATUS_STYLES: Record<PostStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  unpublished:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
