import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { cn } from "@/lib/utils";
import { isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// A fenced block arrives as <pre><code class="language-x">; hand it to Shiki.
function CodeBlock({ children }: { children?: ReactNode }) {
  const code = Array.isArray(children) ? children[0] : children;
  if (!isValidElement<{ className?: string; children?: ReactNode }>(code)) {
    return <pre>{children}</pre>;
  }
  const lang = /language-([\w-]+)/.exec(code.props.className ?? "")?.[1];
  return (
    <div className="not-prose my-4 [&_pre]:p-4">
      <ShikiCodeBlock
        code={String(code.props.children ?? "").replace(/\n$/, "")}
        lang={lang ?? "text"}
      />
    </div>
  );
}

// Renders a post's Markdown: GFM, highlighted code blocks and KaTeX math ($...$).
// Used by the public post page and by the editor's preview.
export function PostContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={cn(
        "prose max-w-full text-pretty font-sans dark:prose-invert prose-img:rounded-lg",
        className
      )}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{ pre: CodeBlock }}
    >
      {content}
    </Markdown>
  );
}
