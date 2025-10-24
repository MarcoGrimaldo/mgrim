"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki/bundle/web";

const SHIKI_THEMES = {
  light: "github-light",
  dark: "github-dark",
} as const;

type ThemeVariant = keyof typeof SHIKI_THEMES;

const highlightWithTheme = async (code: string, lang: string, theme: ThemeVariant) => {
  const html = await codeToHtml(code, {
    lang,
    theme: SHIKI_THEMES[theme],
  });

  return html.replace(
    'class="shiki',
    `class="shiki ${theme === "dark" ? "dark" : "light"} rounded-lg text-sm`,
  );
};

const useShikiHighlight = (code: string, lang: string) => {
  const [rendered, setRendered] = useState<Record<ThemeVariant, string>>({
    light: "",
    dark: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const runHighlight = async () => {
      setIsLoading(true);
      try {
        const [light, dark] = await Promise.all([
          highlightWithTheme(code, lang, "light"),
          highlightWithTheme(code, lang, "dark"),
        ]);

        if (!cancelled) {
          setRendered({ light, dark });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to highlight code with Shiki", error);
        if (!cancelled) {
          setRendered({ light: "", dark: "" });
          setIsLoading(false);
        }
      }
    };

    runHighlight();

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return { rendered, isLoading };
};

type ShikiCodeBlockProps = {
  code: string;
  lang?: string;
};

export const ShikiCodeBlock = ({ code, lang = "typescript" }: ShikiCodeBlockProps) => {
  const { resolvedTheme } = useTheme();
  const { rendered, isLoading } = useShikiHighlight(code, lang);

  const themeVariant: ThemeVariant =
    resolvedTheme === "dark" ? "dark" : "light";
  const html = rendered[themeVariant] || rendered.light;

  if (isLoading || !html) {
    return (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto font-mono text-sm text-gray-900 dark:text-white">
        {code}
      </pre>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
