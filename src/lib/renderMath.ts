import katex from "katex";

/**
 * Render math expression to HTML using KaTeX.
 * Wraps formulae with inline or block mode.
 */
export function renderMath(expr: string, displayMode = false): string {
  return katex.renderToString(expr, {
    throwOnError: false,
    displayMode,
    output: "html",
  });
}
