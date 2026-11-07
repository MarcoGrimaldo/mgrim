"use client";

import { recordView } from "@/app/blog/actions";
import { useEffect } from "react";

// Counts one view per post per browser session.
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage unavailable: count the view anyway.
    }
    recordView(slug);
  }, [slug]);

  return null;
}
